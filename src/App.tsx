import { useState, useEffect } from 'react';
import Lanyard from './components/Lanyard/Lanyard';
import DotGrid from './components/DotGrid/DotGrid';
import AdminPanel from './components/AdminPanel';
import avatarImg from './assets/avatar.jpg';

interface Project {
  title: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
  images?: string[];
  video?: string;
  pinned?: boolean;
}

interface Contact {
  email: string;
  github: string;
  linkedin: string;
  twitter: string;
  phone: string;
}

const DEFAULT_HIGHLIGHTS = ['LLM Apps', 'RAG Systems', 'AI Agents', 'Automation', 'NLP', 'Computer Vision'];

const DEFAULT_CONTACT: Contact = {
  email: 'ravishpaulkr@gmail.com',
  github: 'https://github.com/Ravish-Paul',
  linkedin: 'https://www.linkedin.com/in/ravish-paul/',
  twitter: 'https://x.com/PaulkrScratch',
  phone: '916200964060'
};

const DEFAULT_PROJECTS: Project[] = [
  {
    title: 'AI PDF Chatbot',
    description: 'Chat with PDFs using Retrieval-Augmented Generation and GPT APIs.',
    tech: ['Python', 'LangChain', 'FAISS', 'OpenAI API'],
    github: 'https://github.com/Ravish-sketch/RAG-pdf-chatbot',
    live: 'https://rag-pdf-chatbot-gemini.streamlit.app'
  },
  {
    title: 'AI Resume Analyzer',
    description: 'AI-powered resume screening and job matching system.',
    tech: ['Python', 'NLP', 'Streamlit', 'OpenAI API'],
    github: 'https://github.com/Ravish-sketch/ai_resume_matcher',
    live: 'https://ai-resume-matcher-gemini.streamlit.app'
  },
  {
    title: 'AI Image Verification System',
    description: 'Vision-based AI system to verify image-text consistency.',
    tech: ['Python', 'Vision API', 'LLMs', 'Streamlit'],
    github: 'https://github.com/Ravish-sketch/image_text_verifier',
    live: 'https://image-text-verifier.streamlit.app'
  }
];

const DEFAULT_SKILLS = [
  'Python',
  'Machine Learning',
  'Deep Learning',
  'LangChain',
  'OpenAI API',
  'RAG',
  'FAISS',
  'NLP',
  'Streamlit',
  'Automation'
];

const getGithubUsername = (url: string) => {
  try {
    const clean = url.trim().replace(/\/$/, "");
    const parts = clean.split('/');
    return parts[parts.length - 1] || 'Ravish-Paul';
  } catch (e) {
    return 'Ravish-Paul';
  }
};

const formatPhone = (phone: string) => {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) {
    return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`;
  }
  return digits ? `+${digits}` : '';
};

const getEmbedUrl = (url: string | undefined) => {
  if (!url) return '';
  try {
    const clean = url.trim();
    // YouTube
    if (clean.includes('youtube.com/watch')) {
      const u = new URL(clean);
      const v = u.searchParams.get('v');
      return v ? `https://www.youtube.com/embed/${v}` : clean;
    }
    if (clean.includes('youtu.be/')) {
      const parts = clean.split('youtu.be/');
      const idPart = parts[parts.length - 1].split('?')[0];
      return `https://www.youtube.com/embed/${idPart}`;
    }
    if (clean.includes('youtube.com/embed/')) {
      return clean;
    }
    // Loom
    if (clean.includes('loom.com/share/')) {
      const parts = clean.split('loom.com/share/');
      const idPart = parts[parts.length - 1].split('?')[0];
      return `https://www.loom.com/embed/${idPart}`;
    }
    if (clean.includes('loom.com/embed/')) {
      return clean;
    }
    // Vimeo
    if (clean.includes('vimeo.com/')) {
      const parts = clean.split('vimeo.com/');
      const idPart = parts[parts.length - 1].split('?')[0];
      return `https://player.vimeo.com/video/${idPart}`;
    }
    return clean;
  } catch (e) {
    return url || '';
  }
};

interface ProjectCardProps {
  project: Project;
  getEmbedUrl: (url: string | undefined) => string;
}

function ProjectCard({ project, getEmbedUrl }: ProjectCardProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Build the array of media slides
  const slides: { type: 'video' | 'image'; url: string }[] = [];
  if (project.video) {
    slides.push({ type: 'video', url: project.video });
  }
  
  if (project.images && project.images.length > 0) {
    project.images.forEach((img) => {
      slides.push({ type: 'image', url: img });
    });
  } else if ((project as any).image) {
    // Backwards compatibility for single-string image field
    slides.push({ type: 'image', url: (project as any).image });
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const hasMultiple = slides.length > 1;
  const activeSlide = slides[currentSlide];

  const isDirectVideo = activeSlide?.type === 'video' && (
    activeSlide.url.endsWith('.mp4') || 
    activeSlide.url.endsWith('.webm') || 
    activeSlide.url.endsWith('.ogg') ||
    activeSlide.url.includes('raw=true') ||
    activeSlide.url.includes('raw=1')
  );

  const isYoutube = activeSlide?.type === 'video' && (activeSlide.url.includes('youtube.com') || activeSlide.url.includes('youtu.be'));
  const isLoom = activeSlide?.type === 'video' && activeSlide.url.includes('loom.com');
  const isVimeo = activeSlide?.type === 'video' && activeSlide.url.includes('vimeo.com');
  const isEmbeddable = isYoutube || isLoom || isVimeo;
  const embedUrl = isEmbeddable ? getEmbedUrl(activeSlide.url) : '';

  return (
    <article className="border border-neutral-200 bg-white/85 shadow-sm backdrop-blur-sm flex flex-col justify-between h-full overflow-hidden">
      <div>
        {slides.length > 0 && (
          <div className="relative w-full aspect-video bg-neutral-900 border-b border-neutral-100 overflow-hidden group">
            <div className="w-full h-full">
              {activeSlide.type === 'video' ? (
                isDirectVideo ? (
                  <video
                    src={activeSlide.url}
                    controls
                    className="w-full h-full object-cover"
                  />
                ) : isEmbeddable ? (
                  <iframe
                    src={embedUrl}
                    title={`${project.title} video demo`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-neutral-400 font-mono">
                    Unplayable video link
                  </div>
                )
              ) : (
                <img
                  src={activeSlide.url}
                  alt={`${project.title} slide`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
            </div>

            {hasMultiple && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/95 text-neutral-900 border border-neutral-200 flex items-center justify-center shadow-md transition-all hover:bg-neutral-950 hover:text-white hover:border-neutral-950 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  aria-label="Previous slide"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/95 text-neutral-900 border border-neutral-200 flex items-center justify-center shadow-md transition-all hover:bg-neutral-950 hover:text-white hover:border-neutral-950 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  aria-label="Next slide"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <div className="absolute bottom-3 right-3 bg-neutral-950/80 px-2 py-1 text-[10px] font-semibold text-white tracking-widest font-mono select-none rounded backdrop-blur-[2px]">
                  {currentSlide + 1}/{slides.length}
                </div>
              </>
            )}
          </div>
        )}
        <div className="p-5">
          <h2 className="text-base font-semibold text-neutral-950 flex items-center gap-2">
            {project.title}
            {project.pinned && (
              <span className="text-[10px] bg-neutral-100 text-neutral-600 px-2 py-0.5 font-normal rounded font-mono select-none">
                Pinned
              </span>
            )}
          </h2>
          <p className="mt-3 text-sm leading-6 text-neutral-600">{project.description}</p>
          <div className="mt-4 flex flex-wrap gap-1 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
            {project.tech.join(' • ')}
          </div>
        </div>
      </div>
      <div className="p-5 pt-0 mt-2 flex gap-3">
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center border border-neutral-950 bg-neutral-950 py-2.5 text-xs font-semibold text-white transition-all duration-200 hover:bg-neutral-800 shadow-sm"
        >
          Live Demo
        </a>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center border border-neutral-200 bg-white py-2.5 text-xs font-semibold text-neutral-800 transition-all duration-200 hover:border-neutral-400 hover:bg-neutral-50 shadow-sm"
        >
          GitHub
        </a>
      </div>
    </article>
  );
}

function App() {
  const [highlights, setHighlights] = useState<string[]>(() => {
    const saved = localStorage.getItem('portfolio_highlights');
    return saved ? JSON.parse(saved) : DEFAULT_HIGHLIGHTS;
  });

  const [contact, setContact] = useState<Contact>(() => {
    const saved = localStorage.getItem('portfolio_contact');
    return saved ? JSON.parse(saved) : DEFAULT_CONTACT;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('portfolio_projects');
    return saved ? JSON.parse(saved) : DEFAULT_PROJECTS;
  });

  const [skills, setSkills] = useState<string[]>(() => {
    const saved = localStorage.getItem('portfolio_skills');
    return saved ? JSON.parse(saved) : DEFAULT_SKILLS;
  });

  const [isAdmin, setIsAdmin] = useState(window.location.hash === '#admin');

  useEffect(() => {
    const handleHashChange = () => {
      setIsAdmin(window.location.hash === '#admin');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const closeAdmin = () => {
    window.location.hash = '';
    setIsAdmin(false);
  };
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-white text-neutral-900">
      <DotGrid
        dotSize={5}
        gap={24}
        baseColor="#d6d6d6"
        activeColor="#404040"
        proximity={135}
        shockRadius={230}
        shockStrength={4}
        resistance={650}
        returnDuration={1.25}
        className="opacity-70"
      />
      
      {/* Hero / Intro Section (Takes up the entire first fold) */}
      <section className="relative z-10 grid min-h-screen items-center gap-6 px-5 pb-8 pt-4 md:grid-cols-[0.86fr_minmax(360px,1.14fr)] md:px-10 md:pb-6 md:pt-5 lg:px-16">
        <div className="order-2 md:order-1 flex flex-col gap-6 h-full py-4 relative z-20">
          <nav className="border-b border-neutral-200 pb-5 text-sm text-neutral-600">
            <span className="font-semibold tracking-wide text-neutral-950">AI/LLM Portfolio</span>
          </nav>

          <div className="max-w-3xl space-y-5 pt-6 md:pt-14">
            <h1 className="max-w-3xl text-4xl font-semibold leading-[1.05] text-neutral-950 sm:text-5xl lg:text-6xl">
              AI Automation & LLM Developer
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-neutral-600">
              I build practical AI systems using GPT, RAG, automation, and modern AI workflows.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#projects"
                onClick={(e) => handleScroll(e, 'projects')}
                className="border border-neutral-950 bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-neutral-800 hover:border-neutral-800 shadow-sm"
              >
                View Projects
              </a>
              <a
                href="#contact"
                onClick={(e) => handleScroll(e, 'contact')}
                className="border border-neutral-200 bg-white/80 px-6 py-3 text-sm font-semibold text-neutral-800 transition-all duration-200 hover:bg-neutral-50 hover:border-neutral-400 shadow-sm backdrop-blur-sm"
              >
                Contact Me
              </a>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 font-mono">Expertise</p>
            <div className="grid gap-3 grid-cols-2 sm:grid-cols-3">
              {highlights.map(item => (
                <div key={item} className="border border-neutral-200 bg-white/80 px-4 py-3 text-sm font-medium text-neutral-700 backdrop-blur-sm text-center">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="order-1 min-h-[430px] overflow-visible md:order-2" style={{ transform: 'translate(60px, -25px)' }}>
          <Lanyard
            position={[1.8, -0.6, 22.5]}
            gravity={[0, -40, 0]}
            fov={15}
            badge={{
              name: 'Ravish Paul',
              role: 'AI & LLM Developer',
              initials: 'RP',
              email: contact.email,
              github: getGithubUsername(contact.github),
              phone: formatPhone(contact.phone),
              avatar: avatarImg
            }}
          />
        </div>
      </section>

      {/* Projects, Skills, and Contact Section (Second fold - visible upon scroll) */}
      <section className="relative z-10 max-w-7xl mx-auto px-5 pt-8 pb-20 space-y-20 md:px-10 lg:px-16">
        <div id="projects" className="space-y-4 pt-0">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 font-mono">Projects</p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...projects].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0)).map(project => (
              <ProjectCard
                key={project.title}
                project={project}
                getEmbedUrl={getEmbedUrl}
              />
            ))}
          </div>
        </div>

        <div className="space-y-4 pt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 font-mono">Skills</p>
          <div className="flex flex-wrap gap-2">
            {skills.map(skill => (
              <span
                key={skill}
                className="border border-neutral-200 bg-white/80 px-3.5 py-2 text-xs font-medium text-neutral-700 backdrop-blur-sm hover:border-neutral-400 hover:text-neutral-900 transition-all duration-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div id="contact" className="space-y-4 pt-6 pb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 font-mono">Contact Info</p>
          <div className="flex flex-wrap gap-3">
            <a
              href={`mailto:${contact.email}`}
              className="flex-grow min-w-[240px] border border-neutral-200 bg-white/85 px-4 py-3 text-sm font-medium text-neutral-800 hover:border-neutral-400 hover:bg-neutral-50 transition-all duration-200 shadow-sm backdrop-blur-sm flex flex-col gap-0.5"
            >
              <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">Email</span>
              <span>{contact.email}</span>
            </a>
            <a
              href={`tel:+${contact.phone}`}
              className="flex-grow min-w-[160px] border border-neutral-200 bg-white/85 px-4 py-3 text-sm font-medium text-neutral-800 hover:border-neutral-400 hover:bg-neutral-50 transition-all duration-200 shadow-sm backdrop-blur-sm flex flex-col gap-0.5"
            >
              <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">Phone</span>
              <span>+{contact.phone}</span>
            </a>
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-grow min-w-[160px] border border-neutral-200 bg-white/85 px-4 py-3 text-sm font-medium text-neutral-800 hover:border-neutral-400 hover:bg-neutral-50 transition-all duration-200 shadow-sm backdrop-blur-sm flex flex-col gap-0.5"
            >
              <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">GitHub</span>
              <span>Ravish-Paul</span>
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-grow min-w-[160px] border border-neutral-200 bg-white/85 px-4 py-3 text-sm font-medium text-neutral-800 hover:border-neutral-400 hover:bg-neutral-50 transition-all duration-200 shadow-sm backdrop-blur-sm flex flex-col gap-0.5"
            >
              <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">LinkedIn</span>
              <span>ravish-paul</span>
            </a>
            <a
              href={contact.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-grow min-w-[160px] border border-neutral-200 bg-white/85 px-4 py-3 text-sm font-medium text-neutral-800 hover:border-neutral-400 hover:bg-neutral-50 transition-all duration-200 shadow-sm backdrop-blur-sm flex flex-col gap-0.5"
            >
              <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">X / Twitter</span>
              <span>PaulkrScratch</span>
            </a>
          </div>

          {/* Footer Area with Admin Link */}
          <div className="mt-16 pt-8 border-t border-neutral-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-neutral-400 font-mono">
            <span>© {new Date().getFullYear()} Ravish Paul. All rights reserved.</span>
            <a
              href="#admin"
              className="hover:text-neutral-900 transition-colors underline underline-offset-4"
            >
              Admin Dashboard
            </a>
          </div>
        </div>
      </section>

      {isAdmin && (
        <AdminPanel
          projects={projects}
          setProjects={setProjects}
          skills={skills}
          setSkills={setSkills}
          highlights={highlights}
          setHighlights={setHighlights}
          contact={contact}
          setContact={setContact}
          onClose={closeAdmin}
        />
      )}
    </main>
  );
}

export default App;

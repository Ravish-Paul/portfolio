import React, { useState } from 'react';

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

interface AdminPanelProps {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  skills: string[];
  setSkills: React.Dispatch<React.SetStateAction<string[]>>;
  highlights: string[];
  setHighlights: React.Dispatch<React.SetStateAction<string[]>>;
  contact: Contact;
  setContact: React.Dispatch<React.SetStateAction<Contact>>;
  onClose: () => void;
}

export default function AdminPanel({
  projects,
  setProjects,
  skills,
  setSkills,
  highlights,
  setHighlights,
  contact,
  setContact,
  onClose,
}: AdminPanelProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [savedPin, setSavedPin] = useState(() => {
    return localStorage.getItem('portfolio_admin_pin') || '1234';
  });

  const [activeTab, setActiveTab] = useState<'projects' | 'skills' | 'contact' | 'export'>('projects');

  // PIN authentication check
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === savedPin) {
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError('Incorrect PIN. Please try again.');
    }
  };

  // Change PIN state
  const [newPin, setNewPin] = useState('');
  const [pinSuccessMsg, setPinSuccessMsg] = useState('');
  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.length < 4) {
      setPinError('PIN must be at least 4 digits/characters.');
      return;
    }
    localStorage.setItem('portfolio_admin_pin', newPin);
    setSavedPin(newPin);
    setNewPin('');
    setPinSuccessMsg('PIN changed successfully!');
    setTimeout(() => setPinSuccessMsg(''), 3000);
  };

  // Local Storage Save helper
  const saveToLocalStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  interface ProjectFormState {
    title: string;
    description: string;
    tech: string[];
    github: string;
    live: string;
    images: string;
    video: string;
    pinned: boolean;
  }

  // Form states for Project CRUD
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [projectForm, setProjectForm] = useState<ProjectFormState>({
    title: '',
    description: '',
    tech: [],
    github: '',
    live: '',
    images: '', // comma-separated URLs in text field
    video: '',
    pinned: false,
  });
  const [techInput, setTechInput] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openAddForm = () => {
    setEditingIndex(null);
    setProjectForm({ title: '', description: '', tech: [], github: '', live: '', images: '', video: '', pinned: false });
    setTechInput('');
    setIsFormOpen(true);
  };

  const openEditForm = (index: number) => {
    setEditingIndex(index);
    const p = projects[index];
    
    // Support backwards compatibility for single `image` string or array `images`
    let imagesStr = '';
    if (p.images && p.images.length > 0) {
      imagesStr = p.images.join(', ');
    } else if ((p as any).image) {
      imagesStr = (p as any).image;
    }

    setProjectForm({
      title: p.title,
      description: p.description,
      tech: p.tech,
      github: p.github,
      live: p.live,
      images: imagesStr,
      video: p.video || '',
      pinned: !!p.pinned,
    });
    setTechInput(p.tech.join(', '));
    setIsFormOpen(true);
  };

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const techArray = techInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const imagesArray = projectForm.images
      .split(',')
      .map((img) => img.trim())
      .filter((img) => img.length > 0);

    const updatedProject: Project = {
      title: projectForm.title,
      description: projectForm.description,
      tech: techArray,
      github: projectForm.github,
      live: projectForm.live,
      images: imagesArray.length > 0 ? imagesArray : undefined,
      video: projectForm.video?.trim() || undefined,
      pinned: projectForm.pinned,
    };
    let newProjects = [...projects];

    if (editingIndex !== null) {
      newProjects[editingIndex] = updatedProject;
    } else {
      newProjects.push(updatedProject);
    }

    setProjects(newProjects);
    saveToLocalStorage('portfolio_projects', newProjects);
    setIsFormOpen(false);
    setEditingIndex(null);
  };

  const handleDeleteProject = (index: number) => {
    if (confirm('Are you sure you want to delete this project?')) {
      const newProjects = projects.filter((_, i) => i !== index);
      setProjects(newProjects);
      saveToLocalStorage('portfolio_projects', newProjects);
    }
  };

  // Skill Management
  const [newSkill, setNewSkill] = useState('');
  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      const updated = [...skills, newSkill.trim()];
      setSkills(updated);
      saveToLocalStorage('portfolio_skills', updated);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const updated = skills.filter((s) => s !== skillToRemove);
    setSkills(updated);
    saveToLocalStorage('portfolio_skills', updated);
  };

  // Highlights Management
  const [newHighlight, setNewHighlight] = useState('');
  const handleAddHighlight = (e: React.FormEvent) => {
    e.preventDefault();
    if (newHighlight.trim() && !highlights.includes(newHighlight.trim())) {
      const updated = [...highlights, newHighlight.trim()];
      setHighlights(updated);
      saveToLocalStorage('portfolio_highlights', updated);
      setNewHighlight('');
    }
  };

  const handleRemoveHighlight = (highlightToRemove: string) => {
    const updated = highlights.filter((h) => h !== highlightToRemove);
    setHighlights(updated);
    saveToLocalStorage('portfolio_highlights', updated);
  };

  // Contact management
  const handleContactChange = (field: keyof Contact, value: string) => {
    const updated = { ...contact, [field]: value };
    setContact(updated);
    saveToLocalStorage('portfolio_contact', updated);
  };

  // Reset all to defaults
  const handleResetToDefaults = () => {
    if (confirm('Are you sure you want to reset all data to the default portfolio configurations? This will delete local edits.')) {
      localStorage.removeItem('portfolio_projects');
      localStorage.removeItem('portfolio_skills');
      localStorage.removeItem('portfolio_highlights');
      localStorage.removeItem('portfolio_contact');
      // Reload page to re-initialize
      window.location.reload();
    }
  };

  // Code Export Code Generation
  const generateExportCode = () => {
    const formatTech = (tech: string[]) => `[${tech.map(t => `'${t}'`).join(', ')}]`;
    const formatImages = (imgs: string[] | undefined) => imgs && imgs.length > 0 ? `[${imgs.map(t => `'${t.replace(/'/g, "\\'")}'`).join(', ')}]` : '[]';
    
    const projectsCode = `const projects = [\n` + 
      projects.map(p => `  {\n` +
        `    title: '${p.title.replace(/'/g, "\\'")}',\n` +
        `    description: '${p.description.replace(/'/g, "\\'")}',\n` +
        `    tech: ${formatTech(p.tech)},\n` +
        `    github: '${p.github}',\n` +
        `    live: '${p.live}'${p.images && p.images.length > 0 ? `,\n    images: ${formatImages(p.images)}` : ''}${p.video ? `,\n    video: '${p.video}'` : ''}${p.pinned ? `,\n    pinned: true` : ''}\n  }`).join(',\n') + 
      `\n];`;

    const skillsCode = `const skills = [\n` +
      skills.map(s => `  '${s.replace(/'/g, "\\'")}'`).join(',\n') +
      `\n];`;

    const highlightsCode = `const highlights = [\n` +
      highlights.map(h => `  '${h.replace(/'/g, "\\'")}'`).join(',\n') +
      `\n];`;

    const contactCode = `const contact = {\n` +
      `  email: '${contact.email}',\n` +
      `  github: '${contact.github}',\n` +
      `  linkedin: '${contact.linkedin}',\n` +
      `  twitter: '${contact.twitter}',\n` +
      `  phone: '${contact.phone}'\n` +
      `};`;

    return `${highlightsCode}\n\n${contactCode}\n\n${projectsCode}\n\n${skillsCode}`;
  };

  const [copiedCode, setCopiedCode] = useState(false);
  const handleCopyCode = () => {
    navigator.clipboard.writeText(generateExportCode());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white p-6 md:p-10">
        <div className="w-full max-w-md space-y-8 border border-neutral-200 bg-white p-8 shadow-sm">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-neutral-950">Portfolio Admin Login</h2>
            <p className="mt-2 text-sm text-neutral-500">
              Enter your PIN to manage your portfolio contents.
            </p>
            <p className="mt-1 text-xs text-neutral-400 font-mono">
              (Default PIN is <span className="font-bold text-neutral-600">1234</span>)
            </p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="pin-input" className="block text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Admin PIN
              </label>
              <input
                id="pin-input"
                type="password"
                required
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="••••"
                className="mt-2 block w-full border border-neutral-200 bg-white px-4 py-3 text-center text-lg font-bold font-mono tracking-[0.5em] text-neutral-950 placeholder-neutral-300 focus:border-neutral-400 focus:outline-none focus:ring-0"
              />
              {pinError && (
                <p className="mt-2 text-xs text-red-600">{pinError}</p>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 border border-neutral-200 bg-white py-3 text-sm font-semibold text-neutral-700 transition-all hover:bg-neutral-50 hover:border-neutral-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 border border-neutral-950 bg-neutral-950 py-3 text-sm font-semibold text-white transition-all hover:bg-neutral-800"
              >
                Unlock
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-neutral-50 overflow-hidden text-neutral-800">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-neutral-200 bg-white px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <h1 className="text-lg font-bold tracking-tight text-neutral-950">Portfolio Admin Center</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleResetToDefaults}
            className="hidden sm:inline-block border border-neutral-200 bg-white px-4 py-2 text-xs font-semibold text-red-600 transition-all hover:bg-red-50 hover:border-red-200"
          >
            Reset Defaults
          </button>
          <button
            onClick={onClose}
            className="border border-neutral-950 bg-neutral-950 px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-neutral-800"
          >
            Exit Admin
          </button>
        </div>
      </header>

      {/* Main Panel Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Navigation Sidebar */}
        <aside className="w-64 border-r border-neutral-200 bg-white hidden md:block">
          <nav className="p-4 space-y-1">
            <button
              onClick={() => setActiveTab('projects')}
              className={`w-full text-left px-4 py-3 text-sm font-semibold transition-all ${
                activeTab === 'projects'
                  ? 'bg-neutral-950 text-white shadow-sm'
                  : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-950'
              }`}
            >
              Projects ({projects.length})
            </button>
            <button
              onClick={() => setActiveTab('skills')}
              className={`w-full text-left px-4 py-3 text-sm font-semibold transition-all ${
                activeTab === 'skills'
                  ? 'bg-neutral-950 text-white shadow-sm'
                  : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-950'
              }`}
            >
              Skills & Expertise
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className={`w-full text-left px-4 py-3 text-sm font-semibold transition-all ${
                activeTab === 'contact'
                  ? 'bg-neutral-950 text-white shadow-sm'
                  : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-950'
              }`}
            >
              Contact Details
            </button>
            <button
              onClick={() => setActiveTab('export')}
              className={`w-full text-left px-4 py-3 text-sm font-semibold transition-all ${
                activeTab === 'export'
                  ? 'bg-neutral-950 text-white shadow-sm'
                  : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-950'
              }`}
            >
              Export Code
            </button>
          </nav>

          {/* Change PIN box */}
          <div className="p-6 border-t border-neutral-100 mt-12 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Change Admin PIN</h3>
            <form onSubmit={handleChangePin} className="space-y-3">
              <input
                type="password"
                placeholder="New PIN"
                value={newPin}
                onChange={(e) => setNewPin(e.target.value)}
                className="w-full border border-neutral-200 px-3 py-1.5 text-sm placeholder-neutral-300 focus:outline-none focus:border-neutral-400"
              />
              <button
                type="submit"
                className="w-full border border-neutral-200 bg-white py-1.5 text-xs font-semibold text-neutral-700 hover:bg-neutral-50"
              >
                Update PIN
              </button>
              {pinSuccessMsg && (
                <p className="text-[11px] text-emerald-600">{pinSuccessMsg}</p>
              )}
            </form>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-neutral-50 p-6 md:p-10">
          {/* Mobile Tab Select */}
          <div className="md:hidden mb-6">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value as any)}
              className="w-full border border-neutral-200 bg-white px-4 py-3 text-sm font-semibold text-neutral-800 focus:outline-none"
            >
              <option value="projects">Projects ({projects.length})</option>
              <option value="skills">Skills & Expertise</option>
              <option value="contact">Contact Details</option>
              <option value="export">Export Code</option>
            </select>
          </div>

          {/* PROJECTS TAB */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-neutral-950">Projects</h2>
                  <p className="text-sm text-neutral-500 mt-1">Manage the projects featured in your portfolio section.</p>
                </div>
                {!isFormOpen && (
                  <button
                    onClick={openAddForm}
                    className="border border-neutral-950 bg-neutral-950 px-4 py-2.5 text-xs font-semibold text-white transition-all hover:bg-neutral-800"
                  >
                    Add Project
                  </button>
                )}
              </div>

              {isFormOpen ? (
                <form onSubmit={handleProjectSubmit} className="border border-neutral-200 bg-white p-6 shadow-sm space-y-5">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-500 pb-2 border-b border-neutral-100">
                    {editingIndex !== null ? 'Edit Project' : 'New Project'}
                  </h3>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="space-y-1">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500">Project Title</label>
                      <input
                        type="text"
                        required
                        value={projectForm.title}
                        onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                        className="w-full border border-neutral-200 px-4 py-2.5 text-sm focus:outline-none focus:border-neutral-400"
                        placeholder="e.g. AI Chatbot"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500">Tech Stack (comma separated)</label>
                      <input
                        type="text"
                        required
                        value={techInput}
                        onChange={(e) => setTechInput(e.target.value)}
                        className="w-full border border-neutral-200 px-4 py-2.5 text-sm focus:outline-none focus:border-neutral-400"
                        placeholder="e.g. Python, LangChain, React"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500">Description</label>
                    <textarea
                      required
                      value={projectForm.description}
                      onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                      className="w-full border border-neutral-200 px-4 py-2.5 text-sm focus:outline-none focus:border-neutral-400 min-h-[100px]"
                      placeholder="Brief overview of the project functionality and tech integrations."
                    />
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="space-y-1">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500">GitHub Repository URL</label>
                      <input
                        type="url"
                        value={projectForm.github}
                        onChange={(e) => setProjectForm({ ...projectForm, github: e.target.value })}
                        className="w-full border border-neutral-200 px-4 py-2.5 text-sm focus:outline-none focus:border-neutral-400"
                        placeholder="https://github.com/..."
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500">Live Demo URL</label>
                      <input
                        type="url"
                        value={projectForm.live}
                        onChange={(e) => setProjectForm({ ...projectForm, live: e.target.value })}
                        className="w-full border border-neutral-200 px-4 py-2.5 text-sm focus:outline-none focus:border-neutral-400"
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="space-y-1">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500">Project Image URLs (comma separated, optional)</label>
                      <textarea
                        value={projectForm.images || ''}
                        onChange={(e) => setProjectForm({ ...projectForm, images: e.target.value })}
                        className="w-full border border-neutral-200 px-4 py-2.5 text-sm focus:outline-none focus:border-neutral-400 min-h-[46px] resize-y"
                        placeholder="https://url1.com/img.png, https://url2.com/img.png"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500">Video Demo URL (Optional)</label>
                      <input
                        type="url"
                        value={projectForm.video || ''}
                        onChange={(e) => setProjectForm({ ...projectForm, video: e.target.value })}
                        className="w-full border border-neutral-200 px-4 py-2.5 text-sm focus:outline-none focus:border-neutral-400"
                        placeholder="https://youtube.com/watch?... or direct .mp4"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="pinned-checkbox"
                      checked={projectForm.pinned}
                      onChange={(e) => setProjectForm({ ...projectForm, pinned: e.target.checked })}
                      className="h-4 w-4 rounded border-neutral-300 text-neutral-950 focus:ring-0 focus:ring-offset-0"
                    />
                    <label htmlFor="pinned-checkbox" className="text-xs font-semibold uppercase tracking-wider text-neutral-600 select-none cursor-pointer">
                      Pin Project to Top (📌 Featured)
                    </label>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-neutral-100">
                    <button
                      type="button"
                      onClick={() => setIsFormOpen(false)}
                      className="border border-neutral-200 bg-white px-5 py-2.5 text-xs font-semibold text-neutral-600 hover:bg-neutral-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="border border-neutral-950 bg-neutral-950 px-5 py-2.5 text-xs font-semibold text-white hover:bg-neutral-800"
                    >
                      Save Project
                    </button>
                  </div>
                </form>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {projects.map((project, idx) => (
                    <div key={idx} className="border border-neutral-200 bg-white p-5 shadow-sm flex flex-col justify-between h-full">
                      <div>
                        <h3 className="font-bold text-neutral-950 text-base flex items-center gap-2">
                          {project.title}
                          {project.pinned && (
                            <span className="text-xs px-2 py-0.5 bg-neutral-100 text-neutral-600 font-normal rounded font-mono">
                              📌 Pinned
                            </span>
                          )}
                        </h3>
                        <p className="mt-2 text-xs text-neutral-500 leading-relaxed line-clamp-3">{project.description}</p>
                        <div className="mt-3 flex flex-wrap gap-1 text-[10px] font-semibold uppercase text-neutral-400">
                          {project.tech.join(' • ')}
                        </div>
                      </div>
                      <div className="mt-5 flex gap-2 border-t border-neutral-100 pt-3">
                        <button
                          onClick={() => openEditForm(idx)}
                          className="flex-1 border border-neutral-200 bg-white py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProject(idx)}
                          className="flex-1 border border-red-200 bg-red-50 py-2 text-xs font-semibold text-red-600 hover:bg-red-100 hover:border-red-300"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* SKILLS & EXPERTISE TAB */}
          {activeTab === 'skills' && (
            <div className="space-y-8">
              {/* Expertise (Highlights) */}
              <div className="border border-neutral-200 bg-white p-6 shadow-sm space-y-4">
                <div>
                  <h2 className="text-lg font-bold text-neutral-950">Expertise / Highlights</h2>
                  <p className="text-xs text-neutral-500 mt-1">Highlighted tags that appear under your Hero text section.</p>
                </div>

                <form onSubmit={handleAddHighlight} className="flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Add highlight (e.g. Vector Databases)"
                    value={newHighlight}
                    onChange={(e) => setNewHighlight(e.target.value)}
                    className="flex-1 border border-neutral-200 px-4 py-2 text-sm focus:outline-none focus:border-neutral-400"
                  />
                  <button
                    type="submit"
                    className="border border-neutral-950 bg-neutral-950 px-4 py-2 text-xs font-semibold text-white hover:bg-neutral-800"
                  >
                    Add
                  </button>
                </form>

                <div className="flex flex-wrap gap-2 pt-2">
                  {highlights.map((h, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1.5 border border-neutral-200 bg-neutral-50 pl-3 pr-2 py-1.5 text-xs font-semibold text-neutral-700"
                    >
                      {h}
                      <button
                        type="button"
                        onClick={() => handleRemoveHighlight(h)}
                        className="text-neutral-400 hover:text-red-500 font-bold ml-1 text-sm leading-none"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="border border-neutral-200 bg-white p-6 shadow-sm space-y-4">
                <div>
                  <h2 className="text-lg font-bold text-neutral-950">Skills Grid</h2>
                  <p className="text-xs text-neutral-500 mt-1">Tags shown in the Skills section of your portfolio.</p>
                </div>

                <form onSubmit={handleAddSkill} className="flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Add skill (e.g. PyTorch)"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    className="flex-1 border border-neutral-200 px-4 py-2 text-sm focus:outline-none focus:border-neutral-400"
                  />
                  <button
                    type="submit"
                    className="border border-neutral-950 bg-neutral-950 px-4 py-2 text-xs font-semibold text-white hover:bg-neutral-800"
                  >
                    Add
                  </button>
                </form>

                <div className="flex flex-wrap gap-2 pt-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1.5 border border-neutral-200 bg-neutral-50 pl-3 pr-2 py-1.5 text-xs font-semibold text-neutral-700"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="text-neutral-400 hover:text-red-500 font-bold ml-1 text-sm leading-none"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* CONTACT INFO TAB */}
          {activeTab === 'contact' && (
            <div className="border border-neutral-200 bg-white p-6 shadow-sm space-y-6">
              <div>
                <h2 className="text-lg font-bold text-neutral-950">Contact Information</h2>
                <p className="text-xs text-neutral-500 mt-1">
                  Updates details in both your Lanyard 3D Badge and the contact sections.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500">Email Address</label>
                  <input
                    type="email"
                    value={contact.email}
                    onChange={(e) => handleContactChange('email', e.target.value)}
                    className="w-full border border-neutral-200 px-4 py-2.5 text-sm focus:outline-none focus:border-neutral-400"
                    placeholder="email@example.com"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500">Phone (digits only)</label>
                  <input
                    type="text"
                    value={contact.phone}
                    onChange={(e) => handleContactChange('phone', e.target.value)}
                    className="w-full border border-neutral-200 px-4 py-2.5 text-sm focus:outline-none focus:border-neutral-400 font-mono"
                    placeholder="916200964060"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500">GitHub Profile Link</label>
                  <input
                    type="url"
                    value={contact.github}
                    onChange={(e) => handleContactChange('github', e.target.value)}
                    className="w-full border border-neutral-200 px-4 py-2.5 text-sm focus:outline-none focus:border-neutral-400"
                    placeholder="https://github.com/username"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500">LinkedIn Link</label>
                  <input
                    type="url"
                    value={contact.linkedin}
                    onChange={(e) => handleContactChange('linkedin', e.target.value)}
                    className="w-full border border-neutral-200 px-4 py-2.5 text-sm focus:outline-none focus:border-neutral-400"
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500">Twitter / X Link</label>
                  <input
                    type="url"
                    value={contact.twitter}
                    onChange={(e) => handleContactChange('twitter', e.target.value)}
                    className="w-full border border-neutral-200 px-4 py-2.5 text-sm focus:outline-none focus:border-neutral-400"
                    placeholder="https://x.com/username"
                  />
                </div>
              </div>
            </div>
          )}

          {/* EXPORT CODE TAB */}
          {activeTab === 'export' && (
            <div className="border border-neutral-200 bg-white p-6 shadow-sm space-y-6">
              <div>
                <h2 className="text-lg font-bold text-neutral-950">Export Portfolio Configuration Code</h2>
                <p className="text-xs text-neutral-500 mt-1">
                  Copy the code below, replace the corresponding constant arrays in `src/App.tsx`, and commit/push to Git to make your changes visible to everyone.
                </p>
              </div>

              <div className="relative">
                <pre className="w-full p-5 bg-neutral-900 text-neutral-100 rounded text-xs font-mono overflow-x-auto max-h-[450px]">
                  {generateExportCode()}
                </pre>
                <button
                  onClick={handleCopyCode}
                  className="absolute top-3 right-3 border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 text-white px-3 py-1.5 text-xs font-semibold transition-all rounded"
                >
                  {copiedCode ? 'Copied!' : 'Copy Code'}
                </button>
              </div>

              <div className="rounded border border-blue-100 bg-blue-50/50 p-4 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-800">Deployment Instructions</h4>
                <ol className="list-decimal pl-4 text-xs text-blue-900 space-y-1.5 leading-relaxed">
                  <li>Click <strong>Copy Code</strong> above.</li>
                  <li>Open the file <code className="font-mono bg-blue-100 px-1 rounded">src/App.tsx</code> in your editor.</li>
                  <li>Find the definitions for <code className="font-mono bg-blue-100 px-1 rounded">highlights</code>, <code className="font-mono bg-blue-100 px-1 rounded">contact</code>, <code className="font-mono bg-blue-100 px-1 rounded">projects</code>, and <code className="font-mono bg-blue-100 px-1 rounded">skills</code> near the top of the file (lines 5 to 50).</li>
                  <li>Replace those lines with the copied code block.</li>
                  <li>Commit and push to GitHub (e.g. <code className="font-mono bg-blue-100 px-1 rounded">git commit -am "Update portfolio projects via admin" && git push</code>).</li>
                  <li>Vercel will build and deploy the updated static website automatically!</li>
                </ol>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

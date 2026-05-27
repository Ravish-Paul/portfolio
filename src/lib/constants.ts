export interface Project {
  id?: string;
  title: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
  images?: string[];
  video?: string;
  pinned?: boolean;
}

export interface Contact {
  email: string;
  github: string;
  linkedin: string;
  twitter: string;
  phone: string;
}

export const DEFAULT_HIGHLIGHTS = ['LLM Apps', 'RAG Systems', 'AI Agents', 'Automation', 'NLP', 'Computer Vision'];

export const DEFAULT_CONTACT: Contact = {
  email: 'ravishpaulkr@gmail.com',
  github: 'https://github.com/Ravish-Paul',
  linkedin: 'https://www.linkedin.com/in/ravish-paul/',
  twitter: 'https://x.com/PaulkrScratch',
  phone: '916200964060'
};

export const DEFAULT_PROJECTS: Project[] = [
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

export const DEFAULT_SKILLS = [
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

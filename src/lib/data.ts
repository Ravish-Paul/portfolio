export const profile = {
  name: "Ravish Paul",
  title: "AI Engineer | Machine Learning Engineer | LLM Developer",
  tagline:
    "Building production-ready AI systems using Machine Learning, Deep Learning, NLP, Retrieval-Augmented Generation (RAG), AI Agents, and Large Language Models.",
  email: "ravishpaulkr@gmail.com",
  github: "https://github.com/Ravish-Paul",
  linkedin: "https://www.linkedin.com/in/ravish-paul/",
  x: "https://x.com/PaulkrScratch",
};

export const typingTexts = [
  "Machine Learning Engineer",
  "LLM Developer",
  "AI Engineer",
  "RAG Specialist",
  "AI Agent Builder",
];

export const expertise = [
  {
    title: "Machine Learning",
    description: "End-to-end model development, from feature engineering to deployment and monitoring.",
    icon: "BrainCircuit",
  },
  {
    title: "Deep Learning",
    description: "Neural network architectures built and trained with PyTorch.",
    icon: "Layers",
  },
  {
    title: "Natural Language Processing",
    description: "Text understanding, classification, and generation using transformer-based models.",
    icon: "MessageSquareText",
  },
  {
    title: "Large Language Models",
    description: "Fine-tuning, prompting, and integrating LLMs into production-grade applications.",
    icon: "Sparkles",
  },
  {
    title: "Retrieval-Augmented Generation",
    description: "Grounding LLM outputs in retrieved context via vector search and embeddings.",
    icon: "Search",
  },
  {
    title: "AI Agents",
    description: "Autonomous, multi-step agentic workflows that reason, plan, and execute tasks.",
    icon: "Bot",
  },
  {
    title: "Prompt Engineering",
    description: "Designing reliable, structured prompts for consistent model behavior.",
    icon: "Terminal",
  },
  {
    title: "Vector Databases",
    description: "Embedding storage and similarity search using FAISS for fast retrieval.",
    icon: "Database",
  },
];

export type Project = {
  slug: string;
  title: string;
  category: string;
  status: "Production" | "Flagship" | "Live";
  description: string;
  features: string[];
  technologies: string[];
  github: string;
  demo?: string;
  workflow: string[];
};

export const projects: Project[] = [
  {
    slug: "multi-agent-research-system",
    title: "Multi-Agent Research System",
    category: "Flagship Project",
    status: "Flagship",
    description:
      "A sophisticated multi-agent AI research assistant capable of performing web research, PDF knowledge retrieval, fact verification, content summarization, and structured report generation using autonomous AI workflows.",
    features: [
      "Multi-agent architecture",
      "Web research automation",
      "PDF retrieval system",
      "Fact verification",
      "Knowledge synthesis",
      "Structured report generation",
      "RAG integration",
    ],
    technologies: ["Python", "LangGraph", "LangChain", "Gemini", "FAISS", "RAG", "DuckDuckGo Search", "Streamlit"],
    github: "https://github.com/Ravish-Paul/Multi-Agent-Research-System",
    workflow: [
      "User Query",
      "Planner Agent",
      "Web Research Agent + PDF Retrieval Agent (FAISS)",
      "Fact Verification Agent",
      "Synthesis Agent",
      "Structured Report Output",
    ],
  },
  {
    slug: "ai-browser-agent",
    title: "AI Browser Agent",
    category: "Flagship Project",
    status: "Flagship",
    description:
      "AI-powered browser automation agent capable of controlling browser workflows through natural language instructions and autonomous decision making.",
    features: [
      "Browser automation",
      "AI decision making",
      "Agentic workflows",
      "Natural language commands",
      "Task execution",
      "Workflow automation",
    ],
    technologies: ["Python", "Groq API", "OpenAI SDK", "AI Agents", "Browser Automation"],
    github: "https://github.com/Ravish-Paul/ai-browser-agent",
    workflow: [
      "Natural Language Instruction",
      "Reasoning Agent (Groq / OpenAI)",
      "Action Planner",
      "Browser Controller",
      "Execution + Feedback Loop",
      "Task Completion",
    ],
  },
  {
    slug: "ai-pdf-chatbot",
    title: "AI PDF Chatbot",
    category: "Production AI Application",
    status: "Live",
    description:
      "Retrieval-Augmented Generation (RAG) chatbot enabling users to interact with PDF documents through natural language conversations.",
    features: [
      "PDF upload",
      "Semantic search",
      "Context retrieval",
      "Vector database integration",
      "Gemini-powered responses",
    ],
    technologies: ["Python", "LangChain", "FAISS", "Gemini API", "Streamlit"],
    github: "https://github.com/Ravish-Paul/RAG-pdf-chatbot",
    demo: "https://rag-pdf-chatbot-gemini.streamlit.app/",
    workflow: [
      "PDF Upload",
      "Chunking + Embedding",
      "FAISS Vector Store",
      "Semantic Retrieval",
      "Gemini Response Generation",
      "Conversational Answer",
    ],
  },
];

export const skills = {
  Programming: ["Python", "SQL"],
  "Machine Learning": ["Scikit-Learn", "XGBoost"],
  "Deep Learning": ["PyTorch"],
  NLP: ["Transformers", "Hugging Face"],
  "LLM Stack": ["LangChain", "RAG", "FAISS", "Vector Databases", "OpenAI API", "Gemini API", "Groq API"],
};

export const timeline = [
  { label: "Machine Learning", desc: "Built strong foundations in supervised & unsupervised learning, model evaluation, and classical ML algorithms." },
  { label: "Deep Learning", desc: "Designed and trained neural networks with PyTorch for complex pattern recognition." },
  { label: "NLP", desc: "Worked with transformer architectures and Hugging Face for text understanding and generation." },
  { label: "LLM Development", desc: "Integrated and fine-tuned large language models for real application use cases." },
  { label: "RAG Systems", desc: "Built retrieval pipelines combining vector databases with LLMs for grounded responses." },
  { label: "AI Agents", desc: "Developed autonomous, multi-agent systems capable of reasoning and executing tasks." },
  { label: "Production AI Applications", desc: "Shipped end-to-end AI products with real users, live demos, and reliable infrastructure." },
];

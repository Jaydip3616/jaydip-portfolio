// ── Category definitions ──────────────────────────────────────────────────────
export const techCategories = [
  { id: "all",      label: "All",               accent: "var(--primary)",  color: "#4965c4" },
  { id: "aidata",   label: "AI & Data Science", accent: "var(--primary)",  color: "#4965c4" },
  { id: "backend",  label: "AI Apps & Backend", accent: "var(--violet)",   color: "#7452d5" },
  { id: "database", label: "Data & Databases",  accent: "#0ea5a0",         color: "#0ea5a0" },
  { id: "tools",    label: "Dev Tools",         accent: "#16a34a",         color: "#16a34a" },
  { id: "bi",       label: "Visualization",     accent: "#d97706",         color: "#d97706" },
];

// ── Full tech stack ───────────────────────────────────────────────────────────
export const techStack = [
  // AI & Data Science
  { id: "python",    name: "Python",           category: "aidata",   icon: "SiPython",        desc: "Primary language for all data science, ML and automation work" },
  { id: "pandas",    name: "Pandas",           category: "aidata",   icon: "SiPandas",        desc: "Data manipulation and analysis at every scale" },
  { id: "numpy",     name: "NumPy",            category: "aidata",   icon: "SiNumpy",         desc: "Numerical computing and high-performance array operations" },
  { id: "sklearn",   name: "Scikit-learn",     category: "aidata",   icon: "SiScikitlearn",   desc: "Classical ML models, pipelines and evaluation" },
  { id: "tf",        name: "TensorFlow",       category: "aidata",   icon: "SiTensorflow",    desc: "Deep learning model building and training" },
  { id: "ml",        name: "Machine Learning", category: "aidata",   icon: "FiBriefcase",     desc: "End-to-end ML from feature engineering to deployment" },
  { id: "nlp",       name: "NLP",              category: "aidata",   icon: "FiMessageCircle", desc: "Text processing, tokenisation and language models" },
  { id: "genai",     name: "Generative AI",    category: "aidata",   icon: "FiCpu",           desc: "LLM integration, prompt engineering and AI features" },
  { id: "sql",       name: "SQL",              category: "aidata",   icon: "SiMysql",         desc: "Data querying, analysis and database management" },

  // AI Apps & Backend
  { id: "flask",     name: "Flask",            category: "backend",  icon: "SiFlask",         desc: "Python micro-framework for ML APIs and prototypes" },
  { id: "fastapi",   name: "FastAPI",          category: "backend",  icon: "SiFastapi",       desc: "High-performance async Python API framework" },
  { id: "restapi",   name: "REST API",         category: "backend",  icon: "FiCloud",         desc: "Designing and consuming RESTful interfaces" },
  { id: "langchain", name: "LangChain",        category: "backend",  icon: "FiLink",          desc: "LLM chains, agents and retrieval-augmented apps" },
  { id: "spacy",     name: "spaCy",            category: "backend",  icon: "FiFeather",       desc: "Industrial-strength NLP pipelines and entity recognition" },
  { id: "sentrans",  name: "Sentence Trans.",  category: "backend",  icon: "FiLayers",        desc: "Semantic similarity and embedding-based retrieval" },

  // Data & Databases
  { id: "mysql",     name: "MySQL",            category: "database", icon: "SiMysql",         desc: "Relational database design, querying and optimisation" },
  { id: "mongodb",   name: "MongoDB",          category: "database", icon: "SiMongodb",       desc: "Document-oriented NoSQL for flexible data structures" },
  { id: "postgres",  name: "PostgreSQL",       category: "database", icon: "SiPostgresql",    desc: "Advanced open-source relational database" },
  { id: "excel",     name: "Excel",            category: "database", icon: "FiGrid",          desc: "Data cleaning, pivot analysis and business reporting" },
  { id: "cleaning",  name: "Data Cleaning",    category: "database", icon: "FiFilter",        desc: "Handling missing values, outliers and inconsistencies" },
  { id: "datavis",   name: "Data Viz",         category: "database", icon: "FiBarChart2",     desc: "Turning raw data into clear, communicative charts" },

  // Dev Tools
  { id: "git",       name: "Git",              category: "tools",    icon: "SiGit",           desc: "Version control and branching strategies" },
  { id: "github",    name: "GitHub",           category: "tools",    icon: "SiGithub",        desc: "Code hosting, pull requests and CI/CD" },
  { id: "vscode",    name: "VS Code",          category: "tools",    icon: "FiCode",          desc: "Primary development environment" },
  { id: "jupyter",   name: "Jupyter",          category: "tools",    icon: "SiJupyter",       desc: "Interactive notebooks for exploration and reporting" },
  { id: "docker",    name: "Docker",           category: "tools",    icon: "SiDocker",        desc: "Containerisation for reproducible ML environments" },
  { id: "postman",   name: "Postman",          category: "tools",    icon: "SiPostman",       desc: "API testing and documentation" },
  { id: "linux",     name: "Linux",            category: "tools",    icon: "SiLinux",         desc: "Command-line proficiency and server work" },
  { id: "n8n",       name: "n8n",              category: "tools",    icon: "FiGitMerge",      desc: "No-code workflow automation and integrations" },

  // Visualization
  { id: "tableau",   name: "Tableau",          category: "bi",       icon: "FiPieChart",      desc: "Interactive dashboards and BI reporting" },
  { id: "powerbi",   name: "Power BI",         category: "bi",       icon: "FiDatabase",      desc: "Microsoft BI platform for data modelling and analytics" },
];

// ── Legacy default export (keeps App.jsx skill-cards working) ─────────────────
const skills = [
  {
    id: "ai",
    title: "AI & Machine Learning",
    description: "Build predictive systems from business data, from feature design through model evaluation.",
    technologies: ["Python", "scikit-learn", "TensorFlow", "NLP", "Deep Learning", "Feature Engineering"],
  },
  {
    id: "science",
    title: "Data Science",
    description: "Turn raw, messy information into clean datasets, trustworthy analysis, and model-ready insight.",
    technologies: ["Pandas", "NumPy", "Jupyter", "Data Cleaning", "EDA", "Statistical Thinking"],
  },
  {
    id: "analytics",
    title: "Data Analytics & Visualisation",
    description: "Use querying, dashboards, and clear reporting to turn performance data into direction.",
    technologies: ["SQL", "Power BI", "Tableau", "Excel", "KPI Analysis", "Data Storytelling"],
  },
  {
    id: "tools",
    title: "Automation & Development",
    description: "Create practical workflows and prototypes that reduce repetitive work and speed up delivery.",
    technologies: ["Flask", "FastAPI", "Git & GitHub", "n8n", "Docker", "VS Code"],
  },
];

export default skills;

// Category accent colors map to portfolio CSS variables
export const techCategories = [
  { id: "all",      label: "All",             accent: "var(--primary)" },
  { id: "aiml",     label: "AI / ML & Apps",  accent: "var(--primary)" },
  { id: "database", label: "Database",        accent: "#e05a2b" },
  { id: "tools",    label: "Tools & DevOps",  accent: "var(--lime)" },
  { id: "bi",       label: "Visualization",   accent: "#d97706" },
];

export const techStack = [
  // ── AI / ML & Apps (merged ai + backend) ──────────────────────────────────
  { id: "python",    name: "Python",           category: "aiml",     icon: "SiPython",        desc: "Primary language for data science, ML pipelines and automation" },
  { id: "pandas",    name: "Pandas",           category: "aiml",     icon: "SiPandas",        desc: "Data manipulation, cleaning and analysis at every scale" },
  { id: "numpy",     name: "NumPy",            category: "aiml",     icon: "SiNumpy",         desc: "Numerical computing and array operations" },
  { id: "sklearn",   name: "Scikit-learn",     category: "aiml",     icon: "SiScikitlearn",   desc: "Classical machine learning models and evaluation pipelines" },
  { id: "tf",        name: "TensorFlow",       category: "aiml",     icon: "SiTensorflow",    desc: "Deep learning model building and training" },
  { id: "ml",        name: "Machine Learning", category: "aiml",     icon: "FiBriefcase",     desc: "End-to-end ML workflows from feature engineering to deployment" },
  { id: "nlp",       name: "NLP",              category: "aiml",     icon: "FiMessageCircle", desc: "Text processing, tokenisation and language model applications" },
  { id: "genai",     name: "Generative AI",    category: "aiml",     icon: "FiCpu",           desc: "LLM integration, prompt engineering and AI-powered features" },
  { id: "sql",       name: "SQL",              category: "aiml",     icon: "SiMysql",         desc: "Data querying, analysis and database management" },
  { id: "flask",     name: "Flask",            category: "aiml",     icon: "SiFlask",         desc: "Lightweight Python web framework for ML APIs and prototypes" },
  { id: "fastapi",   name: "FastAPI",          category: "aiml",     icon: "SiFastapi",       desc: "High-performance async Python API framework" },
  { id: "restapi",   name: "REST API",         category: "aiml",     icon: "FiCloud",         desc: "Designing and consuming RESTful interfaces" },
  { id: "langchain", name: "LangChain",        category: "aiml",     icon: "FiLink",          desc: "Building LLM chains, agents and retrieval-augmented apps" },
  { id: "spacy",     name: "spaCy",            category: "aiml",     icon: "FiFeather",       desc: "Industrial-strength NLP pipelines and entity recognition" },
  { id: "sentrans",  name: "Sentence Trans.",  category: "aiml",     icon: "FiLayers",        desc: "Semantic similarity and embedding-based retrieval" },

  // ── Database & Data ────────────────────────────────────────────────────────
  { id: "mysql",     name: "MySQL",            category: "database", icon: "SiMysql",         desc: "Relational database design, querying and optimisation" },
  { id: "mongodb",   name: "MongoDB",          category: "database", icon: "SiMongodb",       desc: "Document-oriented NoSQL for flexible data structures" },
  { id: "postgres",  name: "PostgreSQL",       category: "database", icon: "SiPostgresql",    desc: "Advanced open-source relational database" },
  { id: "excel",     name: "Excel",            category: "database", icon: "FiGrid",          desc: "Data cleaning, pivot analysis and business reporting" },
  { id: "cleaning",  name: "Data Cleaning",    category: "database", icon: "FiFilter",        desc: "Handling missing values, outliers and inconsistencies" },
  { id: "datavis",   name: "Data Viz",         category: "database", icon: "FiBarChart2",     desc: "Turning raw data into clear, communicative charts" },

  // ── Tools & DevOps ─────────────────────────────────────────────────────────
  { id: "git",       name: "Git",              category: "tools",    icon: "SiGit",           desc: "Version control, branching strategies and collaboration" },
  { id: "github",    name: "GitHub",           category: "tools",    icon: "SiGithub",        desc: "Code hosting, pull requests and CI/CD workflows" },
  { id: "vscode",    name: "VS Code",          category: "tools",    icon: "FiCode",          desc: "Primary development environment with custom tooling" },
  { id: "jupyter",   name: "Jupyter",          category: "tools",    icon: "SiJupyter",       desc: "Interactive notebooks for exploration and reporting" },
  { id: "docker",    name: "Docker",           category: "tools",    icon: "SiDocker",        desc: "Containerisation for reproducible ML environments" },
  { id: "postman",   name: "Postman",          category: "tools",    icon: "SiPostman",       desc: "API testing, documentation and workflow automation" },
  { id: "linux",     name: "Linux",            category: "tools",    icon: "SiLinux",         desc: "Command-line proficiency and server environment work" },
  { id: "n8n",       name: "n8n",              category: "tools",    icon: "FiGitMerge",      desc: "No-code/low-code workflow automation and integrations" },

  // ── BI / Visualization ─────────────────────────────────────────────────────
  { id: "tableau",   name: "Tableau",          category: "bi",       icon: "FiPieChart",      desc: "Interactive dashboards and business intelligence reporting" },
  { id: "powerbi",   name: "Power BI",         category: "bi",       icon: "FiDatabase",      desc: "Microsoft BI platform for data modelling and visual analytics" },
];

// Legacy default export – keeps existing import in App.jsx working
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

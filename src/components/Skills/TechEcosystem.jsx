import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  SiPython, SiPandas, SiNumpy, SiScikitlearn, SiTensorflow,
  SiFlask, SiFastapi, SiMysql, SiMongodb, SiPostgresql,
  SiGit, SiGithub, SiJupyter, SiDocker, SiPostman, SiLinux,
} from "react-icons/si";
import {
  FiBriefcase, FiMessageCircle, FiCpu, FiCloud, FiLink,
  FiFeather, FiLayers, FiFilter, FiBarChart2, FiGitMerge,
  FiCode, FiGrid, FiPieChart, FiDatabase,
} from "react-icons/fi";
import "./TechEcosystem.css";

/* ── icon resolver ─────────────────────────────────────────── */
const ICONS = {
  SiPython, SiPandas, SiNumpy, SiScikitlearn, SiTensorflow,
  SiFlask, SiFastapi, SiMysql, SiMongodb, SiPostgresql,
  SiGit, SiGithub, SiJupyter, SiDocker, SiPostman, SiLinux,
  FiBriefcase, FiMessageCircle, FiCpu, FiCloud, FiLink,
  FiFeather, FiLayers, FiFilter, FiBarChart2, FiGitMerge,
  FiCode, FiGrid, FiPieChart, FiDatabase,
};
const Ico = ({ n, s = 26 }) => {
  const C = ICONS[n]; return C ? <C size={s} /> : <FiCpu size={s} />;
};

/* ── platform definitions ──────────────────────────────────── */
const PLATFORMS = [
  {
    id: "aidata",
    label: "AI & Data Science",
    color: "#4965c4",
    glow:  "rgba(73,101,196,0.55)",
    cone:  "rgba(73,101,196,0.18)",
    icons: [
      { id: "python",  name: "Python",           icon: "SiPython",        col: "#3776ab" },
      { id: "pandas",  name: "Pandas",           icon: "SiPandas",        col: "#150458" },
      { id: "numpy",   name: "NumPy",            icon: "SiNumpy",         col: "#4dabcf" },
      { id: "sklearn", name: "Scikit-learn",     icon: "SiScikitlearn",   col: "#f89a36" },
      { id: "tf",      name: "TensorFlow",       icon: "SiTensorflow",    col: "#ff6f00" },
      { id: "ml",      name: "Machine Learning", icon: "FiBriefcase",     col: "#4965c4" },
      { id: "nlp",     name: "NLP",              icon: "FiMessageCircle", col: "#7452d5" },
      { id: "genai",   name: "Generative AI",    icon: "FiCpu",           col: "#0ea5e9" },
      { id: "sql",     name: "SQL",              icon: "SiMysql",         col: "#4479a1" },
    ],
  },
  {
    id: "backend",
    label: "AI Apps & Backend",
    color: "#7452d5",
    glow:  "rgba(116,82,213,0.55)",
    cone:  "rgba(116,82,213,0.18)",
    icons: [
      { id: "flask",     name: "Flask",           icon: "SiFlask",     col: "#000000" },
      { id: "fastapi",   name: "FastAPI",         icon: "SiFastapi",   col: "#009688" },
      { id: "restapi",   name: "REST API",        icon: "FiCloud",     col: "#7452d5" },
      { id: "langchain", name: "LangChain",       icon: "FiLink",      col: "#1c3d5a" },
      { id: "spacy",     name: "spaCy",           icon: "FiFeather",   col: "#09a3d5" },
      { id: "sentrans",  name: "Sent. Trans.",    icon: "FiLayers",    col: "#6d28d9" },
    ],
  },
  {
    id: "database",
    label: "Data & Databases",
    color: "#0ea5a0",
    glow:  "rgba(14,165,160,0.55)",
    cone:  "rgba(14,165,160,0.18)",
    icons: [
      { id: "mysql",    name: "MySQL",         icon: "SiMysql",      col: "#4479a1" },
      { id: "mongodb",  name: "MongoDB",       icon: "SiMongodb",    col: "#47a248" },
      { id: "postgres", name: "PostgreSQL",    icon: "SiPostgresql", col: "#336791" },
      { id: "excel",    name: "Excel",         icon: "FiGrid",       col: "#217346" },
      { id: "cleaning", name: "Data Cleaning", icon: "FiFilter",     col: "#0ea5a0" },
      { id: "datavis",  name: "Data Viz",      icon: "FiBarChart2",  col: "#f59e0b" },
    ],
  },
  {
    id: "tools",
    label: "Development Tools",
    color: "#16a34a",
    glow:  "rgba(22,163,74,0.55)",
    cone:  "rgba(22,163,74,0.18)",
    icons: [
      { id: "git",     name: "Git",     icon: "SiGit",     col: "#f05032" },
      { id: "github",  name: "GitHub",  icon: "SiGithub",  col: "#333333" },
      { id: "vscode",  name: "VS Code", icon: "FiCode",    col: "#007acc" },
      { id: "jupyter", name: "Jupyter", icon: "SiJupyter", col: "#f37626" },
      { id: "docker",  name: "Docker",  icon: "SiDocker",  col: "#2496ed" },
      { id: "postman", name: "Postman", icon: "SiPostman", col: "#ff6c37" },
      { id: "linux",   name: "Linux",   icon: "SiLinux",   col: "#fcc624" },
      { id: "n8n",     name: "n8n",     icon: "FiGitMerge",col: "#ea4b71" },
    ],
  },
  {
    id: "bi",
    label: "Visualization",
    color: "#d97706",
    glow:  "rgba(217,119,6,0.55)",
    cone:  "rgba(217,119,6,0.18)",
    icons: [
      { id: "tableau", name: "Tableau",  icon: "FiPieChart", col: "#e97627" },
      { id: "powerbi", name: "Power BI", icon: "FiDatabase", col: "#f2c811" },
    ],
  },
];

/* ── marquee ───────────────────────────────────────────────── */
const MARQUEE = [
  "Python","Machine Learning","TensorFlow","NLP","Generative AI",
  "Flask","FastAPI","LangChain","SQL","PostgreSQL",
  "Docker","Git","Jupyter","n8n","Power BI","Tableau",
];

/* ── icon hover label ──────────────────────────────────────── */
const labelV = {
  hidden:  { opacity: 0, y: 6, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.16 } },
};

function FloatIcon({ item, index, platformColor, total, inView }) {
  const [hovered, setHovered] = useState(false);

  /* arrange in a triangle / arc above the platform */
  const cols = Math.ceil(Math.sqrt(total + 1));
  const row  = Math.floor(index / cols);
  const col  = index % cols;
  const rowCount = Math.ceil(total / cols);
  const xOffset  = (col - (cols - 1) / 2) * 68;
  /* higher rows are visually higher (more negative y) */
  const yBase    = -(row * 72) - 40;
  /* slight depth scale: bottom row slightly bigger */
  const depthScale = 0.82 + (rowCount - row) * 0.06;

  const floatDelay  = index * 0.08;
  const floatOffset = (index % 3) * 1.4;  /* stagger float cycle */

  return (
    <motion.div
      className="te-float-icon"
      style={{
        "--icon-col":   item.col,
        "--icon-x":     `${xOffset}px`,
        "--icon-y":     `${yBase}px`,
        "--depth-scale": depthScale,
        "--float-delay": `${floatOffset}s`,
      }}
      initial={{ opacity: 0, y: 40, scale: 0.5 }}
      animate={inView
        ? { opacity: 1, y: 0, scale: 1, transition: {
            type: "spring", stiffness: 220, damping: 18,
            delay: floatDelay + 0.35,
          }}
        : { opacity: 0, y: 40, scale: 0.5 }
      }
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      tabIndex={0}
      role="img"
      aria-label={item.name}
    >
      <span className="te-float-icon__bubble">
        <Ico n={item.icon} s={22} />
      </span>

      <AnimatePresence>
        {hovered && (
          <motion.span
            className="te-float-icon__label"
            variants={labelV}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {item.name}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── single platform scene ─────────────────────────────────── */
function Platform({ p, inView }) {
  const iconCount = p.icons.length;

  return (
    <motion.div
      className="te-platform-scene"
      style={{ "--p-color": p.color, "--p-glow": p.glow, "--p-cone": p.cone }}
      initial={{ opacity: 0, y: 50 }}
      animate={inView
        ? { opacity: 1, y: 0, transition: { type: "spring", stiffness: 160, damping: 22, delay: 0.1 } }
        : {}
      }
    >
      {/* floating icons above */}
      <div className="te-platform-icons" aria-label={`${p.label} technologies`}>
        {p.icons.map((item, i) => (
          <FloatIcon
            key={item.id}
            item={item}
            index={i}
            platformColor={p.color}
            total={iconCount}
            inView={inView}
          />
        ))}
      </div>

      {/* light cone beam */}
      <div className="te-platform-beam" aria-hidden="true" />

      {/* 3D disc platform */}
      <motion.div
        className="te-platform-disc"
        aria-hidden="true"
        initial={{ scaleX: 0.2, opacity: 0 }}
        animate={inView
          ? { scaleX: 1, opacity: 1, transition: { duration: 0.6, ease: [0.22,1,0.36,1], delay: 0.1 } }
          : {}
        }
      >
        <div className="te-platform-disc__top" />
        <div className="te-platform-disc__rim" />
        <div className="te-platform-disc__glow" />
        <div className="te-platform-disc__dot" />
      </motion.div>

      {/* label below platform */}
      <motion.p
        className="te-platform-label"
        initial={{ opacity: 0, y: 8 }}
        animate={inView
          ? { opacity: 1, y: 0, transition: { delay: 0.55, duration: 0.4 } }
          : {}
        }
      >
        {p.label}
      </motion.p>
    </motion.div>
  );
}

/* ── main export ───────────────────────────────────────────── */
export default function TechEcosystem() {
  const wrapRef = useRef(null);
  const inView  = useInView(wrapRef, { once: true, margin: "-80px" });

  return (
    <div className="te-wrap" ref={wrapRef}>

      {/* ── 3D scene ─────────────────────────────────────────── */}
      <div className="te-scene" aria-label="Technology skill platforms">
        {PLATFORMS.map((p) => (
          <Platform key={p.id} p={p} inView={inView} />
        ))}
      </div>

      {/* ── marquee strip ────────────────────────────────────── */}
      <motion.div
        className="te-strip"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1, transition: { delay: 1.2, duration: 0.6 } } : {}}
        aria-label="Core technologies"
      >
        <span className="te-strip__label">Core Stack</span>
        <div className="te-strip__track" aria-hidden="true">
          <div className="te-strip__inner">
            {[...MARQUEE, ...MARQUEE].map((name, i) => (
              <span key={i} className="te-strip__item">
                {name}<span className="te-strip__sep" aria-hidden="true">•</span>
              </span>
            ))}
          </div>
        </div>
      </motion.div>

    </div>
  );
}

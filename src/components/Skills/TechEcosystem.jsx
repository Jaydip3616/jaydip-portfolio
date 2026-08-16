import { useRef } from "react";
import { motion, useInView } from "framer-motion";
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

/* ── icon registry ─────────────────────────────────────────── */
const ICONS = {
  SiPython, SiPandas, SiNumpy, SiScikitlearn, SiTensorflow,
  SiFlask, SiFastapi, SiMysql, SiMongodb, SiPostgresql,
  SiGit, SiGithub, SiJupyter, SiDocker, SiPostman, SiLinux,
  FiBriefcase, FiMessageCircle, FiCpu, FiCloud, FiLink,
  FiFeather, FiLayers, FiFilter, FiBarChart2, FiGitMerge,
  FiCode, FiGrid, FiPieChart, FiDatabase,
};

const Icon = ({ name, size }) => {
  const C = ICONS[name];
  return C ? <C size={size} /> : <FiCpu size={size} />;
};

/* ── portal data ───────────────────────────────────────────── */
/* Each icon has a layout slot: row 0 = highest (smallest), row 1 = mid, row 2 = lowest (largest).
   Within each row, col positions it left/right of center beam axis. */
const PORTALS = [
  {
    id: "aidata",
    label: "AI & Data Science",
    color: "#5b7cfa",
    rgb:   "91,124,250",
    icons: [
      /* row 0 — highest, smallest — 1-2 icons */
      { id:"ml",     name:"Machine Learning", icon:"FiBriefcase",     row:0, col:0  },
      /* row 1 — middle */
      { id:"nlp",    name:"NLP",              icon:"FiMessageCircle", row:1, col:-1 },
      { id:"genai",  name:"Generative AI",    icon:"FiCpu",           row:1, col:1  },
      /* row 2 — lowest, largest */
      { id:"python", name:"Python",           icon:"SiPython",        row:2, col:-1 },
      { id:"tf",     name:"TensorFlow",       icon:"SiTensorflow",    row:2, col:0  },
      { id:"sklearn",name:"Scikit-learn",     icon:"SiScikitlearn",   row:2, col:1  },
      /* extras below platform edge (ground level) */
      { id:"pandas", name:"Pandas",           icon:"SiPandas",        row:3, col:-1 },
      { id:"numpy",  name:"NumPy",            icon:"SiNumpy",         row:3, col:0  },
      { id:"sql",    name:"SQL",              icon:"SiMysql",         row:3, col:1  },
    ],
  },
  {
    id: "backend",
    label: "AI Apps & Backend",
    color: "#a78bfa",
    rgb:   "167,139,250",
    icons: [
      { id:"langchain", name:"LangChain",     icon:"FiLink",          row:0, col:0  },
      { id:"spacy",     name:"spaCy",         icon:"FiFeather",       row:1, col:-1 },
      { id:"sentrans",  name:"Sent. Trans.",  icon:"FiLayers",        row:1, col:1  },
      { id:"flask",     name:"Flask",         icon:"SiFlask",         row:2, col:-1 },
      { id:"fastapi",   name:"FastAPI",       icon:"SiFastapi",       row:2, col:0  },
      { id:"restapi",   name:"REST API",      icon:"FiCloud",         row:2, col:1  },
    ],
  },
  {
    id: "database",
    label: "Data & Databases",
    color: "#34d399",
    rgb:   "52,211,153",
    icons: [
      { id:"cleaning", name:"Data Cleaning", icon:"FiFilter",         row:0, col:0  },
      { id:"datavis",  name:"Data Viz",      icon:"FiBarChart2",      row:1, col:-1 },
      { id:"excel",    name:"Excel",         icon:"FiGrid",           row:1, col:1  },
      { id:"mysql",    name:"MySQL",         icon:"SiMysql",          row:2, col:-1 },
      { id:"mongodb",  name:"MongoDB",       icon:"SiMongodb",        row:2, col:0  },
      { id:"postgres", name:"PostgreSQL",    icon:"SiPostgresql",     row:2, col:1  },
    ],
  },
  {
    id: "tools",
    label: "Dev Tools",
    color: "#38bdf8",
    rgb:   "56,189,248",
    icons: [
      { id:"n8n",     name:"n8n",      icon:"FiGitMerge",  row:0, col:0  },
      { id:"linux",   name:"Linux",    icon:"SiLinux",     row:1, col:-1 },
      { id:"vscode",  name:"VS Code",  icon:"FiCode",      row:1, col:1  },
      { id:"git",     name:"Git",      icon:"SiGit",       row:2, col:-1 },
      { id:"github",  name:"GitHub",   icon:"SiGithub",    row:2, col:0  },
      { id:"jupyter", name:"Jupyter",  icon:"SiJupyter",   row:2, col:1  },
      { id:"docker",  name:"Docker",   icon:"SiDocker",    row:3, col:-1 },
      { id:"postman", name:"Postman",  icon:"SiPostman",   row:3, col:1  },
    ],
  },
  {
    id: "bi",
    label: "Visualization",
    color: "#fbbf24",
    rgb:   "251,191,36",
    icons: [
      { id:"tableau", name:"Tableau",  icon:"FiPieChart",  row:1, col:-1 },
      { id:"powerbi", name:"Power BI", icon:"FiDatabase",  row:1, col:1  },
    ],
  },
];

/* ── row → visual height above platform (px), scale, opacity ── */
/* Row 2 = just above beam mouth (big), Row 0 = top of beam (small) */
const ROW_CONFIG = [
  { bottom: 310, scale: 0.72, opacity: 0.82 }, // row 0 — highest, smallest
  { bottom: 210, scale: 0.86, opacity: 0.90 }, // row 1 — middle
  { bottom: 120, scale: 1.00, opacity: 1.00 }, // row 2 — lowest, largest
  { bottom:  52, scale: 1.08, opacity: 1.00 }, // row 3 — ground level, biggest
];

/* column offset (px) — negative = left, 0 = center, positive = right */
const COL_OFFSET = { "-1": -52, "0": 0, "1": 52 };

/* ── marquee ───────────────────────────────────────────────── */
const MARQUEE = [
  "Python","TensorFlow","Scikit-learn","NLP","Generative AI",
  "Flask","FastAPI","LangChain","SQL","MongoDB","PostgreSQL",
  "Docker","Git","Jupyter","n8n","Tableau","Power BI",
];

/* ── portal component ──────────────────────────────────────── */
function Portal({ portal, inView }) {
  const baseDelay = 0.1;

  return (
    <div className="portal" style={{ "--p-color": portal.color, "--p-rgb": portal.rgb }}>

      {/* ── category label (above everything) ─── */}
      <motion.p
        className="portal__label"
        initial={{ opacity: 0, y: -8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: baseDelay + 1.4, duration: 0.5 }}
      >
        {portal.label}
      </motion.p>

      {/* ── floating icons inside / above the beam ─── */}
      <div className="portal__icon-field" aria-label={portal.label}>
        {portal.icons.map((item, i) => {
          const cfg = ROW_CONFIG[item.row] ?? ROW_CONFIG[2];
          const xOff = COL_OFFSET[String(item.col)] ?? 0;
          /* stagger: icons emerge bottom-first */
          const delay = baseDelay + 0.55 + (3 - item.row) * 0.12 + i * 0.07;
          const iconSize = Math.round(cfg.scale * 26);

          return (
            <motion.div
              key={item.id}
              className="portal__icon"
              style={{
                "--ix": `${xOff}px`,
                "--iy": `${cfg.bottom}px`,
                "--is": cfg.scale,
                "--io": cfg.opacity,
                "--fd": `${(i % 3) * 1.3}s`,
              }}
              initial={{ opacity: 0, y: 40 * cfg.scale }}
              animate={inView ? {
                opacity: cfg.opacity,
                y: 0,
                transition: {
                  type: "spring", stiffness: 180, damping: 20, delay,
                },
              } : {}}
              whileHover={{
                y: -10, scale: 1.18,
                transition: { type: "spring", stiffness: 300, damping: 18 },
              }}
              tabIndex={0}
              role="img"
              aria-label={item.name}
            >
              <span className="portal__icon-bg">
                <Icon name={item.icon} size={iconSize} />
              </span>
              <span className="portal__icon-name">{item.name}</span>
            </motion.div>
          );
        })}
      </div>

      {/* ── cone beam (SVG gradient for exact reference-match) ─── */}
      <motion.div
        className="portal__beam"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={inView ? { scaleY: 1, opacity: 1 } : {}}
        transition={{ delay: baseDelay + 0.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <svg className="portal__beam-svg" viewBox="0 0 160 340" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id={`cone-${portal.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor={`rgba(${portal.rgb},0)`} />
              <stop offset="35%"  stopColor={`rgba(${portal.rgb},0.08)`} />
              <stop offset="75%"  stopColor={`rgba(${portal.rgb},0.22)`} />
              <stop offset="100%" stopColor={`rgba(${portal.rgb},0.38)`} />
            </linearGradient>
          </defs>
          {/* inverted triangle: narrow at top-center, wide at bottom */}
          <polygon
            points="80,0 0,340 160,340"
            fill={`url(#cone-${portal.id})`}
          />
          {/* soft center spine */}
          <line x1="80" y1="0" x2="80" y2="340"
            stroke={`rgba(${portal.rgb},0.28)`}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        {/* beam edge glow lines */}
        <div className="portal__beam-edge portal__beam-edge--l" />
        <div className="portal__beam-edge portal__beam-edge--r" />
      </motion.div>

      {/* ── 3D circular disc platform ─── */}
      <motion.div
        className="portal__disc"
        initial={{ scaleX: 0.15, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ delay: baseDelay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* disc top face */}
        <div className="portal__disc-top">
          <div className="portal__disc-dot" />
          {/* ring pulse on activate */}
          <motion.div
            className="portal__disc-ring"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={inView ? { opacity: [0, 1, 0], scale: [0.6, 1.4, 1.8] } : {}}
            transition={{ delay: baseDelay + 0.15, duration: 1.2, ease: "easeOut" }}
          />
        </div>
        {/* disc side (3D depth) */}
        <div className="portal__disc-side" />
        {/* ground glow */}
        <div className="portal__disc-glow" />
      </motion.div>

    </div>
  );
}

/* ── main export ───────────────────────────────────────────── */
export default function TechEcosystem() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div className="te-wrap" ref={ref}>

      {/* 5 portal scene */}
      <div className="te-scene" aria-label="Technology skill portals">
        {PORTALS.map((p) => (
          <Portal key={p.id} portal={p} inView={inView} />
        ))}
      </div>

      {/* marquee */}
      <motion.div
        className="te-strip"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 2, duration: 0.6 }}
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

import { useRef } from "react";
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

/* ── icon lookup ─────────────────────────────────────────── */
const ICONS = {
  SiPython, SiPandas, SiNumpy, SiScikitlearn, SiTensorflow,
  SiFlask, SiFastapi, SiMysql, SiMongodb, SiPostgresql,
  SiGit, SiGithub, SiJupyter, SiDocker, SiPostman, SiLinux,
  FiBriefcase, FiMessageCircle, FiCpu, FiCloud, FiLink,
  FiFeather, FiLayers, FiFilter, FiBarChart2, FiGitMerge,
  FiCode, FiGrid, FiPieChart, FiDatabase,
};
const I = ({ n, s = 22 }) => { const C = ICONS[n]; return C ? <C size={s} /> : <FiCpu size={s} />; };

/* ── marquee ─────────────────────────────────────────────── */
const MARQUEE = [
  "Python","TensorFlow","Scikit-learn","NLP","Generative AI",
  "Flask","FastAPI","LangChain","SQL","MongoDB","PostgreSQL",
  "Docker","Git","Jupyter","n8n","Tableau","Power BI",
];

/*
 * GROUPS — 4 groups.
 * Each icon has:
 *   row:  0 = top (smallest, most transparent)
 *         1 = middle
 *         2 = bottom row (largest, most opaque)
 *   col:  integer column position (0 = centre, negative = left, positive = right)
 *         spacing between cols is controlled by CSS --col-gap
 */
const GROUPS = [
  {
    id:    "aidata",
    label: "AI & Data Science",
    color: "#6b8cff",
    rgb:   "107,140,255",
    icons: [
      /* row 0 — 1 icon centred at top */
      { id:"ml",      name:"Machine Learning", icon:"FiBriefcase",     row:0, col: 0 },
      /* row 1 — 3 icons */
      { id:"nlp",     name:"NLP",              icon:"FiMessageCircle", row:1, col:-1 },
      { id:"genai",   name:"Generative AI",    icon:"FiCpu",           row:1, col: 0 },
      { id:"tf",      name:"TensorFlow",       icon:"SiTensorflow",    row:1, col: 1 },
      /* row 2 — 4 icons */
      { id:"python",  name:"Python",           icon:"SiPython",        row:2, col:-1.5 },
      { id:"sklearn", name:"Scikit-learn",     icon:"SiScikitlearn",   row:2, col:-0.5 },
      { id:"pandas",  name:"Pandas",           icon:"SiPandas",        row:2, col: 0.5 },
      { id:"numpy",   name:"NumPy",            icon:"SiNumpy",         row:2, col: 1.5 },
    ],
  },
  {
    id:    "backend",
    label: "AI Apps & Engineering",
    color: "#b48cff",
    rgb:   "180,140,255",
    icons: [
      { id:"langchain", name:"LangChain",     icon:"FiLink",      row:0, col: 0 },
      { id:"spacy",     name:"spaCy",         icon:"FiFeather",   row:1, col:-1 },
      { id:"sentrans",  name:"Sent. Trans.",  icon:"FiLayers",    row:1, col: 1 },
      { id:"flask",     name:"Flask",         icon:"SiFlask",     row:2, col:-1 },
      { id:"fastapi",   name:"FastAPI",       icon:"SiFastapi",   row:2, col: 0 },
      { id:"restapi",   name:"REST API",      icon:"FiCloud",     row:2, col: 1 },
    ],
  },
  {
    id:    "database",
    label: "Data & Databases",
    color: "#5ecfb0",
    rgb:   "94,207,176",
    icons: [
      { id:"cleaning", name:"Data Cleaning", icon:"FiFilter",     row:0, col: 0  },
      { id:"datavis",  name:"Data Viz",      icon:"FiBarChart2",  row:1, col:-1  },
      { id:"excel",    name:"Excel",         icon:"FiGrid",       row:1, col: 1  },
      { id:"mysql",    name:"MySQL",         icon:"SiMysql",      row:2, col:-1  },
      { id:"mongodb",  name:"MongoDB",       icon:"SiMongodb",    row:2, col: 0  },
      { id:"postgres", name:"PostgreSQL",    icon:"SiPostgresql", row:2, col: 1  },
    ],
  },
  {
    id:    "tools",
    label: "Tools & Visualization",
    color: "#f9c74f",
    rgb:   "249,199,79",
    icons: [
      { id:"tableau", name:"Tableau",  icon:"FiPieChart",  row:0, col:-0.5 },
      { id:"powerbi", name:"Power BI", icon:"FiDatabase",  row:0, col: 0.5 },
      { id:"n8n",     name:"n8n",      icon:"FiGitMerge",  row:1, col:-1   },
      { id:"docker",  name:"Docker",   icon:"SiDocker",    row:1, col: 0   },
      { id:"linux",   name:"Linux",    icon:"SiLinux",     row:1, col: 1   },
      { id:"git",     name:"Git",      icon:"SiGit",       row:2, col:-1.5 },
      { id:"github",  name:"GitHub",   icon:"SiGithub",    row:2, col:-0.5 },
      { id:"jupyter", name:"Jupyter",  icon:"SiJupyter",   row:2, col: 0.5 },
      { id:"vscode",  name:"VS Code",  icon:"FiCode",      row:2, col: 1.5 },
    ],
  },
];

/*
 * Row visual config:
 *   yOffset  = distance from top of icon area (px)
 *   scale    = icon size multiplier
 *   opacity  = icon opacity
 *   iconSize = px passed to svg
 */
const ROW = [
  { yOffset:  14, scale: 0.72, opacity: 0.72, iconSize: 18 }, // row 0 — top
  { yOffset:  96, scale: 0.86, opacity: 0.86, iconSize: 21 }, // row 1 — middle
  { yOffset: 185, scale: 1.00, opacity: 1.00, iconSize: 24 }, // row 2 — bottom
];

const COL_GAP = 64; // px between column centres

/* ── single icon ─────────────────────────────────────────── */
function PortalIcon({ item, groupColor, inView, baseDelay }) {
  const cfg = ROW[item.row] ?? ROW[2];
  const x   = item.col * COL_GAP;
  const delay = baseDelay + item.row * 0.14 + (Math.abs(item.col) * 0.06);

  return (
    <motion.div
      className="pi"
      style={{
        top:      cfg.yOffset,
        left:     "50%",
        "--pi-x": `${x}px`,
        "--pi-s": cfg.scale,
        "--pi-o": cfg.opacity,
        "--pi-c": groupColor,
        "--pi-fd":`${(Math.abs(item.col) + item.row) % 3 * 1.2}s`,
      }}
      initial={{ opacity: 0, y: -30 * cfg.scale }}
      animate={inView ? {
        opacity: cfg.opacity,
        y: 0,
        transition: { type: "spring", stiffness: 160, damping: 22, delay },
      } : {}}
      whileHover={{ y: -10, transition: { type: "spring", stiffness: 300, damping: 18 } }}
      tabIndex={0}
      role="img"
      aria-label={item.name}
    >
      <span className="pi__bubble">
        <I n={item.icon} s={cfg.iconSize} />
      </span>
      <span className="pi__label">{item.name}</span>
    </motion.div>
  );
}

/* ── single group (pedestal + cone + icons) ──────────────── */
function Group({ g, inView }) {
  const baseDelay = 0.15;

  return (
    <div className="grp" style={{ "--g-color": g.color, "--g-rgb": g.rgb }}>

      {/* title */}
      <motion.h4
        className="grp__title"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1, transition: { delay: baseDelay + 1.6, duration: 0.5 } } : {}}
      >
        {g.label}
      </motion.h4>

      {/* icon cloud — sits above the cone */}
      <div className="grp__icons">
        {g.icons.map((item) => (
          <PortalIcon
            key={item.id}
            item={item}
            groupColor={g.color}
            inView={inView}
            baseDelay={baseDelay + 0.55}
          />
        ))}
      </div>

      {/* wide cone / funnel — SVG so it's genuinely wide */}
      <motion.div
        className="grp__cone"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={inView ? { scaleY: 1, opacity: 1 } : {}}
        transition={{ delay: baseDelay + 0.18, duration: 0.85, ease: [0.22,1,0.36,1] }}
      >
        <svg
          className="grp__cone-svg"
          viewBox="0 0 260 280"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            {/* vertical gradient: transparent top → tinted bottom */}
            <linearGradient id={`cg-${g.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor={`rgba(${g.rgb},0.0)`} />
              <stop offset="30%"  stopColor={`rgba(${g.rgb},0.07)`} />
              <stop offset="70%"  stopColor={`rgba(${g.rgb},0.18)`} />
              <stop offset="100%" stopColor={`rgba(${g.rgb},0.32)`} />
            </linearGradient>
            {/* radial at bottom for extra warmth */}
            <radialGradient id={`cr-${g.id}`} cx="50%" cy="100%" r="50%">
              <stop offset="0%"   stopColor={`rgba(${g.rgb},0.28)`} />
              <stop offset="100%" stopColor={`rgba(${g.rgb},0)`} />
            </radialGradient>
          </defs>
          {/* main cone shape: narrow point at top-centre, wide base */}
          <polygon points="130,0  0,280  260,280" fill={`url(#cg-${g.id})`} />
          <polygon points="130,0  0,280  260,280" fill={`url(#cr-${g.id})`} opacity="0.5" />
          {/* centre spine */}
          <line x1="130" y1="4" x2="130" y2="280"
            stroke={`rgba(${g.rgb},0.35)`}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>

      {/* large 3D pedestal disc */}
      <motion.div
        className="grp__pedestal"
        initial={{ scaleX: 0.1, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ delay: baseDelay, duration: 0.65, ease: [0.22,1,0.36,1] }}
      >
        <div className="grp__ped-top">
          <div className="grp__ped-dot" />
          {/* activation ring */}
          <motion.div
            className="grp__ped-ring"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={inView ? { scale: [0.5, 1.6, 2.2], opacity: [0, 0.9, 0] } : {}}
            transition={{ delay: baseDelay + 0.12, duration: 1.1, ease: "easeOut" }}
          />
        </div>
        <div className="grp__ped-side" />
        <div className="grp__ped-glow" />
      </motion.div>

    </div>
  );
}

/* ── main ────────────────────────────────────────────────── */
export default function TechEcosystem() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div className="te-wrap" ref={ref}>
      <div className="te-scene" aria-label="Technology skill portals">
        {GROUPS.map((g) => <Group key={g.id} g={g} inView={inView} />)}
      </div>

      {/* marquee */}
      <motion.div
        className="te-strip"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1, transition: { delay: 2.2, duration: 0.5 } } : {}}
      >
        <span className="te-strip__label">Core Stack</span>
        <div className="te-strip__track" aria-hidden="true">
          <div className="te-strip__inner">
            {[...MARQUEE, ...MARQUEE].map((n, i) => (
              <span key={i} className="te-strip__item">
                {n}<span className="te-strip__sep" aria-hidden="true">•</span>
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

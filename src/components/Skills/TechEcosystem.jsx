import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  SiPython, SiPandas, SiNumpy, SiScikitlearn, SiTensorflow,
  SiFlask, SiFastapi, SiReact, SiJavascript, SiHtml5, SiCss,
  SiBootstrap, SiVite, SiMysql, SiMongodb, SiPostgresql,
  SiGit, SiGithub, SiJupyter, SiDocker, SiPostman, SiLinux,
} from "react-icons/si";
import {
  FiBriefcase, FiMessageCircle, FiCpu, FiCloud, FiLink,
  FiFeather, FiLayers, FiFilter, FiBarChart2, FiGitMerge,
  FiCode, FiGrid, FiPieChart, FiDatabase,
} from "react-icons/fi";
import { techCategories, techStack } from "../../data/skills";
import "./TechEcosystem.css";

// ── Icon resolver ─────────────────────────────────────────────────────────────
const ICON_MAP = {
  SiPython, SiPandas, SiNumpy, SiScikitlearn, SiTensorflow,
  SiFlask, SiFastapi, SiReact, SiJavascript, SiHtml5, SiCss,
  SiBootstrap, SiVite, SiMysql, SiMongodb, SiPostgresql,
  SiGit, SiGithub, SiJupyter, SiDocker, SiPostman, SiLinux,
  FiBriefcase, FiMessageCircle, FiCpu, FiCloud, FiLink,
  FiFeather, FiLayers, FiFilter, FiBarChart2, FiGitMerge,
  FiCode, FiGrid, FiPieChart, FiDatabase,
};

function TechIcon({ name, size = 22 }) {
  const Comp = ICON_MAP[name];
  return Comp ? <Comp size={size} aria-hidden="true" /> : <FiCpu size={size} aria-hidden="true" />;
}

// ── Core tech strip (bottom marquee) ─────────────────────────────────────────
const CORE_TECHS = [
  "Python", "SQL", "Machine Learning", "TensorFlow", "Scikit-learn",
  "Flask", "FastAPI", "LangChain", "React", "Git", "Docker", "n8n",
  "Power BI", "Tableau", "NLP", "Generative AI",
];

// ── Category accent lookup ────────────────────────────────────────────────────
const CAT_ACCENT = Object.fromEntries(techCategories.map((c) => [c.id, c.accent]));

// ── Variants ──────────────────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045, delayChildren: 0.1 } },
};

const pillVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.88 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 260, damping: 22 } },
  exit:    { opacity: 0, y: -16, scale: 0.88, transition: { duration: 0.18 } },
};

const tooltipVariants = {
  hidden:  { opacity: 0, y: 8, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1,   transition: { duration: 0.18 } },
};

// ── Single tech pill ──────────────────────────────────────────────────────────
function TechPill({ tech, hoveredId, onHover, onLeave, tabFocus, onFocus, onBlur }) {
  const accent = CAT_ACCENT[tech.category] ?? "var(--primary)";
  const isHovered  = hoveredId === tech.id;
  const isDimmed   = hoveredId && !isHovered;
  const isFocused  = tabFocus === tech.id;
  const isActive   = isHovered || isFocused;

  return (
    <motion.div
      className={`te-pill${isDimmed ? " te-pill--dim" : ""}${isActive ? " te-pill--active" : ""}`}
      style={{ "--pill-accent": accent }}
      variants={pillVariants}
      layout
      onMouseEnter={() => onHover(tech.id)}
      onMouseLeave={onLeave}
      onFocus={() => onFocus(tech.id)}
      onBlur={onBlur}
      tabIndex={0}
      role="button"
      aria-label={`${tech.name}: ${tech.desc}`}
      aria-pressed={isActive}
    >
      <span className="te-pill__icon">
        <TechIcon name={tech.icon} size={18} />
      </span>
      <span className="te-pill__name">{tech.name}</span>

      <AnimatePresence>
        {isActive && (
          <motion.div
            className="te-tooltip"
            variants={tooltipVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            role="tooltip"
          >
            <span className="te-tooltip__name">{tech.name}</span>
            <span className="te-tooltip__desc">{tech.desc}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Central glowing core orb ──────────────────────────────────────────────────
function CoreOrb({ inView }) {
  return (
    <motion.div
      className="te-core"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      aria-hidden="true"
    >
      {/* outer rings */}
      <div className="te-core__ring te-core__ring--1" />
      <div className="te-core__ring te-core__ring--2" />
      <div className="te-core__ring te-core__ring--3" />
      {/* glow blob */}
      <div className="te-core__glow" />
      {/* inner disc */}
      <div className="te-core__disc">
        <span className="te-core__label-top">AI</span>
        <span className="te-core__plus">+</span>
        <span className="te-core__label-bottom">DATA</span>
      </div>
      {/* orbiting dots */}
      <div className="te-core__orbit te-core__orbit--a">
        <div className="te-core__dot" />
      </div>
      <div className="te-core__orbit te-core__orbit--b">
        <div className="te-core__dot te-core__dot--violet" />
      </div>
      <div className="te-core__orbit te-core__orbit--c">
        <div className="te-core__dot te-core__dot--lime" />
      </div>
    </motion.div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function TechEcosystem() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredId, setHoveredId]           = useState(null);
  const [tabFocusId, setTabFocusId]         = useState(null);
  const sectionRef                          = useRef(null);
  const inView                              = useInView(sectionRef, { once: true, margin: "-80px" });

  // Filtered tech list
  const filtered = activeCategory === "all"
    ? techStack
    : techStack.filter((t) => t.category === activeCategory);

  const handleLeave  = useCallback(() => setHoveredId(null),  []);
  const handleBlur   = useCallback(() => setTabFocusId(null), []);
  const handleHover  = useCallback((id) => setHoveredId(id),  []);
  const handleFocus  = useCallback((id) => setTabFocusId(id), []);

  // Reset hover when category changes
  useEffect(() => { setHoveredId(null); setTabFocusId(null); }, [activeCategory]);

  // Keyboard: Escape clears active pill
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") { setHoveredId(null); setTabFocusId(null); } };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="te-wrap" ref={sectionRef}>

      {/* ── Core orb + category tabs row ─────────────────────────── */}
      <div className="te-header-row">
        <CoreOrb inView={inView} />

        <motion.div
          className="te-tabs"
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          role="tablist"
          aria-label="Technology category filter"
        >
          {techCategories.map((cat) => (
            <button
              key={cat.id}
              className={`te-tab${activeCategory === cat.id ? " te-tab--active" : ""}`}
              style={{ "--tab-accent": cat.accent }}
              role="tab"
              aria-selected={activeCategory === cat.id}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
              {activeCategory === cat.id && (
                <motion.span
                  className="te-tab__bar"
                  layoutId="te-tab-bar"
                  style={{ background: cat.accent }}
                  transition={{ type: "spring", stiffness: 340, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>
      </div>

      {/* ── Tech pill grid ────────────────────────────────────────── */}
      <motion.div
        className="te-grid"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        role="region"
        aria-label="Technology skills"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((tech) => (
            <TechPill
              key={tech.id}
              tech={tech}
              hoveredId={hoveredId}
              tabFocus={tabFocusId}
              onHover={handleHover}
              onLeave={handleLeave}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* ── Core tech strip ───────────────────────────────────────── */}
      <motion.div
        className="te-strip"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.7, duration: 0.6 }}
        aria-label="Core technologies"
      >
        <div className="te-strip__label">Core Stack</div>
        <div className="te-strip__track" aria-hidden="true">
          <div className="te-strip__inner">
            {[...CORE_TECHS, ...CORE_TECHS].map((name, i) => (
              <span key={i} className="te-strip__item">
                {name}
                <span className="te-strip__dot" aria-hidden="true">•</span>
              </span>
            ))}
          </div>
        </div>
      </motion.div>

    </div>
  );
}

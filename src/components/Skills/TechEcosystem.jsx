import { useState, useRef, useEffect, useCallback, useMemo } from "react";
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
import { techCategories, techStack } from "../../data/skills";
import "./TechEcosystem.css";

// ── Icon resolver ─────────────────────────────────────────────────────────────
const ICON_MAP = {
  SiPython, SiPandas, SiNumpy, SiScikitlearn, SiTensorflow,
  SiFlask, SiFastapi, SiMysql, SiMongodb, SiPostgresql,
  SiGit, SiGithub, SiJupyter, SiDocker, SiPostman, SiLinux,
  FiBriefcase, FiMessageCircle, FiCpu, FiCloud, FiLink,
  FiFeather, FiLayers, FiFilter, FiBarChart2, FiGitMerge,
  FiCode, FiGrid, FiPieChart, FiDatabase,
};

function TechIcon({ name, size = 18 }) {
  const Comp = ICON_MAP[name];
  return Comp ? <Comp size={size} aria-hidden="true" /> : <FiCpu size={size} aria-hidden="true" />;
}

// ── Core tech strip items ─────────────────────────────────────────────────────
const CORE_TECHS = [
  "Python", "SQL", "Machine Learning", "TensorFlow", "Scikit-learn",
  "Flask", "FastAPI", "LangChain", "Git", "Docker", "n8n",
  "Power BI", "Tableau", "NLP", "Generative AI",
];

// ── Category accent lookup ────────────────────────────────────────────────────
const CAT_ACCENT = Object.fromEntries(techCategories.map((c) => [c.id, c.accent]));

// ── Detect mobile once ───────────────────────────────────────────────────────
const isMobile = () => typeof window !== "undefined" && window.innerWidth <= 640;

// ── Animation variants — desktop ─────────────────────────────────────────────
const desktopContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
};
const desktopPill = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 280, damping: 24 } },
  exit:    { opacity: 0, transition: { duration: 0.12 } },
};

// ── Animation variants — mobile (instant, no stagger) ────────────────────────
const mobileContainer = {
  hidden:  {},
  visible: {},
};
const mobilePill = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.15 } },
  exit:    { opacity: 0, transition: { duration: 0.1 } },
};

const tooltipVariants = {
  hidden:  { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.14 } },
};

// ── Single tech pill ──────────────────────────────────────────────────────────
function TechPill({ tech, hoveredId, onHover, onLeave, mobile, containerVariants, pillVariants }) {
  const accent    = CAT_ACCENT[tech.category] ?? "var(--primary)";
  const isHovered = hoveredId === tech.id;
  const isDimmed  = !mobile && hoveredId && !isHovered;
  const isActive  = isHovered;

  return (
    <motion.div
      className={`te-pill${isDimmed ? " te-pill--dim" : ""}${isActive ? " te-pill--active" : ""}`}
      style={{ "--pill-accent": accent }}
      variants={pillVariants}
      onMouseEnter={() => onHover(tech.id)}
      onMouseLeave={onLeave}
      onFocus={() => onHover(tech.id)}
      onBlur={onLeave}
      tabIndex={0}
      role="button"
      aria-label={`${tech.name}: ${tech.desc}`}
    >
      <span className="te-pill__icon">
        <TechIcon name={tech.icon} size={16} />
      </span>
      <span className="te-pill__name">{tech.name}</span>

      {/* Tooltip — only on desktop where hover works well */}
      {!mobile && (
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
      )}
    </motion.div>
  );
}

// ── Central core orb ─────────────────────────────────────────────────────────
function CoreOrb({ inView, mobile }) {
  return (
    <motion.div
      className="te-core"
      initial={{ opacity: 0, scale: 0.7 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      aria-hidden="true"
    >
      {/* Rings — skip on mobile for perf */}
      {!mobile && (
        <>
          <div className="te-core__ring te-core__ring--1" />
          <div className="te-core__ring te-core__ring--2" />
          <div className="te-core__ring te-core__ring--3" />
        </>
      )}
      <div className="te-core__glow" />
      <div className="te-core__disc">
        <span className="te-core__label-top">AI</span>
        <span className="te-core__plus">+</span>
        <span className="te-core__label-bottom">DATA</span>
      </div>
      {!mobile && (
        <>
          <div className="te-core__orbit te-core__orbit--a"><div className="te-core__dot" /></div>
          <div className="te-core__orbit te-core__orbit--b"><div className="te-core__dot te-core__dot--violet" /></div>
          <div className="te-core__orbit te-core__orbit--c"><div className="te-core__dot te-core__dot--lime" /></div>
        </>
      )}
    </motion.div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function TechEcosystem() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredId,      setHoveredId]      = useState(null);
  const [mobile,         setMobile]         = useState(isMobile);
  const sectionRef                          = useRef(null);
  const inView                              = useInView(sectionRef, { once: true, margin: "-60px" });

  // Track mobile breakpoint
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = (e) => setMobile(e.matches);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Filtered tech list — memoised
  const filtered = useMemo(
    () => activeCategory === "all" ? techStack : techStack.filter((t) => t.category === activeCategory),
    [activeCategory]
  );

  const handleLeave = useCallback(() => setHoveredId(null), []);
  const handleHover = useCallback((id) => setHoveredId(id), []);

  // Reset hover on category change
  useEffect(() => { setHoveredId(null); }, [activeCategory]);

  // Escape key dismiss
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setHoveredId(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const containerVariants = mobile ? mobileContainer : desktopContainer;
  const pillVariants      = mobile ? mobilePill      : desktopPill;

  return (
    <div className="te-wrap" ref={sectionRef}>

      {/* ── Orb + tabs ─────────────────────────────────────────── */}
      <div className="te-header-row">
        <CoreOrb inView={inView} mobile={mobile} />

        <motion.div
          className="te-tabs"
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25, duration: 0.45 }}
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

      {/* ── Tech pills ───────────────────────────────────────────── */}
      <motion.div
        className="te-grid"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        role="region"
        aria-label="Technology skills"
      >
        <AnimatePresence mode="sync" initial={false}>
          {filtered.map((tech) => (
            <TechPill
              key={tech.id}
              tech={tech}
              hoveredId={hoveredId}
              onHover={handleHover}
              onLeave={handleLeave}
              mobile={mobile}
              containerVariants={containerVariants}
              pillVariants={pillVariants}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* ── Core tech strip ──────────────────────────────────────── */}
      <motion.div
        className="te-strip"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.55, duration: 0.5 }}
        aria-label="Core technologies"
      >
        <div className="te-strip__label">Core Stack</div>
        <div className="te-strip__track" aria-hidden="true">
          <div className="te-strip__inner">
            {[...CORE_TECHS, ...CORE_TECHS].map((name, i) => (
              <span key={i} className="te-strip__item">
                {name}<span className="te-strip__dot" aria-hidden="true">•</span>
              </span>
            ))}
          </div>
        </div>
      </motion.div>

    </div>
  );
}

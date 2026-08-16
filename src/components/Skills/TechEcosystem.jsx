import { useState, useRef, useCallback, useMemo, useEffect } from "react";
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

// ── Icon map ──────────────────────────────────────────────────────────────────
const ICON_MAP = {
  SiPython, SiPandas, SiNumpy, SiScikitlearn, SiTensorflow,
  SiFlask, SiFastapi, SiMysql, SiMongodb, SiPostgresql,
  SiGit, SiGithub, SiJupyter, SiDocker, SiPostman, SiLinux,
  FiBriefcase, FiMessageCircle, FiCpu, FiCloud, FiLink,
  FiFeather, FiLayers, FiFilter, FiBarChart2, FiGitMerge,
  FiCode, FiGrid, FiPieChart, FiDatabase,
};

function TechIcon({ name, size = 22 }) {
  const C = ICON_MAP[name];
  return C ? <C size={size} aria-hidden="true" /> : <FiCpu size={size} aria-hidden="true" />;
}

// ── Core tech marquee items ───────────────────────────────────────────────────
const MARQUEE = [
  "Python", "Machine Learning", "TensorFlow", "NLP", "Generative AI",
  "Flask", "FastAPI", "LangChain", "SQL", "PostgreSQL",
  "Docker", "Git", "Jupyter", "n8n", "Power BI", "Tableau",
];

// ── Category accent map ───────────────────────────────────────────────────────
const CAT_ACCENT = Object.fromEntries(techCategories.map((c) => [c.id, c.accent]));
const CAT_COLOR  = Object.fromEntries(techCategories.map((c) => [c.id, c.color]));

// ── Category meta: icon + subtitle shown on cluster card header ───────────────
const CAT_META = {
  aidata:   { emoji: "🧠", subtitle: "Core ML, Python & intelligent models" },
  backend:  { emoji: "⚡", subtitle: "APIs, LLMs & production AI services" },
  database: { emoji: "🗄️",  subtitle: "Structured & unstructured data stores" },
  tools:    { emoji: "🔧", subtitle: "Workflow, DevOps & productivity tools" },
  bi:       { emoji: "📊", subtitle: "Dashboards, analytics & insights" },
};

// ── Framer Motion variants ────────────────────────────────────────────────────
const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const clusterVariants = {
  hidden:  { opacity: 0, y: 40, scale: 0.94 },
  visible: { opacity: 1, y: 0,  scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 22 } },
};

const pillVariants = {
  hidden:  { opacity: 0, scale: 0.8 },
  visible: (i) => ({
    opacity: 1, scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 20, delay: i * 0.055 },
  }),
  exit: { opacity: 0, scale: 0.85, transition: { duration: 0.14 } },
};

const tooltipV = {
  hidden:  { opacity: 0, y: 6, scale: 0.94 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.15 } },
};

// ── Single tech icon pill ─────────────────────────────────────────────────────
function TechPill({ tech, index, accent, isMobileDevice }) {
  const [active, setActive] = useState(false);

  const toggle = useCallback(() => {
    if (isMobileDevice) setActive((v) => !v);
  }, [isMobileDevice]);

  return (
    <motion.div
      className={`te-pill${active ? " te-pill--active" : ""}`}
      style={{ "--pill-accent": accent }}
      custom={index}
      variants={pillVariants}
      onMouseEnter={() => !isMobileDevice && setActive(true)}
      onMouseLeave={() => !isMobileDevice && setActive(false)}
      onClick={toggle}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      tabIndex={0}
      role="button"
      aria-label={`${tech.name}: ${tech.desc}`}
    >
      <span className="te-pill__icon">
        <TechIcon name={tech.icon} size={18} />
      </span>
      <span className="te-pill__name">{tech.name}</span>

      <AnimatePresence>
        {active && (
          <motion.div
            className="te-tooltip"
            variants={tooltipV}
            initial="hidden"
            animate="visible"
            exit="hidden"
            role="tooltip"
          >
            <span className="te-tooltip__title">{tech.name}</span>
            <span className="te-tooltip__desc">{tech.desc}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Cluster card: one per category ───────────────────────────────────────────
function ClusterCard({ category, techs, isMobileDevice }) {
  const accent = CAT_ACCENT[category.id] ?? "var(--primary)";
  const meta   = CAT_META[category.id] ?? { emoji: "⚙️", subtitle: "" };

  return (
    <motion.div
      className="te-cluster"
      style={{ "--cluster-accent": accent }}
      variants={clusterVariants}
      layout
    >
      {/* Card header */}
      <div className="te-cluster__head">
        <span className="te-cluster__emoji" aria-hidden="true">{meta.emoji}</span>
        <div className="te-cluster__title-group">
          <h3 className="te-cluster__title">{category.label}</h3>
          <p className="te-cluster__subtitle">{meta.subtitle}</p>
        </div>
        <span className="te-cluster__count">{techs.length}</span>
      </div>

      {/* 3D platform base */}
      <div className="te-cluster__stage" aria-hidden="true">
        <div className="te-cluster__platform">
          <div className="te-cluster__platform-top" />
          <div className="te-cluster__platform-side" />
          <div className="te-cluster__platform-glow" />
        </div>
      </div>

      {/* Floating tech pills */}
      <div className="te-cluster__pills" role="list">
        <AnimatePresence mode="popLayout">
          {techs.map((tech, i) => (
            <TechPill
              key={tech.id}
              tech={tech}
              index={i}
              accent={accent}
              isMobileDevice={isMobileDevice}
            />
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ── Central AI + DATA hub ─────────────────────────────────────────────────────
function Hub({ inView }) {
  return (
    <motion.div
      className="te-hub"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      aria-label="AI + DATA — central theme"
    >
      {/* rings */}
      <div className="te-hub__ring te-hub__ring--1" />
      <div className="te-hub__ring te-hub__ring--2" />
      <div className="te-hub__ring te-hub__ring--3" />
      {/* glow */}
      <div className="te-hub__glow" />
      {/* disc */}
      <div className="te-hub__disc">
        <span className="te-hub__top">AI</span>
        <span className="te-hub__plus">+</span>
        <span className="te-hub__bottom">DATA</span>
      </div>
      {/* orbiting dots */}
      <div className="te-hub__orbit te-hub__orbit--a"><div className="te-hub__dot" /></div>
      <div className="te-hub__orbit te-hub__orbit--b"><div className="te-hub__dot te-hub__dot--violet" /></div>
      <div className="te-hub__orbit te-hub__orbit--c"><div className="te-hub__dot te-hub__dot--lime" /></div>
    </motion.div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function TechEcosystem() {
  const [active,     setActive]     = useState("all");
  const [isMobile,   setIsMobile]   = useState(
    () => typeof window !== "undefined" && window.innerWidth <= 640
  );
  const wrapRef = useRef(null);
  const inView  = useInView(wrapRef, { once: true, margin: "-60px" });

  // Track breakpoint
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const cb = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", cb);
    return () => mq.removeEventListener("change", cb);
  }, []);

  // Build visible category list (exclude "all")
  const displayCats = useMemo(
    () => techCategories.filter((c) => c.id !== "all"),
    []
  );

  // Tech stacks per category
  const byCategory = useMemo(() => {
    const map = {};
    displayCats.forEach((cat) => {
      map[cat.id] = techStack.filter((t) => t.category === cat.id);
    });
    return map;
  }, [displayCats]);

  // Which clusters to show
  const visibleCats = useMemo(() =>
    active === "all" ? displayCats : displayCats.filter((c) => c.id === active),
  [active, displayCats]);

  // Tab handler
  const handleTab = useCallback((id) => setActive(id), []);

  return (
    <div className="te-wrap" ref={wrapRef}>

      {/* ── Hub ────────────────────────────────────────────────── */}
      <div className="te-hub-row">
        <Hub inView={inView} />
      </div>

      {/* ── Category tabs ───────────────────────────────────────── */}
      <motion.div
        className="te-tabs-outer"
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.3, duration: 0.45 }}
      >
        <div className="te-tabs" role="tablist" aria-label="Filter by technology category">
          {techCategories.map((cat) => (
            <button
              key={cat.id}
              className={`te-tab${active === cat.id ? " te-tab--active" : ""}`}
              style={{ "--tab-accent": cat.accent }}
              role="tab"
              aria-selected={active === cat.id}
              onClick={() => handleTab(cat.id)}
            >
              {cat.label}
              {active === cat.id && (
                <motion.span
                  className="te-tab__underline"
                  layoutId="te-tab-ul"
                  style={{ background: cat.accent }}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
            </button>
          ))}
        </div>
      </motion.div>

      {/* ── Cluster grid ────────────────────────────────────────── */}
      <motion.div
        className={`te-grid te-grid--${visibleCats.length === 1 ? "single" : visibleCats.length <= 3 ? "few" : "all"}`}
        variants={sectionVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        layout
      >
        <AnimatePresence mode="popLayout">
          {visibleCats.map((cat) => (
            <ClusterCard
              key={cat.id}
              category={cat}
              techs={byCategory[cat.id] ?? []}
              isMobileDevice={isMobile}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* ── Marquee strip ───────────────────────────────────────── */}
      <motion.div
        className="te-strip"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.7, duration: 0.5 }}
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

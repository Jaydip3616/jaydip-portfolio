import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  SiPython, SiPandas, SiNumpy, SiScikitlearn, SiTensorflow,
  SiFlask, SiFastapi, SiMysql, SiMongodb, SiPostgresql,
  SiGit, SiGithub, SiJupyter, SiDocker, SiPostman, SiLinux,
  SiLangchain, SiSpacy, SiN8N, SiHuggingface,
} from "react-icons/si";
import {
  FiCpu, FiMessageCircle, FiCloud,
  FiFilter, FiBarChart2, FiGrid, FiPieChart, FiLayers,
} from "react-icons/fi";
import "./TechEcosystem.css";

/* ── Icon registry ─────────────────────────────────────── */
const ICONS = {
  SiPython, SiPandas, SiNumpy, SiScikitlearn, SiTensorflow,
  SiFlask, SiFastapi, SiMysql, SiMongodb, SiPostgresql,
  SiGit, SiGithub, SiJupyter, SiDocker, SiPostman, SiLinux,
  SiLangchain, SiSpacy, SiN8N, SiHuggingface,
  FiCpu, FiMessageCircle, FiCloud,
  FiFilter, FiBarChart2, FiGrid, FiPieChart, FiLayers,
};
const Icon = ({ name, size, color }) => {
  const C = ICONS[name] ?? FiCpu;
  return <C size={size} color={color} />;
};

/* ── Brand colors ───────────────────────────────────────── */
const BRAND = {
  SiPython:        "#3776AB",
  SiTensorflow:    "#FF6F00",
  SiScikitlearn:   "#F7931E",
  SiPandas:        "#130754",
  SiNumpy:         "#4DABCF",
  SiHuggingface:   "#FFD21E",
  SiLangchain:     "#1C3C3C",
  SiSpacy:         "#09A3D5",
  SiFastapi:       "#009688",
  SiFlask:         "#999999",
  SiMysql:         "#4479A1",
  SiMongodb:       "#47A248",
  SiPostgresql:    "#4169E1",
  SiGit:           "#F05032",
  SiGithub:        "#181717",
  SiJupyter:       "#F37626",
  SiDocker:        "#2496ED",
  SiPostman:       "#FF6C37",
  SiLinux:         "#FCC624",
  SiN8N:           "#EA4B71",
  FiCpu:           "#8B5CF6",
  FiMessageCircle: "#10B981",
  FiCloud:         "#3B82F6",
  FiLayers:        "#A855F7",
  FiFilter:        "#10B981",
  FiBarChart2:     "#F59E0B",
  FiGrid:          "#22C55E",
  FiPieChart:      "#E97627",
};
const bc = (name, fb) => BRAND[name] || fb;

/*
  ═══════════════════════════════════════════════════════════
  PORTAL LAYOUT SYSTEM
  ═══════════════════════════════════════════════════════════

  The portal is a fixed 340×520px container.
  
  The disc sits at the very bottom. It is an SVG 340px wide, 120px tall.
  Disc top-face center = 34px from top of SVG = 120-34 = 86px from bottom.
  So disc top-face sits at y=86px from portal bottom edge.

  The beam (SVG) is positioned:
    bottom = 86px  (starts at disc top-face center)
    width  = 340px (same as disc)
    height = 400px (beam travels 400px upward)
  
  The beam SVG draws an inverted trapezoid:
    Narrow at bottom (disc center): ~20px wide
    Wide at top: ~320px wide
  This is the KEY — it is an upward-opening funnel.

  Icon positions (x,y) are set relative to portal bottom.
  y = px above portal bottom = px above disc bottom edge.
  disc top-face at y=86 from bottom.
  So icons start above 86px.
  
  Row layout inside beam (all icons INSIDE the trapezoid):
    Row A (just above disc): y=130-160, beam width ~100-140px → icons ±30 to ±45px
    Row B (middle):          y=230-260, beam width ~200-220px → icons ±60 to ±80px  
    Row C (upper-mid):       y=320-340, beam width ~260-280px → icons ±80 to ±100px
    Row D (top):             y=400-410, beam width ~300-320px → icons ±80 to ±100px
  
  The beam SVG viewBox is 0 0 340 400.
  Beam tip (narrow) at bottom-center: x=170, y=400 (SVG bottom = portal disc center)
  Beam wide at top: x=10,y=0 to x=330,y=0
  
  So beam polygon points: "10,0  330,0  170,400"
  (inverted triangle: wide top, narrow bottom at disc)
══════════════════════════════════════════════════════════ */

const PORTALS = [
  /* ── 1. AI & Data Science — Green ──────────────────── */
  {
    id:        "aidata",
    label:     "AI & Data Science",
    discColor: "#2ECC71",
    discDark:  "#1A5C34",
    beamRgb:   "46,204,113",   /* green */
    icons: [
      /* Row D — top of beam, small, wide spread */
      { id:"genai",   name:"Generative AI", icon:"FiCpu",          x:   0, y: 400, size: 26 },
      /* Row C */
      { id:"nlp",     name:"NLP",           icon:"FiMessageCircle",x: -85, y: 315, size: 30 },
      { id:"hf",      name:"HuggingFace",   icon:"SiHuggingface",  x:  85, y: 315, size: 30 },
      /* Row B */
      { id:"python",  name:"Python",        icon:"SiPython",       x:-100, y: 230, size: 38 },
      { id:"tf",      name:"TensorFlow",    icon:"SiTensorflow",   x: -42, y: 230, size: 38 },
      { id:"sklearn", name:"Scikit-learn",  icon:"SiScikitlearn",  x:  20, y: 230, size: 38 },
      { id:"pandas",  name:"Pandas",        icon:"SiPandas",       x:  78, y: 230, size: 38 },
      /* Row A — closest to disc */
      { id:"numpy",   name:"NumPy",         icon:"SiNumpy",        x: -45, y: 148, size: 34 },
      { id:"mysql",   name:"MySQL",         icon:"SiMysql",        x:  45, y: 148, size: 34 },
    ],
  },

  /* ── 2. AI Apps & Engineering — Orange ─────────────── */
  {
    id:        "backend",
    label:     "AI Apps & Engineering",
    discColor: "#F97316",
    discDark:  "#7C2D00",
    beamRgb:   "249,115,22",   /* orange */
    icons: [
      /* Row D */
      { id:"langchain", name:"LangChain",        icon:"SiLangchain", x:   0, y: 400, size: 26 },
      /* Row C */
      { id:"spacy",     name:"spaCy",            icon:"SiSpacy",     x: -80, y: 315, size: 32 },
      { id:"sentrans",  name:"Sent.Transformers",icon:"FiLayers",    x:  80, y: 315, size: 32 },
      /* Row B */
      { id:"fastapi",   name:"FastAPI",          icon:"SiFastapi",   x: -70, y: 225, size: 42 },
      { id:"flask",     name:"Flask",            icon:"SiFlask",     x:   0, y: 225, size: 42 },
      { id:"restapi",   name:"REST API",         icon:"FiCloud",     x:  70, y: 225, size: 42 },
    ],
  },

  /* ── 3. Data & Databases — Blue ─────────────────────── */
  {
    id:        "database",
    label:     "Data & Databases",
    discColor: "#3B82F6",
    discDark:  "#1E3A8A",
    beamRgb:   "59,130,246",   /* blue */
    icons: [
      /* Row D */
      { id:"cleaning", name:"Data Cleaning", icon:"FiFilter",     x:   0, y: 400, size: 26 },
      /* Row C */
      { id:"datavis",  name:"Data Viz",      icon:"FiBarChart2",  x: -80, y: 315, size: 30 },
      { id:"excel",    name:"Excel",         icon:"FiGrid",       x:  80, y: 315, size: 30 },
      /* Row B */
      { id:"mysql",    name:"MySQL",         icon:"SiMysql",      x: -75, y: 230, size: 40 },
      { id:"mongodb",  name:"MongoDB",       icon:"SiMongodb",    x:   0, y: 230, size: 40 },
      { id:"postgres", name:"PostgreSQL",    icon:"SiPostgresql", x:  75, y: 230, size: 40 },
    ],
  },

  /* ── 4. Tools & Visualization — Yellow ─────────────── */
  {
    id:        "tools",
    label:     "Tools & Visualization",
    discColor: "#EAB308",
    discDark:  "#713F12",
    beamRgb:   "234,179,8",    /* yellow */
    icons: [
      /* Row D */
      { id:"n8n",     name:"n8n",     icon:"SiN8N",       x:   0, y: 400, size: 26 },
      /* Row C */
      { id:"plotly",  name:"Plotly",  icon:"FiBarChart2", x: -80, y: 315, size: 30 },
      { id:"tableau", name:"Tableau", icon:"FiPieChart",  x:  80, y: 315, size: 30 },
      /* Row B */
      { id:"git",     name:"Git",     icon:"SiGit",       x:-105, y: 232, size: 38 },
      { id:"github",  name:"GitHub",  icon:"SiGithub",    x: -50, y: 232, size: 38 },
      { id:"docker",  name:"Docker",  icon:"SiDocker",    x:   8, y: 232, size: 38 },
      { id:"jupyter", name:"Jupyter", icon:"SiJupyter",   x:  65, y: 232, size: 38 },
      /* Row A */
      { id:"linux",   name:"Linux",   icon:"SiLinux",     x: -45, y: 148, size: 34 },
      { id:"postman", name:"Postman", icon:"SiPostman",   x:  45, y: 148, size: 34 },
    ],
  },
];

/*
  ══════════════════════════════════════════════════════════
  DISC SVG — viewBox "0 0 340 120"
  
  Top ellipse:   cx=170 cy=34  rx=158 ry=32
  Rim path:      from top ellipse equator, curves down to
                 bottom ellipse cx=170 cy=92 rx=146 ry=22
  Ground glow:   overflows below SVG, overflow:visible on SVG

  Colors:
    top face  = bright portal color, radial gradient
    side rim  = very dark, near black bottom
    center    = white glow dot
══════════════════════════════════════════════════════════
*/
function DiscSVG({ id, color, dark }) {
  const gf = `gf${id}`;  /* face gradient  */
  const gr = `gr${id}`;  /* rim gradient   */
  const gd = `gd${id}`;  /* dot gradient   */
  const gg = `gg${id}`;  /* ground glow    */

  return (
    <svg
      className="te-disc"
      viewBox="0 0 340 120"
      xmlns="http://www.w3.org/2000/svg"
      overflow="visible"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={gf} cx="38%" cy="30%" r="68%">
          <stop offset="0%"   stopColor="#fff"  stopOpacity="0.55" />
          <stop offset="28%"  stopColor={color} stopOpacity="1.00" />
          <stop offset="80%"  stopColor={color} stopOpacity="0.88" />
          <stop offset="100%" stopColor={dark}  stopOpacity="0.82" />
        </radialGradient>

        <linearGradient id={gr} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={dark}    stopOpacity="1.00" />
          <stop offset="40%"  stopColor={dark}    stopOpacity="0.92" />
          <stop offset="100%" stopColor="#030303" stopOpacity="1.00" />
        </linearGradient>

        <radialGradient id={gd} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#fff" stopOpacity="1.00" />
          <stop offset="55%"  stopColor="#fff" stopOpacity="0.70" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0.00" />
        </radialGradient>

        <radialGradient id={gg} cx="50%" cy="40%" r="55%">
          <stop offset="0%"   stopColor={color} stopOpacity="0.65" />
          <stop offset="55%"  stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0.00" />
        </radialGradient>
      </defs>

      {/* Ground glow — below disc */}
      <ellipse cx="170" cy="126" rx="168" ry="24"
        fill={`url(#${gg})`} className="te-disc__glow" />

      {/*
        RIM PATH
        Top ellipse equator: left=(12,34) right=(328,34)
        
        M 12 34          → start left equator
        A 158 32 0 1 1 328 34   → BOTTOM half of top ellipse
        Q 330 68 316 92         → curve right side down to bottom ellipse
        A 146 22 0 0 0 24 92    → bottom ellipse arc right→left
        Q 10 68 12 34           → curve left side back up
        Z
      */}
      <path
        d="M 12 34 A 158 32 0 1 1 328 34 Q 330 70 316 92 A 146 22 0 0 0 24 92 Q 10 70 12 34 Z"
        fill={`url(#${gr})`}
      />

      {/* Top face ellipse */}
      <ellipse cx="170" cy="34" rx="158" ry="32" fill={`url(#${gf})`} />

      {/* Specular highlight */}
      <ellipse cx="118" cy="22" rx="66" ry="14" fill="white" opacity="0.18" />

      {/* Center glow halo */}
      <circle cx="170" cy="34" r="28" fill={`url(#${gd})`} opacity="0.32" />

      {/* White dot */}
      <circle cx="170" cy="34" r="13" fill="white" opacity="0.97" />
      <circle cx="170" cy="34" r="5"  fill="white" opacity="1.00" />
    </svg>
  );
}

/*
  ══════════════════════════════════════════════════════════
  BEAM SVG — viewBox "0 0 340 400"

  The beam is an INVERTED FUNNEL:
    WIDE at TOP    → icons spread wide near the top
    NARROW at DISC → starts at disc center (white dot)

  Points of the trapezoid:
    Top-left:     x=10,  y=0    (wide top edge)
    Top-right:    x=330, y=0
    Bottom-point: x=170, y=400  (narrow, at disc top-face center)

  This means at any height h from the bottom (disc),
  the beam half-width = (160/400) * h = 0.4 * h
  So at h=100 → half-width=40 → icons fit at ±40px
     at h=200 → half-width=80 → icons fit at ±80px  
     at h=400 → half-width=160 → icons fit at ±160px

  BUT our icon x values are relative to portal CENTER (x=170 in SVG).
  Icon at y=148 from portal bottom = y=(400-(148-86)) = y=338 from beam top... 
  Wait let me recalculate properly.

  Portal bottom = disc SVG bottom (120px SVG at 340px wide = 120px tall).
  Disc top-face center = 34px from disc SVG top = 120-34 = 86px from portal bottom.
  
  Beam div: bottom=86px (aligned to disc top-face center), height=400px.
  Beam SVG: viewBox 0 0 340 400.
  In SVG coords: y=0 is TOP of beam (400px above disc), y=400 is BOTTOM (disc center).
  
  An icon at portal-y=148px from bottom:
    → height above disc center = 148 - 86 = 62px
    → in beam SVG: y_svg = 400 - 62 = 338
    → beam half-width at y_svg=338: half_w = (160 * (400-338)/400) = 160 * 62/400 = 24.8px
    → so icon x must be within ±24px of center... icon x=±45 → OUTSIDE beam!

  Problem: my icon x values are too wide for the narrow bottom of beam.

  SOLUTION: Make beam WIDER at bottom.
  Change beam to trapezoid instead of triangle:
    Top  edge: x=10  to x=330 (width=320px)
    Bottom edge: x=100 to x=240 (width=140px) — at disc center level
    
  Points: "10,0  330,0  240,400  100,400"
  
  Now beam half-width at bottom = 70px.
  At y_svg=338 (h=62 above disc): interpolate
    half_w = 70 + (160-70)*(400-338)/400 = 70 + 90*62/400 = 70 + 13.95 = 83.95px
  So icons at ±45px → inside ✓
  
  At y_svg=170 (h=230 above disc):
    half_w = 70 + 90*(400-170)/400 = 70 + 90*230/400 = 70 + 51.75 = 121.75px
  Icons at ±100px → inside ✓
  
  At y_svg=0 (h=400 above disc, very top):
    half_w = 70 + 90*400/400 = 70 + 90 = 160px ✓
  
  This works! All icons are inside the beam.
══════════════════════════════════════════════════════════
*/
function BeamSVG({ id, rgb }) {
  const gBeam  = `gb${id}`;
  const gInner = `gi${id}`;

  return (
    <svg
      className="te-beam"
      viewBox="0 0 340 400"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        {/*
          Gradient direction: y1="1" (bottom=disc) → y2="0" (top)
          Dense at bottom (near disc white dot), transparent at top tip.
          This is exactly like reference image 2 — brighter near disc.
        */}
        <linearGradient id={gBeam} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%"   stopColor={`rgba(${rgb},0.48)`} />
          <stop offset="20%"  stopColor={`rgba(${rgb},0.36)`} />
          <stop offset="50%"  stopColor={`rgba(${rgb},0.20)`} />
          <stop offset="80%"  stopColor={`rgba(${rgb},0.08)`} />
          <stop offset="100%" stopColor={`rgba(${rgb},0.00)`} />
        </linearGradient>

        {/* Inner brighter core */}
        <linearGradient id={gInner} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.30)" />
          <stop offset="25%"  stopColor={`rgba(${rgb},0.25)`}    />
          <stop offset="60%"  stopColor={`rgba(${rgb},0.08)`}    />
          <stop offset="100%" stopColor={`rgba(${rgb},0.00)`}    />
        </linearGradient>
      </defs>

      {/* Outer beam — trapezoid: wide top, narrower bottom */}
      <polygon
        points="10,0  330,0  240,400  100,400"
        fill={`url(#${gBeam})`}
      />

      {/* Inner core — narrower trapezoid, brighter */}
      <polygon
        points="90,0  250,0  200,400  140,400"
        fill={`url(#${gInner})`}
      />
    </svg>
  );
}

/* ── Portal ─────────────────────────────────────────────── */
function Portal({ portal, inView, index }) {
  const d = index * 0.10;

  return (
    <div className="te-portal" style={{ "--beam-rgb": portal.beamRgb }}>

      {/* Label */}
      <motion.p
        className="te-portal__label"
        initial={{ opacity: 0, y: -6 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: d + 1.8, duration: 0.35 }}
      >
        {portal.label}
      </motion.p>

      {/* Beam — behind icons */}
      <motion.div
        className="te-portal__beam-wrap"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={inView ? { scaleY: 1, opacity: 1 } : {}}
        transition={{ delay: d + 0.05, duration: 0.70, ease: [0.16,1,0.3,1] }}
      >
        <BeamSVG id={portal.id} rgb={portal.beamRgb} />
      </motion.div>

      {/* Icons — above beam */}
      <div className="te-portal__icons" aria-label={portal.label}>
        {portal.icons.map((item, i) => {
          const brand  = bc(item.icon, portal.discColor);
          /* stagger from bottom row first */
          const iDelay = d + 0.55 + (430 - item.y) * 0.0008 + i * 0.03;
          const fDur   = 3.0 + (i % 6) * 0.4;
          const fDel   = (i % 5) * 0.7;

          return (
            <motion.div
              key={item.id}
              className="te-icon"
              style={{
                "--ix":    `${item.x}px`,
                "--iy":    `${item.y}px`,
                "--fdur":  `${fDur}s`,
                "--fdel":  `${fDel}s`,
                "--brand": brand,
              }}
              initial={{ opacity: 0, scale: 0.3 }}
              animate={inView ? {
                opacity: 1,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 220,
                  damping: 22,
                  delay: iDelay,
                },
              } : {}}
              whileHover={{
                scale: 1.20,
                y: -8,
                transition: { type: "spring", stiffness: 350, damping: 16 },
              }}
              tabIndex={0}
              role="img"
              aria-label={item.name}
            >
              <Icon name={item.icon} size={item.size} color={brand} />
              <span className="te-icon__tip">{item.name}</span>
            </motion.div>
          );
        })}
      </div>

      {/* Disc */}
      <motion.div
        className="te-portal__disc-wrap"
        initial={{ scaleX: 0.08, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ delay: d, duration: 0.62, ease: [0.16,1,0.3,1] }}
      >
        <DiscSVG id={portal.id} color={portal.discColor} dark={portal.discDark} />
      </motion.div>
    </div>
  );
}

/* ── Marquee ────────────────────────────────────────────── */
const MARQUEE = [
  "Python","TensorFlow","Scikit-learn","HuggingFace","NLP","Generative AI",
  "LangChain","spaCy","FastAPI","Flask",
  "MySQL","MongoDB","PostgreSQL","Data Viz",
  "Git","GitHub","Docker","Jupyter","Linux","n8n","Postman",
];

/* ── Main export ────────────────────────────────────────── */
export default function TechEcosystem() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div className="te-wrap" ref={ref}>

      <div className="te-scene">
        {PORTALS.map((p, i) => (
          <Portal key={p.id} portal={p} inView={inView} index={i} />
        ))}
      </div>

      <motion.div
        className="te-marquee"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 2.5, duration: 0.5 }}
      >
        <span className="te-marquee__label">Core Stack</span>
        <div className="te-marquee__track">
          <div className="te-marquee__inner">
            {[...MARQUEE, ...MARQUEE].map((n, i) => (
              <span key={i} className="te-marquee__item">
                {n}<span className="te-marquee__dot">·</span>
              </span>
            ))}
          </div>
        </div>
      </motion.div>

    </div>
  );
}

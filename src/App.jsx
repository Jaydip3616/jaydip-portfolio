import { useEffect, useState } from "react";
import {
  FiArrowDownRight,
  FiArrowUpRight,
  FiCalendar,
  FiCheck,
  FiCheckCircle,
  FiChevronRight,
  FiDownload,
  FiExternalLink,
  FiMail,
  FiMapPin,
  FiMenu,
  FiSend,
  FiShield,
  FiMoon,
  FiSun,
  FiTrendingUp,
  FiUsers,
  FiX,
} from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import TechEcosystem from "./components/Skills/TechEcosystem";
import "./App.css";
import profilePhoto from "./assets/Jaydip-photo.jpg";
import SplashScreen from "./components/Common/SplashScreen";
import CodeRain from "./components/Common/CodeRain";
import DataCanvas from "./components/Common/DataCanvas";
import certifications from "./data/certifications";
import education from "./data/education";
import experience from "./data/experience";
import navigation from "./data/navigation";
import projects from "./data/projects";
import services from "./data/services";
import skills from "./data/skills";
import socialLinks from "./data/socialLinks";

const contactEmail = "jaydippithava71730@gmail.com";
const roles = ["AI & Data Science Developer", "Machine Learning Enthusiast", "Data Analyst", "Automation Builder"];
const certHighlightIcons = [FiCheckCircle, FiTrendingUp, FiUsers];

function getInitialTheme() {
  const savedTheme = localStorage.getItem("portfolio-theme");
  if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [theme, setTheme] = useState(getInitialTheme);
  const [typedRole, setTypedRole] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) {
      setTypedRole(roles[0]);
      return undefined;
    }

    const currentRole = roles[roleIndex];
    const isComplete = typedRole === currentRole;
    const delay = isComplete && !isDeleting ? 1600 : isDeleting ? 35 : 65;
    const timeoutId = window.setTimeout(() => {
      if (!isDeleting && isComplete) setIsDeleting(true);
      else if (isDeleting && typedRole === "") {
        setIsDeleting(false);
        setRoleIndex((index) => (index + 1) % roles.length);
      } else setTypedRole((value) => isDeleting ? value.slice(0, -1) : currentRole.slice(0, value.length + 1));
    }, delay);
    return () => window.clearTimeout(timeoutId);
  }, [typedRole, roleIndex, isDeleting]);

  useEffect(() => {
    const heroCanvas = document.querySelector(".hero-canvas-wrap");
    if (!heroCanvas) return undefined;
    const onScroll = () => {
      const fade = Math.max(0, 1 - window.scrollY / (window.innerHeight * 0.7));
      heroCanvas.style.opacity = fade * 0.45;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [showSplash]);

  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const parent = el.parentElement;
            const siblings = parent ? Array.from(parent.querySelectorAll(":scope > .reveal")) : [el];
            const idx = siblings.indexOf(el);
            const stagger = idx >= 0 ? idx * 180 : 0;
            setTimeout(() => el.classList.add("is-visible"), stagger);
            observer.unobserve(el);
          }
        });
      },
      { rootMargin: "0px 0px -40px 0px", threshold: 0.05 },
    );
    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [showSplash]);

  useEffect(() => {
    const sections = document.querySelectorAll("main section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [showSplash]);

  const closeMenu = () => setIsMenuOpen(false);

  const handleContactSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = form.get("subject") || "Portfolio enquiry";
    const body = `Name: ${form.get("name")}\nEmail: ${form.get("email")}\n\n${form.get("message")}`;
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setIsSubmitted(true);
    event.currentTarget.reset();
  };

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <nav className="navbar container" aria-label="Primary navigation">
          <a className="brand" href="#home" onClick={closeMenu} aria-label="Jaydip Pithava home">
            <span className="brand-bracket">&lt;</span><span className="brand-name">Jaydip Pithava</span><span className="brand-bracket">&gt;</span>
          </a>

          <div className="header-right-actions">
            <button className="theme-toggle-mobile" type="button" onClick={() => setTheme((current) => current === "light" ? "dark" : "light")} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}>
              {theme === "light" ? <FiMoon /> : <FiSun />}
            </button>
            <a className="button button-small button-primary nav-cta-mobile" href="#contact" onClick={closeMenu}>Let&apos;s talk <FiArrowUpRight /></a>
            <button className="menu-toggle" type="button" aria-label="Toggle navigation menu" aria-expanded={isMenuOpen} onClick={() => setIsMenuOpen((open) => !open)}>
              {isMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>

          <div className={`nav-panel ${isMenuOpen ? "is-open" : ""}`}>
            <ul className="nav-links">
              {navigation.map((item) => (
                <li key={item.id}>
                  <a className={activeSection === item.id ? "active" : ""} href={`#${item.id}`} onClick={closeMenu}>{item.title}</a>
                </li>
              ))}
            </ul>
            <div className="nav-actions">
              <button className="theme-toggle theme-toggle-desktop" type="button" onClick={() => setTheme((current) => current === "light" ? "dark" : "light")} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`} title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}>
                {theme === "light" ? <FiMoon /> : <FiSun />}<span>{theme === "light" ? "Dark" : "Light"}</span>
              </button>
              <a className="button button-small button-primary nav-cta" href="#contact" onClick={closeMenu}>Let&apos;s talk <FiArrowUpRight /></a>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <section id="home" className="hero section">
          <CodeRain theme={theme} />
          <div className="hero-canvas-wrap"><DataCanvas theme={theme} /></div>
          <div className="container hero-intro reveal">
            <span className="hero-status-pill"><span className="status-dot" /> Available for Opportunities</span>
            <h1 className="hero-headline">Hi, I&apos;m <span className="hero-name-accent">Jaydip Pithava</span></h1>
            <p className="typewriter" aria-label="AI and Data Science Developer"><span aria-hidden="true">{typedRole}</span><i aria-hidden="true" /></p>
            <div className="hero-expertise-pills">
              <span className="expertise-pill">🎯 Data Scientist</span>
              <span className="expertise-pill">🤖 AI &amp; ML</span>
              <span className="expertise-pill">📊 Data Analytics</span>
              <span className="expertise-pill">⚡ Automation</span>
            </div>
            <p className="hero-intro-text">AI &amp; Data Science Developer building intelligent applications, data-driven tools, and automation workflows. IABAC Certified — focused on turning complex data into real business impact.</p>
            <div className="hero-stats">
              <div className="hero-stat"><strong>4×</strong><span>Certified</span></div>
              <div className="hero-stat"><strong>12+</strong><span>Months Experience</span></div>
              <div className="hero-stat"><strong>6+</strong><span>Projects</span></div>
              <div className="hero-stat"><strong>4</strong><span>Certifications</span></div>
            </div>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">Explore my work <FiArrowDownRight /></a>
              <a className="button button-ghost" href="#contact">Get in touch <FiChevronRight /></a>
            </div>
            <div className="hero-socials" aria-label="Social links">
              {socialLinks.map(({ id, label, icon: Icon, url }) => (
                <a key={id} href={url} target={url.startsWith("http") ? "_blank" : undefined} rel={url.startsWith("http") ? "noreferrer" : undefined} aria-label={label}><Icon /></a>
              ))}
            </div>
          </div>
        </section>

        <div className="marquee-strip" aria-hidden="true">
          <div className="marquee-track">
            <span className="marquee-content">DATA SCIENCE <i>•</i> MACHINE LEARNING <i>•</i> ARTIFICIAL INTELLIGENCE <i>•</i> GENERATIVE AI <i>•</i> NLP <i>•</i> COMPUTER VISION <i>•</i> PYTHON <i>•</i> SQL <i>•</i> POWER BI <i>•</i> TABLEAU <i>•</i> FLASK <i>•</i> FASTAPI <i>•</i> STREAMLIT <i>•</i> REACT <i>•</i> GIT <i>•</i> GITHUB <i>•</i> DOCKER <i>•</i> DATA ANALYTICS <i>•</i> DEEP LEARNING <i>•</i> LLMs <i>•</i> AUTOMATION <i>•</i></span>
            <span className="marquee-content">DATA SCIENCE <i>•</i> MACHINE LEARNING <i>•</i> ARTIFICIAL INTELLIGENCE <i>•</i> GENERATIVE AI <i>•</i> NLP <i>•</i> COMPUTER VISION <i>•</i> PYTHON <i>•</i> SQL <i>•</i> POWER BI <i>•</i> TABLEAU <i>•</i> FLASK <i>•</i> FASTAPI <i>•</i> STREAMLIT <i>•</i> REACT <i>•</i> GIT <i>•</i> GITHUB <i>•</i> DOCKER <i>•</i> DATA ANALYTICS <i>•</i> DEEP LEARNING <i>•</i> LLMs <i>•</i> AUTOMATION <i>•</i></span>
          </div>
        </div>

        <section id="about" className="section about-section">
          <div className="container about-grid">
            <div className="about-aside reveal"><p className="section-number">01 / About</p><div className="portrait-mark"><img src={profilePhoto} alt="Jaydip Pithava" /></div></div>
            <div className="about-content reveal reveal-delay">
              <h2>Turning curiosity into practical technology.</h2>
              <p>I started with a BBA in Finance from Gujarat University — numbers, strategy, and business thinking. That analytical mindset led me to data science, where I earned my IABAC certification and trained at Datamites over 120 intensive hours.</p>
              <p>Today I work across the full pipeline: from cleaning messy datasets and engineering features to building models that actually solve the problem at hand. What drives me is the bridge between raw data and a clear, useful answer someone can act on.</p>
            </div>
          </div>
        </section>

        <section id="certifications" className="section certifications-section">
          <div className="container">
            <SectionIntro number="02 / Credentials" eyebrow="Certifications" title="Learning backed by recognised training." />
            <div className="certifications-grid">
              {certifications.map((certificate, index) => {
                const CardIcon = certificate.icon;
                return (
                  <article className="certification-card reveal" style={{ "--card-accent": certificate.accent, "--delay": `${(index % 2) * 120}ms` }} key={certificate.id}>
                    <div className="certification-header">
                      <span className="certification-icon"><CardIcon /></span>
                      <div className="certification-heading">
                        <span className="cert-type">{certificate.type}</span>
                        <h3>{certificate.title}</h3>
                        <p className="cert-issuer">{certificate.issuer}</p>
                      </div>
                    </div>
                    <ul className="cert-highlights">
                      {certificate.highlights.map((item, i) => {
                        const HighlightIcon = certHighlightIcons[i % certHighlightIcons.length];
                        return <li key={item}><span className="cert-highlight-icon"><HighlightIcon /></span>{item}</li>;
                      })}
                    </ul>
                    <div className="cert-footer">
                      <div className="cert-footer-item">
                        <FiCalendar />
                        <div><span className="cert-footer-label">Issued</span><strong>{certificate.date}</strong></div>
                      </div>
                      <a className="cert-footer-item cert-verify" href={certificate.url} target="_blank" rel="noreferrer">
                        <FiExternalLink />
                        <div><span className="cert-footer-label">Credential</span><strong>Verify <FiArrowUpRight /></strong></div>
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
            <div className="cert-badge reveal"><FiShield /> Always learning. Always growing.</div>
          </div>
        </section>

        <section id="skills" className="section surface-section">
          <div className="container">
            <SectionIntro number="03 / Expertise" eyebrow="What I work with" title="Tools for turning data into direction." />
            <TechEcosystem />
            <div className="skills-grid skills-grid--detail">
              {skills.map((skill, index) => (
                <article className="skill-card reveal" style={{ "--delay": `${index * 90}ms` }} key={skill.id}>
                  <span className="card-index">0{index + 1}</span>
                  <h3>{skill.title}</h3>
                  <p>{skill.description}</p>
                  <ul>{skill.technologies.map((tech) => <li key={tech}><FiCheck /> {tech}</li>)}</ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="section">
          <div className="container">
            <SectionIntro number="04 / Journey" eyebrow="Experience" title="Learning through work that matters." />
            <div className="timeline">
              {experience.map((item, index) => <article className="timeline-item reveal" style={{ "--delay": `${index * 100}ms` }} key={item.id}><div className="timeline-period">{item.period}</div><div className="timeline-marker" /><div className="timeline-content"><p>{item.location}</p><h3>{item.role}</h3><h4>{item.company}</h4><span>{item.description}</span><ul className="responsibility-list">{item.responsibilities.map((responsibility) => <li key={responsibility}><FiCheck /> {responsibility}</li>)}</ul><div className="experience-tags">{item.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div></div></article>)}
            </div>
          </div>
        </section>

        <section id="projects" className="section surface-section">
          <div className="container">
            <SectionIntro number="05 / Selected work" eyebrow="Projects" title="Experiments built around real problems." />
            <div className="projects-grid">
              {projects.map((project, index) => (
                <article className="project-card reveal" style={{ "--card-accent": project.accent, "--delay": `${(index % 3) * 100}ms` }} key={project.id}>
                  <div className="project-cover">
                    {project.image ? (
                      <img src={project.image} alt={project.title} loading="lazy" />
                    ) : (
                      <div className="project-cover-art">
                        <span className="project-emoji">{project.emoji}</span>
                        <span className="project-number">{project.number}</span>
                        <div className="cover-orb" />
                      </div>
                    )}
                  </div>
                  <div className="project-body">
                    <h3><span className="project-emoji-inline" aria-hidden="true">{project.emoji}</span> {project.title}</h3>
                    <p>{project.description}</p>
                    <div className="project-outcome"><FiCheck /> {project.outcome}</div>
                    <ul className="tag-list">{project.technologies.map((tech) => <li key={tech}>{tech}</li>)}</ul>
                    {(project.live || project.github) && (
                      <div className="project-actions">
                        {project.live && <a className="project-btn project-btn-live" href={project.live} target="_blank" rel="noreferrer"><FiExternalLink /> Live</a>}
                        {project.github && <a className="project-btn project-btn-code" href={project.github} target="_blank" rel="noreferrer"><FaGithub /> Code</a>}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="education" className="section education-section">
          <div className="container">
            <SectionIntro number="06 / Education" eyebrow="Academic background" title="Foundation that started the journey." />
            <div className="education-grid">
              {education.map((edu) => (
                <article className="education-card reveal" key={edu.id}>
                  <div className="edu-accent-bar" />
                  <div className="edu-header">
                    <div className="edu-icon-wrap">
                      <span className="edu-icon">🎓</span>
                    </div>
                    <div className="edu-meta">
                      <span className="edu-period"><FiCalendar /> {edu.period}</span>
                      <span className="edu-location"><FiMapPin /> {edu.location}</span>
                    </div>
                  </div>
                  <div className="edu-body">
                    <h3>{edu.institution}</h3>
                    <p className="edu-degree">{edu.degree}</p>
                    <p className="edu-field">{edu.field}</p>
                  </div>
                  <ul className="edu-highlights">
                    {edu.highlights.map((item) => (
                      <li key={item}><FiCheck /> {item}</li>
                    ))}
                  </ul>
                  <div className="edu-badge">
                    <span className="edu-badge-dot" />
                    Completed
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="section">
          <div className="container">
            <SectionIntro number="07 / Services" eyebrow="How I can help" title="Technology with a business purpose." />
            <div className="services-grid">
              {services.map(({ id, title, text, icon: Icon, accent }, index) => (
                <article className="service-card reveal" style={{ "--card-accent": accent, "--delay": `${index * 80}ms` }} key={id}>
                  <span className="service-index" aria-hidden="true">0{index + 1}</span>
                  <span className="service-icon"><Icon /></span>
                  <div className="service-body">
                    <h3>{title}</h3>
                    <p>{text}</p>
                    <a href="#contact">Let&apos;s discuss <FiArrowUpRight /></a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="container contact-grid">
            <div className="contact-halo halo-one" /><div className="contact-halo halo-two" />
            <div className="contact-copy reveal">
              <p className="section-number">08 / Contact</p>
              <p className="eyebrow"><span /> Let&apos;s connect</p>
              <h2>Let&apos;s build something intelligent together.</h2>
              <p className="contact-lead">Whether you&apos;re hiring, building a product, or exploring an idea, I&apos;d be glad to hear about it and figure out how I can help.</p>
              <div className="contact-methods">
                <a className="contact-method" href={`mailto:${contactEmail}`}>
                  <span className="contact-method-icon"><FiMail /></span>
                  <span className="contact-method-text"><small>Email</small><strong>{contactEmail}</strong></span>
                </a>
                <div className="contact-method">
                  <span className="contact-method-icon"><FiMapPin /></span>
                  <span className="contact-method-text"><small>Location</small><strong>Ahmedabad, Gujarat, India</strong></span>
                </div>
              </div>
              <div className="contact-socials" aria-label="Social links">
                {socialLinks.map(({ id, label, icon: Icon, url }) => (
                  <a key={id} href={url} target={url.startsWith("http") ? "_blank" : undefined} rel={url.startsWith("http") ? "noreferrer" : undefined} aria-label={label}><Icon /></a>
                ))}
              </div>
            </div>
            <form className="contact-form reveal reveal-delay" onSubmit={handleContactSubmit}>
              <div className="form-row">
                <label>Your name<input name="name" type="text" autoComplete="name" placeholder="Jane Doe" required /></label>
                <label>Email address<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label>
              </div>
              <label>What can I help with?<input name="subject" type="text" placeholder="Project, role, collaboration..." /></label>
              <label>Your message<textarea name="message" rows="5" placeholder="Tell me a little about what you have in mind..." required /></label>
              <button className="button button-primary" type="submit">Send message <FiSend /></button>
              {isSubmitted && <p className="form-notice">Your email app should now be open. If it didn&apos;t open, email Jaydip directly.</p>}
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-top reveal">
          <div className="footer-brand">
            <a className="brand" href="#home" aria-label="Jaydip Pithava home">
              <span className="brand-bracket">&lt;</span><span className="brand-name">Jaydip Pithava</span><span className="brand-bracket">&gt;</span>
            </a>
            <p className="footer-tagline">AI &amp; Data Science Developer building intelligent applications and data-driven tools.</p>
            <div className="footer-socials" aria-label="Social links">
              {socialLinks.map(({ id, label, icon: Icon, url }) => (
                <a key={id} href={url} target={url.startsWith("http") ? "_blank" : undefined} rel={url.startsWith("http") ? "noreferrer" : undefined} aria-label={label}><Icon /></a>
              ))}
            </div>
          </div>

          <div className="footer-links-col">
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-nav-list">
              {navigation.map((item) => (
                <li key={item.id}><a href={`#${item.id}`}>{item.title}</a></li>
              ))}
            </ul>
          </div>

          <div className="footer-contact-col">
            <h4 className="footer-col-title">Contact</h4>
            <ul className="footer-contact-list">
              <li><FiMail /><a href={`mailto:${contactEmail}`}>{contactEmail}</a></li>
              <li><FiMapPin /><span>Ahmedabad, Gujarat, India</span></li>
            </ul>
            <a className="button button-primary resume-btn" href="https://drive.google.com/file/d/1DpVxz7H1b9-3OPSlZlS-Ftlm31Mts2H8/view?usp=sharing" target="_blank" rel="noreferrer"><FiDownload /> Download Resume</a>
          </div>
        </div>

        <div className="container footer-inner">
          <p>© {new Date().getFullYear()} Jaydip Pithava. Built with intention.</p>
          <a href="#home">Back to top <FiArrowUpRight /></a>
        </div>
      </footer>
    </div>
  );
}

function SectionIntro({ number, eyebrow, title, action }) {
  return <div className="section-intro reveal"><div><p className="section-number">{number}</p><p className="eyebrow"><span /> {eyebrow}</p></div><div><h2>{title}</h2>{action}</div></div>;
}

export default App;

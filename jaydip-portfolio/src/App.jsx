import { useEffect, useState } from "react";
import {
  FiArrowDownRight,
  FiArrowUpRight,
  FiCalendar,
  FiCheck,
  FiCheckCircle,
  FiChevronRight,
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
import "./App.css";
import profilePhoto from "./assets/Jaydip-photo.jpg";
import heroVisual from "./assets/hero-updated.png";
import DataCanvas from "./components/Common/DataCanvas";
import certifications from "./data/certifications";
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
  }, []);

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

  return (
    <div className="site-shell">
      <header className="site-header">
        <nav className="navbar container" aria-label="Primary navigation">
          <a className="brand" href="#home" onClick={closeMenu} aria-label="Jaydip Pithava home">
            <span className="brand-bracket">&lt;</span><span className="brand-name">Jaydip Pithava</span><span className="brand-bracket">&gt;</span>
          </a>

          <button className="menu-toggle" type="button" aria-label="Toggle navigation menu" aria-expanded={isMenuOpen} onClick={() => setIsMenuOpen((open) => !open)}>
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>

          <div className={`nav-panel ${isMenuOpen ? "is-open" : ""}`}>
            <ul className="nav-links">
              {navigation.map((item) => (
                <li key={item.id}>
                  <a className={activeSection === item.id ? "active" : ""} href={`#${item.id}`} onClick={closeMenu}>{item.title}</a>
                </li>
              ))}
            </ul>
            <div className="nav-actions">
              <button className="theme-toggle" type="button" onClick={() => setTheme((current) => current === "light" ? "dark" : "light")} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`} title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}>
                {theme === "light" ? <FiMoon /> : <FiSun />}<span>{theme === "light" ? "Dark" : "Light"}</span>
              </button>
              <a className="button button-small button-primary nav-cta" href="#contact" onClick={closeMenu}>Let&apos;s talk <FiArrowUpRight /></a>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <section id="home" className="hero section">
          <div className="container hero-grid">
            <div className="hero-copy reveal">
              <p className="eyebrow"><span /> AI & Data Science Developer</p>
              <h1>Building intelligent solutions for <em>real-world</em> work.</h1>
              <p className="typewriter" aria-label="AI and Data Science Developer"><span aria-hidden="true">{typedRole}</span><i aria-hidden="true" /></p>
              <p className="hero-summary">I combine data, machine learning, and automation to help teams make smarter decisions and move faster.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#projects">Explore my work <FiArrowDownRight /></a>
                <a className="button button-ghost" href="#contact">Start a conversation <FiChevronRight /></a>
              </div>
              <div className="hero-socials" aria-label="Social links">
                {socialLinks.map(({ id, label, icon: Icon, url }) => (
                  <a key={id} href={url} target={url.startsWith("http") ? "_blank" : undefined} rel={url.startsWith("http") ? "noreferrer" : undefined} aria-label={label}><Icon /></a>
                ))}
              </div>
            </div>

            <div className="hero-art reveal reveal-delay">
              <DataCanvas theme={theme} />
              <div className="hero-orbit orbit-one" />
              <div className="hero-orbit orbit-two" />
              <div className="hero-glow" />
              <div className="hero-photo-frame"><img src={heroVisual} alt="Abstract AI and data-science illustration" /></div>
              <div className="floating-note note-top"><FiCpuIcon /> AI · ML · Automation</div>
              <div className="floating-note note-bottom"><span className="status-dot" /> Available for opportunities</div>
            </div>
          </div>
        </section>

        <section id="about" className="section about-section">
          <div className="container about-grid">
            <div className="about-aside reveal"><p className="section-number">01 / About</p><div className="portrait-mark"><img src={profilePhoto} alt="Jaydip Pithava" /></div></div>
            <div className="about-content reveal reveal-delay">
              <h2>Turning curiosity into practical technology.</h2>
              <p>I&apos;m Jaydip Pithava, an AI and Data Science Developer with a BBA in Finance and a Certified Data Scientist background. I enjoy making intelligent applications, data-driven tools, and automation workflows useful for real business problems.</p>
              <p>My work is grounded in the full process: understanding the problem, preparing reliable data, building an approach, and communicating results clearly.</p>
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
            <div className="skills-grid">
              {skills.map((skill, index) => <article className="skill-card reveal" style={{ "--delay": `${index * 90}ms` }} key={skill.id}><span className="card-index">0{index + 1}</span><h3>{skill.title}</h3><p>{skill.description}</p><ul>{skill.technologies.map((tech) => <li key={tech}><FiCheck /> {tech}</li>)}</ul></article>)}
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

        <section id="services" className="section">
          <div className="container">
            <SectionIntro number="06 / Services" eyebrow="How I can help" title="Technology with a business purpose." />
            <div className="services-grid">
              {services.map(({ id, title, text, icon: Icon }, index) => <article className="service-card reveal" style={{ "--delay": `${index * 80}ms` }} key={id}><Icon /><div><h3>{title}</h3><p>{text}</p><a href="#contact">Let&apos;s discuss <FiArrowUpRight /></a></div></article>)}
            </div>
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="container contact-grid">
            <div className="contact-halo halo-one" /><div className="contact-halo halo-two" />
            <div className="contact-copy reveal"><p className="section-number">07 / Contact</p><h2>Have a problem worth solving?</h2><p>Whether you&apos;re hiring, building a product, or exploring an idea, I&apos;d be happy to hear about it.</p><a className="contact-email" href={`mailto:${contactEmail}`}><FiMail /> {contactEmail}</a><div className="contact-location"><FiMapPin /> Ahmedabad, Gujarat, India</div></div>
            <form className="contact-form reveal reveal-delay" onSubmit={handleContactSubmit}>
              <label>Your name<input name="name" type="text" autoComplete="name" required /></label>
              <label>Email address<input name="email" type="email" autoComplete="email" required /></label>
              <label>What can I help with?<input name="subject" type="text" placeholder="Project, role, collaboration..." /></label>
              <label>Your message<textarea name="message" rows="4" required /></label>
              <button className="button button-primary" type="submit">Send message <FiSend /></button>
              {isSubmitted && <p className="form-notice">Your email app should now be open. If it didn&apos;t open, email Jaydip directly.</p>}
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer"><div className="container footer-inner"><p>© {new Date().getFullYear()} Jaydip Pithava. Built with intention.</p><a href="#home">Back to top <FiArrowUpRight /></a></div></footer>
    </div>
  );
}

function SectionIntro({ number, eyebrow, title, action }) {
  return <div className="section-intro reveal"><div><p className="section-number">{number}</p><p className="eyebrow"><span /> {eyebrow}</p></div><div><h2>{title}</h2>{action}</div></div>;
}

function FiCpuIcon() { return <span className="mini-cpu">✦</span>; }

export default App;

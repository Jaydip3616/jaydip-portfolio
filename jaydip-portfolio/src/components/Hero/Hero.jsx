import "./Hero.css";
import socialLinks from "../../data/socialLinks";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-left">

        <span className="tag">
          AI • Machine Learning • Automation
        </span>

        <h1>Jaydip Pithava</h1>

        <h2>Building Intelligent Digital Solutions</h2>

        <p>
          I build AI-powered applications, automation systems,
          and data-driven solutions that help businesses improve
          efficiency and solve real-world problems.
        </p>

        <div className="hero-buttons">
          <button className="primary-btn">
            Explore My Work
          </button>

          <button className="secondary-btn">
            Contact Me
          </button>
        </div>

        <div className="social-links">

  {socialLinks.map((social) => {

    const Icon = social.icon;

    return (

      <a
        key={social.id}
        href={social.url}
        target="_blank"
        rel="noreferrer"
      >

        <Icon />

      </a>

    );

  })}

</div>

      </div>

      <div className="hero-right">

        <div className="hero-circle">

          JP

        </div>

      </div>

    </section>
  );
}

export default Hero;
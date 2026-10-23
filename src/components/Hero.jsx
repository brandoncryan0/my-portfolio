function Hero() {
  return (
    <section className="hero">
      <div className="hero-topline">
        <span>PORTFOLIO / 2026</span>
        <span className="hero-topline-rule" />
      </div>

      <div className="hero-main">
        <div className="hero-primary">
          <h1>Brandon Cryan</h1>

          <p className="hero-disciplines">
            MATHEMATICS / SOFTWARE / COMMUNICATION
          </p>

          <p className="hero-description">
            Projects combining mathematics, software development, visualization,
            and technical communication.
          </p>
        </div>

        <div className="hero-focus">
          <span>Algorithms</span>
          <span>Visualization</span>
          <span>Mobile Development</span>
          <span>Technical Documentation</span>
          <span>Problem Solving</span>
        </div>
      </div>

      <div className="hero-actions">
        <a href="#projects">View selected work ↘</a>

        <a href="/resume.pdf" target="_blank" rel="noreferrer">
          View résumé ↗
        </a>
      </div>
    </section>
  );
}

export default Hero;

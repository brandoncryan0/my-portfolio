function Hero() {
  return (
    <section className="hero">
      <div className="hero-topline">
        <span>PORTFOLIO / 2026</span>
        <span>MATHEMATICS + TECHNOLOGY</span>
      </div>

      <div className="hero-content">
        <p className="hero-name">Brandon Cryan</p>

        <h1>
          Mathematics, software,
          <br />
          and technical communication.
        </h1>

        <div className="hero-lower">
          <p className="hero-description">
            I build tools, visualizations, and technical content that make
            complex problems easier to understand.
          </p>

          <div className="hero-actions">
            <a href="#projects">View selected work ↘</a>
            <a href="/resume.pdf">View résumé ↗</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;

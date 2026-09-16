function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <p className="hero-intro">HELLO, I'M</p>

        <h1>Brandon Cryan</h1>

        <h2>Mathematics • Technology • Technical Communication</h2>

        <p className="hero-description">
          I use analytical thinking, technical skills, and communication to
          solve problems and make complex ideas easier to understand.
        </p>

        <div className="hero-buttons">
          <a className="button primary-button" href="#projects">
            View My Projects
          </a>

          <a className="button secondary-button" href="/resume.pdf">
            View Resume
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;

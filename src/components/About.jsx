function About() {
  return (
    <section id="about" className="about">
      <div className="section-heading">
        <span>ABOUT</span>
        <span>BRANDON CRYAN</span>
      </div>

      <div className="about-grid">
        <div className="about-statement">
          <h2>
            Analytical thinking,
            <br />
            applied creatively.
          </h2>
        </div>

        <div className="about-copy">
          <p>
            I'm completing a degree in mathematics while building projects
            across programming, visualization, and technical communication.
          </p>

          <p>
            I'm especially interested in work that combines technical problem
            solving with clear communication — whether that means visualizing an
            algorithm, explaining a mathematical concept, or designing technical
            information for a specific audience.
          </p>
        </div>

        <div className="about-disciplines">
          <p className="about-label">DISCIPLINES</p>

          <div>
            <span>01</span>
            <p>Mathematics</p>
          </div>

          <div>
            <span>02</span>
            <p>Programming</p>
          </div>

          <div>
            <span>03</span>
            <p>Technical Communication</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;

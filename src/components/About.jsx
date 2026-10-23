function About() {
  return (
    <section id="about" className="about">
      <div className="section-heading">
        <span>ABOUT</span>
        <span>BACKGROUND / APPROACH</span>
      </div>

      <div className="about-editorial">
        <div className="about-intro">
          <p className="about-number">01 / ABOUT</p>

          <h2>
            Technical depth,
            <br />
            clear communication.
          </h2>
        </div>

        <div className="about-body">
          <p className="about-lead">
            I work at the intersection of mathematics, software, and technical
            communication.
          </p>

          <div className="about-copy">
            <p>
              My background in mathematics gives me a strong foundation in
              analytical reasoning and structured problem solving. I use that
              foundation to build software, interactive visualizations, and
              technical documentation.
            </p>

            <p>
              I am particularly interested in projects where complex information
              needs to become understandable and useful—whether that means
              visualizing an algorithm, developing a focused mobile application,
              explaining a mathematical concept, or designing structured
              technical content.
            </p>
          </div>
        </div>

        <div className="about-focus">
          <p className="about-label">FOCUS AREAS</p>

          <div>
            <span>01</span>
            <p>Mathematics & Analysis</p>
          </div>

          <div>
            <span>02</span>
            <p>Software Development</p>
          </div>

          <div>
            <span>03</span>
            <p>Technical Communication</p>
          </div>

          <div>
            <span>04</span>
            <p>Visualization & UX</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;

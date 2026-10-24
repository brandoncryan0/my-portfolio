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
            Math, software,
            <br />
            and clear explanations.
          </h2>
        </div>

        <div className="about-body">
          <p className="about-lead">
            I have a background in mathematics and enjoy building things that
            help make difficult ideas easier to understand.
          </p>

          <div className="about-copy">
            <p>
              Most of my work falls somewhere between programming, mathematics,
              and technical writing. I have built interactive tools for
              pathfinding and linear algebra, a workout tracking app, and
              structured technical documentation.
            </p>

            <p>
              I like figuring out how something works, breaking it into smaller
              pieces, and finding a clear way to present it. Sometimes that
              means writing code, sometimes it means creating a diagram or
              documentation, and sometimes it means doing a little of both.
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

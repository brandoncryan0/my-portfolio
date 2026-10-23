function Contact() {
  return (
    <section id="contact" className="contact">
      <p className="contact-label">LET'S CONNECT</p>

      <h2>
        Have a problem
        <br />
        worth solving?
      </h2>

      <p className="contact-description">
        I'm interested in opportunities where analytical thinking, software, and
        clear technical communication come together.
      </p>

      <div className="contact-links">
        <a href="mailto:brandon.cryan0@gmail.com">Email ↗</a>

        <a
          href="https://github.com/brandoncryan0"
          target="_blank"
          rel="noreferrer"
        >
          GitHub ↗
        </a>

        <a href="/resume.pdf" target="_blank" rel="noreferrer">
          Résumé ↗
        </a>
      </div>

      <footer>
        <span>© 2026 Brandon Cryan</span>

        <span>Mathematics / Software / Communication</span>
      </footer>
    </section>
  );
}

export default Contact;

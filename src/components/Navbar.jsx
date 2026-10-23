function Navbar() {
  return (
    <nav className="navbar">
      <a className="nav-name" href="/">
        Brandon Cryan
      </a>

      <div className="nav-links">
        <a href="/#projects">Work</a>
        <a href="/#about">About</a>
        <a href="/#contact">Contact</a>

        <a href="/resume.pdf" target="_blank" rel="noreferrer">
          Résumé
        </a>

        <a
          href="https://github.com/brandoncryan0"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      </div>
    </nav>
  );
}

export default Navbar;

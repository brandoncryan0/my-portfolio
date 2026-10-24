import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import About from "./components/About";
import Contact from "./components/Contact";
import ProjectPage from "./pages/ProjectPage";

function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Projects />
        <About />
        <Contact />
      </main>
    </>
  );
}

function NotFound() {
  return (
    <main className="project-page">
      <a className="back-link" href="/">
        ← Back to Portfolio
      </a>

      <header className="project-header">
        <div className="project-header-meta">
          <span>404</span>
          <span>PAGE NOT FOUND</span>
        </div>

        <h1>Nothing here.</h1>

        <p className="project-page-description">
          The page you're looking for doesn't exist or may have been moved.
        </p>
      </header>
    </main>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/projects/:projectId" element={<ProjectPage />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

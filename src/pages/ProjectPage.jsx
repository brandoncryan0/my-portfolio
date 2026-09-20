import { useParams } from "react-router-dom";
import projects from "../data/projects";
import DijkstraVisualizer from "../components/DijkstraVisualizer/DijkstraVisualizer";

function ProjectPage() {
  const { projectId } = useParams();

  const project = projects.find((project) => project.id === projectId);

  if (!project) {
    return (
      <main className="project-page">
        <h1>Project not found</h1>
        <a href="/">Return Home</a>
      </main>
    );
  }

  return (
    <main className="project-page">
      <a className="back-link" href="/">
        ← Back to Portfolio
      </a>

      <header className="project-header">
        <p className="section-label">{project.category}</p>

        <h1>{project.title}</h1>

        <p className="project-page-description">{project.description}</p>

        <div className="project-skills">
          {project.skills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      </header>

      {project.id === "dijkstra" && <DijkstraVisualizer />}

      <section className="project-details">
        <div>
          <h2>Overview</h2>
          <p>{project.overview}</p>
        </div>

        <div>
          <h2>The Problem</h2>
          <p>{project.problem}</p>
        </div>

        <div>
          <h2>My Approach</h2>
          <p>{project.approach}</p>
        </div>

        <div>
          <h2>Result</h2>
          <p>{project.result}</p>
        </div>
      </section>
    </main>
  );
}

export default ProjectPage;

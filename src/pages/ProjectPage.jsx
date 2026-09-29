import { lazy, Suspense } from "react";
import { useParams } from "react-router-dom";

import projects from "../data/projects";

import DijkstraVisualizer from "../components/DijkstraVisualizer/DijkstraVisualizer";

const EigenvalueVisualizer = lazy(
  () => import("../components/EigenvalueVisualizer/EigenvalueVisualizer"),
);

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

      {project.id === "dijkstra" && (
        <section className="project-live-demo">
          <div className="project-demo-heading">
            <p className="section-label">INTERACTIVE DEMO</p>

            <h2>Explore the algorithms</h2>

            <p>
              Build a board, add terrain and obstacles, generate a maze, and
              compare how Dijkstra and A* search for a path.
            </p>
          </div>

          <div className="project-demo-container">
            <DijkstraVisualizer />
          </div>
        </section>
      )}

      {project.id === "eigenvalue-visualizer" && (
        <section className="project-live-demo">
          <div className="project-demo-heading">
            <p className="section-label">INTERACTIVE DEMO</p>

            <h2>Explore the transformation</h2>

            <p>
              Change the matrix and observe how the transformation affects the
              plane, eigenvalues, and eigenvectors.
            </p>
          </div>

          <div className="project-demo-container">
            <Suspense
              fallback={<p role="status">Loading eigenvalue visualizer...</p>}
            >
              <EigenvalueVisualizer />
            </Suspense>
          </div>
        </section>
      )}

      <section className="project-details">
        {project.overview && (
          <div>
            <h2>Overview</h2>
            <p>{project.overview}</p>
          </div>
        )}

        {project.problem && (
          <div>
            <h2>The Problem</h2>
            <p>{project.problem}</p>
          </div>
        )}

        {project.approach && (
          <div>
            <h2>My Approach</h2>
            <p>{project.approach}</p>
          </div>
        )}

        {project.result && (
          <div>
            <h2>Result</h2>
            <p>{project.result}</p>
          </div>
        )}
      </section>
    </main>
  );
}

export default ProjectPage;

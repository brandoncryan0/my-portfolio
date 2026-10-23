import { lazy, Suspense } from "react";
import { Link, useParams } from "react-router-dom";

import projects from "../data/projects";

import DijkstraVisualizer from "../components/DijkstraVisualizer/DijkstraVisualizer";

const EigenvalueVisualizer = lazy(
  () => import("../components/EigenvalueVisualizer/EigenvalueVisualizer"),
);

function ProjectPage() {
  const { projectId } = useParams();

  const projectIndex = projects.findIndex(
    (project) => project.id === projectId,
  );

  const project = projects[projectIndex];

  if (!project) {
    return (
      <main className="project-page">
        <h1>Project not found</h1>

        <a href="/">Return Home</a>
      </main>
    );
  }

  const previousProject =
    projects[(projectIndex - 1 + projects.length) % projects.length];

  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <main className="project-page">
      <a className="back-link" href="/">
        ← Back to Portfolio
      </a>

      <header className="project-header">
        <div className="project-header-meta">
          <span>
            {String(projectIndex + 1).padStart(2, "0")} /{" "}
            {String(projects.length).padStart(2, "0")}
          </span>

          <span>{project.category}</span>
        </div>

        <h1>{project.title}</h1>

        <p className="project-page-description">{project.description}</p>

        <div className="project-skills">
          {project.skills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>

        {(project.liveUrl || project.pdfUrl || project.githubUrl) && (
          <div className="project-links">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer">
                View Documentation ↗
              </a>
            )}

            {project.pdfUrl && (
              <a href={project.pdfUrl} target="_blank" rel="noreferrer">
                View PDF ↗
              </a>
            )}

            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer">
                View Source ↗
              </a>
            )}
          </div>
        )}
      </header>

      {/* =====================================================
          FITNESS TRACKER MAIN SCREEN
          ===================================================== */}

      {project.id === "fitness-tracker" && project.image && (
        <section className="project-mobile-showcase">
          <p className="section-label">MOBILE APPLICATION</p>

          <div className="project-phone-preview">
            <img
              src={project.image}
              alt="Workout Tracker mobile application interface"
            />
          </div>

          <p className="project-image-caption">
            Android workout logging interface showing workout selection,
            previous-weight recall, and exercise tracking.
          </p>
        </section>
      )}

      {/* =====================================================
          TINY BUS MAIN DIAGRAM
          ===================================================== */}

      {project.id === "technical-writing" && project.image && (
        <section className="project-case-study-visual">
          <p className="section-label">SCHEMATIC RECONSTRUCTION</p>

          <div className="project-case-study-image">
            <img
              src={project.image}
              alt="Reconstructed Tiny Bus interior space plan"
            />
          </div>

          <p className="project-image-caption">
            Retrospective interior layout reconstruction. The diagram is
            schematic and not to scale.
          </p>
        </section>
      )}

      {/* =====================================================
          DIJKSTRA INTERACTIVE DEMO
          ===================================================== */}

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

      {/* =====================================================
          EIGENVALUE INTERACTIVE DEMO
          ===================================================== */}

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

      {/* =====================================================
          PROJECT DETAILS
          ===================================================== */}

      <section className="project-details">
        {project.overview && (
          <div className="project-detail-text">
            <h2>Overview</h2>

            <p>{project.overview}</p>
          </div>
        )}

        {project.problem && (
          <div className="project-detail-text">
            <h2>The Problem</h2>

            <p>{project.problem}</p>
          </div>
        )}

        {project.approach && (
          <div className="project-detail-text">
            <h2>My Approach</h2>

            <p>{project.approach}</p>
          </div>
        )}

        {/* ===================================================
            FITNESS TRACKER HISTORY SCREEN
            =================================================== */}

        {project.id === "fitness-tracker" && project.historyImage && (
          <div className="project-fitness-history">
            <p className="section-label">LOCAL WORKOUT HISTORY</p>

            <div className="project-history-preview">
              <img
                src={project.historyImage}
                alt="Workout Tracker history screen showing saved workouts"
              />
            </div>

            <p className="project-image-caption">
              Saved workouts remain available locally on the device and can be
              reviewed or removed without requiring an account or cloud
              connection.
            </p>
          </div>
        )}

        {/* ===================================================
            TINY BUS COMPONENT DIAGRAM
            =================================================== */}

        {project.id === "technical-writing" && project.detailImage && (
          <div className="project-detail-visual">
            <p className="section-label">COMPONENT DOCUMENTATION</p>

            <div className="project-case-study-image">
              <img
                src={project.detailImage}
                alt="Tiny Bus interior component callout diagram"
              />
            </div>

            <p className="project-image-caption">
              Reconstructed component diagram identifying the major interior
              features and circulation path.
            </p>
          </div>
        )}

        {project.result && (
          <div className="project-detail-text">
            <h2>Result</h2>

            <p>{project.result}</p>
          </div>
        )}
      </section>

      {/* =====================================================
          PREVIOUS / NEXT PROJECT
          ===================================================== */}

      <nav className="project-pagination" aria-label="Project navigation">
        <Link
          className="project-pagination-item project-pagination-previous"
          to={`/projects/${previousProject.id}`}
        >
          <span className="project-pagination-label">← Previous project</span>

          <span className="project-pagination-title">
            {previousProject.title}
          </span>
        </Link>

        <Link
          className="project-pagination-item project-pagination-next"
          to={`/projects/${nextProject.id}`}
        >
          <span className="project-pagination-label">Next project →</span>

          <span className="project-pagination-title">{nextProject.title}</span>
        </Link>
      </nav>
    </main>
  );
}

export default ProjectPage;

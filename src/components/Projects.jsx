import { Link } from "react-router-dom";
import projects from "../data/projects";

function Projects() {
  return (
    <section id="projects" className="work">
      <div className="section-heading">
        <span>SELECTED WORK</span>

        <span>{String(projects.length).padStart(2, "0")} PROJECTS</span>
      </div>

      <div className="project-card-grid">
        {projects.map((project, index) => (
          <article className="project-card" key={project.id}>
            <Link
              className="project-card-image"
              to={`/projects/${project.id}`}
              aria-label={`View ${project.title}`}
            >
              {project.image ? (
                <img src={project.image} alt={`${project.title} preview`} />
              ) : (
                <div className="project-card-placeholder">
                  {String(index + 1).padStart(2, "0")}
                </div>
              )}
            </Link>

            <div className="project-card-content">
              <p className="project-card-number">
                {String(index + 1).padStart(2, "0")}
              </p>

              <p className="project-card-category">{project.category}</p>

              <h2>
                <Link to={`/projects/${project.id}`}>{project.title}</Link>
              </h2>

              <p className="project-card-description">{project.description}</p>

              <div className="project-card-skills">
                {project.skills.slice(0, 3).map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>

              <Link
                className="project-card-link"
                to={`/projects/${project.id}`}
              >
                View project ↗
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Projects;

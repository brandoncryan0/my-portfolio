import { Link } from "react-router-dom";
import projects from "../data/projects";

function Projects() {
  return (
    <section id="projects" className="work">
      <div className="section-heading">
        <span>SELECTED WORK</span>

        <span>{String(projects.length).padStart(2, "0")} PROJECTS</span>
      </div>

      <div className="work-list">
        {projects.map((project, index) => (
          <article
            className={`work-item ${
              index % 2 === 1 ? "work-item-reverse" : ""
            }`}
            key={project.id}
          >
            <Link className="work-visual" to={`/projects/${project.id}`}>
              {project.image ? (
                <img src={project.image} alt={`${project.title} preview`} />
              ) : (
                <div className="work-placeholder">
                  <span>{String(index + 1).padStart(2, "0")}</span>

                  <span className="placeholder-symbol">
                    {index === 0 ? "V → E" : index === 1 ? "Av = λv" : "Aa"}
                  </span>
                </div>
              )}

              <span className="work-visual-label">View project ↗</span>
            </Link>

            <div className="work-info">
              <p className="work-number">
                {String(index + 1).padStart(2, "0")} / {project.category}
              </p>

              <h2>{project.title}</h2>

              <p className="work-description">{project.description}</p>

              <div className="work-skills">
                {project.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>

              <Link className="work-link" to={`/projects/${project.id}`}>
                Explore project →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Projects;

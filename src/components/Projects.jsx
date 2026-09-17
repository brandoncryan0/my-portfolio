import ProjectCard from "./ProjectCard";
import projects from "../data/projects";

function Projects() {
  return (
    <section id="projects" className="projects">
      <div className="section-container">
        <p className="section-label">SELECTED WORK</p>

        <h2>Featured Projects</h2>

        <p className="section-description">
          A selection of projects demonstrating my work in mathematics,
          technology, and technical communication.
        </p>

        <div className="project-grid">
          {projects.map((project) => (
            <ProjectCard
              id={project.id}
              key={project.id}
              title={project.title}
              category={project.category}
              description={project.description}
              skills={project.skills}
              image={project.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;

import ProjectCard from "./ProjectCard";

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
          <ProjectCard
            title="Project One"
            category="PROGRAMMING"
            description="A short description explaining what this project is, what problem it addresses, and what I contributed."
            skills={["JavaScript", "React", "CSS"]}
          />

          <ProjectCard
            title="Project Two"
            category="TECHNICAL COMMUNICATION"
            description="A technical communication project demonstrating research, information design, and communication for a specific audience."
            skills={["Research", "Writing", "Design"]}
          />

          <ProjectCard
            title="Project Three"
            category="MATHEMATICS"
            description="A mathematics project demonstrating analytical reasoning, problem solving, and mathematical communication."
            skills={["Mathematics", "Analysis", "LaTeX"]}
          />
        </div>
      </div>
    </section>
  );
}

export default Projects;

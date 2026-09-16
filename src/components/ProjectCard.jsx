function ProjectCard({ title, category, description, skills }) {
  return (
    <article className="project-card">
      <div className="project-image">
        <span>Project Preview</span>
      </div>

      <div className="project-content">
        <p className="project-category">{category}</p>

        <h3>{title}</h3>

        <p className="project-description">{description}</p>

        <div className="project-skills">
          {skills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>

        <a className="project-link" href="#">
          View Project →
        </a>
      </div>
    </article>
  );
}

export default ProjectCard;

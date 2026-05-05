import { useState } from "react";
import ProjectDetail from "./ProjectDetail";
import "../styles/ProjectCard.css";

const imagePatterns = {
  branding: "◆ ◇ ◆ ◇",
  digital: "▲ △ ▲",
  print: "▬ ▭ ▬",
  web: "⬡ ⬢ ⬡",
  packaging: "● ○ ●",
  motion: "» » »",
  report: "≡ ≡ ≡",
  app: "⊞ ⊟ ⊞",
};

export default function ProjectCard({ project }) {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <>
      <article
        className={`project-card ${project.featured ? "project-card--featured" : ""}`}
        onClick={() => setShowDetail(true)}
        style={{ "--card-accent": project.accentColor, "--card-bg": project.color }}
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setShowDetail(true)}
        role="button"
        aria-label={`View ${project.title} project`}
      >
        <div className="card-image" style={{ background: project.color }}>
          <div className="card-pattern" style={{ color: project.accentColor }}>
            {imagePatterns[project.image] || "◆ ◇ ◆"}
          </div>
          {project.featured && <span className="featured-badge">Featured</span>}
        </div>

        <div className="card-body">
          <div className="card-meta">
            <span className="card-category">{project.category}</span>
            <span className="card-year">{project.year}</span>
          </div>
          <h3 className="card-title">{project.title}</h3>
          <p className="card-description">{project.description}</p>

          <div className="card-tags">
            {project.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>

          <div className="card-footer">
            <span className="card-client">{project.client}</span>
            <span className="card-cta">View Project →</span>
          </div>
        </div>
      </article>

      {showDetail && (
        <ProjectDetail project={project} onClose={() => setShowDetail(false)} />
      )}
    </>
  );
}

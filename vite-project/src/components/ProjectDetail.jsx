import "../styles/ProjectDetail.css";

export default function ProjectDetail({ project, onClose }) {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="detail-backdrop" onClick={handleBackdropClick} role="dialog" aria-modal="true">
      <div className="detail-panel">
        <button className="detail-close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        <div
          className="detail-hero"
          style={{ background: project.color, color: project.accentColor }}
        >
          <div className="detail-pattern">
            {[...Array(12)].map((_, i) => (
              <span key={i}>◆</span>
            ))}
          </div>
          <div className="detail-hero-text">
            <span className="detail-category">{project.category}</span>
            <h2 className="detail-title">{project.title}</h2>
          </div>
        </div>

        <div className="detail-content">
          <div className="detail-info-grid">
            <div className="detail-info-item">
              <span className="info-label">Client</span>
              <span className="info-value">{project.client}</span>
            </div>
            <div className="detail-info-item">
              <span className="info-label">Year</span>
              <span className="info-value">{project.year}</span>
            </div>
            <div className="detail-info-item">
              <span className="info-label">Category</span>
              <span className="info-value">{project.category}</span>
            </div>
          </div>

          <p className="detail-description">{project.description}</p>

          <div className="detail-tags">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="detail-tag"
                style={{ background: project.color, color: project.accentColor }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

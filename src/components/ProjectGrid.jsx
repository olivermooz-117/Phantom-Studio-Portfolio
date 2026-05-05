import ProjectCard from "./ProjectCard";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";
import "../styles/ProjectGrid.css";

export default function ProjectGrid({
  projects,
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
  categories,
  totalCount,
}) {
  return (
    <section className="project-section" id="work">
      <div className="section-header">
        <div>
          <h2 className="section-title">Our Work</h2>
          <p className="section-subtitle">
            {projects.length} of {totalCount} projects
          </p>
        </div>
        <SearchBar value={searchQuery} onChange={onSearchChange} />
      </div>

      <FilterBar
        categories={categories}
        active={activeFilter}
        onSelect={onFilterChange}
      />

      {projects.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">◇</div>
          <p className="empty-title">No projects found</p>
          <p className="empty-sub">Try adjusting your search or filter.</p>
        </div>
      ) : (
        <div className="project-grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </section>
  );
}

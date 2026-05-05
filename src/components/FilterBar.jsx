import "../styles/FilterBar.css";

export default function FilterBar({ categories, active, onSelect }) {
  return (
    <div className="filter-bar" role="group" aria-label="Filter projects by category">
      {categories.map((cat) => (
        <button
          key={cat}
          className={`filter-btn ${active === cat ? "filter-btn--active" : ""}`}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

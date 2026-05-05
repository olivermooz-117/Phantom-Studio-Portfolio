import "../styles/Navbar.css";

export default function Navbar({ onAddProject }) {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <a href="#" className="navbar-logo">
          <span className="logo-mark">◆</span>
          <span className="logo-text">Craft Studio</span>
        </a>

        <ul className="navbar-links">
          <li><a href="#work">Work</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        <button className="btn-add-project" onClick={onAddProject}>
          + Add Project
        </button>
      </div>
    </nav>
  );
}

import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="logo-mark">◆</span>
          <span className="logo-text">Craft Studio</span>
        </div>
        <p className="footer-copy">
          © {new Date().getFullYear()} Craft Studio. All rights reserved.
        </p>
        <div className="footer-links">
          <a href="#">Twitter</a>
          <a href="#">Dribbble</a>
          <a href="#">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}

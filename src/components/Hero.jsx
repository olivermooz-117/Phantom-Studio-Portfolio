import "../styles/Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <p className="hero-eyebrow">Creative Agency · Est. 2018</p>
        <h1 className="hero-headline">
          We craft <em>bold</em>
          <br />
          digital experiences
        </h1>
        <p className="hero-subtext">
          Brand identity, web design, print, and digital campaigns — built for
          companies that want to be remembered.
        </p>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-number">120+</span>
            <span className="stat-label">Projects Delivered</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-number">48</span>
            <span className="stat-label">Happy Clients</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-number">6</span>
            <span className="stat-label">Industry Awards</span>
          </div>
        </div>
      </div>
      <div className="hero-visual">
        <div className="hero-grid-bg" aria-hidden="true">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="hero-grid-cell" />
          ))}
        </div>
        <div className="floating-badge badge-1">Brand Strategy</div>
        <div className="floating-badge badge-2">UI / UX</div>
        <div className="floating-badge badge-3">Motion Design</div>
      </div>
    </section>
  );
}

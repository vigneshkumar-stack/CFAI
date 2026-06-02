export default function Header() {
  return (
    <header className="hero">
      <div className="hero__content">
        <p className="eyebrow">AI + CSP + Search + Explainability</p>
        <h1>Smart AI Examination Seating Arrangement System</h1>
        <p className="hero__text">
          Generate conflict-aware exam seating plans, visualize room layouts, explain every assignment,
          and support students, faculty, and administrators from one responsive control center.
        </p>
        <div className="hero__badges">
          <span>Automatic Allocation</span>
          <span>Multi-Classroom Planning</span>
          <span>Roll Number Lookup</span>
          <span>Reasoning Traces</span>
        </div>
      </div>
      <div className="hero__panel">
        <div className="signal-card">
          <div className="signal-card__label">Optimization Core</div>
          <div className="signal-card__value">CSP + Bayesian Safety</div>
        </div>
        <div className="signal-card">
          <div className="signal-card__label">Search Demos</div>
          <div className="signal-card__value">BFS, DFS, UCS, A*, Greedy, IDA*</div>
        </div>
        <div className="signal-card">
          <div className="signal-card__label">Explainable AI</div>
          <div className="signal-card__value">Why accepted, why rejected, what failed</div>
        </div>
      </div>
    </header>
  );
}

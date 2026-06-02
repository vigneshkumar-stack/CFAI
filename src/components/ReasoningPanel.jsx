export default function ReasoningPanel({ result }) {
  if (!result) {
    return (
      <section className="panel">
        <h2>AI Reasoning</h2>
        <p>Generate a seating plan to inspect CSP choices, rejection causes, and hybrid AI notes.</p>
      </section>
    );
  }

  const notes = result.algorithm_notes;

  return (
    <section className="panel">
      <div className="panel__header">
        <h2>Explainable AI Console</h2>
        <span>{result.reasoning_trace.length} trace events</span>
      </div>
      <div className="grid two-up">
        <div className="info-block">
          <h3>PEAS Highlights</h3>
          {Object.entries(notes.peas).map(([key, value]) => (
            <div key={key} className="info-row">
              <strong>{key.replaceAll("_", " ")}</strong>
              <p>{value.performance}</p>
            </div>
          ))}
        </div>
        <div className="info-block">
          <h3>Probabilistic AI</h3>
          <p>Variable elimination estimate: {result.analytics.expected_conflict_probability}</p>
          <p>Rejection sampling: {notes.probabilistic_ai.rejection_sampling}</p>
          <p>Likelihood weighting: {notes.probabilistic_ai.likelihood_weighting}</p>
        </div>
      </div>
      <div className="trace-list">
        {result.reasoning_trace.slice(0, 14).map((event, index) => (
          <div key={`${event.step}-${index}`} className="trace-item">
            <strong>{event.step}</strong>
            <p>{event.message}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

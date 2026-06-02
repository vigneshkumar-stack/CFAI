export default function PlanSummary({ result }) {
  if (!result) {
    return null;
  }

  return (
    <section className="panel">
      <div className="panel__header">
        <h2>Constraint Health</h2>
        <span>{result.feasible ? "Feasible plan" : "Fallback plan"}</span>
      </div>
      <div className="grid two-up">
        <div className="info-block">
          <h3>Analytics</h3>
          <p>Assigned students: {result.analytics.assigned_students}</p>
          <p>Unassigned students: {result.analytics.unassigned_students}</p>
          <p>Runtime: {result.analytics.runtime_ms} ms</p>
          <p>Violations: {result.analytics.violation_count}</p>
        </div>
        <div className="info-block">
          <h3>Violations & Suggestions</h3>
          {result.violations.map((violation, index) => (
            <p key={`${violation.constraint}-${index}`}>
              <strong>{violation.constraint}:</strong> {violation.message}
            </p>
          ))}
          {!result.violations.length && <p>No violations reported.</p>}
        </div>
      </div>
    </section>
  );
}

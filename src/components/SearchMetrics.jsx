export default function SearchMetrics({ metrics = [] }) {
  return (
    <section className="panel">
      <div className="panel__header">
        <h2>Search Algorithm Visualizer</h2>
        <span>Implicit state-space demonstration</span>
      </div>
      <div className="metrics-grid">
        {metrics.map((metric) => (
          <div key={metric.algorithm} className="metric-card">
            <h3>{metric.algorithm}</h3>
            <p>Node expansions: {metric.node_expansions}</p>
            <p>Runtime: {metric.runtime_ms} ms</p>
            <p>Peak frontier: {metric.peak_frontier}</p>
            <div className="mini-trace">
              {metric.trace?.slice(0, 5).map((node, index) => (
                <span key={`${metric.algorithm}-${index}`}>
                  {node.state} | g={node.cost} | h={node.heuristic}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

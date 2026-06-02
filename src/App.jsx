import { useEffect, useState } from "react";
import Header from "./components/Header";
import PlanSummary from "./components/PlanSummary";
import ReasoningPanel from "./components/ReasoningPanel";
import RollSearch from "./components/RollSearch";
import SearchMetrics from "./components/SearchMetrics";
import SeatGrid from "./components/SeatGrid";
import StatCard from "./components/StatCard";
import { createDemoResult, defaultBatchForm, demoOverview, demoRequest } from "./demoData";

export default function App() {
  const [overview, setOverview] = useState(demoOverview);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [batchForm, setBatchForm] = useState(defaultBatchForm);

  useEffect(() => {
    setOverview(demoOverview);
    setResult(createDemoResult(defaultBatchForm));
  }, []);

  const handleFormChange = (key) => (event) => {
    const digitsOnly = event.target.value.replace(/\D/g, "");

    setBatchForm((current) => ({
      ...current,
      [key]: key === "batchSize" ? digitsOnly.slice(0, 2) : digitsOnly.slice(0, 10)
    }));
  };

  const generatePlan = async () => {
    const normalizedBatchSize = Math.max(1, Math.min(Number(batchForm.batchSize) || 30, 30));

    setLoading(true);
    try {
      await new Promise((resolve) => {
        window.setTimeout(resolve, 450);
      });
      setResult(
        createDemoResult({
          ...batchForm,
          batchSize: String(normalizedBatchSize)
        })
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-shell">
      <Header />

      <section className="action-bar">
        <div className="action-copy">
          <p className="eyebrow">Operations Dashboard</p>
          <h2>Generate seating from a roll-number range and place up to 30 students per batch</h2>
          <p className="muted">
            Example range: `2520030136` to `2520030170`. The planner will generate up to 30 students from
            the selected range and update the visualizer.
          </p>
        </div>
        <div className="planner-card">
          <div className="planner-form">
            <label>
              <span>Start roll</span>
              <input value={batchForm.startRoll} onChange={handleFormChange("startRoll")} placeholder="2520030136" />
            </label>
            <label>
              <span>End roll</span>
              <input value={batchForm.endRoll} onChange={handleFormChange("endRoll")} placeholder="2520030170" />
            </label>
            <label>
              <span>Batch size</span>
              <input value={batchForm.batchSize} onChange={handleFormChange("batchSize")} placeholder="30" />
            </label>
          </div>
          <button onClick={generatePlan} disabled={loading}>
            {loading ? "Generating..." : "Run Seating Optimizer"}
          </button>
        </div>
      </section>

      <section className="stats-row">
        {(overview?.status_cards || []).map((card, index) => (
          <StatCard
            key={card.label}
            label={card.label}
            value={card.value}
            accent={["#0a9396", "#ca6702", "#bb3e03", "#005f73"][index % 4]}
          />
        ))}
      </section>

      <PlanSummary result={result} />

      <section className="grid main-grid">
        <RollSearch lookup={result?.student_lookup} />
        <ReasoningPanel result={result} />
      </section>

      <SearchMetrics metrics={result?.search_metrics || []} />

      <section className="panel">
        <div className="panel__header">
          <h2>Miniature Classroom Visualization</h2>
          <span>Accessible rows highlighted</span>
        </div>
        <div className="rooms-layout">
          {demoRequest.classrooms.map((room) => (
            <SeatGrid
              key={room.room_id}
              room={room}
              assignments={result?.assignments?.filter((item) => item.room_id === room.room_id) || []}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

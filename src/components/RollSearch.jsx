import { useState } from "react";

export default function RollSearch({ lookup }) {
  const [roll, setRoll] = useState("");
  const result = lookup?.[roll.trim()];
  const hasSearch = roll.trim().length > 0;

  return (
    <section className="panel">
      <div className="panel__header">
        <h2>Student Roll Number Search</h2>
        <span>Instant seat discovery</span>
      </div>
      <div className="search-box">
        <input
          value={roll}
          onChange={(event) => setRoll(event.target.value.replace(/\D/g, "").slice(0, 10))}
          inputMode="numeric"
          maxLength={10}
          placeholder="Enter roll number, e.g. 2530000136"
        />
      </div>
      <p className="muted">Format: `YY + code + serial` where `30 = CSE`, `40 = ECE`, `80 = AIDS`, `90 = CSIT`.</p>
      {result ? (
        <div className="lookup-card">
          <h3>{result.name}</h3>
          <p>{result.roll_number}</p>
          <p>
            {result.room_id} | {result.seat_label}
          </p>
          <p>{result.subject_code}</p>
        </div>
      ) : hasSearch ? (
        <p className="muted">No student found for that roll number in the current demo plan.</p>
      ) : (
        <p className="muted">Generate a plan and search a roll number from the current arrangement.</p>
      )}
    </section>
  );
}

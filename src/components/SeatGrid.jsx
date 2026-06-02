function buildMap(assignments) {
  return assignments.reduce((acc, assignment) => {
    acc[assignment.seat_label] = assignment;
    return acc;
  }, {});
}

export default function SeatGrid({ room, assignments }) {
  const seatMap = buildMap(assignments);
  const rows = Array.from({ length: room.rows }, (_, row) => row);
  const cols = Array.from({ length: room.cols }, (_, col) => col);

  return (
    <div className="room-card">
      <div className="room-card__header">
        <div>
          <h3>{room.name}</h3>
          <p>{room.room_id}</p>
        </div>
        <span>{room.rows * room.cols} seats</span>
      </div>
      <div className="seat-grid" style={{ gridTemplateColumns: `repeat(${room.cols}, minmax(0, 1fr))` }}>
        {rows.flatMap((row) =>
          cols.map((col) => {
            const label = `${room.room_id}-R${row + 1}C${col + 1}`;
            const occupant = seatMap[label];
            const isGapSeat = room.gap_seats?.includes(label);
            return (
              <div
                key={label}
                className={`seat ${occupant ? "seat--occupied" : isGapSeat ? "seat--gap" : "seat--empty"} ${
                  room.accessible_rows?.includes(row) ? "seat--accessible" : ""
                }`}
              >
                <strong>{row + 1}-{col + 1}</strong>
                <span>{occupant ? occupant.roll_number : isGapSeat ? "GAP" : "EMPTY"}</span>
                <small>{occupant ? occupant.subject_code : isGapSeat ? "Spacing gap" : "Gap / reserve"}</small>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

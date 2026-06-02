export default function StatCard({ label, value, accent }) {
  return (
    <div className="stat-card">
      <p>{label}</p>
      <h3 style={{ color: accent }}>{value}</h3>
    </div>
  );
}

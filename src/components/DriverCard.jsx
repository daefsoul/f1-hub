import { teamColor } from "../utils/teamColors";

// Gambar pemandu tiada: papar nombor besar + kod + warna pasukan
export default function DriverCard({ row }) {
  const d = row.Driver;
  const team = row.Constructors?.[row.Constructors.length - 1];
  const color = teamColor(team?.constructorId);
  return (
    <div style={{ background: "var(--surface)", borderTop: `4px solid ${color}`, borderRadius: 8, padding: 14 }}>
      <div style={{ fontFamily: "Titillium Web", fontWeight: 700, fontSize: 40, lineHeight: 1, color }}>
        {d.permanentNumber ?? "-"}
      </div>
      <div style={{ color: "var(--muted)", fontWeight: 600, marginTop: 4 }}>{d.code ?? ""}</div>
      <div style={{ fontWeight: 600, marginTop: 6 }}>{d.givenName} {d.familyName}</div>
      <div style={{ color: "var(--muted)", fontSize: 13 }}>{team?.name}</div>
    </div>
  );
}

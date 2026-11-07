import { teamColor } from "../utils/teamColors";

export default function ResultsTable({ rows }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", background: "var(--surface)" }}>
        <thead>
          <tr style={{ color: "var(--muted)", textAlign: "left", fontSize: 13 }}>
            <th style={cell}>Pos</th>
            <th style={cell}>Pemandu</th>
            <th style={cell}>Pasukan</th>
            <th style={cell}>Laps</th>
            <th style={cell}>Masa / Status</th>
            <th style={cell}>Pts</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.Driver.driverId}
                style={{ borderLeft: `4px solid ${teamColor(r.Constructor.constructorId)}`, borderTop: "1px solid #2c2c3a" }}>
              <td style={cell}>{r.positionText}</td>
              <td style={{ ...cell, fontWeight: 600 }}>{r.Driver.givenName} {r.Driver.familyName}</td>
              <td style={{ ...cell, color: "var(--muted)" }}>{r.Constructor.name}</td>
              <td style={cell}>{r.laps}</td>
              <td style={cell}>{r.Time?.time ?? r.status}</td>
              <td style={{ ...cell, fontWeight: 700 }}>{r.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const cell = { padding: "10px 12px", whiteSpace: "nowrap" };

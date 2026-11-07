import { teamColor } from "../utils/teamColor";

export default function StandingsTable({ rows, type }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", background: "var(--surface)" }}>
        <thead>
          <tr style={{ color: "var(--muted)", textAlign: "left", fontSize: 13 }}>
            <th style={cell}>Pos</th>
            <th style={cell}>{type === "drivers" ? "Pemandu" : "Pasukan"}</th>
            {type === "drivers" && <th style={cell}>Pasukan</th>}
            <th style={cell}>Wins</th>
            <th style={cell}>Pts</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const teamId = type === "drivers"
              ? r.Constructors?.[r.Constructors.length - 1]?.constructorId
              : r.Constructor.constructorId;
            return (
              <tr key={type === "drivers" ? r.Driver.driverId : teamId}
                  style={{ borderLeft: `4px solid ${teamColor(teamId)}`, borderTop: "1px solid #2c2c3a" }}>
                <td style={cell}>{r.position}</td>
                <td style={{ ...cell, fontWeight: 600 }}>
                  {type === "drivers"
                    ? `${r.Driver.givenName} ${r.Driver.familyName}`
                    : r.Constructor.name}
                </td>
                {type === "drivers" && (
                  <td style={{ ...cell, color: "var(--muted)" }}>
                    {r.Constructors?.[r.Constructors.length - 1]?.name}
                  </td>
                )}
                <td style={cell}>{r.wins}</td>
                <td style={{ ...cell, fontWeight: 700 }}>{r.points}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const cell = { padding: "10px 12px", whiteSpace: "nowrap" };

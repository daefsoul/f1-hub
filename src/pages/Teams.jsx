import { getConstructorStandings, getDriverStandings } from "../api/jolpica";
import useFetch from "../hooks/useFetch";
import { teamColor } from "../utils/teamColors";
import { Loading, ErrorBox, Empty } from "../components/States";

export default function Teams() {
  const { status, data, error, retry } = useFetch(async () => {
    const [teams, drivers] = await Promise.all([getConstructorStandings(), getDriverStandings()]);
    return teams.length ? { teams, drivers } : [];
  }, []);

  return (
    <div className="page">
      <h1 style={{ marginBottom: 12 }}>Teams</h1>
      {status === "loading" && <Loading />}
      {status === "error" && <ErrorBox message={error} onRetry={retry} />}
      {status === "empty" && <Empty />}
      {status === "ready" && data.teams.map((t) => {
        const id = t.Constructor.constructorId;
        const members = data.drivers.filter((d) => d.Constructors?.some((c) => c.constructorId === id));
        return (
          <div key={id} style={{ background: "var(--surface)", borderLeft: `4px solid ${teamColor(id)}`, borderRadius: 8, padding: 14, marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <strong>{t.position}. {t.Constructor.name}</strong>
              <strong>{t.points} pts</strong>
            </div>
            <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 4 }}>
              {members.map((d) => `${d.Driver.givenName} ${d.Driver.familyName}`).join(" · ")}
            </div>
            <div style={{ color: "var(--muted)", fontSize: 13 }}>Wins: {t.wins}</div>
          </div>
        );
      })}
    </div>
  );
}

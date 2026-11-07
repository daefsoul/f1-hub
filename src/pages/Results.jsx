import { useSearchParams } from "react-router-dom";
import {
  getSeasons, getWinners, getRaceResults,
  getDriverStandings, getConstructorStandings,
} from "../api/jolpica";
import useFetch from "../hooks/useFetch";
import StandingsTable from "../components/StandingsTable";
import ResultsTable from "../components/ResultsTable";
import { Loading, ErrorBox, Empty } from "../components/States";

const TABS = ["races", "drivers", "teams"];

export default function Results() {
  const [params, setParams] = useSearchParams();
  const year = params.get("year") || String(new Date().getFullYear());
  const tab = TABS.includes(params.get("tab")) ? params.get("tab") : "races";
  const round = params.get("round");

  const seasons = useFetch(getSeasons, []);
  const { status, data, error, retry } = useFetch(() => {
    if (tab === "drivers") return getDriverStandings(year);
    if (tab === "teams") return getConstructorStandings(year);
    return round ? getRaceResults(year, round) : getWinners(year);
  }, [year, tab, round]);

  const go = (next) => setParams({ year, tab, ...next });

  return (
    <div className="page">
      <h1 style={{ marginBottom: 12 }}>Results</h1>

      <select value={year} onChange={(e) => setParams({ year: e.target.value, tab })}
        style={{ width: "100%", padding: 10, marginBottom: 12, background: "var(--surface)", color: "#fff", border: 0, borderRadius: 6 }}>
        {(seasons.data || [year]).map((y) => <option key={y} value={y}>{y}</option>)}
      </select>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {TABS.map((t) => (
          <button key={t} onClick={() => setParams({ year, tab: t })}
            style={{
              flex: 1, padding: 10, border: 0, borderRadius: 6, fontWeight: 600,
              background: tab === t ? "var(--red)" : "var(--surface)",
              color: "#fff", textTransform: "capitalize",
            }}>
            {t}
          </button>
        ))}
      </div>

      {tab === "races" && round && (
        <button onClick={() => setParams({ year, tab })}
          style={{ marginBottom: 12, background: "none", border: 0, color: "var(--red)", fontWeight: 600 }}>
          ← Semua race {year}
        </button>
      )}

      {status === "loading" && <Loading />}
      {status === "error" && <ErrorBox message={error} onRetry={retry} />}
      {status === "empty" && <Empty text="Data tidak tersedia" />}

      {status === "ready" && tab !== "races" && <StandingsTable rows={data} type={tab} />}
      {status === "ready" && tab === "races" && round && <ResultsTable rows={data} />}
      {status === "ready" && tab === "races" && !round && data.map((race) => {
        const w = race.Results[0];
        return (
          <button key={race.round} onClick={() => go({ round: race.round })}
            style={{ display: "block", width: "100%", textAlign: "left", background: "var(--surface)", color: "#fff", border: 0, padding: 14, borderRadius: 8, marginBottom: 8 }}>
            <div style={{ color: "var(--muted)", fontSize: 12 }}>R{race.round} · {race.date}</div>
            <div style={{ fontWeight: 600 }}>{race.raceName}</div>
            <div style={{ fontSize: 13 }}>
              🏆 {w.Driver.givenName} {w.Driver.familyName}
              <span style={{ color: "var(--muted)" }}> · {w.Constructor.name} · {w.Time?.time}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

import { useSearchParams } from "react-router-dom";
import { getDriverStandings, getConstructorStandings } from "../api/jolpica";
import useFetch from "../hooks/useFetch";
import StandingsTable from "../components/StandingsTable";
import { Loading, ErrorBox, Empty } from "../components/States";

export default function Standings() {
  const [params, setParams] = useSearchParams();
  const tab = params.get("tab") === "teams" ? "teams" : "drivers";

  const { status, data, error, retry } = useFetch(
    () => (tab === "drivers" ? getDriverStandings() : getConstructorStandings()),
    [tab]
  );

  return (
    <div className="page">
      <h1 style={{ marginBottom: 12 }}>Standings</h1>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {["drivers", "teams"].map((t) => (
          <button key={t} onClick={() => setParams({ tab: t })}
            style={{
              flex: 1, padding: 10, border: 0, borderRadius: 6, fontWeight: 600,
              background: tab === t ? "var(--red)" : "var(--surface)",
              color: "#fff", textTransform: "capitalize",
            }}>
            {t}
          </button>
        ))}
      </div>

      {status === "loading" && <Loading />}
      {status === "error" && <ErrorBox message={error} onRetry={retry} />}
      {status === "empty" && <Empty />}
      {status === "ready" && <StandingsTable rows={data} type={tab} />}
    </div>
  );
}

import { Link, useSearchParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { getSchedule } from "../api/jolpica";
import useFetch from "../hooks/useFetch";
import { Loading, ErrorBox, Empty } from "../components/States";
import { raceEnded, raceDate, fmtDate } from "../utils/time";

export default function Calendar() {
  const [params, setParams] = useSearchParams();
  const { status, data, error, retry } = useFetch(() => getSchedule(), []);

  const upcoming = (data || []).filter((r) => !raceEnded(r));
  const previous = (data || []).filter(raceEnded).reverse();
  const tab = params.get("tab") || (upcoming.length ? "upcoming" : "previous");
  const list = tab === "previous" ? previous : upcoming;

  return (
    <div className="page">
      <h1 style={{ marginBottom: 12 }}>Calendar</h1>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {["upcoming", "previous"].map((t) => (
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
      {status === "ready" && list.length === 0 && <Empty text="Tiada race dalam tab ni" />}
      {status === "ready" && list.map((r) => {
        const inner = (
          <div style={{ background: "var(--surface)", padding: 14, borderRadius: 8, marginBottom: 8, display: "flex", justifyContent: "space-between", gap: 12 }}>
            <div>
              <div style={{ color: "var(--muted)", fontSize: 12 }}>R{r.round}</div>
              <div style={{ fontWeight: 600 }}>{r.raceName}</div>
              <div style={{ color: "var(--muted)", fontSize: 13 }}>{r.Circuit.Location.locality}, {r.Circuit.Location.country}</div>
            </div>
            <div style={{ textAlign: "right", whiteSpace: "nowrap" }}>
              <div>{fmtDate(raceDate(r))}</div>
              {tab === "previous" && (
                <div style={{ color: "var(--red)", fontSize: 13, display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                  Keputusan <ChevronRight size={14} />
                </div>
              )}
            </div>
          </div>
        );
        return tab === "previous" ? (
          <Link key={r.round} to={`/results?year=${r.season}&tab=races&round=${r.round}`}
                style={{ color: "inherit", textDecoration: "none" }}>
            {inner}
          </Link>
        ) : (
          <div key={r.round}>{inner}</div>
        );
      })}
    </div>
  );
}

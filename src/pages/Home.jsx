import { Link } from "react-router-dom";
import { Timer, Users, Flag, ArrowRight, CloudSun } from "lucide-react";
import { getSchedule, getDriverStandings, getLastResults } from "../api/jolpica";
import useFetch from "../hooks/useFetch";
import Countdown from "../components/Countdown";
import ForecastCard from "../components/ForecastCard";
import { Loading, ErrorBox, Empty } from "../components/States";
import { findNextSession, getSessions, fmtSession } from "../utils/time";

const card = { background: "var(--surface)", padding: 16, borderRadius: 8, marginBottom: 16 };
const label = { color: "var(--muted)", fontSize: 13, display: "flex", alignItems: "center", gap: 6 };
const more = { color: "var(--red)", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 4, marginTop: 8 };
const row = { display: "flex", justifyContent: "space-between", padding: "4px 0" };

export default function Home() {
  const schedule = useFetch(() => getSchedule(), []);
  const drivers = useFetch(() => getDriverStandings(), []);
  const last = useFetch(() => getLastResults(), []);

  const next = schedule.data ? findNextSession(schedule.data) : null;

  return (
    <div className="page">
      <section style={card}>
        <h3 style={label}><Timer size={14} /> SESI SETERUSNYA</h3>
        {schedule.status === "loading" && <Loading />}
        {schedule.status === "error" && <ErrorBox message={schedule.error} onRetry={schedule.retry} />}
        {schedule.status === "ready" && !next && <Empty text="Tiada sesi akan datang" />}
        {next && (
          <>
            <h2 style={{ margin: "4px 0" }}>{next.session.label}</h2>
            <p style={{ color: "var(--muted)", marginBottom: 12 }}>
              R{next.race.round} · {next.race.raceName}
            </p>
            <Countdown target={next.session.start} />
            <h3 style={{ ...label, margin: "16px 0 8px" }}>JADUAL HUJUNG MINGGU</h3>
            {getSessions(next.race).map((s) => (
              <div key={s.label} style={row}>
                <span>{s.label}</span>
                <span style={{ color: "var(--muted)" }}>{fmtSession(s.start)}</span>
              </div>
            ))}
          </>
        )}
      </section>

      {next && (
        <section style={card}>
          <h3 style={{ ...label, marginBottom: 8 }}><CloudSun size={14} /> RAMALAN CUACA (LOKASI LITAR)</h3>
          <ForecastCard race={next.race} />
        </section>
      )}

      <section style={card}>
        <h3 style={{ ...label, marginBottom: 8 }}><Users size={14} /> TOP 3 PEMANDU</h3>
        {drivers.status === "loading" && <Loading />}
        {drivers.status === "error" && <ErrorBox message={drivers.error} onRetry={drivers.retry} />}
        {drivers.status === "empty" && <Empty />}
        {drivers.status === "ready" && drivers.data.slice(0, 3).map((d) => (
          <div key={d.Driver.driverId} style={row}>
            <span>{d.position}. {d.Driver.givenName} {d.Driver.familyName}</span>
            <strong>{d.points}</strong>
          </div>
        ))}
        <Link to="/standings" style={more}>
          Standings penuh <ArrowRight size={16} />
        </Link>
      </section>

      <section style={card}>
        <h3 style={{ ...label, marginBottom: 8 }}>
          <Flag size={14} /> RACE TERAKHIR{last.data ? `: ${last.data.race.raceName}` : ""}
        </h3>
        {last.status === "loading" && <Loading />}
        {last.status === "error" && <ErrorBox message={last.error} onRetry={last.retry} />}
        {last.status === "ready" && !last.data && <Empty text="Belum ada keputusan musim ni" />}
        {last.data && last.data.results.slice(0, 5).map((r) => (
          <div key={r.Driver.driverId} style={row}>
            <span>P{r.position} {r.Driver.givenName} {r.Driver.familyName}</span>
            <span style={{ color: "var(--muted)" }}>{r.Constructor.name}</span>
          </div>
        ))}
        {last.data && (
          <Link to={`/results?year=${last.data.race.season}&tab=races&round=${last.data.race.round}`} style={more}>
            Keputusan penuh <ArrowRight size={16} />
          </Link>
        )}
      </section>
    </div>
  );
}

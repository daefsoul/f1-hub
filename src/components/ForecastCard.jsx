import { Sun, CloudRain } from "lucide-react";
import useFetch from "../hooks/useFetch";
import { getForecast } from "../api/weather";
import { Loading, ErrorBox } from "./States";

const dayStr = (race, back) => {
  const d = new Date(`${race.date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() - back);
  return d.toISOString().slice(0, 10);
};

const weekday = (s) =>
  new Intl.DateTimeFormat(undefined, { weekday: "short", timeZone: "UTC" }).format(new Date(`${s}T00:00:00Z`));

export default function ForecastCard({ race }) {
  const { lat, long } = race.Circuit.Location;
  const { status, data, error, retry } = useFetch(() => getForecast(lat, long), [lat, long]);

  const rows = status === "ready"
    ? [2, 1, 0].map((back) => {
        const day = dayStr(race, back);
        const i = data.daily.time.indexOf(day);
        if (i < 0) return null;
        return {
          day,
          max: Math.round(data.daily.temperature_2m_max[i]),
          min: Math.round(data.daily.temperature_2m_min[i]),
          rain: data.daily.precipitation_probability_max[i],
        };
      }).filter(Boolean)
    : [];

  return (
    <>
      {status === "loading" && <Loading />}
      {status === "error" && <ErrorBox message={error} onRetry={retry} />}
      {status === "ready" && rows.length === 0 && (
        <p style={{ color: "var(--muted)" }}>Ramalan belum tersedia (had 16 hari).</p>
      )}
      {rows.map((r) => (
        <div key={r.day} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0" }}>
          <span style={{ width: 48, fontWeight: 600 }}>{weekday(r.day)}</span>
          {r.rain >= 50 ? <CloudRain size={18} color="var(--red)" /> : <Sun size={18} color="var(--muted)" />}
          <span style={{ color: "var(--muted)" }}>Hujan {r.rain}%</span>
          <span>{r.min}° / {r.max}°C</span>
        </div>
      ))}
      <p style={{ color: "var(--muted)", fontSize: 11, marginTop: 8 }}>
        Data cuaca oleh Open-Meteo.com (CC BY 4.0)
      </p>
    </>
  );
}

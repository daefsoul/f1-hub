import { getCache, setCache } from "../utils/cache";

export async function getForecast(lat, long) {
  const key = `weather:${lat},${long}`;
  const cached = getCache(key);
  if (cached) return cached;
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}` +
    `&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max` +
    `&timezone=auto&forecast_days=16`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  setCache(key, data, 60 * 60 * 1000);
  return data;
}

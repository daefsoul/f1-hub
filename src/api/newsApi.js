import { getCache, setCache } from "../utils/cache";

export async function getNews() {
  const cached = getCache("news");
  if (cached) return cached;
  const res = await fetch("/api/news");
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  setCache("news", data, 15 * 60 * 1000);
  return data;
}

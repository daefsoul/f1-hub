import { getCache, setCache } from "../utils/cache";

const BASE = "https://api.jolpi.ca/ergast/f1";
const MIN_GAP_MS = 400; // jeda antara request
const MIN = 60 * 1000;
const HOUR = 60 * MIN;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Giliran: request jalan satu demi satu, ada jeda
let chain = Promise.resolve();
let lastCall = 0;

function queued(task) {
  const run = chain.then(async () => {
    const wait = Math.max(0, lastCall + MIN_GAP_MS - Date.now());
    if (wait) await sleep(wait);
    lastCall = Date.now();
    return task();
  });
  chain = run.catch(() => {});
  return run;
}

// Retry perlahan bila 429 (exponential backoff)
async function fetchJson(url, tries = 3) {
  for (let i = 0; i < tries; i++) {
    const res = await fetch(url);
    if (res.status === 429) {
      await sleep(1000 * 2 ** i);
      continue;
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  }
  throw new Error("Terlalu banyak request (429), cuba sebentar lagi");
}

async function get(path, ttl) {
  const cached = getCache(path);
  if (cached) return cached;
  const data = await queued(() => fetchJson(`${BASE}${path}`));
  setCache(path, data, ttl);
  return data;
}

export async function getDriverStandings(season = "current") {
  const data = await get(`/${season}/driverStandings.json`, 10 * MIN);
  const list = data.MRData.StandingsTable.StandingsLists[0];
  return list ? list.DriverStandings : [];
}

export async function getConstructorStandings(season = "current") {
  const data = await get(`/${season}/constructorStandings.json`, 10 * MIN);
  const list = data.MRData.StandingsTable.StandingsLists[0];
  return list ? list.ConstructorStandings : [];
}

const DAY = 24 * HOUR;

export async function getSchedule(season = "current") {
  const data = await get(`/${season}.json`, DAY);
  return data.MRData.RaceTable.Races;
}

export async function getRaceResults(season, round) {
  const data = await get(`/${season}/${round}/results.json`, HOUR);
  return data.MRData.RaceTable.Races[0]?.Results ?? [];
}

export async function getLastResults() {
  const data = await get(`/current/last/results.json`, 10 * MIN);
  const race = data.MRData.RaceTable.Races[0];
  return race ? { race, results: race.Results } : null;
}

export async function getWinners(season) {
  const data = await get(`/${season}/results/1.json?limit=100`, HOUR);
  return data.MRData.RaceTable.Races;
}

export async function getSeasons() {
  const data = await get(`/seasons.json?limit=100`, DAY);
  return data.MRData.SeasonTable.Seasons.map((s) => s.season).reverse();
}

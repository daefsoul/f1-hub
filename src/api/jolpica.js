const { cache } = require("react");

const BASE = "https://api.jolpi.ca/ergast/f1";
const CACHE_MINUTES = 10;

async function get(path) {
    const key = 'jolpica:${path}';
    try {
        const cached = JSON.parse(localStorage.getItem(key));
        if (cached && Date.now() - cached.time < CACHE_MINUTES * 60000) {
            return cached.data;
        }
    } catch {}

    const res = await fetch('${BASE}${path}.json');
    if (res.status === 429) throw new Error("Too many request, please try again later");
    if (!res.ok) throw new Error('API error: ${res.status}');

    const data = (await res.json()).MRData;
    try { 
        localStorage.setItem(key, JSON.stringify({ time: Date.now(), data}));
    } catch {}
    return data;
}

export async function getDriverStandings(season = "current") {
    const d = await get('/${season}/driverStandings');
    return d.StandingsTable.StandingsLists[0]?.DriverStandings ?? [];
}

export async function getConstructorStandings(season = "current") {
    const d = await get('/$season}/constructorStandings');
    return d.StandingsTable.StandingsLists[0]?.ConstructorStandings ?? [];
}

export async function getSchedule(season = "current") {
    const d = await get('/$season}/races');
    return d.RaceTable.Races;
}

export async function getResults(season, round) {
    const d = await get('/$season}/${round}/results');
    return d.RaceTable.Races[0]?.Results ?? [];
}
const KEYS = [
  ["FirstPractice", "FP1"],
  ["SecondPractice", "FP2"],
  ["ThirdPractice", "FP3"],
  ["SprintQualifying", "Sprint Quali"],
  ["SprintShootout", "Sprint Shootout"],
  ["Sprint", "Sprint"],
  ["Qualifying", "Quali"],
];

const toDate = (o) => new Date(`${o.date}T${o.time || "00:00:00Z"}`);

export function getSessions(race) {
  const list = KEYS.filter(([k]) => race[k]).map(([k, label]) => ({
    label,
    start: toDate(race[k]),
  }));
  list.push({ label: "Race", start: toDate(race) });
  return list.sort((a, b) => a.start - b.start);
}

export function findNextSession(races) {
  const now = Date.now();
  for (const race of races) {
    for (const session of getSessions(race)) {
      if (session.start.getTime() > now) return { race, session };
    }
  }
  return null;
}

// Race dikira tamat 3 jam selepas mula
export const raceEnded = (race) => toDate(race).getTime() + 3 * 3600 * 1000 < Date.now();

export const fmtSession = (d) =>
  new Intl.DateTimeFormat(undefined, {
    weekday: "short", day: "numeric", month: "short",
    hour: "2-digit", minute: "2-digit",
  }).format(d);

export const fmtDate = (d) =>
  new Intl.DateTimeFormat(undefined, { day: "numeric", month: "short" }).format(d);

export const raceDate = toDate;

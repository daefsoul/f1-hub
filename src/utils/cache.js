const PREFIX = "f1hub:";

export function getCache(key) {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    if (!raw) return null;
    const { value, expires } = JSON.parse(raw);
    if (Date.now() > expires) {
      localStorage.removeItem(PREFIX + key);
      return null;
    }
    return value;
  } catch {
    return null;
  }
}

export function setCache(key, value, ttlMs) {
  try {
    localStorage.setItem(
      PREFIX + key,
      JSON.stringify({ value, expires: Date.now() + ttlMs })
    );
  } catch {
    // storage penuh atau dimatikan, abaikan
  }
}

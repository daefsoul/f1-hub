import { useEffect, useState } from "react";

export default function Countdown({ target }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const s = Math.max(0, Math.floor((target - now) / 1000));
  const parts = [
    [Math.floor(s / 86400), "d"],
    [Math.floor((s % 86400) / 3600), "h"],
    [Math.floor((s % 3600) / 60), "m"],
    [s % 60, "s"],
  ];

  return (
    <div style={{ display: "flex", gap: 10, fontFamily: "Titillium Web", fontWeight: 700 }}>
      {parts.map(([n, u]) => (
        <div key={u} style={{ textAlign: "center" }}>
          <div style={{ fontSize: 32, color: "var(--red)" }}>{String(n).padStart(2, "0")}</div>
          <div style={{ fontSize: 12, color: "var(--muted)" }}>{u}</div>
        </div>
      ))}
    </div>
  );
}

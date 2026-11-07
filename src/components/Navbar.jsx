import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/calendar", label: "Calendar" },
  { to: "/results", label: "Results" },
  { to: "/standings", label: "Standings" },
];

export default function Navbar() {
  return (
    <nav style={{ background: "var(--surface)", borderBottom: "3px solid var(--red)", display: "flex", gap: 16, padding: "12px 16px", overflowX: "auto" }}>
      <strong style={{ color: "var(--red)", fontFamily: "Titillium Web" }}>F1 HUB</strong>
      {links.map((l) => (
        <NavLink key={l.to} to={l.to} end={l.to === "/"}
          style={({ isActive }) => ({ color: isActive ? "var(--text)" : "var(--muted)", textDecoration: "none", fontWeight: 600 })}>
          {l.label}
        </NavLink>
      ))}
    </nav>
  );
}

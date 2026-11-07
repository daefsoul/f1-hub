import { NavLink } from "react-router-dom";
import { Home, CalendarDays, Flag, Trophy } from "lucide-react";

const links = [
  { to: "/", label: "Home", Icon: Home },
  { to: "/calendar", label: "Calendar", Icon: CalendarDays },
  { to: "/results", label: "Results", Icon: Flag },
  { to: "/standings", label: "Standings", Icon: Trophy },
];

export default function Navbar() {
  return (
    <nav style={{ background: "var(--surface)", borderBottom: "3px solid var(--red)", display: "flex", alignItems: "center", gap: 16, padding: "12px 16px", overflowX: "auto" }}>
      <strong style={{ color: "var(--red)", fontFamily: "Titillium Web" }}>F1 HUB</strong>
      {links.map(({ to, label, Icon }) => (
        <NavLink key={to} to={to} end={to === "/"}
          style={({ isActive }) => ({
            color: isActive ? "var(--text)" : "var(--muted)",
            textDecoration: "none", fontWeight: 600,
            display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap",
          })}>
          <Icon size={16} />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}

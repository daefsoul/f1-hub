import { ExternalLink } from "lucide-react";
import { getNews } from "../api/newsApi";
import useFetch from "../hooks/useFetch";
import { Loading, ErrorBox, Empty } from "../components/States";

export default function News() {
  const { status, data, error, retry } = useFetch(getNews, []);
  return (
    <div className="page">
      <h1 style={{ marginBottom: 12 }}>News</h1>
      {status === "loading" && <Loading />}
      {status === "error" && <ErrorBox message={error} onRetry={retry} />}
      {status === "empty" && <Empty text="Tiada berita" />}
      {status === "ready" && data.map((n) => (
        <a key={n.link} href={n.link} target="_blank" rel="noopener noreferrer"
           style={{ display: "block", background: "var(--surface)", color: "inherit", textDecoration: "none", padding: 14, borderRadius: 8, marginBottom: 8 }}>
          <div style={{ fontWeight: 600 }}>{n.title}</div>
          <div style={{ color: "var(--muted)", fontSize: 12, marginTop: 6, display: "flex", alignItems: "center", gap: 6 }}>
            {n.source} · {new Date(n.date).toLocaleDateString()} <ExternalLink size={12} />
          </div>
        </a>
      ))}
    </div>
  );
}

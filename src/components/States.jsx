export function Loading() {
  return <p style={{ color: "var(--muted)", padding: 16 }}>Memuatkan...</p>;
}

export function ErrorBox({ message, onRetry }) {
  return (
    <div style={{ background: "var(--surface)", borderLeft: "4px solid var(--red)", padding: 16 }}>
      <p>Gagal memuatkan data: {message}</p>
      {onRetry && (
        <button onClick={onRetry} style={{ marginTop: 8, background: "var(--red)", color: "#fff", border: 0, padding: "8px 14px", borderRadius: 6 }}>
          Cuba lagi
        </button>
      )}
    </div>
  );
}

export function Empty({ text = "Data tidak tersedia" }) {
  return <p style={{ color: "var(--muted)", padding: 16 }}>{text}</p>;
}

import { getDriverStandings } from "../api/jolpica";
import useFetch from "../hooks/useFetch";
import DriverCard from "../components/DriverCard";
import { Loading, ErrorBox, Empty } from "../components/States";

export default function Drivers() {
  const { status, data, error, retry } = useFetch(() => getDriverStandings(), []);
  return (
    <div className="page">
      <h1 style={{ marginBottom: 12 }}>Drivers</h1>
      {status === "loading" && <Loading />}
      {status === "error" && <ErrorBox message={error} onRetry={retry} />}
      {status === "empty" && <Empty />}
      {status === "ready" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 12 }}>
          {data.map((row) => <DriverCard key={row.Driver.driverId} row={row} />)}
        </div>
      )}
    </div>
  );
}

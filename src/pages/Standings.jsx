import { useEffect } from "react";
import { getDriverStandings } from "../api/jolpica";

export default function Standings() {
  useEffect(() => {
    getDriverStandings().then((d) => console.log("drivers", d));
  }, []);
  return <div className="page"><h1>Standings</h1></div>;
}

import { useEffect, useState } from "react";
import { getDriverStandings, getConstructorStandings } from "../api/jolpica";

export default function Standings(){
    const [tab, setTab] = useState("drivers");
    const [rows, setRows] = useState([]);
    const [status, setStatus] = useState("loading");

    useEffect
}

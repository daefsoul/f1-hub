import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Calendar from "./pages/Calendar";
import Results from "./pages/Results";
import Standings from "./pages/Standings";
import Drivers from "./pages/Drivers";
import Teams from "./pages/Teams";
import News from "./pages/News";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/results" element={<Results />} />
        <Route path="/standings" element={<Standings />} />
        <Route path="/drivers" element={<Drivers />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/news" element={<News />} />
      </Routes>
    </>
  );
}

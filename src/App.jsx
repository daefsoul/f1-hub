import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Calendar from "./pages/Calendar";
import Results from "./pages/Results";
import Standings from "./pages/Standings";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/results" element={<Results />} />
        <Route path="/standings" element={<Standings />} />
      </Routes>
    </>
  );
}

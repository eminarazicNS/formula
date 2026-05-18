import { BrowserRouter, Link, Route, Routes } from "react-router";
import AllDrivers from "./components/AllDrivers";
import AllTeams from "./components/AllTeams";
import AllRaces from "./components/AllRaces";
import DriverDetails from "./components/DriverDetails";
import DriverRaces from "./components/DriverRaces";
import Qualifiers from "./components/Qualifiers";
import Results from "./components/Results";
import TeamDetails from "./components/TeamDetails";
import TeamResults from "./components/TeamResults";

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li><Link to="/">Drivers</Link></li>
          <li><Link to="/teams">Teams</Link></li>
          <li><Link to="/races">Races</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<AllDrivers />} />
        <Route path="/teams" element={<AllTeams />} />
        <Route path="/races" element={<AllRaces />} />

        <Route path="/driverDetails" element={<DriverDetails />} />
        <Route path="/driverRaces" element={<DriverRaces />} />
        <Route path="/qualifiers" element={<Qualifiers />} />
        <Route path="/results" element={<Results />} />
        <Route path="/teamDetails" element={<TeamDetails />} />
        <Route path="/teamResults" element={<TeamResults />} />


      </Routes>
    </BrowserRouter>
  );
}
import { BrowserRouter, Link, Route, Routes } from "react-router";
import AllDrivers from "./components/AllDrivers";
import AllTeams from "./components/AllTeams";
import AllRaces from "./components/AllRaces";
import DriverDetails from "./components/DriverDetails";
import TeamDetails from "./components/TeamDetails";
import RaceDetails from "./components/RaceDetails";
// import Home from "./components/Home";
// import DriverRaces from "./components/DriverRaces";
// import Qualifiers from "./components/Qualifiers";
// import Results from "./components/Results";

export default function App() {

  return (
    <BrowserRouter>
      <div>
        <img src="../img/logo.png" alt="Logo" />
      </div>
      <nav>
        <ul>
          <li><Link to="/">Drivers</Link></li>
          <li><Link to="/teams">Teams</Link></li>
          <li><Link to="/races">Races</Link></li>
        </ul>
      </nav>

      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<AllDrivers />} />
        <Route path="/teams" element={<AllTeams />} />
        <Route path="/races" element={<AllRaces />} />

        <Route path="/driverDetails/:id" element={<DriverDetails />} />
        <Route path="/teamDetails/:id" element={<TeamDetails />} />
        <Route path="/raceDetails/:id" element={<RaceDetails />} />


      </Routes>
    </BrowserRouter>
  );
}
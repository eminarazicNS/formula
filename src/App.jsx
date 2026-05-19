import { BrowserRouter, Link, Route, Routes } from "react-router";
import AllDrivers from "./components/AllDrivers";
import AllTeams from "./components/AllTeams";
import AllRaces from "./components/AllRaces";
import DriverDetails from "./components/DriverDetails";
import TeamDetails from "./components/TeamDetails";
import TeamResults from "./components/TeamResults";
import RaceDetails from "./components/RaceDetails";
// import DriverRaces from "./components/DriverRaces";
// import Qualifiers from "./components/Qualifiers";
//import Results from "./components/Results";

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AllDrivers />} />
        <Route path="/teams" element={<AllTeams />} />
        <Route path="/races" element={<AllRaces />} />

        <Route path="/driverDetails/:id" element={<DriverDetails />} />
        <Route path="/driverRaces/:id" element={<DriverDetails />} />
        <Route path="/teamDetails/:id" element={<TeamDetails />} />
        <Route path="/teamResults/:id" element={<TeamResults />} />
        <Route path="/raceDetails/:id" element={<RaceDetails />} />


      </Routes>
    </BrowserRouter>
  );
}
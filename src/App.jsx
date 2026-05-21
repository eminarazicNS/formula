import { BrowserRouter, Link, Route, Routes } from "react-router";
import AllDrivers from "./components/AllDrivers";
import AllTeams from "./components/AllTeams";
import AllRaces from "./components/AllRaces";
import DriverDetails from "./components/DriverDetails";
import TeamDetails from "./components/TeamDetails";
import RaceDetails from "./components/RaceDetails";
import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [flags, setFlags] = useState([]);

  useEffect(() => { getFlags() }, []);

  const getFlags = async () => {
    const url = "https://raw.githubusercontent.com/Imagin-io/country-nationality-list/refs/heads/master/countries.json";
    const response = await axios.get(url);
    console.log("flags response ", response);
    setFlags(response.data);
  }

  return (
    <BrowserRouter>
      <div className="wrapper">
        <div className="col1">
          <nav>
            <img src="../img/logo.png" alt="Logo" />
            <div className="vNav">
              <ul>
                <li><Link to="/">Drivers</Link></li>
                <li><Link to="/teams">Teams</Link></li>
                <li><Link to="/races">Races</Link></li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="col2">
          <Routes>
            <Route path="/" element={<AllDrivers flags={flags} />} />
            <Route path="/teams" element={<AllTeams flags={flags} />} />
            <Route path="/races" element={<AllRaces flags={flags} />} />
            <Route path="/driverDetails/:id" element={<DriverDetails flags={flags} />} />
            <Route path="/driverRaces/:id" element={<DriverDetails flags={flags} />} />
            <Route path="/teamDetails/:id" element={<TeamDetails flags={flags} />} />
            <Route path="/raceDetails/:id" element={<RaceDetails flags={flags} />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
import { BrowserRouter, Link, Route, Routes } from "react-router";
import AllDrivers from "./components/AllDrivers";
import AllTeams from "./components/AllTeams";
import AllRaces from "./components/AllRaces";
import DriverDetails from "./components/DriverDetails";
import TeamDetails from "./components/TeamDetails";
import RaceDetails from "./components/RaceDetails";
import { useEffect, useState } from "react";
import axios from "axios";
import { TextField, Box, InputLabel, MenuItem, FormControl, Select, colors } from "@mui/material";

export default function App() {
  const [flags, setFlags] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); //defoltna godina

  useEffect(() => {
    getFlags();
    getYears();
  }, []);

  const getFlags = async () => {
    const url = "https://raw.githubusercontent.com/Imagin-io/country-nationality-list/refs/heads/master/countries.json";
    const response = await axios.get(url);
    console.log("flags response ", response);
    setFlags(response.data);
  }

  const getYears = () => {
    //uzima se poslednjih 30 godina
    const years = [];
    let y = new Date().getFullYear();
    for (let i = 0; i < 30; i++) {
      years.push(y);
      y--;
    }
    //console.log("years ",years);
    setYears(years);
  }

  return (
    <BrowserRouter>
      <div className="wrapper">
        <div className="col1">
          <nav>
            <div>
              <img src="../img/logo.png" alt="Logo" />
            </div>

            <div>
              <FormControl sx={{ m: 1, minWidth: 120 }} >
                <InputLabel id="selectLabelId">Season</InputLabel>
                <Select
                  labelId="selectId"
                  value={selectedYear}
                  label="Season"
                  onChange={(e) => setSelectedYear(e.target.value)}
                >

                  {years.map((year) => {
                    return (
                      <MenuItem value={year}>{year}</MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>

            <div className="vNav">
              <ul>
                <Link to="/"><li><div><img src="../img/Kaciga.png" alt="Drivers logo" /></div><div>Drivers</div></li></Link>
                <Link to="/teams"><li><img src="../img/Teams.png" alt="Teams logo" />Teams</li></Link>
                <Link to="/races"><li><img src="../img/Races1.png" alt="Races logo" />Races</li></Link>
              </ul>
            </div>
          </nav>
        </div>
        <div className="col2">
          <Routes>
            <Route path="/" element={<AllDrivers flags={flags} year={selectedYear} />} />
            <Route path="/teams" element={<AllTeams flags={flags} year={selectedYear} />} />
            <Route path="/races" element={<AllRaces flags={flags} year={selectedYear} />} />
            <Route path="/driverDetails/:id" element={<DriverDetails flags={flags} year={selectedYear} />} />
            <Route path="/driverRaces/:id" element={<DriverDetails flags={flags} year={selectedYear} />} />
            <Route path="/teamDetails/:id" element={<TeamDetails flags={flags} year={selectedYear} />} />
            <Route path="/raceDetails/:id" element={<RaceDetails flags={flags} year={selectedYear} />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
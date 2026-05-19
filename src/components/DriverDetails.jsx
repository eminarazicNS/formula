import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Loader from "./Loader";
import axios from "axios";
import { Link } from "react-router";


export default function DriverDetails() {
    const [driverDetails, setDriverDetails] = useState(null);
    const [driverRaces, setDriverRaces] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getDriverDetails();
    }, []);

    const params = useParams();
    console.log("params ", params);

    const getDriverDetails = async () => {

        const driverStandingsUrl = `https://api.jolpi.ca/ergast/f1/2013/drivers/${params.id}/driverStandings.json`;

        const driverRacesUrl = `https://api.jolpi.ca/ergast/f1/2013/drivers/${params.id}/results.json`;

        const driverStandingsResponse = await axios.get(driverStandingsUrl);
        const driverRacesResponse = await axios.get(driverRacesUrl);

        console.log("DriverStandings", driverStandingsResponse.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0]);
        console.log("DriverRaces", driverRacesResponse.data.MRData.RaceTable.Races);

        setDriverDetails(driverStandingsResponse.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0]);
        setDriverRaces(driverRacesResponse.data.MRData.RaceTable.Races);

        setLoading(false);
    }

    if (loading) {
        return <Loader />
    }

    console.log(driverDetails);

    return (
        <div className="wrapper">

            <div className="col1">
                <img src="../img/logo.png" alt="Logo" />
                <div className="vNav">
                    <ul>
                        <li><Link to="/">Drivers</Link></li>
                        <li><Link to="/teams">Teams</Link></li>
                        <li><Link to="/races">Races</Link></li>
                    </ul>
                </div>
            </div>

            <div className="col2">
                <h2>DRIVERS DETAILS</h2>
                <img src="../img/alonso.jpg" alt="Driver picture" />
                <p>Country: {driverDetails.Driver.nationality}</p>
                <p>Team: {driverDetails.Constructors[0].name} </p>
                <p>Birth: {driverDetails.Driver.dateOfBirth}</p>
                <a href={driverDetails.Driver.url} target="blanc">History</a>

                <div>
                    <h2>Formula 1 2013 Results</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Round</th>
                                <th>Grand Prix</th>
                                <th>Team</th>
                                <th>Grid</th>
                                <th>Race</th>
                            </tr>
                        </thead>
                        <tbody>
                            {driverRaces.map((race) => {
                                return (
                                    <tr key={race.round}>
                                        <td>{race.round}</td>
                                        <td>{race.raceName}</td>
                                        <td>{race.Results[0].Constructor.name}</td>
                                        <td>{race.Results[0].grid}</td>
                                        <td>{race.Results[0].position}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>


        </div>
    );
}
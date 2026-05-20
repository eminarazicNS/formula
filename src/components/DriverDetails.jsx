import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Loader from "./Loader";
import axios from "axios";
import { getFlagByNationality } from "../helper/getFlag";
import Flag from "react-flagkit";


export default function DriverDetails(props) {
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

        //console.log("DriverStandings", driverStandingsResponse.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0]);
        //console.log("DriverRaces", driverRacesResponse.data.MRData.RaceTable.Races);

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

            <div className="dd-col2">
                {/* <h2>DRIVERS DETAILS</h2> */}
                <div className="details">
                    <div style={{ display: "flex" }}>
                        <img src={`../public/img/${driverDetails.Driver.familyName}.jpg`}
                            alt={driverDetails.Driver.familyName}
                            style={{ width: 150 }} />
                        <div style={{ padding: "5px", textAlign: "left" }}>
                            <Flag country={getFlagByNationality(props.flags, driverDetails.Driver.nationality)}
                                size={30} />
                            <b> <p>{driverDetails.Driver.givenName}</p>
                                <p>{driverDetails.Driver.familyName}</p>
                            </b>
                        </div>
                    </div>

                    <p>Country: {driverDetails.Driver.nationality}</p>
                    <p>Team: {driverDetails.Constructors[0].name} </p>
                    <p>Birth: {driverDetails.Driver.dateOfBirth}</p>
                    <a href={driverDetails.Driver.url} target="blanc">History</a>
                </div>

                <div className="results">
                    <h2>Formula 1 2013 Results</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Round</th>
                                <th></th>
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
                                        <td><Flag country={getFlagByNationality(props.flags, "",
                                            race.Circuit.Location.country)}
                                            size={30} /></td>
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
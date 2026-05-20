import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import Loader from "./Loader";

export default function RaceDetails() {
    const [qualifying, setQualifying] = useState(null);
    const [races, setRaces] = useState(null);
    const [loading, setLoading] = useState(true);

    

    useEffect(() => {
        getRaceDetails();
    }, []);

    const params = useParams();
    console.log("params", params);

    const getRaceDetails = async () => {
        const qualifyingUrl = `https://api.jolpi.ca/ergast/f1/2013/${params.id}/qualifying.json`;
        const racesUrl = `https://api.jolpi.ca/ergast/f1/2013/${params.id}/results.json`;

        const qualifyingResponse = await axios.get(qualifyingUrl);
        const racesResponse = await axios.get(racesUrl);

        console.log("qualifying Response", qualifyingResponse.data.MRData.RaceTable.Races[0]);
        console.log("races Response", racesResponse.data.MRData.RaceTable.Races[0]);

        setQualifying(qualifyingResponse.data.MRData.RaceTable.Races[0]);
        setRaces(racesResponse.data.MRData.RaceTable.Races[0]);

        setLoading(false);
    }

    const bestTime = (q1, q2, q3) => {
        let min = q1;
        if (q2 < min) {
            min = q2;
        }
        if (q3 < min) {
            min = q3;
        }
        return min;
    };

    // bestTime(430,200,556);

    if (loading) {
        return <Loader />
    }

    return (
        <div className="wrapper">

            <div className="dd-col2">
                {/* <h2>RaceDetails</h2> */}
                <div className="details">
                    <img src="../img/Kaciga.png" alt="Country picture" style={{ width: 200 }} />
                    <p>Country: {qualifying.raceName}</p>
                    <p>Country: {qualifying.Circuit.Location.country} </p>
                    <p>Location: {qualifying.Circuit.Location.country}</p>
                    <p>Date: {qualifying.date}</p>
                    <a href={qualifying.url} target="blanc">Full Report</a>
                </div>

                <div className="results">
                    <h2>Qualifying Results</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Pos</th>
                                <th>Driver</th>
                                <th>Team</th>
                                <th>Best time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {qualifying.QualifyingResults.map((qualifier) => {
                                return (
                                    <tr key={qualifier.position}>
                                        <td>{qualifier.position}</td>
                                        <td>{qualifier.Driver.familyName}</td>
                                        <td>{qualifier.Constructor.name}</td>
                                        <td>{bestTime(qualifier.Q1, qualifier.Q2, qualifier.Q3)}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="results">
                    <h2>Race Results</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Pos</th>
                                <th>Driver</th>
                                <th>Team</th>
                                <th>Result</th>
                                <th>Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {races.Results.map((race) => {
                                return (
                                    <tr key={race.position}>
                                        <td>{race.position}</td>
                                        <td>{race.Driver.familyName}</td>
                                        <td>{race.Constructor.name}</td>
                                        {/* <td>{race.Time.time}</td> */}
                                        <td>{race.points}</td>
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
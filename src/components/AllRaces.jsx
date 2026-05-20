import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import { useNavigate } from "react-router";

export default function AllRaces() {
    const [races, setRaces] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        getRaces();
    }, []);

    const getRaces = async () => {
        const url = "https://api.jolpi.ca/ergast/f1/2013/results/1.json";
        const response = await axios.get(url);
        console.log("response", response.data.MRData.RaceTable.Races);
        setRaces(response.data.MRData.RaceTable.Races);
        setLoading(false);
    }

    const handleClick = (id) => {
        console.log("id", id);
        navigate(`/raceDetails/${id}`);
    }

    if (loading) {
        return <Loader />;

    }
    return (
        // <h2>AllRaces</h2>
        <div className="wrapper">

           
            <div className="col2">
                <h2>RACE CALENDAR</h2>
                <table>
                    <thead>
                        <tr>
                            <td colSpan={3}>Race Calendar - 2013</td>
                        </tr>
                    </thead>
                    <tbody>
                        {races.map((race, index) => {
                            return (
                                <tr key={index}>
                                    <td>{race.round}</td>
                                    <td className="link" onClick={() => handleClick(race.raceName)}>{race.raceName}</td>
                                    <td>{race.Circuit.circuitName}</td>
                                    <td>{race.date}</td>
                                    <td>{race.Results[0].Driver.familyName}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// https://api.jolpi.ca/ergast/f1/2013/results/1.json
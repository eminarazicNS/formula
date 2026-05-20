<<<<<<< HEAD
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import { useNavigate, Link } from "react-router";



export default function AllRaces() {
    const [races, setRaces] = useState({});
=======
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import { useNavigate, Link } from "react-router";

export default function AllRaces() {
    const [races, setRaces] = useState([]);
>>>>>>> 07428c4ccd8767284e12ec3f14870282d604968d
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

<<<<<<< HEAD

=======
>>>>>>> 07428c4ccd8767284e12ec3f14870282d604968d
    useEffect(() => {
        getRaces();
    }, []);

    const getRaces = async () => {
        const url = "https://api.jolpi.ca/ergast/f1/2013/results/1.json";
        const response = await axios.get(url);
        console.log("response", response.data.MRData.RaceTable.Races[0].Results);
        setRaces(response.data.MRData.RaceTable.Races[0].Results)
        setLoading(false);
    };

    const handleClick = (id) => {
        console.log("id", id);
        navigate(`/raceDetails/${id}`);

    }
    if (loading) {
        return <Loader />;
    }
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
                <h2>RACE CALENDAR</h2>
                <table>
                    <thead>
                        <tr>
                            <td colSpan={3}>Drivers Shampionship Standings - 2013</td>
                        </tr>
                    </thead>
                    <tbody>
                        {races.map((race) => {
                            return (
                                <tr key={race.position}>
                                    <td>{race.position}</td>
                                    <td>{race.raceName} </td>
                                    <td>{race.circuitName}</td>
                                    <td>{race.date}</td>
                                    <td>{race.Driver.familyName}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );

}

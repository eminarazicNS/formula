import { useState, useEffect } from "react";
import Loader from "./Loader";
import axios from "axios";
import { useNavigate, Link } from "react-router";

export default function AllTeams() {
    const [teams, setTeams] = useState({});
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        getTeams();
    }, []);

    const getTeams = async () => {
        const url = "https://api.jolpi.ca/ergast/f1/2013/constructorStandings.json";
        const response = await axios.get(url);
        console.log("response", response);
        setTeams(response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
        setLoading(false);
    };


    const handleClick = (id) => {
        console.log("id ", id);
        navigate(`/teamDetails/${id}`);
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
                <h2>CONSTRUCTORS CHAMPIONSHIP</h2>
                <table>
                    <thead>
                        <tr>
                            <td colSpan={4}>Constructors Shampionship Standings - 2013</td>
                        </tr>
                    </thead>
                    <tbody>
                        {teams.map((team) => {
                            return (
                                <tr key={team.position}>
                                    <td>{team.position}</td>
                                    <td>{team.Constructor.constructorId}</td>
                                    <td onClick={() => handleClick(team.Constructor.constructorId)}>Details</td>
                                    <td>{team.points}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// https://api.jolpi.ca/ergast/f1/2013/constructorStandings.json
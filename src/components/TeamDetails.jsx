import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import Loader from "./Loader";
import axios from "axios";


export default function TeamDetails() {
    const [teamDetails, setTeamDetails] = useState({});
    const [driverRaces, setDriverRaces] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("useEffect");
        getResults();
    }, []);

    const params = useParams();
    console.log("team det params ", params);

    const getResults = async () => {
        console.log("getResults");
        const url = `https://api.jolpi.ca/ergast/f1/2013/constructors/${params.id}/constructorStandings.json`;
        let response = await axios.get(url);
        console.log(response.data);
        // console.log(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
        // setTeamDetails(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
        setLoading(false);
    }


    if (loading) {
        return <Loader />
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
                <h2>DRIVERS DETAILS</h2>
            </div>
        </div>
    );
}
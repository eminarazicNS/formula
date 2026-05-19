import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Loader from "./Loader";
import axios from "axios";
import { Link } from "react-router";


export default function DriverDetails() {
    const [driverDetails, setDriverDetails] = useState({});
    const [driverRaces, setDriverRaces] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("useEffect")
        getDriverDetails();
        getDriverRaces();
        setLoading(false);
    }, []);

    const params = useParams();
    console.log("params ", params);

    const getDriverDetails = async () => {
        console.log("getDriverDetails");
        const url = `https://api.jolpi.ca/ergast/f1/2013/drivers/${params.id}/driverStandings.json`;
        const response = await axios.get(url);
        //  console.log(response.data);
        console.log(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
        setDriverDetails(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);

    }

    const getDriverRaces = async () => {
        //  console.log("getDriverRaces");
        // const url = `https://api.jolpi.ca/ergast/f1/2013/drivers/${params.id}/results.json`;
        // const response = await axios.get(url);
        // console.log(response);
        // setDriverRaces(response);
        // setLoading(false);
    }

    if (loading) {
        return <Loader />
    }

    console.log("driverDetails", driverDetails.Driver.nationality);
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
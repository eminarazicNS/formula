import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";

export default function AllDrivers() {
    const [drivers, setDrivers] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getDrivers();
    }, []);

    const getDrivers = async () => {
        const url = "https://api.jolpi.ca/ergast/f1/2013/driverStandings.json";
        const response = await axios.get(url);
        console.log("response", response);
        setDrivers(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
        setLoading(false);
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div>
            <h2>DRIVERS CHAMPIONSHIP</h2>
            <table>
                <thead>
                    <tr>
                        <td>Drivers Shampionship Standings - 2013</td>
                    </tr>
                </thead>
                <tbody>
                    {drivers.map((driver) => {
                        return (
                            <tr key={driver.position}>
                                <td>{driver.givenName} {driver.familyName}</td>
                                <td>{driver.Constructors[0].name}</td>
                                <td>{driver.points}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}
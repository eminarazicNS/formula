import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import { useNavigate } from "react-router";
import { getFlagByNationality } from "../helper/getFlag";
import Flag from "react-flagkit";

export default function AllDrivers(props) {
    const [drivers, setDrivers] = useState({});
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

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

    const handleClick = (id) => {
        console.log("id ", id);
        navigate(`/driverDetails/${id}`)
    }

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="wrapper">

            <div className="col2">
                <h2>DRIVERS CHAMPIONSHIP</h2>
                <table>
                    <thead>
                        <tr>
                            <td colSpan={3}>Drivers Shampionship Standings - 2013</td>
                        </tr>
                    </thead>
                    <tbody>
                        {drivers.map((driver) => {
                            return (
                                <tr key={driver.position}
                                    className="link"
                                    onClick={() => handleClick(driver.Driver.driverId)}
                                >
                                    <td>{driver.position}</td>
                                    <td><Flag country={getFlagByNationality(props.flags, driver.Driver.nationality)}
                                        size={30} />
                                    </td>
                                    <td>{driver.Driver.givenName} {driver.Driver.familyName}</td>
                                    <td>{driver.Constructors[0].name}</td>
                                    <td>{driver.points}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
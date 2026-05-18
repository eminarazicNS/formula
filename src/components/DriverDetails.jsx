import { useState } from "react";
import { useParams } from "react-router";
import Loader from "./Loader";
import axios from "axios";

export default function DriverDetails() {
    const [driverDetails, setDriverDetails] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("useEffect")
        getDriverDetails();
    }, []);

    const params = useParams();

    const getDriverDetails = async () => {
        const url = `https://api.jolpi.ca/ergast/f1/2013/drivers/${params.id}/driverStandings.json`;
        const response = await axios(get.url);
        console.log(response.data);
        setDriverDetails(response);
        setLoading(false);
    }

    if (loading) {
        return <Loader />
    }

    return (
        <h2>DriverDetails</h2>
    );
}
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import { useNavigate } from "react-router";
import { getFlagByNationality } from "../helper/getFlag";
import Flag from "react-flagkit";
import BasicBreadcrumbs from "./BasicBreadcrumbs";

export default function AllRaces(props) {
    const [races, setRaces] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        getRaces();
    }, [props.year]);

    const getRaces = async () => {
        const url = `https://api.jolpi.ca/ergast/f1/${props.year}/results/1.json`;
        const response = await axios.get(url);
        //console.log("races", response.data.MRData.RaceTable.Races);
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

    const crumbs = [
        { label: "Races", path: "/races" }
    ];

    return (
        // <h2>AllRaces</h2>
        <div className="wrapper">


            <div className="col2">
                <BasicBreadcrumbs crumbs={crumbs} />
                <h2>RACE CALENDAR - {props.year}</h2>
                <table>
                    <thead>
                        <tr >
                            <td colSpan={6}>Race Calendar - {props.year}</td>
                        </tr>
                    </thead>
                    <tbody>
                        {races.map((race, index) => {
                            return (
                                <tr key={index}>
                                    <td>{race.round}</td>
                                    <td><Flag country={getFlagByNationality(props.flags, "",
                                        race.Circuit.Location.country)}
                                        size={30} /></td>
                                    <td className="link" onClick={() => handleClick(race.round)}>{race.raceName}</td>
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


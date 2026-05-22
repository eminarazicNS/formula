import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Loader from "./Loader";
import axios from "axios";
import { getFlagByNationality } from "../helper/getFlag";
import Flag from "react-flagkit";
import { getColorByPosition } from "../helper/getColor";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import BasicBreadcrumbs from "./BasicBreadcrumbs";


export default function DriverDetails(props) {
    const [driverDetails, setDriverDetails] = useState(null);
    const [driverRaces, setDriverRaces] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        getDriverDetails();
    }, [props.year]);


    const params = useParams();
    console.log("params ", params);

    const getDriverDetails = async () => {
        setIsError(false);
        try {
            const driverStandingsUrl = `https://api.jolpi.ca/ergast/f1/${props.year}/drivers/${params.id}/driverStandings.json`;

            const driverRacesUrl = `https://api.jolpi.ca/ergast/f1/${props.year}/drivers/${params.id}/results.json`;

            const driverStandingsResponse = await axios.get(driverStandingsUrl);
            const driverRacesResponse = await axios.get(driverRacesUrl);

            //console.log("DriverStandings", driverStandingsResponse.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0]);
            //console.log("DriverRaces", driverRacesResponse.data.MRData.RaceTable.Races);

            setDriverDetails(driverStandingsResponse.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0]);
            setDriverRaces(driverRacesResponse.data.MRData.RaceTable.Races);
        } catch (e) {
            console.error("error ", e);
            setIsError(true);
        } finally {
            setLoading(false);
        }
    }


    if (loading) {
        return <Loader />
    }


    let crumbs = [
        { label: "Drivers", path: "/" },
        { label: `${driverDetails.Driver.givenName} ${driverDetails.Driver.familyName}`, path: "" }
    ];

    if (isError) {
        return (
            <div className="wrapper">
                <div className="dd-col2">
                    <div className="details">
                        <BasicBreadcrumbs crumbs={crumbs} />
                        <div style={{ display: "flex" }}>
                            <img src={`../public/img/${driverDetails.Driver.familyName}.jpg`}
                                onError={(e) => {
                                    if (e.target.src !== `../public/img/${driverDetails.Driver.familyName}.jpg`) {
                                        e.target.src = "../public/img/avatar.png";
                                    }
                                }}
                                alt={driverDetails.Driver.familyName}
                                style={{ width: 150 }} />
                            <div style={{ padding: "5px", textAlign: "left" }}>
                                <Flag country={getFlagByNationality(props.flags, driverDetails.Driver.nationality)}
                                    size={30} />
                                <b> <p>{driverDetails.Driver.givenName}</p>
                                    <p>{driverDetails.Driver.familyName}</p>
                                </b>
                            </div>
                        </div>

                        <p>Country: {driverDetails.Driver.nationality}</p>
                        <p>Team: {driverDetails.Constructors[0].name} </p>
                        <p>Birth: {driverDetails.Driver.dateOfBirth}</p>
                        <p>History: <a href={driverDetails.Driver.url} target="_blank"><OpenInNewIcon /></a></p>
                    </div>

                    <div className="results">
                        <p style={{ textAlign: "center", fontSize: "50px" }}>No data found!</p>
                    </div>


                </div>
            </div >

        );
    }

    return (

        <div className="wrapper">
            <div className="dd-col2">
                <div className="details">
                    <BasicBreadcrumbs crumbs={crumbs} />
                    <div style={{ display: "flex" }}>
                        <img src={`../public/img/${driverDetails.Driver.familyName}.jpg`}
                            onError={(e) => {
                                if (e.target.src !== `../public/img/${driverDetails.Driver.familyName}.jpg`) {
                                    e.target.src = "../public/img/avatar.png";
                                }
                            }}
                            alt={driverDetails.Driver.familyName}
                            style={{ width: 150 }} />
                        <div style={{ padding: "5px", textAlign: "left" }}>
                            <Flag country={getFlagByNationality(props.flags, driverDetails.Driver.nationality)}
                                size={30} />
                            <b> <p>{driverDetails.Driver.givenName}</p>
                                <p>{driverDetails.Driver.familyName}</p>
                            </b>
                        </div>
                    </div>

                    <p>Country: {driverDetails.Driver.nationality}</p>
                    <p>Team: {driverDetails.Constructors[0].name} </p>
                    <p>Birth: {driverDetails.Driver.dateOfBirth}</p>
                    <p>History: <a href={driverDetails.Driver.url} target="_blank"><OpenInNewIcon /></a></p>
                </div>

                <div className="results">
                    <h2>Formula 1 - {props.year} Results</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Round</th>
                                <th></th>
                                <th>Grand Prix</th>
                                <th>Team</th>
                                <th>Grid</th>
                                <th>Race</th>
                            </tr>
                        </thead>
                        <tbody>
                            {driverRaces.map((race) => {
                                return (
                                    <tr key={race.round}>
                                        <td>{race.round}</td>
                                        <td><Flag country={getFlagByNationality(props.flags, "",
                                            race.Circuit.Location.country)}
                                            size={30} /></td>
                                        <td>{race.raceName}</td>
                                        <td>{race.Results[0].Constructor.name}</td>
                                        <td>{race.Results[0].grid}</td>
                                        <td
                                            style={{ backgroundColor: getColorByPosition(race.Results[0].position) }}
                                        >{race.Results[0].position}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>


            </div>
        </div >

    );
}
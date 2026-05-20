import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import Loader from "./Loader";
import axios from "axios";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';


export default function TeamDetails() {
    const [teamDetails, setTeamDetails] = useState({});
    const [teamRaces, setTeamRaces] = useState({});
    const [loading, setLoading] = useState(true);
    const [firstDriver, setFirstDriver] = useState("");
    const [secondDriver, setSecondDriver] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        console.log("useEffect");
        getTeams();
    }, []);

    const params = useParams();
    console.log("team det params ", params);


    const getTeams = async () => {
        console.log("getTeams");
        const teamStandingUrl = `https://api.jolpi.ca/ergast/f1/2013/constructors/${params.id}/constructorStandings.json`;

        const teamRacesUrl = `https://api.jolpi.ca/ergast/f1/2013/constructors/${params.id}/results.json`;

        const teamStandingResponse = await axios.get(teamStandingUrl);

        const teamRacesResponse = await axios.get(teamRacesUrl);

        //console.log("teamStandingResponse ", teamStandingResponse);

        console.log("teamDetails ", teamStandingResponse.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0]);
        setTeamDetails(teamStandingResponse.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0]);


        //console.log("teamRacesResponse ", teamRacesResponse);

        //console.log(teamRacesResponse.data.MRData.RaceTable.Races);


        setTeamRaces(teamRacesResponse.data.MRData.RaceTable.Races);

        //table races header
        setFirstDriver(teamRacesResponse.data.MRData.RaceTable.Races[0].Results[0].Driver.familyName);
        setSecondDriver(teamRacesResponse.data.MRData.RaceTable.Races[0].Results[1].Driver.familyName);
        //console.log("firstDriver ",firstDriver, " secondDriver ",secondDriver);

        setLoading(false);
    }


    if (loading) {
        return <Loader />
    }

    return (
        <div className="wrapper">

            <div className="td-col2">
                <div className="vNav">
                    <h2>TEAM DETAILS - vertikalna navigacija</h2>
                </div>
                <div className="container-details">
                    <div className="about">
                        <div className="about-up">
                            <p>Team: {teamDetails.Constructor.name}</p>
                            <p>Country: {teamDetails.Constructor.nationality}</p>
                            <p>Points: {teamDetails.points}</p>
                            <p>History: <a href={teamDetails.Constructor.url} target="_blank"><OpenInNewIcon />
                            </a></p>
                        </div>
                        <div className="about-down">
                            about-down
                        </div>
                    </div>
                    <div className="table-details">
                        <div>
                            <h2>Formula 1 2013 Results</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Round</th>
                                        <th>Grand Prix</th>
                                        <th>{firstDriver}</th>
                                        <th>{secondDriver}</th>
                                        <th>Points</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {teamRaces.map((race) => {
                                        return (
                                            <tr key={race.round}>
                                                <td>{race.round}</td>
                                                <td>{race.raceName}</td>
                                                <td>{race.Results[0].position}</td>
                                                <td>{race.Results[1].position}</td>
                                                <td>{Number(race.Results[0].points) + Number(race.Results[1].points)}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
//Ne radi pretraga po Search polju, pa je taj deo zakomentarisan.
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import Loader from "./Loader";
import { getFlagByNationality } from "../helper/getFlag";
import Flag from "react-flagkit";
import { getColorByPosition } from "../helper/getColor";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import BasicBreadcrumbs from "./BasicBreadcrumbs";
import { DashboardRounded } from "@mui/icons-material";

export default function RaceDetails(props) {
    const [qualifying, setQualifying] = useState(null);
    const [races, setRaces] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
/*    const [filteredQualifying, setFilteredQualifying] = useState([]);
    const [filteredRaces, setFilteredRaces] = useState([]);
*/    

   useEffect(() => {
        props.setSearch("");
        props.setSearchIsVisible(false);
    }, []);   

    useEffect(() => {
        getRaceDetails();
    }, [props.year]);
/*
    useEffect(() => {        
        getFilteredData();            
    }, [props.search]);
*/    

    const params = useParams();
    console.log("params", params);

    const getRaceDetails = async () => {
        setIsError(false);
        try {
            const qualifyingUrl = `https://api.jolpi.ca/ergast/f1/${props.year}/${params.id}/qualifying.json`;
            const racesUrl = `https://api.jolpi.ca/ergast/f1/${props.year}/${params.id}/results.json`;

            const qualifyingResponse = await axios.get(qualifyingUrl);
            const racesResponse = await axios.get(racesUrl);

            console.log("qualifying Response", qualifyingResponse.data.MRData.RaceTable.Races[0]);
            console.log("races Response", racesResponse.data.MRData.RaceTable.Races[0]);

            setQualifying(qualifyingResponse.data.MRData.RaceTable.Races[0]);
            setRaces(racesResponse.data.MRData.RaceTable.Races[0]);

            setLoading(false);
        } catch (e) {
            console.error("error ", e);
            setIsError(true);
        } finally {
            setLoading(false);
        }

    }

    const bestTime = (q1, q2, q3) => {
        let min = q1;
        if (q2 < min) {
            min = q2;
        }
        if (q3 < min) {
            min = q3;
        }
        return min;
    };

    // bestTime(430,200,556);
/*
    const getFilteredData = () => {  

        setFilteredQualifying(qualifying);
        setFilteredRaces(races);

        console.log("getFilteredData qualifying ",qualifying);

        if(props.search===""){
            return;
        }

        if(qualifying!=null){
            const resultQ = resultQ.filter((item) =>  
                  item.Driver.familyName.toLowerCase().includes( props.search.toLowerCase() ) ||
                  item.Constructor.name.toLowerCase().includes( props.search.toLowerCase() ) 
             );   
           setFilteredQualifying(resultQ);
        }    
        
        console.log("getFilteredData races ",races);

        if(races!=null){
            const resultR = resultR.filter((item) =>  
                  item.Driver.familyName.toLowerCase().includes( props.search.toLowerCase() ) ||
                  item.Constructor.name.toLowerCase().includes( props.search.toLowerCase() ) 
             );               
            setFilteredRaces(resultR);
        }           
    }
*/

    if (loading) {
        return <Loader />
    }

    let crumbs = [];
    try {
        crumbs = [
            { label: "Races", path: "/races" },
            { label: `${qualifying.raceName}`, path: "" }
        ];
    } catch (e) {
        console.error("error ", e);
        crumbs = [
            { label: "Races", path: "/races" }
        ];
    }


//    if (isError || (filteredQualifying.QualifyingResults===null) || (filteredRaces.Results===null)) {  
    if (isError) {  
        return (
            <div className="wrapper">

                <div className="dd-col2">
                    <div className="details">
                        <BasicBreadcrumbs crumbs={crumbs} />
                       
                        {/* <Flag 
                        country={getFlagByNationality(props.flags, "", qualifying.Circuit.Location.country)}
                        size={200} /> */}
                        <p><b>Race round: <span className="race-round">{params.id}</span></b></p>
                        {/* <p><b>{qualifying.raceName}</b></p>
                        <p>Location: {qualifying.Circuit.Location.locality} </p>
                        <p>Date: {qualifying.date}</p>
                        <p>Full Report <a href={qualifying?.url} target="_blank"><OpenInNewIcon /></a></p> */}
                       
                    </div>

                    <div className="results">                       
                        <div className="no-data-div">
                            <img src="../img/emoji-faces-sad-emoji.png" alt="sad-emoji" />
                       </div>                        
                    </div>

                </div>
            </div >

        );
    }

    return (
        <div className="wrapper">

            <div className="dd-col2">
                {/* <h2>RaceDetails</h2> */}
                <div className="details rd-details">
                    <BasicBreadcrumbs crumbs={crumbs} />
                    {/* <img src="../img/Kaciga.png" alt="Country picture" style={{ width: 200 }} /> */}
                    <Flag country={getFlagByNationality(props.flags, "", qualifying.Circuit.Location.country)}
                        size={200} />
                    {/* <p><b>Race round: {params.id}</b></p> */}
                    <p><b>Race round: <span className="race-round">{params.id}</span></b></p>
                    <p><b>{qualifying.raceName}</b></p>
                    <p>Location: {qualifying.Circuit.Location.locality} </p>
                    <p>Date: {qualifying.date}</p>
                    <p>Full Report <a href={qualifying.url} target="_blank"><OpenInNewIcon /></a></p>
                </div>

                <div className="results rd-results">
                    <h2 style={{textWrap:"nowrap"}}>Qualifying Results - {props.year}</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Pos</th>
                                <th></th>
                                <th>Driver</th>
                                <th>Team</th>
                                <th>Best time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {filteredQualifying.QualifyingResults.map((qualifier) => { */}
                             {qualifying.QualifyingResults.map((qualifier) => {
                                return (
                                    <tr key={qualifier.position}>
                                        <td>{qualifier.position}</td>
                                        <td><Flag country={getFlagByNationality(props.flags,
                                            qualifier.Driver.nationality)}
                                            size={30} /></td>
                                        <td>{qualifier.Driver.familyName}</td>
                                        <td>{qualifier.Constructor.name}</td>
                                        <td>{bestTime(qualifier.Q1, qualifier.Q2, qualifier.Q3)}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="results rd-results">
                    <h2>Race Results - {props.year}</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Pos</th>
                                <th></th>
                                <th>Driver</th>
                                <th>Team</th>
                                <th>Result</th>
                                <th>Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {filteredRaces.Results.map((race) => { */}
                              {races.Results.map((race) => {    
                                return (
                                    <tr key={race.position}>
                                        <td>{race.position}</td>
                                        <td><Flag country={getFlagByNationality(props.flags,
                                            race.Driver.nationality)}
                                            size={30} /></td>
                                        <td>{race.Driver.familyName}</td>
                                        <td>{race.Constructor.name}</td>
                                        <td>{race?.Time?.time || "DNQ"}</td>
                                        <td style={{ backgroundColor: getColorByPosition(race.position) }}>{race.points}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>


    );
}
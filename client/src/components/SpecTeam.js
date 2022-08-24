import { useEffect } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { addFootballTeams } from "../redux/Football/slice";

export default function SpecTeam() {
    const dispatch = useDispatch();
    const { teamId } = useParams();
    const teams = useSelector(
        (state) =>
            state.footballList.teamsData && state.footballList.teamsData.teams
    );

    console.log("teams: ", teams);

    console.log("teamId: ", teamId);

    let teamData = {};
    teams.map((team) => {
        if (team.id == teamId) {
            teamData = team;
        }
    });
    // const teamData = [...teamDataArr];
    console.log("teamData: ", teamData);

    // ------in case of more requests per minute implement Code below ------
    // let leagues = useSelector((store) => store.leaguesData);
    function fetchTeams() {
        fetch(`/api/getSpecTeamData/${teamId}`)
            .then((res) =>
                // console.log("res: ", res);
                // console.log("request successful");
                res.json()
            )
            .then((data) => {
                console.log("data in getSpecLeagueData: ", data);
                // newData =
                dispatch(addFootballTeams(data));
                // newData = data;
            })
            .catch(() => console.log("request failed"));
    }
    // ------in case of more requests per minute implement Code above ------

    function fetchWeather(address) {
        const addressObj = { address: address };
        fetch("/api/getAdressWeatherData/", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(addressObj),
        })
            .then((resp) => resp.json())
            .then((weatherData) => console.log("weatherData: ", weatherData));
    }

    useEffect(() => {
        // fetchTeams();
        fetchWeather(teamData.address);
    }, []);

    return (
        <>
            <div className="specTeamsBody">
                <img className="TeamPic" src={teamData.crest}></img>
                <h1>{teamData.name}</h1>
            </div>
        </>
    );
}

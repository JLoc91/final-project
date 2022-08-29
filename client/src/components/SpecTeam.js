import { useEffect } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { addFootballTeams } from "../redux/Football/slice";
import { Link } from "react-router-dom";

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

    useEffect(() => {
        // fetchTeams();
    }, []);

    return (
        <>
            <div className="specTeamsContainer">
                <div className="specTeamsHeader">
                    <img className="teamPicHeader" src={teamData.crest}></img>
                    <img
                        className="competitionPicHeader"
                        src={teamData.runningCompetitions[0].emblem}
                    ></img>
                </div>
                <div className="specTeamsBody">
                    <div className="specTeamData">
                        {/* <img className="teamPicBody" src={teamData.crest}></img> */}
                        <h1>{teamData.name}</h1>
                        <h2>{teamData.venue}</h2>
                        <img
                            className="teamFlagBody"
                            src={teamData.area.flag}
                        ></img>
                        <Link to={`/team/upcoming-matches/${teamId}`}>
                            <button className="upcButton">
                                Upcoming Matches of {teamData.name}
                            </button>
                        </Link>
                    </div>
                    <table className="grey">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Date of Birth</th>
                                <th>Nationality</th>
                                <th>Position</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="coach">{teamData.coach.name}</td>
                                <td>{teamData.coach.dateOfBirth}</td>
                                <td>{teamData.coach.nationality}</td>
                                <td>Coach</td>
                            </tr>
                            {teamData &&
                                teamData.squad.map((row) => {
                                    return (
                                        <tr key={row.id} className="player">
                                            <td>{row.name}</td>
                                            <td>{row.dateOfBirth}</td>
                                            <td>{row.nationality}</td>
                                            <td>{row.position}</td>
                                        </tr>
                                    );
                                })}
                            <tr></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

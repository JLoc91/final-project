import { useEffect } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { addUpcomingMatches } from "../redux/Football/slice";
import { Link } from "react-router-dom";

export default function UpcomingMatchesTeam() {
    console.log("We made it here!!!");
    const dispatch = useDispatch();
    const { teamId } = useParams();
    console.log("teamId in Upc: ", teamId);
    const teamData = useSelector(
        (state) => state.footballList && state.footballList.teamsData
    );

    let teamLogo =
        teamData && teamData.teams.filter((team) => team.id == teamId);
    teamLogo = teamLogo[0].crest;
    const upcomingMatchesData = useSelector(
        (state) => state.footballList && state.footballList.upcomingMatchesData
    );
    console.log("teamData in Upc: ", teamData);

    function fetchUpcomingMatchesSpecTeam(teamId) {
        fetch(`/api/getUpcomingMatchesSpecTeam/${teamId}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("data in Upcoming matches: ", data);
                dispatch(addUpcomingMatches(data));
            })
            .catch(() => console.log("request failed"));
    }

    useEffect(() => {
        fetchUpcomingMatchesSpecTeam(teamId);
        // fetchWeather(teamData.address);
    }, []);

    return (
        <>
            <div className="specTeamsHeader">
                <img className="teamPicHeader" src={teamLogo}></img>
                <img
                    className="competitionPicHeader"
                    src={teamData.competition.emblem}
                ></img>
                <h1>Upcoming Matches</h1>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Competition</th>
                        <th>Matchday</th>
                        <th>Home Team</th>
                        <th>Away Team</th>
                        <th>Stadium</th>
                        <th>Kickoff Time</th>
                    </tr>
                </thead>
                <tbody>
                    {upcomingMatchesData &&
                        upcomingMatchesData.matches.map((row) => {
                            return (
                                <tr key={row.id} className="match">
                                    <td>{row.competition.name}</td>
                                    <td>{row.matchday}</td>
                                    <td>
                                        <div className="teamAndPic right">
                                            <p>{row.homeTeam.shortName}</p>
                                            <img
                                                className="tableTeamPic"
                                                src={row.homeTeam.crest}
                                            ></img>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="teamAndPic">
                                            <p>{row.awayTeam.shortName}</p>
                                            <img
                                                className="tableTeamPic"
                                                src={row.awayTeam.crest}
                                            ></img>{" "}
                                        </div>
                                    </td>
                                    <td>
                                        {teamData.teams.map((team) => {
                                            if (team.id == row.homeTeam.id) {
                                                return team.venue;
                                            }
                                        })}
                                    </td>
                                    <td>
                                        <Link
                                            to={`/team/upcoming-matches/${teamId}/match/${row.id}`}
                                        >
                                            {row.utcDate.slice(0, 10)}{" "}
                                            {row.utcDate.slice(11, 16)}
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </>
    );
}

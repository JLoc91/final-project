import { useEffect } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
    addFootballTeams,
    addFootballLeagueStandings,
} from "../redux/Football/slice";
import { Link } from "react-router-dom";

let leaguesJSON = require("../../../server/uploads/leagues.json");

console.log("leaguesJSON in specLeague: ", leaguesJSON);

let leagues = leaguesJSON.competitions;

export default function SpecLeague() {
    const dispatch = useDispatch();
    const { leagueCode } = useParams();
    const standingsData = useSelector(
        (state) =>
            state.footballList.standingsData && state.footballList.standingsData
    );

    let teamsJSON = require(`../../../server/uploads/teams${leagueCode}.json`);
    dispatch(addFootballTeams(teamsJSON));
    console.log("leagues in SpecLeagues: ", leagues);
    console.log("leagueCode: ", leagueCode);
    const league = leagues.filter((league) => league.code == leagueCode);
    console.log("league in SpecLeague: ", league);
    console.log("standingsData: ", standingsData);
    function fetchTeams() {
        fetch(`/api/getSpecLeagueData/${leagueCode}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("data in getSpecLeagueData: ", data);
                dispatch(addFootballLeagueStandings(data));
            })
            .catch(() => console.log("request failed"));
    }

    useEffect(() => {
        fetchTeams();
    }, []);

    return (
        <>
            <div
                id={standingsData && standingsData.competition.code}
                className="leagueTeamsHeader"
            >
                <img
                    className="welcomePic"
                    src={standingsData && standingsData.competition.emblem}
                ></img>
                <h1>{standingsData && standingsData.competition.name}</h1>
            </div>
            <div className="leagueTeamsBody">
                <table>
                    <thead>
                        <tr>
                            <th>Position</th>
                            <th>Club</th>
                            <th>Games Played</th>
                            <th>Won</th>
                            <th>Draw</th>
                            <th>Lost</th>
                            <th>Goals</th>
                            <th>+/-</th>
                            <th>Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {standingsData &&
                            standingsData.standings[0].table.map((row) => {
                                return (
                                    <tr
                                        key={row.team.id}
                                        id={row.team.tla}
                                        className="team"
                                    >
                                        <td className="position">
                                            {row.position}
                                        </td>
                                        <td>
                                            <Link
                                                to={`/team/${row.team.id}`}
                                                className="teamAndPic"
                                            >
                                                <img
                                                    className="tableTeamPic"
                                                    src={row.team.crest}
                                                ></img>
                                                <p>{row.team.name}</p>
                                            </Link>
                                        </td>
                                        <td className="playedGames">
                                            {row.playedGames}
                                        </td>
                                        <td className="won">{row.won}</td>
                                        <td className="draw">{row.draw}</td>
                                        <td className="lost">{row.lost}</td>
                                        <td className="goals">
                                            {row.goalsFor} : {row.goalsAgainst}
                                        </td>

                                        <td className="goalDifference">
                                            {row.goalDifference}
                                        </td>
                                        <td className="points">{row.points}</td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </>
    );
}

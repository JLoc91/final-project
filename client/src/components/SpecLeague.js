import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
    addFootballTeams,
    addFootballLeagueStandings,
    addSpecLeagueMatches30Days,
} from "../redux/Football/slice";
import { Link } from "react-router-dom";

let leaguesJSON = require("../../../server/uploads/leagues.json");

console.log("leaguesJSON in specLeague: ", leaguesJSON);

let leagues = leaguesJSON.competitions;

export default function SpecLeague() {
    const dispatch = useDispatch();
    const [standingTable, setStandingTable] = useState({});

    const { leagueCode } = useParams();
    const standingsData = useSelector(
        (state) =>
            state.footballList.standingsData && state.footballList.standingsData
    );

    const specLeagueMatches30DaysData = useSelector(
        (state) =>
            state.footballList.specLeagueMatches30DaysData &&
            state.footballList.specLeagueMatches30DaysData
    );

    const teamsData = useSelector(
        (state) => state.footballList.teamsData && state.footballList.teamsData
    );

    let teamsJSON = require(`../../../server/uploads/teams${leagueCode}.json`);
    dispatch(addFootballTeams(teamsJSON));
    console.log("leagues in SpecLeagues: ", leagues);
    console.log("leagueCode: ", leagueCode);
    const league = leagues.filter((league) => league.code == leagueCode);
    console.log("league in SpecLeague: ", league);
    console.log("standingsData: ", standingsData);

    const leagueId = league && league[0].id;

    function fetchTeams() {
        fetch(`/api/getSpecLeagueData/${leagueCode}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("data in getSpecLeagueData: ", data);
                dispatch(addFootballLeagueStandings(data));
            })
            .catch(() => console.log("request failed"));
    }

    function fetchSpecLeagueMatches30Days(leagueId) {
        fetch(`/api/getSpecLeagueMatches30Days/${leagueId}`)
            .then((res) => res.json())
            .then((specLeagueMatches30DaysData) => {
                console.log(
                    "specLeagueMatches30DaysData: ",
                    specLeagueMatches30DaysData
                );
                dispatch(
                    addSpecLeagueMatches30Days(specLeagueMatches30DaysData)
                );
            })
            .catch((err) =>
                console.log(
                    "request failed at fetchSpecLeagueMatches30Days: ",
                    err
                )
            );
    }

    useEffect(() => {
        fetchTeams();
        fetchSpecLeagueMatches30Days(leagueId);
        setStandingTable(true);
    }, []);

    return (
        <>
            <div
                id={standingsData && standingsData.competition.code}
                className="leagueTeamsHeader"
            >
                <img
                    className="competitionPicHeader"
                    src={standingsData && standingsData.competition.emblem}
                ></img>
                <img
                    className="competitionPicHeader"
                    src={standingsData && standingsData.area.flag}
                ></img>
                <h1>{standingsData && standingsData.competition.name}</h1>
                <h1>
                    {standingsData &&
                        standingsData.season.startDate.slice(0, 4)}
                    /{standingsData && standingsData.season.endDate.slice(0, 4)}
                </h1>
                <h1>
                    Standings Matchday{" "}
                    {standingsData && standingsData.season.currentMatchday}
                </h1>
            </div>
            <div className="leagueTeamsBody">
                <button
                    className="change"
                    onClick={() => setStandingTable(!standingTable)}
                ></button>
                {standingTable ? (
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
                                                {row.goalsFor} :{" "}
                                                {row.goalsAgainst}
                                            </td>

                                            <td className="goalDifference">
                                                {row.goalDifference}
                                            </td>
                                            <td className="points">
                                                {row.points}
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Matchday</th>
                                <th>Home Team</th>
                                <th>Away Team</th>
                                <th>Stadium</th>
                                <th>Kickoff Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {specLeagueMatches30DaysData &&
                                specLeagueMatches30DaysData.matches.map(
                                    (match) => {
                                        return (
                                            <tr
                                                key={match.id}
                                                className="match"
                                            >
                                                <td>{match.matchday}</td>
                                                <td>
                                                    <img
                                                        className="specMatchLogo"
                                                        src={
                                                            match.homeTeam.crest
                                                        }
                                                    ></img>{" "}
                                                    <p>
                                                        {
                                                            match.homeTeam
                                                                .shortName
                                                        }
                                                    </p>
                                                </td>
                                                <td>
                                                    <img
                                                        className="specMatchLogo"
                                                        src={
                                                            match.awayTeam.crest
                                                        }
                                                    ></img>{" "}
                                                    <p>
                                                        {
                                                            match.awayTeam
                                                                .shortName
                                                        }
                                                    </p>
                                                </td>
                                                <td>
                                                    {teamsData &&
                                                        teamsData.teams.map(
                                                            (team) => {
                                                                if (
                                                                    team.id ==
                                                                    match
                                                                        .homeTeam
                                                                        .id
                                                                ) {
                                                                    return team.venue;
                                                                }
                                                            }
                                                        )}
                                                </td>

                                                <td>
                                                    {match.utcDate.slice(0, 10)}{" "}
                                                    {match.utcDate.slice(
                                                        11,
                                                        16
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    }
                                )}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
}

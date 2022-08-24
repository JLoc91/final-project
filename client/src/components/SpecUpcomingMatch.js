import { useEffect } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";

export default function SpecUpcomingMatch() {
    const dispatch = useDispatch();
    const { teamId, matchId } = useParams();
    console.log("teamId in specUpcMatch: ", teamId);
    console.log("matchId specUpcMatch: ", matchId);
    const upcomingMatch = useSelector(
        (state) =>
            state.footballList.upcomingMatchesData &&
            state.footballList.upcomingMatchesData.matches.filter(
                (match) => match.id == matchId
            )
    );
    // const upcomingMatch = upcomingMatchArr[0];
    // const upcomingMatches = useSelector(
    //     (state) =>
    //         state.upcomingMatchesData &&
    //         state.upcomingMatchesData.matches.filter(
    //             (match) => match.id == matchId
    //         )
    // );

    // const upcomingMatch = upcomingMatches.filter(
    //     (match) => match.id == matchId
    // );

    console.log("upcomingMatch: ", upcomingMatch);

    const teamData = useSelector(
        (state) => state.footballList && state.footballList.teamsData
    );

    console.log("teamData in specupcmat: ", teamData);
    return (
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
                {upcomingMatch && (
                    <tr key={matchId} className="match">
                        <td>{upcomingMatch[0].competition.name}</td>
                        <td>{upcomingMatch[0].matchday}</td>
                        <td>
                            <img src={upcomingMatch[0].homeTeam.crest}></img>{" "}
                            <p>{upcomingMatch[0].homeTeam.shortName}</p>
                        </td>
                        <td>
                            <img src={upcomingMatch[0].awayTeam.crest}></img>{" "}
                            <p>{upcomingMatch[0].awayTeam.shortName}</p>
                        </td>
                        <td>
                            {teamData.teams.map((team) => {
                                if (team.id == upcomingMatch[0].homeTeam.id) {
                                    return team.venue;
                                }
                            })}
                        </td>

                        <td>{upcomingMatch[0].utcDate}</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

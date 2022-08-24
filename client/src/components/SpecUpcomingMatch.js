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
            state.upcomingMatchesData &&
            state.upcomingMatchesData.matches.filter(
                (match) => match.id === matchId
            )
    );
    const teamData = useSelector(
        (state) => state.footballList && state.footballList.teamsData
    );

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
                <tr key={matchId} className="match">
                    <td>{upcomingMatch.competition.name}</td>
                    <td>{upcomingMatch.matchday}</td>
                    <td>
                        <img src={upcomingMatch.homeTeam.crest}></img>{" "}
                        <p>{upcomingMatch.homeTeam.shortName}</p>
                    </td>
                    <td>
                        <img src={upcomingMatch.awayTeam.crest}></img>{" "}
                        <p>{upcomingMatch.awayTeam.shortName}</p>
                    </td>
                    <td>
                        {teamData.teams.map((team) => {
                            if (team.id == upcomingMatch.homeTeam.id) {
                                return team.venue;
                            }
                        })}
                    </td>

                    <td>{upcomingMatch.utcDate}</td>
                </tr>
            </tbody>
        </table>
    );
}

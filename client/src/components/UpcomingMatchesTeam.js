import { useEffect } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { addUpcomingMatches } from "../redux/Football/slice";
import { addWeather } from "../redux/Weather/slice";
import { Link } from "react-router-dom";

export default function UpcomingMatchesTeam() {
    console.log("We made it here!!!");
    const dispatch = useDispatch();
    const { teamId } = useParams();
    console.log("teamId in Upc: ", teamId);
    const teamData = useSelector(
        (state) => state.footballList && state.footballList.teamsData
    );
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
        fetchUpcomingMatchesSpecTeam(teamId);
        // fetchWeather(teamData.address);
    }, []);

    return (
        <>
            <h1>Upcoming Matches</h1>
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
                                    <td>
                                        {/* ({row.competition.name}| Wettbewerb)  */}
                                        {row.name}
                                    </td>
                                    <td>{row.matchday}</td>
                                    <td>
                                        <img src={row.homeTeam.crest}></img>{" "}
                                        <p>{row.homeTeam.shortName}</p>
                                    </td>
                                    <td>
                                        <img src={row.awayTeam.crest}></img>{" "}
                                        <p>{row.awayTeam.shortName}</p>
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
                                            {row.utcDate}
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

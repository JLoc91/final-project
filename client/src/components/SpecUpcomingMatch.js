import { useEffect } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { addWeather } from "../redux/Weather/slice";
import { addTravelData } from "../redux/Travel/slice";

export default function SpecUpcomingMatch() {
    const dispatch = useDispatch();
    const { teamId, matchId } = useParams();
    console.log("teamId in specUpcMatch: ", teamId);
    console.log("matchId specUpcMatch: ", matchId);
    // const weatherData = useSelector(
    //     (state) => state.weatherList && state.weatherList.weatherData
    // );
    const upcomingMatch = useSelector(
        (state) =>
            state.footballList.upcomingMatchesData &&
            state.footballList.upcomingMatchesData.matches.filter(
                (match) => match.id == matchId
            )
    );

    const matchDate = upcomingMatch[0].utcDate.slice(0, 10);

    const teamsData = useSelector(
        (state) => state.footballList && state.footballList.teamsData
    );

    const teamDataArr = teamsData.teams.filter((team) => team.id == teamId);
    const teamData = teamDataArr[0];
    console.log("teamData in specupcmat: ", teamData);

    const homeTeamArr =
        teamsData &&
        teamsData.teams.filter(
            (team) => team.id == upcomingMatch[0].homeTeam.id
        );

    const homeTeam = homeTeamArr[0];

    console.log("homeTeam: ", homeTeam);

    const weatherData = useSelector(
        (state) => state.weatherList && state.weatherList.weatherData
    );

    function fetchWeather(teamData, matchDate) {
        // const addressObj = { address: address };
        fetch("/api/getAddressWeatherData/", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify([teamData, matchDate]),
            // body: JSON.stringify(addressObj),
        })
            .then((resp) => resp.json())
            .then((specWeatherHotelData) => {
                console.log(
                    "specWeatherHotelData.weatherData: ",
                    specWeatherHotelData.weatherData
                );
                console.log(
                    "specWeatherHotelData.hotelData: ",
                    specWeatherHotelData.hotelData
                );
                dispatch(addWeather(specWeatherHotelData.weatherData));
                dispatch(addTravelData(specWeatherHotelData.hotelData));
            })
            .catch((err) => console.log("err in fetchweather:", err));
    }

    useEffect(() => {
        fetchWeather(homeTeam, matchDate);
    }, []);

    return (
        <>
            <div className="specUpcMatchHeader">
                <img
                    className="teamPicHeader"
                    src={upcomingMatch[0].homeTeam.crest}
                ></img>
                <p>{upcomingMatch[0].homeTeam.name}</p>
                <p>{upcomingMatch[0].awayTeam.name}</p>
                <img
                    className="teamPicHeader"
                    src={upcomingMatch[0].awayTeam.crest}
                ></img>
                <h1>Upcoming Matches</h1>
            </div>
            <div className="specUpcMatchBody">
                <table>
                    <thead>
                        <tr>
                            <th>Competition</th>
                            <th>Matchday</th>
                            <th>Home Team</th>
                            <th>Away Team</th>
                            <th>Stadium</th>
                            <th>Kickoff Time</th>
                            <th>Weather Forecast</th>
                        </tr>
                    </thead>
                    <tbody>
                        {upcomingMatch && (
                            <tr key={matchId} className="match">
                                <td>{upcomingMatch[0].competition.name}</td>
                                <td>{upcomingMatch[0].matchday}</td>
                                <td>
                                    <img
                                        className="specMatchLogo"
                                        src={upcomingMatch[0].homeTeam.crest}
                                    ></img>{" "}
                                    <p>{upcomingMatch[0].homeTeam.shortName}</p>
                                </td>
                                <td>
                                    <img
                                        className="specMatchLogo"
                                        src={upcomingMatch[0].awayTeam.crest}
                                    ></img>{" "}
                                    <p>{upcomingMatch[0].awayTeam.shortName}</p>
                                </td>
                                <td>
                                    {teamsData &&
                                        teamsData.teams.map((team) => {
                                            if (
                                                team.id ==
                                                upcomingMatch[0].homeTeam.id
                                            ) {
                                                return team.venue;
                                            }
                                        })}
                                </td>

                                <td>
                                    {upcomingMatch[0].utcDate.slice(0, 10)}{" "}
                                    {upcomingMatch[0].utcDate.slice(11, 16)}
                                </td>
                                <td>
                                    {weatherData &&
                                        weatherData.days.map((day) => {
                                            if (
                                                day.datetime ==
                                                upcomingMatch[0].utcDate.slice(
                                                    0,
                                                    10
                                                )
                                            ) {
                                                return (
                                                    <>
                                                        <div key={day.datetime}>
                                                            <p>{day.temp}°C</p>
                                                            <p>
                                                                max{" "}
                                                                {day.tempmax}°C
                                                            </p>
                                                            <p>
                                                                min{" "}
                                                                {day.tempmin}°C
                                                            </p>
                                                        </div>
                                                    </>
                                                );
                                            }
                                        })}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className="defaultTravelInfo"></div>
            </div>
        </>
    );
}

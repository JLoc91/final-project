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

    const matchDate = upcomingMatch && upcomingMatch[0].utcDate.slice(0, 10);

    const teamsData = useSelector(
        (state) => state.footballList && state.footballList.teamsData
    );

    const teamDataArr =
        teamsData && teamsData.teams.filter((team) => team.id == teamId);
    const teamData = teamDataArr && teamDataArr[0];
    console.log("teamData in specupcmat: ", teamData);

    const homeTeamArr =
        teamsData &&
        teamsData.teams.filter(
            (team) => team.id == upcomingMatch[0].homeTeam.id
        );

    const homeTeam = homeTeamArr && homeTeamArr[0];

    console.log("homeTeam: ", homeTeam);

    const weatherData = useSelector(
        (state) => state.weatherList && state.weatherList.weatherData
    );

    const hotelData = useSelector(
        (state) => state.travelList && state.travelList.travelData
    );

    let i = 0;
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
            <div className="specUpcMatchContainer">
                <div className="specUpcMatchHeader">
                    <img
                        className="teamPicHeader"
                        src={upcomingMatch && upcomingMatch[0].homeTeam.crest}
                    ></img>
                    <p>{upcomingMatch && upcomingMatch[0].homeTeam.name}</p>
                    <p>{upcomingMatch && upcomingMatch[0].awayTeam.name}</p>
                    <img
                        className="teamPicHeader"
                        src={upcomingMatch && upcomingMatch[0].awayTeam.crest}
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
                                            src={
                                                upcomingMatch[0].homeTeam.crest
                                            }
                                        ></img>{" "}
                                        <p>
                                            {
                                                upcomingMatch[0].homeTeam
                                                    .shortName
                                            }
                                        </p>
                                    </td>
                                    <td>
                                        <img
                                            className="specMatchLogo"
                                            src={
                                                upcomingMatch[0].awayTeam.crest
                                            }
                                        ></img>{" "}
                                        <p>
                                            {
                                                upcomingMatch[0].awayTeam
                                                    .shortName
                                            }
                                        </p>
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
                                                            <div
                                                                key={
                                                                    day.datetime
                                                                }
                                                            >
                                                                <p>
                                                                    {day.temp}°C
                                                                </p>
                                                                <p>
                                                                    max{" "}
                                                                    {
                                                                        day.tempmax
                                                                    }
                                                                    °C
                                                                </p>
                                                                <p>
                                                                    min{" "}
                                                                    {
                                                                        day.tempmin
                                                                    }
                                                                    °C
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
                    <div className="defaultTravelInfo">
                        <h2>
                            Hotels in{" "}
                            {/* {hotelData &&
                                hotelData.data[0] &&
                                hotelData.data[0].location_string} */}
                        </h2>
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Hotel</th>
                                    <th>Price per Night</th>
                                    <th>Price</th>
                                    <th>Neighborhood</th>
                                    <th>Hotel Class</th>
                                    <th>Review Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {hotelData &&
                                    hotelData.result.map((row) => {
                                        if (i <= 9) {
                                            i++;
                                            return (
                                                <tr
                                                    key={row.hotel_id} //done
                                                    className="hotel"
                                                >
                                                    <td>{i}</td>
                                                    <td>
                                                        <div className="hotelAndPic">
                                                            <img
                                                                className="thumbNail"
                                                                src={
                                                                    row.main_photo_url //done
                                                                }
                                                            ></img>
                                                            <p>
                                                                {
                                                                    row.hotel_name //done
                                                                }
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {
                                                            row
                                                                .composite_price_breakdown
                                                                .gross_amount_per_night
                                                                .value
                                                        }
                                                        {
                                                            row
                                                                .composite_price_breakdown
                                                                .gross_amount_per_night
                                                                .currency
                                                        }
                                                    </td>
                                                    <td>
                                                        <a
                                                            href={row.url} //done
                                                        >
                                                            {
                                                                row
                                                                    .composite_price_breakdown
                                                                    .gross_amount
                                                                    .value
                                                            }
                                                            {
                                                                row
                                                                    .composite_price_breakdown
                                                                    .gross_amount
                                                                    .currency
                                                            }
                                                        </a>
                                                    </td>
                                                    <td>{row.district}</td>
                                                    <td>
                                                        {row.class}
                                                        {/* {row.hotel_class.slice(0,2)} */}
                                                    </td>
                                                    <td>{row.review_score}</td>
                                                </tr>
                                            );
                                        }
                                    })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

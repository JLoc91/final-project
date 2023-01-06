import { useEffect } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { addWeather } from "../redux/Weather/slice";
import { addTravelData } from "../redux/Travel/slice";
import { addHead2HeadData } from "../redux/Football/slice";

export default function SpecUpcomingMatch() {
    const dispatch = useDispatch();
    const { teamId, matchId } = useParams();
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

    const homeTeamArr =
        teamsData &&
        teamsData.teams.filter(
            (team) => team.id == upcomingMatch[0].homeTeam.id
        );

    const homeTeam = homeTeamArr && homeTeamArr[0];

    const weatherData = useSelector(
        (state) => state.weatherList && state.weatherList.weatherData
    );

    const hotelData = useSelector(
        (state) => state.travelList && state.travelList.travelData
    );

    const head2HeadData = useSelector(
        (state) => state.footballList && state.footballList.head2HeadData
    );

    let i = 0;
    function fetchWeather(teamData, matchDate) {
        fetch("/api/getAddressWeatherData/", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify([teamData, matchDate]),
        })
            .then((resp) => resp.json())
            .then((specWeatherHotelData) => {
                dispatch(addWeather(specWeatherHotelData.weatherData));
                dispatch(addTravelData(specWeatherHotelData.hotelData));
            })
            .catch((err) => console.log("err in fetchweather:", err));
    }

    function fetchPastHead2Head(matchId) {
        fetch(`/api/getPastHead2Head/${matchId}`)
            .then((res) => res.json())
            .then((head2HeadData) => {
                dispatch(addHead2HeadData(head2HeadData));
            })
            .catch((err) => console.log("err in fetchPastHead2Head: ", err));
    }

    useEffect(() => {
        fetchWeather(homeTeam, matchDate);
        fetchPastHead2Head(matchId);
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
                </div>
                <div className="specUpcMatchBody">
                    <table className="grey">
                        <thead>
                            <tr>
                                <th>Competition</th>
                                <th>Matchday</th>
                                <th className="right">Home Team</th>
                                <th></th>
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
                                        <div className="teamAndPic right">
                                            <p>
                                                {
                                                    upcomingMatch[0].homeTeam
                                                        .shortName
                                                }
                                            </p>{" "}
                                            <img
                                                className="specMatchLogo"
                                                src={
                                                    upcomingMatch[0].homeTeam
                                                        .crest
                                                }
                                            ></img>
                                        </div>
                                    </td>
                                    <td> {" : "}</td>
                                    <td>
                                        <div className="teamAndPic">
                                            <img
                                                className="specMatchLogo"
                                                src={
                                                    upcomingMatch[0].awayTeam
                                                        .crest
                                                }
                                            ></img>{" "}
                                            <p>
                                                {
                                                    upcomingMatch[0].awayTeam
                                                        .shortName
                                                }
                                            </p>
                                        </div>
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
                    <div className="head2headAggregation grey">
                        {head2HeadData && head2HeadData.aggregates && (
                            <>
                                {teamId ==
                                head2HeadData.aggregates.homeTeam.id ? (
                                    <h3>
                                        Aggregated Statistics of{" "}
                                        {head2HeadData.aggregates.homeTeam.name}{" "}
                                        against{" "}
                                        {head2HeadData.aggregates.awayTeam.name}
                                    </h3>
                                ) : (
                                    <h3>
                                        Aggregated Statistics of{" "}
                                        {head2HeadData.aggregates.awayTeam.name}{" "}
                                        against{" "}
                                        {head2HeadData.aggregates.homeTeam.name}
                                    </h3>
                                )}
                                <table>
                                    <thead>
                                        <tr>
                                            <th># of Matches</th>
                                            <th>Wins</th>
                                            <th>Draws</th>
                                            <th>Losses</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                {
                                                    head2HeadData.aggregates
                                                        .numberOfMatches
                                                }
                                            </td>
                                            <td>
                                                {teamId ==
                                                head2HeadData.aggregates
                                                    .homeTeam.id
                                                    ? head2HeadData.aggregates
                                                          .homeTeam.wins
                                                    : head2HeadData.aggregates
                                                          .awayTeam.wins}
                                            </td>
                                            <td>
                                                {
                                                    head2HeadData.aggregates
                                                        .homeTeam.draws
                                                }
                                            </td>
                                            <td>
                                                {teamId ==
                                                head2HeadData.aggregates
                                                    .homeTeam.id
                                                    ? head2HeadData.aggregates
                                                          .homeTeam.losses
                                                    : head2HeadData.aggregates
                                                          .awayTeam.losses}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </>
                        )}
                    </div>
                    <div className="head2headMatches grey">
                        <h3>
                            Results of the last{" "}
                            {head2HeadData && head2HeadData.matches.length}{" "}
                            Head2Head Appearances
                        </h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Competition</th>
                                    <th>Date</th>
                                    <th>Home Team</th>
                                    <th>Score</th>
                                    <th>Away Team</th>
                                </tr>
                            </thead>
                            <tbody>
                                {head2HeadData &&
                                    head2HeadData.matches.map((match) => {
                                        return (
                                            <tr key={match.id}>
                                                <td>
                                                    {match.area.code}{" "}
                                                    {match.competition.code}
                                                </td>
                                                <td>
                                                    {match.utcDate.slice(0, 10)}
                                                </td>
                                                <td>
                                                    <div className="teamAndPic">
                                                        <p>
                                                            {
                                                                match.homeTeam
                                                                    .shortName
                                                            }
                                                        </p>
                                                        <img
                                                            className="tableTeamPic"
                                                            src={
                                                                match.homeTeam
                                                                    .crest
                                                            }
                                                        ></img>{" "}
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className="fullTime">
                                                        {
                                                            match.score.fullTime
                                                                .home
                                                        }{" "}
                                                        :{" "}
                                                        {
                                                            match.score.fullTime
                                                                .away
                                                        }
                                                        {"("}
                                                        {
                                                            match.score.halfTime
                                                                .home
                                                        }{" "}
                                                        :{" "}
                                                        {
                                                            match.score.halfTime
                                                                .away
                                                        }
                                                        {")"}
                                                    </p>
                                                </td>
                                                <td>
                                                    <div className="teamAndPic">
                                                        <p>
                                                            {
                                                                match.awayTeam
                                                                    .shortName
                                                            }
                                                        </p>
                                                        <img
                                                            className="tableTeamPic"
                                                            src={
                                                                match.awayTeam
                                                                    .crest
                                                            }
                                                        ></img>{" "}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    </div>
                    <div className="defaultTravelInfo grey">
                        <h2>
                            Hotels close to the Stadium
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
                                                    key={row.hotel_id}
                                                    className="hotel"
                                                >
                                                    <td>{i}</td>
                                                    <td>
                                                        <div className="hotelAndPic">
                                                            <img
                                                                className="thumbNail"
                                                                src={
                                                                    row.main_photo_url
                                                                }
                                                            ></img>
                                                            <p>
                                                                {
                                                                    row.hotel_name
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
                                                            href={row.url}
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

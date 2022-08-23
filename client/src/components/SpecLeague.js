import { useEffect } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { addFootballTeams } from "../redux/Football/slice";
import { Link } from "react-router-dom";

let leaguesJSON = require("../../../server/uploads/leagues.json");

console.log("leaguesJSON in specLeague: ", leaguesJSON);

let leagues = leaguesJSON.competitions;

export default function SpecLeague() {
    const teams = useSelector(
        (state) => state.footballList.teams && state.footballList.teams.teams
    );
    console.log("teams: ", teams);
    // let leagues = useSelector((state) => state.footballList);
    const { leagueCode } = useParams();
    const dispatch = useDispatch();
    console.log("leagues in SpecLeagues: ", leagues);
    console.log("leagueCode: ", leagueCode);
    const league = leagues.filter((league) => league.code == leagueCode);
    console.log("league in SpecLeague: ", league);
    // dispatch(addFootballTeam(leagues));
    // let newData = {};
    function fetchTeams() {
        fetch(`/api/getSpecLeagueData/${leagueCode}`)
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

    useEffect(() => {
        fetchTeams();
    }, []);

    return (
        <>
            <div id={league[0].name} className="league">
                <h1>{league[0].name}</h1>
                <img className="welcomePic" src={league[0].emblem}></img>
            </div>
            {teams &&
                teams.map((team) => {
                    return (
                        <Link key={team.id} to={`/team/${team.id}`}>
                            <div
                                id={team.tla}
                                className="league"
                                // onClick={() => goToTeam(team.id)}
                            >
                                <h1>{league.name}</h1>
                                <img
                                    className="welcomePic"
                                    src={league.emblem}
                                ></img>
                            </div>
                        </Link>
                    );
                })}
        </>
    );
}

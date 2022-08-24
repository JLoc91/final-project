import { useSelector, useDispatch } from "react-redux";
import { addFootballLeagues } from "../redux/Football/slice";
import { Link } from "react-router-dom";

let leaguesJSON = require("../../../server/uploads/leagues.json");

console.log("leaguesJSON: ", leaguesJSON);

let leagues = leaguesJSON;

export default function Leagues() {
    const dispatch = useDispatch();

    console.log("leagues in Leagues Component: ", leagues);
    dispatch(addFootballLeagues(leagues));

    // ------in case of more requests per minute implement Code below ------
    // let leagues = useSelector((store) => store.leaguesData);
    function fetchFunc() {
        fetch("/api/getLeaguesData")
            .then((res) => res.json())
            .then((data) => {
                console.log("data: ", data);
                dispatch(addFootballLeagues(data));
            })
            .catch(() => console.log("request failed"));
    }
    // ------in case of more requests per minute implement Code above ------

    return (
        <>
            {leagues.competitions &&
                leagues.competitions.map((league) => {
                    return (
                        <Link key={league.id} to={`/league/${league.code}`}>
                            <div id={league.name} className="league">
                                <h1>{league.name}</h1>
                                <img
                                    className="welcomeLeaguePic"
                                    src={league.emblem}
                                ></img>
                            </div>
                        </Link>
                    );
                })}
        </>
    );
}

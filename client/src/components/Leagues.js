import { useSelector, useDispatch } from "react-redux";
import { addFootballLeagues } from "../redux/Football/slice";
import { Link } from "react-router-dom";

let leaguesJSON = require("../../../server/uploads/leagues.json");

console.log("leaguesJSON: ", leaguesJSON);

let leagues = {
    leagues: leaguesJSON.competitions,
};

export default function Leagues() {
    const dispatch = useDispatch();

    console.log("leagues in Leagues Component: ", leagues);
    // dispatch(addFootballLeagues(leagues));
    // let newData = {};
    function fetchFunc() {
        fetch("/api/makeRequest")
            .then((res) =>
                // console.log("res: ", res);
                // console.log("request successful");
                res.json()
            )
            .then((data) => {
                console.log("data: ", data);
                // newData =
                // dispatch(addFootballTeam(data));
                // newData = data;
            })
            .catch(() => console.log("request failed"));
    }

    return (
        <>
            {leagues.leagues &&
                leagues.leagues.map((league) => {
                    return (
                        <Link key={league.id} to={`/league/${league.code}`}>
                            <div
                                id={league.name}
                                className="league"
                                // onClick={() => goToLeague(league.id)}
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

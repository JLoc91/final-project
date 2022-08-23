import { useEffect } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function SpecLeague() {
    let leagues = useSelector((state) => state.footballList);
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
                console.log("data: ", data);
                // newData =
                // dispatch(addFootballTeam(data));
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
        </>
    );
}

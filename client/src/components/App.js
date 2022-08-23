import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addFootballTeam } from "../redux/Football/slice";

export default function App() {
    const dispatch = useDispatch();
    const leagues = useSelector((state) => state.footballList.competitions);
    console.log("leagues: ", leagues);
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
                dispatch(addFootballTeam(data));
                // newData = data;
            })
            .catch(() => console.log("request failed"));
    }

    function goToLeague(id) {
        fetch("")
    }

    useEffect(() => {
        fetchFunc();
    }, []);

    return (
        <>
            {/* <div id="header">
                <button onClick={() => fetchFunc()}>Hello, World!</button>
            </div> */}

            <div id="body">
                {leagues &&
                    leagues.map((league) => {
                        return (
                            <div
                                key={league.id}
                                id={league.name}
                                className="league"
                                onClick={()=> goToLeague(league.id)}
                            >
                                <h1>{league.name}</h1>
                                <img
                                    className="welcomePic"
                                    src={league.emblem}
                                ></img>
                            </div>
                        );
                    })}
            </div>
        </>
    );
}

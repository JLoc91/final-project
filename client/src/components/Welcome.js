import { useSelector, useDispatch } from "react-redux";
import { addFootballTeam } from "../redux/Football/slice";

export default function Welcome() {
    const dispatch = useDispatch();
    const team = useSelector((state) => state.footballList);
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
                dispatch(addFootballTeam(data));
                // newData = data;
            })
            .catch(() => console.log("request failed"));
    }

    return (
        <>
            <button onClick={() => fetchFunc()}>Hello, World!</button>
            <h1>{team.name}</h1>
            <img width="50px" heigth="50px" src={team.crest}></img>
        </>
    );
}

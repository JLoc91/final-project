export default function footballData(footballData = {}, action) {
    console.log("footballData in slice before: ", footballData);
    if (action.type === "football-team/update") {
        footballData = action.payload;
        console.log("footballData in slice after: ", footballData);
    }

    return footballData;
}

export function addFootballTeam(footballTeam) {
    console.log("footballTeam in addFootballTeam: ", footballTeam);
    return {
        type: "football-team/update",
        payload: footballTeam,
    };
}

export default function footballData(footballData = {}, action) {
    console.log("footballData in slice before: ", footballData);
    if (action.type === "football-leagues/update") {
        footballData.leagues = action.payload;
        console.log("footballData in slice after: ", footballData);
    }
    if (action.type === "football-teams/update") {
        footballData.teams = action.payload;
        console.log("footballData in slice after: ", footballData);
    }

    return footballData;
}

export function addFootballLeagues(footballLeagues) {
    console.log("footballTeam in addFootballTeam: ", footballLeagues);
    return {
        type: "football-leagues/update",
        payload: footballLeagues,
    };
}

export function addFootballTeams(footballTeams) {
    console.log("footballTeam in addFootballTeam: ", footballTeams);
    return {
        type: "football-teams/update",
        payload: footballTeams,
    };
}

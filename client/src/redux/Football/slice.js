export default function footballData(footballData = {}, action) {
    console.log("footballData in slice before: ", footballData);
    let newFootballData = Object.assign({}, footballData);
    console.log("newFootballData: ", newFootballData);
    console.log("action.payload: ", action.payload);
    if (action.type === "football-leagues/update") {
        newFootballData.leaguesData = action.payload;
        console.log("newFootballData in slice after: ", newFootballData);
    }

    if (action.type === "football-teams/update") {
        newFootballData.teamsData = action.payload;
        console.log("newFootballData in slice after: ", newFootballData);
    }

    if (action.type === "football-leagues-standings/update") {
        newFootballData.standingsData = action.payload;
        console.log("newFootballData in slice after: ", newFootballData);
    }

    return newFootballData;
}

export function addFootballLeagues(footballLeagues) {
    console.log("footballTeam in addFootballLeagues: ", footballLeagues);
    return {
        type: "football-leagues/update",
        payload: footballLeagues,
    };
}

export function addFootballTeams(footballTeams) {
    console.log("footballTeam in addFootballTeasm: ", footballTeams);
    return {
        type: "football-teams/update",
        payload: footballTeams,
    };
}

export function addFootballLeagueStandings(leagueStandings) {
    console.log(
        "leagueStandings in addFootballLeagueStandings: ",
        leagueStandings
    );
    return {
        type: "football-leagues-standings/update",
        payload: leagueStandings,
    };
}

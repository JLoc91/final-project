export default function footballData(footballData = {}, action) {
    let newFootballData = Object.assign({}, footballData);

    if (action.type === "football-leagues/update") {
        newFootballData.leaguesData = action.payload;
    }

    if (action.type === "football-teams/update") {
        newFootballData.teamsData = action.payload;
    }

    if (action.type === "football-leagues-standings/update") {
        newFootballData.standingsData = action.payload;
    }

    if (action.type === "football-team-upcoming-matches/update") {
        newFootballData.upcomingMatchesData = action.payload;
    }

    if (action.type === "football-team-head2head/update") {
        newFootballData.head2HeadData = action.payload;
    }

    if (action.type === "football-league-matches-30-days/update") {
        newFootballData.specLeagueMatches30DaysData = action.payload;
    }

    return newFootballData;
}

export function addFootballLeagues(footballLeagues) {
    return {
        type: "football-leagues/update",
        payload: footballLeagues,
    };
}

export function addFootballTeams(footballTeams) {
    return {
        type: "football-teams/update",
        payload: footballTeams,
    };
}

export function addFootballLeagueStandings(leagueStandings) {
    return {
        type: "football-leagues-standings/update",
        payload: leagueStandings,
    };
}

export function addUpcomingMatches(upcomingMatches) {
    return {
        type: "football-team-upcoming-matches/update",
        payload: upcomingMatches,
    };
}

export function addHead2HeadData(head2HeadData) {
    return {
        type: "football-team-head2head/update",
        payload: head2HeadData,
    };
}

export function addSpecLeagueMatches30Days(specLeagueMatches30Days) {
    return {
        type: "football-league-matches-30-days/update",
        payload: specLeagueMatches30Days,
    };
}

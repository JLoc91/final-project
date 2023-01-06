const https = require("https");
const football_token =
    process.env.FOOTBALL_DATA_API_TOKEN ||
    require("./secrets.json").FOOTBALL_DATA_API_TOKEN;

module.exports.getLeaguesData = function (callback) {

    //get top leauge info
    const options = {
        method: "GET",
        protocol: "https:",
        host: "api.football-data.org",
        path: "/v4/competitions?areas=2088,2224,2072,2114,2081",
        headers: {
            "X-Auth-Token": football_token,
        },
    };

    function makeRequest(resp) {
        if (resp.statusCode != 200) {
            callback(new Error(resp.statusCode));
            return;
        } else {
            let body = "";
            resp.on("data", (chunk) => {
                body += chunk;
            });

            resp.on("end", () => {
                let parsedBody = JSON.parse(body);
                callback(null, parsedBody);
            });
        }
    }

    const reqTweet = https.request(options, makeRequest);

    reqTweet.end();
};

module.exports.getSpecLeagueStandingData = function (leagueCode, callback) {

    //get specific top leauge info
    const options = {
        method: "GET",
        protocol: "https:",
        host: "api.football-data.org",
        path: `/v4/competitions/${leagueCode}/standings`,

        headers: {
            "X-Auth-Token": football_token,
        },
    };

    function makeRequest(resp) {
        if (resp.statusCode != 200) {
            callback(new Error(resp.statusCode));
            return;
        } else {
            let body = "";
            resp.on("data", (chunk) => {
                body += chunk;
            });

            resp.on("end", () => {
                let parsedBody = JSON.parse(body);
                callback(null, parsedBody);
            });
        }
    }

    const reqTweet = https.request(options, makeRequest);

    reqTweet.end();
};

module.exports.getUpcomingMatchesSpecTeam = function (teamId, callback) {
    //get 10 upcoming matches for specific team
    const options = {
        method: "GET",
        protocol: "https:",
        host: "api.football-data.org",
        path: `/v4/teams/${teamId}/matches?status=SCHEDULED&limit=10`,
        headers: {
            "X-Auth-Token": football_token,
        },
    };

    function makeRequest(resp) {
        if (resp.statusCode != 200) {
            callback(new Error(resp.statusCode));
            return;
        } else {
            let body = "";
            resp.on("data", (chunk) => {
                body += chunk;
            });

            resp.on("end", () => {
                let parsedBody = JSON.parse(body);
                callback(null, parsedBody);
            });
        }
    }

    const reqTweet = https.request(options, makeRequest);

    reqTweet.end();
};

module.exports.getHead2HeadData = function (matchId, callback) {
    //get 10 upcoming matches for specific team
    console.log("matchId: ", matchId);
    const limit = 5;
    const options = {
        method: "GET",
        protocol: "https:",
        host: "api.football-data.org",
        path: `/v4/matches/${matchId}/head2head?limit=${limit}`,
        headers: {
            "X-Auth-Token": football_token,
        },
    };

    function makeRequest(resp) {
        if (resp.statusCode != 200) {
            callback(new Error(resp.statusCode));
            return;
        } else {
            let body = "";
            resp.on("data", (chunk) => {
                body += chunk;
            });

            resp.on("end", () => {
                let parsedBody = JSON.parse(body);
                callback(null, parsedBody);
            });
        }
    }

    const reqTweet = https.request(options, makeRequest);

    reqTweet.end();
};

module.exports.getSpecLeagueMatches30Days = function (leagueId, callback) {
    //get 10 upcoming matches for specific team
    let today = new Date();
    today = today.toISOString().slice(0, 10);
    let endDate = new Date();
    endDate.setDate(endDate.getDate() + 30);
    endDate = endDate.toISOString().slice(0, 10);
    const options = {
        method: "GET",
        protocol: "https:",
        host: "api.football-data.org",
        path: `/v4/competitions/${leagueId}/matches?dateFrom=${today}&dateTo=${endDate}&status=SCHEDULED`,
        headers: {
            "X-Auth-Token": football_token,
        },
    };

    function makeRequest(resp) {
        if (resp.statusCode != 200) {
            callback(new Error(resp.statusCode));
            return;
        } else {
            let body = "";
            resp.on("data", (chunk) => {
                body += chunk;
            });

            resp.on("end", () => {
                let parsedBody = JSON.parse(body);
                callback(null, parsedBody);
            });
        }
    }

    const reqTweet = https.request(options, makeRequest);

    reqTweet.end();
};

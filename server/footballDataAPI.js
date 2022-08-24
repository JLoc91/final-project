const https = require("https");
const football_token = require("./secrets.json").FOOTBALL_DATA_API_TOKEN;

module.exports.getLeaguesData = function (callback) {
    // const options = {
    //     method: "GET",
    //     protocol: "https:",
    //     host: "api.football-data.org",
    //     path: "/v4/competitions/CL/matches",
    //     headers: {
    //         "X-Auth-Token": football_token,
    //     },
    // };

    //get Hertha BSC data
    // const options = {
    //     method: "GET",
    //     protocol: "https:",
    //     host: "api.football-data.org",
    //     path: "/v4/teams/9",
    //     headers: {
    //         "X-Auth-Token": football_token,
    //     },
    // };

    //get top leauge info
    const options = {
        method: "GET",
        protocol: "https:",
        host: "api.football-data.org",
        path: "/v4/competitions?areas=2088,2224,2072,2114,2081",
        // path: "/v4/competitions?competitions=2021,2015,2002,2019,2014",

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
                // console.log("body: ", body);
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
    console.log("leagueCode: ", leagueCode);
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
        console.log("callback: ", callback);
        if (resp.statusCode != 200) {
            callback(new Error(resp.statusCode));
            return;
        } else {
            let body = "";
            resp.on("data", (chunk) => {
                body += chunk;
            });

            resp.on("end", () => {
                // console.log("body: ", body);
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
    console.log("teamId: ", teamId);
    const options = {
        method: "GET",
        protocol: "https:",
        host: "api.football-data.org",
        // path: `/v4/teams/${teamId}/`,
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
                // console.log("body: ", body);
                let parsedBody = JSON.parse(body);
                callback(null, parsedBody);
            });
        }
    }

    const reqTweet = https.request(options, makeRequest);

    reqTweet.end();
};

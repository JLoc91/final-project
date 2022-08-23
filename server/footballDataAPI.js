const https = require("https");
const football_token = require("./secrets.json").FOOTBALL_DATA_API_TOKEN;

module.exports.getFootballData = function (callback) {
    // const options = {
    //     method: "GET",
    //     protocol: "https:",
    //     host: "api.football-data.org",
    //     path: "/v4/competitions/CL/matches",
    //     headers: {
    //         "X-Auth-Token": football_token,
    //     },
    // };

    const options = {
        method: "GET",
        protocol: "https:",
        host: "api.football-data.org",
        path: "/v4/competitions/PL/teams",
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

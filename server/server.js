const express = require("express");
const app = express();
const util = require("util");
const compression = require("compression");
const path = require("path");
const { getFootballData } = require("./footballDataAPI.js");
const getFootballDataPromise = util.promisify(getFootballData);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

// (res) => {
//     console.log("function gets invoked");
//     let body = "";
//     res.on("data", (chunk) => (body += chunk))
//         .on("end", () => {
//             console.log(body);
//             let parsedBody = JSON.parse(body);
//             // parsedBody.json();
//             res.json(parsedBody);
//         })
//         .on("error", (err) => console.log(err));
// };

app.get("/api/makeRequest", (req, res) => {
    console.log("make a request");
    // const request = https.request(
    //     {
    //         method: "GET",
    //         protocol: "https:",
    //         host: "api.football-data.org",
    //         path: "/v4/competitions/CL/matches",
    //         headers: {
    //             "X-Auth-Token": football_token,
    //         },
    //     },
    //     callbackFunction
    // );

    // request.end();

    getFootballDataPromise()
        .then((data) => {
            // console.log("data: ", data);
            const newData = {};
            data.teams.map((team) => {
                if (team.name == "Everton FC") {
                    console.log("team.name: ", team.name);
                    console.log("team.id: ", team.id);
                    console.log("team.founded: ", team.founded);

                    newData.id = team.id;
                    newData.name = team.name;
                    newData.founded = team.founded;
                }
            });
            // console.log("data.teams: ", data.teams);
            console.log("newData: ", newData);
            res.json(newData);
        })
        .catch((err) => console.log("err in getFootballDataPromise: ", err));
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});

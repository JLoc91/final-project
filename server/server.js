const express = require("express");
const app = express();
const fs = require("fs");
const util = require("util");
const compression = require("compression");
const path = require("path");
const { getLeaguesData, getSpecLeagueData } = require("./footballDataAPI.js");
const getLeaguesDataPromise = util.promisify(getLeaguesData);
const getSpecLeagueDataPromise = util.promisify(getSpecLeagueData);

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

    getLeaguesDataPromise()
        .then((data) => {
            console.log("data: ", data);
            // const message = JSON.stringify(data);
            // const leagueFile = "/uploads/league.json";
            // const path = __dirname + "/" + leagueFile;
            // console.log("path: ", path);
            // fs.writeFile(path, message, () => {
            //     // something here
            //     console.log(`file ${leagueFile} was saved at ${path}`);
            // });
            // const newData = {};
            // data.teams.map((team) => {
            //     if (team.name == "Everton FC") {
            //         console.log("team.name: ", team.name);
            //         console.log("team.id: ", team.id);
            //         console.log("team.founded: ", team.founded);

            //         newData.id = team.id;
            //         newData.name = team.name;
            //         newData.founded = team.founded;
            //     }
            // });
            // console.log("data.teams: ", data.teams);
            // console.log("newData: ", newData);
            res.json(data);
        })
        .catch((err) => console.log("err in getFootballDataPromise: ", err));
});

app.get("/api/getSpecLeagueData/:code", (req, res) => {
    console.log("make a request");
    const leagueCode = req.params.code;
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

    getSpecLeagueDataPromise(null, leagueCode)
        .then((specLeagueData) => {
            console.log("specLeagueData: ", specLeagueData);
            res.json(specLeagueData);
        })
        .catch((err) => console.log("err in getSpecLeagueDataPromise: ", err));
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});

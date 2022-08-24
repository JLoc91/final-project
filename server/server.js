const express = require("express");
const app = express();
const fs = require("fs");
const util = require("util");
const compression = require("compression");
const path = require("path");
const {
    getLeaguesData,
    getSpecLeagueStandingData,
} = require("./footballDataAPI.js");
const { getAdressWeatherData } = require("./weatherDataAPI.js");

const getLeaguesDataPromise = util.promisify(getLeaguesData);
const getSpecLeagueStandingDataPromise = util.promisify(
    getSpecLeagueStandingData
);
const getAdressWeatherDataPromise = util.promisify(getAdressWeatherData);
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

app.get("/api/getLeaguesData", (req, res) => {
    console.log("make a request");

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

    getSpecLeagueStandingDataPromise(leagueCode)
        .then((specLeagueData) => {
            console.log("specLeagueData: ", specLeagueData);
            // ----- if retrieved data should be saved in a json file, implement code below -----
            // const message = JSON.stringify(specLeagueData);
            // const leagueFile = `/uploads/teams${leagueCode}.json`;
            // const path = __dirname + "/" + leagueFile;
            // console.log("path: ", path);
            // fs.writeFile(path, message, () => {
            //     // something here
            //     console.log(`file ${leagueFile} was saved at ${path}`);
            // });
            // ----- if retrieved data should be saved in a json file, implement code above -----
            res.json(specLeagueData);
        })
        .catch((err) => console.log("err in getSpecLeagueDataPromise: ", err));
});

app.post("/api/getAdressWeatherData/", (req, res) => {
    console.log("req.body: ", req.body);

    getAdressWeatherDataPromise(req.body.address).then((weatherData) => {
        console.log("weatherData: ", weatherData);
    });
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});

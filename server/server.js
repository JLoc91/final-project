const express = require("express");
const app = express();
const fs = require("fs");
const util = require("util");
const compression = require("compression");
const path = require("path");

//get footballAPI functions
const {
    getLeaguesData,
    getSpecLeagueStandingData,
    getUpcomingMatchesSpecTeam,
    getHead2HeadData,
    getSpecLeagueMatches30Days,
} = require("./footballDataAPI.js");

const getLeaguesDataPromise = util.promisify(getLeaguesData);
const getSpecLeagueStandingDataPromise = util.promisify(
    getSpecLeagueStandingData
);
const getUpcomingMatchesSpecTeamPromise = util.promisify(
    getUpcomingMatchesSpecTeam
);
const getHead2HeadDataPromise = util.promisify(getHead2HeadData);
const getSpecLeagueMatches30DaysPromise = util.promisify(
    getSpecLeagueMatches30Days
);

//get weatherAPI functions
const { getAddressWeatherData } = require("./weatherDataAPI.js");

const getAddressWeatherDataPromise = util.promisify(getAddressWeatherData);

// get travelAPI functions
const { getLatLongTravelData } = require("./travelDataAPI.js");

const getLatLongTravelDataPromise = util.promisify(getLatLongTravelData);

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

app.get("/api/getSpecLeagueMatches30Days/:id", (req, res) => {
    const leagueId = req.params.id;

    getSpecLeagueMatches30DaysPromise(leagueId).then(
        (specLeagueMatches30DaysData) => {
            console.log(
                "specLeagueMatches30DaysData: ",
                specLeagueMatches30DaysData
            );
            res.json(specLeagueMatches30DaysData);
        }
    );
});

app.get("/api/getUpcomingMatchesSpecTeam/:id", (req, res) => {
    const teamId = req.params.id;

    getUpcomingMatchesSpecTeamPromise(teamId).then((upcomingMatchesData) => {
        console.log("upcomingMatchesData: ", upcomingMatchesData);
        res.json(upcomingMatchesData);
    });
});

app.get("/api/getPastHead2Head/:id", (req, res) => {
    const matchId = req.params.id;

    getHead2HeadDataPromise(matchId).then((head2headData) => {
        console.log("head2headData: ", head2headData);
        res.json(head2headData);
    });
});

app.post("/api/getAddressWeatherData/", (req, res) => {
    console.log("req.body: ", req.body);

    getAddressWeatherDataPromise(req.body[0].address, req.body[0].area.name)
        .then((weatherData) => {
            console.log("weatherData: ", weatherData);

            getLatLongTravelDataPromise(
                weatherData.latitude,
                weatherData.longitude,
                req.body[1]
            ).then((hotelData) => {
                console.log("hotelData: ", hotelData);
                // const message = JSON.stringify(hotelData);
                // const leagueFile = "/uploads/hotelData.json";
                // const path = __dirname + "/" + leagueFile;
                // console.log("path: ", path);
                // fs.writeFile(path, message, () => {
                //     // something here
                //     console.log(`file ${leagueFile} was saved at ${path}`);
                // });
                res.json({ weatherData, hotelData });
            });
        })
        .catch((err) =>
            console.log("error in getAddressWeatherDataPromise: ", err)
        );
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});

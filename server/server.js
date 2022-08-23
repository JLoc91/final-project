const express = require("express");
const https = require("https");
const app = express();
const compression = require("compression");
const path = require("path");
const football_token = require("./secrets.json").FOOTBALL_DATA_API_TOKEN;

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

function callbackFunction(resp) {
    console.log("function gets invoked");
    let body = "";
    resp.on("data", (chunk) => (body += chunk))
        .on("end", () => {
            console.log(body);
            let parsedBody = JSON.parse(body);
            // parsedBody.json();
            // res.json(parsedBody);
        })
        .on("error", (err) => console.log(err));
}

app.get("/api/makeRequest", (req, res) => {
    console.log("make a request");
    const request = https.request(
        {
            method: "GET",
            protocol: "https:",
            host: "api.football-data.org",
            path: "/v4/competitions/CL/matches",
            headers: {
                "X-Auth-Token": football_token,
            },
        },
        callbackFunction
    );

    request.end();
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});

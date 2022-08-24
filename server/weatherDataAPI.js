const https = require("https");
const weather_key = require("./secrets.json").WEATHER_API_KEY;

module.exports.getAdressWeatherData = function (address, callback) {
    //get specific top leauge info
    console.log("address: ", address);
    const cleanAddress = address.replaceAll(" ", "%20");
    console.log("cleanAddress: ", cleanAddress);
    const options = {
        method: "GET",
        protocol: "https:",
        host: "weather.visualcrossing.com",
        path: `VisualCrossingWebServices/rest/services/timeline/${cleanAddress}&key=${weather_key}&contentType=json`,
        headers: {},
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

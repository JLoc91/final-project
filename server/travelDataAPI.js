const https = require("https");
const travel_key = require("./secrets.json").TRAVEL_API_KEY;

module.exports.getLatLongTravelData = function (
    latitude,
    longitude,
    matchDate,
    callback
) {
    console.log("latitude: ", latitude);
    console.log("longitude: ", longitude);
    const limit = "100";
    const distance = "30";
    //matchDate yyyy-mm-dd
    const options = {
        method: "GET",
        hostname: "travel-advisor.p.rapidapi.com",
        port: null,
        path: `/hotels/list-by-latlng?latitude=${latitude}&longitude=${longitude}&lang=en_US&limit=${limit}&adults=1&rooms=1&currency=EUR&checkin=${matchDate}&nights=2&distance=${distance}`,
        headers: {
            "X-RapidAPI-Key": travel_key,
            "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
            useQueryString: true,
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

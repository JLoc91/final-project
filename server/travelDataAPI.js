const https = require("https");
const travel_key =
    process.env.TRAVEL_API_KEY || require("./secrets.json").TRAVEL_API_KEY;

module.exports.getLatLongTravelData = function (
    latitude,
    longitude,
    matchDate,
    callback
) {
    console.log("latitude: ", latitude);
    console.log("longitude: ", longitude);
    let checkOutDate = new Date(matchDate);
    let checkInDate = new Date(matchDate);
    console.log("checkOutDate: ", checkOutDate);
    console.log("checkInDate: ", checkInDate);
    checkInDate.setDate(checkInDate.getDate() - 1);
    checkOutDate.setDate(checkOutDate.getDate() + 1);
    checkInDate = checkInDate.toISOString().slice(0, 10);
    checkOutDate = checkOutDate.toISOString().slice(0, 10);
    const limit = "100";
    const distance = "30";
    //matchDate yyyy-mm-dd
    const options = {
        method: "GET",
        hostname: "booking-com.p.rapidapi.com",
        port: null,
        path: `/v1/hotels/search-by-coordinates?longitude=${longitude}&latitude=${latitude}&checkin_date=${checkInDate}&locale=en-us&filter_by_currency=EUR&checkout_date=${checkOutDate}&room_number=1&units=metric&adults_number=1&order_by=popularity&include_adjacency=true&page_number=0&categories_filter_ids=class%3A%3A2%2Cclass%3A%3A4%2Cfree_cancellation%3A%3A1`,
        headers: {
            "X-RapidAPI-Key": travel_key,
            "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
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

export default function weatherData(weatherData = {}, action) {
    console.log("weatherData in slice before: ", weatherData);
    let newWeatherData = Object.assign({}, weatherData);
    console.log("newWeatherData: ", newWeatherData);
    console.log("action.payload: ", action.payload);
    if (action.type === "weather/update") {
        newWeatherData = action.payload;
        console.log("newWeatherData in slice after: ", newWeatherData);
    }

    return newWeatherData;
}

export function addWeather(specWeather) {
    console.log("specWeather in addWeather: ", specWeather);
    return {
        type: "weather/update",
        payload: specWeather,
    };
}

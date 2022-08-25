export default function weatherData(weatherData = {}, action) {
    console.log("weatherData in slice before: ", weatherData);
    let newWeatherData = Object.assign({}, weatherData);
    console.log("newWeatherData: ", newWeatherData);
    console.log("action.payload weather: ", action.payload);
    if (action.type === "weather-data/update") {
        newWeatherData.weatherData = action.payload;
        console.log("newWeatherData in slice after: ", newWeatherData);
    }

    return newWeatherData;
}

export function addWeather(specWeather) {
    console.log("specWeather in addWeather: ", specWeather);
    return {
        type: "weather-data/update",
        payload: specWeather,
    };
}

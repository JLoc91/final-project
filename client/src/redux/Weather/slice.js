export default function weatherData(weatherData = {}, action) {
    let newWeatherData = Object.assign({}, weatherData);

    if (action.type === "weather-data/update") {
        newWeatherData.weatherData = action.payload;
    }

    return newWeatherData;
}

export function addWeather(specWeather) {
    return {
        type: "weather-data/update",
        payload: specWeather,
    };
}

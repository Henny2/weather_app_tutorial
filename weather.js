// https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&windspeed_unit=mph&precipitation_unit=inch&timeformat=unixtime&timezone=America%2FLos_Angeles
import axios from "axios";
export function getWeather(lat, lon, timezone) {
    return axios.get("https://api.open-meteo.com/v1/forecast?hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&windspeed_unit=mph&precipitation_unit=inch&timeformat=unixtime",
        {
            params: {

                latitude: lat,
                longitude: lon,
                timezone: timezone,


            }
        }
    ).then(({ data }) => {
        return {
            current: parseCurrentWeather(data),
            // daily: parseDailyWeather(data),
            // hourly: parseHourlyWeather(data),
        }
    })
}

function parseCurrentWeather({ current_weather }) {
    let temp = current_weather.temperature
    let windspeed = current_weather.windspeed
    let weathercode = current_weather.weathercode
    console.log(temp, windspeed, weathercode)
    return {
        temp: temp,
        windspeed: windspeed,
        weathercode: weathercode,
    }
}

function parseDailyWeather({ daily }) {
    // need to get the day of the week from unixtime
}
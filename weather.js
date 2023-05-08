// https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&windspeed_unit=mph&precipitation_unit=inch&timeformat=unixtime&timezone=America%2FLos_Angeles
import axios from "axios";
import { getFormattedHour, getDayOfTimestamp } from "./utils/helpers"
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
            daily: parseDailyWeather(data),
            hourly: parseHourlyWeather(data),
        }
    })
}

function parseCurrentWeather({ current_weather }) {
    let temp = current_weather.temperature
    let windspeed = current_weather.windspeed
    let weathercode = current_weather.weathercode
    console.log('current')
    console.log(temp, windspeed, weathercode)
    console.log('current')
    let current_data = {
        temp: temp,
        windspeed: windspeed,
        weathercode: weathercode,
    }
    console.log(current_data.temp)
    return current_data
}


function parseDailyWeather({ daily }) {
    // need to get the day of the week from unixtime
    let daily_data = {}
    const timestamps = daily.time
    // console.log(new Date(1683478800 * 1000).toLocaleDateString('en-US', { weekday: 'long' }))
    // console.log(timestamps)
    for (let i = 0; i < timestamps.length; i++) {
        let day_of_week = getDayOfTimestamp(timestamps[i])
        // console.log(timestamps[i])
        // console.log(day_of_week)
        daily_data[day_of_week] = {
            weathercode: daily.weathercode[i],
            max_temp: daily.temperature_2m_max[i],
            min_temp: daily.temperature_2m_min[i],
            fl_max_temp: daily.apparent_temperature_max[i],
            fl_min_temp: daily.apparent_temperature_min[i],
            precip: daily.precipitation_sum[i],
        }
    }
    console.log(daily_data)
    return daily_data
}

function parseHourlyWeather({ hourly }) {
    let hourly_data = {}
    const timestamps = hourly.time
    for (let i = 0; i < timestamps.length; i++) {
        let time_of_day = getFormattedHour(timestamps[i])
        hourly_data[time_of_day] = {
            temp: hourly.temperature_2m[i],
            fl_temp: hourly.apparent_temperature[i],
            windspeed: hourly.windspeed_10m[i],
            weathercode: hourly.weathercode[i],
            precip: hourly.precipitation[i],
        }
    }
    console.log(hourly_data)
    return hourly_data
}


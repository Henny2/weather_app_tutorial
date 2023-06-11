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
        console.log(data)
        console.log('current parsed', parseCurrentWeather(data))
        console.log('daily parsed', parseDailyWeather(data))
        console.log('hourly parsed', parseHourlyWeather(data))
        return {
            current: parseCurrentWeather(data),
            daily: parseDailyWeather(data),
            hourly: parseHourlyWeather(data),
        }
    })
}

function parseCurrentWeather({ current_weather, daily }) {
    const {
        temperature: temp,
        windspeed: windSpeed,
        weathercode: iconCode }
        = current_weather
    // console.log('daily', daily)
    const {
        // this is how to deconstruct an array
        // same as maxTemp = temperature_2m_max[0]
        temperature_2m_max: [maxTemp],
        temperature_2m_min: [minTemp],
        apparent_temperature_max: [feelLikeMaxTemp],
        apparent_temperature_min: [feelLikeMinTemp],
        precipitation_sum: [precip]
    } = daily

    return {
        temp,
        windSpeed,
        iconCode: iconCode, // could just write iconCode if its the same name for key and variable
        precip,
        feelLikeMaxTemp,
        feelLikeMinTemp,
        minTemp,
        maxTemp
    }
}


function parseDailyWeather({ daily }) {
    // let daily_data = {}
    // const timestamps = daily.time
    // for loop works, but map() function is cleaner
    // for (let i = 0; i < timestamps.length; i++) {
    //     let day_of_week = getDayOfTimestamp(timestamps[i])
    //     daily_data[day_of_week] = {
    //         weathercode: daily.weathercode[i],
    //         max_temp: daily.temperature_2m_max[i],
    //         min_temp: daily.temperature_2m_min[i],
    //         fl_max_temp: daily.apparent_temperature_max[i],
    //         fl_min_temp: daily.apparent_temperature_min[i],
    //         precip: daily.precipitation_sum[i],
    //     }
    // }
    const { temperature_2m_max: maxTemps, weathercode: iconCodes } = daily
    return daily.time.map((time, index) => {
        return {
            day: getDayOfTimestamp(time * 1000),
            maxTemp: maxTemps[index],
            iconCode: iconCodes[index],
        }
    })
}

function parseHourlyWeather({ hourly, current_weather }) {

    return hourly.time.map((time, index) => {
        return {
            timeStamp: time * 1000,
            feelLikeTemp: hourly.apparent_temperature[index],
            precip: hourly.precipitation[index],
            temp: hourly.temperature_2m[index],
            iconCode: hourly.weathercode[index],
            windSpeed: hourly.windspeed_10m[index],
        }
        // filter the hourly records that were before the current time
    }).filter(({ timeStamp }) => timeStamp >= current_weather.time * 1000)
}


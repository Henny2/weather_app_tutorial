import "./style.css"
import { ICON_MAP } from "./utils/iconMap"
// you could also import the css within the html file via link
import { getWeather } from "./weather"
import { getFormattedHour, getDayOfTimestamp } from "./utils/helpers"

// getting user's location 
navigator.geolocation.getCurrentPosition(positionSuccess, positionError)

function positionSuccess({ coords }) {
  // using. then() because the function returns a promise
  // getWeather(37.335480, -121.893028, Intl.DateTimeFormat().resolvedOptions().timeZone)
  getWeather(coords.latitude, coords.longitude, Intl.DateTimeFormat().resolvedOptions().timeZone)
    .then(renderWeather)
    .catch(e => {
      console.error(e)
      alert('Error getting weather data!')
    })
}

function positionError() {
  alert("There was an error getting your location. Please allow us to use your current location and refresh the page.")
}



function renderWeather({ current, daily, hourly }) {
  renderCurrentWeather(current)
  renderDailyWeather(daily)
  renderHourlyWeather(hourly)
  document.body.classList.remove("blurred")

}

function imageMapping(weather_code) {
  // map a weather code to a weather picture
  if (weather_code === 0) return "icons/sun.svg"
  if (weather_code === 1 || weather_code === 2 || weather_code === 3) return "icons/cloud-sun.svg"


}

function setValue(selector, val, { parent = document } = {}) {
  parent.querySelector(`[data-${selector}]`).textContent = val
}

function getIconUrl(iconCode) {
  return `icons/${ICON_MAP.get(iconCode)}.svg`
}

const currentIcon = document.querySelector("[data-current-icon]")
function renderCurrentWeather(current) {
  currentIcon.src = getIconUrl(current.iconCode)
  setValue("current-temp", current.temp)
  setValue("current-high", current.maxTemp)
  setValue("current-fl-high", current.feelLikeMaxTemp)
  setValue("current-low", current.minTemp)
  setValue("current-fl-low", current.feelLikeMinTemp)
  setValue("current-wind", current.windSpeed)
  setValue("current-precip", current.precip)
}

// getting the daily html section
const dailySection = document.querySelector("[data-day-section]")
// getting day teamplate
const dayCardTemplate = document.getElementById("day-card")
function renderDailyWeather(daily) {
  // deleting all the hard coded day cards
  console.log(daily)
  dailySection.innerHTML = ''
  daily.forEach(day => {
    const element = dayCardTemplate.content.cloneNode(true)
    setValue("temp", day.maxTemp, { parent: element })

    // setValue("icon", getIconUrl(day.iconCode), { parent: element })
    const dayIcon = element.querySelector("[data-icon]")
    dayIcon.src = getIconUrl(day.iconCode)
    setValue("date", day.day, { parent: element })
    // console.log(day)
    dailySection.appendChild(element);
  });
  console.log(daily)
}

// instead of helper functions for day/hour conversion, you can use the following: 
// https://stackoverflow.com/questions/25574963/ies-tolocalestring-has-strange-characters-in-results
// https://devhints.io/wip/intl-datetime
const DAY_FORMATTER = new Intl.DateTimeFormat(undefined, { weekday: 'long' })
const HOUR_FORMATTER = new Intl.DateTimeFormat(undefined, { hour: 'numeric' })


const hourlySection = document.querySelector("[data-hour-section]")
const hourTemplate = document.getElementById('hour-row')
function renderHourlyWeather(hourly) {
  hourlySection.innerHTML = ''
  hourly.forEach(hour => {
    const element = hourTemplate.content.cloneNode(true)
    const hourIcon = element.querySelector("[data-icon]")
    hourIcon.src = getIconUrl(hour.iconCode)
    // setValue("time", getFormattedHour(hour.timeStamp), { parent: element })
    setValue("time", HOUR_FORMATTER.format(hour.timeStamp), { parent: element })
    setValue("day", DAY_FORMATTER.format(hour.timeStamp), { parent: element })
    // setValue("day", getDayOfTimestamp(hour.timeStamp), { parent: element })
    setValue("temp", hour.temp, { parent: element })
    setValue("fl-temp", hour.feelLikeTemp, { parent: element })
    setValue("precip", hour.precip, { parent: element })
    setValue("wind", hour.windSpeed, { parent: element })
    hourlySection.appendChild(element)
  });
} 
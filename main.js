import "./style.css"
// you could also import the css within the html file via link
import { getWeather } from "./weather"

// using. then() because the function returns a promise
getWeather(12.34, 14.53, Intl.DateTimeFormat().resolvedOptions().timeZone)
  .then(renderWeather)
  .catch(e => {
    console.error(e)
    alert('Error getting weather data!')
  })

function renderWeather({ current, daily, hourly }) {
  renderCurrentWeather(current)
  // renderDailyWeather(daily)
  // renderHourlyWeather(hourly)
  document.body.classList.remove("blurred")

}

function imageMapping(weather_code) {
  // map a weather code to a weather picture
  if (weather_code === 0) return "icons/sun.svg"
  if (weather_code === 1 || weather_code === 2 || weather_code === 3) return "icons/cloud-sun.svg"


}

function setValue(selector, val, { parent = document } = {}) {
  // console.log(`[${selector}]`)
  parent.querySelector(`[data-${selector}]`).textContent = val
  console.log(document.querySelector(`[${selector}]`))
}
function renderCurrentWeather(current) {
  console.log(current)
  setValue("current-temp", current.temp)
  setValue("current-high", current.maxTemp)
  setValue("current-fl-high", current.feelLikeMaxTemp)
  setValue("current-low", current.minTemp)
  setValue("current-fl-low", current.feelLikeMinTemp)
  setValue("current-wind", current.windSpeed)
  setValue("current-precip", current.precip)


}

// work on setting all the values
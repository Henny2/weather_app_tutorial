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
  // map a weather code to a weather code

}

function setValue(selector, val) {
  // console.log(`[${selector}]`)
  document.querySelector(`[${selector}]`).textContent = val
  console.log(document.querySelector(`[${selector}]`))
}
function renderCurrentWeather(current) {
  console.log(current)
  setValue("data-current-temp", current.temp)
  // console.log(document.querySelector("[data-current-temp]"))

}
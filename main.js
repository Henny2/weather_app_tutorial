import "./style.css"
// you could also import the css within the html file via link
import { getWeather } from "./weather"

// using. then() because the function returns a promise
getWeather(12.34, 14.53, Intl.DateTimeFormat().resolvedOptions().timeZone).then(res => {
  console.log(res.data)
})

// stopped at 28:30
import icons from '../img/icons/*.png'

const WeatherApp = (function () {
  // API key
  const key = 'a662bc31b2ba6bfbd3bf6288c5394603'

  // select elements to manipulate
  const locationElement = document.querySelector('.wea-location p')
  const iconElement = document.querySelector('.wea-icon')
  const tempElement = document.querySelector('.wea-temp-val p')
  const descElement = document.querySelector('.wea-desc p')

  const KELVIN = 273

  // API data object to fill
  const weather = {}

  weather.temperature = {
    unit: 'celsius',
  }

  // display weather
  const displayWeather = () => {
    locationElement.innerHTML = `${weather.city}, ${weather.country}`
    iconElement.innerHTML = `<img src="${icons[weather.iconId]}" />`
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`
    descElement.innerHTML = weather.description
  }

  // API weather
  const getWeather = () => {
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${52.5145}&lon=${13.3501}&appid=${key}`

    fetch(api)
      .then(function (response) {
        let data = response.json()
        return data
      })
      .then(function (data) {
        weather.city = data.name
        weather.country = data.sys.country
        weather.iconId = data.weather[0].icon
        weather.temperature.value = Math.floor(data.main.temp - KELVIN)
        weather.description = data.weather[0].description
        displayWeather()
      })
      .catch((error) => {
        throw error
      })
  }

  // celsius to fahrenheit conversion
  const celsiusToFahrenheit = (temperature) => {
    return (temperature * 9) / 5 + 32
  }

  const toggleTemperature = () => {
    if (weather.temperature.value === undefined) return

    if (weather.temperature.unit == 'celsius') {
      let fahrenheit = celsiusToFahrenheit(weather.temperature.value)
      fahrenheit = Math.floor(fahrenheit)

      tempElement.innerHTML = `${fahrenheit}°<span>F</span>`
      weather.temperature.unit = 'fahrenheit'
    } else {
      tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`
      weather.temperature.unit = 'celsius'
    }
  }

  const init = () => {
    getWeather()

    // temperature change on click
    tempElement.addEventListener('click', toggleTemperature)
  }

  return {
    init,
  }
})()

document.addEventListener('DOMContentLoaded', WeatherApp.init)

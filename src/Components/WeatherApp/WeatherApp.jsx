import React, { useEffect, useRef, useState } from 'react'
import './WeartherApp.css'
import searchIcon from '../Assets/search.png'
import clearIcon from '../Assets/clear.png'
import cloudIcon from '../Assets/cloud.png'
import drizzleIcon from '../Assets/drizzle.png'
import rainIcon from '../Assets/rain.png'
import snowIcon from '../Assets/snow.png'
import windIcon from '../Assets/wind.png'
import humidityIcon from '../Assets/humidity.png'


export const WeatherApp = () => {

  const API_KEY = "8e6e21b9a1ca9b72af568a197fc780a9";

  const searchValue = useRef("");
  const [weather, setWeather] = useState({});
  const [weatherIcon, setWeatherIcon] = useState(clearIcon)
  let fetchData = {}

  const search = async () => {

    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue.current.value}&units=Metric&appid=${API_KEY}`

      if (searchValue.current.value === "") {
        return 0;
      }
      let response = await fetch(url);
      let data = await response.json();
      fetchData = data;
      if (Object.keys(fetchData).length > 0) {
        setWeather(fetchData);
      }
      // console.log(weather.weather[0].icon)
    } catch (error){
      console.error('Error during weather data fetch:', error);
    }
    
    
  }

  useEffect( ()=>{
    // let url = `https://api.openweathermap.org/data/2.5/weather?q=India&units=Metric&appid=${API_KEY}`
    // let response =  fetch(url);
    // let data =  response.json();
    // setWeather(data);
    if (Object.keys(weather).length > 0 && weather.main) {
      if (weather.weather[0].icon === "01d" || weather.weather[0].icon === "01n") {
        setWeatherIcon(clearIcon)
      } else if (weather.weather[0].icon === "02d" || weather.weather[0].icon === "02n") {
        setWeatherIcon(cloudIcon)
      } else if (weather.weather[0].icon === "03d" || weather.weather[0].icon === "03n") {
        setWeatherIcon(drizzleIcon)
      } else if (weather.weather[0].icon === "04d" || weather.weather[0].icon === "04n") {
        setWeatherIcon(drizzleIcon)
      } else if (weather.weather[0].icon === "09d" || weather.weather[0].icon === "09n") {
        setWeatherIcon(rainIcon)
      } else if (weather.weather[0].icon === "10d" || weather.weather[0].icon === "10n") {
        setWeatherIcon(rainIcon)
      } else if (weather.weather[0].icon === "11d" || weather.weather[0].icon === "11n") {
        setWeatherIcon(drizzleIcon)
      } else if (weather.weather[0].icon === "13d" || weather.weather[0].icon === "13n") {
        setWeatherIcon(snowIcon)
      } else if (weather.weather[0].icon === "50d" || weather.weather[0].icon === "50n") {
        setWeatherIcon(cloudIcon)
      } else {
        setWeatherIcon(clearIcon)
      }
    }
    
  }, [weather])

  return (
    <div className='container'>
      <div className="topbar">
        <input ref={searchValue} type="text" className='cityInput' placeholder='Search' />
        <div className="searchIcon" onClick={() => { search() }}>
          <img src={searchIcon} alt="" />
        </div>
      </div>
      <div className="weatherImage">
        <img src={weatherIcon} alt="" />
      </div>
      <div className="weatherTemp"> {Object.keys(weather).length > 0 && weather.main ?  weather.main.temp: "20"}°c</div>
      <div className="weatherLocation weatherName">{Object.keys(weather).length > 0 && weather.main ? weather.weather[0].main : "Clear"}</div>
      <div className="weatherLocation">{Object.keys(weather).length > 0 && weather.main ?weather.name: "India"}</div>
      <div className="dataContainer">
        <div className="element">
          <img src={humidityIcon} alt="" className='icon' />
          <div className="data">
            <div className="humidityPercent">{Object.keys(weather).length > 0 && weather.main ? weather.main.humidity: "20"}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={windIcon} alt="" className='icon' />
          <div className="data">
            <div className="humidityPercent">{Object.keys(weather).length > 0 && weather.main ?weather.wind.speed: "20"} km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  )
}

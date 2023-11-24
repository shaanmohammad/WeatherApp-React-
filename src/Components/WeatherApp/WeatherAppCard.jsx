import React, { useEffect, useRef, useState } from 'react'
import './WeartherAppNew.css'
import searchIcon from '../Assets/search.png'
import clearIcon from '../Assets/clear.png'
import cloudIcon from '../Assets/cloud.png'
import drizzleIcon from '../Assets/drizzle.png'
import rainIcon from '../Assets/rain.png'
import snowIcon from '../Assets/snow.png'
import windIcon from '../Assets/wind.png'
import humidityIcon from '../Assets/humidity.png'


export const WeatherAppCard = () => {

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

  useEffect(()=>{    
    if (Object.keys(weather).length > 0 && weather.main) {
      const iconMapping = {
        "01d": clearIcon,
        "01n": clearIcon,
        "02d": cloudIcon,
        "02n": cloudIcon,
        "03d": drizzleIcon,
        "03n": drizzleIcon,
        "04d": drizzleIcon,
        "04n": drizzleIcon,
        "09d": rainIcon,
        "09n": rainIcon,
        "10d": rainIcon,
        "10n": rainIcon,
        "11d": drizzleIcon,
        "11n": drizzleIcon,
        "13d": snowIcon,
        "13n": snowIcon,
        "50d": cloudIcon,
        "50n": cloudIcon,
      };
    
      const iconCode = weather.weather[0].icon;
      setWeatherIcon(iconMapping[iconCode] || clearIcon);
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

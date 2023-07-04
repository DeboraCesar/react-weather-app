import React, { useState } from "react";
import axios from "axios";
import "./Search.css";

export default function Search() {
  const [city, setCity] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState("");

  function showWeather(response) {
    setLoaded(true);
    setWeather({
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: 0,
      city: response.data.main.name,
      weathericon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "6f578b96aa9505bcce148ac22cb85794";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather);
  }

  function displayCity(event) {
    setCity(event.target.value);
  }
  let form = (
    <form className="Search" onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="Type city"
        className="search-field"
        onChange={displayCity}
      />
      <input className="search-button" type="submit" value="Search" />
      <input className="search-button green" type="submit" value="Current" />
    </form>
  );
  if (loaded) {
    return (
      <div>
        {" "}
        {form}
        <div className="weather">
          <h3>{(weather, city)}</h3>
          <ul>
            <li>Temperature {Math.round(weather.temperature)}°C</li>
            <li>Humidity {weather.humidity}</li>
            <li>Wind {Math.round(weather.wind)}</li>
            <li>
              <img src={weather.weathericon} alt="weather symbol" />
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    return form;
  }
}
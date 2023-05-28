import "./styles/App.css";
import { useEffect, useState } from "react";
import { weatherConditions } from "./WeatherConditions";

function App() {
  const [location, setLocation] = useState("New York");
  const [image, setImage] = useState("");
  const [condition, setCondition] = useState({
    date: "",
    temp: "",
    feelsTemp: "",
    humidity: "",
    rain: "",
    wind: "",
  });

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    fetchCondition();
  }, []);

  function fetchCondition() {
    const baseURL = "http://api.weatherapi.com/v1/forecast.json?";
    const params = new URLSearchParams({
      key: "09cedaf909184f7e9cb51126232305",
      q: location,
      days: "4",
    });

    fetch(baseURL + params)
      .then((response) => response.json())
      .then((data) => {
        const header = document.getElementById("location-header");
        if (header != undefined) {
          header.innerHTML = data.location.name;
        }
        console.log(data);
        const day: string = data.current.is_day == 1 ? "day" : "night";
        const weatherCode: any = weatherConditions.find(
          (o) => o.code === data.current.condition.code
        );
        const icon: number = weatherCode?.icon;
        const localDate = data.location.localtime.split(" ")[0];
        const date = new Date(localDate);
        const formattedDate = `${days[date.getUTCDay()]}, ${
          months[date.getUTCMonth()]
        } ${date.getUTCDate()}`;
        const temp = data.current.temp_f + "°";
        const feelsTemp = data.current.feelslike_f + "°";
        const humidity = data.current.humidity + "%";
        const rain =
          data.forecast.forecastday[0].day.daily_chance_of_rain + "%";
        const wind = data.current.wind_mph + " MPH " + data.current.wind_dir;
        const condition = {
          date: formattedDate,
          temp: temp,
          feelsTemp: feelsTemp,
          humidity: humidity,
          rain: rain,
          wind: wind,
        };
        console.log(condition);
        setCondition(condition);
        setImage(`./images/weather/${day}/${icon}.svg`);
      });
  }

  function UpdateLocation(e: React.ChangeEvent<HTMLInputElement>) {
    setLocation(e.target.value);
  }

  async function GetWeather() {
    try {
      var input: HTMLInputElement = document.getElementById(
        "location-input"
      ) as HTMLInputElement;
      fetchCondition();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <header className="header">
        <div className="location-input-container">
          <img
            className="location-icon"
            src={"./images/location-point-white.svg"}
          ></img>
          <input
            id="location-input"
            className="location-input"
            placeholder={location}
            onChange={UpdateLocation}
          ></input>
          <button className="location-btn" onClick={GetWeather}>
            Go
          </button>
        </div>
        <div className="unit-switcher"></div>
      </header>

      <main className="hero-container">
        <h2 id="location-header" className="location-header">
          New York
        </h2>
        <h2 className="date-header">{condition.date}</h2>
        <div className="weather-main">
          <img className="weather-main-icon" src={image} />
          <div className="weather-main-temp-container">
            <h3 className="weather-main-temp">{condition.temp}</h3>
            <h3 className="weather-main-feels-like">
              Feels Like {condition.feelsTemp}
            </h3>
          </div>
        </div>
        <div className="weather-main-stats-container">
          <div className="weather-main-stats">
            <p className="weather-main-stats-header">Humidity</p>{" "}
            <p className="weather-main-stats-info">{condition.humidity}</p>
          </div>
          <div className="weather-main-stats">
            <p className="weather-main-stats-header">Rain</p>{" "}
            <p className="weather-main-stats-info">{condition.rain}</p>
          </div>
          <div className="weather-main-stats">
            <p className="weather-main-stats-header">Wind</p>{" "}
            <p className="weather-main-stats-info">{condition.wind}</p>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;

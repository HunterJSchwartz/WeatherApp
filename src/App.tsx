import "./styles/App.css";
import { useEffect, useState } from "react";
import LocationInput from "./components/LocationInput";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";

function App() {
  const DEFAULT_LOCATION = "Paris";
  const FORECAST_DAYS = "4";

  const [weather, setWeather] = useState();
  const [unit, setUnit] = useState("Imperial");

  useEffect(() => {
    GetWeather(DEFAULT_LOCATION);
  }, []);

  function GetWeather(location: string): void {
    const baseURL = "http://api.weatherapi.com/v1/forecast.json?";
    const params = new URLSearchParams({
      key: "09cedaf909184f7e9cb51126232305",
      q: location,
      days: FORECAST_DAYS,
    });

    fetch(baseURL + params).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          setWeather(data);
        });
      } else {
        console.log("WEEEE WOOO WEEE WOO  : " + response.status);
      }
    });
  }

  return (
    <>
      <header className="header">
        <LocationInput GetWeather={GetWeather} />
        <div className="unit-switcher"></div>
      </header>
      <main className="hero-container">
        <CurrentWeather weather={weather} />
        <Forecast weather={weather} />
      </main>
    </>
  );
}

export default App;

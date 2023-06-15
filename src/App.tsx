import "./styles/App.css";
import { useEffect, useState } from "react";
import UnitSwitcher from "./components/UnitSwitcher";
import LocationInput from "./components/LocationInput";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import GetWeather from "./scripts/Weather";

function App() {
  const DEFAULT_LOCATION = "Paris";
  const FORECAST_DAYS = "3";

  const [weather, setWeather] = useState();
  const [forecast, setForecast] = useState();
  const [unit, setUnit] = useState("Imperial");
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [error, setError] = useState("");

  useEffect(() => {
      UpdateWeather(DEFAULT_LOCATION);
   }, []);

  async function UpdateWeather(location: string, newUnit?: string){
    if(newUnit === undefined) {
        try {
            const {currentWeather, forecastWeather} = await GetWeather(location, unit, FORECAST_DAYS);
            setWeather(currentWeather);
            setForecast(forecastWeather);
            setError("");
        }
        catch(e) {
            setError("Invalid Location");
        }
    }
    else {
        try {
            const {currentWeather, forecastWeather} = await GetWeather(location, newUnit, FORECAST_DAYS);
            setWeather(currentWeather);
            setForecast(forecastWeather);
            setError("");
        }
        catch(e) {
            setError("Invalid Location");
        }
    }
  }

  function UpdateUnit(unit: string) {
    setUnit(unit);
    UpdateWeather(location, unit);
  }

  return (
    <>
      <header className="header">
        <LocationInput error={error} UpdateLocation={setLocation} UpdateWeather={UpdateWeather} />
        <UnitSwitcher unit={unit} UpdateUnit={UpdateUnit}/>
      </header>
      <main className="hero-container">
        <CurrentWeather weather={weather} />
        <Forecast forecast={forecast} />
      </main>
    </>
  );
}

export default App;

export default function CurrentWeather({ weather }: any) {

  if (weather === undefined) {
    return <></>;
  }

  return (
    <>
        <h2 id="location-header" className="location-header">
            {weather.location}
        </h2>
        <h2 className="date-header">{weather.date}</h2>
        <div className="weather-main">
            <img className="weather-main-icon" src={weather.image} alt="Weather condition" /> 
            <div className="weather-main-temp-container">
                <h3 className="weather-main-temp">{weather.temp}</h3>{" "}
                <h3 className="weather-main-feels-like">Feels Like {weather.feelsTemp}</h3>
            </div>
        </div>
        <div className="weather-main-stats-container">
            <div className="weather-main-stats">
              <p className="weather-main-stats-header">Humidity</p>
              <p className="weather-main-stats-info">{weather.humidity}</p>
            </div>
            <div className="weather-main-stats">
              <p className="weather-main-stats-header">Rain</p>
              <p className="weather-main-stats-info">{weather.rain}</p>
            </div>
            <div className="weather-main-stats">
              <p className="weather-main-stats-header">Wind</p>
              <p className="weather-main-stats-info">{weather.wind}</p>
            </div>
        </div>
    </>
  );
}

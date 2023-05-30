import { weatherConditions } from "../WeatherConditions";

function Forecast({ weather }: any) {
  const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  if (weather == undefined) {
    return <></>;
  }

  function ForecastDay() {
    let stats: any = [];
    for (var i = 1; i < 4; i++) {
      const localDate = weather.forecast.forecastday[i].date.split(" ")[0];
      const date = new Date(localDate);
      const day = DAYS[date.getUTCDay()];
      const min: string =
        Math.round(weather.forecast.forecastday[i].day.mintemp_f).toString() +
        "°";
      const max: string =
        Math.round(weather.forecast.forecastday[i].day.maxtemp_f).toString() +
        "°";
      const temps = min + " / " + max;
      const weatherCode: any = weatherConditions.find(
        (o) => o.code === weather.forecast.forecastday[i].day.condition.code
      );
      const icon: number = weatherCode?.icon;
      const image = `./images/weather/day/${icon}.svg`;
      stats.push({
        day: day,
        temps: temps,
        image: image,
      });
    }

    return (
      <div className="weather-forecast-container">
        {stats.map((stat: any) => {
          return (
            <div key={stat.day} className="weather-forecast-days">
              <p className="weather-main-stats-header">{stat.day}</p>
              <img className="weather-forecast-icon" src={stat.image}></img>
              <p className="weather-main-stats-info">{stat.temps}</p>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <>
      <ForecastDay />
    </>
  );
}

export default Forecast;

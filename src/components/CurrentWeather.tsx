import { weatherConditions } from "../WeatherConditions";

function CurrentWeather({ weather }: any) {
  const DAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const MONTHS = [
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

  function WeatherHeader() {
    const localDate = weather?.location?.localtime.split(" ")[0];
    const date = new Date(localDate);
    const formattedDate = `${DAYS[date.getUTCDay()]}, ${
      MONTHS[date.getUTCMonth()]
    } ${date.getUTCDate()}`;
    return (
      <>
        <h2 id="location-header" className="location-header">
          {weather.location.name}
        </h2>
        <h2 className="date-header">{formattedDate}</h2>
      </>
    );
  }

  function WeatherImage() {
    const day: string = weather?.current?.is_day == 1 ? "day" : "night";
    const weatherCode: any = weatherConditions.find(
      (o) => o.code === weather.current.condition.code
    );
    const icon: number = weatherCode?.icon;
    const image = `./images/weather/${day}/${icon}.svg`;
    return <img className="weather-main-icon" src={image} />;
  }

  function Temp() {
    const temp = weather.current.temp_f + "°";
    const feelsTemp = weather.current.feelslike_f + "°";
    return (
      <div className="weather-main-temp-container">
        <h3 className="weather-main-temp">{temp}</h3>{" "}
        <h3 className="weather-main-feels-like">Feels Like {feelsTemp}</h3>
      </div>
    );
  }

  function WeatherStats() {
    const stats = [
      { title: "Humidity", stat: weather.current.humidity + "%" },
      {
        title: "Rain",
        stat: weather.forecast.forecastday[0].day.daily_chance_of_rain + "%",
      },
      {
        title: "Wind",
        stat: weather.current.wind_mph + " MPH " + weather.current.wind_dir,
      },
    ];

    return (
      <div className="weather-main-stats-container">
        {stats.map((stat) => {
          return (
            <div key={stat.title} className="weather-main-stats">
              <p className="weather-main-stats-header">{stat.title}</p>
              <p className="weather-main-stats-info">{stat.stat}</p>
            </div>
          );
        })}
      </div>
    );
  }

  if (weather == undefined) {
    return <></>;
  }

  return (
    <>
      <WeatherHeader />
      <div className="weather-main">
        <WeatherImage />
        <Temp />
      </div>
      <WeatherStats />
    </>
  );
}

export default CurrentWeather;

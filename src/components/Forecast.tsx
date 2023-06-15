export default function Forecast({ forecast }: any) {

  if (forecast === undefined) {
      return <></>;
  }

  return (
      <div className="weather-forecast-container">
        {forecast.map((day: any) => {
          return (
            <div key={day.day} className="weather-forecast-days">
              <p className="weather-main-stats-header">{day.day}</p>
              <img className="weather-forecast-icon" src={day.image}></img>
              <p className="weather-main-stats-info">{day.temps}</p>
            </div>
          );
        })}
      </div>
  );
}

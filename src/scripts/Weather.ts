import { weatherConditions } from "../scripts/WeatherConditions";

const DEGREES = "°";

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

export default function GetWeather(location: string, unit: string, forecastDays: string): any {
    let data = GetFormattedData(location, unit, forecastDays);
    return data;
}

async function GetRawData(location: string, forecastDays: string) {
    const baseURL = "https://api.weatherapi.com/v1/forecast.json?";
    const params = new URLSearchParams({
      key: "09cedaf909184f7e9cb51126232305",
      q: location,
      days: forecastDays,
    });
   
    const response = await fetch(baseURL + params);
    let data;
    if (response.status === 200) {
        data = await response.json();
        return data;
    }
    else {
        return undefined;
    }
}

async function GetFormattedData(location: string, unit: string, forecastDays: string) {
    let data = await GetRawData(location, forecastDays) as any;
    if(data === undefined) {
        return undefined;
    }
    let {
        location: { name, localtime },
        current: { condition, temp_f, feelslike_f, temp_c, feelslike_c, humidity, 
                    wind_dir, wind_mph, wind_kph, is_day},
        forecast: {forecastday},
    } = data;
    const currentWeather = {
        location: name,
        date: FormatDate(localtime),
        image: GetImage(is_day, condition.code),
        temp: (unit === "Imperial") ? `${temp_f}${DEGREES}` : `${temp_c}${DEGREES}` ,
        feelsTemp: (unit === "Imperial") ? `${feelslike_f}${DEGREES}` : `${feelslike_c}${DEGREES}`,
        humidity: humidity + "%",
        rain: forecastday[0].day.daily_chance_of_rain + "%",
        wind: FormatWind(unit, wind_dir, wind_mph, wind_kph),
    }

    let forecastWeather:any = [];
    const days = forecastday.length;
    for(let i = 0; i < days; i++) {
        const minTemp = (unit === "Imperial") ? forecastday[i].day.mintemp_f : forecastday[i].day.mintemp_c;
        const maxTemp = (unit === "Imperial") ? forecastday[i].day.maxtemp_f : forecastday[i].day.maxtemp_c;
        const temps = `${Math.round(minTemp)}${DEGREES} / ${Math.round(maxTemp)}${DEGREES}`;

        const weatherCode: any = weatherConditions.find(
            (o) => o.code === forecastday[i].day.condition.code
        );
        const icon: number = weatherCode.icon;
        const image = `./images/weather/day/${icon}.svg`;

        const localDate = forecastday[i].date.split(" ")[0];
        const date = new Date(localDate);
        const day = (i === 0) ? "Today" : DAYS[date.getUTCDay()];
        forecastWeather.push({ day: day, image: image, temps: temps });
    }

    return {currentWeather, forecastWeather};
}

function FormatDate(date: string): string {
    date = date.split(" ")[0];
    const dateObj = new Date(date);
    const formattedDate = `${DAYS[dateObj.getUTCDay()]}, ${
      MONTHS[dateObj.getUTCMonth()]
    } ${dateObj.getUTCDate()}`;
    return formattedDate;
}

function GetImage(is_day: number, code: number): string {
    const day: string = (is_day === 1) ? "day" : "night";
    const weatherCondition: any = weatherConditions.find(
      (o) => o.code === code
    );
    const icon: number = weatherCondition.icon;
    const image = `./images/weather/${day}/${icon}.svg`;
    return image;
}

function FormatWind(unit: string, windDir: string, windMPH: string, windKPH: string): string {
    if(unit === "Imperial") {
        return `${windMPH} MPH ${windDir}`;
    }
    else {
        return `${windKPH} KPH ${windDir}`;
    }
}

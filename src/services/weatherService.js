import { DateTime } from "luxon";

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = process.env.REACT_APP_BASE_URL;

const getWeatherData = (infoType, searchParams) => {
  const url = new URL(`${BASE_URL}/${infoType}`);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });
  return fetch(url).then((res) => res.json());
};
const formatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;

  const { main: details, icon } = weather[0];
  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    details,
    icon,
    speed,
  };
};

const formatForecastWeather = (data) => {
  let { timezone, daily, hourly, city, list } = data;
  timezone = city.timezone;
  hourly = list.slice(0, 5).map((d) => {
    return {
      title: d.dt_txt.split(" ")[1].slice(0, -3),
      icon: d.weather[0].icon,
      temp: d.main.temp,
    };
  });

  daily = list
    .map((element, index) => {
      if ((index + 1) % 8 === 0) {
        return element;
      } else {
        return null;
      }
    })
    .filter((element) => element !== null)
    .map((d) => {
      return {
        title: new Date(d.dt_txt).toLocaleDateString("en-US", {
          weekday: "short",
        }),
        temp: d.main.temp,
        icon: d.weather[0].icon,
      };
    });
  return { timezone, daily, hourly };
};

const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData(
    "weather",
    searchParams
  ).then(formatCurrentWeather);
  const { lat, lon } = formattedCurrentWeather;
  const formattedForecastWeather = await getWeatherData("forecast", {
    lat,
    lon,
    exclude: "current,minutely,alerts",
    units: searchParams.units,
  }).then(formatForecastWeather);
  return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

const formatToLocalTime = (dtValue, timezoneValue) => {
  const dtObj = DateTime.fromSeconds(dtValue);
  const dtObjWithOffset = dtObj.setZone(
    `UTC${timezoneValue >= 0 ? "+" : ""}${timezoneValue / 3600}`
  );
  const formattedDt = dtObjWithOffset.toLocaleString(DateTime.DATETIME_FULL);
  return formattedDt;
};

const iconUrlFromCode = (code) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;
export { formatToLocalTime, iconUrlFromCode };

import React from "react";
import "./TemperatureAndDetails.css";
import {
  UilArrowUp,
  UilArrowDown,
  UilTemperature,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
} from "@iconscout/react-unicons";
import {
  formatToLocalTime,
  iconUrlFromCode,
} from "../../services/weatherService";

const TemperatureAndDetails = ({
  weather: {
    details,
    icon,
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like,
    timezone,
  },
}) => {
  return (
    <div className="temperatureanddetails">
      <h2 className="first-row">{details}</h2>
      <div className="second-row">
        <img src={iconUrlFromCode(icon)} alt="" />
        <h1 className="temp">{`${temp.toFixed()}°`}</h1>
        <div>
          <div>
            <UilTemperature />
            Real feel:<span>{`${feels_like.toFixed()}°`}</span>
          </div>
          <div>
            <UilTear />
            Humidity:<span>{`${humidity.toFixed()}%`}</span>
          </div>
          <div>
            <UilWind />
            Wind:<span>{`${speed.toFixed()}km/h`}</span>
          </div>
        </div>
      </div>
      <div className="third-row">
        <div>
          <UilSun />
          <p>
            {`Rise: ${formatToLocalTime(sunrise, timezone).split(" ")[4]} ${
              formatToLocalTime(sunrise, timezone).split(" ")[5]
            } |`}
          </p>
          <UilSun />
          <p>
            {`Set: ${formatToLocalTime(sunset, timezone).split(" ")[4]} ${
              formatToLocalTime(sunset, timezone).split(" ")[5]
            }`}
          </p>
        </div>

        <div>
          <UilSun />
          <p>{`High: ${temp_max.toFixed()}° |`}</p>
          <UilSun />
          <p>{`Min: ${temp_min.toFixed()}° `}</p>
        </div> 
      </div>
    </div>
  );
};

export default TemperatureAndDetails;

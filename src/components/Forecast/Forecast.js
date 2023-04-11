import React from "react";
import "./Forecast.css";
import { iconUrlFromCode } from "../../services/weatherService"; 
const Forecast = ({ title, items }) => { 
  return (
    <div className="forecast">
      <h1>{title}</h1>
      <hr></hr>
      <div className="days">
        {items.map((item) => {
          return (
            <div className="day">
              <h4>{item.title}</h4>
              <img src={iconUrlFromCode(item.icon)} />
              <h4>{`${item.temp.toFixed()}°`}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;

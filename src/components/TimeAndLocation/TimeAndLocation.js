import "./TimeAndLocation.css";
import { formatToLocalTime } from "../../services/weatherService";

const TimeAndLocation = ({ weather: { dt, timezone, name, country } }) => {
  return (
    <div className="timeandlocation">
      <h2 className="time">
        {formatToLocalTime(dt, timezone).split(" GMT")[0]}
      </h2>
      <h1 className="location">{`${name}, ${country}`}</h1>
    </div>
  );
};

export default TimeAndLocation;

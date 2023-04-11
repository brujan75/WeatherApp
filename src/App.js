import { useState, useEffect } from "react";
import "./App.css";
import Inputs from "./components/Inputs/Inputs";
import TimeAndLocation from "./components/TimeAndLocation/TimeAndLocation";
import TemperatureAndDetails from "./components/TemperatureAndDetails/TemperatureAndDetails";
import Forecast from "./components/Forecast/Forecast";
import getFormattedWeatherData from "./services/weatherService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SyncLoader from "react-spinners/SyncLoader";
function App() {
  const [query, setQuery] = useState();
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      await getFormattedWeatherData({ ...query, units }).then((data) => {
        toast.success(
          `Successfully fetched weather for ${data.name}, ${data.country}`
        );
        setWeather(data);
      });
    };
    fetchWeather();
  }, [query, units]);

  const backgroundHandler = () => {
    if (!weather) return "null-weather";
    if (weather.details == "Thunderstorm") return "thunderstorm-weather";
    if (weather.details == "Clear") return "clear-weather";
    if (weather.details == "Clouds") return "cloud-weather";
    if (weather.details == "Rain") return "thunderstorm-weather";
    if (weather.details == "Snow") return "snow-weather";
    if (weather.details == "Haze") return "haze-weather";
    if (weather.details == "Mist") return "mist-weather";
    if (weather.details == "Fog") return "fog-weather";
  };
  return (
    <div className="app">
      <main className={backgroundHandler()}>
        <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />
        {weather ? (
          <div>
            <TimeAndLocation weather={weather} />
            <TemperatureAndDetails weather={weather} />
            <Forecast
              title="Hourly forecast"
              weather={weather}
              items={weather.hourly}
            />
            <Forecast title="Daily forecast" items={weather.daily} />
          </div>
        ) : (
          <div className="loader">
            <h2>Fetching data for user's location...</h2>
            <h3>Allow location access or search for your city manually.</h3>
            <SyncLoader color="white" size={20} />
          </div>
        )}
      </main>
      <ToastContainer autoClose={1000} theme="colored" newestOnTop={true} />
    </div>
  );
}

export default App;

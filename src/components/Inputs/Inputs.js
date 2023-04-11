import React, { useEffect, useState } from "react";
import {
  UilSearch,
  UilMapMarker,
  UilHeartAlt,
  UilTrashAlt,
  UilAngleDown,
} from "@iconscout/react-unicons";
import "./Inputs.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { FavoriteCities } from "../FavoriteCities/FavoriteCities";

const Inputs = ({ setQuery, units, setUnits }) => {
  const [city, setCity] = useState("");
  const { addCity, deleteCity } = FavoriteCities();
  const cities = Object.values(
    JSON.parse(localStorage.getItem("cities")) || {}
  );

  useEffect(() => {
    handleLocationClick();
  }, []);

  const handleUnitsChange = (e) => {
    const selectedUnit = e.currentTarget.name;
    if (units !== selectedUnit) setUnits(selectedUnit);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearchClick();
      event.currentTarget.value = "";
    }
  };

  const handleSearchClick = () => {
    if (city !== "") {
      setQuery({ q: city });
    }
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        toast.success(`User's location fetched!`);
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        try {
          const API_KEY = process.env.REACT_APP_API_KEY;
          const BASE_URL = process.env.REACT_APP_BASE_URL;
          const response = await fetch(
            `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
          );
          const data = await response.json();
          setQuery({ q: data.city.name });
          setCity(data.city.name);
        } catch (error) {
          console.error(error);
          toast.error(`Failed to get location information`);
        }
      });
    }
  };
  const capitalizeWords = (str) => {
    return str.replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <div className="inputs">
      <input
        placeholder="Search a city..."
        className="search-bar"
        type="text"
        onChange={(e) => setCity(e.currentTarget.value)}
        onKeyPress={handleKeyPress}
      ></input>
      <div className="buttons-section">
        <div className="buttons-section1">
          <Menu
            menuButton={
              <MenuButton className="dropdown-btn">
                Favorites <UilAngleDown />
              </MenuButton>
            }
            transition
          >
            {cities.length > 0 ? (
              cities.reverse().map((city) => {
                return (
                  <div>
                    <MenuItem
                      className="favorites-element"
                      onClick={() => {
                        setQuery({ q: city.name });
                      }}
                      key={city.id}
                    >
                      {capitalizeWords(city.name)}
                      <UilTrashAlt
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteCity(city.id);
                        }}
                      />
                    </MenuItem>
                  </div>
                );
              })
            ) : (
              <MenuItem className="favorites-element">Empty list</MenuItem>
            )}
          </Menu>

          <UilHeartAlt
            className="button"
            onClick={() => {
              addCity(city);
            }}
          />
        </div>
        <div className="buttons-section2">
          <UilSearch onClick={handleSearchClick} className="button" />
          <UilMapMarker onClick={handleLocationClick} className="button" />
        </div>
        <div className="buttons-section3">
          <button onClick={handleUnitsChange} name="metric" className="button">
            °C
          </button>
          <p>|</p>
          <button
            onClick={handleUnitsChange}
            name="imperial"
            className="button"
          >
            °F
          </button>
        </div>
      </div>
    </div>
  );
};

export default Inputs;

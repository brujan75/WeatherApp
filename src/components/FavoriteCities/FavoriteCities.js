import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

function FavoriteCities() {
  const [favoriteCit, setFavoriteCit] = useState({});
  let cities = JSON.parse(localStorage.getItem("cities")) || {};

  const capitalizeWords = (str) => {
    return str.replace(/\b\w/g, (l) => l.toUpperCase());
  };
  function addCity(name) {
    if (Object.keys(cities).length >= 6) {
      toast.warning("Maximum number of cities reached");
      return;
    }
    const existingCity = Object.values(cities).find((c) => c.name === name);

    if (existingCity) {
      toast.warning(`${capitalizeWords(name)}  already exists in the list`);
      return;
    }

    const id = uuidv4().slice(0, 8);
    const newCity = { name: name, id: id };
    cities[id] = newCity;
    localStorage.setItem("cities", JSON.stringify(cities));
    setFavoriteCit({ ...favoriteCit, [id]: { name, id } });
    toast.success(`${capitalizeWords(name)} was added to the favorite list`);
    return favoriteCit;
  }

  function deleteCity(id) {
    const newFavCit = Object.keys(cities)
      .filter((key) => cities[key].id !== id)
      .reduce((obj, key) => {
        obj[key] = cities[key];
        return obj;
      }, {});
    setFavoriteCit(newFavCit);
    localStorage.setItem("cities", JSON.stringify(newFavCit));
    toast.success(`City deleted from the favorite list`);
  }
  return {
    addCity,
    deleteCity,
  };
}
export { FavoriteCities };

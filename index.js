import { storage } from "./modules/storage.js";
import {
  convertFromKelvin,
  getActualTime,
  userInterface,
} from "./modules/utils.js";
import { getData } from "./modules/getData.js";
import { getDataOfForecast, createForecast } from "./modules/forecast.js";

const {
  FORM,
  INPUT,
  CHOSEN_CITY,
  TEMPERATURE_NOW,
  WEATHER_ICON,
  CHOSEN_CITY_DETAILS,
  TEMPERATURE_NOW_DETAILS,
  TEMP_FEELS_LIKE_DETAILS,
  WEATHER_DETAILS,
  SUNRISE_DETAILS,
  SUNSET_DETAILS,
  CITIES_LIST,
  LIKE_BUTTON,
  DEFAULT_VALUE,
  CHOSEN_CITY_FORECAST,
} = userInterface;

const FAVORITE_CITIES = storage.getFavoriteCities(["Moscow", "Voronezh"]);
const CURRENT_CITY = storage.getCurrentCity("Moscow");

let favoriteCities = [];

function getStorageInfo() {
  FAVORITE_CITIES !== null
    ? (favoriteCities = [...FAVORITE_CITIES])
    : favoriteCities;
  setCityInfo(CURRENT_CITY);
  renderCities(favoriteCities);
}

getStorageInfo();

FORM.addEventListener("submit", formHandler);

function formHandler() {
  let cityName = INPUT.value;
  setCityInfo(cityName);
  INPUT.value = DEFAULT_VALUE;
}

async function setCityInfo(cityName) {
  try {
    let result = await getData(cityName);
    let resultForecast = await getDataOfForecast(cityName);

    let apiCityName = result.name;
    let apiCityTemp = result.main.temp;
    let apiCityFeelsLike = result.main.feels_like;
    let apiCityWeather = result.weather[0].main;
    let apiCitySunrise = result.sys.sunrise;
    let apiCitySunset = result.sys.sunset;
    let apiCityTimeDifference = result.timezone;

    let ForecastApiCityName = resultForecast.city.name;

    CHOSEN_CITY.textContent = apiCityName;
    CHOSEN_CITY_DETAILS.textContent = apiCityName;
    CHOSEN_CITY_FORECAST.textContent = ForecastApiCityName;
    TEMPERATURE_NOW.textContent = convertFromKelvin(apiCityTemp);
    TEMPERATURE_NOW_DETAILS.textContent =
      "Temperature: " + convertFromKelvin(apiCityTemp) + "°";
    TEMP_FEELS_LIKE_DETAILS.textContent =
      "Feels like: " + convertFromKelvin(apiCityFeelsLike) + "°";
    WEATHER_DETAILS.textContent = "Weather: " + apiCityWeather;
    SUNRISE_DETAILS.textContent =
      "Sunrise: " + getActualTime(apiCitySunrise, apiCityTimeDifference);
    SUNSET_DETAILS.textContent =
      "Sunset: " + getActualTime(apiCitySunset, apiCityTimeDifference);

    const ICON_URL = `https://openweathermap.org/img/wn/${result.weather[0].icon}.png`;
    WEATHER_ICON.src = ICON_URL;

    createForecast(resultForecast);

    storage.saveCurrentCity(apiCityName);
  } catch (e) {
    alert(e);
  }
}

LIKE_BUTTON.addEventListener("click", clickAddHandler);

function clickAddHandler() {
  const actualCityName = CHOSEN_CITY.textContent;
  addCity(actualCityName);
}

function addCity(cityName) {
  favoriteCities.includes(cityName)
    ? alert("Этот город уже есть в избранных")
    : favoriteCities.push(cityName);

  storage.saveFavoriteCities(favoriteCities);
  renderCities(favoriteCities);
}

function renderCities(favoriteCities) {
  CITIES_LIST.textContent = DEFAULT_VALUE;
  favoriteCities.map((item) => {
    let li = document.createElement("li");
    li.classList.add("list_el");
    li.textContent = item;
    let closeBtn = document.createElement("button");
    closeBtn.classList.add("fa-solid");
    closeBtn.classList.add("fa-xmark");
    li.append(closeBtn);
    CITIES_LIST.append(li);
  });
}

CITIES_LIST.addEventListener("click", (e) => {
  const clickEl = e.target;
  const parentOfClickEl = e.target.parentNode;
  const isDeleteButton = clickEl.classList.contains("fa-solid");
  const isCityElement = clickEl.classList.contains("list_el");

  if (isDeleteButton) {
    deleteCity(parentOfClickEl);
  } else if (isCityElement) {
    setCityInfo(clickEl.textContent);
  } else {
    return "";
  }
});

function deleteCity(cityName) {
  favoriteCities = favoriteCities.filter(
    (city) => city !== cityName.textContent
  );
  storage.saveFavoriteCities(favoriteCities);
  renderCities(favoriteCities);
}

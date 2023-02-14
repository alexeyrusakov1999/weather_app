export const userInterface = {
  FORM: document.querySelector(".forecast-form"),
  INPUT: document.querySelector(".input"),
  CHOSEN_CITY: document.querySelector(".forecast-months-text"),
  TEMPERATURE_NOW: document.querySelector(".degrees-num"),
  WEATHER_ICON: document.querySelector(".cloud"),
  CHOSEN_CITY_DETAILS: document.querySelector(".text-locations"),
  TEMPERATURE_NOW_DETAILS: document.querySelector(".details_temp"),
  TEMP_FEELS_LIKE_DETAILS: document.querySelector(".details_tempFeels"),
  WEATHER_DETAILS: document.querySelector(".details_weather"),
  SUNRISE_DETAILS: document.querySelector(".details_sunrise"),
  SUNSET_DETAILS: document.querySelector(".details_sunset"),
  CITIES_LIST: document.querySelector(".locations-items"),
  LIKE_BUTTON: document.querySelector(".btn_like"),
  DEFAULT_VALUE: "",
  CHOSEN_CITY_FORECAST: document.querySelectorAll(".text-locations")[1],
  TABLE_ITEMS_CONTAINER: document.querySelector(".table-items"),
  FORECAST_TABLE: document.querySelector(".forecast-table"),
};

export function convertFromKelvin(temp) {
  return Math.round(temp - 273, 15);
}

export function convertTime(timeInSeconds) {
  const date = new Date(timeInSeconds);
  return date.toLocaleTimeString();
}

export function getUTCDate(time) {
  const date = new Date(time * 1000);
  const dateOffset = date.getTimezoneOffset();
  const dateInMsec = Date.parse(date);

  const dateUtcInMs = dateInMsec + dateOffset * 60 * 1000;
  return dateUtcInMs;
}

export function getActualTime(time, timezone) {
  const utcInMs = getUTCDate(time);
  const actualTimezoneTime = utcInMs + timezone * 1000;
  return convertTime(actualTimezoneTime);
}

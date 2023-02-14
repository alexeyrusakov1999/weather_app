const TABLE_ITEMS_CONTAINER = document.querySelector(".table-items");

const SERVER_INFO = {
  SERVER_FORECAST: "http://api.openweathermap.org/data/2.5/forecast",
  API_KEY: "bf482127abed865fb28219459b23c577",
};

export async function getDataOfForecast(cityName) {
  try {
    const FUTURE_URL = `${SERVER_INFO.SERVER_FORECAST}?q=${cityName}&cnt=3&appid=${SERVER_INFO.API_KEY}&units=metric`;
    let promise = await fetch(FUTURE_URL);
    let result = await promise.json();
    console.log(result);
    return result;
  } catch (e) {
    alert(e);
  }
}

export function createForecast(data) {
  if (!data) return;

  while (TABLE_ITEMS_CONTAINER.firstChild) {
    TABLE_ITEMS_CONTAINER.removeChild(TABLE_ITEMS_CONTAINER.firstChild);
  }

  data.list.map((item) => {
    let container = document.createElement("div");
    container.classList.add("table-container");

    let dateAndTime = document.createElement("div");
    dateAndTime.classList.add("forecast-date");

    let date = document.createElement("p");
    date.classList.add("date_forecast");
    date.textContent = `${getDateOfForecast(item.dt)} ${getMonthOfForecast(
      item.dt
    )}`;

    let time = document.createElement("p");
    time.classList.add("time_forecast");
    time.textContent = `${getTimeOfForecast(item.dt)}`;

    dateAndTime.append(date);
    dateAndTime.append(time);

    let weather = document.createElement("div");
    weather.classList.add("forecast-weather");

    let temperature = document.createElement("div");
    temperature.classList.add("forecast-temperature");

    let actualTemp = document.createElement("p");
    actualTemp.textContent = `Temperature: ${convertTemp(item.main.temp)}°`;

    let tempFeelsLike = document.createElement("p");
    tempFeelsLike.classList.add("temp_feelslike");
    tempFeelsLike.textContent = `Feels like: ${convertTemp(
      item.main.feels_like
    )}°`;

    temperature.append(actualTemp);
    temperature.append(tempFeelsLike);

    let weatherDescription = document.createElement("div");
    weatherDescription.classList.add("weather-icon");

    let stateOfWeather = document.createElement("p");
    stateOfWeather.textContent = `${item.weather[0].main}`;

    let weatherImage = document.createElement("img");
    weatherImage.classList.add("img_state");
    weatherImage.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`
    );

    weatherDescription.append(stateOfWeather);
    weatherDescription.append(weatherImage);

    weather.append(temperature);
    weather.append(weatherDescription);

    container.append(dateAndTime);
    container.append(weather);
    TABLE_ITEMS_CONTAINER.append(container);
  });
}

function getDateOfForecast(dateInSec) {
  const date = new Date(dateInSec * 1000);
  const actualDate = date.getDate();
  return actualDate;
}

function getMonthOfForecast(dateInSec) {
  const date = new Date(dateInSec * 1000);
  return date.toLocaleString("eng", { month: "short" });
}

function getTimeOfForecast(dateInSec) {
  const date = new Date(dateInSec * 1000);
  return date.toLocaleString("ru", { time: "short" }).slice(12, 17);
}

function convertTemp(temp) {
  return Math.round(temp);
}

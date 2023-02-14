const SERVER_URL = "http://api.openweathermap.org/data/2.5/weather";
const API_KEY = "0aa49c9f04fc4938918fda959bdb7283";

export async function getData(cityName) {
  try {
    const URL = `${SERVER_URL}?q=${cityName}&appid=${API_KEY}`;
    let promise = await fetch(URL);
    let result = await promise.json();
    return result;
  } catch (e) {
    alert(e);
  }
}

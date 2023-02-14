export const storage = {
  saveFavoriteCities: function (favoriteCities) {
    localStorage.setItem("favoriteCities", JSON.stringify(favoriteCities));
  },
  getFavoriteCities: function () {
    return localStorage.getItem("favoriteCities") !== "undefined"
      ? JSON.parse(localStorage.getItem("favoriteCities"))
      : ["Moscow", "Voronezh"];
  },
  saveCurrentCity: function (currentCity) {
    localStorage.setItem("currentCity", JSON.stringify(currentCity));
  },
  getCurrentCity: function () {
    return localStorage.getItem("currentCity") !== "undefined"
      ? JSON.parse(localStorage.getItem("currentCity"))
      : "Moscow";
  },
};

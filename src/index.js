function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentDay = days[date.getDay()];
  let currentHours = date.getHours();
  let currentMinutes = date.getMinutes();
  currentMinutes = currentMinutes < 10 ? "0" + currentMinutes : currentMinutes;
  let formattedDate = ` ${currentDay} ${currentHours}:${currentMinutes}`;
  console.log(formattedDate);

  return formattedDate;
}
let todayDate = new Date();
document.getElementById("date").innerHTML = formatDate(todayDate);

function showTemperature(response) {
  document.getElementById("temperature-now").innerHTML = Math.round(
    response.data.main.temp
  );
  document.getElementById("city-name").innerHTML = response.data.name;
  document.getElementById("weather-description").innerHTML =
    response.data.weather[0].description;
  document.getElementById("celsius-link").innerHTML = "°C";
  document.getElementById("humidity-description").innerHTML =
    response.data.main.humidity;
  document.getElementById("wind-description").innerHTML =
    response.data.wind.speed;
  let currentIcon = document.querySelector("#current-icon");
  currentIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function findPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "8c9200a40049e7bb8503a1495379e720";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function clickForPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findPosition);
}
let locationNow = document.querySelector("#location-now");
locationNow.addEventListener("click", clickForPosition);
function showNewTemperature(response) {
  document.getElementById("temperature-now").innerHTML = Math.round(
    response.data.main.temp
  );
  document.getElementById("city-name").innerHTML = response.data.name;
  document.getElementById("weather-description").innerHTML =
    response.data.weather[0].description;
  document.getElementById("celsius-link").innerHTML = "°C";
  document.getElementById("humidity-description").innerHTML =
    response.data.main.humidity;
  document.getElementById("wind-description").innerHTML =
    response.data.wind.speed;
  let currentIcon = document.querySelector("#current-icon");
  currentIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function findNewLocation(position) {
  position.preventDefault();
  let cityName = document.getElementById("search-box").value;
  let apiKey = "8c9200a40049e7bb8503a1495379e720";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&&units=metric`;
  axios.get(apiUrl).then(showNewTemperature);
}

let searchEngine = document.querySelector("#search-engine");
searchEngine.addEventListener("submit", findNewLocation);

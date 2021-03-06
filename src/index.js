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

  return formattedDate;
}
let todayDate = new Date();
document.getElementById("date").innerHTML = formatDate(todayDate);

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let currentMinutes = date.getMinutes();
  currentMinutes = currentMinutes < 10 ? "0" + currentMinutes : currentMinutes;
  return `${hours}:${currentMinutes}`;
}

function showTemperature(response) {
  celsiusTemperature = response.data.main.temp;
  document.getElementById("temperature-now").innerHTML = Math.round(
    response.data.main.temp
  );
  document.getElementById("city-name").innerHTML = response.data.name;
  document.getElementById("weather-description").innerHTML =
    response.data.weather[0].description;
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
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function clickForPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findPosition);
}
let locationNow = document.querySelector("#location-now");
locationNow.addEventListener("click", clickForPosition);

function showNewTemperature(response) {
  celsiusTemperature = response.data.main.temp;
  document.getElementById("temperature-now").innerHTML = Math.round(
    response.data.main.temp
  );
  document.getElementById("city-name").innerHTML = response.data.name;
  document.getElementById("weather-description").innerHTML =
    response.data.weather[0].description;
  document.getElementById("humidity-description").innerHTML =
    response.data.main.humidity;
  document.getElementById("wind-description").innerHTML =
    response.data.wind.speed;
  let currentIcon = document.querySelector("#current-icon");
  currentIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;
  for (let index = 0; index < 6; index++) {
    let forecast = response.data.list[index];
    forecastElement.innerHTML += `<div class="col-sm-2">
            <span id="future-time">${formatHours(
              forecast.dt * 1000
            )}</span> <br /><span class="gridText"
              ><strong id="high-temp">${Math.round(
                forecast.main.temp_max
              )}°</strong> / <span id="low-temp">${Math.round(
      forecast.main.temp_min
    )}°</span> <br />
              <img id="current-icon" src="https://openweathermap.org/img/wn/${
                forecast.weather[0].icon
              }@2x.png"><br /></span>
          </div>`;
  }
}
function findNewLocation(position) {
  position.preventDefault();
  let cityName = document.getElementById("search-box").value;
  let apiKey = "8c9200a40049e7bb8503a1495379e720";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&&units=metric`;
  axios.get(apiUrl).then(showNewTemperature);
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

let searchEngine = document.querySelector("#search-engine");
searchEngine.addEventListener("submit", findNewLocation);

let celsiusTemperature = null;

function showTemperatureinF(event) {
  event.preventDefault();
  let temperatureNow = document.querySelector("#temperature-now");
  celsiusLink.classList.remove("active");
  farenheitLink.classList.add("active");
  let farenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  temperatureNow.innerHTML = Math.round(farenheitTemp);
}

let farenheitLink = document.querySelector("#fahrenheit-link");
farenheitLink.addEventListener("click", showTemperatureinF);

function showTemperatureInC(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  farenheitLink.classList.remove("active");
  let temperatureNow = document.querySelector("#temperature-now");
  temperatureNow.innerHTML = Math.round(celsiusTemperature);
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showTemperatureInC);

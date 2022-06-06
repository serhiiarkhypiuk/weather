const block = document.getElementById("weather");
const input = document.getElementById("cityInput");

async function fetchWeather(cityName, units = "metric") {
  block.innerHTML = `
    <div class="weather__loading">
      <img src="./img/loading.svg" alt="Loading..." />
    </div>`;

  const apiKey = "c37cf2462181449872f58fc1307268b9";
  const baseUrl = "https://api.openweathermap.org/data/2.5/weather?";

  const response = await fetch(
    `${baseUrl}q=${cityName}&units=${units}&appid=${apiKey}`
  );
  const responseResult = await response.json();

  if (response.ok) {
    getWeather(responseResult);
  }
  if (responseResult.message === "city not found") {
    block.innerHTML = `
    <span class="error">We can't find such city 🥲 </span>`;
  }
}

function getWeather(data) {
  const location = data.name;
  const temp = Math.round(data.main.temp);
  const feelsLike = Math.round(data.main.feels_like);
  const weatherStatus = data.weather[0].main;
  const weatherIcon = data.weather[0].icon;

  const template = `
    <div class="weather__status"><img src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="${weatherStatus}" /><span> in ${location}</span></div>
    <div class="weather__temp">Temperature is ${temp}&#8451; and it feels like ${feelsLike}&#8451;</div>
  `;

  block.innerHTML = template;
}

let timeout = null;

input.addEventListener("keyup", function (e) {
  clearTimeout(timeout);
  if (!input.value) {
    block.innerHTML = ``;
    return;
  }

  timeout = setTimeout(() => {
    fetchWeather(input.value);
  }, 1000);
});

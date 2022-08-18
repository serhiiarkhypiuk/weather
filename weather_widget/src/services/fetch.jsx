function getWeather(cityName, units = "metric") {
  const apiKey = "c37cf2462181449872f58fc1307268b9";

  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}&appid=${apiKey}`
  ).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`We can't find such city 🥲`));
  });
}
const api = { getWeather };
export default api;

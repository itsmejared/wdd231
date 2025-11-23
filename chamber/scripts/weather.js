const apiKey = "0249d5c8c6b7aefdbf9a9d3ef00781d3";
const city = "Lima";

// ==========================================
// CURRENT WEATHER
// ==========================================
async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();

  const sunrise = new Date(data.sys.sunrise * 1000)
    .toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

  const sunset = new Date(data.sys.sunset * 1000)
    .toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

  document.getElementById("cw-temp").textContent =
    `${Math.round(data.main.temp)}°F`;
  document.getElementById("cw-desc").textContent =
    capitalize(data.weather[0].description);
  document.getElementById("cw-high").textContent =
    `${Math.round(data.main.temp_max)}°F`;
  document.getElementById("cw-low").textContent =
    `${Math.round(data.main.temp_min)}°F`;
  document.getElementById("cw-hum").textContent =
    `${data.main.humidity}`;
  document.getElementById("cw-sunrise").textContent = sunrise;
  document.getElementById("cw-sunset").textContent = sunset;
}

// ==========================================
// 3-DAY FORECAST
// ==========================================
async function getForecast() {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();

  const forecastContainer = document.getElementById("forecast-list");

  const list = data.list
    .filter(x => x.dt_txt.includes("12:00:00"))
    .slice(0, 3);

  const today = "Today";
  const dayNames = list.map(item => {
    const date = new Date(item.dt_txt);
    return date.toLocaleDateString("en-US", { weekday: "long" });
  });

  forecastContainer.innerHTML = `
    <p>${today}: <strong>${Math.round(list[0].main.temp)}°F</strong></p>
    <p>${dayNames[1]}: <strong>${Math.round(list[1].main.temp)}°F</strong></p>
    <p>${dayNames[2]}: <strong>${Math.round(list[2].main.temp)}°F</strong></p>
  `;
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

getWeather();
getForecast();

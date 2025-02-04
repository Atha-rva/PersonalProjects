// Placeholder data for weather
const weatherData = {
  city: "New York",
  temperature: "25°C",
  conditions: "Sunny",
  icon: "https://via.placeholder.com/100",
};

// Select elements
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const conditions = document.getElementById("conditions");
const weatherIcon = document.getElementById("weather-icon");

// Load placeholder data
function loadWeather() {
  cityName.textContent = weatherData.city;
  temperature.textContent = weatherData.temperature;
  conditions.textContent = weatherData.conditions;
  weatherIcon.src = weatherData.icon;
}

// Initialize app
loadWeather();

// Selectors for weather details
let degree = document.querySelector(".degree");
let district = document.querySelector(".district");
let mintemp = document.querySelector(".mintemp");
let maxtemp = document.querySelector(".maxtemp");
let inputuser = document.querySelector("#cityInput");
let wind = document.querySelector(".wind");
let humidity = document.querySelector(".humidity");
let cloudy = document.querySelector(".cloudy");
let mainCondition = document.querySelector(".dominant-condition");
let updateTime = document.querySelector(".datetime");

// Temperature unit selector
let tempUnitSelector = document.querySelector("#tempUnit");

// Default temperature unit (Celsius)
let tempUnit = "Celsius";

// Conversion utility functions
const convertKelvinToCelsius = (kelvin) => (kelvin - 273.15).toFixed(1);
const convertKelvinToFahrenheit = (kelvin) => ((kelvin - 273.15) * 9/5 + 32).toFixed(1);
const convertCelsiusToFahrenheit = (celsius) => (celsius * 9/5 + 32).toFixed(1);
const convertCelsiusToKelvin = (celsius) => (parseFloat(celsius) + 273.15).toFixed(1);

// Function to update weather information on UI
let datainformationcollector = (jsonData) => {
  let temp = jsonData.main.temp; // Get temperature from JSON data
  let tempMin = jsonData.main.temp_min;
  let tempMax = jsonData.main.temp_max;
  let feelsLike = jsonData.main.feels_like;

  // Convert temperatures based on user preference
  if (tempUnit === "Celsius") {
    temp = temp.toFixed(1) + "°C";
    tempMin = tempMin.toFixed(1) + "°C";
    tempMax = tempMax.toFixed(1) + "°C";
    feelsLike = feelsLike.toFixed(1) + "°C";
  } else if (tempUnit === "Fahrenheit") {
    temp = convertCelsiusToFahrenheit(temp) + "°F";
    tempMin = convertCelsiusToFahrenheit(tempMin) + "°F";
    tempMax = convertCelsiusToFahrenheit(tempMax) + "°F";
    feelsLike = convertCelsiusToFahrenheit(feelsLike) + "°F";
  }

  district.textContent = jsonData.name;
  degree.textContent = temp; // Display converted temperature
  mintemp.textContent = tempMin;
  maxtemp.textContent = tempMax;
  humidity.textContent = jsonData.main.humidity + "%";
  wind.textContent = jsonData.wind.speed + " km/h";
  cloudy.textContent = jsonData.weather[0].description;

  mainCondition.textContent = jsonData.weather[0].main;
  let date = new Date(jsonData.dt * 1000);
  updateTime.textContent = `Last Updated: ${date.toLocaleString()}`;
  
  // Check threshold alerts
  checkThresholds(jsonData);
};

// Listen for temperature unit changes
tempUnitSelector.addEventListener("change", function () {
  tempUnit = this.value; // Update the unit preference
  let city1 = inputuser.value || "Salem"; // Default to a city (e.g., Salem) if input is empty
  let namecity = async function () {
    let data1 = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city1}&appid=4b9b8688eca407ea3546cf525c8f03cb&units=metric`
    );
    let jsonData = await data1.json();
    if (jsonData) {
      datainformationcollector(jsonData);
    }
  };
  namecity();
});

// Fetch weather data by city name
inputuser.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    let city1 = inputuser.value;
    let namecity = async function () {
      let data1 = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city1}&appid=4b9b8688eca407ea3546cf525c8f03cb&units=metric`
      );
      let jsonData = await data1.json();
      if (jsonData) {
        datainformationcollector(jsonData);
      }
    };
    namecity();
  }
});

// Existing functions for threshold checking remain unchanged...

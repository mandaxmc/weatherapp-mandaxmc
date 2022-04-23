function formatDate(date){
  let hours = date.getHours();
if (hours < 10) {
  hours =`0${hours}`;
}

let minutes = date.getMinutes();
if (minutes < 10){
  minutes=`0${minutes}`;
}

let dayIndex = date.getDay();
let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

let day = days[dayIndex];
  return `${day} ${hours}:${minutes}`;
}

function displayWeatherCondition(response) {
  console.log (response.data);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp-convert").innerHTML = Math.round (response.data.main.temp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round (response.data. wind.speed);
  document.querySelector("#weather-description").innerHTML= response.data.weather[0].main;
}

function searchCity(city) {

 let apiKey = "56c18a69a1eef8a37beac436d9d28db5";
 let units = "metric"
 let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
 axios.get(apiUrl).then(displayWeatherCondition)
 
}

function handleSubmit(event) {
  event.preventDefault();
 let city = document.querySelector("#city-query").value;
 searchCity(city);
}

function searchLocation(position) {
  let apiKey = "56c18a69a1eef8a37beac436d9d28db5"
  let units = "metric"
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`
 axios.get(apiUrl).then(displayWeatherCondition)
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}


let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#city-search");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector ("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);


searchCity("Gallup");



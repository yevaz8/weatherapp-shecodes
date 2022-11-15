let now = new Date();
function currentDate() {
  let day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thuerday",
    "Friday",
    "Saturday",
  ];
  let days = day[now.getDay()];
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let min = now.getMinutes();
  if (min < 10) {
    min = `0${min}`;
  }
  now = `${days} ${hour}:${min}`;
  let tem = document.querySelector(`#day-hours`);
  tem.innerHTML = `${now}`;
}
currentDate();

//wheather
function displayWeather(response) {
  console.log(response.data);
  let tempShow = document.querySelector(`#showTemp`);
  tempShow.innerHTML = Math.round(response.data.main.temp);
  let searchCity = document.querySelector(`#city-change`);
  searchCity.innerHTML = response.data.name;
  let weatherConditions = document.querySelector(`#weather-conditions`);
  weatherConditions.innerHTML = response.data.weather[0].description;
  let windCondition = document.querySelector(`#wind-condition`);
  windCondition.innerHTML = Math.round(response.data.wind.speed);
  let humCondition = document.querySelector(`#hum-condition`);
  humCondition.innerHTML = response.data.main.humidity;
  let lowTempCondition = document.querySelector(`#low-tempConditioin`);
  lowTempCondition.innerHTML = Math.round(response.data.main.temp_min);
  let highTempCondition = document.querySelector(`#high-tempCondition`);
  highTempCondition.innerHTML = Math.round(response.data.main.temp_max);
  let iconWeather = document.querySelector(`#icon`);
  iconWeather.setAttribute = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
}

//location
function searchCity(city) {
  let api = "eaf223fbefa74d0f073135b8f2023cf9";
  let units = `metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&units=metric&appid=${api}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}
function formSubmit(event) {
  event.preventDefault();
  let city = document.querySelector(`#enter-city`).value;
  searchCity(city);
}
let searchForm = document.querySelector("#form-city");
searchForm.addEventListener(`submit`, formSubmit);

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = `metric`;
  let api = "eaf223fbefa74d0f073135b8f2023cf9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${api}&unitd=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentButton = document.querySelector(`#currentCity`);
currentButton.addEventListener("click", getCurrentPosition);

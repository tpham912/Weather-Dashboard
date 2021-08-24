//setting variables
var city = "";
var cityHeader = $("#city-header");
var citySearch = $("#city-search");
var cityName = $("#city-name");
var todayWeather = $("#today-weather");
var forecastData = $("forecast-data");
var searchButton = $("#search-button");
var pastSearchButton = $("#past-search-button");
var temp = $("#temperature");
var humidity = $("#humidity");
var wind = $("#wind");
var uv = $("#uv-index");

//save search history to storage 
var cityHistory = [];

if(localStorage.getItem("weatherHistory")){
    cityHistory = JSON.parse(localStorage.getItem("weatherHistory"))
}

//API key, when user click search button, city name shows up 
var apiKey = "e231dee3dfe0c7831cc116ad108fec2d";
var queryURL = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=imperial&q=`

//API key
async function fetchWeatherForCity (city) {
    queryURLForCity = queryURL + city;
    console.log(queryURLForCity);
    
    return await fetch(queryURLForCity)
    .then(headers => headers.json())
    .then(weatherData => {
        return weatherData;
    });
}

function searchCity() {
    var city = cityName.val();
    console.log(city);
   
    fetchWeatherForCity(city).then(weatherData => {
        console.log(weatherData);
        currentDate();
        console.log(city);
        updateDisplay(weatherData);
        pastSearchWeather(city);
        displayCityHistory();
    });

}

function currentDate() {
    var currentDay = moment().format("MMMM Do YYYY");
    $("#current-day").text(currentDay);
    console.log(currentDay);
}

//display current forecast
function updateDisplay (weatherData) {
    cityHeader.text(weatherData.name);
    console.log(weatherData.name);
    temp.text(weatherData.main.temp + "F")
    humidity.text("Humidity: " + weatherData.main.humidity+ "%")
    wind.text("Wind Speed: " + weatherData.wind.speed + "mph")

    var oneCallURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&units=imperial&appid=${apiKey}`
    fetch(oneCallURL)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        uv.attr("class", "bg-success rounded");
        uv.text(data.current.uvi);
        fiveDayForecast(data);

    });
}

//display 5 day forecast
function fiveDayForecast(weatherData) {
    console.log(weatherData);
    for (var i = 1; i < 6; i++) {
        $("#temp" + i).text(weatherData.daily[i].temp.day);
        $("#humidity" + i).text(weatherData.daily[i].humidity);
        $("#wind" + i).text(weatherData.daily[i].wind_speed);
        var date = new Date(weatherData.daily[i].dt * 1000);
        console.log(weatherData.daily[i].dt);
        console.log(date);
    }    
}

//save search history 
function pastSearchWeather (city) {
    cityHistory.push(city);
    if (cityHistory.length > 5) {
        cityHistory.shift();
    }
    localStorage.setItem("weatherHistory", JSON.stringify(cityHistory));
    console.log(cityHistory);
}

function displayCityHistory () {
    for ( var i = 1; i <= cityHistory.length; i++) {
        $("#city-hist" + i).text(cityHistory[i-1]);
        console.log(`displayCityHistory: ${cityHistory[i-1]}`);
    }

}
                   
//click handlers
searchButton.on("click", searchCity);
pastSearchButton.on("click", pastSearchWeather);
//setting variables
var city = "";
var cityHeader = $("#city-header");
var citySearch = $("#city-search");
var cityName = $("#city-name");
var todayWeather = $("#today-weather");
var searchButton = $("#search-button");
var temp = $("#temperature");
var humidity = $("#humidity");
var wind = $("#wind");
var uv = $("#uv-index");

// jQuery(document).ready(function() {

// }
//save search history to storage 
var cityHistory = [];

if(localStorage.getItem("weatherHistory")){
    cityHistory = JSON.parse(localStorage.getItem("weatherHistory"))
}
//var searchHistory = JSON.parse(localStorage.setItem.searchHistory);

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

// fetchWeatherForCity("San Diego").then(weatherData => console.log(weatherData));   
// fetchWeatherForCity("Austin").then(weatherData => console.log(weatherData));    
// fetchWeatherForCity("Seattle").then(weatherData => console.log(weatherData));    
// fetchWeatherForCity("Miami").then(weatherData => console.log(weatherData));
// fetchWeatherForCity("San Francisco").then(weatherData => console.log(weatherData));   

function searchCity() {
    var city = cityName.val();
    console.log(city);
    cityHistory.push(city);
    localStorage.setItem("weatherHistory", JSON.stringify(cityHistory))
    fetchWeatherForCity(city).then(weatherData => {
        // if (weatherData.name === city) {
        //     console.log(weatherData);
        //     saveCityToHistory(city);
        //     updateDisplay(weatherData);
        // }
        console.log(weatherData)
        updateDisplay(weatherData)
    });


}

function displayWeatherData() {
    var currentDay = moment().format("MMMM Do YYYY");
    $("#currentDay").text(currentDay);
    console.log(currentDay);
}


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
        console.log(data)
        uv.attr("class", "bg-success rounded")
        uv.text(data.current.uvi)
    })

}
//click handlers
searchButton.on('click', searchCity);
let apiKey = "e231dee3dfe0c7831cc116ad108fec2d";
let queryURL = `https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&q=`

async function fetchWeatherForCity (city) {
    queryURLForCity = queryURL + city;
    console.log(queryURLForCity);
    
    return await fetch(queryURLForCity)
    .then(headers => headers.json())
    .then(weatherData => {
        return weatherData;
    });
}

fetchWeatherForCity("San Diego").then(weatherData => console.log(weatherData.list[0].main.sea_level));   
fetchWeatherForCity("Austin").then(weatherData => console.log(weatherData));    
fetchWeatherForCity("Seattle").then(weatherData => console.log(weatherData));    
fetchWeatherForCity("Miami").then(weatherData => console.log(weatherData));
fetchWeatherForCity("San Francisco").then(weatherData => console.log(weatherData));    


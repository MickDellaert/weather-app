//Function to get current geolocation, currently not used

/*window.addEventListener("load", () => {
    let long;
    let lat;

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
        });

    }*/

const apiKey = "939409706965cabeb39bb19b3d90a4cc";
const searchInput = document.getElementById("search-field");
const searchBtn = document.getElementById("search-btn");
const locationfield = document.getElementById("location-current");
const mainTemp = document.getElementById("main-temp");
const feelsLike = document.getElementById("feels-like");
const descriptionNow = document.getElementById("description-now")
const minTemp = document.getElementById("temp-min");
const maxTemp = document.getElementById("temp-max");

//Main function to get data from the openweather api
const getWeather = async (cityName, callback) => {
    const data1 = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);
    const currentWeather = await data1.json();

    let lon = currentWeather.coord.lon;
    let lat = currentWeather.coord.lat;

    const data2 = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${apiKey}&units=metric`);
    const forecast = await data2.json();

    console.log(currentWeather);
    console.log(forecast);

    callback(currentWeather, forecast);
}

//Button that gets the user input and start the function to add information to HTML
searchBtn.addEventListener("click", () => {
    let cityName = searchInput.value;
    console.log(cityName);

//Function that gets the weather information via a callback function and puts it in the HTML DOM
        getWeather(cityName,(currentWeather, forecast) => {
            locationfield.innerHTML = currentWeather.name;
            mainTemp.innerHTML = `<p>Current temperature ${forecast.daily[0].temp.day}°</p>`;
            feelsLike.innerHTML = `Feels like ${forecast.current.feels_like}°`;
            descriptionNow.innerHTML = `${forecast.current.weather[0].description}`;
            minTemp.innerHTML = `Min temp ${forecast.daily[0].temp.min}°`;
            maxTemp.innerHTML = `Max temp ${forecast.daily[0].temp.max}°`;

            for (let i = 1; i < 7; i++) {
                console.log(forecast.daily[i].weather[0].description);
                console.log(forecast.daily[i].temp.day)
                console.log(forecast.daily[i].temp.max)
                console.log(forecast.daily[i].temp.min)
            }

            document.getElementById("forecast-row").innerHTML = "";

            for (let i = 1; i < 7; i++) {
                let content1 = forecast.daily[i].temp.day;
                let content2 = `<p class="description-forecast">${forecast.daily[i].weather[0].description}</p>`;
                newDiv = document.createElement("div")
                document.getElementById("forecast-row").appendChild(newDiv);
                newDiv.className = "col forecast";
                newDiv.innerHTML = content1 + content2;
            }
        });
    });










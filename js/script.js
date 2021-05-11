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
const mainTemp = document.getElementById("main-temp");
const feelsLike = document.getElementById("feels-like");
const descriptionNow = document.getElementById("description-now")
const minTemp = document.getElementById("temp-min");
const maxTemp = document.getElementById("temp-max");

searchBtn.addEventListener("click", () => {
    let cityName = searchInput.value;
    console.log(cityName);

    const getWeather = async () => {
        const data1 = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);
        const currentWeather = await data1.json();

        let lon = currentWeather.coord.lon;
        let lat = currentWeather.coord.lat;

        const data2 = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${apiKey}&units=metric`);
        const forecast = await data2.json();

        let allData = {...currentWeather,...forecast};

        console.log(currentWeather);
        console.log(forecast);

        mainTemp.innerHTML = `Current temperature ${currentWeather.main.temp}°`;
        feelsLike.innerHTML = `Feels like ${currentWeather.main.feels_like}°`;
        descriptionNow.innerHTML = `${currentWeather.weather[0].description}`;
        minTemp.innerHTML = `Min temp ${currentWeather.main.temp_min}°`;
        maxTemp.innerHTML = `Max temp ${currentWeather.main.temp_max}°`;

        for (let i = 1; i < 7; i++) {
            console.log(forecast.daily[i].weather[0].description);
            console.log(forecast.daily[i].temp.day)
            console.log(forecast.daily[i].temp.max)
            console.log(forecast.daily[i].temp.min)
        }

        for (let i = 1; i < 7; i++) {
            let content = `${allData.daily[i].weather[0].description}`;

            newDiv = document.createElement("div")
            document.getElementById("forecast-row").appendChild(newDiv);
            newDiv.className = "col forecast";
            newDiv.innerText = content;

        }
        }
        getWeather();
    });










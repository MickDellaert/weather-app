window.addEventListener("load", () => {
    let long;
    let lat;

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
        });

    }

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
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        console.log(data);
        console.log(data.main.temp);
        console.log(data.main.temp_max);
        console.log(data.main.temp_min);

        mainTemp.innerHTML = `Current temperature ${data.main.temp}°`;
        feelsLike.innerHTML = `Feels like ${data.main.feels_like}°`;
        descriptionNow.innerHTML = `${data.weather[0].description}`;

        minTemp.innerHTML = `Min temp ${data.main.temp_min}°`;
        maxTemp.innerHTML = `Max temp ${data.main.temp_max}°`;
    }
    getWeather();


    const forecast = async () => {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`);
        const forecast = await response.json();
        console.log(forecast);
    }

    forecast();
});

});







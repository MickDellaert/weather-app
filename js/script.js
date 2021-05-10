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
        const firstFetch = await data1.json();

        let lon = firstFetch.coord.lon;
        let lat = firstFetch.coord.lat;

        const data2 = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${apiKey}&units=metric`);
        const forecast = await data2.json();

        let allData = {...firstFetch,...forecast};
        console.log(allData);


        mainTemp.innerHTML = `Current temperature ${allData.main.temp}°`;
        feelsLike.innerHTML = `Feels like ${allData.main.feels_like}°`;

        descriptionNow.innerHTML = `${allData.daily[0].weather[0].description}`;

        minTemp.innerHTML = `Min temp ${allData.main.temp_min}°`;
        maxTemp.innerHTML = `Max temp ${allData.main.temp_max}°`;
        }
        getWeather();
    });










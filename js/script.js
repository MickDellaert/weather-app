const apiKey = "876f71af64d39434b74d05b31a77fc42";
const searchInput = document.getElementById("search-field");
const searchBtn = document.getElementById("search-btn");
const toggle = document.getElementById("btn-check");
const inputRow = document.getElementById("input-row");
const content = document.querySelector(".content")


//Main function to get data from the openweather api, there are two api being fetched:
// the first to get the longitude and latitude, because the second fetch call requires these parameters in it's url
const getWeather = async (cityName, callback) => {
    const data1 = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);
    const currentWeather = await data1.json();

    let lon = currentWeather.coord.lon;
    let lat = currentWeather.coord.lat;

    const data2 = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${apiKey}&units=metric`);
    const forecast = await data2.json();

    const unsplashRes = await fetch(`https://api.unsplash.com/search/photos?query=${cityName}&client_id=Lgfa96r1w4FjuxvOUFRM-Ya4wz-BQQArBLMN6YwDlaU`);
    const unsplashImg = await unsplashRes.json();

    callback(currentWeather, forecast, unsplashImg);
}

function getCity() {
    let cityName = "Antwerp";

    getWeather(cityName )
}

getCity()


//Button that gets the user input and starts the function to add information to HTML
searchBtn.addEventListener("click", () => {

    content.classList.remove('viewport');
    let cityName = searchInput.value;


//Function that gets the weather information via a callback function and puts it in the HTML DOM
//Date is fetched and converted, temperatures are rounded
//A row with a Bootstrap class is added containing new divs with classes and paragraph tags added to their content
//With a for loop the forecast data is added in a similar way for the next 6 days
    getWeather(cityName, (currentWeather, forecast, unsplashImg) => {


        document.getElementById("current-row").innerHTML = "";

        let location = currentWeather.name;

        let dateCurrent = new Date(forecast.current.dt * 1000);
        let options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};

        let currentTemp = Math.round(forecast.current.temp);
        let feelsLike = Math.round(forecast.current.feels_like);
        let currentDescription = forecast.current.weather[0].description;
        let currentTempMin = Math.round(forecast.daily[0].temp.min);
        let currentTempMax = Math.round(forecast.daily[0].temp.max);
        let newCurrentDiv = document.createElement("div");

        document.getElementById("current-row").appendChild(newCurrentDiv);
        newCurrentDiv.className = "col current";
        newCurrentDiv.innerHTML =
            `<p class="location">${location}</p>`
            + `<p class="current-date">${dateCurrent.toLocaleString('en-GB', options)}</p>`
            + `<p class="current-temp">${currentTemp}°</p>`
            + `<p class="feels-like">Feels like: ${feelsLike}°</p>`
            + `<p class="current-description">${currentDescription}</p>`
            + `<p class="current-min-max">Min: ${currentTempMin}° / Max: ${currentTempMax}°</p>`;


        document.getElementById("forecast-row").innerHTML = "";

        for (let i = 1; i < 7; i++) {

            let dateForecast = new Date(forecast.daily[i].dt * 1000);
            let options = {weekday: 'long'};
            let dailyTempMin = Math.round(forecast.daily[i].temp.min);
            let dailyTempMax = Math.round(forecast.daily[i].temp.max);
            let dailyDescription = forecast.daily[i].weather[0].description;
            let newDailyDiv = document.createElement("div")
            document.getElementById("forecast-row").appendChild(newDailyDiv);
            newDailyDiv.className = "col-md-3 col-lg forecast";
            newDailyDiv.innerHTML =
                `<p class="description-forecast">${dateForecast.toLocaleString('en-GB', options)}</p>`
                + `<p class="daily-min-max">${dailyTempMin}° / ${dailyTempMax}°</p>`
                + `<p class="daily-description">${dailyDescription}</p>`;
        }

        if (document.getElementById("btn-check").checked) {

//Function to change background image depending on current weather
            function getWeatherId() {
                if (forecast.current.weather[0].main === "Rain") {
                    document.body.style.backgroundImage = "url('img/light_rain.jpg')";
                } else if (forecast.current.weather[0].main === "Clouds") {
                    document.body.style.backgroundImage = "url('img/clouds.jpg')";
                } else if (forecast.current.weather[0].main === "Thunderstorm") {
                    document.body.style.backgroundImage = "url('img/clouds.jpg')";
                } else if (forecast.current.weather[0].main === "Drizzle") {
                    document.body.style.backgroundImage = "url('img/drizzle.jpg')";
                } else if (forecast.current.weather[0].main === "Snow") {
                    document.body.style.backgroundImage = "url('img/snow.jpg')";
                } else if (forecast.current.weather[0].main === "Clear") {
                    document.body.style.backgroundImage = "url('img/clear.jpg')";
                } else {
                    document.body.style.backgroundImage = "url('img/default.jpg')";
                }
            }

            getWeatherId()

        } else {


            function unsplash() {
                let rand = Math.floor(Math.random() * 9);

                let img = unsplashImg.results[rand].urls.regular;
                document.body.style.backgroundImage = 'url(' + img + ')';

            }

            unsplash('Antwerp')
        }


        toggle.onclick = function toggleNav() {
            searchBtn.click()
        }

        // test.onclick = function toggleNav() {
        //     if (document.getElementById("test").checked) {
        //         getWeatherId()
        //     } else {
        //         unsplash('Antwerp')
        //     }
        //     console.log(toggle)
        //
        // }

    })
})


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








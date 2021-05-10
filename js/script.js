const apiKey = "939409706965cabeb39bb19b3d90a4cc";
const searchInput = document.querySelector("#search-field");
const searchBtn = document.querySelector("#search-btn");

searchBtn.addEventListener("click", () => {
    let citySearch = searchInput.value;
    console.log(citySearch);

const getWeather = async () => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${apiKey}`);
    const data = await response.json();
    console.log(data);
    }
    getWeather();
})








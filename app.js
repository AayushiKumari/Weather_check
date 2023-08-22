console.log("Weather-Forecast Application")

const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const icon = document.querySelector('.icon');
const cloudOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const form = document.querySelector('.locationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const city1 = document.querySelector('.city1');
const city2 = document.querySelector('.city2');
const city3 = document.querySelector('.city3');
const city4 = document.querySelector('.city4');

let cityInput = "Bokaro";


city1.addEventListener('click', (e) => {
    cityInput = e.target.innerHTML;
    fetchWeatherData();
    app.style.opacity = "0";
});
city2.addEventListener('click', (e) => {
    cityInput = e.target.innerHTML;
    fetchWeatherData();
    app.style.opacity = "0";
});
city3.addEventListener('click', (e) => {
    cityInput = e.target.innerHTML;
    fetchWeatherData();
    app.style.opacity = "0";
});
city4.addEventListener('click', (e) => {
    cityInput = e.target.innerHTML;
    fetchWeatherData();
    app.style.opacity = "0";
});

btn.addEventListener('click', (e) => {
    e.preventDefault()
    if (search.value.length == 0) {
        alert('Please type a city name');
    } else {
        cityInput = search.value;
        fetchWeatherData();
        search.value = "";
        app.style.opacity = "0";
    }
    e.preventDefault();
})

function dayOfTheWeek(date) {
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const data = weekday[new Date(date).getDay()];
    return data;
};


function fetchWeatherData() {
    fetch(`http://api.weatherapi.com/v1/current.json?Key=22badae7a9f24de8896100353222607&q=${cityInput}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert("No Matching City Found!")
            } else {

                const date = data.location.localtime ;
                const y = parseInt(date.substr(0, 4));
                const m = parseInt(date.substr(5, 7));
                const d = parseInt(date.substr(8, 10));
                const timeHr = parseInt(date.substr(11, 13));
                const timeMin = parseInt(date.substr(13, 15));
    
                dateOutput.innerHTML = `${dayOfTheWeek(date)} ${d}-${m}-${y}`
                timeOutput.innerHTML = timeHr + ":" + timeMin;
                temp.innerHTML = data.current.temp_c + "&#176;";
                nameOutput.innerHTML = data.location.name;
                conditionOutput.innerHTML = data.current.condition.text;

                const iconUrl = data.current.condition.icon;
                icon.src = iconUrl;

                cloudOutput.innerHTML = data.current.cloud + "%";
                humidityOutput.innerHTML = data.current.humidity + "%";
                windOutput.innerHTML = data.current.wind_kph + "km/h";

                let timeOfDay = "day";
                const code = data.current.condition.code;

                if (!data.current.is_day) {
                    timeOfDay = "night";
                }

                if (code == 1000) {
                    app.style.backgroundImage = `url(./images/${timeOfDay}/clear.jpg)`;

                    btn.style.background = "e5ba92";
                    if (timeOfDay == "night") {
                        btn.style.background = "#181e27";
                    }
                }
                else if (code == 1003 || code == 1006 || code == 1009 || code == 1030 || code == 1069 || code == 1087 || code == 1135 || code == 1273 || code == 1276 || code == 1279 || code == 1282) {
                    app.style.backgroundImage = `url(./images/${timeOfDay}/cloudy.jpg)`;
                    btn.style.background = "#192236";
                    if (timeOfDay == "night") {
                        btn.style.background = "#181e27";
                    }
                }
                else if (code == 1063 || code == 1069 || code == 1072 || code == 1150 || code == 1153 || code == 1180 || code == 1183 || code == 1186 || code == 1189 || code == 1192 || code == 1195 || code == 1204 || code == 1207 || code == 1240 || code == 1243 || code == 1246 || code == 1246 || code == 1252) {
                    app.style.backgroundImage = `url(./images/${timeOfDay}/rainy.jpg)`;
                    btn.style.background = "#647d75";
                    if (timeOfDay == "night") {
                        btn.style.background = "#325c80";
                    }
                }
                else {
                    app.style.backgroundImage = `url(./images/${timeOfDay}/snowy.jpg)`;
                    btn.style.background = "#4d72aa";
                    if (timeOfDay == "night") {
                        btn.style.background = "#1b1b1b";
                    }
                }
                app.style.opacity = "1";
            }
        })
        .catch((err) => {
            console.log(err);
            app.style.opacity = "1";
        });
}

fetchWeatherData();
app.style.opacity = "1";
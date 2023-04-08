const form = document.querySelector('form');
const cityInput = document.getElementById('city');
const weatherInfo = document.querySelector('.weather-info');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const city = cityInput.value;
  getWeather(city);
});

async function getWeather(city) {
  const apiKey = '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';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  try {
    const response = await axios.get(url);
    const { main, name, weather } = response.data;
    const temp = Math.round(main.temp);
    const description = weather[0].description;
    const humidity = main.humidity;
    const windSpeed = response.data.wind.speed;
    showWeather(name, temp, description, humidity, windSpeed);
  } catch (error) {
    console.error(error);
    showError();
  }
}

function showWeather(city, temp, description, humidity, windSpeed) {
  const weatherHTML = `
    <h2>${city}</h2>
    <p>Temperatura: ${temp} °C</p>
    <p>Opis: ${description}</p>
    <p>Wilgotność: ${humidity}%</p>
    <p>Prędkość wiatru: ${windSpeed} m/s</p>
  `;
  weatherInfo.innerHTML = weatherHTML;
}
function showError() {
const errorHTML = <p>Błąd pobierania danych pogodowych</p>;
weatherInfo.innerHTML = errorHTML;
}

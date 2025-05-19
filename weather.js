async function getWeather() {
  const city = document.getElementById('cityInput').value;
  const apiKey = '06bba629fa20cb6ecda05a946534f60a'; // Replace with your OpenWeatherMap API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;


  const response = await fetch(url);
  const data = await response.json();

  if (data.cod !== "200") {
    document.getElementById('weatherData').innerHTML = `<p>City not found</p>`;
    return;
  }

  const temps = data.list.slice(0, 5).map(item => item.main.temp);
  const labels = data.list.slice(0, 5).map(item => item.dt_txt);

  document.getElementById('weatherData').innerHTML = `
    <h3>${data.city.name}, ${data.city.country}</h3>
    <p>5-Time Weather Forecast (°C)</p>
  `;

  new Chart(document.getElementById('weatherChart'), {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Temperature (°C)',
        data: temps,
        borderColor: 'blue',
        fill: false
      }]
    }
  });
}

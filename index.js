let app = document.querySelector("#app");
let target = document.querySelector("#target");

function getWeather(city) {
  let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=9e32576aa8bc031eff72e8140283217f&units=metric`;
  fetch(queryURL)
    .then(res => {
      return res.json();
    })
    .then(res => {
      console.log(res);
      target.innerHTML += `
      <div class="col-sm-4">
        <div class="card" >
          <div class="card-body">
            <h4 class="card-title">${res.name}</h4>
            <p>Temperature: ${res.main.temp} C (${res.weather[0].description})</p>
            <p>Humidity: ${res.main.humidity}%</p>
            <p>Wind Speed: ${res.wind.speed} km/h</p>
          </div>
        </div>
      </div>
    `;
    });
}

let form = document.querySelector("#search");

app.addEventListener("submit", e => {
  e.preventDefault();
  let city = document.querySelector("#city").value;
  getWeather(city);
});

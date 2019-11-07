let app = document.querySelector("#app");
let target = document.querySelector("#target");
let form = document.querySelector("#search");
let mymap;

document.addEventListener("load", renderMap());

app.addEventListener("submit", e => {
  e.preventDefault();
  let city = document.querySelector("#city").value;
  if (city !== "") {
    getWeather(city);
  } else {
    getWeather();
  }
});

function getWeather(city = "berlin,de") {
  city = city.trim().replace(/\s/gi, "+")
  let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=9e32576aa8bc031eff72e8140283217f&units=metric`;
  fetch(queryURL)
    .then(res => {
      return res.json();
    })
    .then(res => {
      addMarker(res);
      // renderWeatherCard(res);
    });
}

function renderWeatherCard(res) {
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
}

function renderMap(weather = { coord: { lat: 52.52, lon: 13.39 } }) {
  mymap = L.map("mapid").setView([weather.coord.lat, weather.coord.lon], 4);

  L.tileLayer(
    `https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}`,
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: "mapbox.streets",
      accessToken:
        "pk.eyJ1IjoicGZkem0iLCJhIjoiY2syZDZyaXZ6MHQxbjNqcDR4Nm5jMDlkaiJ9.NfZcJYx2UKi8cUdQalfkyg"
    }
  ).addTo(mymap);
}

function addMarker(weather, map = mymap) {
  // Add a marker at ESMT Berlin's location to test functionality
  L.marker([weather.coord.lat, weather.coord.lon])
    .addTo(map)
    .bindPopup(
      ` <h6>${weather.name}</h6>
      <span>
      Temperature: ${weather.main.temp} C (${weather.weather[0].description}) <br>
      Humidity: ${weather.main.humidity}%<br>
      Wind Speed: ${weather.wind.speed} km/h
      </span>
      `
    )
    .openPopup();
  map.panTo([weather.coord.lat, weather.coord.lon]);
}

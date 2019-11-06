let app = document.querySelector("#app");

var mymap;

function getWeather(city) {
  let weather;
  let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=9e32576aa8bc031eff72e8140283217f&units=metric`;
  fetch(queryURL)
    .then(res => {
      return res.json();
    })
    .then(res => {
      console.log(res);

      let div = document.createElement("div");
      div.classList.add("currentWeather");
      div.innerHTML = ` <h4>${res.name}</h4>
                        <p>Temperature: ${res.main.temp} C (${res.weather[0].description})</p>
                        <p>Humidity: ${res.main.humidity}%</p>
                        <p>Wind Speed: ${res.wind.speed} km/h</p>
                        `;
      app.append(div);
      if (!mymap) {
        renderMap(res);
      }

      addMarker(res);
    });
}

let form = document.querySelector("#search");

form.addEventListener("submit", e => {
  e.preventDefault();
  let city = document.querySelector("#city").value;
  getWeather(city);
});

function renderMap(weather) {
  mymap = L.map("mapid").setView([weather.coord.lat, weather.coord.lon], 13);

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

function addMarker(weather) {
  // Add a marker at ESMT Berlin's location to test functionality
  L.marker([weather.coord.lat, weather.coord.lon])
    .addTo(mymap)
    .bindPopup(
      ` <h4>${weather.name}</h4>
      <p>Temperature: ${weather.main.temp} C (${weather.weather[0].description})</p>
      <p>Humidity: ${weather.main.humidity}%</p>
      <p>Wind Speed: ${weather.wind.speed} km/h</p>
      `
    );
}

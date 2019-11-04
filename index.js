let app = document.querySelector("#app");

function getWeather(city) {
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
    });
}

let form = document.querySelector("#search");

form.addEventListener("submit", e => {
  e.preventDefault();
  let city = document.querySelector("#city").value;
  getWeather(city);
});

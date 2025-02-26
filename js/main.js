//https://api.weatherapi.com/v1/forecast.json?q=cairo&days=3&key=bb47ea04e0494c0799541127252502 current
const findLocation = document.querySelector("#findLocation");
findLocation.addEventListener("change", function (e) {
  getData(e.target.value);
});
async function getData(location) {
  let respons = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?q=${location}&days=3&key=bb47ea04e0494c0799541127252502`
  );
  let data = await respons.json();
  displayData(data);
}
function displayData(data) {
  let dateToday = new Date(data.current.last_updated);
  document.querySelector("#todayName").innerHTML = dateToday.toLocaleString(
    "en-us",
    { weekday: "long" }
  );
  document.querySelector("#todayDate").innerHTML =
    dateToday.getDate() +
    " " +
    dateToday.toLocaleString("en-us", { month: "long" });
  document.querySelector("#location").innerHTML = data.location.name;
  document.querySelector("#todayTemp").innerHTML = data.current.temp_c;
  document
    .querySelector("#todayIcon")
    .setAttribute("src", `https:${data.current.condition.icon}`);
  document.querySelector("#todayCondition").innerHTML =
    data.current.condition.text;
  document.querySelector("#humidity").innerHTML = data.current.humidity + "%";
  document.querySelector("#wind-speed").innerHTML =
    data.current.wind_kph + "km/h";
  document.querySelector("#wind-dir").innerHTML = data.current.wind_dir;
  let cartoona = ``;
  for (let i = 1; i <= 2; i++) {
    let nextDay = new Date(data.forecast.forecastday[i].date);
    cartoona = `  <div class="forecast-card p-4 rounded-3 bg-custom-two text-white text-center h-100">
              <div class="day">${nextDay.toLocaleString("en-us", {
                weekday: "long",
              })}</div>
                <img src='https:${
                  data.forecast.forecastday[i].day.condition.icon
                }' alt="" width="90">
            
                  <div class="fs-1">${
                    data.forecast.forecastday[i].day.maxtemp_c
                  }<sup>o</sup>C</div>
                  <div class="fs-1">${
                    data.forecast.forecastday[i].day.mintemp_c
                  }<sup>o</sup>C</div>
         
              <div class="text-primary">${
                data.forecast.forecastday[i].day.condition.text
              }</div>
            
              </div> `;
    document.querySelectorAll(".card-days")[i - 1].innerHTML = cartoona;
  }
}
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    getData(`${lat}, ${long}`);
  });
}

const links = document.querySelectorAll(".nav-link");

for (let i = 0; i < links.length; i++) {
  links[i].addEventListener("click", function () {
    links.forEach(function (link) {
      link.classList.remove("active");
    });
    links[i].classList.add("active");
  });
}

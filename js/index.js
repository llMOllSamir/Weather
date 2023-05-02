// ...............................Variabels................................
var weather = document.querySelector("#weather");
var findCountry = document.querySelector("#search");
var httpUrl;
var httpUrlRespons;
const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
var currentDay = new Date();

function day(num = 0) {
  if (currentDay.getDay() + num >= weekday.length) {
    num = currentDay.getDay() + num - weekday.length;
    return weekday[num];
  }
  return weekday[currentDay.getDay() + num];
}
let dateday = currentDay.getDate();
let dateMonth = month[currentDay.getMonth()];

// ..................................................Functions.....................................
if (localStorage.getItem("key") == null) {
  displayData();
} else {
  var key = localStorage.getItem("key");
  displayData(key);
}

async function displayData(code = "cairo") {
  httpUrl = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=9868a68e1d8c4ba7947200831231802&q=${code}&days=3`
  );
  httpUrlRespons = await httpUrl.json();
  console.log(httpUrlRespons)

  var display = `
  <div class="col-md-4">
    <div class="card text-bg-secondary h-100 mb-3">
      <div
        class="card-header bg-dark bg-opacity-50 d-flex justify-content-between"
      >
        <span>${day()}</span>
        <span>${dateday + " " + dateMonth}</span>
      </div>
      <div class="card-body">
        <h4 class="card-title">${httpUrlRespons.location.name}</h4>
        <div class="temp row align-items-center my-5">
          <div class="col-8">
            <h1 >${httpUrlRespons.current.temp_c}<sub>o</sub>C</h1>
          </div>
          <div class="col-4">
            <img class="w-75" src="${
              httpUrlRespons.current.condition.icon
            }" alt="" />
          </div>
        </div>
        <p  class="card-text ps-2 text-info">${
          httpUrlRespons.current.condition.text
        }</p>
        <div class="card-footer p-0 pt-3">
          <span class="me-4"
            ><img src="/images/img3.png" alt="" />${
              httpUrlRespons.forecast.forecastday[0].day.daily_chance_of_rain
            }%</span
          >
          <span class="me-4"
            ><img src="/images/img4.png" alt="" />${
              httpUrlRespons.current.wind_kph
            }km/h
          </span>
          <span class="me-4"
            ><img src="/images/img5.png" alt="" />${
              httpUrlRespons.current.wind_dir
            }</span
          >
        </div>
      </div>
    </div>
  </div>
  <div class="col-md-4">
    <div class="card text-bg-dark mb-3 h-100">
      <div class="card-header text-center">
        <span>${day(1)}</span>
      </div>
      <div class="card-body">
        <div class="temp text-center">
          <div class="icons mx-auto">
            <img
              src="https:${
                httpUrlRespons.forecast.forecastday[1].day.condition.icon
              }"
              alt=""
              class="img-fluid"
            />
          </div>
          <div class="my-5">
            <h4>${
              httpUrlRespons.forecast.forecastday[1].day.maxtemp_c
            }<sub>o</sub>C</h4>
            <p>${
              httpUrlRespons.forecast.forecastday[1].day.mintemp_c
            }<sub>o</sub>C</p>
          </div>
          <p class="card-text ps-2 text-info">${
            httpUrlRespons.forecast.forecastday[1].day.condition.text
          }</p>
        </div>
      </div>
    </div>
  </div>
  <div class="col-md-4">
    <div class="card text-bg-secondary mb-3 h-100">
      <div class="card-header bg-dark bg-opacity-50 text-center">
        <span>${day(2)}</span>
      </div>
      <div class="card-body">
        <div class="temp text-center">
          <div class="icons mx-auto">
            <img
              src="https:${
                httpUrlRespons.forecast.forecastday[2].day.condition.icon
              }"
              alt=""
              class="img-fluid"
            />
          </div>
          <div class="my-5">
            <h4>${
              httpUrlRespons.forecast.forecastday[2].day.maxtemp_c
            }<sub>o</sub>C</h4>
            <p>${
              httpUrlRespons.forecast.forecastday[2].day.mintemp_c
            }<sub>o</sub>C</p>
          </div>
          <p class="card-text ps-2 text-info">${
            httpUrlRespons.forecast.forecastday[2].day.condition.text
          }</p>
        </div>
      </div>
    </div>
  </div>`;
  weather.innerHTML = display;
}

async function searchCountry(term) {
  var preSearch = await fetch(
    `http://api.weatherapi.com/v1/search.json?key=9868a68e1d8c4ba7947200831231802&q=${term}`
  );
  var finalSearch = await preSearch.json();
  var findTerm = finalSearch[0].name;
  localStorage.setItem("key", findTerm);
  displayData(findTerm);
}

findCountry.addEventListener("input", function (e) {
  var keyWord = e.target.value;
  searchCountry(keyWord);
});







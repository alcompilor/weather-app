const wImg = document.getElementById("weather-image");
const wStatus = document.getElementById("weather-status");
const wDesc = document.getElementById("weather-desc");
const wTemp = document.getElementById("weather-temp");
const wFeelsLike = document.getElementById("weather-feelslike");
const wHumidity = document.getElementById("weather-humidity");
const wWindSpeed = document.getElementById("weather-windspeed");

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-submit");

const degreeSelect = document.getElementById("degree-select");

const locationIcon = document.getElementById("location-icon");

const appPrimaryEl = document.getElementById("app-primary");

let loaderCalled = false;

const elementArray = [wStatus, wDesc, wTemp, wFeelsLike, wHumidity, wWindSpeed];

function renderEl(element, data, tempType) {
  if (element.nodeName === "IMG") {
    element.src = data;
  } else if (element.nodeName === "DIV") {
    switch (element.id) {
      case "weather-status":
        element.textContent = data.status;
        break;
      case "weather-desc":
        element.textContent = data.desc;
        break;
      case "weather-temp":
        if (tempType === "C") {
          element.textContent = `${Math.round(data.temp - 273.15)}°C`;
        } else if (tempType === "F") {
          element.textContent = `${Math.round(
            1.8 * (data.temp - 273.15) + 32
          )}°F`;
        }
        break;
      case "weather-feelslike":
        if (tempType === "C") {
          element.textContent = `Feels Like: ${Math.round(
            data.feelsLike - 273.15
          )}°C`;
        } else if (tempType === "F") {
          element.textContent = `Feels Like: ${Math.round(
            1.8 * (data.feelsLike - 273.15) + 32
          )}°F`;
        }
        break;
      case "weather-humidity":
        element.textContent = `Humidity: ${data.humidity}%`;
        break;
      case "weather-windspeed":
        element.textContent = `Wind Speed: ${data.windSpeed}m/s`;
        break;
    }
  }
}

function render(array, data, tempType) {
  for (let i = 0; i < array.length; i++) {
    renderEl(array[i], data, tempType);
  }
}

function unRender() {
  wImg.src = "";
  for (let i = 0; i < elementArray.length; i++) {
    elementArray[i].textContent = "";
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function loader(ms) {
  const loader = document.createElement("img");
  loader.src = "./media/loader.svg";
  loader.classList.add("main-loader");
  appPrimaryEl.appendChild(loader);
  await sleep(ms);
  appPrimaryEl.removeChild(loader);
}

function detectImage(data) {
  switch (data) {
    case "Rain":
      return "./media/rain.svg";
    case "Thunderstorm":
      return "./media/thunderstorm.svg";
    case "Drizzle":
      return "./media/drizzle.svg";
    case "Snow":
      return "./media/snow.svg";
    case "Clear":
      return "./media/clear.svg";
    case "Clouds":
      return "./media/clouds.svg";
  }
}

export {
  wImg,
  elementArray,
  searchBtn,
  searchInput,
  render,
  renderEl,
  detectImage,
  degreeSelect,
  locationIcon,
  loader,
  unRender,
};

import { weatherReq } from "./api.js";
import {
  wImg,
  render,
  renderEl,
  detectImage,
  elementArray,
  searchBtn,
  searchInput,
  degreeSelect,
  locationIcon,
  loader,
  unRender,
} from "./DOM.js";

import {
  setDegree,
  getDegree,
  storeLocation,
  getStoredLocation,
  setAutoState,
  getAutoState,
} from "./localstorage.js";

if (getAutoState() === null) {
  setAutoState("true");
}

if (getDegree() === null) {
  setDegree("C");
}

if (getDegree() === "C") {
  degreeSelect.options[0].selected = true;
} else if (getDegree() === "F") {
  degreeSelect.options[1].selected = true;
}

if (getAutoState() === "true") {
  locationIcon.classList.add("locationActive");
  locationIcon.title = "GPS is enabled";
}

if (getAutoState() === "true") {
  navigator.geolocation.getCurrentPosition((position) => {
    autoFetch(position.coords.latitude, position.coords.longitude);
  });

  async function autoFetch(latitude, longitude) {
    try {
      const weatherData = await weatherReq(
        "auto",
        undefined,
        latitude,
        longitude
      );
      await loader(500);
      renderEl(wImg, detectImage(weatherData.status));
      render(elementArray, weatherData, getDegree());
      searchInput.value = weatherData.city;
    } catch (error) {
      console.log(error);
    }
  }
} else {
  manualFetch(getStoredLocation());
  searchInput.value = getStoredLocation();
}

async function manualFetch(city) {
  try {
    setAutoState(false);
    const weatherData = await weatherReq("manual", city, undefined, undefined);
    unRender();
    await loader(500);
    renderEl(wImg, detectImage(weatherData.status));
    render(elementArray, weatherData, getDegree());
  } catch (error) {
    console.log(error);
  }
}

searchBtn.addEventListener("click", (e) => {
  if (searchInput.value.trim() === "") {
    return false;
  } else {
    manualFetch(searchInput.value);
    storeLocation(searchInput.value);
    locationIcon.classList.remove("locationActive");
  }
});

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    if (searchInput.value.trim() === "") {
      return false;
    } else {
      manualFetch(searchInput.value);
      storeLocation(searchInput.value);
      locationIcon.classList.remove("locationActive");
    }
  }
});

degreeSelect.addEventListener("change", (e) => {
  setDegree(degreeSelect.value);
  document.location.reload();
});

locationIcon.addEventListener("click", (e) => {
  if (getAutoState() === "false") {
    setAutoState("true");
    document.location.reload();
  } else if (getAutoState() === "true") {
    setAutoState("false");
    document.location.reload();
  }
});

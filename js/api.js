async function weatherReq(method, city, lat, lon) {
  if (method === "manual") {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9d44c320cbb744609833f650c413e3d9`
      );
      const data = await response.json();
      const weatherData = new WeatherObj(
        data.weather["0"].main,
        data.weather["0"].description,
        data.main.temp,
        data.main.feels_like,
        data.main.humidity,
        data.wind.speed,
        data.name
      );
      return weatherData;
    } catch (err) {
      alert("There has been an error fetching weather data from given city.");
    }
  } else if (method === "auto") {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=9d44c320cbb744609833f650c413e3d9`
      );
      const data = await response.json();
      const weatherData = new WeatherObj(
        data.weather["0"].main,
        data.weather["0"].description,
        data.main.temp,
        data.main.feels_like,
        data.main.humidity,
        data.wind.speed,
        data.name
      );
      return weatherData;
    } catch (err) {
      alert(
        "There has been an error fetching weather data using GPS. Please check if location sharing is allowed."
      );
    }
  } else {
    errorMsg = "Incorrect use of function!";
    return errorMsg;
  }
}

function WeatherObj(status, desc, temp, feelsLike, humidity, windSpeed, city) {
  this.status = status;
  this.desc = desc;
  this.temp = temp;
  this.feelsLike = feelsLike;
  this.humidity = humidity;
  this.windSpeed = windSpeed;
  this.city = city;
}

export { weatherReq };

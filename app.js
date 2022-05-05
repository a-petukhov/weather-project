const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const appid = "adb261e311065bea92e62f9cd7d8c8ba";
  const lang = "en";
  const units = "metric";
  const query = req.body.cityName;
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&units=" +
    units +
    "&lang=" +
    lang +
    "&appid=" +
    appid;

  https.get(url, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = Number(weatherData.main.temp);
      const weatherDescription = weatherData.weather[0].description;
      const iconImg =
        '<img src="http://openweathermap.org/img/wn/' +
        weatherData.weather[0].icon +
        '@2x.png" alt="weather-icon">';

      res.write(
        "<h1>The temperature in " +
          query +
          " is " +
          temp +
          " degrees Celsius.</h1>"
      );
      res.write("<p>The weather is " + weatherDescription + ".</p>");
      res.write(iconImg);
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("Server is now running on port 3000.");
});

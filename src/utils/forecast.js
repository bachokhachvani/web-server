const request = require("request");

const forecast = (long, lat, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=d86feebbb39c626b315b481f62dcd70d&query=" +
    encodeURIComponent(lat + "," + long) +
    "&units=f";

  request({ url: url, json: true }, (err, { body }) => {
    if (err) {
      callback("unable to find location!");
    } else if (body.error) {
      callback("something went wrong!");
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          " It is currently " +
          body.current.temperature +
          " degress out. There is a " +
          body.current.precip +
          "% chance of rain."
      );
    }
  });
};

module.exports = forecast;

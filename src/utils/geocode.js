const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiYmFjaG8xMjMiLCJhIjoiY2wycWFodDd1MXloeTNrbnE4Y2NycGZseiJ9.k39dTblIh5oC0eXTq1kSdw";

  request({ url: url, json: true }, (err, { body }) => {
    if (err) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location services!", undefined);
    } else {
      callback(undefined, {
        latatute: body.features[0].center[0],
        longitute: body.features[0].center[1],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;

const path = require("path");
const express = require("express");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

console.log(__dirname);
console.log(path.join(__dirname, "../public"));

const app = express();
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../src/template/views");

app.set("views", viewPath);
app.set("view engine", "hbs");
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    name: "naachoo",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "no address is provided" });
  }
  geocode(
    req.query.address,
    (error, { latatute, longitute, location } = {}) => {
      if (error) {
        return res.send({ error: "error" });
      }
      forecast(latatute, longitute, (error, forecastdata) => {
        if (error) {
          return res.send({ error: "error" });
        }
        // console.log(location);
        // console.log(forecastdata);
        res.send({
          forecast: forecastdata,
          location: location,
          address: req.query.address,
        });
      });
    }
  );

  // res.send({
  //   address: req.query.address,
  // });
});

app.listen(port, () => {
  console.log("server is running in port " + port);
});

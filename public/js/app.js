// const address = require("./../../src/app");

// console.log(address);

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  console.log(location);
  fetch("http://localhost:3000/weather?address=" + location).then((resp) => {
    resp.json().then((data) => {
      console.log(data);
      if (!data.error) {
        messageOne.textContent = "Forecast-" + data.forecast;
        messageTwo.textContent = "location-" + data.location;
      } else {
        messageOne.textContent = "error- wrong location!";
      }
    });
  });
});

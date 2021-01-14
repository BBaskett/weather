const express = require("express");
const app = express();
const fetch = require("node-fetch");
const cors = require("cors");

const PORT = 5001;

app.use(cors());

app.get("/api", (req, res) => {
  return res
    .status(406)
    .send(
      "You must specify a path.<br/><br/>Available paths:<ul><li>zipcode</li></ul>"
    );
});

app.get("/api/zipcode", (req, res) => {
  return res
    .status(406)
    .send(
      "You have selected the zipcode path. You must now enter a zipcode parameter.<br/><br/>Example: <code>/api/zipcode/07302</code>"
    );
});

app.get("/api/zipcode/*", async (req, res) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?zip=${req.params[0]}&appid=0ea7fe29dac4eeced7fadd06e999190e&units=imperial`
  );
  const weather = await response.json();
  return res.status(200).send(weather);
});

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});

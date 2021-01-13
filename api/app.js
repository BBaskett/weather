const express = require("express");
const app = express();
const cors = require("cors");

const PORT = 5001;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Test");
});

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});

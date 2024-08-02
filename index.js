const express = require("express");
const axios = require("axios");
const public_routes = require("./routes/general");

const PORT = 8080;
const app = express();

app.use("/public", public_routes);

app.listen(PORT, function (err) {
  if (err) {
    return console.log(err.message);
  }
  console.log(`listening on port ${PORT}`);
});

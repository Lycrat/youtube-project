const express = require("express");
const axios = require("axios");
const cors = require("cors");
const public_routes = require("./routes/general");
const session = require("express-session");
const auth_users = require("./routes/auth_users");
const jwt = require("jsonwebtoken");

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(cors());
app.use(
  "/private",
  session({
    secret: process.env.JWT_SECRET,
    resave: true,
    saveUninitialized: true,
  }),
);

app.use("/private/auth/*", function (req, res, next) {
  if (req.session.authorization) {
    const token = req.session.authorization["accessToken"];
    jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
      if (!err) {
        req.user = user;
        next();
      } else {
        console.log(err);
        return res.send("This user is not authorized");
      }
    });
  } else {
    return res.send("This user is not logged in");
  }
});

app.use("/public", public_routes);
app.use("/private", auth_users);

app.listen(PORT, function (err) {
  if (err) {
    return console.log(err.message);
  }
  console.log(`listening on port ${PORT}`);
});

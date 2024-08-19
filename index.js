const express = require("express");
const axios = require("axios");
const cors = require("cors");
const public_routes = require("./routes/general");
const session = require("express-session");
const auth_users = require("./routes/auth_users");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(
  "/private",
  session({
    secret: process.env.JWT_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "none",
    },
  }),
);

app.use("/private/auth/*", function (req, res, next) {
  if (req.signedCookies.authorization) {
    const token = JSON.parse(req.signedCookies.authorization)["accessToken"];
    jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
      if (!err) {
        req.user = user;
        next();
      } else {
        console.log(err);
        return res.status(401).send("This user is not authorized");
      }
    });
  } else {
    return res.status(401).send("This user is not logged in");
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

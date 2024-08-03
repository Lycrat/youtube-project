const express = require("express");
const axios = require("axios");
const conn = require("../database");
const jwt = require("jsonwebtoken");
const auth_users = express.Router();

auth_users.get("/auth/comment", function (req, res) {
  res.send("not yet implemented");
});

auth_users.post("/login", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.send("Username or password not provided.");
  }
  const sql = "SELECT password FROM users WHERE username = ? AND password = ?";
  const val = [username, password];

  conn.query(sql, val, function (err, result, fields) {
    if (result.length > 0) {
      const accessToken = jwt.sign(
        {
          username: username,
        },
        process.env.JWT_SECRET,
        { expiresIn: 60 * 60 },
      );
      req.session.authorization = { accessToken, username };
      return res.send(`user ${username} logged in`);
    } else {
      return res.send("No user in database.");
    }
  });
});

module.exports = auth_users;

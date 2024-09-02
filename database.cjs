var mysql = require("mysql2");
var conn = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "password",
  database: "users",
});

var videoConn = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "password",
  database: "videos",
});

conn.query(`CREATE TABLE IF NOT EXISTS users(
  username TEXT,
  password TEXT
  )`);

videoConn.query(`CREATE TABLE IF NOT EXISTS videos(
  videoId INT AUTO_INCREMENT PRIMARY KEY,
  videoJson TEXT
  )`);
module.exports = { conn, videoConn };

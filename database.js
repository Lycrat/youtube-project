var mysql = require("mysql2");
var connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "password",
  database: "users",
});

connection.query(`CREATE TABLE IF NOT EXISTS users(
  username TEXT,
  password TEXT
  )`);

module.exports = connection;

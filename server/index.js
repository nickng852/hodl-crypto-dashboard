const express = require("express");
const app = express();
const port = 3000;
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "cryptodashboarddb",
});

app.get("/", (req, res) => {
  const sqlInsert =
    "INSERT INTO users (username, password) VALUES ('aaa', 'bbb');";
  db.query(sqlInsert, (err, result) => {
    console.log(err);
    res.send("bbb");
  });
});

app.listen(port, () => {
  console.log("running on port 3000");
});

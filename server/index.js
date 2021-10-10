const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("squid game");
});

app.listen(3000, () => {
  console.log("running on port 3000");
});

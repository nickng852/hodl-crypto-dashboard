const express = require("express");
const app = express();
const port = 3001;

const cors = require("cors");

require("dotenv").config();

// Middleware
app.use(cors());

// Routing
const coinsRoute = require("./routes/coins");
const newsRoute = require("./routes/news");

app.use("/getCoins", coinsRoute);
app.use("/getNews", newsRoute);

// Server
app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});

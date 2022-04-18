const express = require("express");
const app = express();

const cors = require("cors");

require("dotenv").config();

// Middleware
app.use(cors());

// Routing
const coinsRoute = require("./routes/coins");
const coinRoute = require("./routes/coin");
const newsRoute = require("./routes/news");

app.use("/getCoins", coinsRoute);
app.use("/getCoin", coinRoute);
app.use("/getNews", newsRoute);

// Server
app.listen(process.env.PORT || 3001, () => {
  console.log(`Running on http://localhost:${port}`);
});

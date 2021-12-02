const port = 3001;
const axios = require("axios"); // Prevent CORS error
const cors = require("cors");
const express = require("express");
require("dotenv").config(); // Access .env config

const app = express();

app.use(cors());

// Coinranking API call
app.get("/getCoins", (req, res) => {
  const options = {
    method: "GET",
    url: "https://coinranking1.p.rapidapi.com/coins",
    headers: {
      "x-rapidapi-host": "coinranking1.p.rapidapi.com",
      "x-rapidapi-key": process.env.REACT_APP_COINRANKING_API_KEY,
    },
  };

  axios
    .request(options)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
});

// News API call
app.get("/getNews", (req, res) => {
  const options = {
    method: "GET",
    url: `https://newsapi.org/v2/everything?q=cryptocurrency&from=2021-11-01&pageSize=5&sortBy=publishedAt&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`,
  };

  axios
    .request(options)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.listen(port, () => {
  console.log("running on port 3001");
});

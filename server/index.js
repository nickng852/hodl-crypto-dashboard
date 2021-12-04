const port = 3001;
const axios = require("axios");
const cors = require("cors"); // Prevent CORS error
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
      console.log(error);
    });
});

// News API call
app.get("/getNews", (req, res) => {
  const NewsAPI = require("newsapi");
  const newsapi = new NewsAPI(process.env.REACT_APP_NEWS_API_KEY);

  newsapi.v2
    .everything({
      q: "cryptocurrency",
      sources: "",
      domains: "",
      sortBy: "publishedAt",
      pageSize: "5",
    })
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(port, () => {
  console.log("running on port 3001");
});

const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", (req, res) => {
  const NewsAPI = require("newsapi");
  const newsapi = new NewsAPI(process.env.REACT_APP_NEWS_API_KEY);

  newsapi.v2
    .everything({
      q: "cryptocurrency",
      /* sources:
        "BBC News,CNN,Reuters,New York Times,Bloomberg,Fox News,Google News,The Wall Street Journal,Time, HYPEBEAST, Forbes, Motley Fool", */
      language: "en",
      sortBy: "publishedAt",
      pageSize: "4",
    })
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;

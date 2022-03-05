const express = require("express");
const axios = require("axios");

const router = express.Router();

// GET all news by query
router.get("/:keyword/:pageSize", (req, res) => {
  const NewsAPI = require("newsapi");
  const newsapi = new NewsAPI(process.env.REACT_APP_NEWS_API_KEY);

  const keyword = req.params.keyword;
  const pageSize = req.params.pageSize;

  console.log(keyword);
  console.log(pageSize);

  newsapi.v2
    .everything({
      q: keyword,
      /*       sources:
        "BBC News,CNN,Reuters,New York Times,Bloomberg,Fox News,Google News,The Wall Street Journal,Time, HYPEBEAST, Forbes, Motley Fool", */
      language: "en",
      sortBy: "publishedAt",
      pageSize: pageSize,
    })
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;

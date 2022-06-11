const express = require("express");
const axios = require("axios");

const router = express.Router();

// News API - GET news
router.get("/:keyword/:page/:pageSize", (req, res) => {
  const NewsAPI = require("newsapi");
  const newsapi = new NewsAPI(process.env.REACT_APP_NEWS_API_KEY);

  const keyword = req.params.keyword;
  const page = req.params.page;
  const pageSize = req.params.pageSize;

  console.log(keyword);
  console.log(page);
  console.log(pageSize);

  newsapi.v2
    .everything({
      q: keyword,
      /*       sources:
        "BBC News,CNN,Reuters,New York Times,Bloomberg,Fox News,Google News,The Wall Street Journal,Time, HYPEBEAST, Forbes, Motley Fool", */
      language: "en",
      sortBy: "publishedAt",
      page: page,
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

const express = require("express");

const router = express.Router();

const NewsAPI = require("newsapi");
const newsapi = new NewsAPI(process.env.REACT_APP_NEWS_API_KEY);

// News API - GET news
router.get("/:keyword/:page/:pageSize", (req, res) => {
  const keyword = req.params.keyword;
  const page = req.params.page;
  const pageSize = req.params.pageSize;

  /*   console.log(
    `News API: querying ${pageSize} "${
      keyword.charAt(0).toUpperCase() + keyword.slice(1)
    }" news in ${page} page`
  ); */

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
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(500).json({ error });
      console.log(error);
    });
});

module.exports = router;

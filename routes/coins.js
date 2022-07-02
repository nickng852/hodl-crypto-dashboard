const express = require("express");
const axios = require("axios");

const router = express.Router();

// Coinranking API - GET coins
router.get("/", (req, res) => {
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
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(500).json({ error });
      console.log(error);
    });
});

module.exports = router;

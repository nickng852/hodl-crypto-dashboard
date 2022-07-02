const express = require("express");
const axios = require("axios");

const router = express.Router();

// Coinranking API - GET coin
router.get("/:id", (req, res) => {
  const id = req.params.id;

  const options = {
    method: "GET",
    url: `https://coinranking1.p.rapidapi.com/coin/${id}`,
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

// Coinranking API - GET coin price history
router.get("/:id/history/:timePeriod", (req, res) => {
  const id = req.params.id;
  const timePeriod = req.params.timePeriod;

  const options = {
    method: "GET",
    url: `https://coinranking1.p.rapidapi.com/coin/${id}/history`,
    params: { timePeriod: timePeriod },
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

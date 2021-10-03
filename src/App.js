import React, { useState, useEffect } from "react";
import axios from "axios";
import { Coin } from "./components/Coin";

const App = () => {
  // states
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
      headers: {
        "X-CMC_PRO_API_KEY": process.env.REACT_APP_COINMARKETCAP_API_KEY,
      },
    };

    axios
      .request(options)
      .then(function (res) {
        console.log(res);
        setCoins(res.data.data);
      })
      .catch(function (err) {
        console.error(err);
      });
  }, []);

  return (
    <>
      {coins.map((coin, index) => {
        return (
          <Coin
            key={index}
            id={coin.id}
            name={coin.name}
            symbol={coin.symbol}
          />
        );
      })}
    </>
  );
};

export default App;

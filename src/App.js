import React, { useState, useEffect } from "react";
import axios from "axios";
import Dashboard from "./components/Dashboard";

const App = () => {
  // states
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

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
        var parsedData = JSON.parse(JSON.stringify(res));
        console.log(parsedData);
        console.log(parsedData.data.data);
        setCoins(parsedData.data.data);
      })
      .catch(function (err) {
        console.error(err);
      });
  }, []);

  return (
    <>
      <Dashboard coins={coins} search={search} setSearch={setSearch} />
    </>
  );
};

export default App;

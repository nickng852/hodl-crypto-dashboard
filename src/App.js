import React, { useEffect } from "react";
import axios from "axios";

const App = () => {
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
      })
      .catch(function (err) {
        console.error(err);
      });
  }, []);

  return <></>;
};

export default App;

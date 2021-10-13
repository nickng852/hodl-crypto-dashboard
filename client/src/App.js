import React, { useState, useEffect } from "react";
import axios from "axios";

// Firebase
import { initializeApp } from "firebase/app";
import firebaseConfig from "./auth/Firebase";

// Components
import Dashboard from "./components/Dashboard";
import SignUp from "./components/SignUp";

// Initialize Firebase
initializeApp(firebaseConfig);

const App = () => {
  // states
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const cryptoApiOptions = {
      method: "GET",
      url: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
      headers: {
        "X-CMC_PRO_API_KEY": process.env.REACT_APP_COINMARKETCAP_API_KEY,
      },
    };

    axios
      .request(cryptoApiOptions)
      .then(function (res) {
        var parsedData = JSON.parse(JSON.stringify(res));
        console.log(parsedData);
        console.log(parsedData.data.data);
        setCoins(parsedData.data.data);
      })
      .catch(function (err) {
        console.error(err);
      });

    /*      const cryptoNewsApiOptions = {
      method: "GET",
      url: "https://crypto-news5.p.rapidapi.com/",
      headers: {
        "x-rapidapi-host": "crypto-news5.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_CRYPTONEWS_API_KEY,
      },
    };

    axios
      .request(cryptoNewsApiOptions)
      .then(function (res) {
        console.log(res);
      })
      .catch(function (err) {
        console.error(err);
      }); */
  }, []);

  return (
    <>
      <div className="flex flex-col h-screen bg-gray-100">
        {/*        <Dashboard
          coins={coins}
          search={search}
          setSearch={setSearch}
          open={open}
          setOpen={setOpen}
        /> */}
        <SignUp
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
        />
      </div>
    </>
  );
};

export default App;

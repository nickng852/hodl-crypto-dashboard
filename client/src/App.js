import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

// Firebase
import { db } from "./firebase/firebase.config";
import { collection, getDocs } from "firebase/firestore";

// Components
import Dashboard from "./components/Dashboard";
import SignUp from "./components/account/SignUp";
import SignIn from "./components/account/SignIn";

const App = () => {
  // states
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setIsLogged(JSON.parse(window.localStorage.getItem("userToken")));
  }, []);

  useEffect(() => {
    /*     const getUser = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        console.log(doc.id.email);
      });
    };

    getUser(); */

    window.localStorage.setItem("userToken", isLogged);

    // CoinMarketCap API call
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
        /*         console.error(err); */
      });

    /*     // CryptoNews API call
    const cryptoNewsApiOptions = {
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
  }, [isLogged]);

  return (
    <>
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path="/signup">
            <SignUp
              user={user}
              setUser={setUser}
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />
          </Route>

          {isLogged ? (
            <Route path="/dashboard">
              <Dashboard
                isLogged={isLogged}
                setIsLogged={setIsLogged}
                user={user}
                setUser={setUser}
                coins={coins}
                search={search}
                setSearch={setSearch}
                open={open}
                setOpen={setOpen}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </Route>
          ) : (
            <Route path="/" exact>
              <SignIn
                isLogged={isLogged}
                setIsLogged={setIsLogged}
                user={user}
                setUser={setUser}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
              />
            </Route>
          )}
        </Switch>
      </Router>
    </>
  );
};

export default App;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Firebase
import { db } from "./firebase/firebase.config";
/* import { collection, getDocs } from "firebase/firestore"; */

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
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [chart, setChart] = useState([]);

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
        /*         console.log(parsedData); */
        /*         console.log(parsedData.data.data); */
        setCoins(parsedData.data.data);
      })
      .catch(function (err) {
        /*         console.error(err); */
      });

    // Coinranking API call
    const coinRankingOptions = {
      method: "GET",
      url: "https://coinranking1.p.rapidapi.com/coins",
      headers: {
        "x-rapidapi-host": "coinranking1.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_COINRANKING_API_KEY,
      },
    };

    axios
      .request(coinRankingOptions)
      .then(function (res) {
        var parsed = JSON.parse(JSON.stringify(res));
        /*         console.log(parsed.data.data.coins); */
        setChart(parsed.data.data.coins);
      })
      .catch(function (err) {
        console.error(err);
      });
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
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
                chart={chart}
                setChart={setChart}
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

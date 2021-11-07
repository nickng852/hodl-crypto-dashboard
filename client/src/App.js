import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Firebase
import { db } from "./firebase/firebase.config";
/* import { collection, getDocs } from "firebase/firestore"; */

// Components
import Sidebar from "./components/Sidebar";
import NavBar from "./components/navbar/NavBar";
import SignUp from "./components/account/SignUp";
import SignIn from "./components/account/SignIn";
import HomePage from "./components/HomePage";
import CoinDetails from "./components/CoinDetails";

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
        const parsed = JSON.parse(JSON.stringify(res));
        /*        console.log(parsed.data.data.coins); */
        setCoins(parsed.data.data.coins);
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
            <>
              <div className="flex flex-row">
                <Sidebar />
                <div className="flex flex-col w-full bg-gray-50 justify-items-center">
                  <NavBar
                    user={user}
                    coins={coins}
                    search={search}
                    setSearch={setSearch}
                    open={open}
                    setOpen={setOpen}
                    setIsLogged={setIsLogged}
                  />
                  <Switch>
                    <Route path="/dashboard">
                      <HomePage
                        coins={coins}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        itemsPerPage={itemsPerPage}
                        setItemsPerPage={setItemsPerPage}
                      />
                    </Route>
                    <Route path="/cryptocurrencies">
                      <CoinDetails />
                    </Route>
                  </Switch>
                </div>
              </div>
            </>
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

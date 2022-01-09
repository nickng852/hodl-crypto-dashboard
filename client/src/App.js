import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components
import SignIn from "./pages/signinpage/SignIn";
import SignUp from "./pages/signuppage/SignUp";
import Sidebar from "./components/sidebar/Sidebar";
import NavBar from "./components/navbar/Navbar";
import Dashboard from "./pages/dashboardpage/Dashboard";
import CoinInfo from "./pages/coinspage/CoinInfo";
import Account from "./pages/accountpage/Account";

// Firebase
import { db } from "./firebase/firebase.config";
import { doc, onSnapshot } from "firebase/firestore";
import CoinCollection from "./pages/coinspage/CoinCollection";

const App = () => {
  // States
  const [isLoading, setIsLoading] = useState(false);
  const initialState = {
    name: "",
    email: "",
    password: "",
  };
  const [form, setForm] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState("");
  const [token, setToken] = useState(""); // firebase auth
  const [user, setUser] = useState(""); // firestore
  const [isLogged, setIsLogged] = useState(false);
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [news, setNews] = useState([]);

  /*   useEffect(() => {
    window.localStorage.setItem("userToken", isLogged);
    setIsLogged(JSON.parse(window.localStorage.getItem("userToken")));
  }, [isLogged]); */

  // Get logged user's info from firebase after successful login
  useEffect(() => {
    if (token) {
      const getUser = () => {
        onSnapshot(doc(db, "users", token.uid), (doc) => {
          setUser(doc.data());
        });
      };

      getUser();
    }
  }, [token]);

  // Coinranking API call
  useEffect(() => {
    const options = {
      method: "GET",
      url: "http://localhost:3001/getCoins",
    };

    axios
      .request(options)
      .then((res) => {
        const parsed = JSON.parse(JSON.stringify(res));
        setCoins(parsed.data.data.coins);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // News API call
  useEffect(() => {
    const options = {
      method: "GET",
      url: "http://localhost:3001/getNews",
    };

    axios
      .request(options)
      .then((res) => {
        setNews(res.data.articles);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path="/signup">
            <SignUp
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              initialState={initialState}
              form={form}
              setForm={setForm}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />
          </Route>

          {token && isLogged ? (
            <>
              <div className="flex flex-row">
                <div>
                  <Sidebar />
                </div>

                <div className="flex flex-col w-full bg-white dark:bg-primary justify-items-center">
                  <NavBar
                    setToken={setToken}
                    user={user}
                    setUser={setUser}
                    setIsLogged={setIsLogged}
                    coins={coins}
                    search={search}
                    setSearch={setSearch}
                  />
                  <Switch>
                    <Route path="/dashboard">
                      <Dashboard
                        token={token}
                        user={user}
                        setUser={setUser}
                        coins={coins}
                        search={search}
                        setSearch={setSearch}
                        news={news}
                      />
                    </Route>
                    <Route path="/cryptocurrencies" exact>
                      <CoinCollection coins={coins} />
                    </Route>
                    <Route path="/cryptocurrencies/:uuid">
                      <CoinInfo coins={coins} />
                    </Route>
                    <Route path="/profile">
                      <Account
                        initialState={initialState}
                        form={form}
                        setForm={setForm}
                        errorMessage={errorMessage}
                        setErrorMessage={setErrorMessage}
                        token={token}
                        setToken={setToken}
                        user={user}
                        setUser={setUser}
                        setIsLogged={setIsLogged}
                      />
                    </Route>
                  </Switch>
                </div>
              </div>
            </>
          ) : (
            <Route path="/" exact>
              <SignIn
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                initialState={initialState}
                form={form}
                setForm={setForm}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
                setToken={setToken}
                setIsLogged={setIsLogged}
              />
            </Route>
          )}
        </Switch>
      </Router>
    </>
  );
};

export default App;

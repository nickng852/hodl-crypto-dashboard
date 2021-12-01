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
import { doc, getDoc } from "firebase/firestore";
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

  useEffect(() => {
    // Get logged user's info from firebase after successful login
    if (token) {
      const getUser = async () => {
        const docRef = doc(db, "users", token.uid);
        const docSnap = await getDoc(docRef);

        setUser(docSnap.data());
      };

      getUser();
    }
  }, [token]);

  useEffect(() => {
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
        setCoins(parsed.data.data.coins);
      })
      .catch(function (err) {
        console.error(err);
      });
  }, []);

  /*   useEffect(() => {
    // Bing News Search API call
    const bingNewsSearchOptions = {
      method: "GET",
      url: "https://bing-news-search1.p.rapidapi.com/news/search?q=crytocurrency",
      params: {
        safeSearch: "Off",
        textFormat: "Raw",
      },
      headers: {
        "x-bingapis-sdk": "true",
        "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_BINGNEWSSEARCH_API_KEY,
      },
    }; */

  const newDate = new Date();
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const date = newDate.getDate();

  useEffect(() => {
    // Bing News API call
    const newsApiOptions = {
      method: "GET",
      url: `https://newsapi.org/v2/everything?q=cryptocurrency&from=2021-11-01&pageSize=5&sortBy=publishedAt&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`,
    };

    axios
      .request(newsApiOptions)
      .then(function (res) {
        setNews(res.data.articles);
      })
      .catch(function (err) {
        console.error(err);
      });
  }, [year, month, date]);

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
                <Sidebar />
                <div className="flex flex-col w-full dark:bg-gray-900 bg-gray-50 justify-items-center">
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
                      <Dashboard coins={coins} news={news} />
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

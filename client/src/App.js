import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components
import SignIn from "./pages/signinpage/SignIn";
import SignUp from "./pages/signuppage/SignUp";
import Sidebar from "./components/sidebar/Sidebar";
import NavBar from "./components/navbar/Navbar";
import Home from "./pages/homepage/Home";
import CoinInfo from "./pages/coininfopage/CoinInfo";
import Account from "./pages/accountpage/Account";

// Firebase
import { db } from "./firebase/firebase.config";
import { doc, getDoc } from "firebase/firestore";

const App = () => {
  // States
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [token, setToken] = useState(""); // firebase auth
  const [user, setUser] = useState(""); // firestore
  const [isLogged, setIsLogged] = useState(false);
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

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
    if (isLogged) {
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
    }
  }, [isLogged]);

  return (
    <>
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path="/signup">
            <SignUp
              form={form}
              setForm={setForm}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
              setToken={setToken}
            />
          </Route>

          {token && isLogged ? (
            <>
              <div className="flex flex-row">
                <Sidebar />
                <div className="flex flex-col w-full bg-gray-50 justify-items-center">
                  <NavBar
                    setToken={setToken}
                    user={user}
                    setUser={setUser}
                    setIsLogged={setIsLogged}
                    coins={coins}
                    setCoins={setCoins}
                    search={search}
                    setSearch={setSearch}
                  />
                  <Switch>
                    <Route path="/dashboard">
                      <Home coins={coins} />
                    </Route>
                    <Route path="/cryptocurrencies/:uuid">
                      <CoinInfo coins={coins} />
                    </Route>
                    <Route path="/profile">
                      <Account
                        setToken={setToken}
                        user={user}
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
                form={form}
                setForm={setForm}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
                setToken={setToken}
                isLogged={isLogged}
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

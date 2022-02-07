import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components
import SignIn from "./pages/signinpage/SignIn";
import SignUp from "./pages/signuppage/SignUp";
import Sidebar from "./components/sidebar/Sidebar";
import NavBar from "./components/navbar/Navbar";
import Dashboard from "./pages/dashboardpage/Dashboard";
import CoinsInfo from "./pages/coininfopage/CoinsInfo";
import CoinInfo from "./pages/coininfopage/CoinInfo";
import Account from "./pages/accountpage/Account";

// Firebase
import { db } from "./firebase/firebase.config";
import { doc, onSnapshot } from "firebase/firestore";

const App = () => {
  // Global States
  const initialState = {
    name: "",
    email: "",
    password: "",
  };
  const [form, setForm] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [token, setToken] = useState(""); // firebase auth
  const [user, setUser] = useState(""); // firestore
  const [isLogged, setIsLogged] = useState(false);

  // News API query
  const defaultKeyword = "cryptocurrency";
  const [keyword, setKeyword] = useState(defaultKeyword);

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

  /* useEffect(() => {
    window.localStorage.setItem("userToken", isLogged);
    setIsLogged(JSON.parse(window.localStorage.getItem("userToken")));
  }, [isLogged]); */

  return (
    <>
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path="/" exact>
            <SignIn
              initialState={initialState}
              form={form}
              setForm={setForm}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
              setToken={setToken}
              setIsLogged={setIsLogged}
            />
          </Route>

          <Route path="/signup">
            <SignUp
              initialState={initialState}
              form={form}
              setForm={setForm}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />
          </Route>

          {token && isLogged && (
            <>
              <div className="flex flex-row">
                <aside>
                  <Sidebar />
                </aside>

                <main className="flex flex-col w-full bg-white dark:bg-primary justify-items-center">
                  <nav>
                    <NavBar
                      setToken={setToken}
                      user={user}
                      setUser={setUser}
                      setIsLogged={setIsLogged}
                    />
                  </nav>

                  <section>
                    <Switch>
                      <Route path="/dashboard">
                        <Dashboard
                          token={token}
                          user={user}
                          setUser={setUser}
                          defaultKeyword={defaultKeyword}
                          keyword={keyword}
                          setKeyword={setKeyword}
                        />
                      </Route>

                      <Route path="/coins">
                        <CoinsInfo />
                      </Route>

                      <Route path="/coin/:uuid">
                        <CoinInfo keyword={keyword} setKeyword={setKeyword} />
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
                  </section>
                </main>
              </div>
            </>
          )}
        </Switch>
      </Router>
    </>
  );
};

export default App;

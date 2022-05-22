import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SignIn from "./pages/signinpage/SignIn.jsx";
import SignUp from "./pages/signuppage/SignUp.jsx";

import PrivateRoute from "./routes/PrivateRoute.js";
import Layout from "./Layout.js";
import Dashboard from "./pages/dashboardpage/Dashboard.jsx";
import CoinsInfo from "./pages/coininfopage/CoinsInfo.jsx";
import CoinInfo from "./pages/coininfopage/CoinInfo.jsx";
import NewsCollection from "./pages/newspage/NewsCollection.jsx";
import Account from "./pages/accountpage/Account.jsx";
import NotFound from "./pages/notfoundpage/NotFound.jsx";

// Retrieve appearance preference if any
if (localStorage) {
  const html = document.querySelector("html");

  if (localStorage.getItem("Theme") === "Light") {
    html.classList.remove("dark");
  } else if (localStorage.getItem("Theme") === "Dark") {
    html.classList.add("dark");
  }
}

const App = () => {
  return (
    <>
      <Router basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" exact element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          <Route element={<PrivateRoute />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/coins" element={<CoinsInfo />} />
              <Route path="/coin/:uuid" element={<CoinInfo />} />
              <Route path="/news" element={<NewsCollection />} />
              <Route path="/setting" element={<Account />} />
            </Route>
          </Route>

          <Route element={<Layout />}>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;

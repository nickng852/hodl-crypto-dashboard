import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// Redux
import { Provider } from "react-redux";
import store from "./app/store";

// Tailwind CSS
import "./tailwind.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

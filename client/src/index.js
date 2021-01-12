import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/dashboard.css";
import POSApp from "./POSApp";

import { Provider } from "react-redux";
import store from "./redux/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <POSApp />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

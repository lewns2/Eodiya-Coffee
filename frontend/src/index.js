import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

import configureStore from "./store/index";
import reducers from "./reducer/reducers";
import { Provider } from "react-redux";

// axios.defaults.baseURL = "/api/v1";
axios.defaults.baseURL = "http://127.0.0.1:8000";
// axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1";
axios.defaults.withCredentials = false;
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";


const store = configureStore(reducers, {
});

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

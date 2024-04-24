import axios from "axios";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import App from "./App.jsx";
import { store } from "./redux";

import "./index.css";
import "react-toastify/dist/ReactToastify.css";

const token = sessionStorage.getItem("token");
axios.defaults.baseURL = "https://api.uzkoj-namangan.uz/api";
axios.defaults.headers.common["Authorization"] = "Bearer " + token;

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
    <ToastContainer />
  </BrowserRouter>
);

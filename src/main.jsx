import axios from "axios";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

const token = sessionStorage.getItem("token");
axios.defaults.baseURL = "https://";
axios.defaults.headers.common["Authorization"] = "Bearer " + token;

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

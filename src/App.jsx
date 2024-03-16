import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Login/index";
import Home from "./components/Home/index";

const App = () => {
  return (
    <div>
      {/* <Login /> */}
      <Home />
      <ToastContainer />
    </div>
  );
};

export default App;

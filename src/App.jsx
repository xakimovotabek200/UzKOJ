import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./redux";
import Router from "./router/index";
import Login from "./components/Login";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const isValidToken = !!token;

        if (isValidToken) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Provider store={store}>
      <div>
        {isLoggedIn ? <Router /> : <Login setIsLoggedIn={setIsLoggedIn} />}
      </div>
    </Provider>
  );
};

export default App;

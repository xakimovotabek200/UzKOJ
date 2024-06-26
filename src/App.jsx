import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeDeadlineStatus } from "./redux";
import Router from "./router/index";
import Login from "./components/Login";

const App = () => {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = sessionStorage.getItem("token");

  async function checkDeadline() {
    try {
      const response = await axios.get("deadline");
      if (response.data.length > 0) {
        const isOkResponse = await axios.get(
          `deadline/${response.data?.[0]?.id}`
        );
        dispatch(changeDeadlineStatus(isOkResponse.data));
      }
    } catch (error) {
      dispatch(changeDeadlineStatus(true));
      return;
    }
  }

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const isValidToken = !!token;

        if (isValidToken) {
          checkDeadline();
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
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
    <div>
      {isLoggedIn ? <Router /> : <Login setIsLoggedIn={setIsLoggedIn} />}
    </div>
  );
};

export default App;

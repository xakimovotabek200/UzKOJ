import React, { useLayoutEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { routes } from "./router/routes";
import { Link } from "react-router-dom";
import Login from "./components/Login";

const App = () => {
  const { pathname } = useLocation();
  const token = sessionStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useLayoutEffect(() => {
    window.scroll({ left: 0, top: 0 });
  }, [pathname]);

  if (!isLoggedIn) {
    return <Login />;
  }
  return (
    <div>
      <Routes>
        {routes.map((item) => (
          <Route
            key={item.key}
            path={item.path}
            element={
              <Link to={item.path}>
                <div className="card w-96 bg-primary text-primary-content">
                  <div className="card-body">
                    <h2 className="card-title">{item.title}!</h2>
                  </div>
                </div>
              </Link>
            }
          />
        ))}
      </Routes>
    </div>
  );
};

export default App;

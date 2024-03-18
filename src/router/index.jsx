import React, { useLayoutEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { routes } from "../router/routes";

const index = () => {
  const { pathname } = useLocation();
  const token = sessionStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const isMenuItemActive = (path) => {
    const isActive = location.pathname === path;
    return isActive;
  };

  useLayoutEffect(() => {
    window.scroll({ left: 0, top: 0 });
  }, [pathname]);

  return (
    <div>
      <Routes>
        {routes?.map((route, ind) => (
          <Route key={ind} path={route.path} element={route.element} />
        ))}
      </Routes>
    </div>
  );
};

export default index;

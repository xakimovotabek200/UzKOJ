import React, { useLayoutEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Login from "../components/Login";
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

  if (!isLoggedIn) {
    return !(<Login />);
  }
  return (
    <div>
      {/* <Login /> */}
      {/* <Registered /> */}

      <ul className="pt-2 w-full grid grid-cols-3">
        {routes.map((Menu, index) => (
          <NavLink
            to={Menu.path}
            key={index}
            className={`rounded-md p-2 cursor-pointer w-full`}
          >
            <div
              className="card  bg-primary text-primary-content"
              style={{
                backgroundColor: isMenuItemActive(Menu.path)
                  ? "red"
                  : "whitesmoke",
              }}
            >
              <span
                className={`text-4xl text-center ${
                  isMenuItemActive(Menu.path) ? "text-white" : "text-black"
                }`}
              >
                {Menu.icon}
              </span>
              <p
                className={`text-xl font-semibold pl-4 ${
                  isMenuItemActive(Menu.path) ? "text-white" : "text-black"
                }`}
              >
                {Menu.title}
              </p>
            </div>
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default index;

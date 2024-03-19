import React, { useLayoutEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { routes } from "../../router/routes";

const Index = () => {
  const { pathname } = useLocation();
  const [activePath, setActivePath] = useState("");

  const isMenuItemActive = (path) => {
    return activePath === path;
  };

  useLayoutEffect(() => {
    setActivePath(pathname);
    window.scroll({ left: 0, top: 0 });
  }, [pathname]);

  return (
    <div>
      <ul className="pt-2 w-full grid grid-cols-4 text-center">
        {routes.map((Menu, index) => (
          <NavLink
            to={Menu.path}
            key={index}
            className={`rounded-md p-2 cursor-pointer w-full`}
            onClick={() => setActivePath(Menu.path)}
          >
            <div
              className="py-5"
              style={{
                backgroundColor: isMenuItemActive(Menu.path)
                  ? "red"
                  : "whitesmoke",
              }}
            >
              <div className="">
                <span
                  className={`text-4xl  ${
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
            </div>
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default Index;

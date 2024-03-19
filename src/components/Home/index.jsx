import React, { useLayoutEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { routes } from "../../router/routes";

const Index = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scroll({ left: 0, top: 0 });
  }, [pathname]);

  return (
    <div>
      <ul className="pt-2 w-full grid grid-cols-4 gap-4 text-center">
        {routes.map((Menu, index) => (
          <NavLink
            to={Menu.path}
            key={index}
            className="rounded-lg overflow-hidden py-16 shadow-md border border-gray-200 transition duration-300 ease-in-out transform hover:scale-105"
          >
            <div className="py-5">
              <div className="flex flex-col items-center ">
                <span className="text-4xl">{Menu.icon}</span>
                <p className="text-xl font-semibold mt-2 border-t w-full ">
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

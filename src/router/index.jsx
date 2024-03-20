import { useLayoutEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { routes } from "../router/routes";
import { Navbar } from "../components";
import { useSelector } from "react-redux";

const index = () => {
  const { pathname } = useLocation();
  const { grayscale, invert } = useSelector((state) => state.accesibility);

  useLayoutEffect(() => {
    window.scroll({ left: 0, top: 0 });
  }, [pathname]);

  return (
    <div style={{ filter: `grayscale(${grayscale}) invert(${invert})` }}>
      <Navbar />
      <div className="p-10">
        <Routes>
          {routes?.map((route, ind) => (
            <Route key={ind} path={route.path} element={route.element} />
          ))}
        </Routes>
      </div>
    </div>
  );
};

export default index;

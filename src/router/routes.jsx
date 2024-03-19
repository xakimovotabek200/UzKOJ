import Login from "../components/Login";
import {
  Documents,
  Events,
  Members,
  Problems,
  Registered,
  Stats,
  User,
} from "../pages";
import Home from "../components/Home";

const token = sessionStorage.getItem("token");

export const routes = [
  {
    key: 0,
    path: "/",
    title: "Bosh Sahifa",
    icon: <span className="fa-solid fa-home" />,
    element: token ? <Home /> : <Login />,
  },

  {
    key: 1,
    path: "/documents",
    title: "Kerakli Xujjatlar",
    icon: <span className="fa-solid fa-circle-check" />,
    element: token ? <Documents /> : <Login />,
  },
  {
    key: 2,
    path: "/events",
    title: "Tadbirlar",
    icon: <span className="fa-solid fa-layer-group" />,
    element: token ? <Events /> : <Login />,
  },
  {
    key: 3,
    path: "/members",
    title: "UzKOJ A'zolari",
    element: token ? <Members /> : <Login />,
    icon: <span className="fa-solid fa-layer-group" />,
  },
  {
    key: 4,
    path: "/problems",
    title: "Muammolar",
    icon: <span className="fa-solid fa-user-tie" />,
    element: token ? <Problems /> : <Login />,
  },
  {
    key: 5,
    path: "/registered",
    title: "Xisobda turgan ko'zi ojizlar ",
    icon: <span className="fa-solid fa-user-group" />,
    element: token ? <Registered /> : <Login />,
  },

  {
    key: 6,
    path: "/stats",
    title: "Statistic malumotlar",
    icon: <span className="fa-solid fa-list-check" />,
    element: token ? <Stats /> : <Login />,
  },

  {
    key: 6,
    path: "/user",
    title: "Tumanga Yangi Xodim Yaratish",
    icon: <span className="fa-solid fa-list-check" />,
    element: token ? <User /> : <Login />,
  },
];

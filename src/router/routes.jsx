import {
  Documents,
  Home,
  Events,
  Members,
  Problems,
  Registered,
  Stats,
} from "../pages";

export const routes = [
  {
    key: 0,
    path: "/",
    title: "Home",
    icon: <span className="fa-solid fa-home" />,
    element: <Home />,
  },

  {
    key: 1,
    path: "/documents",
    title: "Documents",
    icon: <span className="fa-solid fa-circle-check" />,
    element: <Documents />,
  },
  {
    key: 2,
    path: "/events",
    title: "Events",
    icon: <span className="fa-solid fa-layer-group" />,
    element: <Events />,
    isLink: true,
  },
  {
    key: 3,
    path: "/members",
    title: "Members",
    element: <Members />,
    icon: <span className="fa-solid fa-layer-group" />,
  },
  {
    key: 4,
    path: "/problems",
    title: "Problems",
    icon: <span className="fa-solid fa-user-tie" />,
    element: <Problems />,
  },
  {
    key: 5,
    path: "/registered",
    title: "Registered",
    icon: <span className="fa-solid fa-user-group" />,
    element: <Registered />,
  },

  {
    key: 6,
    path: "/stats",
    title: "Stats",
    icon: <span className="fa-solid fa-list-check" />,
    element: <Stats />,
  },
];

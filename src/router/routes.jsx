import Login from "../components/Login";
import {
  Documents,
  Events,
  Members,
  Problems,
  Registered,
  Stats,
  User,
  // hidden pages
  AddRegisteredUser,
  AddMember,
  AddEvent,
  AddProblem,
  AddAdmin,
  AddDocument,
  EditMember,
  EditRegisteredUser,
  FullEvent,
  EditEvent,
  AddStats,
  FullStats,
} from "../pages";
import Home from "../components/Home";

const token = sessionStorage.getItem("token");

export const routes = [
  {
    key: 0,
    path: "/",
    title: "Bosh sahifa",
    icon: <span className="fa-solid fa-home" />,
    element: token ? <Home /> : <Login />,
  },
  {
    key: 1,
    path: "/documents",
    title: "Kerakli hujjatlar",
    icon: <span className="fa-solid fa-file-lines" />,
    element: token ? <Documents /> : <Login />,
  },
  {
    key: 5,
    path: "/registered",
    title: "Xisobda turganlar",
    icon: <span className="fa-solid fa-users" />,
    element: token ? <Registered /> : <Login />,
  },
  {
    key: 3,
    path: "/members",
    title: "O'zKOJ a'zolari",
    icon: <span className="fa-solid fa-address-card" />,
    element: token ? <Members /> : <Login />,
  },
  {
    key: 2,
    path: "/events",
    title: "Tadbirlar",
    icon: <span className="fa-solid fa-calendar-days" />,
    element: token ? <Events /> : <Login />,
  },
  {
    key: 4,
    path: "/problems",
    title: "Muammolar",
    icon: <span className="fa-solid fa-circle-exclamation" />,
    element: token ? <Problems /> : <Login />,
  },
  {
    key: 6,
    path: "/stats",
    title: "Statistik ma'lumotlar",
    icon: <span className="fa-solid fa-list-check" />,
    element: token ? <Stats /> : <Login />,
  },

  {
    key: 7,
    path: "/user",
    title: "Tumanga admin yaratish",
    icon: <span className="fa-solid fa-user-shield" />,
    element: token ? <User /> : <Login />,
  },
];

export const hiddenRoutes = [
  {
    key: 100,
    path: "/register-user",
    element: token ? <AddRegisteredUser /> : <Login />,
  },
  {
    key: 101,
    path: "/register-member",
    element: token ? <AddMember /> : <Login />,
  },
  {
    key: 102,
    path: "/add-event",
    element: token ? <AddEvent /> : <Login />,
  },
  {
    key: 103,
    path: "/add-problem",
    element: token ? <AddProblem /> : <Login />,
  },
  {
    key: 104,
    path: "/add-admin",
    element: token ? <AddAdmin /> : <Login />,
  },
  {
    key: 105,
    path: "/add-documents",
    element: token ? <AddDocument /> : <Login />,
  },
  {
    key: 106,
    path: "/edit-user/:id",
    element: token ? <EditRegisteredUser /> : <Login />,
  },
  {
    key: 107,
    path: "/edit-member/:id",
    element: token ? <EditMember /> : <Login />,
  },
  {
    key: 108,
    path: "/event/:id",
    element: token ? <FullEvent /> : <Login />,
  },
  {
    key: 109,
    path: "/edit-event/:id",
    element: token ? <EditEvent /> : <Login />,
  },
  {
    key: 110,
    path: "/add-stats",
    element: token ? <AddStats /> : <Login />,
  },
  {
    key: 111,
    path: "/full-stats/:id",
    element: token ? <FullStats /> : <Login />,
  },
];

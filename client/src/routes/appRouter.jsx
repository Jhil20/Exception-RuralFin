import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Body from "./Body";
import Login from "./Login";
import UserDashboard from "./UserDashboard";
import UserProfile from "./UserProfile";
import Budget from "./Budget";
import AgentDashboard from "./AgentDashboard";
import MoneyMaze from "../components/MoneyMaze";
import FarmToFortune from "../components/FarmToFortune";

const appRouter = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "userDashboard",
        element: <UserDashboard />,
      },
      {
        path: "userProfile",
        element: <UserProfile />,
      },
      {
        path: "budget",
        element: <Budget />,
      },
      {
        path: "agentDashboard",
        element: <AgentDashboard />,
      },
      {
        path: "moneyMaze",
        element: <MoneyMaze />,
      },
      {
        path: "farmToFortune",
        element: <FarmToFortune />,
      },
    ],
  },
]);

export default appRouter;

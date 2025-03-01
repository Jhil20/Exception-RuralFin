import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Body from "./Body";
import Login from "./Login";
import UserDashboard from "./UserDashboard";
import UserProfile from "./UserProfile";
import Budget from "./Budget";
import Game from "./game";
import MoneyMaze from "../components/MoneyMaze";
import FarmToFortune from "../components/FarmToFortune";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { 
        path: "/",
        element: <Body /> 
      },
      {
        path:"/login",
        element:<Login/>,
      },
      {
        path:"/userDashboard",
        element:<UserDashboard/>,
      },
      {
        path:"/userProfile",
        element:<UserProfile/>,
      },
      {
        path:"/budget",
        element:<Budget/>,
      },  
      {
        path:"/game",
        element:<Game/>
      },
      {
        path:"/money",
        element:<MoneyMaze  />
      },
      {
        path:"/farm",
        element:<FarmToFortune  />
      }

    ],
  },
]);

export default appRouter;

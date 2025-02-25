import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Body from "./Body";
import Login from "./Login";
import UserDashboard from "./UserDashboard";
import UserProfile from "./UserProfile";

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
      }
    ],
  },
]);

export default appRouter;

import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Body from "./Body";
import Login from "./Login";

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
    ],
  },
]);

export default appRouter;

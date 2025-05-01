import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Loading from "./components/Loading";
import Body from "./routes/Body";
import HomePage from "./routes/HomePage";
import LandingPage from "./routes/LandingPage";
import Login from "./routes/Login";
import OtpVerification from "./routes/OtpVerification";
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Loading />,
      },
      {
        path: "/home",
        element: <LandingPage />,
      },
      {
        path: "/signup",
        element: <Login />,
      },
      {
        path: "/verifyotp",
        element: <OtpVerification />,
      },
    ],
  },
]);


createRoot(document.getElementById("root")).render(
  <RouterProvider router={appRouter}>
    <App />
  </RouterProvider>
);

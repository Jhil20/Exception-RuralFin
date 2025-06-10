import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Loading from "./components/Loading";
import UserDashboard from "./routes/UserDashboard";
import LandingPage from "./routes/LandingPage";
import Login from "./routes/Login";
import OtpVerification from "./routes/OtpVerification";
import Register from "./routes/Register";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import RazorPay from "./routes/RazorPay";
import AgentDashboard from "./routes/AgentDashboard";
import AdminDashboard from "./routes/AdminDashboard";
import LearningDashboard from "./components/LearningDashboard";

//start by fixing transaction otp and  user to user debit and credit

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
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/verifyotp",
        element: <OtpVerification />,
      },
      {
        path: "/dashboard",
        element: <UserDashboard />,
      },
      {
        path: "/razorpay",
        element: <RazorPay />,
      },
      {
        path: "/agentDashboard",
        element: <AgentDashboard />,
      },
      {
        path: "/adminDashboard",
        element: <AdminDashboard />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={appRouter}>
      <App />
    </RouterProvider>
  </Provider>
);

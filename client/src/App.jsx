import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import UserDashboard from "./routes/UserDashboard";
import { useSelector } from "react-redux";
import Loader from "./components/Loader";

function App() {
  const isLoading = useSelector((state) => state.loading.isLoading);

  return <>{isLoading ? <Loader /> : <Outlet />}</>;
}

export default App;

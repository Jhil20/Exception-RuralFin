import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import UserDashboard from "./routes/UserDashboard";

function App() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default App;

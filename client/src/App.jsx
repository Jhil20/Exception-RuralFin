import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import UserDashboard from "./routes/UserDashboard";
import { useSelector } from "react-redux";
import Loader from "./components/Loader";
import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/Header";

function App() {
  const isLoading = useSelector((state) => state.loading.isLoading);

  // return <>{isLoading ? <Loader /> :<>
  // <ScrollToTop />
  // <Outlet />
  // </> }</>;
  return (
    <>
      <Header />
      <ScrollToTop />
      <Outlet />
    </>
  );
}

export default App;

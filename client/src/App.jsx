import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import UserDashboard from "./routes/UserDashboard";
import { useSelector } from "react-redux";
import Loader from "./components/Loader";
import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";

function App() {
  const isLoading = useSelector((state) => state.loading.isLoading);

  // return <>{isLoading ? <Loader /> :<>
  // <ScrollToTop />
  // <Outlet />
  // </> }</>;
  return (
    <>
      <Header />
      <ToastContainer
        className={"z-50"}
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ScrollToTop />
      <Outlet />
    </>
  );
}

export default App;

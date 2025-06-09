import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import UserDashboard from "./routes/UserDashboard";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./components/Loader";
import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/Header";
import { toast, ToastContainer } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { createSocket, getSocket } from "./utils/socket";
import speak from "./utils/speak";
import capitalize from "./utils/capitalize";

function App() {
  const isLoading = useSelector((state) => state.loading.isLoading);
  const dispatch = useDispatch();
  const [decoded, setDecoded] = useState(null);
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setDecoded(decodedToken);
      const socket = createSocket(decodedToken.id);
      // console.log("Socket created for user:", decodedToken.id);
    }
  }, []);

  useEffect(() => {
    if (!decoded) return;
    const socket = getSocket(decoded.id);
    const handler1 = (data) => {
      // console.log("User Agent Request Accepted :", data);
      if (data.userId._id == decoded.id) {
        toast.success(
          `Your ${
            data.conversionType == "cashToERupees"
              ? "cash to eRupees"
              : "eRupees to cash"
          } request has been accepted by ${capitalize(
            data.agentId.firstName
          )} ${capitalize(data.agentId.lastName)}`
        );
      }
    };

    const handler2 = (data) => {
      // console.log("User Agent Request Rejected:", data);
      if (data.userId._id == decoded.id) {
        toast.error(
          `Your ${
            data.conversionType == "cashToERupees"
              ? "cash to eRupees"
              : "eRupees to cash"
          } request has been rejected by ${capitalize(
            data.agentId.firstName
          )} ${capitalize(data.agentId.lastName)}`
        );
      }
    };
    const handler3 = (data) => {
      // console.log("request completed deposit");
      if (data.userId._id == decoded.id) {
        toast.info(
          `Your ${
            data.conversionType == "cashToERupees"
              ? "cash to eRupees"
              : "eRupees to cash"
          } request has been completed by ${capitalize(
            data.agentId.firstName
          )} ${capitalize(data.agentId.lastName)}`
        );
        toast.success(
          `₹${data.amount - data.commission} has been deposited successfully`
        );
      }
    };

    const handler4 = (data) => {
      if (data.userId._id == decoded.id) {
        toast.info(
          `Your ${
            data.conversionType == "cashToERupees"
              ? "cash to eRupees"
              : "eRupees to cash"
          } request has been completed by ${capitalize(
            data.agentId.firstName
          )} ${capitalize(data.agentId.lastName)}`
        );
        toast.success(
          `₹${data.amount + data.commission} has been withdrawn successfully`
        );
      }
    };
    if (socket) {
      socket.on("UserAgentRequestAcceptedBackend", handler1);
      socket.on("UserAgentRequestRejectedBackend", handler2);
      socket.on("UserAgentDepositCompletedBackend", handler3);
      socket.on("UserAgentWithdrawCompletedBackend", handler4);
    }

    return () => {
      socket.off("UserAgentWithdrawCompletedBackend", handler4);
      socket.off("UserAgentRequestAcceptedBackend", handler1);
      socket.off("UserAgentRequestRejectedBackend", handler2);
      socket.off("UserAgentDepositCompletedBackend", handler3);
    };
  }, [decoded]);
  if (isLoading) {
    return <Loader />;
  }

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

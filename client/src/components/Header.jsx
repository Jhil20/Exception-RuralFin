import React, { useEffect, useState } from "react";
import {
  Bell,
  BellIcon,
  BookOpen,
  CreditCard,
  DollarSign,
  Menu,
  Search,
  Server,
  Shield,
  User,
  Wallet,
  X,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { NotSignedIn } from "../redux/slices/isSignInSlice";
import Cookies from "js-cookie";
import { hideLoader, showLoader } from "../redux/slices/loadingSlice";
import { disconnectSocket, getSocket } from "../utils/socket";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { BACKEND_URL } from "../utils/constants";
import { useMemo } from "react";
import { socketDisconnected } from "../redux/slices/socketSlice";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSignedIn = useSelector((state) => state.signin.isSignedIn);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const token = Cookies.get("token");
  const decoded = useMemo(() => {
    if (token) {
      return jwtDecode(token);
    }
    return null;
  }, [token]);

  const handleLogout = () => {
    dispatch(showLoader());
    if (Cookies.get("token")) {
      Cookies.remove("token");
    }
    disconnectSocket();
    dispatch(socketDisconnected());
    dispatch(NotSignedIn());
    navigate("/home");
    dispatch(hideLoader());
  };

  const getIcon = (type) => {
    switch (type) {
      case "budget":
        return <Wallet size={16} className="text-gray-900" />;
      case "transaction":
        return <CreditCard size={16} className="text-gray-900" />;
      case "system":
        return <Server size={16} className="text-gray-900" />;
    }
  };

  useEffect(()=>{
    getNotifications();
  },[location.pathname]);

  const getNotifications = async () => {
    // console.log("get Notifications called");
    try {
      if (decoded) {
        const type = location.pathname === "/dashboard" ? "User" : "Agent";
        // console.log(
        //   "Fetching notifications for user:",
        //   decoded?.id,
        //   "Type:",
        //   type
        // );
        const response = await axios.post(
          `${BACKEND_URL}/api/notification/getNotifications`,
          {
            userId: decoded.id,
            userType: type,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log("Notifications fetched:", response.data);
        setNotifications(response.data.data);
      }
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  };

  // useEffect(() => {
  //   getNotifications();
  // }, [decoded]);

  useEffect(() => {
    if (!decoded) return;
    const socket = getSocket(decoded.id);
    const handler = (data) => {
      // console.log("SOCKET OF NOTIFIACTION CALLED IN FRONTEND ", data);
      setNotifications((prev) => [...prev, ...data]);
      getNotifications();
    };

    const handler2 = (data) => {
      // console.log("SOCKET OF SYSTEM SETTINGS CALLED IN FRONTEND ", data);
      if (location.pathname != "/adminDashboard") {
        // console.log(
        //   "System settings updated, fetching notifications inside if"
        // );
        const notification = data?.data?.filter(
          (noti) => noti.userId === decoded.id
        );
        setNotifications((prev) => [...prev, notification]);
        getNotifications();
      }
    };

    socket.on("newNotificationSend", handler);
    socket.on("updateSystemSettingsBackend", handler2);

    return () => {
      socket.off("newNotificationSend", handler);
      socket.off("updateSystemSettingsBackend", handler2);
    };
  }, [decoded]);

  const markAsRead = async (notificationId) => {
    try {
      setNotifications((prev) =>
        prev.filter((noti) => {
          if (noti._id === notificationId) {
            return { ...noti, read: true };
          }
          return noti;
        })
      );
      const response = await axios.post(
        `${BACKEND_URL}/api/notification/updateNotificationRead`,
        {
          notificationId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("Notification marked as read:", response.data);
      getNotifications();
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      setNotifications((prev) => prev.map((noti) => ({ ...noti, read: true })));
      const response = await axios.post(
        `${BACKEND_URL}/api/notification/markAllAsRead`,
        {
          userId: decoded.id,
          userType: location.pathname === "/dashboard" ? "User" : "Agent",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("All notifications marked as read:", response.data);
      getNotifications();
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  return (
    <header className="bg-white border-b h-[9.1vh] border-gray-200 sticky w-full top-0 z-50 shadow-sm">
      {showNotifications && (
        <div className="fixed inset-0 bg-black/30  backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="h-11/12 lg:h-10/12 w-11/12 lg:w-6/12 p-6 bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Notifications
                </h2>
              </div>
              <X
                size={32}
                onClick={() => {
                  setShowNotifications(false);
                }}
                className="hover:bg-gray-200 p-1  mt-[1px] cursor-pointer rounded-md transition-all duration-300"
              />
            </div>

            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-gray-500">
                {notifications.length}{" "}
                {notifications.length === 1 ? "notification" : "notifications"}
              </p>
              <button
                onClick={markAllAsRead}
                className="text-sm cursor-pointer text-gray-900 font-medium hover:underline transition-all duration-300"
              >
                Mark all as read
              </button>
            </div>

            <div className="overflow-y-auto h-[calc(100%-100px)] pr-1">
              {notifications.length > 0 ? (
                <div className="space-y-3">
                  {notifications.map((notification) => (
                    <div
                      key={notification._id}
                      className={`p-2 lg:p-4 rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md ${
                        notification.read
                          ? "bg-gray-50"
                          : "bg-white border-l-4 border-gray-900 shadow-sm"
                      } ${
                        notification.type == "budget"
                          ? notification.read == false
                            ? "bg-white border-l-4 border-red-500 shadow-sm"
                            : "bg-gray-50 border-l-4 border-red-300"
                          : notification.read == false
                          ? "bg-white border-l-4 border-gray-900 shadow-sm"
                          : "bg-gray-50"
                      }
                        
                      `}
                    >
                      <div className="flex items-start">
                        <div
                          className={`p-2 rounded-full mr-2 lg:mr-3 ${
                            notification.read ? "bg-gray-100" : "bg-gray-200"
                          }`}
                        >
                          {getIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex text-xs sm:text-sm md:text-base justify-between items-start">
                            <div>
                              <p
                                className={`${
                                  notification.read
                                    ? "font-normal"
                                    : "font-semibold"
                                } text-gray-900`}
                              >
                                {notification.message}
                              </p>
                              <p className="text-xs  text-gray-500 mt-1">
                                {new Date(
                                  notification.createdAt
                                ).toLocaleDateString() +
                                  " " +
                                  new Date(
                                    notification.createdAt
                                  ).toLocaleTimeString()}
                              </p>
                            </div>
                            {!notification.read && (
                              <button
                                onClick={() => markAsRead(notification._id)}
                                className="ml-2 w-20 lg:w-2/12 py-2 px-2 cursor-pointer text-xs text-gray-700 hover:text-gray-900 p-1 hover:bg-gray-100 rounded transition-colors duration-300"
                              >
                                Mark as read
                              </button>
                            )}
                          </div>
                          <div className="mt-2">
                            <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded capitalize">
                              {notification.type}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-500">
                  <Bell size={48} className="mb-4 opacity-20" />
                  <p className="text-lg font-medium">No notifications found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="mx-auto px-4 ">
        <div className="flex justify-between items-center w-full h-16">
          {/* Logo */}
          <div
            onClick={() => {
              navigate("/");
            }}
            className="flex-shrink-0 flex cursor-pointer items-center"
          >
            <span className="text-2xl font-bold text-black">
              Rural<span className="text-gray-500">Fin</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          {location.pathname === "/dashboard" ||
          location.pathname === "/agentDashboard" ||
          location.pathname === "/adminDashboard" ? (
            <div></div>
          ) : (
            <nav className="hidden md:flex md:space-x-5 lg:space-x-8">
              {isSignedIn ||
              location.pathname === "/home" ||
              location.pathname === "/login" ||
              location.pathname === "/register" ? (
                <>
                  <Link
                    to="/home"
                    className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200"
                  >
                    Home
                  </Link>
                  <Link
                    to="/home#features"
                    className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200"
                  >
                    Features
                  </Link>
                  <Link
                    to="/home#how-it-works"
                    className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200"
                  >
                    Agent Model
                  </Link>
                  <Link
                    to="/home#security-section"
                    className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200"
                  >
                    Security
                  </Link>
                  <Link
                    to="/home#financial-tools"
                    className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200"
                  >
                    Budget Tracking
                  </Link>
                </>
              ) : (
                <>
                  <a
                    href="#dashboard"
                    className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200"
                  >
                    AgentDashboard
                  </a>
                  <a
                    href="#transactions"
                    className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200"
                  >
                    Transactions
                  </a>
                  <a
                    href="#cards"
                    className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200"
                  >
                    Cards
                  </a>
                  <a
                    href="#payments"
                    className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200"
                  >
                    Payments
                  </a>
                  <a
                    href="#settings"
                    className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200"
                  >
                    Settings
                  </a>
                </>
              )}
            </nav>
          )}

          {/* Right Side Icons */}
          {isSignedIn ? (
            <div className="h-fit w-fit flex items-center space-x-6">
              {location.pathname != "/adminDashboard" && (
                <button
                  onClick={() => setShowNotifications(true)}
                  className="bg-gray-50 p-[6px] rounded-full text-gray-500 hover:ring-2 hover:ring-gray-600  hover:text-gray-700 hover:bg-gray-100 cursor-pointer focus:outline-none  transition-all duration-400"
                >
                  <div className=" absolute right-35 h-4 w-4 text-xs rounded-full bg-gray-600 text-white flex items-center justify-center top-3 ">
                    {notifications.filter((noti) => noti.read == false).length}
                  </div>
                  <BellIcon size={24} className="pt-1" />
                </button>
              )}

              <button
                onClick={() => {
                  handleLogout();
                }}
                to={"/login"}
                className="flex items-center space-x-4"
              >
                <div className="flex cursor-pointer text-sm font-medium text-gray-600 hover:ring-2 hover:text-gray-700 hover:ring-gray-700 items-center space-x-2 bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-300">
                  <User size={18} />
                  <span>Logout</span>
                </div>
              </button>
            </div>
          ) : (
            <Link
              onClick={() => {
                // window.location.reload();
              }}
              to={"/login"}
              className="flex items-center space-x-4"
            >
              <button className="flex cursor-pointer  hover:ring-2 hover:ring-gray-900 items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-full focus:outline-none  transition-all duration-300">
                <User size={18} />
                <span className="text-sm font-medium text-gray-800">
                  Account
                </span>
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

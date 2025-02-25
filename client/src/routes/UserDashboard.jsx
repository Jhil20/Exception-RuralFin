import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userLoggedout } from "../redux/slices/signInSlice";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

const UserDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);

  // Sample data based on the image
  const userData = {
    balance: 10000,
    rewards: 250,
    activity: 12,
    agents: [
      {
        id: 1,
        name: "Rahul K",
        rating: 4.8,
        location: "North Delhi",
        status: "Available",
      },
      {
        id: 2,
        name: "Priya S",
        rating: 4.9,
        location: "South Delhi",
        status: "Busy",
      },
      {
        id: 3,
        name: "Amit P",
        rating: 4.7,
        location: "East Delhi",
        status: "Available",
      },
    ],
    transactions: [
      { id: 1, title: "Trans #1", time: "2h ago", amount: 500 },
      { id: 2, title: "Trans #2", time: "2h ago", amount: 500 },
      { id: 3, title: "Trans #3", time: "2h ago", amount: 500 },
    ],
    quickActions: [
      { id: 1, title: "Send", icon: "arrow-up-right" },
      { id: 2, title: "Deposit", icon: "wallet" },
      { id: 3, title: "Budget", icon: "clock" },
    ],
  };

  const handleLogout = () => {
    Cookies.remove("jwt-token");
    console.log("logout clled");
    dispatch(userLoggedout());
    navigate("/login");
  };

  return (
    <div className="w-full p-4 bg-gray-50 h-screen">
      {/* Header Section */}
      {showNotifications && (
        <div className="h-full w-full bg-gray-900/80  fixed top-0 left-0 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-4 shadow-lg h-2/3 w-6/12">
            <div className="flex justify-between items-start h-1/12">
              <h1 className="text-lg font-semibold">Notifications</h1>
              <button
                className="cursor-pointer rounded-full w-10 hover:bg-gray-200 transition-all duration-500 flex justify-center items-center p-2"
                onClick={() => setShowNotifications(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex h-11/12  justify-center items-center">
              <h2>No Notifictaions received!!</h2>
            </div>
          </div>
        </div>
      )}
      <div className="bg-white rounded-lg p-4 mb-4 shadow-sm flex justify-between items-center">
        <Link to="/userProfile" className=" relative z-0">
          <div className="flex cursor-pointer items-center">
            <div className="w-10 h-10 rounded-full bg-blue-500 mr-4">
              {/* User Icon */}
            </div>
            <div>
              <h1 className="text-xl font-semibold">Welcome back, User!</h1>
              <p className="text-gray-500 text-sm">Your financial summary</p>
            </div>
          </div>
        </Link>
        <div className="flex">
          <button
            onClick={() => setShowNotifications(true)}
            className="cursor-pointer rounded-full w-12 hover:bg-gray-200 transition-all duration-500 flex justify-center items-center p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent Link navigation
              handleLogout();
            }}
            className="w-30  relative z-10 hover:ring-4 ring-sky-800 transition-all duration-600 bg-gradient-to-r from-blue-500 to-blue-700 text-white flex justify-center items-center rounded-xl p-2 h-12 pb-3 ml-2 font-semibold text-black text-lg cursor-pointer "
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex space-x-4">
        {/* Financial Cards */}
        <div className="w-2/3">
          <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Balance Card */}
            <div className=" bg-gradient-to-r cursor-default from-blue-500 to-blue-700  ring-blue-800 text-white rounded-lg p-4 shadow-sm">
              <div className="mb-4">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <div className="text-sm mb-1">Balance</div>
              <div className="text-2xl font-bold">
                ₹{userData.balance.toLocaleString()}
              </div>
            </div>

            {/* Rewards Card */}
            <div className="bg-gradient-to-r cursor-default from-purple-500 to-purple-700 text-white rounded-lg p-4 shadow-sm">
              <div className="mb-4">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                  />
                </svg>
              </div>
              <div className="text-sm mb-1">Rewards</div>
              <div className="text-2xl font-bold">{userData.rewards} pts</div>
            </div>

            {/* Activity Card */}
            <div className="bg-gradient-to-r cursor-default from-green-500 to-green-700 text-white rounded-lg p-4 shadow-sm">
              <div className="mb-4">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                  />
                </svg>
              </div>
              <div className="text-sm mb-1">Activity</div>
              <div className="text-2xl font-bold">
                {userData.activity} trans
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 w-full md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              {/* Agent Selection Section */}
              <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
                <h2 className="text-lg font-semibold mb-4">Select an Agent</h2>
                <div className="space-y-3 grid grid-cols-2 gap-4 gap-y-2">
                  {userData.agents.map((agent) => (
                    <div
                      key={agent.id}
                      className="flex items-center justify-between border border-gray-200 hover:bg-gray-200 cursor-pointer tranisition-all duration-500 shadow-lg rounded-lg p-3"
                    >
                      <div className="flex items-center">
                        <div className="mr-3">
                          <svg
                            className="h-6 w-6 text-gray-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium">{agent.name}</div>
                          <div className="flex items-center">
                            <svg
                              className="h-4 w-4 text-yellow-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-sm ml-1">{agent.rating}</span>
                          </div>
                          <div className="text-sm text-gray-500">
                            {agent.location}
                          </div>
                        </div>
                      </div>
                      <div>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            agent.status === "Available"
                              ? "bg-green-100 text-green-600"
                              : "bg-orange-100 text-orange-600"
                          }`}
                        >
                          {agent.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white w-full rounded-lg p-4 shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-5 gap-4">
                  {userData.quickActions.map((action) => (
                    <button
                      key={action.id}
                      className="flex flex-col items-center justify-center p-4 border cursor-pointer border-gray-200 shadow-lg hover:bg-gray-200 transition-all duration-500 rounded-lg"
                    >
                      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mb-2">
                        {action.icon === "arrow-up-right" && (
                          <svg
                            className="h-5 w-5 text-gray-900"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 11l5-5m0 0l5 5m-5-5v12"
                            />
                          </svg>
                        )}
                        {action.icon === "wallet" && (
                          <svg
                            className="h-5 w-5 text-gray-900"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                            />
                          </svg>
                        )}
                        {action.icon === "clock" && (
                          <svg
                            className="h-5 w-5 text-gray-900"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        )}
                      </div>
                      <span className="text-sm">{action.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Recent Transactions */}
        <div className="bg-white w-1/3 rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
          <div className="space-y-3">
            {userData.transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between border border-gray-200 rounded-lg shadow-lg hover:bg-gray-200 transition-all duration-500 cursor-pointer p-3"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-400 mr-3"></div>
                  <div>
                    <div className="font-medium">{transaction.title}</div>
                    <div className="text-sm text-gray-500">
                      {transaction.time}
                    </div>
                  </div>
                </div>
                <div className="font-medium">₹{transaction.amount}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

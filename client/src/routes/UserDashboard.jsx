import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userLoggedout } from "../redux/slices/signInSlice";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import AgentCard from "../components/AgentCard";
import RecentTransactionCard from "../components/RecentTransactionCard";
import axios from "axios";

const UserDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAgentTranscationOptions, setShowAgentTranscationOptions] =
    useState(false);
  const [showSend, setShowSend] = useState(false);
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showRecentTransactionInfo, setShowRecentTransactionInfo] =useState(false);

  const [showSendFavorites, setShowSendFavorites] = useState(true);
  const handleLogout = () => {
    Cookies.remove("jwt-token");
    console.log("logout clled");
    dispatch(userLoggedout());
    navigate("/login");
  };

  const handleBudgetClick = () => {
    navigate("/budget");
  };

  const [searchIdValue, setSearchIdValue] = useState("");

  const handleSendIdSearchChange = (e) => {
    setSearchIdValue(e.target.value);
  };

  useEffect(() => {
    if(!showSendFavorites){
      getUsers();
    }
  }, [showSendFavorites]);

  const getUsers=async()=>{
    try{
      const result = await axios.get("http://localhost:5000/users");
      console.log("result",result)
    }catch(error){
      console.log(error);
    }
  }

  return (
    <div className="w-full p-4 bg-gray-50 h-screen">
      {/* Header Section */}
      {showNotifications && (
        <div className="h-full w-full bg-gray-900/80  fixed top-0 left-0 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-4 shadow-lg h-2/3 w-6/12">
            <div className="flex justify-between items-start h-1/12">
              <h1 className="text-lg font-semibold ml-2">Notifications</h1>
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
      {showAgentTranscationOptions && (
        <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center">
          <div className="bg-white rounded-xl p-6 shadow-2xl shadow-black/40 w-1/3 max-w-lg relative">
            <div className="flex justify-between items-center border-b pb-3">
              <h1 className="text-xl font-bold text-gray-800">
                Agent Transaction Panel
              </h1>
              <button
                className="p-2 cursor-pointer rounded-full hover:bg-gray-300 transition duration-500"
                onClick={() => setShowAgentTranscationOptions(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-600"
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
            <div className="py-4">
              <h2 className="text-lg font-semibold text-gray-700">
                Agent Information
              </h2>
              <div className="mt-3 space-y-2 text-gray-600">
                <p>
                  <span className="font-semibold">Agent Name:</span> Atrey & K
                </p>
                <p>
                  <span className="font-semibold">Rating:</span> 4.8 ⭐
                </p>
                <p>
                  <span className="font-semibold">Address:</span> Kaka ni Pav
                  Bhaji
                </p>
                <p>
                  <span className="font-semibold">Agent Budget:</span> ₹100,000
                </p>
              </div>
            </div>
            <div className="flex justify-around mt-6">
              <button className="w-5/12 py-2 rounded-lg bg-gradient-to-tr from-blue-500 shadow-gray-500 to-blue-950 cursor-pointer text-white font-semibold text-md hover:from-blue-950 hover:to-blue-500 transition duration-700 shadow-md">
                Withdraw
              </button>
              <button className="w-5/12 py-2 rounded-lg bg-gradient-to-tr from-green-500 shadow-gray-500 to-green-950 cursor-pointer text-white font-semibold text-md hover:from-green-950 hover:to-green-500 transition duration-700 shadow-md">
                Deposit
              </button>
            </div>
          </div>
        </div>
      )}

      {showSend && (
        <div className="h-full w-full bg-gray-900/80  fixed top-0 left-0 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-4 shadow-lg h-10/12 w-6/12">
            <div className="flex justify-between items-start mb-2 h-1/12">
              <h1 className="text-lg mt-1 font-semibold ml-2">
                Send money to User
              </h1>
              <button
                className="cursor-pointer rounded-full w-10 hover:bg-gray-200 transition-all duration-500 flex justify-center items-center p-2"
                onClick={() => setShowSend(false)}
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
            <div className="flex w-full h-1/12">
              <div
                onClick={() => setShowSendFavorites(true)}
                className={`w-1/2 h-full  mr-4 ${
                  showSendFavorites
                    ? "bg-blue-900 shadow-black/50 text-white"
                    : "bg-blue-100 text-black"
                } border-1  hover:bg-blue-900 hover:text-white hover:shadow-black/50 transition duration-700 cursor-pointer border-black/20 shadow-lg flex justify-center items-center text-lg font-semibold rounded-xl`}
              >
                Favourites
              </div>
              <div
                onClick={() => setShowSendFavorites(false)}
                className={`w-1/2 h-full ${
                  !showSendFavorites
                    ? "bg-blue-900 text-white shadow-black/50 "
                    : "bg-blue-100 text-black"
                }bg-blue-100 border-1 hover:bg-blue-900 hover:text-white hover:shadow-black/50 transition duration-700 cursor-pointer border-black/20 shadow-lg flex justify-center items-center text-lg font-semibold rounded-xl`}
              >
                Find User
              </div>
            </div>
            <div className="flex h-10/12 justify-center items-center">
              {showSendFavorites && <h2>show favourites </h2>}
              {!showSendFavorites && (
                <div className="w-full h-full flex justify-center items-start">
                  <div className="w-8/12 mt-6">
                    <input
                      onChange={handleSendIdSearchChange}
                      type="text"
                      value={searchIdValue}
                      placeholder="Enter Rural Fin Id"
                      className="w-full h-12 border-2 hover:border-black/60 transition duration-500 border-gray-200 rounded-lg p-4 mb-4"
                    />
                  </div>

                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showDeposit && (
        <div className="h-full w-full bg-gray-900/80  fixed top-0 left-0 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-4 shadow-lg h-10/12 w-6/12">
            <div className="flex justify-between items-start mb-2 h-1/12">
              <h1 className="text-lg mt-1 font-semibold ml-2">
                Deposit money in your account
              </h1>
              <button
                className="cursor-pointer rounded-full w-10 hover:bg-gray-200 transition-all duration-500 flex justify-center items-center p-2"
                onClick={() => setShowDeposit(false)}
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
            <div className="flex w-full h-1/12">
              <div
                onClick={() => setShowSendFavorites(true)}
                className={`w-1/2 h-full  mr-4 ${
                  showSendFavorites
                    ? "bg-blue-900 shadow-black/50 text-white"
                    : "bg-blue-100 text-black"
                } border-1  hover:bg-blue-900 hover:text-white hover:shadow-black/50 transition duration-700 cursor-pointer border-black/20 shadow-lg flex justify-center items-center text-lg font-semibold rounded-xl`}
              >
                Favourite Agents
              </div>
              <div
                onClick={() => setShowSendFavorites(false)}
                className={`w-1/2 h-full ${
                  !showSendFavorites
                    ? "bg-blue-900 text-white shadow-black/50 "
                    : "bg-blue-100 text-black"
                }bg-blue-100 border-1 hover:bg-blue-900 hover:text-white hover:shadow-black/50 transition duration-700 cursor-pointer border-black/20 shadow-lg flex justify-center items-center text-lg font-semibold rounded-xl`}
              >
                Find Agent
              </div>
            </div>
            <div className="flex h-10/12 justify-center items-center">
              {showSendFavorites && <h2>show favourites </h2>}
              {!showSendFavorites && (
                <div className="w-full h-full flex justify-center items-start">
                  <div className="w-8/12 mt-6">
                    <input
                      onChange={handleSendIdSearchChange}
                      type="text"
                      value={searchIdValue}
                      placeholder="Enter Rural Fin Id"
                      className="w-full h-12 border-2 hover:border-black/60 transition duration-500 border-gray-200 rounded-lg p-4 mb-4"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showWithdraw && (
        <div className="h-full w-full bg-gray-900/80  fixed top-0 left-0 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-4 shadow-lg h-10/12 w-6/12">
            <div className="flex justify-between items-start mb-2 h-1/12">
              <h1 className="text-lg mt-1 font-semibold ml-2">
                Deposit money in your account
              </h1>
              <button
                className="cursor-pointer rounded-full w-10 hover:bg-gray-200 transition-all duration-500 flex justify-center items-center p-2"
                onClick={() => setShowWithdraw(false)}
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
            <div className="flex w-full h-1/12">
              <div
                onClick={() => setShowSendFavorites(true)}
                className={`w-1/2 h-full  mr-4 ${
                  showSendFavorites
                    ? "bg-blue-900 shadow-black/50 text-white"
                    : "bg-blue-100 text-black"
                } border-1  hover:bg-blue-900 hover:text-white hover:shadow-black/50 transition duration-700 cursor-pointer border-black/20 shadow-lg flex justify-center items-center text-lg font-semibold rounded-xl`}
              >
                Favourite Agents
              </div>
              <div
                onClick={() => setShowSendFavorites(false)}
                className={`w-1/2 h-full ${
                  !showSendFavorites
                    ? "bg-blue-900 text-white shadow-black/50 "
                    : "bg-blue-100 text-black"
                }bg-blue-100 border-1 hover:bg-blue-900 hover:text-white hover:shadow-black/50 transition duration-700 cursor-pointer border-black/20 shadow-lg flex justify-center items-center text-lg font-semibold rounded-xl`}
              >
                Find Agent
              </div>
            </div>
            <div className="flex h-10/12 justify-center items-center">
              {showSendFavorites && <h2>show favourites </h2>}
              {!showSendFavorites && (
                <div className="w-full h-full flex justify-center items-start">
                  <div className="w-8/12 mt-6">
                    <input
                      onChange={handleSendIdSearchChange}
                      type="text"
                      value={searchIdValue}
                      placeholder="Enter Rural Fin Id"
                      className="w-full h-12 border-2 hover:border-black/60 transition duration-500 border-gray-200 rounded-lg p-4 mb-4"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

{showRecentTransactionInfo && (
        <div className="h-full w-full bg-gray-900/80  fixed top-0 left-0 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-4 shadow-lg h-9/12 w-5/12">
            <div className="flex justify-between items-start mb-2 h-1/12">
              <h1 className="text-lg mt-1 font-semibold ml-2">
                Transaction information
              </h1>
              <button
                className="cursor-pointer rounded-full w-10 hover:bg-gray-200 transition-all duration-500 flex justify-center items-center p-2"
                onClick={() => setShowRecentTransactionInfo(false)}
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
            
            <div className="flex h-11/12 justify-center items-center">
              <h1>show transaction information</h1>
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
            className="w-30  relative z-10 transition duration-700 bg-gradient-to-tr from-blue-500 to-blue-900 hover:from-blue-900 hover:to-blue-500 text-white flex justify-center items-center rounded-xl p-2 h-12 pb-3 ml-2 font-semibold text-lg cursor-pointer"
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
            <div className=" bg-gradient-to-r cursor-default from-blue-900 to-blue-500 shadow-md shadow-gray-400 ring-blue-800 text-white rounded-lg p-4">
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
              <div className="text-2xl font-bold">₹10,000</div>
            </div>

            {/* Rewards Card */}
            <div className="bg-gradient-to-r cursor-default from-purple-900 to-purple-500 text-white rounded-lg p-4 shadow-md shadow-gray-400">
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
              <div className="text-2xl font-bold">250 pts</div>
            </div>

            {/* Activity Card */}
            <div className="bg-gradient-to-r cursor-default shadow-md shadow-gray-400 from-green-800 to-green-500 text-white rounded-lg p-4">
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
              <div className="text-2xl font-bold">12 trans</div>
            </div>
          </div>

          <div className="grid grid-cols-2 w-full md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              {/* Agent Selection Section */}
              <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
                <h2 className="text-lg font-semibold mb-4">Select an Agent</h2>
                <div className="space-y-3 grid grid-cols-2 gap-4 gap-y-2">
                  {/* Agent 1 */}
                  <AgentCard onClick={setShowAgentTranscationOptions} />
                  <AgentCard onClick={setShowAgentTranscationOptions} />
                  <AgentCard onClick={setShowAgentTranscationOptions} />
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white w-full rounded-lg p-4 shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-5 gap-4">
                  {/* Send */}
                  <button
                    onClick={() => setShowSend(true)}
                    className="flex flex-col items-center justify-center p-4 border hover:shadow-black/40 cursor-pointer border-gray-200 shadow-lg hover:bg-gray-200 transition-all duration-500 rounded-lg"
                  >
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mb-2">
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
                    </div>
                    <span className="text-sm">Send</span>
                  </button>

                  {/* Deposit */}
                  <button
                    onClick={() => setShowDeposit(true)}
                    className="flex flex-col items-center hover:shadow-black/40 justify-center p-4 border cursor-pointer border-gray-200 shadow-lg hover:bg-gray-200 transition-all duration-500 rounded-lg"
                  >
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mb-2">
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
                    </div>
                    <span className="text-sm">Deposit</span>
                  </button>

                  {/* Withdraw */}
                  <button
                    onClick={() => setShowWithdraw(true)}
                    className="flex flex-col items-center hover:shadow-black/40 justify-center p-4 border cursor-pointer border-gray-200 shadow-lg hover:bg-gray-200 transition-all duration-500 rounded-lg"
                  >
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mb-2">
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
                          d="M17 13l-5 5m0 0l-5-5m5 5V6"
                        />
                      </svg>
                    </div>
                    <span className="text-sm">Withdraw</span>
                  </button>

                  {/* Budget */}
                  <button
                    onClick={handleBudgetClick}
                    className="flex flex-col items-center hover:shadow-black/40 justify-center p-4 border cursor-pointer border-gray-200 shadow-lg hover:bg-gray-200 transition-all duration-500 rounded-lg"
                  >
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mb-2">
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
                    </div>
                    <span className="text-sm">Budget</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Recent Transactions */}
        <div className="bg-white w-1/3 rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
          <div className="space-y-3">
            {/* Transaction 1 */}
            <RecentTransactionCard setShowRecentTransactionInfo={setShowRecentTransactionInfo} />

            {/* Transaction 2 */}
            <RecentTransactionCard setShowRecentTransactionInfo={setShowRecentTransactionInfo} />

            {/* Transaction 3 */}
            <RecentTransactionCard setShowRecentTransactionInfo={setShowRecentTransactionInfo} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

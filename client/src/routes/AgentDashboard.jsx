import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { userLoggedout } from "../redux/slices/signInSlice";
import { useNavigate } from "react-router-dom";

const AgentDashboard = () => {
  const [showAgentProfile, setShowAgentProfile] = useState(false);
  const [agentProfile, setAgentProfile] = useState({});
  const dispatch = useDispatch();
  const navigate=useNavigate();
  useEffect(() => {
    getAgentData();
  }, []);
  const token=Cookies.get("jwt-token");
  const decoded=jwtDecode(token);
  console.log("decoded",decoded);
  const getAgentData = async () => {
    try{
        const agent=await axios.get(`http://localhost:5000/agent/${decoded.agent_id}`);
        console.log("agent data",agent);
        setAgentProfile(agent?.data?.data?.agent);
        // const wallet=await axios.get(`http://localhost:5000/agent/getWallet/${decoded.agent_id}`);
        // console.log("wallet data",wallet);
    }catch(error){
        console.log("error",error);
    }
  };


  const handleLogout = () => {
    Cookies.remove("jwt-token");
    dispatch(userLoggedout());
    navigate("/login");
  }

  return (
    <div className="p-6 w-full mx-auto">
      {showAgentProfile && (
        <div className="h-full w-full bg-gray-900/80  fixed top-0 left-0 z-50 flex justify-center items-center">
          <div className="bg-gradient-to-tr from-white to-blue-400 rounded-lg p-4 pb-0 shadow-lg h-8/12 w-7/12">
            <div className="flex justify-between items-start h-1/12">
              <h1 className="text-xl font-bold ml-2"></h1>
              <button
                className="cursor-pointer rounded-full w-10 transition-all duration-500 flex justify-center items-center p-2"
                onClick={() => setShowAgentProfile(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-900"
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
            <div className="flex h-11/12 w-full justify-center items-center">
              <div className="w-3/12 h-full flex justify-center mr-4 mt-10 items-start">
                <div className="w-40 h-40 rounded-full text-white flex justify-center hover:from-blue-900 hover:to-blue-500 transition duration-700 items-center bg-gradient-to-tr from-blue-500 to-blue-900 ">
                  <h2 className="text-5xl font-bold">
                    {agentProfile?.full_name?.[0].toUpperCase()}
                    {agentProfile?.full_name
                      ?.split(" ")?.[1][0]
                      .toUpperCase()}
                  </h2>
                </div>
              </div>
              <div className="w-9/12 flex h-full">
                <div className="w-1/2 h-full">
                  <h2 className="text-2xl font-bold mt-2">
                    Personal Information
                  </h2>
                  <h2 className="text-lg font-semibold mt-6">
                    Full Name: {agentProfile?.full_name}
                  </h2>
                  <h2 className="text-lg font-semibold mt-2">
                    Email: {agentProfile?.email}
                  </h2>
                  <h2 className="text-lg font-semibold mt-2">
                    Phone : {agentProfile?.phone_number}
                  </h2>
                  <h2 className="text-lg font-semibold mt-2">
                    Age: {agentProfile?.age}
                  </h2>
                  <h2 className="text-lg font-semibold mt-2">
                    Gender: {agentProfile?.gender}
                  </h2>
                  <h2 className="text-lg font-semibold mt-2">
                    Street Address: {agentProfile?.address}
                  </h2>
                  <h2 className="text-lg font-semibold mt-2">
                    City: {agentProfile?.city}
                  </h2>
                  <h2 className="text-lg font-semibold mt-2">
                    State: {agentProfile?.state}
                  </h2>
                  <h2 className="text-lg font-semibold mt-2">
                    Pincode: {agentProfile?.pincode}
                  </h2>
                </div>
                {/* <div className="w-1/2 h-full">
                  <h2 className="text-2xl font-bold mt-2">
                    Wallet Information
                  </h2>
                  <h2 className="text-lg font-semibold mt-6">
                    Budget Limit: Rs. {agentProfile?.budget_limit}
                  </h2>
                  <h2 className="text-lg font-semibold mt-2">
                    Income: Rs. {agentProfile?.income}
                  </h2>
                  <h2 className="text-lg font-semibold mt-2">
                    Joined At:{" "}
                    <i>
                      {new Date(agentProfile?.created_at).toLocaleDateString(
                        "en-GB"
                      )}
                    </i>
                  </h2>
                  <h2 className="text-lg font-semibold mt-2">
                    Wallet Balance: {userWalletData?.user_balance}
                  </h2>
                  <h2 className="text-lg font-semibold mt-2">
                    Wallet UPI Id:{" "}
                    <i>{userWalletData?.wallet_id.toLowerCase()}</i>
                  </h2>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Header */}
      <div className="flex bg-gray-100 rounded-xl border border-gray-200 shadow-lg py-6 px-4 justify-between items-center mb-8">
        <div
          onClick={() => setShowAgentProfile(true)}
          className="cursor-pointer"
        >
          <h1 className="text-3xl font-bold">Agent Dashboard</h1>
          <h2 className="mt-1"> See Profile Information</h2>
        </div>
        <div className="flex gap-4">
          <button className="flex cursor-pointer shadow-lg hover:shadow-black/30 transition duration-700 items-center gap-2 border border-gray-300 rounded-full px-4 py-2">
            <span className="text-2xl">?</span>
            <span className="font-medium">Support</span>
          </button>
          <button onClick={()=>handleLogout()} className="bg-gradient-to-tr from-blue-600 to-blue-950 shadow-lg hover:from-blue-950 hover:to-blue-600 transition duration-700 hover:shadow-black/40 cursor-pointer text-white rounded-full px-6 py-2 font-medium">
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Requests Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Pending Requests</h2>
          <div className="space-y-4">
            {/* Request #1 */}
            <div className="bg-orange-50 border border-orange-100 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-medium">Request #1</h3>
                <span className="text-orange-500 font-medium">Pending</span>
              </div>
              <div className="mb-4">
                <p className="text-gray-700">Amount: ₹1,000</p>
                <p className="text-gray-700">User: John Doe</p>
              </div>
              <div className="flex gap-3">
                <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">
                  Accept
                </button>
                <button className="border border-red-500 text-red-500 px-6 py-2 rounded hover:bg-red-50 transition">
                  Decline
                </button>
              </div>
            </div>

            {/* Request #2 */}
            <div className="bg-orange-50 border border-orange-100 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-medium">Request #2</h3>
                <span className="text-orange-500 font-medium">Pending</span>
              </div>
              <div className="mb-4">
                <p className="text-gray-700">Amount: ₹1,000</p>
                <p className="text-gray-700">User: John Doe</p>
              </div>
              <div className="flex gap-3">
                <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">
                  Accept
                </button>
                <button className="border border-red-500 text-red-500 px-6 py-2 rounded hover:bg-red-50 transition">
                  Decline
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Performance Metrics</h2>
          <div className="grid grid-cols-2 gap-4">
            {/* Today's Transactions */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-gray-600 mb-1">Today's Transactions</h3>
              <p className="text-4xl font-bold">24</p>
            </div>

            {/* Commission Earned */}
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-gray-600 mb-1">Commission Earned</h3>
              <p className="text-4xl font-bold">₹450</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;

import React, { useEffect, useMemo, useState } from "react";
import {
  IndianRupee,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  Bell,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Info,
} from "lucide-react";
import axios from "axios";
import { BACKEND_URL } from "../utils/constants";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import useAuth from "../utils/useAuth";
import capitalize from "../utils/capitalize";

const AgentDashboard = () => {
  useAuth();
  const [transactions] = useState([
    {
      id: "1",
      amount: 1000,
      user: "John Doe",
      status: "pending",
      type: "deposit",
      timestamp: "2025-04-20T10:25:00",
    },
    {
      id: "2",
      amount: 1500,
      user: "Jane Smith",
      status: "pending",
      type: "withdrawal",
      timestamp: "2025-04-20T10:15:00",
    },
  ]);
  const [transactionsDone, setTransactionsDone] = useState([]);
  const [agentData, setAgentData] = useState({});
  const [activeFilter, setActiveFilter] = useState("all");
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const stats = {
    availableBalance: 7500,
    todaysTransactions: 24,
    commissionEarned: 450,
    securityBond: 10000,
    bondCompletion: 35,
    bondStartDate: "2024-10-15",
    bondEndDate: "2025-04-15",
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const calculateDaysRemaining = () => {
    const endDate = new Date(stats.bondEndDate);
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const token = Cookies.get("token");
  const decoded = useMemo(() => {
    if (token) {
      return jwtDecode(token);
    }
    return null;
  }, [token]);

  useEffect(() => {
    getAgentData();
    getTransactionsDone();
  }, []);

  const getAgentData = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/agent/${decoded.id}`
      );
      console.log("Agent data:", response.data);
      setAgentData(response?.data?.agent);
    } catch (err) {
      console.error("Error fetching agent data:", err);
    }
  };

  const getTransactionsDone = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/agentToUserTransaction/${decoded.id}`
      );
      console.log("Transactions data:", response.data);
      setTransactionsDone(response?.data?.transactions);
      setFilteredTransactions(response?.data?.transactions);
    } catch (err) {
      console.error("Error fetching transactions:", err);
    }
  };

  const handleTransactionRequestReject = async (transactionToReject) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/agentToUserTransaction/updateStatus`,
        {
          status: "rejected",
          trId: transactionToReject?._id,
        }
      );
      console.log("Transaction request rejected:", response.data);
    } catch (err) {
      console.error("Error rejecting transaction request:", err);
    }
  };
  const handleTransactionRequestAccept = async (transactionToAccept) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/agentToUserTransaction/updateStatus`,
        {
          status: "accepted",
          trId: transactionToAccept?._id,
        }
      );
      console.log("Transaction request accepted:", response.data);
    } catch (err) {
      console.error("Error accepting transaction request:", err);
    }
  };

  const handleDepositTransactionRequestComplete = async (transactionToComplete) => {
    try{
      const response = await axios.post(
        `${BACKEND_URL}/api/finance/depositFunds`,{
          trId: transactionToComplete?._id,
          amount: transactionToComplete?.amount,
          agentId:decoded.id,
          userId: transactionToComplete?.userId?._id,
          commission: transactionToComplete?.commission,
        })
        console.log("Deposit transaction completed:", response.data);
    }catch(err) {
      console.error("Error completing deposit transaction request:", err);
    }
  }

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    // console.log("Filter changed to:", filter);
    // console.log("Transactions before filtering:", transactionsDone);
    if (filter === "all") {
      setFilteredTransactions(transactionsDone);
    } else {
      const filteredTransactions = transactionsDone.filter(
        (tr) => tr.status === filter
      );
      setFilteredTransactions(filteredTransactions);
    }
  };

  const monthsMapping = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  };

  return (
    <div className="min-h-[89.3vh] bg-gray-50">
      {/* Header */}
      <header className="bg-white text-black shadow-md mx-4 mx rounded-md mt-3">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold">Agent Dashboard</h1>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 hover:bg-gray-200 transition-all duration-300 cursor-pointer rounded-full">
                <Bell size={20} />
                <span className="absolute top-0 right-0 h-4 w-4 bg-red-300 rounded-full text-xs flex items-center justify-center">
                  2
                </span>
              </button>
              <button className="bg-white p-2 hover:bg-gray-200 transition-all duration-300 cursor-pointer text-black px-4 py-2 rounded-md font-medium">
                New Transaction
              </button>
            </div>
          </div>

          {/* Quick stats bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 justify-items-center gap-58 py-6 px-10 bg-black rounded-lg">
            <div className="text-center">
              <p className="text-gray-300 text-md ">Today's Transactions</p>
              <p className="text-lg font-semibold text-white">
                {transactionsDone?.filter((tr) => {
                  const today = new Date();
                  const transactionDate = new Date(tr.transactionDate);
                  if (
                    today.getDate() === transactionDate.getDate() &&
                    today.getMonth() === transactionDate.getMonth() &&
                    today.getFullYear() === transactionDate.getFullYear()
                  ) {
                    return true;
                  }
                  return false;
                })?.length || 0}
              </p>
            </div>
            <div className="text-center">
              <p className="text-gray-300 text-md ">
                {monthsMapping[new Date().getMonth() + 1]}'s Transactions
              </p>
              <p className="text-lg font-semibold text-white">
                {transactionsDone?.filter((tr) => {
                  const today = new Date();
                  const transactionDate = new Date(tr.transactionDate);
                  if (
                    today.getMonth() === transactionDate.getMonth() &&
                    today.getFullYear() === transactionDate.getFullYear()
                  ) {
                    return true;
                  }
                  return false;
                })?.length || 0}
              </p>
            </div>
            <div className="text-center">
              <p className="text-gray-300 text-md ">Total Transaction</p>
              <p className="text-lg font-semibold text-white">
                {transactionsDone?.length || 0}
              </p>
            </div>
            <div className="text-center w-56 mr-10">
              <p className="text-gray-300 text-md ">Total Commission Earned</p>
              <p className="text-lg font-semibold text-white">
                ₹
                {transactionsDone
                  ?.filter((tr) => tr.status == "completed")
                  ?.reduce((acc, tr) => acc + (tr.commission || 0), 0)}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 space-y-6">
        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md shadow-gray-300 hover:shadow-lg hover:shadow-black/40 transition-all duration-300">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600 font-normal">Available Balance</p>
                <p className="text-2xl font-bold mt-1">
                  ₹{agentData?.securityDeposit}
                </p>
              </div>
              <div className="p-2 rounded-md bg-gray-200">
                <Wallet size={20} className="text-gray-800" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <ArrowUpRight size={16} className="text-green-600 mr-1" />
              <span className="text-sm text-green-600">
                +₹2,500 from last week
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md shadow-gray-300 hover:shadow-lg hover:shadow-black/40 transition-all duration-300">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600 font-normal">Commission Earned</p>
                <p className="text-2xl font-bold mt-1">
                  ₹
                  {transactionsDone
                    ?.filter((tr) => {
                      const today = new Date();
                      const transactionDate = new Date(tr.transactionDate);
                      return (
                        today.getMonth() === transactionDate.getMonth() &&
                        today.getFullYear() === transactionDate.getFullYear() &&
                        tr.status == "completed"
                      );
                    })
                    ?.reduce((acc, tr) => acc + (tr.commission || 0), 0)}
                </p>
              </div>
              <div className="p-2 rounded-md bg-gray-200">
                <IndianRupee size={20} className="text-gray-800" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <ArrowUpRight size={16} className="text-green-600 mr-1" />
              <span className="text-sm text-green-600">+₹150 today</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md shadow-gray-300 hover:shadow-lg hover:shadow-black/40 transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-600 font-normal">Security Bond</p>
                <p className="text-2xl font-bold mt-1">
                  ₹{stats.securityBond.toLocaleString()}
                </p>
              </div>
              <div className="p-2 rounded-md bg-gray-200">
                <Clock size={20} className="text-gray-800" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-black rounded-full h-2 transition-all duration-500"
                  style={{ width: `${stats.bondCompletion}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm font-normal text-gray-600">
                <span>{stats.bondCompletion}% Complete</span>
                <span>{calculateDaysRemaining()} days remaining</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Transactions */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-8 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-200">
            <h2 className="text-lg font-semibold mb-4 sm:mb-0">
              {capitalize(activeFilter)} Requests
            </h2>
            <div className="flex flex-wrap gap-3">
              {/* All Filter */}
              <button
                onClick={() => handleFilterChange("all")}
                className={`px-3 cursor-pointer py-1 rounded-full text-sm font-medium border transition-all duration-200 transform ${
                  activeFilter === "all"
                    ? "shadow-sm bg-gray-100 text-gray-800 border-gray-300"
                    : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                }`}
              >
                All
              </button>

              {/* Pending Filter */}
              <button
                onClick={() => handleFilterChange("pending")}
                className={`px-3 cursor-pointer py-1 rounded-full text-sm font-medium border transition-all duration-200 transform ${
                  activeFilter === "pending"
                    ? "shadow-sm  bg-yellow-100 text-yellow-800 border-yellow-300"
                    : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                }`}
              >
                Pending
              </button>

              {/* Accepted Filter */}
              <button
                onClick={() => handleFilterChange("accepted")}
                className={`px-3 cursor-pointer py-1 rounded-full text-sm font-medium border transition-all duration-200 transform ${
                  activeFilter === "accepted"
                    ? "shadow-sm bg-green-100 text-green-800 border-green-300"
                    : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                }`}
              >
                Accepted
              </button>

              {/* Rejected Filter */}
              <button
                onClick={() => handleFilterChange("rejected")}
                className={`px-3 cursor-pointer py-1 rounded-full text-sm font-medium border transition-all duration-200 transform ${
                  activeFilter === "rejected"
                    ? "shadow-sm bg-red-100 text-red-800 border-red-300"
                    : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                }`}
              >
                Rejected
              </button>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {filteredTransactions?.map((transaction) => (
              <div key={transaction?._id} className="px-8 py-4">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <p className="font-medium">
                        Request #{transaction?._id?.toLocaleString()}
                      </p>
                      <span
                        className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 pb-1 border border-gray-400 text-gray-600`}
                      >
                        {transaction?.conversionType === "cashToERupees"
                          ? "Deposit"
                          : "Withdrawal"}
                      </span>
                      <span
                        className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                          transaction?.status === "rejected"
                            ? "bg-red-100 text-red-800"
                            : transaction?.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : transaction?.status === "accepted"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {transaction?.status.charAt(0).toUpperCase() +
                          transaction?.status.slice(1)}
                      </span>
                      {transaction?.status === "accepted" && (
                        <span className="ml-4 text-sm bg-gray-100 border border-gray-200 font-medium flex text-gray-800 rounded-xl py-0.5 items-center px-4 ">
                          <Info size={16} className="mt-[0px] mr-1" /> Press the
                          complete button only when the cash transaction with
                          the user is successfull.
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600">
                      Amount: ₹{transaction?.amount.toLocaleString()}
                    </p>
                    <p className="text-gray-600">
                      User:{" "}
                      {capitalize(transaction?.userId?.firstName) +
                        " " +
                        capitalize(transaction?.userId?.lastName)}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {formatDate(transaction?.transactionDate)}
                    </p>
                  </div>
                  {transaction?.status == "pending" && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          handleTransactionRequestAccept(transaction);
                        }}
                        className="flex items-center px-4 py-2 cursor-pointer hover:shadow-lg shadow-md shadow-gray-400 transition-all duration-300 hover:shadow-black/50 bg-black text-white rounded-md hover:bg-gray-900"
                      >
                        <CheckCircle size={16} className="mr-2" />
                        Accept
                      </button>
                      <button
                        onClick={() => {
                          handleTransactionRequestReject(transaction);
                        }}
                        className="flex items-center px-4 py-2 cursor-pointer hover:shadow-lg shadow-md shadow-gray-400 transition-all duration-300 hover:shadow-black/50 border border-gray-300 rounded-md hover:bg-gray-50"
                      >
                        <XCircle size={16} className="mr-2" />
                        Decline
                      </button>
                    </div>
                  )}
                  {transaction?.status == "accepted" && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          if(transaction?.conversionType === "cashToERupees") {
                          handleDepositTransactionRequestComplete(transaction);
                          }else {
                            console.error("Cannot complete withdrawal transactions");
                          }
                        }}
                        className="flex items-center px-4 py-2 cursor-pointer hover:shadow-lg shadow-md shadow-gray-400 transition-all duration-300 hover:shadow-black/50 bg-black text-white rounded-md hover:bg-gray-900"
                      >
                        <CheckCircle size={16} className="mr-2" />
                        Complete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          {filteredTransactions.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No pending transactions
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AgentDashboard;

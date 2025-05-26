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
} from "lucide-react";
import axios from "axios";
import { BACKEND_URL } from "../utils/constants";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import useAuth from "../utils/useAuth";

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
    } catch (err) {
      console.error("Error fetching transactions:", err);
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
    <div className="min-h-[90.7vh] bg-gray-50">
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
              <p className="text-gray-300 text-md ">
               Total Commission Earned
              </p>
              <p className="text-lg font-semibold text-white">
                ₹
                {transactionsDone
                  
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
                        today.getFullYear() === transactionDate.getFullYear()
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
          <div className="px-8 py-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Pending Requests</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="px-8 py-4">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <p className="font-medium">Request #{transaction.id}</p>
                      <span
                        className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                          transaction.type === "deposit"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {transaction.type.charAt(0).toUpperCase() +
                          transaction.type.slice(1)}
                      </span>
                    </div>
                    <p className="text-gray-600">
                      Amount: ₹{transaction.amount.toLocaleString()}
                    </p>
                    <p className="text-gray-600">User: {transaction.user}</p>
                    <p className="text-gray-500 text-sm">
                      {formatDate(transaction.timestamp)}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="flex items-center px-4 py-2 cursor-pointer hover:shadow-lg shadow-md shadow-gray-400 transition-all duration-300 hover:shadow-black/50 bg-black text-white rounded-md hover:bg-gray-900">
                      <CheckCircle size={16} className="mr-2" />
                      Accept
                    </button>
                    <button className="flex items-center px-4 py-2 cursor-pointer hover:shadow-lg shadow-md shadow-gray-400 transition-all duration-300 hover:shadow-black/50 border border-gray-300 rounded-md hover:bg-gray-50">
                      <XCircle size={16} className="mr-2" />
                      Decline
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {transactions.length === 0 && (
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

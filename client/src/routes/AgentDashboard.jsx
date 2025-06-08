import { useEffect, useMemo, useState } from "react";
import { Filter, BadgeCheck, User, Wallet2 } from "lucide-react";
import {
  IndianRupee,
  Clock,
  CheckCircle,
  XCircle,
  Wallet,
  Info,
} from "lucide-react";
import axios from "axios";
import { BACKEND_URL } from "../utils/constants";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import useAuth from "../utils/useAuth";
import capitalize from "../utils/capitalize";
import { getSocket } from "../utils/socket";
import { toast } from "react-toastify";
import speak from "../utils/speak";
import { useDispatch } from "react-redux";
import SecurityDepositOverlay from "../components/SecurityDepositOverlay";

const AgentDashboard = () => {
  useAuth();
  const [isLengthZero, setIsLengthZero] = useState(false);
  const [transactionsDone, setTransactionsDone] = useState([]);
  const [agentData, setAgentData] = useState({});
  const [activeFilter, setActiveFilter] = useState("all");
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [isDepositOverlayOpen, setIsDepositOverlayOpen] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };
  const token = Cookies.get("token");
  const decoded = useMemo(() => {
    if (token) {
      return jwtDecode(token);
    }
    return null;
  }, [token]);

  const socket = getSocket(decoded.id);
  useEffect(() => {
    if (!decoded) return;
    const handler = (data) => {
      setTransactionsDone((prevTransactions) => [
        ...prevTransactions,
        data.transaction,
      ]);
      console.log(
        "New transaction receiveddddddddddddddddddddddd:",
        data.transaction
      );
      if (activeFilter === "all") {
        setFilteredTransactions((prevTransactions) => [
          ...prevTransactions,
          data.transaction,
        ]);
      } else {
        if (data.transaction.status === activeFilter) {
          setFilteredTransactions((prevTransactions) => [
            ...prevTransactions,
            data.transaction,
          ]);
        }
      }
      getTransactionsDone();
      toast.info(
        `New ${
          data.transaction.conversionType === "cashToERupees"
            ? "Deposit"
            : "Withdrawal"
        } request received from ${capitalize(
          data.transaction.userId.firstName
        )} ${capitalize(data.transaction.userId.lastName)}`
      );
      speak(
        `New ${
          data.transaction.conversionType === "cashToERupees"
            ? "Deposit"
            : "Withdrawal"
        } request received from ${capitalize(
          data.transaction.userId.firstName
        )} ${capitalize(data.transaction.userId.lastName)}`
      );
    };

    if (socket) {
      socket.on("newUserAgentTransactionSent", handler);
    }
    return () => {
      socket.off("newUserAgentTransactionSent", handler);
    };
  }, [decoded]);

  useEffect(() => {
    getAgentData();
    getTransactionsDone();
  }, []);

  const getAgentData = async () => {
    try {
      // console.log("Decoded token:", decoded, token);
      const response = await axios.get(
        `${BACKEND_URL}/api/agent/${decoded.id}`
      );
      // console.log("Agent data:", response.data);
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
      // console.log("Transactions data:", response.data);
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
      const data = response.data.transaction;
      console.log("Transaction request rejected:", data);

      socket.emit("UserAgentRequestRejected", data);

      // Update local transaction states
      const updatedTransactions = transactionsDone.filter(
        (tr) => tr._id !== data._id
      );
      setTransactionsDone([...updatedTransactions, data]);

      const updatedFiltered = filteredTransactions.filter(
        (tr) => tr._id !== data._id
      );
      if (activeFilter === "all" || data.status === activeFilter) {
        setFilteredTransactions([...updatedFiltered, data]);
      } else {
        setFilteredTransactions(updatedFiltered);
      }

      // Show local toast
      toast.success(
        `${
          transactionToReject?.conversionType == "cashToERupees"
            ? "Deposit"
            : "Withdrawal"
        } request rejected for ${capitalize(
          transactionToReject?.userId?.firstName
        )} ${capitalize(transactionToReject?.userId?.lastName)}`
      );

      getTransactionsDone(); // Refresh
    } catch (err) {
      console.error("Error rejecting transaction request:", err);
    }
  };
  const handleTransactionRequestAccept = async (transactionToAccept) => {
    try {
      if (
        transactionToAccept?.conversionType == "cashToERupees" &&
        transactionToAccept?.amount - transactionToAccept?.commission >
          agentData?.balance
      ) {
        toast.error("Insufficient balance to accept this deposit request");
        return;
      }
      const response = await axios.post(
        `${BACKEND_URL}/api/agentToUserTransaction/updateStatus`,
        {
          status: "accepted",
          trId: transactionToAccept?._id,
        }
      );

      const data = response.data.transaction;
      console.log("Transaction request accepted:", data);

      socket.emit("UserAgentRequestAccepted", data);
      // console.log("Socket emitted UserAgentRequestAccepted");

      // Update local transaction states
      const updatedTransactions = transactionsDone.filter(
        (tr) => tr._id !== data._id
      );
      setTransactionsDone([...updatedTransactions, data]);

      const updatedFiltered = filteredTransactions.filter(
        (tr) => tr._id !== data._id
      );
      if (activeFilter === "all" || data.status === activeFilter) {
        setFilteredTransactions([...updatedFiltered, data]);
      } else {
        setFilteredTransactions(updatedFiltered);
      }

      // Show local toast
      toast.success(
        `${
          transactionToAccept?.conversionType == "cashToERupees"
            ? "Deposit"
            : "Withdrawal"
        } request accepted for ${capitalize(
          transactionToAccept?.userId?.firstName
        )} ${capitalize(transactionToAccept?.userId?.lastName)}`
      );

      getTransactionsDone(); // Refresh
    } catch (err) {
      console.error("Error accepting transaction request:", err);
    }
  };

  const handleDepositTransactionRequestComplete = async (
    transactionToComplete
  ) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/finance/depositFunds`,
        {
          trId: transactionToComplete?._id,
          amount: transactionToComplete?.amount,
          agentId: decoded.id,
          userId: transactionToComplete?.userId?._id,
          commission: transactionToComplete?.commission,
        }
      );
      // console.log("Deposit transaction completed:", response.data);
      const data = response.data.data;
      socket.emit("UserAgentDepositCompleted", data);
      console.log(
        "SocketTTTTTTTTTTTTTTT emitted UserAgentDepositCompleted",
        data
      );
      setAgentData((prevData) => ({
        ...prevData,
        balance: prevData.balance - data.amount + data.commission,
      }));
      setTransactionsDone((prevTransactions) => {
        const updatedTransactions = prevTransactions.filter(
          (tr) => tr._id !== data._id
        );
        return [...updatedTransactions, data];
      });
      setFilteredTransactions((prevTransactions) => {
        const updatedFiltered = prevTransactions.filter(
          (tr) => tr._id !== data._id
        );
        if (activeFilter === "all" || data.status === activeFilter) {
          return [...updatedFiltered, data];
        } else {
          return updatedFiltered;
        }
      });
      toast.success(
        `Deposit request completed for ${capitalize(
          data.userId.firstName
        )} ${capitalize(data.userId.lastName)}`
      );
    } catch (err) {
      console.error("Error completing deposit transaction request:", err);
    }
  };

  const handleWithdrawalTransactionRequestComplete = async (
    transactionToComplete
  ) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/finance/withdrawFunds`,
        {
          trId: transactionToComplete?._id,
          amount: transactionToComplete?.amount,
          agentId: decoded.id,
          userId: transactionToComplete?.userId?._id,
          commission: transactionToComplete?.commission,
        }
      );
      console.log("Withdrawal transaction completed:", response.data);
      const data = response.data.data;
      socket.emit("UserAgentWithdrawCompleted", data);
      console.log("Socket emitted UserAgentWithdrawCompleted", data);
      setAgentData((prevData) => ({
        ...prevData,
        balance: prevData.balance + data.amount + data.commission,
      }));
      setTransactionsDone((prevTransactions) => {
        const updatedTransactions = prevTransactions.filter(
          (tr) => tr._id !== data._id
        );
        return [...updatedTransactions, data];
      });
      setFilteredTransactions((prevTransactions) => {
        const updatedFiltered = prevTransactions.filter(
          (tr) => tr._id !== data._id
        );
        if (activeFilter === "all" || data.status === activeFilter) {
          return [...updatedFiltered, data];
        } else {
          return updatedFiltered;
        }
      });
      toast.success(
        `Withdrawal request completed for ${capitalize(
          data.userId.firstName
        )} ${capitalize(data.userId.lastName)}`
      );
    } catch (err) {
      console.error("Error completing withdrawal transaction request:", err);
    }
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    // console.log("Filter changed to:", filter);
    // console.log("Transactions before filtering:", transactionsDone);
    if (filter === "all") {
      setFilteredTransactions(transactionsDone);
      if (transactionsDone.length === 0) {
        setIsLengthZero(true);
      } else {
        setIsLengthZero(false);
      }
    } else {
      const filteredTransactions = transactionsDone.filter(
        (tr) => tr.status === filter
      );
      if (filteredTransactions.length === 0) {
        setIsLengthZero(true);
      } else {
        setIsLengthZero(false);
      }
      setFilteredTransactions(filteredTransactions);
    }
  };

  const monthsMapping = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };

  return (
    <div className="min-h-[89.3vh] bg-gray-50">
      <SecurityDepositOverlay
        isOpen={isDepositOverlayOpen}
        onClose={() => setIsDepositOverlayOpen(false)}
        currentBalance={agentData.balance}
        currentSecurityDeposit={agentData.securityDeposit}
      />
      <header className="bg-white text-black shadow-md mx-4 mx rounded-md mt-3">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="ml-2 text-xl font-bold">Agent Dashboard</h1>
            <button
              onClick={() => {
                setIsDepositOverlayOpen(true);
              }}
              className="hidden md:flex items-center space-x-4"
            >
              <div className="flex cursor-pointer text-sm font-medium text-gray-600 hover:ring-2 hover:text-gray-700 hover:ring-gray-700 items-center space-x-2 bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-300">
                <Wallet size={18} />
                <span>Deposit more to increase balance</span>
              </div>
            </button>
          </div>

          {/* Quick stats bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 justify-items-center gap-58 py-6 px-10 bg-black rounded-lg">
            <div className="text-center">
              <p className="text-gray-300 text-md ">Today's Transactions</p>
              <p className="text-lg font-semibold text-white">
                {transactionsDone?.filter((tr) => {
                  const today = new Date();
                  const transactionDate = new Date(tr?.transactionDate);
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
                  const transactionDate = new Date(tr?.transactionDate);
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
                  ?.filter((tr) => tr?.status == "completed")
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
                  ₹{agentData?.balance || "0"}
                </p>
              </div>
              <div className="p-2 rounded-md bg-gray-200">
                <Wallet size={20} className="text-gray-800" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md shadow-gray-300 hover:shadow-lg hover:shadow-black/40 transition-all duration-300">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600 font-normal">
                  {monthsMapping[new Date().getMonth() + 1]}'s Commission Earned
                </p>
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
                    ?.reduce((acc, tr) => acc + (tr.commission || 0), 0) || "0"}
                </p>
              </div>
              <div className="p-2 rounded-md bg-gray-200">
                <IndianRupee size={20} className="text-gray-800" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md shadow-gray-300 hover:shadow-lg hover:shadow-black/40 transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-600 font-normal">Security Bond</p>
                <p className="text-2xl font-bold mt-1">
                  ₹{agentData?.securityDeposit || "0"}
                </p>
              </div>
              <div className="p-2 rounded-md bg-gray-200">
                <Clock size={20} className="text-gray-800" />
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
            <div className="flex flex-wrap gap-2">
              {/* All Filter */}
              <button
                onClick={() => handleFilterChange("all")}
                className={`px-3 py-1.5 text-sm rounded-md cursor-pointer transition-colors duration-200 flex items-center ${
                  activeFilter === "all"
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Filter size={14} className="mr-1.5" />
                All
              </button>

              {/* Pending Filter */}
              <button
                onClick={() => handleFilterChange("pending")}
                className={`px-3 py-1.5 text-sm rounded-md cursor-pointer transition-colors duration-200 flex items-center ${
                  activeFilter === "pending"
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Clock size={14} className="mr-1.5" />
                Pending
              </button>

              {/* Accepted Filter */}
              <button
                onClick={() => handleFilterChange("accepted")}
                className={`px-3 py-1.5 text-sm rounded-md cursor-pointer transition-colors duration-200 flex items-center ${
                  activeFilter === "accepted"
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <CheckCircle size={14} className="mr-1.5" />
                Accepted
              </button>

              {/* Rejected Filter */}
              <button
                onClick={() => handleFilterChange("rejected")}
                className={`px-3 py-1.5 text-sm rounded-md cursor-pointer transition-colors duration-200 flex items-center ${
                  activeFilter === "rejected"
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <XCircle size={14} className="mr-1.5" />
                Rejected
              </button>

              {/* Completed Filter */}
              <button
                onClick={() => handleFilterChange("completed")}
                className={`px-3 py-1.5 text-sm rounded-md cursor-pointer transition-colors duration-200 flex items-center ${
                  activeFilter === "completed"
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <BadgeCheck size={14} className="mr-1.5" />
                Completed
              </button>
            </div>
          </div>

          {filteredTransactions.length != 0 && (
            <div
              className={`divide-y ${
                isLengthZero ? "h-fit" : "h-96"
              } overflow-y-auto divide-gray-200`}
            >
              {filteredTransactions
                ?.sort((a, b) => {
                  return (
                    new Date(b.transactionDate) - new Date(a.transactionDate)
                  );
                })
                .map((transaction) => (
                  <div key={transaction?._id} className="px-8 py-4">
                    <div className="flex justify-between items-center">
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <p className="font-medium">
                            {transaction?.conversionType === "cashToERupees"
                              ? "Deposit"
                              : "Withdrawal"}{" "}
                            Request #{transaction?._id || ""}
                          </p>

                          <span
                            className={`ml-2 px-2 py-0.5 rounded-full text-xs font-normal ${
                              transaction?.status === "rejected"
                                ? "bg-red-100 text-red-800"
                                : transaction?.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : transaction?.status === "accepted"
                                ? "bg-green-100 text-green-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {transaction?.status.charAt(0).toUpperCase() +
                              transaction?.status.slice(1)}
                          </span>
                          {transaction?.status === "accepted" && (
                            <span className="ml-4 text-sm bg-gray-100 border border-gray-200 font-medium flex text-gray-800 rounded-xl py-0.5 items-center px-4 ">
                              <Info size={16} className="mt-[0px] mr-1" /> Press
                              complete button only when cash transaction with
                              user is done.
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600">
                          Amount: ₹{transaction?.amount} | Commission: ₹
                          {transaction?.commission || 0}
                        </p>
                        <p className="text-gray-600">
                          User:{" "}
                          {capitalize(transaction?.userId?.firstName) +
                            " " +
                            capitalize(transaction?.userId?.lastName)}{" "}
                          | Note: {transaction?.notes || "No note provided"}
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
                              if (
                                transaction?.conversionType === "cashToERupees"
                              ) {
                                handleDepositTransactionRequestComplete(
                                  transaction
                                );
                              } else {
                                // console.error("Cannot complete withdrawal transactions");
                                handleWithdrawalTransactionRequestComplete(
                                  transaction
                                );
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
          )}
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

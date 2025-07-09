import { CheckCircle, IndianRupee, X, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import {
  User,
  Phone,
  Calendar,
  MapPin,
  Building,
  CreditCard,
  ArrowDownCircle,
  ArrowUpCircle,
  Check,
  Activity,
  History,
  Clock,
  Filter,
  RefreshCw,
} from "lucide-react";
import capitalize from "../utils/capitalize";
import findAge from "../utils/findAge";
import calculateAgentCommission from "../utils/calculateAgentComission";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { AgentToUserSchema } from "../yupValidators/validationSchema";
import { useMemo } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { BACKEND_URL } from "../utils/constants";
import { toast } from "react-toastify";
import speak from "../utils/speak";
import { getSocket } from "../utils/socket";
import speakPremium from "../utils/speakpremium";

const AgentDetails = ({
  showAgentDetails,
  setShowAgentDetails,
  selectedAgent,
  setSelectedAgent,
}) => {
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

  const [activeTab, setActiveTab] = useState("info");
  const [transactionType, setTransactionType] = useState("deposit");
  const [amount, setAmount] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [transactionFilter, setTransactionFilter] = useState("all");
  const [allTransactions, setAllTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [allAgentUserTransactions, setAllAgentUserTransactions] = useState([]);
  const [totalTransactions, setTotaltransactions] = useState([]);
  const [thisMonthCommission, setThisMonthCommission] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userData, setUserData] = useState(null);
  const [settings, setSettings] = useState(null);
  const token = Cookies.get("token");
  const decoded = useMemo(() => {
    if (!token) return null;
    return jwtDecode(token);
  }, [token]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateTime = (date) => {
    return new Date(date)?.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const maskAccountNumber = (accNum) => {
    const lastFour = accNum.slice(-4);
    const masked = "XXXX-XXXX-" + lastFour;
    return masked;
  };

  useEffect(() => {
    if (!decoded) return;
    const socket = getSocket(decoded?.id);
    const handler = (data) => {
      if (data?.transaction?.agentId?._id === selectedAgent?._id) {
        // console.log("New transaction received:", data.transaction);
        setAllTransactions((prev) => [data.transaction, ...prev]);
        setFilteredTransactions((prev) => [data.transaction, ...prev]);
        getAllTransactions();
      }
    };

    const handler2 = (data) => {
      // console.log(
      //   "wwwwwwwwwwwwwwwwwwwwww",
      //   data.agentId?._id,
      //   selectedAgent?._id
      // );
      if (data?.agentId?._id === selectedAgent?._id) {
        // console.log("Transaction accepted:", data);
        setAllTransactions((prev) =>
          prev.map((transaction) =>
            transaction._id === data._id
              ? { ...transaction, status: "accepted" }
              : transaction
          )
        );
        setFilteredTransactions((prev) =>
          prev.map((transaction) =>
            transaction._id === data._id
              ? { ...transaction, status: "accepted" }
              : transaction
          )
        );

        getAllTransactions();
      }
    };

    const handler3 = (data) => {
      if (data?.agentId?._id === selectedAgent?._id) {
        //console.log("Transaction rejected:", data);
        setAllTransactions((prev) =>
          prev.map((transaction) =>
            transaction._id === data._id
              ? { ...transaction, status: "rejected" }
              : transaction
          )
        );
        setFilteredTransactions((prev) =>
          prev.map((transaction) =>
            transaction._id === data._id
              ? { ...transaction, status: "rejected" }
              : transaction
          )
        );

        getAllTransactions();
      }
    };
    const handler4 = (data) => {
      if (data?.agentId?._id === selectedAgent?._id) {
        //console.log("Deposit completed:", data);
        setAllTransactions((prev) =>
          prev.map((transaction) =>
            transaction._id === data._id
              ? { ...transaction, status: "completed" }
              : transaction
          )
        );
        setFilteredTransactions((prev) =>
          prev.map((transaction) =>
            transaction._id === data._id
              ? { ...transaction, status: "completed" }
              : transaction
          )
        );

        getAllTransactions();
      }
    };
    if (socket) {
      socket.on("newUserAgentTransactionSent", handler);
      socket.on("UserAgentRequestAcceptedBackend", handler2);
      socket.on("UserAgentRequestRejectedBackend", handler3);
      socket.on("UserAgentDepositCompletedBackend", handler4);
    }
    return () => {
      socket.off("UserAgentRequestAcceptedBackend", handler2);
      socket.off("UserAgentDepositCompletedBackend", handler4);
      socket.off("newUserAgentTransactionSent", handler);
      socket.off("UserAgentRequestRejectedBackend", handler3);
    };
  }, [decoded]);

  const getUser = async () => {
    try {
      //console.log("Fetching user data for ID:", decoded.id);
      const response = await axios.get(
        `${BACKEND_URL}/api/finance/getFinance/${decoded.id}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //console.log("User finance data fetched successfully:", response.data);
      setUserData(response.data.finance);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const getSettings = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/admin/getSystemSettings`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //console.log("Settings response:", response);
      setSettings(response.data.data);
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  useEffect(() => {
    getUser();
    getSettings();
  }, [decoded]);

  const handleAgentToUserSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true);
    const data = {
      agentId: selectedAgent._id,
      userId: decoded.id,
      amount: parseFloat(values.amount),
      commission: calculateAgentCommission(values.amount, settings),
      conversionType:
        transactionType == "deposit" ? "cashToERupees" : "eRupeesToCash",
      notes: values.notes || "",
    };

    if (
      transactionType != "deposit" &&
      data.amount + data.commission > userData.balance
    ) {
      toast.error("Withdrawal amount exceeds available balance!");
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await axios.get(
        `${BACKEND_URL}/api/user/getTodayAgentTransactionAmount/${decoded.id}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(
      //   "Today's agent transaction amount:",
      //   result.data,
      //   amount,
      //   settings
      // );
      const transactionsAmount = result.data.data.today || 0;
      if (transactionsAmount + values.amount > settings?.maxDailyLimit) {
        toast.error(
          `You can only Deposit/Withdraw upto ₹${settings?.maxDailyLimit} per day`
        );
        // speak(
        //   `You can only Deposit/Withdraw upto ₹${settings?.maxDailyLimit} per day`
        // );
        setIsSubmitting(false);
        return;
      } else if (values.amount < settings?.minTransactionAmount) {
        toast.error(
          `Minimum Deposit/WithDraw amount is ₹${settings?.minTransactionAmount}`
        );
        // speak(
        //   `Minimum Deposit/WithDraw amount is ₹${settings?.minTransactionAmount}`
        // );
        setIsSubmitting(false);
        return;
      } else if (values.amount > settings?.maxTransactionAmount) {
        toast.error(
          `Maximum Deposit/Withdraw amount is ₹${settings?.maxTransactionAmount}`
        );
        // speak(
        //   `Maximum Deposit/Withdraw amount is ₹${settings?.maxTransactionAmount}`
        // );
        setIsSubmitting(false);
        return;
      } else if (
        values.amount + result?.data?.data?.thisWeek >
        settings?.maxWeeklyLimit
      ) {
        toast.error(
          `You can only Deposit/Withdraw upto ₹${settings?.maxWeeklyLimit} per week`
        );
        // speak(
        //   `You can only Deposit/Withdraw upto ₹${settings?.maxWeeklyLimit} per week`
        // );
        setIsSubmitting(false);
        return;
      }
      const response = await axios.post(
        `${BACKEND_URL}/api/agentToUserTransaction/`,
        data,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const socket = getSocket();
      socket.emit("newUserAgentTransactionRequest", {
        transaction: response.data.transaction,
      });
      // console.log(
      //   "response of creating agent to user transactions",
      //   response.data
      // );
      toast.success(
        `${
          transactionType === "deposit" ? "Deposit" : "Withdrawal"
        } request sent successful!`
      );
      await speakPremium(
        `${
          transactionType === "deposit" ? "Deposit" : "Withdrawal"
        } request sent successful!`
      );
      resetForm();
      setSelectedAgent(null);
      setShowAgentDetails(false);
    } catch (error) {
      console.error("Error creating agent to user transaction:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getThisMonthCommission = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/agentCommission/getThisMonthCommission`,
        { agentId: selectedAgent._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //console.log("This month's commission:", response.data);
      setThisMonthCommission(response.data.data || 0);
    } catch (error) {
      console.error("Error fetching this month's commission:", error);
    }
  };

  useEffect(() => {
    getAllTransactions();
    getThisMonthCommission();
  }, []);

  const getAllTransactions = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/agentToUserTransaction/${selectedAgent._id}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //console.log("Fetched transactions:", response.data);
      const filtered = response?.data?.transactions?.filter((tr) => {
        if (tr.userId._id === decoded.id) {
          return tr;
        }
      });
      const startOfMonth = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        1
      );

      const filterAllTransactions = response?.data?.transactions?.filter(
        (tr) => {
          const createdAtDate = new Date(tr.createdAt);
          return tr.status === "completed" && createdAtDate >= startOfMonth;
        }
      );
      const filterTotalTransactions = response?.data?.transactions.filter(
        (tr) => {
          if (tr.status == "completed") {
            return tr;
          }
        }
      );
      setTotaltransactions(filterTotalTransactions);
      setAllAgentUserTransactions(filterAllTransactions);
      setAllTransactions(filtered);
      setFilteredTransactions(filtered);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleFilterChange = (filter) => {
    if (filter === "all") {
      setFilteredTransactions(allTransactions);
    } else {
      const filtered = allTransactions.filter(
        (transaction) => transaction.status === filter
      );
      setFilteredTransactions(filtered);
    }
  };

  if (!showAgentDetails) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <button
          onClick={() => setShowAgentDetails(true)}
          className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
        >
          View Agent Details
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white h-11/12 w-11/12 lg:w-2/3 rounded-2xl shadow-xl transition-all duration-300 transform animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center h-22 mt-2 px-6 pb-2 border-b border-gray-100">
        <div>
          <h2 className=" text-xl mt-4 md:text-2xl font-semibold mb-1 md:mt-2  text-gray-900">
            Agent Details
          </h2>
          <p className="text-gray-500 mt-1 text-sm md:text-base">
            {capitalize(selectedAgent?.firstName)}{" "}
            {capitalize(selectedAgent?.lastName)} | ID: {selectedAgent?._id}
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedAgent(null);
            setShowAgentDetails(false);
          }}
          className= "p-1 md:p-1 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors duration-200 group"
          aria-label="Close"
        >
          <X
            size={24}
            className="text-gray-500 group-hover:text-gray-900 transition-colors duration-200"
          />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex w-full justify-center border-b h-14 border-gray-100">
        <button
          onClick={() => setActiveTab("info")}
          className={` cursor-pointer text-center md:text-base sm:text-sm w-1/3 text-xs border-r border-r-gray-100 font-medium transition-colors duration-200 ${
            activeTab === "info"
              ? "text-black bg-gray-50 border-b-2 border-black"
              : "text-gray-500 hover:text-gray-900"
          }`}
        >
          Information
        </button>
        <button
          onClick={() => setActiveTab("transactions")}
          className={` cursor-pointer text-center md:text-base sm:text-sm w-1/3 text-xs border-r border-r-gray-100 font-medium transition-colors duration-200 ${
            activeTab === "transactions"
              ? "text-black bg-gray-50 border-b-2 border-black"
              : "text-gray-500 hover:text-gray-900"
          }`}
        >
          Transactions
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={` cursor-pointer w-1/3 md:text-base sm:text-sm text-xs font-medium transition-colors duration-200 ${
            activeTab === "history"
              ? "text-black bg-gray-50 border-b-2 border-black"
              : "text-gray-500 hover:text-gray-900"
          }`}
        >
          Transaction History
        </button>
      </div>

      {/* Content */}
      <div className="h-9/12 overflow-auto border-b border-gray-100 p-6">
        {activeTab === "info" ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {/* Personal Information */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="p-6 pb-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <User size={18} className="mr-2" />
                    Personal Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-500 mb-1">
                          Full Name
                        </label>
                        <p className="text-black font-medium">
                          {capitalize(selectedAgent?.firstName)}{" "}
                          {capitalize(selectedAgent?.lastName)}
                        </p>
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-500 mb-1">
                          <span className="flex items-center">
                            <Phone size={14} className="mr-1" />
                            Phone Number
                          </span>
                        </label>
                        <p className="text-black font-medium">
                          {selectedAgent?.phone}
                        </p>
                      </div>

                      <div className="md:mb-4">
                        <label className="block text-sm font-medium text-gray-500 mb-1">
                          Aadhar Number
                        </label>
                        <p className="text-black font-medium">
                          {selectedAgent?.aadhar.replace(
                            /(\d{4})(\d{4})(\d{4})/,
                            "$1-$2-$3"
                          )}
                        </p>
                      </div>
                    </div>

                    <div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-500 mb-1">
                          <span className="flex items-center">
                            <Calendar size={14} className="mr-1" />
                            Date of Birth
                          </span>
                        </label>
                        <p className="text-black font-medium">
                          {formatDate(selectedAgent?.dob)} (
                          {findAge(selectedAgent?.dob)} years)
                        </p>
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-500 mb-1">
                          Gender
                        </label>
                        <p className="text-black font-medium capitalize">
                          {selectedAgent?.gender}
                        </p>
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-500 mb-1">
                          <span className="flex items-center">
                            <MapPin size={14} className="mr-1" />
                            Address
                          </span>
                        </label>
                        <p className="text-black font-medium">
                          {`${selectedAgent?.city}, ${selectedAgent?.state}, ${selectedAgent?.country} - ${selectedAgent?.zipCode}`}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bank Information */}
              <div className="mt-6">
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md">
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <Building size={18} className="mr-2" />
                      Banking Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-500 mb-1">
                            Bank Name
                          </label>
                          <p className="text-black font-medium">
                            {selectedAgent?.bankName}
                          </p>
                        </div>

                        <div className="md:mb-4">
                          <label className="block text-sm font-medium text-gray-500 mb-1">
                            IFSC Code
                          </label>
                          <p className="text-black font-medium">
                            {selectedAgent?.ifscCode}
                          </p>
                        </div>
                      </div>

                      <div>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-500 mb-1">
                            <span className="flex items-center">
                              <CreditCard size={14} className="mr-1" />
                              Account Number
                            </span>
                          </label>
                          <p className="text-black font-medium">
                            {maskAccountNumber(selectedAgent?.accountNumber)}
                          </p>
                        </div>

                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-500 mb-1">
                            Security Deposit
                          </label>
                          <p className="text-black font-medium">
                            ₹
                            {selectedAgent?.securityDeposit?.toLocaleString(
                              "en-IN"
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Stats */}
            <div>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md h-full">
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <Activity size={18} className="mr-2" />
                    Performance
                  </h3>

                  <div className="space-y-6">
                    <div className="bg-gray-50 border-gray-200 border rounded-lg p-4 ">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-500">
                          Status
                        </span>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            selectedAgent?.isActive
                              ? "bg-gray-900 text-white"
                              : "bg-gray-200 text-gray-800"
                          }`}
                        >
                          {selectedAgent?.isActive ? "Active" : "Inactive"}
                          {selectedAgent?.isActive && (
                            <Check size={12} className="ml-1 mt-[1px]" />
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="bg-gray-50 border-gray-200 border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-0">
                        <span className="text-sm font-medium text-gray-500">
                          Commission Earned
                        </span>
                        <span className="text-black  font-bold">
                          ₹{thisMonthCommission?.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <span className="w-28">
                          From {allAgentUserTransactions.length} transactions in{" "}
                          {monthsMapping[new Date().getMonth() + 1]}
                        </span>
                      </div>
                    </div>

                    <div className="bg-gray-50 border-gray-200 border rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-500">
                          Balance
                        </span>
                        <span className="text-black font-bold">
                          ₹
                          {selectedAgent?.balance?.toLocaleString("en-IN") ||
                            "0"}
                        </span>
                      </div>
                    </div>

                    <div className="bg-gray-50 border-gray-200 border rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-500">
                          Security Deposit
                        </span>
                        <span className="text-black font-bold">
                          ₹
                          {selectedAgent?.securityDeposit?.toLocaleString(
                            "en-IN"
                          ) || "0"}
                        </span>
                      </div>
                    </div>

                    <div className="bg-gray-50 border-gray-200 border rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-500">
                          Total Transactions
                        </span>
                        <span className="text-black font-bold">
                          {totalTransactions.length || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : activeTab === "transactions" ? (
          <div className="grid grid-cols-1 xl:grid-cols-3 xl:gap-6 gap-y-12">
            <div className="col-span-2  h-full">
              <div className="bg-white rounded-xl border h-full border-gray-200 overflow-hidden shadow-sm">
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-6">
                    {transactionType === "deposit"
                      ? "Deposit (Cash to eRupees)"
                      : "Withdrawal (eRupees to Cash)"}
                  </h3>

                  <div className="flex flex-wrap space-y-6 mb-6">
                    <button
                      onClick={() => setTransactionType("deposit")}
                      className={` w-full flex items-center cursor-pointer justify-center p-4 rounded-lg transition-all duration-200 ${
                        transactionType === "deposit"
                          ? "bg-gray-900 text-white"
                          : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                      }`}
                    >
                      <ArrowDownCircle size={20} className="mr-2" />
                      Deposit
                    </button>

                    <button
                      onClick={() => setTransactionType("withdrawal")}
                      className={`w-full flex items-center cursor-pointer justify-center p-4 rounded-lg transition-all duration-200 ${
                        transactionType === "withdrawal"
                          ? "bg-gray-900 text-white"
                          : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                      }`}
                    >
                      <ArrowUpCircle size={20} className="mr-2" />
                      Withdrawal
                    </button>
                  </div>

                  <Formik
                    initialValues={{ amount: "", notes: "" }}
                    onSubmit={handleAgentToUserSubmit}
                    validationSchema={AgentToUserSchema}
                  >
                    {({ values }) => (
                      <Form>
                        <div className="mb-6">
                          <label
                            htmlFor="amount"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            Amount (₹)
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <IndianRupee
                                size={18}
                                className="text-gray-400"
                              />
                            </div>
                            <Field
                              type="number"
                              name="amount"
                              id="amount"
                              className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:border-black transition-all duration-200"
                              placeholder="0.00"
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                              <span className="text-gray-500 sm:text-sm">
                                INR
                              </span>
                            </div>
                          </div>
                          <ErrorMessage
                            name="amount"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>

                        <div className="mb-6">
                          <label
                            htmlFor="commission"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            Agent Commission Amount (₹)
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <IndianRupee
                                size={18}
                                className="text-gray-400"
                              />
                            </div>
                            <input
                              type="text"
                              name="commission"
                              id="commission"
                              value={calculateAgentCommission(
                                values.amount,
                                settings
                              )}
                              className="block w-full text-gray-500 pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:border-black transition-all duration-200"
                              placeholder="0.00"
                              disabled
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                              <span className="text-gray-500 sm:text-sm">
                                INR
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="mb-6">
                          <label
                            htmlFor="notes"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            Notes (Optional)
                          </label>
                          <Field
                            as="textarea"
                            id="notes"
                            name="notes"
                            rows={3}
                            className="block w-full py-3 px-4 border border-gray-300 rounded-lg focus:border-black transition-all duration-200"
                            placeholder="Add any additional information..."
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-3 mt-9 px-4 cursor-pointer disabled:cursor-not-allowed bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-200 transform hover:translate-y-[-2px] flex items-center justify-center"
                        >
                          <CreditCard size={18} className="mr-2" />
                          {isSubmitting ? (
                            <span>Processing...</span>
                          ) : (
                            <span>
                              Process{" "}
                              {transactionType === "deposit"
                                ? "Deposit"
                                : "Withdrawal"}
                            </span>
                          )}
                        </button>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white  rounded-xl border border-gray-200 overflow-hidden shadow-sm h-full">
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Transaction Guidelines
                  </h3>

                  <div className="space-y-4">
                    <div className="bg-gray-50 border-gray-200 border p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">
                        Deposit Instructions
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li>• Collect cash from customer</li>
                        <li>• Enter exact amount received</li>
                        <li>• Verify customer details</li>
                        <li>• Complete transaction and issue receipt</li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 border-gray-200 border p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">
                        Withdrawal Instructions
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li>• Verify customer identity</li>
                        <li>• Confirm sufficient eRupee balance</li>
                        <li>• Process withdrawal request</li>
                        <li>• Dispense cash and issue receipt</li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 p-4 border-gray-200 border rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">
                        Agent Commission Strategy
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li>• ₹0–499: ₹5 flat</li>
                        <li>
                          • ₹500–999: {settings?.transactionFee500to999}%
                          (rounded)
                        </li>
                        <li>
                          • ₹1,000–4,999: {settings?.transactionFee1000to4999}%
                          (rounded)
                        </li>
                        <li>
                          • ₹5,000–9,999: {settings?.transactionFee5000to9999}%
                          (rounded)
                        </li>
                        <li>
                          • ₹10,000+: {settings?.transactionFee10000}% (rounded)
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Transaction History Tab
          <div className="grid grid-cols-1 ">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="md:p-6 p-2">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 md:mb-0 flex items-center">
                    <History size={18} className="mr-2" />
                    Transaction History
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => {
                        handleFilterChange("all");
                        setTransactionFilter("all");
                      }}
                      className={`px-3 py-1.5 text-xs lg:text-sm cursor-pointer rounded-md transition-colors duration-200 flex items-center ${
                        transactionFilter === "all"
                          ? "bg-gray-900 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <Filter size={14} className="mr-1.5" />
                      All
                    </button>
                    <button
                      onClick={() => {
                        handleFilterChange("pending");
                        setTransactionFilter("pending");
                      }}
                      className={`px-3 py-1.5 text-xs lg:text-sm rounded-md cursor-pointer transition-colors duration-200 flex items-center ${
                        transactionFilter === "pending"
                          ? "bg-gray-900 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <Clock size={14} className="mr-1.5" />
                      Pending
                    </button>
                    <button
                      onClick={() => {
                        handleFilterChange("accepted");
                        setTransactionFilter("accepted");
                      }}
                      className={`px-3 py-1.5 text-xs lg:text-sm rounded-md cursor-pointer transition-colors duration-200 flex items-center ${
                        transactionFilter === "accepted"
                          ? "bg-gray-900 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <Check size={14} className="mr-1.5" />
                      Accepted
                    </button>
                    <button
                      onClick={() => {
                        handleFilterChange("rejected");
                        setTransactionFilter("rejected");
                      }}
                      className={`px-3 py-1.5 text-xs lg:text-sm rounded-md cursor-pointer transition-colors duration-200 flex items-center ${
                        transactionFilter === "rejected"
                          ? "bg-gray-900 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <XCircle size={14} className="mr-1.5" />
                      Rejected
                    </button>
                    <button
                      onClick={() => {
                        handleFilterChange("completed");
                        setTransactionFilter("completed");
                      }}
                      className={`px-3 py-1.5 text-xs lg:text-sm rounded-md cursor-pointer transition-colors duration-200 flex items-center ${
                        transactionFilter === "completed"
                          ? "bg-gray-900 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <CheckCircle size={14} className="mr-1.5" />
                      Completed
                    </button>
                  </div>
                </div>

                {filteredTransactions.length === 0 ? (
                  <div className="text-center py-10">
                    <RefreshCw
                      size={40}
                      className="mx-auto text-gray-300 mb-3"
                    />
                    <p className="text-gray-500">No transactions found</p>
                  </div>
                ) : (
                  <div className="space-y-4 h-[50vh] overflow-y-auto">
                    {filteredTransactions
                      ?.sort((a, b) => {
                        return (
                          new Date(b.transactionDate) -
                          new Date(a.transactionDate)
                        );
                      })
                      .map((transaction) => (
                        <div
                          key={transaction?._id}
                          className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200"
                        >
                          <div className="p-4 bg-white">
                            <div className="flex flex-col md:flex-row justify-between">
                              <div className="mb-2 md:mb-0">
                                <div className="flex flex-wrap sm:flex-nowrap items-center mb-1">
                                  <span className="font-medium text-gray-900 md:text-base text-sm">
                                    {transaction?.conversionType ===
                                    "cashToERupees"
                                      ? "Deposit"
                                      : "Withdrawal"}
                                  </span>
                                  <span className="sm:ml-2 mt-1 sm:mt-0 md:text-sm text-xs text-gray-500">
                                    #{transaction?._id}
                                  </span>
                                  <span
                                    className={`ml-2 hidden sm:block px-2 py-0.5 text-xs rounded-full ${
                                      transaction?.status === "completed"
                                        ? "bg-blue-100 text-blue-800"
                                        : transaction?.status === "pending"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : transaction?.status === "accepted"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-red-100 text-red-800"
                                    }`}
                                  >
                                    {transaction?.status
                                      .charAt(0)
                                      .toUpperCase() +
                                      transaction?.status.slice(1)}
                                  </span>
                                </div>
                                <div className="text-sm text-gray-600 flex items-center">
                                  <span className="text-xs text-gray-500">
                                    {formatDateTime(
                                      transaction?.transactionDate
                                    )}
                                  </span>
                                </div>
                              </div>
                              <div className="flex flex-col items-end">
                                <h1 className="font-bold md:text-base text-sm text-black">
                                    <span>

                                    </span>
                                  <span>
                                  ₹
                                  {transaction?.amount?.toLocaleString("en-IN")}
                                  </span>
                                </h1>
                                <span className="text-xs text-gray-500">
                                  Commission: ₹
                                  {transaction?.commission?.toLocaleString(
                                    "en-IN"
                                  )}
                                </span>
                                <span
                                    className={`ml-2 sm:hidden mt-1 block px-2 py-0.5 text-xs rounded-full ${
                                      transaction?.status === "completed"
                                        ? "bg-blue-100 text-blue-800"
                                        : transaction?.status === "pending"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : transaction?.status === "accepted"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-red-100 text-red-800"
                                    }`}
                                  >
                                    {transaction?.status
                                      .charAt(0)
                                      .toUpperCase() +
                                      transaction?.status.slice(1)}
                                  </span>
                              </div>
                            </div>
                          </div>

                          {transaction?.status === "completed" && (
                            <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 flex items-center text-xs md:text-sm text-gray-500">
                              <Check
                                size={14}
                                className="mr-1.5 text-green-500"
                              />
                              {transaction?.conversionType === "cashToERupees"
                                ? "Cash received and eRupees credited to user"
                                : "Cash given to user and eRupees deducted"}
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl mt-6 border border-gray-200 overflow-hidden shadow-sm">
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Activity size={18} className="mr-2" />
                  Transaction Process
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gray-50 border-gray-200 border p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-3">
                      Withdrawal Flow (eRupees to Cash)
                    </h4>
                    <ol className="text-sm text-gray-600 space-y-3 list-decimal pl-5">
                      <li className="pl-1">User sends withdrawal request</li>
                      <li className="pl-1">Agent accepts request</li>
                      <li className="pl-1">Agent gives real cash to user</li>
                      <li className="pl-1">Agent clicks "Complete"</li>
                      <li className="pl-1">
                        System deducts eRupees from user's wallet
                      </li>
                      <li className="pl-1">
                        System credits eRupees to agent's wallet
                      </li>
                      <li className="pl-1">Transaction marked completed</li>
                    </ol>
                  </div>

                  <div className="bg-gray-50 border-gray-200 border p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-3">
                      Deposit Flow (Cash to eRupees)
                    </h4>
                    <ol className="text-sm text-gray-600 space-y-3 list-decimal pl-5">
                      <li className="pl-1">
                        User sends deposit request to agent
                      </li>
                      <li className="pl-1">Agent accepts request</li>
                      <li className="pl-1">
                        User gives real cash to agent physically
                      </li>
                      <li className="pl-1">
                        Agent clicks "Complete" after receiving cash
                      </li>
                      <li className="pl-1">
                        System credits eRupees to user's wallet
                      </li>
                      <li className="pl-1">
                        System deducts eRupees from agent's wallet
                      </li>
                      <li className="pl-1">Transaction marked completed</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Transaction Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl animate-fade-in">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Confirm Transaction
            </h3>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-500">Transaction Type:</span>
                <span className="font-medium capitalize">
                  {transactionType}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-500">Amount:</span>
                <span className="font-medium">
                  ₹{parseFloat(amount || "0")?.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Agent:</span>
                <span className="font-medium">
                  {capitalize(selectedAgent?.firstName)}{" "}
                  {capitalize(selectedAgent?.lastName)}
                </span>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 py-2 px-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentDetails;

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userLoggedout } from "../redux/slices/signInSlice";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import AgentCard from "../components/AgentCard";
import RecentTransactionCard from "../components/RecentTransactionCard";
import axios, { all } from "axios";
import UserCard from "../components/UserCard";
import { jwtDecode } from "jwt-decode";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { PTPvalidationSchema } from "../yupValidators/validationSchema";
import { ToastContainer, toast } from "react-toastify";

const UserDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const tokenData = jwtDecode(Cookies.get("jwt-token"));
  // console.log(tokenData);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [userProfileData, setUserProfileData] = useState({});
  const [userWalletData, setUserWalletData] = useState({});
  const [showAgentTranscationOptions, setShowAgentTranscationOptions] =
    useState(false);
  const [showSend, setShowSend] = useState(false);
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showRecentTransactionInfo, setShowRecentTransactionInfo] =
    useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [errors, setErrors] = useState("");
  const [showSendFavorites, setShowSendFavorites] = useState(true);
  const [showPTP, setShowPTP] = useState(false);
  const [recieverId, setRecieverId] = useState("");
  const [allTransactions, setAllTransactions] = useState([]);
  const [todaysTransactions, setTodaysTransactions] = useState([]);
  const [allAgents, setAllAgents] = useState([]);
  const [filteredAgents, setFilteredAgents] = useState([]);
  const [recentTransactionInfo, setRecentTransactionInfo] = useState({});
  const [recentTransactionSender, setRecentTransactionSender] = useState({});
  const [recentTransactionReceiver, setRecentTransactionReceiver] = useState(
    {}
  );
  const [refreshData, setRefreshData] = useState(false);
  const isSignedIn = useSelector((state) => state.signin.isSignedIn);

  const goToMoneyMaze = () => {
    navigate("/moneyMaze");
  }

  const FarmToFortune = () => {
    navigate("/farmToFortune");
  }

  // if(!isSignedIn){
  //   navigate("/login");
  // }

  const handleLogout = () => {
    Cookies.remove("jwt-token");
    // console.log("logout clled");
    dispatch(userLoggedout());
    navigate("/login");
  };

  const handleBudgetClick = () => {
    navigate("/budget");
  };

  const [searchIdValue, setSearchIdValue] = useState("");

  const handleSendIdSearchChange = (e) => {
    setSearchIdValue(e.target.value.toUpperCase());
    setFilteredUsers(allUsers);
    setErrors("");
  };

  const getAllTransactions = async () => {
    try {
      const result = await axios.get(
        `http://localhost:5000/transaction/getAllTransactions/${tokenData.user_id}`
      );
      // console.log("result of all transactions", result);
      setAllTransactions(result?.data?.data?.Transaction);
      const result2 = await axios.get(
        `http://localhost:5000/users/userActivity/`,
        tokenData.user_id
      );
      // console.log("result of all transactions 2", result2);
      setTodaysTransactions(result2?.data?.data?.Transaction);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // if (showUserProfile) {
    getAllTransactions();
    getUserProfile();
    getAgents();
    // }
  }, [refreshData]);

  const getUserProfile = async () => {
    try {
      const result = await axios.get(
        `http://localhost:5000/users/${tokenData.user_id}`
      );
      const result2 = await axios.get(
        `http://localhost:5000/users/getWallet/${tokenData.user_id}`
      );
      // console.log("result2", result2);
      // console.log("result", result);
      // console.log("user profile data", result?.data?.data?.user);
      // console.log("user wallet data", result2?.data?.data?.wallet);
      setUserWalletData(result2?.data?.data?.wallet);
      setUserProfileData(result?.data?.data?.user);
    } catch (error) {
      console.log(error);
    }
  };

  const getAgents = async () => {
    try {
      const result = await axios.get("http://localhost:5000/users/getagent/");
      console.log("result of all agents", result);
      setAllAgents(result?.data?.data?.agent);
      setFilteredAgents(result?.data?.data?.agent);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!showSendFavorites) {
      getUsers();
      getAgents();
    }
  }, [showSendFavorites]);

  useEffect(() => {
    if (showRecentTransactionInfo) {
      getTransactionInfo();
    }
  }, [showRecentTransactionInfo]);

  const getTransactionInfo = async () => {
    console.log("showRecentTransactionInfo", recentTransactionInfo);
    const senderData = await axios.get(
      `http://localhost:5000/users/${recentTransactionInfo.sender_id}`
    );
    const receiverData = await axios.get(
      `http://localhost:5000/users/${recentTransactionInfo.recipient_id}`
    );
    console.log("transaction info", recentTransactionInfo);
    console.log("sender data", senderData);
    console.log("receiver data", receiverData);
    setRecentTransactionSender(senderData?.data?.data?.user);
    setRecentTransactionReceiver(receiverData?.data?.data?.user);
    const senderWallet = await axios.get(
      `http://localhost:5000/transaction/getWalletByUser/${recentTransactionInfo.sender_id}`
    );
    const receiverWallet = await axios.get(
      `http://localhost:5000/transaction/getWalletByUser/${recentTransactionInfo.recipient_id}`
    );
    console.log("sender wallet", senderWallet);
    console.log("receiver wallet", receiverWallet);
    const senderWid = senderWallet?.data?.data?.wallet_id;
    const receiverWid = receiverWallet?.data?.data?.wallet_id;
    setRecentTransactionSender({ ...recentTransactionSender, senderWid });
    setRecentTransactionReceiver({ ...recentTransactionReceiver, receiverWid });
  };

  const getUsers = async () => {
    try {
      const result = await axios.get("http://localhost:5000/users");
      // console.log("result all usera", result);
      setAllUsers(result?.data?.data?.user);
      setFilteredUsers(result?.data?.data?.user);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpiSearch = async () => {
    const pattern = /^[A-Z]{3}@RURALFIN$/;
    if (!pattern.test(searchIdValue)) {
      setErrors("Invalid RURAL-FIN UPI ID");
      return;
    } else {
      console.log("ncjdnjansjnaskc", searchIdValue);
      setErrors("");
    }

    try {
      const result = await axios.post(
        `http://localhost:5000/users/getUserByWallet/${searchIdValue}`
      );
      console.log("result of wallet id search", result);
      setFilteredUsers([result?.data?.data?.user]);
      if (result?.data?.data?.user?.user_id == tokenData.user_id) {
        setErrors("You cannot send money to yourself");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleTransactionSubmit = async (values) => {
    try {
      const senderId = tokenData.user_id;
      const recipientId = recieverId;

      const response1 = await axios.get(
        `http://localhost:5000/transaction/getWalletByUser/${senderId}`
      );
      const response2 = await axios.get(
        `http://localhost:5000/transaction/getWalletByUser/${recipientId}`
      );
      console.log("response1", response1);
      console.log("response2", response2);
      const sender_id = response1?.data?.data?.wallet_id;
      const recipient_id = response2?.data?.data?.wallet_id;
      const formData = { ...values, sender_id, recipient_id };
      console.log("form data", formData);
      const result = await axios.post(
        "http://localhost:5000/transaction/userTouser",
        formData
      );
      const notify = await axios.post(
        "http://localhost:5000/users/notifyUser",
        {
          user_id: senderId,
          receipent_wallet_id: recipient_id,
          amount: formData.amount,
        }
      );
      console.log("notify result", notify);
      if (result?.data?.data == "Transaction successful") {
        toast.success("Transaction successful");
        setShowPTP(false);
        setShowSend(false);
        setRefreshData(!refreshData);
      }
      console.log("result of transaction", result);
    } catch (error) {
      console.log("error in transaction", error);
      if (
        error?.response?.data?.error ==
        "you dont have enough balance to make payment"
      ) {
        toast.error("Not enough balance to make payment");
        setShowPTP(false);
        setShowSend(false);
        setRefreshData(!refreshData);
      }
    }
  };

  return (
    <div className="w-full p-4 bg-gray-50 h-screen">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
          <div className="bg-white rounded-lg p-4 px-8 shadow-lg h-10/12 w-6/12">
            {showPTP && (
              <div className="h-full w-full bg-gray-900/30 fixed top-0 left-0 z-50 flex justify-center items-center">
                <div className="bg-white rounded-lg p-4 px-8 shadow-lg h-6/12 w-3/12">
                  <div className="flex justify-between items-start mb-2 h-1/12">
                    <h1 className="text-lg mt-1 font-semibold ml-2">
                      Transaction Panel
                    </h1>
                    <button
                      className="cursor-pointer rounded-full w-10 hover:bg-gray-200 transition-all duration-500 flex justify-center items-center p-2"
                      onClick={() => setShowPTP(false)}
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
                  <div className="h-11/12 w-full">
                    <Formik
                      initialValues={{
                        sender_id: "",
                        recipient_id: "",
                        amount: "",
                        user_pin: "",
                      }}
                      validationSchema={PTPvalidationSchema}
                      onSubmit={handleTransactionSubmit}
                    >
                      <Form className="space-y-4 flex mt-6 items-center content-center h-10/12 justify-center flex-wrap w-full">
                        <div className="flex-auto w-full">
                          <label className="block text-gray-700 mb-1 ml-1">
                            Enter Amount*
                          </label>
                          <Field
                            name="amount"
                            type="number"
                            className="w-full p-2 no-spinner border hover:ring-[1px] ring-gray-700 transition-all duration-500 border-gray-300 rounded-md"
                          />
                          <ErrorMessage
                            name="amount"
                            component="p"
                            className="text-red-500 text-sm"
                          />
                        </div>
                        <div className="flex-auto w-full">
                          <label className="block text-gray-700 mb-1 ml-1">
                            Enter PIN*
                          </label>
                          <Field
                            name="user_pin"
                            placeholder="XXXX"
                            className="w-full p-2 border hover:ring-[1px] ring-gray-700 transition-all duration-500 border-gray-300 rounded-md"
                          />
                          <ErrorMessage
                            name="user_pin"
                            component="p"
                            className="text-red-500 text-sm"
                          />
                        </div>
                        <div className="w-full flex justify-center mt-4">
                          <button
                            type="submit"
                            className="w-7/12 h-10 bg-gradient-to-tr from-blue-600 to-blue-950 rounded-lg hover:from-blue-950 hover:to-blue-600 shadow-lg shadow-black/30 cursor-pointer hover:shadow-black/60 text-white text-lg font-bold transition duration-700"
                          >
                            Submit
                          </button>
                        </div>
                      </Form>
                    </Formik>
                  </div>
                </div>
              </div>
            )}

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
              {showSendFavorites && <h2>show favourites</h2>}
              {!showSendFavorites && (
                <div className="w-full h-full flex flex-wrap justify-center content-start items-start">
                  <div className="w-full flex justify-center items-center mt-6">
                    <input
                      onChange={handleSendIdSearchChange}
                      type="text"
                      value={searchIdValue}
                      placeholder="Enter Rural Fin Id"
                      className="w-7/12 h-12 mr-6 border-2 hover:border-black/60 transition duration-500 border-gray-200 rounded-lg p-4"
                    />
                    <button
                      onClick={handleUpiSearch}
                      className="h-12 text-xl font-semibold hover:shadow-lg hover:shadow-black/50 w-32 rounded-xl text-white bg-gradient-to-tr from-blue-600 to-blue-950 bg-blue-400 transition duration-700 cursor-pointer hover:from-blue-950 hover:to-blue-600"
                    >
                      Search
                    </button>
                  </div>
                  <p className="w-full ml-20 mt-1 mb-6 text-red-700">
                    {errors}
                  </p>
                  <div className="w-full grid grid-cols-2 gap-4">
                    {filteredUsers
                      ?.filter((user) => {
                        if (user.user_id != tokenData.user_id) return user;
                      })
                      .slice(0, 6)
                      .map((user) => (
                        <UserCard
                          key={user.user_id}
                          user={user}
                          setShowPTP={setShowPTP}
                          setRecieverId={setRecieverId}
                        />
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showDeposit && (
        <div className="h-full w-full bg-gray-900/80  fixed top-0 left-0 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-4 shadow-lg h-5/12 w-4/12">
            <div className="flex justify-between items-start mb-2 h-1/12">
              <h1 className="text-lg mt-1 font-semibold ml-2">
                Financial Based Gaming Lessons
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
            
            <div className="flex h-10/12 justify-center items-center">
              <div onClick={()=>goToMoneyMaze()} className="w-40 h-10 bg-gradient-to-tr from-blue-600 to-blue-950 rounded-xl text-white font-bold flex justify-center items-center mr-4 shadow-lg hover:shadow-black/40 cursor-pointer hover:from-blue-950 hover:to-blue-600 transition duration-700">
                <button className="w-full h-full">Money Maze</button>
              </div>
              <div onClick={()=>FarmToFortune()} className="w-40 h-10 bg-gradient-to-tr from-green-600 to-green-900 rounded-xl text-white font-bold flex justify-center items-center shadow-lg hover:shadow-black/40 cursor-pointer hover:from-green-900 hover:to-green-600 transition duration-700">
                  <button className="w-full h-full">Farm To Fortune</button>
              </div>
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
        <div className="h-full w-full bg-gray-900/80 fixed top-0 left-0 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-4 shadow-lg h-5/12 w-4/12">
            {/* Header */}
            <div className="flex justify-between items-start mb-0 h-1/12">
              <h1 className="text-lg mt-1 font-semibold ml-2">
                Transaction Information
              </h1>
              <button
                onClick={() => setShowRecentTransactionInfo(false)}
                className="cursor-pointer rounded-full w-10 hover:bg-gray-200 transition-all duration-500 flex justify-center items-center p-2"
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

            {/* Transaction Details */}
            <div className="h-11/12 flex flex-wrap content-center overflow-auto p-2">
              <div className="w-full">
                <h2 className="text-lg font-semibold mb-1">
                  Transaction Details
                </h2>
                <h2>Amount: ₹{recentTransactionInfo?.amount}</h2>
                <h2>
                  Time:{" "}
                  {new Date(
                    recentTransactionInfo?.date_time
                  ).toLocaleTimeString()}
                </h2>
              </div>

              {/* Sender Details */}
              <div className="grid w-full grid-cols-2">
                <div>
                  <h2 className="text-lg font-semibold mt-4">
                    Sender Information
                  </h2>
                  <h2>Name: {recentTransactionSender?.full_name}</h2>
                  <h2>Phone: {recentTransactionSender?.phone_number}</h2>
                  <h2>Wallet ID: {recentTransactionSender?.senderWid}</h2>
                </div>

                {/* Receiver Details */}
                <div>
                  <h2 className="text-lg font-semibold mt-4">
                    Receiver Information
                  </h2>
                  <h2>Name: {recentTransactionReceiver?.full_name}</h2>
                  <h2>Phone: {recentTransactionReceiver?.phone_number}</h2>
                  <h2>Wallet ID: {recentTransactionReceiver?.receiverWid}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showUserProfile && (
        <div className="h-full w-full bg-gray-900/80  fixed top-0 left-0 z-50 flex justify-center items-center">
          <div className="bg-gradient-to-tr from-white to-blue-400 rounded-lg p-4 pb-0 shadow-lg h-8/12 w-7/12">
            <div className="flex justify-between items-start h-1/12">
              <h1 className="text-xl font-bold ml-2"></h1>
              <button
                className="cursor-pointer rounded-full w-10 transition-all duration-500 flex justify-center items-center p-2"
                onClick={() => setShowUserProfile(false)}
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
                    {userProfileData?.full_name?.[0].toUpperCase()}
                    {userProfileData?.full_name
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
                    Full Name: {userProfileData?.full_name}
                  </h2>
                  <h2 className="text-lg font-semibold mt-2">
                    Email: {userProfileData?.email}
                  </h2>
                  <h2 className="text-lg font-semibold mt-2">
                    Phone : {userProfileData?.phone_number}
                  </h2>
                  <h2 className="text-lg font-semibold mt-2">
                    Age: {userProfileData?.age}
                  </h2>
                  <h2 className="text-lg font-semibold mt-2">
                    Gender: {userProfileData?.gender}
                  </h2>
                  <h2 className="text-lg font-semibold mt-2">
                    Street Address: {userProfileData?.address}
                  </h2>
                  <h2 className="text-lg font-semibold mt-2">
                    City: {userProfileData?.city}
                  </h2>
                  <h2 className="text-lg font-semibold mt-2">
                    State: {userProfileData?.state}
                  </h2>
                  <h2 className="text-lg font-semibold mt-2">
                    Pincode: {userProfileData?.pincode}
                  </h2>
                </div>
                <div className="w-1/2 h-full">
                  <h2 className="text-2xl font-bold mt-2">
                    Wallet Information
                  </h2>
                  <h2 className="text-lg font-semibold mt-6">
                    Budget Limit: Rs. {userProfileData?.budget_limit}
                  </h2>
                  <h2 className="text-lg font-semibold mt-2">
                    Income: Rs. {userProfileData?.income}
                  </h2>
                  <h2 className="text-lg font-semibold mt-2">
                    Joined At:{" "}
                    <i>
                      {new Date(userProfileData?.created_at).toLocaleDateString(
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
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg p-4 mb-4 shadow-sm flex justify-between items-center">
        <Link
          onClick={() => setShowUserProfile(true)}
          className=" relative z-0"
        >
          <div className="flex cursor-pointer items-center">
            <div className="w-12 h-12 flex justify-center items-center rounded-full transition duration-700 bg-gradient-to-tr from-blue-500 to-blue-900 hover:from-blue-900 hover:to-blue-500 mr-4">
              <h2 className="text-lg text-white font-semibold mb-[1px]">
                {userProfileData?.full_name?.[0].toUpperCase()}
                {userProfileData?.full_name?.split(" ")?.[1][0].toUpperCase()}
              </h2>
            </div>
            <div>
              <h1 className="text-xl font-semibold">
                Welcome back, {userProfileData?.full_name}!
              </h1>
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
              <div className="text-2xl font-bold">
                ₹{userWalletData?.user_balance}
              </div>
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
              <div className="text-2xl font-bold">
                {todaysTransactions} trans
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 w-full md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              {/* Agent Selection Section */}
              <div className="bg-white min-h-[38vh] rounded-lg p-4 shadow-sm mb-4">
                <h2 className="text-lg font-semibold mb-4">Select an Agent</h2>
                <div className="space-y-3 grid grid-cols-2 gap-4 gap-y-2">
                  {/* Agent 1 */}
                  {allAgents.map((agent) => (
                    <AgentCard
                      onClick={setShowAgentTranscationOptions}
                      data={agent}
                    />
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white min-h-1/3 w-full rounded-lg p-4 shadow-sm">
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
                    <span className="text-sm">Gaming Lessons</span>
                  </button>

                  {/* Withdraw */}
                  {/* <button
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
                  </button> */}

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
          <h2 className="text-lg font-semibold mb-2">Recent Transactions</h2>
          <div className="space-y-2">
            {/* Transaction 1 */}

            {allTransactions.length > 0 &&
              allTransactions
                .sort((a, b) => new Date(b.date_time) - new Date(a.date_time))
                ?.slice(0, 7)
                .map((transaction, index) => (
                  <RecentTransactionCard
                    index={index}
                    key={transaction.transaction_id}
                    setShowRecentTransactionInfo={setShowRecentTransactionInfo}
                    data={transaction}
                    setRecentTransactionInfo={setRecentTransactionInfo}
                  />
                ))}

            {allTransactions.length === 0 && (
              <h2 className="text-lg w-full text-center font-semibold text-gray-500">
                No transactions yet
              </h2>
            )}
            {/* <RecentTransactionCard
              setShowRecentTransactionInfo={setShowRecentTransactionInfo}
            /> */}

            {/* Transaction 2 */}
            {/* <RecentTransactionCard
              setShowRecentTransactionInfo={setShowRecentTransactionInfo}
            /> */}

            {/* Transaction 3 */}
            {/* <RecentTransactionCard
              setShowRecentTransactionInfo={setShowRecentTransactionInfo}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

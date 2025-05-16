import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useMemo } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoadingScreen from "../components/Loading";
import BalanceCard from "../components/BalanceCard";
import RecentTransactions from "../components/RecentTransactions";
import ExpenseAnalytics from "../components/ExpenseAnalytics";
import QuickActions from "../components/QuickActions";
import UpcomingPayments from "../components/UpcomingsPaymentProps";

import {
  accountBalance,
  recentTransactions,
  expenseAnalytics,
  cards,
  agentsData,
  upcomingPayments,
} from "../data/mockdata";
import useAuth from "../utils/useAuth";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "../redux/slices/loadingSlice";
import axios from "axios";
import { BACKEND_URL } from "../utils/constants";
import capitalize from "../utils/capitalize";
import AgentList from "../components/AgentList";
import Loader from "../components/Loader";
import SendMoney from "../components/SendMoney";

const UserDashboard = () => {
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   // Simulate loading time
  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 2000);

  //   return () => clearTimeout(timer);
  // }, []);

  // if (isLoading) {
  //   return <LoadingScreen />;
  // }
  useAuth();

  const isLoading = useSelector((state) => state.loading.isLoading);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(null);
  const [userFinance, setUserFinance] = useState(null);
  const [showSend, setShowSend] = useState(false);
  const token = Cookies.get("token");
  const decoded = useMemo(() => {
    if (token) return jwtDecode(token);
    return null;
  }, [token]);

  const getUserData = async () => {
    dispatch(showLoader());
    try {
      console.log("hiiii");
      const response = await axios.get(`${BACKEND_URL}/api/user/${decoded.id}`);
      console.log("response", response);
      setUserData(response?.data?.data);
      console.log("FIDDDD", response?.data?.data?.finance);
      const response2 = await axios.get(
        `${BACKEND_URL}/api/finance/${response?.data?.data?.finance}`
      );
      console.log("response fr", response2?.data?.finance);
      setUserFinance(response2?.data?.finance);
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(hideLoader());
    }
  };

  useEffect(() => {
    console.log("decoded", decoded);
    getUserData();
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="bg-gray-50 min-h-screen">
      {showSend && (
        <div className="bg-black/40 flex justify-center items-center fixed top-0 z-50 w-full h-full">
          <SendMoney showSend={{showSend,setShowSend}} user={userData}/>
        </div>
       )}
      <main className="container mx-auto px-4 sm:px-6 pt-10 pb-12">
        <section className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Hello, {capitalize(userData?.firstName)}{" "}
            {capitalize(userData?.lastName)}
          </h1>
          <p className="text-gray-600">
            Welcome back to your financial dashboard
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-1">
            <BalanceCard
              balance={userFinance?.balance}
              currency={accountBalance.currency}
              lastUpdated={accountBalance.lastUpdated}
              showSend={{ showSend, setShowSend }}
            />
          </div>

          <div className="lg:col-span-2">
            <QuickActions />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <RecentTransactions transactions={recentTransactions} />
          </div>

          <div className="lg:col-span-1">
            <ExpenseAnalytics
              totalSpent={expenseAnalytics.totalSpent}
              currency={expenseAnalytics.currency}
              categories={expenseAnalytics.categories}
              comparedToLastMonth={expenseAnalytics.comparedToLastMonth}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AgentList agents={agentsData} />
          <UpcomingPayments payments={upcomingPayments} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UserDashboard;

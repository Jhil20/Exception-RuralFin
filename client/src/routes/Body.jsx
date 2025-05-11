import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoadingScreen from "../components/Loading";
import BalanceCard from "../components/BalanceCard";
import RecentTransactions from "../components/RecentTransactions";
import ExpenseAnalytics from "../components/ExpenseAnalytics";
import QuickActions from "../components/QuickActions";
import CardSection from "../components/CardSection";
import UpcomingPayments from "../components/UpcomingsPaymentProps";

import {
  accountBalance,
  recentTransactions,
  expenseAnalytics,
  cards,
  upcomingPayments,
} from "../data/mockdata";
const Body = () => {
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

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 pt-10 pb-12">
        <section className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Hello, Sarah
          </h1>
          <p className="text-gray-600">
            Welcome back to your financial dashboard
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-1">
            <BalanceCard
              balance={accountBalance.balance}
              currency={accountBalance.currency}
              lastUpdated={accountBalance.lastUpdated}
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
          <CardSection cards={cards} />
          <UpcomingPayments payments={upcomingPayments} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Body;

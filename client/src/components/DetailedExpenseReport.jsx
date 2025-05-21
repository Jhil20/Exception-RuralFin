import React, { useState, useEffect, useMemo } from "react";
import {
  X,
  Download,
  Filter,
  Calendar,
  TrendingUp,
  PieChart,
  BarChart,
} from "lucide-react";
import ExpenseCategoryDetails from "./ExpenseCategoryDetails";
import ExpenseChart from "./ExpenseChart";
import MonthlyComparison from "./MonthlyComparision";
import axios from "axios";
import { BACKEND_URL } from "../utils/constants";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const DetailedExpenseReport = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()+1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [budgetData, setBudgetData] = useState({});
  const [categoryBudgets, setCategoryBudgets] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const [allYearBudgets, setAllYearBudgets] = useState([]);
  const token = Cookies.get("token");
  const decoded = useMemo(() => {
    if (token) {
      const decoded = jwtDecode(token);
      return decoded;
    }
    return null;
  }, [token]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsModalVisible(true), 50);
    } else {
      setIsModalVisible(false);
    }
    setSelectedMonth(new Date().getMonth() + 1);
  }, [isOpen]);

  const getBudget = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/budget/${decoded.id}`
      );
      console.log(
        "response result of budget fetch in expense analytics",
        response
      );
      setBudgetData(response?.data?.budget);
      const keys = Object.keys(response?.data?.budget?.categoryBudgets);

      setCategoryBudgets(keys);
    } catch (err) {
      console.log("error in fetching budget", err);
    }
  };

  const getTotalSpent = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/userToUserTransaction/transactionsTotal/${decoded.id}`,{selectedMonth:selectedMonth}
      );
      setTotalSpent(response?.data?.totalSpent);
    } catch (err) {
      console.log("error in fetching total spent", err);
    }
  };

  useEffect(() => {
    getBudget();
    getAllbudgetsOfThisYear();
  }, []);

  useEffect(() => {
    getTotalSpent();
  }, [budgetData]);

  const getAllbudgetsOfThisYear = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/budget/allBudgetsOfThisYear/${decoded.id}`
      );
      console.log("response result of all budgets of this year", response);
      setAllYearBudgets(response?.data?.budgets);
    } catch (err) {
      console.log("error in fetching all budgets of this year", err);
    }
  };

  if (!isOpen) return null;

 

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  const totalBudget = Object.values(budgetData?.categoryBudgets || {}).reduce(
    (acc, val) => acc + (typeof val === "number" ? val : 0),
    0
  );

  const budgetUtilization = (totalSpent / totalBudget) * 100;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center overflow-y-auto transition-opacity duration-300"
      style={{ opacity: isOpen ? 1 : 0 }}
    >
      <div
        className={`bg-white rounded-2xl w-full pb-8 max-w-4xl max-h-[90vh] overflow-hidden flex flex-col transition-all duration-300 transform ${
          isModalVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Detailed Expense Report
            </h2>
            <p className="text-sm text-gray-500">
              {monthsMapping[budgetData?.month]} {budgetData?.year}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="p-2 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors duration-200"
            >
              <X size={20} className="text-gray-700" />
            </button>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="flex border-b border-gray-100">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-6 py-4 font-medium cursor-pointer text-sm transition-colors duration-200 ${
              activeTab === "overview"
                ? "text-black border-b-2 border-black"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("categories")}
            className={`px-6 py-4 font-medium text-sm cursor-pointer transition-colors duration-200 ${
              activeTab === "categories"
                ? "text-black border-b-2 border-black"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Categories
          </button>
          <button
            onClick={() => setActiveTab("trends")}
            className={`px-6 py-4 font-medium text-sm cursor-pointer transition-colors duration-200 ${
              activeTab === "trends"
                ? "text-black border-b-2 border-black"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Trends
          </button>
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Summary cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-xl shadow-gray-300 hover:shadow-gray-400 transition-all duration-300 shadow-md hover:shadow-lg p-5">
                  <div className="flex items-center justify-between mb-0">
                    <span className="text-sm font-medium text-gray-500">
                      Total Spent
                    </span>
                    <div className="bg-black text-white p-2 rounded-full mr-3">
                      <PieChart size={16} />
                    </div>
                  </div>
                  <p className="text-2xl font-bold">
                    {formatCurrency(totalSpent)}
                  </p>
                  <div className="mt-2 text-xs text-gray-500">
                    vs Budget: {formatCurrency(totalBudget)}
                  </div>
                </div>

                <div className="bg-gray-50 shadow-gray-300 hover:shadow-gray-400 transition-all duration-300 shadow-md hover:shadow-lg rounded-xl p-5">
                  <div className="flex items-center justify-between mb-0">
                    <span className="text-sm font-medium text-gray-500">
                      Budget Utilized
                    </span>
                    <div className="bg-black text-white p-2 rounded-full mr-3">
                      <BarChart size={16} />
                    </div>
                  </div>
                  <p className="text-2xl font-bold">
                    {budgetUtilization.toFixed(1)}%
                  </p>
                  <div className="mt-2 text-xs text-gray-500">
                    {budgetUtilization > 100 ? "Over budget" : "Under budget"}
                  </div>
                </div>

                <div className="bg-gray-50 shadow-gray-300 hover:shadow-gray-400 transition-all duration-300 shadow-md hover:shadow-lg rounded-xl p-5">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium text-gray-500">
                      Time Period
                    </span>
                    <div className="bg-black text-white p-2 rounded-full mr-3">
                      <Calendar size={16} />
                    </div>
                  </div>
                  <select
                    value={selectedMonth}
                    onChange={(e) => {
                      setSelectedMonth(parseInt(e.target.value));
                      const budgetNew = allYearBudgets.find(
                        (budget) => budget?.month === parseInt(e.target.value)
                      );
                      setBudgetData(budgetNew);
                    }}
                    className="block w-full bg-white border cursor-pointer border-gray-200 rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gray-200 mt-1"
                  >
                    {allYearBudgets.map((budget) => (
                      <option
                        className="cursor-pointer"
                        key={budget?._id}
                        value={budget?.month}
                      >
                        {monthsMapping[budget?.month]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <ExpenseChart
                budgetData={budgetData}
                categoryBudgets={categoryBudgets}
              />

              {/* Monthly Comparison */}
              <MonthlyComparison
                allYearBudgets={allYearBudgets}
                totalSpent={totalSpent}
                decoded={decoded}
              />
            </div>
          )}

          {activeTab === "categories" && (
            <ExpenseCategoryDetails
              budgetData={budgetData}
              categoryBudgets={categoryBudgets}
              selectedMonth={selectedMonth}
              decoded={decoded}
            />
          )}

          {activeTab === "trends" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Spending Trends</h3>
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="text-base font-medium mb-4">
                  6-Month Spending Overview
                </h4>
                <div className="h-64 flex items-end space-x-4">
                  {[...Array(6)].map((_, i) => {
                    const height = 30 + Math.random() * 70;
                    return (
                      <div
                        key={i}
                        className="flex-1 flex flex-col items-center"
                      >
                        <div
                          className="w-full bg-black rounded-t-sm"
                          style={{ height: `${height}%` }}
                        ></div>
                        <p className="text-xs mt-2 text-gray-500">
                          {months[(selectedMonth - 5 + i + 12) % 12].substring(
                            0,
                            3
                          )}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="text-base font-medium mb-4">Category Growth</h4>
                <div className="space-y-4">
                  {categoryBudgets.slice(0, 3).map((category, index) => {
                    const growth = Math.floor(Math.random() * 40) - 20;
                    return (
                      <div key={index} className="flex items-center">
                        <div className="w-32 text-sm font-medium">
                          {category}
                        </div>
                        <div className="flex-1 flex items-center">
                          <div
                            className={`flex items-center ${
                              growth >= 0 ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            <TrendingUp size={16} className="mr-1" />
                            <span className="text-sm font-medium">
                              {growth}%
                            </span>
                          </div>
                          <div className="ml-4 flex-1 bg-gray-200 h-2 rounded-full">
                            <div
                              className={`h-2 rounded-full ${
                                growth >= 0 ? "bg-green-500" : "bg-red-500"
                              }`}
                              style={{ width: `${Math.abs(growth) * 2}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailedExpenseReport;

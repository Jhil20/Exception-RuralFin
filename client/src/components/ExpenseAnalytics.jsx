import React, { useEffect, useMemo } from "react";
import { PieChart, Settings, Settings2, TrendingUp } from "lucide-react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { BACKEND_URL } from "../utils/constants";
import { useState } from "react";
import { getSocket } from "../utils/socket";

const ExpenseAnalytics = ({
  setIsReportOpen,
  setBudgetPlanningForm,
  setShowDetailedExpense,
}) => {
  const [totalSpent, setTotalSpent] = useState(0);
  const [budgetData, setBudgetData] = useState({});
  const [categoryBudgets, setCategoryBudgets] = useState([]);

  const token = Cookies.get("token");
  const decoded = useMemo(() => {
    if (token) {
      const decoded = jwtDecode(token);
      return decoded;
    }
    return null;
  }, [token]);

  useEffect(() => {
    getBudget();
    getTotalSpent();
  }, []);

  useEffect(()=>{
    if(!decoded)return;
    const socket=getSocket(decoded.id);
    const handler=(data)=>{
      const { amount, category } = data?.transaction;
      if (amount && category) {
        setTotalSpent((prev) => prev + amount);
        setBudgetData((prev) => {
          const updatedCategorySpending = {
            ...prev.categorySpending,
            [category]: (prev.categorySpending[category] || 0) + amount,
          };
          return {
            ...prev,
            categorySpending: updatedCategorySpending,
          };
        });
      }
      getBudget();
      getTotalSpent();
    }
    socket.on("money-received-by-receiver",handler);
    return () => {
      if(socket){
        socket.off("money-received-by-receiver",handler);
      }
    }
  },[decoded]);

  const getTotalSpent = async () => {
    try {
      const selectedMonth = new Date().getMonth() + 1;
      const response = await axios.post(
        `${BACKEND_URL}/api/userToUserTransaction/transactionsTotal/${decoded.id}`,
        { selectedMonth: selectedMonth },{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //console.log("response result of total spent fetch in expense analytics", response);
      setTotalSpent(response?.data?.totalSpent);
    } catch (err) {
      console.log("error in fetching total spent", err);
    }
  };

  const getBudget = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/budget/${decoded.id}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(
      //   "response result of budget fetch in expense analytics",
      //   response
      // );
      setBudgetData(response?.data?.budget);
      const keys = Object.keys(response?.data?.budget?.categoryBudgets);

      setCategoryBudgets(keys);
    } catch (err) {
      console.log("error in fetching budget", err);
    }
  };

  return (
    <div className="bg-white rounded-2xl  p-6 shadow-md shadow-gray-300">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center bg-gray-900 p-2 px-2 pl-4 rounded-4xl">
          <h3 className="text-lg font-semibold mr-2 text-white">
            Expense Analytics
          </h3>
          <div className="bg-gray-200 p-1 rounded-full">
            <PieChart size={20} className="text-gray-700" />
          </div>
        </div>
        <div
          onClick={() => setBudgetPlanningForm(true)}
          className="hover:bg-gray-200 p-2  transition-all duration-300 cursor-pointer rounded-full"
        >
          <Settings size={22} className="text-gray-700" />
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center">
          <p className="text-2xl font-bold text-gray-900">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "INR",
            }).format(totalSpent)}
          </p>
          {/* <div className="ml-2 flex items-center bg-gray-100 px-2 py-1 rounded-full">
            <TrendingUp
              size={14}
              className={
                comparedToLastMonth >= 0 ? "text-green-500" : "text-red-500"
              }
            />
            <span
              className={`text-xs font-medium ml-1 ${
                comparedToLastMonth >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {comparedToLastMonth > 0 ? "+" : ""}
              {comparedToLastMonth}%
            </span>
          </div> */}
        </div>
        <p className="text-sm text-gray-500 mt-1">Total spent this month</p>
      </div>

      <div className="space-y-4">
        {categoryBudgets.map((category, index) => (
          <div key={index}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                {category}
              </span>
              <span className="text-sm font-medium text-gray-900">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "INR",
                }).format(budgetData?.categorySpending[category])}{" "}
                /{" "}
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "INR",
                }).format(budgetData?.categoryBudgets[category])}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="h-2 rounded-full"
                style={{
                  width: `${
                    (budgetData?.categorySpending[category] /
                      budgetData?.categoryBudgets[category]) *
                      100 >
                    100
                      ? "100"
                      : (budgetData?.categorySpending[category] /
                          budgetData?.categoryBudgets[category]) *
                        100
                  }%`,
                  backgroundColor:
                    (budgetData?.categorySpending[category] /
                      budgetData?.categoryBudgets[category]) *
                      100 >=
                    100
                      ? "red"
                      : "black",
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          setShowDetailedExpense(true);
          setIsReportOpen(true);
        }}
        className="w-full  cursor-pointer mt-6 text-center py-2 text-sm font-medium text-gray-600 hover:text-black transition-colors duration-200"
      >
        View Detailed Report
      </button>
    </div>
  );
};

export default ExpenseAnalytics;

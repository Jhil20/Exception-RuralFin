import React, { useState } from "react";
import { ArrowRight, ArrowUpRight, Wallet, X } from "lucide-react";
import axios from "axios";
import { BACKEND_URL } from "../utils/constants";
import capitalize from "../utils/capitalize";
import TransactionIcon from "../utils/TransactionIcon";
import Cookies from "js-cookie";

const ExpenseCategoryDetails = ({
  budgetData,
  categoryBudgets,
  selectedMonth,
  decoded,
}) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };
  const [detailsTransactions, setDetailsTransactions] = useState([]);
  const [showViewDetails, setShowViewDetails] = useState(false);
  const [whichCategory, setWhichCategory] = useState("");
  const token = Cookies.get("token");
  const handleViewDetails = async (category) => {
    if(category =="Food"){
      category = "Food & Dining";
    }
    setShowViewDetails(true);
    setWhichCategory(category);
    const values = {
      userId: decoded.id,
      selectedMonth: selectedMonth,
      category: category,
      selectedYear: new Date().getFullYear(),
    };
    // console.log("values 22222222222222222", values);
    const response = await axios.post(
      `${BACKEND_URL}/api/userToUserTransaction/transactionsByCategory`,
      values,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
    );
    // console.log("response 22222222222222222", response);
    setDetailsTransactions(response?.data?.transactions);
  };

  return (
    <div className="space-y-8">
      {showViewDetails && (
        <div className="fixed h-full inset-0 bg-black/60 flex items-center justify-center z-40">
          <div className="w-12/12 md:w-10/12 h-9/12 bg-white shadow-lg rounded-lg p-5 px-2 lg:px-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
            <div className="flex mx-4 justify-between h-1/12 items-center mb-4">
              <h2 className="text-xl font-semibold">
                {whichCategory=="Food"?"Food & Dining":whichCategory=="Others"?"Other Category":whichCategory} Transactions Details
              </h2>
              <X
                size={32}
                onClick={() => setShowViewDetails(false)}
                className="text-gray-700 cursor-pointer rounded-lg transition-all duration-300 hover:bg-gray-200 p-1 hover:text-gray-900"
              >
                Close
              </X>
            </div>
            <div className="h-11/12 overflow-y-auto px-0 py-2 bg-white text-black rounded-xl">
              {detailsTransactions.length === 0 ? (
                <div className="text-center h-full flex justify-center items-center pb-10 text-gray-400 text-sm">
                  <h1 className="text-2xl text-gray-500 font-semibold">No transactions found.</h1>
                </div>
              ) : (
                detailsTransactions.map((transaction) => (
                  <div
                    key={transaction?._id}
                    className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0"
                  >
                    <div className="flex items-center space-x-0">
                      <TransactionIcon type={transaction?.remarks} />

                      <div className=" pl-2 md:pl-4">
                        {transaction?.senderId == decoded.id ? (
                          <>
                            <p className="font-medium text-sm  lg:text-base text-gray-900">
                              {capitalize(transaction?.receiverId?.firstName) +
                                " " +
                                capitalize(transaction?.receiverId?.lastName)}
                              <span className=" text-[10px] lg:text-sm text-gray-500">
                                {" "}
                                - {transaction?.receiverId?.ruralFinId}
                              </span>
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="font-medium  text-sm lg:text-base text-gray-900">
                              {capitalize(transaction?.senderId?.firstName) +
                                " " +
                                capitalize(transaction?.senderId?.lastName)}
                              <span className="text-[10px] lg:text-sm text-gray-500">
                                {" "}
                                - {transaction?.receiverId?.ruralFinId}
                              </span>
                            </p>
                          </>
                        )}
                        <p className="text-xs  text-gray-500">
                          {new Date(
                            transaction?.transactionDate
                          ).toLocaleString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex w-28 lg:w-40 items-center justify-end">
                      <span
                        className={` text-xs lg:text-sm font-semibold ${
                          transaction?.senderId != decoded.id
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {/* {transaction?.type === "incoming" ? "+ " : "- "} */}
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "INR",
                        }).format(transaction?.amount)}
                      </span>

                      <div className="ml-0 md:ml-2">
                        {transaction?.senderId != decoded.id ? (
                          <ArrowDownLeft size={16} className="text-green-600" />
                        ) : (
                          <ArrowUpRight size={16} className="text-red-600" />
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
      <h3 className="text-lg font-semibold">Budget Categories</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categoryBudgets.map((category, index) => {
          const spent = budgetData?.categorySpending[category] || 0;
          const budget = budgetData?.categoryBudgets[category] || 0;
          const percentage = (spent / budget) * 100;
          const isOverBudget = spent >= budget;

          return (
            <div
              key={index}
              className="bg-gray-50 shadow-gray-300 border-[1px] border-gray-200 hover:shadow-gray-400 transition-all duration-300 shadow-md hover:shadow-lg rounded-xl overflow-hidden"
            >
              <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 text-white bg-black`}
                    >
                      {category}
                    </span>
                    <h4 className="text-lg font-bold">
                      {formatCurrency(spent)}
                    </h4>
                    <p className="text-sm text-gray-500">
                      of {formatCurrency(budget)} budget
                    </p>
                  </div>

                  <div
                    className={`text-sm font-medium ${
                      isOverBudget ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    {percentage.toFixed(0)}%
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div
                    className={`h-2 rounded-full ${
                      isOverBudget ? "bg-red-500" : "bg-black"
                    }`}
                    style={{
                      width: `${Math.min(percentage, 100)}%`,
                    }}
                  ></div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <Wallet size={14} className="mr-1 mt-[2px]" />
                    <span>Monthly Budget</span>
                  </div>
                  <span
                    className={
                      percentage > 90 ? "text-red-500 font-medium" : ""
                    }
                  >
                    {percentage > 80 ? (percentage>=100?"Over Budget":"Near limit") : "Within budget"}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleViewDetails(category)}
                className="w-full px-5 cursor-pointer py-3 bg-gray-200 text-sm font-medium text-gray-600 hover:text-black flex items-center justify-center transition-colors duration-200"
              >
                <span>View Details</span>
                <ArrowRight size={14} className="ml-1 mt-1" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExpenseCategoryDetails;

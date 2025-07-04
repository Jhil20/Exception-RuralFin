import React, { useEffect, useState } from "react";
import { ArrowUpRight, ArrowDownRight, BarChart2 } from "lucide-react";
import axios from "axios";
import { BACKEND_URL } from "../utils/constants";
import Cookies from "js-cookie";

const MonthlyComparison = ({ allYearBudgets, totalSpent, decoded,selectedMonth }) => {
  // Sample data for illustration
  // console.log("all year budgets", allYearBudgets);
  const [thisMonthStateData, setThisMonthStateData] = useState({});
  const [lastMonthStateData, setLastMonthStateData] = useState({});
  const [lastMonthTotalSpent, setLastMonthTotalSpent] = useState(0);
  const categoryBudgets = [
    "Housing",
    "Food",
    "Healthcare",
    "Education",
    "Utilities",
    "Entertainment",
    "Transport",
    "Others",
  ];
  const token=Cookies.get("token");

  useEffect(() => {
    getTotalspent();
    const thisMonthData = allYearBudgets?.find(
      (budget) =>
        budget?.month == selectedMonth &&
        budget?.year == new Date().getFullYear()
    );
    // console.log("this month data", thisMonthData, allYearBudgets);
    const prevMonth =
      thisMonthData?.month - 1 == 0 ? 12 : thisMonthData?.month - 1;
    const prevYear =
      thisMonthData?.month - 1 == 0
        ? thisMonthData?.year - 1
        : thisMonthData?.year;
    const lastMonthData = allYearBudgets?.find(
      (budget) => budget?.month == prevMonth && budget?.year == prevYear
    );
    // console.log("this month data", thisMonthData);
    // console.log("last month data", lastMonthData);
    setThisMonthStateData(thisMonthData);
    setLastMonthStateData(lastMonthData);
    // const keys = Object.keys(thisMonthData?.categoryBudgets);
    // setCategoryBudgets(keys);
  }, [allYearBudgets,selectedMonth]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getTotalspent = async () => {
    try {
      const response1 = await axios.get(
        `${BACKEND_URL}/api/userToUserTransaction/lastMonthTransactionsTotal/${decoded.id}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("last month total spent", response1.data.totalSpent);
      setLastMonthTotalSpent(response1.data.totalSpent);
    } catch (err) {
      console.log("error fetching total spent", err);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Monthly Comparison</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {lastMonthStateData ? (
          <div className="bg-gray-50 shadow-gray-300 hover:shadow-gray-400 transition-all duration-300 shadow-md hover:shadow-lg rounded-xl p-5">
            <div className="flex justify-between items-center mb-1">
              <h4 className="text-sm lg:text-xl font-medium">Last Month</h4>
            </div>

            <p className="text-2xl font-bold mb-4">
              {formatCurrency(lastMonthTotalSpent)}
            </p>

            <div className="space-y-4">
              {categoryBudgets?.map((category) => {
                const percent =
                  (lastMonthStateData?.categorySpending?.[category] /
                    lastMonthStateData?.categoryBudgets?.[category]) *
                    100 >
                  100
                    ? 100
                    : (lastMonthStateData?.categorySpending?.[category] /
                        lastMonthStateData?.categoryBudgets?.[category]) *
                      100;

                return (
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">
                        {category == "Food" ? "Food & Dining" : category}
                      </span>
                      <div className="flex items-center">
                        <span className="text-sm font-medium mr-2">
                          {formatCurrency(
                            lastMonthStateData?.categorySpending?.[category]
                          )}{" "}
                          /{" "}
                          {formatCurrency(
                            lastMonthStateData?.categoryBudgets?.[category]
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-300 rounded-full h-1.5">
                      <div
                        className="h-1.5 rounded-full transition-all duration-500"
                        style={{
                          width: `${percent}%`,
                          backgroundColor: "black",
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl content-start flex-col flex flex-wrap p-8 pt-0 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div className="flex w-full my-4 h-fit  items-center justify-between ">
              <h4 className=" text-xl lg:mr-50 font-semibold text-gray-900">
                Last Month
              </h4>
              <div className="bg-gray-100 p-2 rounded-lg">
                <BarChart2 className="h-5 w-5 text-gray-600" />
              </div>
            </div>

            <div className="flex flex-grow flex-col items-center w-full justify-center py-8 px-4 bg-gray-50 ring ring-gray-200 rounded-xl">
              <div className="bg-gray-100 p-4 rounded-full mb-4">
                <BarChart2 className="h-8 w-8 text-gray-900" />
              </div>

              <div className="text-center space-y-2">
                <p className="text-xl font-semibold text-gray-800">
                  No Data Available
                </p>
                <p className="text-sm text-gray-500 max-w-xs">
                  We couldn't find any transaction records for the previous
                  month.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-gray-50 shadow-gray-300 hover:shadow-gray-400 transition-all duration-300 shadow-md hover:shadow-lg rounded-xl p-5">
          <div className="flex justify-between items-center mb-1">
            <h4 className="text-xl font-medium">This Month</h4>
          </div>

          <p className="text-2xl font-bold mb-4">
            {formatCurrency(totalSpent)}
          </p>

          <div className="space-y-4">
            {categoryBudgets?.map((category) => {
              const percent =
                (thisMonthStateData?.categorySpending?.[category] /
                  thisMonthStateData?.categoryBudgets?.[category]) *
                  100 >
                100
                  ? 100
                  : (thisMonthStateData?.categorySpending?.[category] /
                      thisMonthStateData?.categoryBudgets?.[category]) *
                    100;
              const lastMonthSpent =
                lastMonthStateData?.categorySpending?.[category] || 0;
              const spendingDifference =
                ((thisMonthStateData?.categorySpending?.[category] -
                  lastMonthSpent) /
                  lastMonthSpent) *
                100;
              return (
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">
                      {category == "Food" ? "Food & Dining" : category}
                    </span>
                    <div className="flex items-center">
                      <span className="text-sm font-medium mr-3">
                        {formatCurrency(
                          thisMonthStateData?.categorySpending?.[category]
                        )}{" "}
                        /{" "}
                        {formatCurrency(
                          thisMonthStateData?.categoryBudgets?.[category]
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-300 rounded-full h-1.5">
                    <div
                      className="h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${percent}%`, backgroundColor: `${percent>=100?"red":"black"}` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyComparison;

import React from "react";
import { ArrowDownCircle, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import capitalize from "../utils/capitalize";
import TransactionIcon from "../utils/TransactionIcon";

const RecentTransactions = ({
  transactionData,
  setViewAll,
  decoded,
  userFinance,
  budgetPlanningEnabled,
}) => {
  return (
    <div className="bg-white min-h-full rounded-2xl p-6 shadow-md shadow-gray-300">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xl font-semibold text-gray-900">
          Recent Transactions
        </h3>
        <button
          onClick={() => setViewAll(true)}
          className="text-sm cursor-pointer hover:bg-gray-200 h-8 w-18 rounded-lg font-medium text-gray-600 hover:text-black transition-colors duration-300"
        >
          View All
        </button>
      </div>

      <div className="space-y-4">
        {transactionData.length === 0 && (
          <div className="flex h-full items-center justify-center py-10">
            <p className="text-gray-500 text-xl">No transactions found</p>
          </div>
        )}
        {transactionData
          .sort((a, b) => {
            return new Date(b.transactionDate) - new Date(a.transactionDate);
          })
          .slice(
            0,
            userFinance?.isBudgetPlanningEnabled || budgetPlanningEnabled
              ? 7
              : 5
          )
          .map((transaction) => {
            const agentTransaction = Boolean(transaction?.agentId);
            return (
              <div
                key={transaction?._id}
                className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
              >
                <div className="flex items-center space-x-3">
                  {agentTransaction ? (
                    transaction?.conversionType === "cashToERupees" ? (
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center bg-gray-200`}
                      >
                        <ArrowDownLeft size={16} className="text-gray-800" />
                      </div>
                    ) : (
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center bg-gray-200`}
                      >
                        <ArrowUpRight size={16} className="text-gray-800" />
                      </div>
                    )
                  ) : (
                    <TransactionIcon type={transaction?.remarks} />
                  )}

                  <div>
                    {agentTransaction ? (
                      <>
                        <p className="font-medium text-gray-900">
                          {capitalize(transaction?.agentId?.firstName) +
                            " " +
                            capitalize(transaction?.agentId?.lastName)}
                          <span className="text-sm text-gray-500">
                            {" "}
                            -{" "}
                            {transaction?.conversionType === "cashToERupees"
                              ? "Cash to eRupees"
                              : "eRupees to Cash"}
                          </span>
                        </p>
                      </>
                    ) : transaction?.senderId == decoded.id ? (
                      <>
                        <p className="font-medium text-gray-900">
                          {capitalize(transaction?.receiverId?.firstName) +
                            " " +
                            capitalize(transaction?.receiverId?.lastName)}
                          <span className="text-sm text-gray-500">
                            {" "}
                            - {transaction?.remarks}
                          </span>
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="font-medium text-gray-900">
                          {capitalize(transaction?.senderId?.firstName) +
                            " " +
                            capitalize(transaction?.senderId?.lastName)}
                          <span className="text-sm text-gray-500">
                            {" "}
                            - {transaction?.remarks}
                          </span>
                        </p>
                      </>
                    )}
                    <p className="text-xs text-gray-500">
                      {new Date(transaction?.transactionDate).toLocaleString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        }
                      )}
                    </p>
                  </div>
                </div>

                {agentTransaction ? (
                  <div className="flex items-center">
                    <span
                      className={`text-sm font-semibold ${
                        transaction?.conversionType === "cashToERupees"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {transaction?.conversionType === "cashToERupees" ? "+ " : "- "}
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "INR",
                      }).format(transaction?.conversionType === "cashToERupees"?transaction?.amount-transaction?.commission:transaction?.amount+transaction?.commission)}
                    </span>

                    <div className="ml-2">
                      {transaction?.conversionType === "cashToERupees"? (
                        <ArrowDownLeft size={16} className="text-green-600" />
                      ) : (
                        <ArrowUpRight size={16} className="text-red-600" />
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <span
                      className={`text-sm font-semibold ${
                        transaction?.senderId != decoded.id
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {transaction?.senderId?._id === decoded.id ? "- " : "+ "}
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "INR",
                      }).format(transaction?.amount)}
                    </span>

                    <div className="ml-2">
                      {transaction?.senderId != decoded.id ? (
                        <ArrowDownLeft size={16} className="text-green-600" />
                      ) : (
                        <ArrowUpRight size={16} className="text-red-600" />
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default RecentTransactions;

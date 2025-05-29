import { ArrowDownCircle, ArrowDownLeft, ArrowUpRight, X } from "lucide-react";
import React from "react";
import TransactionIcon from "../utils/TransactionIcon";
import capitalize from "../utils/capitalize";
import { useState } from "react";

const ViewAll = ({ setViewAll, transactionData, decoded }) => {
  const [transactionInfo, setTransactionInfo] = useState(null);
  const [showTransactionInfo, setShowTransactionInfo] = useState(false);
  const [isAgentTransaction, setIsAgentTransaction] = useState(false);
  console.log("transactionData", transactionData);
  return (
    <div className="w-2/3 h-10/12 bg-white rounded-lg shadow-lg p-6">
      {transactionInfo != null && showTransactionInfo == true && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white w-1/3 h-fit  rounded-2xl shadow-xl p-8 relative">
            <div className="flex justify-start items-start mb-4">
              <X
                size={32}
                onClick={() => {
                  setShowTransactionInfo(false);
                  setTransactionInfo(null);
                  setIsAgentTransaction(false);
                }}
                className="hover:bg-gray-200 p-1 pl-0 mr-3 mt-[1px] cursor-pointer rounded-md transition-all duration-300"
              />
              <h2 className="text-2xl font-semibold text-gray-800  text-center">
                Transaction Details
              </h2>
            </div>

            <div className="space-y-3 text-sm text-gray-700">
              <p>
                <span className="font-medium">Transaction ID :</span>{" "}
                {transactionInfo?._id}
              </p>
              <p>
                <span className="font-medium">Status :</span>
                <span
                  className={`ml-2 inline-block px-2 py-1 rounded-full text-xs font-semibold 
            ${
              transactionInfo?.status === "completed"
                ? "bg-green-100 text-green-700"
                : transactionInfo?.status === "failed"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
                >
                  {capitalize(transactionInfo?.status)}
                </span>
              </p>
              <p>
                <span className="font-medium">Amount :</span>{" "}
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                }).format(
                   transactionInfo?.commission ? transactionInfo?.amount-transactionInfo?.commission : transactionInfo?.amount
                )}
              </p>
              <p>
                <span className="font-medium">Date :</span>{" "}
                {new Date(transactionInfo?.transactionDate).toLocaleString(
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
              {isAgentTransaction ? (
                <p>
                  <span className="font-medium">Conversion Type :</span>{" "}
                  {transactionInfo?.conversionType === "cashToERupees"
                    ? "Cash to eRupees"
                    : "eRupees to Cash"}
                </p>
              ) : (
                <p>
                  <span className="font-medium">Remarks :</span>{" "}
                  {transactionInfo?.remarks}
                </p>
              )}

              {isAgentTransaction ? (
                <>
                  <p>
                    <span className="font-medium">Agent :</span>{" "}
                    {capitalize(transactionInfo?.agentId?.firstName)}{" "}
                    {capitalize(transactionInfo?.agentId?.lastName)}
                  </p>

                  <p>
                    <span className="font-medium">Commission Charge :</span>{" "}
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                    }).format(transactionInfo?.commission)}
                  </p>
                </>
              ) : transactionInfo?.senderId === decoded.id ? (
                <>
                  <p>
                    <span className="font-medium">Receiver :</span>{" "}
                    {transactionInfo?.receiverId?.firstName}{" "}
                    {transactionInfo?.receiverId?.lastName}
                  </p>

                  <p>
                    <span className="font-medium">Receiver RuralFin ID :</span>{" "}
                    {transactionInfo?.receiverId?.ruralFinId}
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <span className="font-medium">Sender :</span>{" "}
                    {transactionInfo?.senderId?.firstName}{" "}
                    {transactionInfo?.senderId?.lastName}
                  </p>

                  <p>
                    <span className="font-medium">Sender RuralFin ID :</span>{" "}
                    {transactionInfo?.senderId?.ruralFinId}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="flex h-1/12 justify-start items-start mb-4">
        <X
          size={32}
          onClick={() => setViewAll(false)}
          className="hover:bg-gray-200 p-1 mr-4 cursor-pointer rounded-md transition-all duration-300"
        ></X>
        <h1 className="text-xl font-semibold"> All Transactions</h1>
      </div>
      <div className="overflow-y-auto h-11/12">
        {transactionData
          .sort((a, b) => {
            return new Date(b.transactionDate) - new Date(a.transactionDate);
          })
          .map((transaction) => {
            const agentTransaction = Boolean(transaction?.agentId);
            return (
              <div
                key={transaction?._id}
                onClick={() => {
                  setTransactionInfo(transaction);
                  setShowTransactionInfo(true);
                  if (agentTransaction) {
                    setIsAgentTransaction(true);
                  } else {
                    setIsAgentTransaction(false);
                  }
                }}
                className="flex items-center cursor-pointer hover:bg-gray-100 transition-all duration-200 justify-between py-3 border-b border-gray-100 last:border-0"
              >
                <div className="flex items-center space-x-3">
                  {agentTransaction ? (
                    transaction?.conversionType === "cashToERupees" ? (
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center bg-gray-200`}
                      >
                        <ArrowDownCircle size={16} className="text-gray-800" />
                      </div>
                    ) : (
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center bg-gray-200`}
                      >
                        <ArrowDownLeft size={16} className="text-gray-800" />
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
                      {transaction?.conversionType === "cashToERupees"
                        ? "+ "
                        : "- "}
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "INR",
                      }).format(transaction?.amount-transaction?.commission)}
                    </span>

                    <div className="ml-2">
                      {transaction?.conversionType === "cashToERupees" ? (
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
                      {transaction?.type === "incoming" ? "+ " : "- "}
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
          {transactionData.length === 0 && (
            <div className="flex items-center justify-center pb-20 h-full">
              <p className="text-gray-500  text-xl">No transactions found</p>
            </div>
          )}
      </div>
    </div>
  );
};

export default ViewAll;

import React, { useEffect, useState } from "react";
import {
  Phone,
  Mail,
  Calendar,
  Wallet,
  Clock,
  Award,
  BarChart3,
  LandPlot,
  Landmark,
  House,
} from "lucide-react";
import Modal from "../components/Modal";
import Button from "../components/Button";
import Card from "../components/Card";
import { toast } from "react-toastify";
import capitalize from "../utils/capitalize";
import axios from "axios";
import { BACKEND_URL } from "../utils/constants";

const UserDetailsModal = ({ isOpen, onClose, user }) => {
  // const transactions = [
  //   { id: 1, date: '2025-04-10', type: 'deposit', amount: 5000, agent: 'Agent #123' },
  //   { id: 2, date: '2025-04-09', type: 'withdrawal', amount: 2000, agent: 'Agent #456' },
  //   { id: 3, date: '2025-04-08', type: 'deposit', amount: 3000, agent: 'Agent #123' },
  //   { id: 4, date: '2025-04-07', type: 'deposit', amount: 1500, agent: 'Agent #789' },
  //   { id: 5, date: '2025-04-06', type: 'withdrawal', amount: 1000, agent: 'Agent #456' },
  // ];
  const [transactions, setTransactions] = useState([]);

  const getAllTransactions = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/admin/allTransactionsForUser/${user._id}`
      );
      // console.log("response user detail transactions", response);
      setTransactions(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    getAllTransactions();
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`User Details`} size="lg">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 pb-5">
            <Card className="h-12/12 ">
              <div className="flex flex-col items-center">
                <div className="h-20 w-20 rounded-full bg-gray-900 flex items-center justify-center text-white text-2xl font-bold mb-4">
                  {user?.firstName?.charAt(0).toUpperCase() +
                    user?.lastName?.charAt(0).toUpperCase()}
                </div>

                <h3 className="text-xl font-semibold text-gray-800">
                  {capitalize(user?.firstName) +
                    " " +
                    capitalize(user?.lastName)}
                </h3>
                <p className="text-gray-500 mb-1">User #{user?._id}</p>
                <p className="text-gray-500 mb-4">
                  RuralFinId: {user?.ruralFinId}
                </p>

                <div
                  className={`w-20 h-8 mb-3 ${
                    user?.isActive
                      ? "bg-green-100 border-2 border-green-200 text-green-800"
                      : "bg-red-100 border-2 border-red-200 text-red-900"
                  }  rounded-3xl text-center flex items-center justify-center`}
                >
                  {user?.isActive ? "Active" : "Inactive"}
                </div>

                <div className="w-full space-y-4">
                  <div className="flex items-center">
                    <Phone size={16} className="text-gray-500 mr-3" />
                    <span className="text-gray-700">
                      {user?.phone.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <House size={16} className="text-gray-500 mr-3" />
                    <span className="text-gray-700">{user?.address}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar size={16} className="text-gray-500 mr-3" />
                    <span className="text-gray-700">
                      Joined : {new Date(user?.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="text-gray-500 mr-3" />
                    <span className="text-gray-700">
                      Last activity :{" "}
                      {new Date(
                        Math.max(
                          new Date(user?.finance?.updatedAt).getTime(),
                          new Date(user?.updatedAt).getTime()
                        )
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="md:col-span-2 ml-1 mr-1 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Wallet Balance</p>
                    <p className="text-2xl font-bold text-gray-800">
                      ₹{user?.finance?.balance.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-3 bg-gray-200 rounded-lg text-gray-800">
                    <Wallet size={20} />
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Total Transactions</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {user?.totalTransactions}
                    </p>
                  </div>
                  <div className="p-3 bg-gray-200 rounded-lg text-gray-800">
                    <BarChart3 size={20} />
                  </div>
                </div>
              </Card>
            </div>

            <div>
              <div className="overflow-x-auto">
                <Card className="h-[48.8vh] mb-5" title={"Transaction History"}>
                  <div className="overflow-x-auto h-10/12">
                    <table className="min-w-full">
                      <thead>
                        <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <th className="pl-18 py-3">Date</th>
                          <th className="pl-11 py-3">Type</th>
                          <th className="px-4 pl-6 py-3">Conversion</th>
                          <th className="px-4 pl-5 py-3">Amount</th>
                          <th className="px-4 pl-17 py-3">User/Agent</th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-gray-200">
                        {transactions.map((transaction) => (
                          <tr key={transaction?._id}>
                            <td className="px-4 text-center py-3 text-sm whitespace-nowrap">
                              {new Date(
                                transaction?.transactionDate
                              ).toLocaleDateString("en-IN", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                              })}
                            </td>
                            <td className="px-4 text-center text-sm py-3 whitespace-nowrap">
                              <span>{transaction?.type}</span>
                            </td>
                            {transaction?.type == "User to User" ? (
                              <td className="px-4 text-center text-sm py-3 whitespace-nowrap">
                                <span>
                                  {transaction?.senderId._id == user._id
                                    ? "Debit"
                                    : "Credit"}
                                </span>
                              </td>
                            ) : (
                              <td className="px-4 text-center text-sm py-3 whitespace-nowrap">
                                <span>
                                  {transaction?.conversionType ==
                                  "cashToERupees"
                                    ? "Deposit"
                                    : "Withdraw"}
                                </span>
                              </td>
                            )}
                            <td className="px-4 text-center py-3 whitespace-nowrap font-medium">
                              ₹{transaction.amount.toLocaleString()}
                            </td>

                            {transaction?.type == "User to User" ? (
                              <td className="px-4 text-center py-3 text-sm whitespace-nowrap">
                                {transaction?.senderId?._id == user._id
                                  ? transaction?.receiverId._id
                                  : transaction?.senderId._id}
                              </td>
                            ) : (
                              <td className="px-4 text-center text-sm py-3 whitespace-nowrap">
                                {transaction?.agentId?._id}
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UserDetailsModal;

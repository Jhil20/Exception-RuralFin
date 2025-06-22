import React from "react";
import {
  Phone,
  Mail,
  MapPin,
  Calendar,
  BadgeDollarSign,
  Clock,
  BarChart3,
  IndianRupee,
  Accessibility,
  IdCard,
  Landmark,
  KeyRound,
} from "lucide-react";
import Modal from "../components/Modal";
import Button from "../components/Button";
import Card from "../components/Card";
import { toast } from "react-toastify";
import capitalize from "../utils/capitalize";
import { BACKEND_URL } from "../utils/constants";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";

const AgentDetailsModal = ({ isOpen, onClose, agent }) => {
  const [transactions, setTransactions] = useState([]);
  const token=Cookies.get("token");
  const getAlltransactions = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/agentToUserTransaction/${agent._id}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //console.log("response agent detail transactions",response);
      setTransactions(response?.data?.transactions);
    } catch (error) {
      console.log("error in fetching transactions", error);
    }
  };
  useEffect(() => {
    getAlltransactions();
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Agent Details `} size="lg">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card className="h-full">
              <div className="flex flex-col items-center">
                <div className="h-20 w-20 rounded-full bg-gray-900 flex items-center justify-center text-white text-2xl font-bold mb-4">
                  {agent?.firstName[0].toUpperCase() +
                    agent?.lastName[0].toUpperCase()}
                </div>

                <h3 className="text-xl font-semibold text-gray-800">
                  {capitalize(agent?.firstName) +
                    " " +
                    capitalize(agent?.lastName)}
                </h3>
                <p className="text-gray-500 mb-4">
                  Agent #{agent._id.toLocaleString()}
                </p>

                <div
                  className={`w-20 h-8 mb-3 ${
                    agent?.isActive
                      ? "bg-green-100 border-2 border-green-200 text-green-800"
                      : "bg-red-100 border-2 border-red-200 text-red-900"
                  }  rounded-3xl text-center flex items-center justify-center`}
                >
                  {agent?.isActive ? "Active" : "Inactive"}
                </div>

                <div className="w-full space-y-4">
                  <div className="flex items-center">
                    <Phone size={16} className="text-gray-500 mr-3" />
                    <span className="text-gray-700">{agent?.phone}</span>
                  </div>

                  <div className="flex items-start">
                    <MapPin size={16} className="text-gray-500 mr-3 mt-1" />
                    <span className="text-gray-700">{agent?.address}</span>
                  </div>
                  <div className="flex items-start">
                    <IdCard size={16} className="text-gray-500 mr-3 mt-1" />
                    <span className="text-gray-700">
                      {agent?.accountNumber}
                    </span>
                  </div>
                  <div className="flex items-start">
                    <KeyRound size={16} className="text-gray-500 mr-3 mt-1" />
                    <span className="text-gray-700">{agent?.ifscCode}</span>
                  </div>
                  <div className="flex items-start">
                    <Landmark size={16} className="text-gray-500 mr-3 mt-1" />
                    <span className="text-gray-700">{agent?.bankName}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar size={16} className="text-gray-500 mr-3" />
                    <span className="text-gray-700">
                      Joined :{" "}
                      {new Date(agent?.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="md:col-span-2 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Balance</p>
                    <p className="text-2xl font-bold text-gray-800">
                      ₹{agent?.balance.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-3 bg-gray-900 rounded-lg text-white">
                    <IndianRupee size={20} />
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Security Deposit</p>
                    <p className="text-2xl font-bold text-gray-800">
                      ₹{agent?.securityDeposit.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-3 bg-gray-900 rounded-lg text-white">
                    <IndianRupee size={20} />
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Commission Earned</p>
                    <p className="text-2xl font-bold text-gray-800">
                      ₹{agent?.commissionEarned.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-3 bg-gray-900 rounded-lg text-white">
                    <IndianRupee size={20} />
                  </div>
                </div>
              </Card>
            </div>

            <Card className="h-[48.8vh]" title="Transaction History">
              <div className="overflow-x-auto h-10/12">
                <table className="min-w-full h-full">
                  <thead>
                    <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <th className="px-4 py-3 text-center pr-6">Date</th>
                      <th className="px-4 py-3 text-center pr-7">Type</th>
                      <th className="px-4 py-3">Amount</th>
                      <th className="px-4 py-3">Commission</th>
                      <th className="px-4 text-center pr-12 py-3">User</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y h-10/12  overflow-y-auto divide-gray-200">
                    {transactions
                      .filter((tr) => tr.status == "completed")
                      .map((transaction) => (
                        <tr key={transaction?._id}>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {new Date(
                              transaction?.transactionDate
                            ).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                transaction?.conversionType != "cashToERupees"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {capitalize(transaction?.conversionType)}
                            </span>
                          </td>
                          <td className="px-4 text-center pr-7 py-3 whitespace-nowrap font-medium">
                            ₹{transaction?.amount.toLocaleString()}
                          </td>
                          <td className="px-4 py-3 text-center pr-7 whitespace-nowrap font-medium">
                            ₹{transaction?.commission.toLocaleString()}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            #{transaction?.userId._id.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AgentDetailsModal;

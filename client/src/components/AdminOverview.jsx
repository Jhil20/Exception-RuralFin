import React, { useEffect, useState } from "react";
import {
  Users,
  BadgeDollarSign,
  RefreshCw,
  TrendingUp,
  IndianRupee,
  UserCheck,
  User,
  TrendingDown,
} from "lucide-react";
import Card from "../components/Card";
import Button from "../components/Button";
import { toast } from "react-toastify";
import axios from "axios";
import { BACKEND_URL } from "../utils/constants";
import capitalize from "../utils/capitalize";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import findChange from "../utils/findChange";
import { useMemo } from "react";
import { getSocket } from "../utils/socket";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import useAuth from "../utils/useAuth";
import classifyDate from "../utils/classifyDate";

Chart.register(ArcElement, Tooltip, Legend);

const StatCard = ({ title, value, icon }) => {
  return (
    <Card className="flex flex-col h-full">
      <div className="flex justify-between items-start mb-0">
        <h3 className="text-gray-500 font-medium">{title}</h3>
        <div className="p-2 bg-gray-200 rounded-lg text-gray-900">{icon}</div>
      </div>
      <div className="flex-1 mb-1">
        <p className="text-3xl font-bold text-gray-800">{value}</p>
      </div>
    </Card>
  );
};

const AdminOverview = () => {
  useAuth();
  const [overviewCardData, setOverviewCardData] = useState({});
  const [recentActivityData, setRecentActivityData] = useState([]);
  const [transactionVolumeData, setTransactionVolumeData] = useState({});
  const [allCommissions, setAllCommissions] = useState([]);
  const [activeUsers, setActiveUsers] = useState(0);
  const token = Cookies.get("token");
  const decoded = useMemo(() => {
    if (!token) return null;
    return jwtDecode(token);
  }, [token]);

  useEffect(() => {
    if (!decoded) return;
    const socket = getSocket(decoded.id);
    getActiveUsers();
    const handler = (data) => {
      setActiveUsers(data.length);
    };
    const handler1 = (data) => {
      console.log("New account created: sokceint in admin overview", data);
      if (data?.role == "agent") {
        setOverviewCardData((prevData) => ({
          ...prevData,
          totalAgents: prevData.totalAgents + 1,
        }));
      } else {
        setOverviewCardData((prevData) => ({
          ...prevData,
          totalUsers: prevData.totalUsers + 1,
        }));
      }
      getOverviewCardData();
    };
    const handler2 = (data) => {
      setOverviewCardData((prevData) => ({
        ...prevData,
        thisMonthTransactions: prevData.thisMonthTransactions + 1,
      }));
      console.log(
        "New transaction made: socket in admin overview",
        transactionVolumeData,
        data
      );
      setTransactionVolumeData((prevData) => ({
        ...prevData,
        todayTransactions: prevData.todayTransactions + data.transaction.amount,
        thisWeekTransactions:
          prevData.thisWeekTransactions + data.transaction.amount,
        thisMonthTransactions:
          prevData.thisMonthTransactions + data.transaction.amount,
      }));
      getTransationVolume();
      getOverviewCardData();
    };

    const handler3 = (data) => {
      console.log("New recent activity: socket in admin overview", data);
      setRecentActivityData((prevData) => {
        const newActivity = {
          ...data,
          createdAt: classifyDate(data.createdAt || data.transactionDate),
        };
        return [newActivity, ...prevData];
      });
      getRecentActivityData();
    };

    socket.on("activeUsers", handler);
    socket.on("newAccountCreatedBackend", handler1);
    socket.on("newTransactionMade", handler2);
    socket.on("newRecentActivityBackend", handler3);
    return () => {
      socket.off("activeUsers", handler);
      socket.off("newAccountCreatedBackend", handler1);
      socket.off("newTransactionMade", handler2);
      socket.off("newRecentActivityBackend", handler3);
    };
  }, [decoded]);

  const getAllAdminCommissions = async () => {
    try{
      const response=await axios.get(`${BACKEND_URL}/api/adminCommission/allCommissions`);
      setAllCommissions(response.data.data);
      console.log("All Admin Commissions:", response.data.data);
    }catch (error) {
      console.error("Error fetching admin commissions:", error);
    }
  }

  const getActiveUsers = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/getActiveUsers`);
      console.log("Active Users Data:", response.data);
      const length = response.data.data.length + 1;
      setActiveUsers(length);
    } catch (error) {
      console.error("Error fetching active users:", error);
    }
  };

  const getOverviewCardData = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/admin/OverviewCardData`
      );
      console.log("Overview Card Data:", response.data);
      setOverviewCardData(response.data.data);
    } catch (error) {
      console.error("Error fetching overview card data:", error);
    }
  };

  const getRecentActivityData = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/admin/recentActivity`
      );
      console.log("Recent Activity Data:", response.data);
      // Process and display recent activity data as needed
      setRecentActivityData(response?.data?.data);
    } catch (error) {
      console.error("Error fetching recent activity data:", error);
    }
  };

  const getTransationVolume = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/admin/transactionVolume`
      );
      console.log("Transaction Volume Data:", response.data);
      setTransactionVolumeData(response.data.data);
    } catch (error) {
      console.error("Error fetching transaction volume data:", error);
    }
  };

  // const adminInsert=async()=>{
  //   try{
  //     const response=await axios.post(`${BACKEND_URL}/api/admin/insertAdmin`, {
  //       firstName: "Harsh",
  //       lastName: "Patadia",
  //       phone: "9998076910",
  //       password: "admin123",
  //     });
  //     console.log("Admin Insert Response:", response.data);
  //   }catch(error){
  //     console.error("Error inserting admin data:", error);
  //   }
  // }
  useEffect(() => {
    getOverviewCardData();
    // adminInsert();
    getRecentActivityData();
    getTransationVolume();
    getAllAdminCommissions();
  }, []);

  return (
    <div className="space-y-6 p-3 h-10/12">
      <div className="flex items-center mt-2 justify-between">
        <h1 className="text-2xl font-bold text-gray-800">
          Admin Dashboard Overview
        </h1>
      </div>

      <div className="grid grid-cols-5 gap-6">
        <StatCard
          title="Profit Earned"
          value={`₹${allCommissions?.reduce((acc,item)=>{
            return acc + item.totalCommissionEarned;
          },0) || "0"}`}
          icon={<IndianRupee size={20} />}
        />
        <StatCard
          title="Platform Balance"
          value={`₹${overviewCardData?.totalBalance || "0"}`}
          icon={<IndianRupee size={20} />}
        />
        <StatCard
          title="Total Accounts"
          value={`${
            overviewCardData?.totalAgents + overviewCardData?.totalUsers + 1 ||
            "0"
          }`}
          icon={<Users size={20} />}
        />
        <StatCard
          title="Active Accounts"
          value={`${activeUsers}`}
          icon={<Users size={20} />}
        />
        <StatCard
          title="Monthly Transactions"
          value={`${overviewCardData?.thisMonthTransactions || "0"}`}
          icon={<RefreshCw size={20} />}
        />
      </div>

      <div className="grid h-full pb-3 lg:grid-cols-2 gap-6">
        <Card
          className="mb-3 ml-1 h-12/12 overflow-y-hidden"
          title="Recent Activity"
        >
          <div className="space-y-4 h-11/12 overflow-y-auto">
            {recentActivityData.map((activity) => (
              <div
                key={activity?._id}
                className="flex items-start h-20 mb-1 pb-3 border-b border-gray-200 last:border-0 last:pb-0"
              >
               

                <div
                  className={`h-10 mt-3 w-10 rounded-full flex items-center justify-center text-black mr-4 ml-1 bg-gray-200 ring-[1px] ring-gray-300 `}
                >
                  {activity?.type == "User Created" ? (
                    <User size={18} />
                  ) : activity?.type == "Agent Created" ? (
                    <UserCheck size={18} />
                  ) : (
                    <BadgeDollarSign size={18} />
                  )}
                </div>
                <div className="w-11/12">
                  <div className="font-medium flex items-center justify-between text-gray-800">
                    <p>
                      {activity?.type == "User Created"
                        ? `User created with ID #${activity?._id}`
                        : activity?.type == "Agent Created"
                        ? `Agent created with ID #${activity?._id}`
                        : activity?.type == "adminToAgent"
                        ? `Security Deposit of ₹${activity?.amount} added to Agent`
                        : `Transaction of ₹${activity?.amount} completed by Agent`}
                    </p>
                    <div className="text-xs text-gray-500 mt-[1px] mr-2">
                      <p className="text-xs text-end text-gray-500">
                        {new Date(
                          activity?.createdAt || activity?.transactionDate
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                      <p className="text-xs text-end text-gray-500 ">
                        {new Date(
                          activity?.createdAt || activity?.transactionDate
                        ).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 ">
                    {activity?.type == "User Created"
                      ? `Name : ${capitalize(activity?.firstName)} ${capitalize(
                          activity?.lastName
                        )}`
                      : activity?.type == "Agent Created"
                      ? `Name : ${capitalize(activity?.firstName)} ${capitalize(
                          activity?.lastName
                        )}`
                      : activity?.type == "adminToAgent"
                      ? `Agent : ${capitalize(
                          activity?.agentId?.firstName
                        )} ${capitalize(activity?.agentId?.lastName)} | ${
                          activity?.agentId?._id
                        }`
                      : `User : ${capitalize(
                          activity?.userId?.firstName || activity?.user?.firstName
                        )} ${capitalize(activity?.userId?.lastName || activity?.user?.lastName)} | #${
                          activity?.userId?._id || activity?.user?._id
                        } `}
                  </p>
                  <p className="text-xs text-gray-500 mt-0">
                    {activity?.type == "User Created"
                      ? `Phone : ${activity?.phone}`
                      : activity?.type == "Agent Created"
                      ? `Phone : ${activity?.phone}`
                      : activity?.type == "adminToAgent"
                      ? `Agent Phone : ${activity?.agentId?.phone}`
                      : `Agent : ${capitalize(
                          activity?.agentId?.firstName || activity?.agent?.firstName
                        )} ${capitalize(activity?.agentId?.lastName || activity?.agent?.lastName)} | ${
                          activity?.agentId?._id || activity?.agent?._id
                        }`}
                  </p>
                  <p className="text-xs text-gray-500 mt-1"></p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="mt-0 h-12/12" title="Transaction Volume">
          <div className="h-11/12">
            <div className="h-72 flex items-center justify-center shadow-lg hover:shadow-black/20 transition-all duration-300 shadow-black/10 border border-gray-200 bg-gray-100 rounded-xl">
              <div className="w-full h-full max-w-[300px] max-h-[240px]">
                <Pie
                  data={{
                    labels: ["Today", "This Week", "This Month"],
                    datasets: [
                      {
                        data: [
                          transactionVolumeData?.todayTransactions,
                          transactionVolumeData?.thisWeekTransactions,
                          transactionVolumeData?.thisMonthTransactions,
                        ],
                        backgroundColor: ["#AAAAAA", "#444444", "black "],
                        borderColor: "#fff",
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={{
                    plugins: {
                      legend: {
                        position: "right",
                        labels: {
                          color: "#333",
                          font: { size: 14 },
                          boxWidth: 12,
                        },
                      },
                      tooltip: {
                        callbacks: {
                          label: function (context) {
                            const label = context.label || "";
                            const value = context.parsed || 0;
                            return `${label}: ₹${value.toLocaleString(
                              "en-IN"
                            )}`;
                          },
                        },
                      },
                    },
                    maintainAspectRatio: false,
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center border border-gray-200 bg-gray-50 shadow-lg hover:shadow-black/20 transition-all duration-300 shadow-black/10 rounded-lg p-4">
                <p className="text-gray-500 text-sm">Today</p>
                <p className="font-semibold text-gray-800 text-lg">
                  ₹{transactionVolumeData?.todayTransactions || "0"}
                </p>

                {findChange(
                  transactionVolumeData?.todayTransactions,
                  transactionVolumeData?.yesterdayTransactions
                ) >= 0 ? (
                  <div className="text-green-600 text-xs flex items-center justify-center mt-1">
                    <TrendingUp size={12} />
                    <span className="ml-1">
                      {Math.abs(
                        findChange(
                          transactionVolumeData?.todayTransactions,
                          transactionVolumeData?.yesterdayTransactions
                        )
                      )}
                      %
                    </span>
                  </div>
                ) : (
                  <div className="text-red-600 text-xs flex items-center justify-center mt-1">
                    <TrendingDown size={12} />
                    <span className="ml-1">
                      {Math.abs(
                        findChange(
                          transactionVolumeData?.todayTransactions,
                          transactionVolumeData?.yesterdayTransactions
                        )
                      )}
                      %
                    </span>
                  </div>
                )}
              </div>
              <div className="text-center border border-gray-200 bg-gray-50 shadow-lg hover:shadow-black/20 transition-all duration-300 shadow-black/10 rounded-lg p-4">
                <p className="text-gray-500 text-sm">This Week</p>
                <p className="font-semibold text-gray-800 text-lg">
                  ₹{transactionVolumeData?.thisWeekTransactions || "0"}
                </p>
                {findChange(
                  transactionVolumeData?.thisWeekTransactions,
                  transactionVolumeData?.lastWeekTransactions
                ) >= 0 ? (
                  <div className="text-green-600 text-xs flex items-center justify-center mt-1">
                    <TrendingUp size={12} />
                    <span className="ml-1">
                      {Math.abs(
                        findChange(
                          transactionVolumeData?.thisWeekTransactions,
                          transactionVolumeData?.lastWeekTransactions
                        )
                      )}
                      %
                    </span>
                  </div>
                ) : (
                  <div className="text-red-600 text-xs flex items-center justify-center mt-1">
                    <TrendingDown size={12} />
                    <span className="ml-1">
                      {Math.abs(
                        findChange(
                          transactionVolumeData?.thisWeekTransactions,
                          transactionVolumeData?.lastWeekTransactions
                        )
                      )}
                      %
                    </span>
                  </div>
                )}
              </div>
              <div className="text-center border border-gray-200 bg-gray-50 shadow-lg hover:shadow-black/20 transition-all duration-300 shadow-black/10 rounded-lg p-4">
                <p className="text-gray-500 text-sm">This Month</p>
                <p className="font-semibold text-gray-800 text-lg">
                  ₹{transactionVolumeData?.thisMonthTransactions || "0"}
                </p>
                {findChange(
                  transactionVolumeData?.thisMonthTransactions,
                  transactionVolumeData?.lastMonthTransactions
                ) >= 0 ? (
                  <div className="text-green-600 text-xs flex items-center justify-center mt-1">
                    <TrendingUp size={12} />
                    <span className="ml-1">
                      {Math.abs(
                        findChange(
                          transactionVolumeData?.thisMonthTransactions,
                          transactionVolumeData?.lastMonthTransactions
                        )
                      )}
                      %
                    </span>
                  </div>
                ) : (
                  <div className="text-red-600 text-xs flex items-center justify-center mt-1">
                    <TrendingDown size={12} />
                    <span className="ml-1">
                      {Math.abs(
                        findChange(
                          transactionVolumeData?.thisMonthTransactions,
                          transactionVolumeData?.lastMonthTransactions
                        )
                      )}
                      %
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminOverview;

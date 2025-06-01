import React, { useEffect, useState } from "react";
import {
  DownloadCloud,
  Users,
  BadgeDollarSign,
  RefreshCw,
  TrendingUp,
  IndianRupee,
  Headset,
  UserCheck,
  User,
} from "lucide-react";
import Card from "../components/Card";
import Button from "../components/Button";
import { toast } from "react-toastify";
import axios from "axios";
import { BACKEND_URL } from "../utils/constants";
import capitalize from "../utils/capitalize";

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
  const [overviewCardData, setOverviewCardData] = useState({});
  const [recentActivityData, setRecentActivityData] = useState([]);
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
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center mt-2 justify-between">
        <h1 className="text-2xl font-bold text-gray-800">
          Admin Dashboard Overview
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard
          title="Profit Earned"
          value={`₹${overviewCardData?.totalBalance || "0"}`}
          icon={<IndianRupee size={20} />}
        />
        <StatCard
          title="Platform Balance"
          value={`₹${overviewCardData?.totalBalance || "0"}`}
          icon={<IndianRupee size={20} />}
        />
        <StatCard
          title="Active Agents"
          value={`${overviewCardData?.totalAgents || "0"}`}
          icon={<Users size={20} />}
        />
        <StatCard
          title="Active Users"
          value={`${overviewCardData?.totalUsers || "0"}`}
          icon={<Users size={20} />}
        />
        <StatCard
          title="Monthly Transactions"
          value={`${overviewCardData?.thisMonthTransactions || "0"}`}
          icon={<RefreshCw size={20} />}
        />
      </div>

      <div className="grid grid-cols-1 h-11/12 overflow-y-auto lg:grid-cols-2 gap-6">
        <Card className="mb-3 ml-1  " title="Recent Activity">
          <div className="space-y-4">
            {recentActivityData.map((activity) => (
              <div
                key={activity._id}
                className="flex items-start h-20 mb-1 pb-3 border-b border-gray-200 last:border-0 last:pb-0"
              >
                <div
                  className={`h-10 mt-3 w-10 rounded-full flex items-center justify-center text-black mr-4 bg-gray-200 ring-[1px] ring-gray-300 `}
                >
                  {activity.type == "User Created" ? (
                    <User size={18} />
                  ) : activity.type == "Agent Created" ? (
                    <UserCheck size={18} />
                  ) : (
                    <BadgeDollarSign size={18} />
                  )}
                </div>
                <div className="w-11/12">
                  <div className="font-medium flex items-center justify-between text-gray-800">
                    <p>
                      {activity.type == "User Created"
                        ? `User created with ID #${activity._id}`
                        : activity.type == "Agent Created"
                        ? `Agent created with ID #${activity._id}`
                        : `Transaction of ₹${activity.amount} completed by Agent`}
                    </p>
                    <div className="text-xs text-gray-500 mt-[1px] mr-1">
                      <p className="text-xs text-gray-500">
                        {new Date(
                          activity.createdAt || activity.transactionDate
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                        </p>
                      <p className="text-xs text-gray-500 ml-[23px]">
                        {new Date(
                          activity.createdAt || activity.transactionDate
                        ).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 ">
                    {activity.type == "User Created"
                      ? `Name : ${capitalize(activity.firstName)} ${capitalize(
                          activity.lastName
                        )}`
                      : activity.type == "Agent Created"
                      ? `Name : ${capitalize(activity.firstName)} ${capitalize(
                          activity.lastName
                        )}`
                      : `User : ${capitalize(
                          activity.user.firstName
                        )} ${capitalize(activity.user.lastName)} | #${
                          activity.user._id
                        } `}
                  </p>
                  <p className="text-xs text-gray-500 mt-0">
                    {activity.type == "User Created"
                      ? `Phone : ${activity.phone}`
                      : activity.type == "Agent Created"
                      ? `Phone : ${activity.phone}`
                      : `Agent : ${capitalize(
                          activity.agent.firstName
                        )} ${capitalize(activity.agent.lastName)} | ${
                          activity.agent._id
                        }`}
                  </p>
                  <p className="text-xs text-gray-500 mt-1"></p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="mb-3" title="Transaction Volume">
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-xl">
            <p className="text-gray-500 text-center">
              Transaction volume chart will appear here.
              <br />
              (Implemented with Chart.js in the analytics section)
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center">
              <p className="text-gray-500 text-sm">Today</p>
              <p className="font-semibold text-gray-800 text-lg">₹1,423,850</p>
              <div className="text-green-600 text-xs flex items-center justify-center mt-1">
                <TrendingUp size={12} />
                <span className="ml-1">8.2%</span>
              </div>
            </div>
            <div className="text-center">
              <p className="text-gray-500 text-sm">This Week</p>
              <p className="font-semibold text-gray-800 text-lg">₹8,432,190</p>
              <div className="text-green-600 text-xs flex items-center justify-center mt-1">
                <TrendingUp size={12} />
                <span className="ml-1">12.5%</span>
              </div>
            </div>
            <div className="text-center">
              <p className="text-gray-500 text-sm">This Month</p>
              <p className="font-semibold text-gray-800 text-lg">₹32,845,700</p>
              <div className="text-green-600 text-xs flex items-center justify-center mt-1">
                <TrendingUp size={12} />
                <span className="ml-1">15.8%</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminOverview;

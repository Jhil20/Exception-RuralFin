import React, { useEffect, useState } from "react";
import {
  DownloadCloud,
  Users,
  BadgeDollarSign,
  RefreshCw,
  TrendingUp,
} from "lucide-react";
import Card from "../components/Card";
import Button from "../components/Button";
import { toast } from "react-toastify";
import axios from "axios";
import { BACKEND_URL } from "../utils/constants";

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
  const getOverviewCardData=async()=>{
    try{
      const response=await axios.get(`${BACKEND_URL}/api/admin/OverviewCardData`);
      console.log("Overview Card Data:", response.data);
      setOverviewCardData(response.data.data);
    }catch(error){
      console.error("Error fetching overview card data:", error);
    }
  }

  useEffect(()=>{
    getOverviewCardData();
  },[])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">
          Admin Dashboard Overview
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Platform Balance"
          value={`₹${overviewCardData?.totalBalance || "0"}`}
          icon={<BadgeDollarSign size={20} />}
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
        <Card title="Recent Activity">
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="flex items-start border-b border-gray-100 pb-4 last:border-0 last:pb-0"
              >
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center text-black mr-4 bg-gray-200 ring-[1px] ring-gray-300 `}
                >
                  {index % 3 === 0 ? (
                    <Users size={18} />
                  ) : index % 3 === 1 ? (
                    <BadgeDollarSign size={18} />
                  ) : (
                    <RefreshCw size={18} />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-800">
                    {index % 3 === 0
                      ? "New user registered via Agent #123"
                      : index % 3 === 1
                      ? "Withdrawal request processed for ₹12,500"
                      : "Agent #456 completed 24 transactions today"}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {index === 0
                      ? "Just now"
                      : index === 1
                      ? "5 minutes ago"
                      : index === 2
                      ? "25 minutes ago"
                      : index === 3
                      ? "1 hour ago"
                      : "3 hours ago"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Transaction Volume">
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

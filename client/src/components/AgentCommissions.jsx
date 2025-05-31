import React, { useState } from "react";
import { Calendar, Download, Filter, Search, Award } from "lucide-react";
import Card from "../components/Card";
import Button from "../components/Button";
import { toast } from "react-toastify";

const AgentCommissions = () => {
  const [month, setMonth] = useState("2025-04");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("earned");
  const [sortOrder, setSortOrder] = useState("desc");

  const commissionData = [
    {
      id: 101,
      name: "Rahul Sharma",
      transactionCount: 245,
      commissionRate: 2.5,
      totalEarned: 24500,
      performance: "excellent",
    },
    {
      id: 102,
      name: "Priya Patel",
      transactionCount: 198,
      commissionRate: 2.5,
      totalEarned: 19800,
      performance: "good",
    },
    {
      id: 103,
      name: "Amit Kumar",
      transactionCount: 310,
      commissionRate: 2.0,
      totalEarned: 31000,
      performance: "excellent",
    },
    {
      id: 104,
      name: "Neha Singh",
      transactionCount: 145,
      commissionRate: 2.0,
      totalEarned: 14500,
      performance: "average",
    },
    {
      id: 105,
      name: "Vikram Malhotra",
      transactionCount: 95,
      commissionRate: 2.0,
      totalEarned: 9500,
      performance: "poor",
    },
    {
      id: 106,
      name: "Ananya Desai",
      transactionCount: 220,
      commissionRate: 2.5,
      totalEarned: 22000,
      performance: "good",
    },
    {
      id: 107,
      name: "Rajesh Verma",
      transactionCount: 178,
      commissionRate: 2.0,
      totalEarned: 17800,
      performance: "average",
    },
    {
      id: 108,
      name: "Sunita Gupta",
      transactionCount: 267,
      commissionRate: 2.5,
      totalEarned: 26700,
      performance: "excellent",
    },
    {
      id: 108,
      name: "Sunita Gupta",
      transactionCount: 267,
      commissionRate: 2.5,
      totalEarned: 26700,
      performance: "excellent",
    },
    {
      id: 108,
      name: "Sunita Gupta",
      transactionCount: 267,
      commissionRate: 2.5,
      totalEarned: 26700,
      performance: "excellent",
    },
    {
      id: 108,
      name: "Sunita Gupta",
      transactionCount: 267,
      commissionRate: 2.5,
      totalEarned: 26700,
      performance: "excellent",
    },
  ];

  const monthsMapping = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };

  const filteredAndSortedData = commissionData
    .filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toString().includes(searchTerm)
    )
    .sort((a, b) => {
      if (sortBy === "name") {
        return sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortBy === "count") {
        return sortOrder === "asc"
          ? a.transactionCount - b.transactionCount
          : b.transactionCount - a.transactionCount;
      } else {
        return sortOrder === "asc"
          ? a.totalEarned - b.totalEarned
          : b.totalEarned - a.totalEarned;
      }
    });

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  const getPerformanceBadge = (performance) => {
    switch (performance) {
      case "excellent":
        return (
          <span className="bg-blue-200 px-4 text-sm py-1 rounded-2xl border text-blue-950 border-blue-400 flex items-center">
            <Award size={12} className="mr-1" />
            Excellent
          </span>
        );
      case "good":
        return (
          <span className="bg-green-200 px-4 text-sm py-1 rounded-2xl border text-green-900 border-green-400 flex items-center">
            <Award size={12} className="mr-1" />
            Good
          </span>
        );
      case "average":
        return (
          <span className="bg-yellow-100 px-4 text-sm py-1 rounded-2xl border text-yellow-700 border-yellow-400 flex items-center">
            Average</span>
        );
      case "poor":
        return (
          <span className="bg-red-200 px-4 text-sm py-1 rounded-2xl border text-red-800 border-red-400 flex items-center">Poor</span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col space-y-8 h-full max-h-screen overflow-hidden">
      {/* Header + Filters + Summary */}
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        {/* Left section */}
        <div className="flex flex-col justify-between w-full md:w-2/3 space-y-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Agent Commissions & Rewards
            </h1>
          </div>

          {/* Search & Month Filter */}
          <div className="flex flex-col md:flex-row w-full items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search by agent name or ID..."
                className="w-full h-12 border-gray-300 rounded-xl hover:border-gray-400 focus:border-gray-400 transition-all duration-300 border-2 outline-0 pl-10 pr-4"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search
                size={18}
                className="absolute left-3 top-3.5 text-gray-400"
              />
            </div>

            <input
              type="month"
              className="h-12 px-3 py-2 border-2 hover:border-gray-400 text-gray-600 border-gray-300 rounded-xl outline-none ring-0 focus:border-gray-400 transition-all duration-300"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            />
          </div>
        </div>

        {/* Summary Cards */}
        <div className="w-full md:w-1/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Commission</p>
                <p className="text-2xl font-bold text-gray-900">₹165,800</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                <Award size={20} />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Average Commission</p>
                <p className="text-2xl font-bold text-gray-900">₹20,725</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full text-purple-600">
                <Award size={20} />
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Table Container */}
      <div className="flex-1 bg-gray-100 rounded-2xl overflow-hidden hover:shadow-gray-300 hover:shadow-lg transition-all duration-300">
        <div className="flex flex-col h-full bg-white rounded-xl border-2 border-gray-300">
          {/* Header Row */}
          <div className="grid grid-cols-6 p-3 justify-items-center bg-gray-200 text-sm font-semibold text-gray-700 text-center rounded-t-xl">
            <div>Agent ID</div>
            <div
            //   onClick={() => handleSort("name")}
              className=" flex items-center"
            >
              Name
              
            </div>
            <div
            //   onClick={() => handleSort("count")}
              className=" flex items-center"
            >
              Transactions
              
            </div>
            <div
            //   onClick={() => handleSort("earned")}
              className=" flex items-center"
            >
              Commission Earned in {monthsMapping[new Date().getMonth() + 1]}
              
            </div>
            <div>Total Commission</div>
            <div>Performance</div>
          </div>

          {/* Scrollable Rows */}
          <div className="flex-1 overflow-y-auto max-h-[calc(100vh-320px)]">
            {filteredAndSortedData.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-6 px-4 py-3 items-center text-center border-b border-gray-200 "
              >
                <div className="text-gray-700 pr-1">#{item.id}</div>
                <div className="font-medium text-gray-800 pl-2">{item.name}</div>
                <div className="text-gray-700 pl-3">{item.transactionCount}</div>
                <div className="text-gray-700 pl-4">{item.commissionRate}%</div>
                <div className="font-semibold text-gray-800 pl-8">
                  ₹{item.totalEarned.toLocaleString()}
                </div>
                <div className="flex justify-center pl-9">{getPerformanceBadge(item.performance)}</div>
              </div>
            ))}

            {filteredAndSortedData.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No commission data found matching your search criteria.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentCommissions;

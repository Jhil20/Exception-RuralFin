import React, { useEffect, useState } from "react";
import { Calendar, Download, Filter, Search, Award } from "lucide-react";
import Card from "../components/Card";
import Button from "../components/Button";
import { toast } from "react-toastify";
import axios from "axios";
import { BACKEND_URL } from "../utils/constants";
import capitalize from "../utils/capitalize";

const AgentCommissions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("earned");
  const [sortOrder, setSortOrder] = useState("desc");
  const [commissionData, setCommissionData] = useState([]);
  const [allAgents, setAllAgents] = useState([]);
  const [filteredAgents, setFilteredAgents] = useState([]);
  const [selectedMonthCommissions, setSelectedMonthCommissions] = useState({});
  const [transactionData, setTransactionData] = useState([]);
  const date = new Date();
  const formattedDate = `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}`;
  const [month, setMonth] = useState(formattedDate);

  // const commissionData = [
  //   {
  //     id: 101,
  //     name: "Rahul Sharma",
  //     transactionCount: 245,
  //     commissionRate: 2.5,
  //     totalEarned: 24500,
  //     performance: "excellent",
  //   },
  //   {
  //     id: 102,
  //     name: "Priya Patel",
  //     transactionCount: 198,
  //     commissionRate: 2.5,
  //     totalEarned: 19800,
  //     performance: "good",
  //   },
  //   {
  //     id: 103,
  //     name: "Amit Kumar",
  //     transactionCount: 310,
  //     commissionRate: 2.0,
  //     totalEarned: 31000,
  //     performance: "excellent",
  //   },
  //   {
  //     id: 104,
  //     name: "Neha Singh",
  //     transactionCount: 145,
  //     commissionRate: 2.0,
  //     totalEarned: 14500,
  //     performance: "average",
  //   },
  //   {
  //     id: 105,
  //     name: "Vikram Malhotra",
  //     transactionCount: 95,
  //     commissionRate: 2.0,
  //     totalEarned: 9500,
  //     performance: "poor",
  //   },
  //   {
  //     id: 106,
  //     name: "Ananya Desai",
  //     transactionCount: 220,
  //     commissionRate: 2.5,
  //     totalEarned: 22000,
  //     performance: "good",
  //   },
  //   {
  //     id: 107,
  //     name: "Rajesh Verma",
  //     transactionCount: 178,
  //     commissionRate: 2.0,
  //     totalEarned: 17800,
  //     performance: "average",
  //   },
  //   {
  //     id: 108,
  //     name: "Sunita Gupta",
  //     transactionCount: 267,
  //     commissionRate: 2.5,
  //     totalEarned: 26700,
  //     performance: "excellent",
  //   },
  //   {
  //     id: 1081,
  //     name: "Sunita Gupta",
  //     transactionCount: 267,
  //     commissionRate: 2.5,
  //     totalEarned: 26700,
  //     performance: "excellent",
  //   },
  //   {
  //     id: 1082,
  //     name: "Sunita Gupta",
  //     transactionCount: 267,
  //     commissionRate: 2.5,
  //     totalEarned: 26700,
  //     performance: "excellent",
  //   },
  //   {
  //     id: 1010,
  //     name: "Sunita Gupta",
  //     transactionCount: 267,
  //     commissionRate: 2.5,
  //     totalEarned: 26700,
  //     performance: "excellent",
  //   },
  // ];

  const monthsMapping = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    10: "October",
    11: "November",
    12: "December",
  };

  const alla = commissionData;
  // ?.filter(
  //   (item) =>
  //     item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     item.id.toString().includes(searchTerm)
  // )
  // .sort((a, b) => {
  //   if (sortBy === "name") {
  //     return sortOrder === "asc"
  //       ? a.name.localeCompare(b.name)
  //       : b.name.localeCompare(a.name);
  //   } else if (sortBy === "count") {
  //     return sortOrder === "asc"
  //       ? a.transactionCount - b.transactionCount
  //       : b.transactionCount - a.transactionCount;
  //   } else {
  //     return sortOrder === "asc"
  //       ? a.totalEarned - b.totalEarned
  //       : b.totalEarned - a.totalEarned;
  //   }
  // });

  const getCommissions = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/admin/commssionData`
      );
      console.log("response commission data", response);
      setCommissionData(response?.data?.data || {});
      handleMonthChange(formattedDate, response?.data?.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getAllAgents = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/agent/`);
      console.log("response all agents", response);
      setAllAgents(response?.data?.agents || []);
      setFilteredAgents(response?.data?.agents || []);
    } catch (err) {
      console.error("Error fetching agents:", err);
    }
  };

  const handleMonthChange = (selectedMonth, data = commissionData) => {
    const selectedMonthCommissions = data?.AllCommissions?.filter((item) => {
      const itemMonth = String(item?.month).padStart(2, "0");
      const itemYear = item?.year;
      return `${itemYear}-${itemMonth}` === selectedMonth;
    });

    const totalCommission = selectedMonthCommissions?.reduce(
      (acc, item) => acc + item?.totalCommissionEarned,
      0
    );

    const averageCommission =
      selectedMonthCommissions?.length > 0
        ? totalCommission / selectedMonthCommissions.length
        : 0;

    setSelectedMonthCommissions({
      totalCommission: totalCommission?.toLocaleString(),
      averageCommission: averageCommission?.toLocaleString(),
    });
  };

  const getTransactionData = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/agentToUserTransaction/getAllTransactions`
      );
      console.log("response transaction data user to agent", response);
      setTransactionData(response?.data?.data || []);
    } catch (err) {
      console.error("Error fetching transaction data:", err);
    }
  };

  useEffect(() => {
    getCommissions();
    getAllAgents();
    getTransactionData();
    handleMonthChange(formattedDate);
  }, []);

  return (
    <div className="flex flex-col  space-y-8 p-3 h-full max-h-screen overflow-hidden">
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
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  const filtered = allAgents.filter((agent) => {
                    const fullName =
                      `${agent.firstName} ${agent.lastName}`.toLowerCase();
                    return (
                      fullName.includes(e.target.value.toLowerCase()) ||
                      agent._id.toString().includes(e.target.value)
                    );
                  });
                  setFilteredAgents(filtered);
                  console.log("Filtered Agents:", filtered);
                }}
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
              max={new Date().toISOString().slice(0, 7)}
              onChange={(e) => {
                setMonth(e.target.value);
                // console.log(e.target.value);
                handleMonthChange(e.target.value);
              }}
            />
          </div>
        </div>

        {/* Summary Cards */}
        <div className="w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Commission</p>
                <p className="text-2xl font-bold text-gray-900">
                  ₹{commissionData?.totalCommission}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                <Award size={20} />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Commission <br />
                  <span>in {monthsMapping[month.split("-")[1]]}</span>
                </p>

                <p className="text-2xl font-bold text-gray-900">
                  ₹{selectedMonthCommissions?.totalCommission}
                </p>
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
                <p className="text-2xl font-bold text-gray-900">
                  ₹{selectedMonthCommissions?.averageCommission}
                </p>
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
          <div className="grid grid-cols-5 p-3 justify-items-center bg-gray-200 text-sm font-semibold text-gray-700 text-center rounded-t-xl">
            <div>Agent ID</div>
            <div
              //   onClick={() => handleSort("name")}
              className=" flex items-center"
            >
              Name
            </div>
            <div
              //   onClick={() => handleSort("count")}
              className="pl-2 flex items-center"
            >
              Transactions
            </div>

            <div>Total Agent Commission</div>
            <div>Total Commission</div>
          </div>

          {/* Scrollable Rows */}
          <div className="flex-1 overflow-y-auto max-h-[calc(100vh-320px)]">
            {filteredAgents.map((agent) => (
              <div
                key={agent?._id}
                className="grid grid-cols-5 px-4 py-3 items-center text-center border-b border-gray-200 "
              >
                <div className="text-gray-700 pr-1">#{agent?._id}</div>
                <div className="font-medium text-gray-800 pl-2">
                  {capitalize(agent?.firstName) +
                    " " +
                    capitalize(agent?.lastName)}
                </div>
                <div className="text-gray-700 pl-3">
                  {transactionData?.filter((tr) => {
                    if (
                      tr.agentId._id == agent._id &&
                      new Date(tr.transactionDate).getMonth() + 1 ==
                        month.split("-")[1]
                    ) {
                      return tr;
                    }
                  }).length || 0}
                </div>

                <div className="flex justify-center ">
                  ₹
                  {transactionData
                    ?.filter((tr) => {
                      if (
                        tr.agentId._id == agent._id &&
                        new Date(tr.transactionDate).getMonth() + 1 ==
                          month.split("-")[1]
                      ) {
                        return tr;
                      }
                    })
                    .reduce((acc, item) => acc + item?.commission, 0) / 2 || 0}
                </div>
                <div className="font-semibold text-gray-800 flex justify-center pl-3">
                  ₹
                  {transactionData
                    ?.filter((tr) => {
                      if (
                        tr.agentId._id == agent._id &&
                        new Date(tr.transactionDate).getMonth() + 1 ==
                          month.split("-")[1]
                      ) {
                        return tr;
                      }
                    })
                    .reduce((acc, item) => acc + item?.commission, 0) || 0}
                </div>
              </div>
            ))}

            {filteredAgents.length === 0 && (
              <div className="h-full flex items-center w-full justify-center text-center py-8 text-gray-500">
                No Agent commission data found matching your search criteria.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentCommissions;

import React, { useState } from 'react';
import { IndianRupee, Users, Clock, CheckCircle, XCircle, Bell, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const Dashboard = () => {
  const [transactions] = useState([
    { 
      id: '1', 
      amount: 1000, 
      user: 'John Doe', 
      status: 'pending', 
      type: 'deposit',
      timestamp: '2025-04-20T10:25:00'
    },
    { 
      id: '2', 
      amount: 1500, 
      user: 'Jane Smith', 
      status: 'pending', 
      type: 'withdrawal',
      timestamp: '2025-04-20T10:15:00'
    }
  ]);

  const stats = {
    availableBalance: 7500,
    todaysTransactions: 24,
    commissionEarned: 450,
    securityBond: 10000,
    bondCompletion: 35,
    bondStartDate: '2024-10-15',
    bondEndDate: '2025-04-15'
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const calculateDaysRemaining = () => {
    const endDate = new Date(stats.bondEndDate);
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-black text-white">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold">Agent Dashboard</h1>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 hover:bg-gray-800 rounded-full">
                <Bell size={20} />
                <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
                  2
                </span>
              </button>
              <button className="bg-white text-black px-4 py-2 rounded-md font-medium">
                New Transaction
              </button>
            </div>
          </div>

          {/* Quick stats bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-3 px-4 bg-gray-900 rounded-lg">
            <div>
              <p className="text-gray-400 text-sm">Available Balance</p>
              <p className="text-lg font-semibold">₹{stats.availableBalance.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Today's Transactions</p>
              <p className="text-lg font-semibold">{stats.todaysTransactions}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Commission Earned</p>
              <p className="text-lg font-semibold">₹{stats.commissionEarned.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Bond Status</p>
              <p className="text-lg font-semibold text-yellow-400">{stats.bondCompletion}% Complete</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 space-y-6">
        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600">Available Balance</p>
                <p className="text-2xl font-bold mt-1">₹{stats.availableBalance.toLocaleString()}</p>
              </div>
              <div className="p-2 rounded-md bg-gray-100">
                <Wallet size={20} className="text-gray-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <ArrowUpRight size={16} className="text-green-600 mr-1" />
              <span className="text-sm text-green-600">+₹2,500 from last week</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600">Commission Earned</p>
                <p className="text-2xl font-bold mt-1">₹{stats.commissionEarned.toLocaleString()}</p>
              </div>
              <div className="p-2 rounded-md bg-gray-100">
                <IndianRupee size={20} className="text-gray-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <ArrowUpRight size={16} className="text-green-600 mr-1" />
              <span className="text-sm text-green-600">+₹150 today</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-600">Security Bond</p>
                <p className="text-2xl font-bold mt-1">₹{stats.securityBond.toLocaleString()}</p>
              </div>
              <div className="p-2 rounded-md bg-gray-100">
                <Clock size={20} className="text-gray-600" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-black rounded-full h-2 transition-all duration-500"
                  style={{ width: `${stats.bondCompletion}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>{stats.bondCompletion}% Complete</span>
                <span>{calculateDaysRemaining()} days remaining</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Transactions */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Pending Requests</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {transactions.map(transaction => (
              <div key={transaction.id} className="p-4">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <p className="font-medium">Request #{transaction.id}</p>
                      <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                        transaction.type === 'deposit' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                      </span>
                    </div>
                    <p className="text-gray-600">Amount: ₹{transaction.amount.toLocaleString()}</p>
                    <p className="text-gray-600">User: {transaction.user}</p>
                    <p className="text-gray-500 text-sm">{formatDate(transaction.timestamp)}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="flex items-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800">
                      <CheckCircle size={16} className="mr-2" />
                      Accept
                    </button>
                    <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                      <XCircle size={16} className="mr-2" />
                      Decline
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {transactions.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No pending transactions
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

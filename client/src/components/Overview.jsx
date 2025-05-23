import React, { useState } from 'react';
import {
  Banknote,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Wallet,
  TrendingUp,
} from 'lucide-react';
import TransactionChart from './TransactionChart';

const Overview = ({ agentData }) => {
  const currentDate = new Date();
  const endDate = new Date(agentData.bondEndDate);
  const daysRemaining = Math.ceil((endDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Available Balance" 
          value={`₹${agentData.balance.toLocaleString()}`}
          icon={<Wallet className="text-blue-600" size={20} />}
          change={"+5.2%"} 
          isPositive={true} 
        />
        <MetricCard 
          title="Security Deposit" 
          value={`₹${agentData.securityDeposit.toLocaleString()}`}
          icon={<Banknote className="text-green-600" size={20} />}
          change={"Locked"} 
          isPositive={false} 
          hideArrow={true}
        />
        <MetricCard 
          title="Total Customers" 
          value={agentData.activeUsers.toString()}
          icon={<Users className="text-purple-600" size={20} />}
          change={"+2"} 
          isPositive={true} 
        />
        <MetricCard 
          title="Commission Earned" 
          value={`₹${agentData.commissionEarned.toLocaleString()}`}
          icon={<TrendingUp className="text-yellow-600" size={20} />}
          change={"+₹450"} 
          isPositive={true} 
        />
      </div>

      {/* Bond Status and Transaction Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6 lg:col-span-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Security Bond Status</h2>
            <Calendar size={18} className="text-gray-500" />
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Completion</span>
              <span className="font-medium">{agentData.bondCompletionPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-black rounded-full h-2" 
                style={{ width: `${agentData.bondCompletionPercentage}%` }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div>
              <p className="text-gray-600">Start Date</p>
              <p className="font-medium">{new Date(agentData.bondStartDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-gray-600">End Date</p>
              <p className="font-medium">{new Date(agentData.bondEndDate).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-md">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                <Calendar size={20} className="text-yellow-700" />
              </div>
              <div>
                <p className="font-medium">Bond Period Remaining</p>
                <p className="text-gray-600 text-sm">{daysRemaining} days until maturity</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Transaction Activity</h2>
            <div>
              <select className="text-sm border border-gray-300 rounded-md px-2 py-1">
                <option value="7days">Last 7 days</option>
                <option value="30days">Last 30 days</option>
                <option value="3months">Last 3 months</option>
              </select>
            </div>
          </div>

          <TransactionChart />

          <div className="grid grid-cols-2 mt-4 text-sm">
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-black mr-2"></div>
              <span>Deposits</span>
            </div>
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-gray-400 mr-2"></div>
              <span>Withdrawals</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700">
              <tr>
                <th className="px-6 py-3 text-left">User</th>
                <th className="px-6 py-3 text-left">Transaction ID</th>
                <th className="px-6 py-3 text-left">Type</th>
                <th className="px-6 py-3 text-left">Amount</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { user: "Priya Verma", id: "TXN48392", type: "Deposit", amount: 2000, status: "Completed", date: "Today, 10:25 AM" },
                { user: "Raj Kumar", id: "TXN48391", type: "Withdrawal", amount: 1500, status: "Completed", date: "Today, 9:15 AM" },
                { user: "Sita Devi", id: "TXN48390", type: "Deposit", amount: 3000, status: "Completed", date: "Yesterday, 4:30 PM" },
                { user: "Anil Singh", id: "TXN48389", type: "Withdrawal", amount: 500, status: "Completed", date: "Yesterday, 2:45 PM" },
              ].map((transaction, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{transaction.user}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{transaction.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      transaction.type === 'Deposit' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {transaction.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">₹{transaction.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{transaction.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 text-right">
          <button className="text-sm font-medium text-black hover:underline">View all transactions</button>
        </div>
      </div>
    </div>
  );
};

// Metric Card Component
const MetricCard = ({ title, value, icon, change, isPositive, hideArrow = false }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 transition-transform hover:scale-[1.02] duration-300">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-600 text-sm">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className="p-2 rounded-md bg-gray-100">{icon}</div>
      </div>
      <div className="mt-4 flex items-center">
        {!hideArrow && (
          isPositive ? 
            <ArrowUpRight size={16} className="text-green-600 mr-1" /> : 
            <ArrowDownRight size={16} className="text-red-600 mr-1" />
        )}
        <span className={`text-sm ${hideArrow ? 'text-gray-600' : (isPositive ? 'text-green-600' : 'text-red-600')}`}>
          {change} {hideArrow ? '' : 'from last week'}
        </span>
      </div>
    </div>
  );
};

export default Overview;

import React, { useState } from 'react';
import { Search, Filter, ArrowDownCircle, ArrowUpCircle, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

const Transactions = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const transactions = [
    { id: "TXN48392", user: "Priya Verma", userId: "U5632", type: "deposit", amount: 2000, status: "completed", date: "2025-04-20T10:25:00", commission: 30 },
    { id: "TXN48391", user: "Raj Kumar", userId: "U4523", type: "withdrawal", amount: 1500, status: "completed", date: "2025-04-20T09:15:00", commission: 22.5 },
    { id: "TXN48390", user: "Sita Devi", userId: "U3214", type: "deposit", amount: 3000, status: "completed", date: "2025-04-19T16:30:00", commission: 45 },
    { id: "TXN48389", user: "Anil Singh", userId: "U8976", type: "withdrawal", amount: 500, status: "completed", date: "2025-04-19T14:45:00", commission: 7.5 },
    { id: "TXN48388", user: "Manish Patel", userId: "U7654", type: "deposit", amount: 1000, status: "pending", date: "2025-04-19T11:20:00", commission: 15 },
    { id: "TXN48387", user: "Geeta Sharma", userId: "U4321", type: "withdrawal", amount: 2500, status: "failed", date: "2025-04-18T13:10:00", commission: 0 },
    { id: "TXN48386", user: "Vikram Gupta", userId: "U3456", type: "deposit", amount: 5000, status: "completed", date: "2025-04-18T10:05:00", commission: 75 },
    { id: "TXN48385", user: "Ananya Roy", userId: "U6789", type: "withdrawal", amount: 1200, status: "completed", date: "2025-04-17T16:45:00", commission: 18 },
  ];

  const filteredTransactions = transactions.filter((transaction) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'deposits') return transaction.type === 'deposit';
    if (activeTab === 'withdrawals') return transaction.type === 'withdrawal';
    if (activeTab === 'pending') return transaction.status === 'pending';
    return true;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={16} className="text-green-600" />;
      case 'pending':
        return <Clock size={16} className="text-yellow-600" />;
      case 'failed':
        return <AlertTriangle size={16} className="text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
        <h1 className="text-2xl font-bold text-gray-900">Transaction History</h1>
        <div className="flex space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search transactions..."
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-900 text-sm w-full"
            />
            <Search size={18} className="absolute left-3 top-2.5 text-gray-500" />
          </div>
          <button
            className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={20} className="text-gray-700" />
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="bg-gray-50 p-4 rounded-md border border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
            <select className="w-full border border-gray-300 rounded-md p-2 text-sm">
              <option>Today</option>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Custom range</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount Range</label>
            <div className="flex space-x-2">
              <input type="number" placeholder="Min" className="w-full border border-gray-300 rounded-md p-2 text-sm" />
              <input type="number" placeholder="Max" className="w-full border border-gray-300 rounded-md p-2 text-sm" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select className="w-full border border-gray-300 rounded-md p-2 text-sm">
              <option>All</option>
              <option>Completed</option>
              <option>Pending</option>
              <option>Failed</option>
            </select>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px space-x-8">
          {[
            ['all', 'All Transactions'],
            ['deposits', <><ArrowDownCircle size={16} className="mr-2" />Deposits</>],
            ['withdrawals', <><ArrowUpCircle size={16} className="mr-2" />Withdrawals</>],
            ['pending', <><Clock size={16} className="mr-2" />Pending</>]
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap flex items-center ${
                activeTab === key
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700">
              <tr>
                <th className="px-6 py-3 text-left">Transaction ID</th>
                <th className="px-6 py-3 text-left">User</th>
                <th className="px-6 py-3 text-left">Type</th>
                <th className="px-6 py-3 text-left">Amount</th>
                <th className="px-6 py-3 text-left">Commission</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Date & Time</th>
                <th className="px-6 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{transaction.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div>
                      <p className="font-medium">{transaction.user}</p>
                      <p className="text-gray-500 text-xs">ID: {transaction.userId}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      transaction.type === 'deposit'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {transaction.type === 'deposit' ? (
                        <ArrowDownCircle size={12} className="mr-1" />
                      ) : (
                        <ArrowUpCircle size={12} className="mr-1" />
                      )}
                      {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">₹{transaction.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">₹{transaction.commission.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(transaction.status)}`}>
                      {getStatusIcon(transaction.status)}
                      <span className="ml-1">{transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{formatDate(transaction.date)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-black hover:text-gray-700 font-medium">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">8</span> of <span className="font-medium">24</span> results
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50 disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;

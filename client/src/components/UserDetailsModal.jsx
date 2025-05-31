import React from 'react';
import { Phone, Mail, Calendar, Wallet, Clock, Award, BarChart3 } from 'lucide-react';
import Modal from '../components/Modal';
import Button from '../components/Button';
import Card from '../components/Card';
import { toast } from 'react-toastify';

const UserDetailsModal = ({ isOpen, onClose, user }) => {
  const transactions = [
    { id: 1, date: '2025-04-10', type: 'deposit', amount: 5000, agent: 'Agent #123' },
    { id: 2, date: '2025-04-09', type: 'withdrawal', amount: 2000, agent: 'Agent #456' },
    { id: 3, date: '2025-04-08', type: 'deposit', amount: 3000, agent: 'Agent #123' },
    { id: 4, date: '2025-04-07', type: 'deposit', amount: 1500, agent: 'Agent #789' },
    { id: 5, date: '2025-04-06', type: 'withdrawal', amount: 1000, agent: 'Agent #456' },
  ];

  const handleSuspendUser = () => {
    toast.success(`User #${user.id} has been suspended`);
    onClose();
  };

  const handleResetPassword = () => {
    toast.info(`Password reset link sent to user #${user.id}`);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`User Details: ${user.name}`} size="lg">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card className="h-full">
              <div className="flex flex-col items-center">
                <div className="h-20 w-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold mb-4">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>

                <h3 className="text-xl font-semibold text-gray-800">{user.name}</h3>
                <p className="text-gray-500 mb-1">User #{user.id}</p>
                <p className="text-gray-500 mb-4">ID: {user.ruralFinID}</p>

                <div className={`badge ${
                  user.status === 'active' ? 'badge-success' :
                  user.status === 'inactive' ? 'badge-danger' : 'badge-warning'
                } mb-6`}>
                  {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                </div>

                <div className="w-full space-y-4">
                  <div className="flex items-center">
                    <Phone size={16} className="text-gray-500 mr-3" />
                    <span className="text-gray-700">+91 98765 43210</span>
                  </div>
                  <div className="flex items-center">
                    <Mail size={16} className="text-gray-500 mr-3" />
                    <span className="text-gray-700">user{user.id}@example.com</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar size={16} className="text-gray-500 mr-3" />
                    <span className="text-gray-700">Joined: {user.registrationDate}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="text-gray-500 mr-3" />
                    <span className="text-gray-700">Last active: {user.lastActivity}</span>
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
                    <p className="text-gray-500 text-sm">Wallet Balance</p>
                    <p className="text-2xl font-bold text-gray-800">₹{user.walletBalance.toLocaleString()}</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                    <Wallet size={20} />
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Savings Goal</p>
                    <p className="text-2xl font-bold text-gray-800">₹{user.savingsGoal.toLocaleString()}</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-lg text-green-600">
                    <Award size={20} />
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Total Transactions</p>
                    <p className="text-2xl font-bold text-gray-800">{user.totalTransactions}</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-lg text-purple-600">
                    <BarChart3 size={20} />
                  </div>
                </div>
              </Card>
            </div>

            <ul className="flex space-x-1 border-b border-gray-200">
              <li className="px-4 py-2 font-medium text-blue-600 border-b-2 border-blue-600">
                Transactions
              </li>
              <li className="px-4 py-2 font-medium text-gray-500 hover:text-gray-800 cursor-pointer">
                Budget
              </li>
              <li className="px-4 py-2 font-medium text-gray-500 hover:text-gray-800 cursor-pointer">
                Financial Literacy
              </li>
            </ul>

            <div>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <th className="px-4 py-3">Date</th>
                      <th className="px-4 py-3">Type</th>
                      <th className="px-4 py-3">Amount</th>
                      <th className="px-4 py-3">Agent</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {transactions.map((transaction) => (
                      <tr key={transaction.id}>
                        <td className="px-4 py-3 whitespace-nowrap">{transaction.date}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className={`badge ${
                            transaction.type === 'deposit' ? 'badge-success' : 'badge-info'
                          }`}>
                            {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap font-medium">
                          ₹{transaction.amount.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">{transaction.agent}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 text-center">
                <Button variant="outline" size="sm" leftIcon={<BarChart3 size={16} />}>
                  View All Transactions
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-end space-x-0 space-y-3 sm:space-x-3 sm:space-y-0">
          <Button variant="outline" onClick={handleResetPassword}>Reset Password</Button>
          <Button variant="danger" onClick={handleSuspendUser}>Suspend User</Button>
          <Button variant="primary" onClick={onClose}>Close</Button>
        </div>
      </div>
    </Modal>
  );
};

export default UserDetailsModal;

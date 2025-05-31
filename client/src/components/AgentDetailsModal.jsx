import React from 'react';
import { Phone, Mail, MapPin, Calendar, BadgeDollarSign, Clock, BarChart3 } from 'lucide-react';
import Modal from '../components/Modal';
import Button from '../components/Button';
import Card from '../components/Card';
import { toast } from 'react-toastify';

const AgentDetailsModal = ({ isOpen, onClose, agent }) => {
  const transactions = [
    { id: 1, date: '2025-04-10', type: 'deposit', amount: 15000, user: 'User #1045' },
    { id: 2, date: '2025-04-09', type: 'withdrawal', amount: 7500, user: 'User #987' },
    { id: 3, date: '2025-04-08', type: 'deposit', amount: 12000, user: 'User #765' },
    { id: 4, date: '2025-04-07', type: 'deposit', amount: 5000, user: 'User #432' },
    { id: 5, date: '2025-04-06', type: 'withdrawal', amount: 8000, user: 'User #321' },
  ];

  const handleDeactivateAgent = () => {
    toast.success(`Agent #${agent.id} has been deactivated`);
    onClose();
  };

  const handleResetPassword = () => {
    toast.info(`Password reset link sent to agent #${agent.id}`);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Agent Details: ${agent.name}`} size="lg">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card className="h-full">
              <div className="flex flex-col items-center">
                <div className="h-20 w-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold mb-4">
                  {agent.name.split(' ').map(n => n[0]).join('')}
                </div>

                <h3 className="text-xl font-semibold text-gray-800">{agent.name}</h3>
                <p className="text-gray-500 mb-4">Agent #{agent.id}</p>

                <div className={`badge ${
                  agent.status === 'active' ? 'badge-success' :
                  agent.status === 'inactive' ? 'badge-danger' : 'badge-warning'
                } mb-6`}>
                  {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
                </div>

                <div className="w-full space-y-4">
                  <div className="flex items-center">
                    <Phone size={16} className="text-gray-500 mr-3" />
                    <span className="text-gray-700">{agent.contact}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail size={16} className="text-gray-500 mr-3" />
                    <span className="text-gray-700">agent{agent.id}@example.com</span>
                  </div>
                  <div className="flex items-start">
                    <MapPin size={16} className="text-gray-500 mr-3 mt-1" />
                    <span className="text-gray-700">{agent.address}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar size={16} className="text-gray-500 mr-3" />
                    <span className="text-gray-700">Joined: {agent.joinDate}</span>
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
                    <p className="text-2xl font-bold text-gray-800">₹{agent.balance.toLocaleString()}</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                    <BadgeDollarSign size={20} />
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Security Deposit</p>
                    <p className="text-2xl font-bold text-gray-800">₹{agent.securityDeposit.toLocaleString()}</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-lg text-green-600">
                    <BadgeDollarSign size={20} />
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Bond Expires</p>
                    <p className="text-2xl font-bold text-gray-800">{agent.bondExpiryDate}</p>
                  </div>
                  <div className="p-3 bg-yellow-100 rounded-lg text-yellow-600">
                    <Clock size={20} />
                  </div>
                </div>
              </Card>
            </div>

            <Card title="Transaction History">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <th className="px-4 py-3">Date</th>
                      <th className="px-4 py-3">Type</th>
                      <th className="px-4 py-3">Amount</th>
                      <th className="px-4 py-3">User</th>
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
                        <td className="px-4 py-3 whitespace-nowrap">{transaction.user}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 text-center">
                <Button 
                  variant="outline" 
                  size="sm"
                  leftIcon={<BarChart3 size={16} />}
                >
                  View Full Transaction History
                </Button>
              </div>
            </Card>
          </div>
        </div>

        <div className="flex flex-wrap justify-end space-x-0 space-y-3 sm:space-x-3 sm:space-y-0">
          <Button variant="outline" onClick={handleResetPassword}>Reset Password</Button>
          <Button variant="danger" onClick={handleDeactivateAgent}>Deactivate Agent</Button>
          <Button variant="primary" onClick={onClose}>Close</Button>
        </div>
      </div>
    </Modal>
  );
};

export default AgentDetailsModal;

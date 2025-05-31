import React from 'react';
import {
  AlertTriangle,
  User,
  Clock,
  MapPin,
  Calendar,
  DollarSign,
} from 'lucide-react';
import Modal from '../components/Modal';
import Button from '../components/Button';
import Card from '../components/Card';
import { toast } from 'react-toastify';

const FraudDetailsModal = ({ isOpen, onClose, alert }) => {
  const handleResolve = () => {
    toast.success(`Alert #${alert.id} has been resolved!`);
    onClose();
  };

  const handleConfirmFraud = () => {
    toast.error(`Alert #${alert.id} has been confirmed as fraud!`);
    onClose();
  };

  const handleBlockUser = () => {
    toast.warning(`User #${alert.userId} has been blocked!`);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Fraud Alert Details: #${alert.id}`}
      size="lg"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <Card className="bg-red-50 border border-red-200">
            <div className="flex items-start">
              <div className="p-3 bg-red-100 rounded-lg text-red-600 mr-4">
                <AlertTriangle size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-red-800">
                  {alert.reason}
                </h3>
                <p className="text-red-700 mt-1">
                  This transaction was flagged as potentially fraudulent with a
                  <span
                    className={`font-semibold ${
                      alert.riskLevel === 'high'
                        ? 'text-red-700'
                        : alert.riskLevel === 'medium'
                        ? 'text-yellow-700'
                        : 'text-green-700'
                    }`}
                  >
                    {' '}
                    {alert.riskLevel.toUpperCase()}{' '}
                  </span>
                  risk level.
                </p>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Transaction Details
              </h3>

              <div className="space-y-4">
                <div className="flex items-center">
                  <DollarSign size={18} className="text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Amount</p>
                    <p className="text-lg font-semibold text-gray-800">
                      ₹{alert.amount.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Clock size={18} className="text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Timestamp</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {alert.timestamp}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Calendar size={18} className="text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Transaction ID</p>
                    <p className="text-lg font-semibold text-gray-800">
                      #{alert.transactionId}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <MapPin size={18} className="text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="text-lg font-semibold text-gray-800">
                      Mumbai, Maharashtra
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                User Information
              </h3>

              <div className="space-y-4">
                <div className="flex items-center">
                  <User size={18} className="text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">User</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {alert.userName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <User size={18} className="text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">User ID</p>
                    <p className="text-lg font-semibold text-gray-800">
                      #{alert.userId}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Clock size={18} className="text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Account Age</p>
                    <p className="text-lg font-semibold text-gray-800">
                      2 years, 3 months
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <AlertTriangle size={18} className="text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Previous Flags</p>
                    <p className="text-lg font-semibold text-gray-800">
                      2 instances
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <Card>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Alert History
            </h3>

            <div className="space-y-4">
              <div className="flex">
                <div className="flex flex-col items-center mr-4">
                  <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    <AlertTriangle size={16} />
                  </div>
                  <div className="flex-1 w-px bg-gray-300 my-2"></div>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Alert Generated</p>
                  <p className="text-sm text-gray-500">
                    System flagged transaction as potentially fraudulent
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    {alert.timestamp}
                  </p>
                </div>
              </div>

              {(alert.status === 'investigating' ||
                alert.status === 'resolved' ||
                alert.status === 'confirmed') && (
                <div className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div className="h-8 w-8 rounded-full bg-yellow-500 flex items-center justify-center text-white">
                      <User size={16} />
                    </div>
                    <div className="flex-1 w-px bg-gray-300 my-2"></div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      Investigation Started
                    </p>
                    <p className="text-sm text-gray-500">
                      Admin user initiated investigation
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      2025-04-12 11:30:45
                    </p>
                  </div>
                </div>
              )}

              {(alert.status === 'resolved' ||
                alert.status === 'confirmed') && (
                <div className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div
                      className={`h-8 w-8 rounded-full ${
                        alert.status === 'resolved'
                          ? 'bg-green-500'
                          : 'bg-red-500'
                      } flex items-center justify-center text-white`}
                    >
                      {alert.status === 'resolved' ? (
                        <Clock size={16} />
                      ) : (
                        <AlertTriangle size={16} />
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      {alert.status === 'resolved'
                        ? 'Alert Resolved'
                        : 'Fraud Confirmed'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {alert.status === 'resolved'
                        ? 'Transaction verified as legitimate'
                        : 'Transaction confirmed as fraudulent and reversed'}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      2025-04-12 14:15:22
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        <div className="flex flex-wrap justify-end space-x-0 space-y-3 sm:space-x-3 sm:space-y-0">
          <Button variant="outline" onClick={handleBlockUser}>
            Block User
          </Button>

          {(alert.status === 'flagged' || alert.status === 'investigating') && (
            <>
              <Button variant="success" onClick={handleResolve}>
                Mark as Resolved
              </Button>
              <Button variant="danger" onClick={handleConfirmFraud}>
                Confirm Fraud
              </Button>
            </>
          )}

          <Button variant="primary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default FraudDetailsModal;

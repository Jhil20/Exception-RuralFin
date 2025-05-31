import { useState } from "react";
import {
  Search,
  Filter,
  AlertTriangle,
  CheckCircle,
  Shield,
  Eye,
} from "lucide-react";
import Card from "../components/Card";
import Button from "../components/Button";
import { toast } from "react-toastify";
import FraudDetailsModal from "./FraudDetailsModal";

const FraudDetection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentFilter, setCurrentFilter] = useState("all");
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fraudAlerts = [
    {
      id: 5001,
      transactionId: 12345,
      userId: 1234,
      userName: "Rahul Sharma",
      amount: 25000,
      timestamp: "2025-04-12 09:30:45",
      reason: "Unusual large transaction",
      riskLevel: "medium",
      status: "flagged",
    },
    // ...other alerts
  ];

  const filteredAlerts = fraudAlerts.filter(
    (alert) =>
      (alert.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alert.id.toString().includes(searchTerm) ||
        alert.transactionId.toString().includes(searchTerm)) &&
      (currentFilter === "all" || alert.status === currentFilter)
  );

  const handleMarkAsSafe = (id) => {
    toast.success(`Alert #${id} has been marked as safe!`);
  };

  const handleInvestigate = (id) => {
    toast.info(`Alert #${id} has been marked for investigation!`);
  };

  const handleViewDetails = (alert) => {
    setSelectedAlert(alert);
    setIsModalOpen(true);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "flagged":
        return (
          <span className="flex items-center justify-center text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full text-sm font-medium">
            <AlertTriangle size={12} className="mr-1" /> Flagged
          </span>
        );
      case "investigating":
        return (
          <span className="flex items-center justify-center text-blue-700 bg-blue-100 px-2 py-1 rounded-full text-sm font-medium">
            <Eye size={12} className="mr-1" /> Investigating
          </span>
        );
      case "resolved":
        return (
          <span className="flex items-center justify-center text-green-700 bg-green-100 px-2 py-1 rounded-full text-sm font-medium">
            <CheckCircle size={12} className="mr-1" /> Resolved
          </span>
        );
      case "confirmed":
        return (
          <span className="flex items-center justify-center text-red-700 bg-red-100 px-2 py-1 rounded-full text-sm font-medium">
            <AlertTriangle size={12} className="mr-1" /> Fraud Confirmed
          </span>
        );
      default:
        return null;
    }
  };

  const getRiskBadge = (risk) => {
    switch (risk) {
      case "low":
        return <span className="text-green-600">Low</span>;
      case "medium":
        return <span className="text-yellow-600">Medium</span>;
      case "high":
        return <span className="text-red-600">High</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 h-9/12">
      <div className="flex h-fit items-center gap-4 mb-7">
        <div className="flex items-start w-7/12 flex-wrap">
          <div className="flex flex-row mb-4 w-full items-center justify-between gap-4">
            <h1 className="text-2xl font-bold text-gray-800">
              Fraud Detection & Alerts
            </h1>
          </div>
          <div className="relative w-full bg-white h-14 rounded-xl flex-1">
            <input
              type="text"
              placeholder="Search by user name, alert ID or transaction ID..."
              className="w-full h-full border-gray-300 rounded-xl hover:border-gray-400 focus:border-gray-400 transition-all duration-300 border-2 outline-0 py-2 pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search
              size={18}
              className="absolute left-[14px] mt-1 top-4 text-gray-400"
            />
          </div>
        </div>
        <div className="grid w-5/12 mt-1 grid-cols-2 gap-6">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Active Alerts</p>
                <p className="text-2xl font-bold text-gray-800">4</p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg text-red-600">
                <AlertTriangle size={20} />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">High Risk</p>
                <p className="text-2xl font-bold text-gray-800">3</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg text-yellow-600">
                <AlertTriangle size={20} />
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="bg-gray-100 h-full rounded-2xl hover:shadow-gray-300 hover:shadow-lg transition-all duration-300">
        <div className="bg-white h-full rounded-xl border-2 border-gray-300">
          <div className="bg-gray-200 grid grid-cols-8 p-3 rounded-t-md text-sm font-semibold text-gray-700">
            <span className="text-center">Alert ID</span>
            <span className="text-center">Transaction</span>
            <span className="text-center">User</span>
            <span className="text-center">Amount</span>
            <span className="text-center">Risk</span>
            <span className="text-center">Reason</span>
            <span className="text-center">Status</span>
            <span className="text-center">Actions</span>
          </div>
          <div className="overflow-y-auto">
            {filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className="grid text-center border-b border-gray-300 px-4 grid-cols-8 hover:bg-gray-100 rounded-md cursor-pointer"
              >
                <div className="px-1 py-3">#{alert.id}</div>
                <div className="px-1 py-3">#{alert.transactionId}</div>
                <div className="px-1 py-3 font-medium text-gray-800">
                  {alert.userName}
                  <div className="text-xs text-gray-500">ID: #{alert.userId}</div>
                </div>
                <div className="px-1 py-3 font-semibold">
                  ₹{alert.amount.toLocaleString()}
                </div>
                <div className="px-1 py-3">{getRiskBadge(alert.riskLevel)}</div>
                <div className="px-1 py-3 max-w-xs truncate">{alert.reason}</div>
                <div className="px-1 py-3">{getStatusBadge(alert.status)}</div>
                <div className="px-1 py-3">
                  {alert.status === "flagged" ? (
                    <div className="flex justify-center space-x-2">
                      <Button size="sm" variant="success" onClick={() => handleMarkAsSafe(alert.id)}>
                        Safe
                      </Button>
                      <Button size="sm" variant="warning" onClick={() => handleInvestigate(alert.id)}>
                        Investigate
                      </Button>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      leftIcon={<Eye size={14} />}
                      onClick={() => handleViewDetails(alert)}
                    >
                      View
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredAlerts.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">
                No fraud alerts found matching your search criteria.
              </p>
            </div>
          )}
        </div>
      </div>

      {selectedAlert && (
        <FraudDetailsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          alert={selectedAlert}
        />
      )}
    </div>
  );
};

export default FraudDetection;

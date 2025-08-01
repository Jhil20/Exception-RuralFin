import React, { useState } from "react";
import { X, Shield, CreditCard, TrendingUp, AlertCircle } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SecurityDepositOverlay = ({
  isOpen,
  onClose,
  currentBalance,
  currentSecurityDeposit,
  decoded,
  agentData,
}) => {
  const [depositAmount, setDepositAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleDeposit = async () => {
    setIsProcessing(true);

    if (!depositAmount || parseFloat(depositAmount) <= 0) {
      toast.error("Please enter a valid amount");
      setIsProcessing(false);
      return;
    }
    try {
      navigate("/razorpay", {
        state: {
          agentData,
          agentId: decoded.id,
          amount: parseFloat(depositAmount),
          type: "increaseSecurityDeposit",
        },
      });
    } catch (error) {
      toast.error("An error occurred while processing your deposit");
      console.error("Deposit Error:", error);
      return;
    } finally {
      setIsProcessing(false);
    }

    setDepositAmount("");
    onClose();
    // Simulate API call
  };

  const quickAmounts = [5000, 10000, 25000, 50000];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-xs flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-11/12 md:w-9/12 max-h-[90vh] overflow-y-auto box-content">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Shield className="w-6 h-6 text-black" />
            <h2 className="text-base md:text-xl font-bold text-black">
              Increase Security Deposit
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors"
          >
            <X className="w-5 h-5 text-gray-900" />
          </button>
        </div>

        {/* Current Status */}
        <div className="p-6 bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Current Balance</p>
              <p className="text-xl md:text-2xl font-bold text-black">
                ₹{currentBalance.toLocaleString()}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Security Deposit</p>
              <p className="text-xl md:text-2xl font-bold text-black">
                ₹{currentSecurityDeposit.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2 mb-3">
            <TrendingUp className="w-5 h-5 text-black" />
            <h3 className="font-semibold text-black">
              Benefits of Higher Security Deposit
            </h3>
          </div>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start space-x-2">
              <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0"></span>
              <span>Handle larger loan amounts</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0"></span>
              <span>Earn higher commission rates</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0"></span>
              <span>Build stronger customer trust</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0"></span>
              <span>Expand Your Market Reach</span>
            </li>
          </ul>
        </div>

        {/* Deposit Form */}
        <div className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-black mb-2">
              Deposit Amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600">
                ₹
              </span>
              <input
                type="number"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full pl-8 pr-4 py-3 border-2 hover:border-gray-700 transition-all duration-300 border-gray-300 rounded-lg focus:border-gray-700 no-spinner"
              />
            </div>
          </div>

          {/* Quick Amount Buttons */}
          <div className="mb-6">
            <p className="text-sm font-medium text-black mb-3">Quick Select</p>
            <div className="grid grid-cols-2 gap-2">
              {quickAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => setDepositAmount(amount.toString())}
                  className="py-2 px-4 border border-gray-300 rounded-lg hover:bg-black hover:text-white transition-all duration-100 cursor-pointer text-sm font-medium"
                >
                  ₹{amount.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 border cursor-pointer border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDeposit}
              disabled={isProcessing || !depositAmount}
              className={`flex-1 py-3 px-4 bg-black cursor-pointer  text-white rounded-lg font-medium hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2`}
            >
              <>
                <CreditCard className="w-4 h-4" />
                {isProcessing ? (
                  <span>Processing...</span>
                ) : (
                  <span>Deposit Now</span>
                )}
              </>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityDepositOverlay;

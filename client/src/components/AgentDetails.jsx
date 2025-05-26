import { X } from "lucide-react";
import React from "react";
import { useState } from "react";
import { User, Phone, Calendar, MapPin, Building, CreditCard, DollarSign, ArrowDownCircle, ArrowUpCircle, Check, AlertCircle, Activity, ChevronUp } from "lucide-react";
const AgentDetails = ({ showAgentDetails,setShowAgentDetails }) => {
  const mockAgentData = {
  firstName: "John",
  lastName: "Doe",
  phone: "+91 9876543210",
  age: 32,
  dob: new Date("1991-05-15"),
  gender: "male",
  address: "123 Main Street, Bangalore, Karnataka, 560001",
  aadhar: "1234-5678-9012",
  accountNumber: "12345678901234",
  ifscCode: "ABCD0001234",
  bankName: "State Bank of India",
  securityDeposit: 5000,
  commissionEarned: 12500,
  transactionCount: 48,
  isActive: true,
  role: "agent"
};

  const [activeTab, setActiveTab] = useState('info');
  const [transactionType, setTransactionType] = useState('deposit');
  const [amount, setAmount] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const maskAccountNumber = (accNum) => {
    const lastFour = accNum.slice(-4);
    const masked = 'XXXX-XXXX-' + lastFour;
    return masked;
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    console.log(`Processing ${transactionType} for amount: ₹${amount}`);
    setAmount('');
    setShowConfirmation(false);
  };

  if (!showAgentDetails) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <button
          onClick={() => setShowAgentDetails(true)}
          className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
        >
          View Agent Details
        </button>
      </div>
    );
  }

  return (
    <div className="bg-amber-100 h-full w-2/3 rounded-2xl p-6 pt-0 shadow-sm">
        <div className="bg-amber-500 w-full h-full  rounded-2xl shadow-xl overflow-hidden transition-all duration-300 transform animate-fade-in">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Agent Details</h2>
              <p className="text-gray-500 mt-1">
                {mockAgentData.firstName} {mockAgentData.lastName} • ID: {mockAgentData.aadhar.substring(0, 4)}
              </p>
            </div>
            <button
              onClick={() => setShowAgentDetails(false)}
              className="p-2 rounded-full cursor-pointer hover:bg-gray-100 transition-colors duration-200 group"
              aria-label="Close"
            >
              <X size={24} className="text-gray-500 group-hover:text-gray-900 transition-colors duration-200" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-100">
            <button
              onClick={() => setActiveTab('info')}
              className={`px-8 py-4 font-medium transition-colors duration-200 ${
                activeTab === 'info' 
                  ? 'text-black border-b-2 border-black' 
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Information
            </button>
            <button
              onClick={() => setActiveTab('transactions')}
              className={`px-8 py-4 font-medium transition-colors duration-200 ${
                activeTab === 'transactions' 
                  ? 'text-black border-b-2 border-black' 
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Transactions
            </button>
          </div>

          {/* Content */}
          <div className="h-full overflow-y-auto p-6">
            {activeTab === 'info' ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  {/* Personal Information */}
                  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md">
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                        <User size={18} className="mr-2" />
                        Personal Information
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                            <p className="text-black font-medium">{mockAgentData.firstName} {mockAgentData.lastName}</p>
                          </div>
                          
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-500 mb-1">
                              <span className="flex items-center">
                                <Phone size={14} className="mr-1" />
                                Phone Number
                              </span>
                            </label>
                            <p className="text-black font-medium">{mockAgentData.phone}</p>
                          </div>

                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-500 mb-1">Aadhar Number</label>
                            <p className="text-black font-medium">
                              {mockAgentData.aadhar.replace(/(\d{4})(\d{4})(\d{4})/, '$1-$2-$3')}
                            </p>
                          </div>
                        </div>

                        <div>
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-500 mb-1">
                              <span className="flex items-center">
                                <Calendar size={14} className="mr-1" />
                                Date of Birth
                              </span>
                            </label>
                            <p className="text-black font-medium">
                              {formatDate(mockAgentData.dob)} ({mockAgentData.age} years)
                            </p>
                          </div>

                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-500 mb-1">Gender</label>
                            <p className="text-black font-medium capitalize">{mockAgentData.gender}</p>
                          </div>

                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-500 mb-1">
                              <span className="flex items-center">
                                <MapPin size={14} className="mr-1" />
                                Address
                              </span>
                            </label>
                            <p className="text-black font-medium">{mockAgentData.address}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bank Information */}
                  <div className="mt-6">
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md">
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                          <Building size={18} className="mr-2" />
                          Banking Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <div className="mb-4">
                              <label className="block text-sm font-medium text-gray-500 mb-1">Bank Name</label>
                              <p className="text-black font-medium">{mockAgentData.bankName}</p>
                            </div>
                            
                            <div className="mb-4">
                              <label className="block text-sm font-medium text-gray-500 mb-1">IFSC Code</label>
                              <p className="text-black font-medium">{mockAgentData.ifscCode}</p>
                            </div>
                          </div>

                          <div>
                            <div className="mb-4">
                              <label className="block text-sm font-medium text-gray-500 mb-1">
                                <span className="flex items-center">
                                  <CreditCard size={14} className="mr-1" />
                                  Account Number
                                </span>
                              </label>
                              <p className="text-black font-medium">{maskAccountNumber(mockAgentData.accountNumber)}</p>
                            </div>
                            
                            <div className="mb-4">
                              <label className="block text-sm font-medium text-gray-500 mb-1">Security Deposit</label>
                              <p className="text-black font-medium">₹{mockAgentData.securityDeposit.toLocaleString('en-IN')}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Performance Stats */}
                <div>
                  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md h-full">
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                        <Activity size={18} className="mr-2" />
                        Performance
                      </h3>

                      <div className="space-y-6">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-500">Status</span>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              mockAgentData.isActive ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-800'
                            }`}>
                              {mockAgentData.isActive ? 'Active' : 'Inactive'}
                              {mockAgentData.isActive && <Check size={12} className="ml-1" />}
                            </span>
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-500">Commission Earned</span>
                            <span className="text-black font-bold">₹{mockAgentData.commissionEarned.toLocaleString('en-IN')}</span>
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <ChevronUp size={14} className="text-gray-900 mr-1" />
                            <span>From {mockAgentData.transactionCount} transactions</span>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-500">Security Deposit</span>
                            <span className="text-black font-bold">₹{mockAgentData.securityDeposit.toLocaleString('en-IN')}</span>
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-500">Transactions</span>
                            <span className="text-black font-bold">{mockAgentData.transactionCount}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-6">
                        {transactionType === 'deposit' ? 'Deposit (Cash to eRupees)' : 'Withdrawal (eRupees to Cash)'}
                      </h3>
                      
                      <div className="flex space-x-4 mb-6">
                        <button 
                          onClick={() => setTransactionType('deposit')}
                          className={`flex-1 flex items-center justify-center p-4 rounded-lg transition-all duration-200 ${
                            transactionType === 'deposit' 
                              ? 'bg-gray-900 text-white' 
                              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          }`}
                        >
                          <ArrowDownCircle size={20} className="mr-2" />
                          Deposit
                        </button>
                        
                        <button 
                          onClick={() => setTransactionType('withdrawal')}
                          className={`flex-1 flex items-center justify-center p-4 rounded-lg transition-all duration-200 ${
                            transactionType === 'withdrawal' 
                              ? 'bg-gray-900 text-white' 
                              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          }`}
                        >
                          <ArrowUpCircle size={20} className="mr-2" />
                          Withdrawal
                        </button>
                      </div>
                      
                      <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                            Amount (₹)
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <DollarSign size={18} className="text-gray-400" />
                            </div>
                            <input
                              type="text"
                              name="amount"
                              id="amount"
                              value={amount}
                              onChange={handleAmountChange}
                              className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-black focus:border-black transition-all duration-200"
                              placeholder="0.00"
                              required
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                              <span className="text-gray-500 sm:text-sm">INR</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mb-6">
                          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                            Notes (Optional)
                          </label>
                          <textarea
                            id="notes"
                            name="notes"
                            rows={3}
                            className="block w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-1 focus:ring-black focus:border-black transition-all duration-200"
                            placeholder="Add any additional information..."
                          />
                        </div>
                        
                        <button
                          type="submit"
                          className="w-full py-3 px-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-200 transform hover:translate-y-[-2px] flex items-center justify-center"
                          disabled={!amount}
                        >
                          <CreditCard size={18} className="mr-2" />
                          Process {transactionType === 'deposit' ? 'Deposit' : 'Withdrawal'}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
                
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm h-full">
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Transaction Guidelines</h3>
                      
                      <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium text-gray-900 mb-2">Deposit Instructions</h4>
                          <ul className="text-sm text-gray-600 space-y-2">
                            <li>• Collect cash from customer</li>
                            <li>• Enter exact amount received</li>
                            <li>• Verify customer details</li>
                            <li>• Complete transaction and issue receipt</li>
                          </ul>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium text-gray-900 mb-2">Withdrawal Instructions</h4>
                          <ul className="text-sm text-gray-600 space-y-2">
                            <li>• Verify customer identity</li>
                            <li>• Confirm sufficient eRupee balance</li>
                            <li>• Process withdrawal request</li>
                            <li>• Dispense cash and issue receipt</li>
                          </ul>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-start">
                            <AlertCircle size={20} className="text-gray-900 mr-2 mt-0.5 flex-shrink-0" />
                            <div>
                              <h4 className="font-medium text-gray-900 mb-1">Important Note</h4>
                              <p className="text-sm text-gray-600">
                                All transactions are recorded and monitored. Ensure you follow proper verification procedures before processing.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleDateString()}
            </div>
            <button
              onClick={() => setShowAgentDetails(false)}
              className="px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>

    </div>
  );
};
{/* Transaction Confirmation Modal */}
{/* {showConfirmation && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
    <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl animate-fade-in">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Confirm Transaction</h3>
      
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-gray-500">Transaction Type:</span>
          <span className="font-medium capitalize">{transactionType}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-500">Amount:</span>
          <span className="font-medium">₹{parseFloat(amount).toLocaleString('en-IN')}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Agent:</span>
          <span className="font-medium">{mockAgentData.firstName} {mockAgentData.lastName}</span>
        </div>
      </div>
      
      <div className="flex space-x-3">
        <button
          onClick={() => setShowConfirmation(false)}
          className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          onClick={handleConfirm}
          className="flex-1 py-2 px-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
)} */}

export default AgentDetails;

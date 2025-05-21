import React, { useState } from 'react';
import { ArrowUpRight, CreditCard, DollarSign, Eye, EyeOff } from 'lucide-react';

const BalanceCard = ({showSend, balance, lastUpdated }) => {
  const [showBalance, setShowBalance] = useState(true);
  const setShowSend=showSend.setShowSend;
  const toggleBalanceVisibility = () => {
    setShowBalance(!showBalance);
  };
  
  const formattedBalance = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency:"INR",
    maximumFractionDigits: 2,
  }).format(balance);

  return (
    <div className="bg-black h-full text-white rounded-2xl p-6 shadow-lg transform transition-all duration-300 hover:scale-[1.02]">
      
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-gray-400 text-sm font-medium">Total Balance</h3>
          <div className="flex items-center mt-1">
            <div className="flex items-center">
              <p className="text-2xl md:text-3xl font-bold">
                {showBalance ? formattedBalance : '••••••'}
              </p>
            </div>
            <button 
              onClick={toggleBalanceVisibility}
              className="ml-2 text-gray-400 hover:text-white cursor-pointer transition-colors duration-200"
            >
              {showBalance ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div className="bg-gray-800 p-2 rounded-full">
          <CreditCard size={20} className="text-gray-300" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4 mt-13 mb-4">
        <button onClick={()=>setShowSend(true)} className="bg-gray-800 cursor-pointer hover:bg-gray-700 transition-colors duration-200 rounded-xl py-3 px-4 flex items-center justify-center">
          <span className="mr-2">Send</span>
          <ArrowUpRight size={16} />
        </button>
      </div>
      
      <div className="text-xs text-gray-400">
        Last updated: {lastUpdated ? new Date(lastUpdated).toLocaleString('en-IN', {
          year: 'numeric',
          month: 'long',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }) : "N/A"}
      </div>
    </div>
  );
};

export default BalanceCard;

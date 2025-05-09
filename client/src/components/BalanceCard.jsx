import React, { useState } from 'react';
import { ArrowUpRight, CreditCard, DollarSign, Eye, EyeOff } from 'lucide-react';

const BalanceCard = ({ balance, currency, lastUpdated }) => {
  const [showBalance, setShowBalance] = useState(true);
  
  const toggleBalanceVisibility = () => {
    setShowBalance(!showBalance);
  };
  
  const formattedBalance = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(balance);

  return (
    <div className="bg-black text-white rounded-2xl p-6 shadow-lg transform transition-all duration-300 hover:scale-[1.02]">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-gray-400 text-sm font-medium">Total Balance</h3>
          <div className="flex items-center mt-1">
            <div className="flex items-center">
              <DollarSign size={20} className="mr-1 text-gray-300" />
              <p className="text-2xl md:text-3xl font-bold">
                {showBalance ? formattedBalance : '••••••'}
              </p>
            </div>
            <button 
              onClick={toggleBalanceVisibility}
              className="ml-2 text-gray-400 hover:text-white transition-colors duration-200"
            >
              {showBalance ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div className="bg-gray-800 p-2 rounded-full">
          <CreditCard size={20} className="text-gray-300" />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <button className="bg-gray-800 hover:bg-gray-700 transition-colors duration-200 rounded-xl py-3 px-4 flex items-center justify-center">
          <span className="mr-2">Send</span>
          <ArrowUpRight size={16} />
        </button>
        <button className="bg-gray-800 hover:bg-gray-700 transition-colors duration-200 rounded-xl py-3 px-4 flex items-center justify-center">
          <span className="mr-2">Receive</span>
          <ArrowUpRight size={16} className="transform rotate-180" />
        </button>
      </div>
      
      <div className="text-xs text-gray-400">
        Last updated: {lastUpdated}
      </div>
    </div>
  );
};

export default BalanceCard;

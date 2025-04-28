import React from 'react';
import { ArrowDownLeft, ArrowUpRight, Calendar, CreditCard, Smartphone, WifiIcon } from 'lucide-react';

const TransactionIcon = ({ type, category }) => {
  const iconClasses = "w-8 h-8 rounded-full flex items-center justify-center";

  switch (type) {
    case 'card':
      return (
        <div className={`${iconClasses} bg-gray-100`}>
          <CreditCard size={16} className="text-gray-700" />
        </div>
      );
    case 'mobile':
      return (
        <div className={`${iconClasses} bg-gray-100`}>
          <Smartphone size={16} className="text-gray-700" />
        </div>
      );
    case 'wifi':
      return (
        <div className={`${iconClasses} bg-gray-100`}>
          <WifiIcon size={16} className="text-gray-700" />
        </div>
      );
    case 'calendar':
      return (
        <div className={`${iconClasses} bg-gray-100`}>
          <Calendar size={16} className="text-gray-700" />
        </div>
      );
    default:
      return (
        <div className={`${iconClasses} bg-gray-100`}>
          <CreditCard size={16} className="text-gray-700" />
        </div>
      );
  }
};

const RecentTransactions = ({ transactions }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
        <button className="text-sm font-medium text-gray-600 hover:text-black transition-colors duration-200">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
          >
            <div className="flex items-center space-x-3">
              <TransactionIcon type={transaction.icon} category={transaction.category} />

              <div>
                <p className="font-medium text-gray-900">{transaction.merchant}</p>
                <p className="text-xs text-gray-500">{transaction.date}</p>
              </div>
            </div>

            <div className="flex items-center">
              <span className={`text-sm font-semibold ${
                transaction.type === 'incoming' ? 'text-green-600' : 'text-red-600'
              }`}>
                {transaction.type === 'incoming' ? '+' : '-'}
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: transaction.currency,
                }).format(transaction.amount)}
              </span>

              <div className="ml-2">
                {transaction.type === 'incoming' ? (
                  <ArrowDownLeft size={16} className="text-green-600" />
                ) : (
                  <ArrowUpRight size={16} className="text-red-600" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;

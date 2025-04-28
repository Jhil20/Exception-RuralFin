import React from 'react';
import { CreditCard, FileText, ReceiptText, Send, Smartphone } from 'lucide-react';

const QuickActions = () => {
  const actions = [
    {
      id: 'transfer',
      title: 'Transfer',
      icon: <Send size={24} />,
      backgroundColor: 'bg-gray-100'
    },
    {
      id: 'bills',
      title: 'Pay Bills',
      icon: <FileText size={24} />,
      backgroundColor: 'bg-gray-100'
    },
    {
      id: 'topup',
      title: 'Top Up',
      icon: <Smartphone size={24} />,
      backgroundColor: 'bg-gray-100'
    },
    {
      id: 'cards',
      title: 'Cards',
      icon: <CreditCard size={24} />,
      backgroundColor: 'bg-gray-100'
    },
    {
      id: 'invoices',
      title: 'Invoices',
      icon: <ReceiptText size={24} />,
      backgroundColor: 'bg-gray-100'
    }
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
      
      <div className="grid grid-cols-5 gap-3">
        {actions.map((action) => (
          <button 
            key={action.id}
            className="flex flex-col items-center justify-center transition-all duration-200 hover:scale-105"
          >
            <div className={`${action.backgroundColor} p-3 rounded-xl mb-2 text-gray-700`}>
              {action.icon}
            </div>
            <span className="text-xs font-medium text-gray-700">{action.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;

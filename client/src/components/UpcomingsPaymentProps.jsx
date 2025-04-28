import React from 'react';
import { Calendar } from 'lucide-react';

const UpcomingPayments = ({ payments }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Upcoming Payments</h3>
        <div className="bg-gray-100 p-2 rounded-full">
          <Calendar size={18} className="text-gray-700" />
        </div>
      </div>
      
      <div className="space-y-4">
        {payments.map((payment) => (
          <div 
            key={payment.id}
            className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-2">
                <img src={payment.logo} alt={payment.title} className="max-w-full max-h-full" />
              </div>

              <div>
                <p className="font-medium text-gray-900">{payment.title}</p>
                <p className="text-xs text-gray-500">Due {payment.dueDate}</p>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <span className="text-sm font-semibold text-gray-900">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: payment.currency,
                }).format(payment.amount)}
              </span>

              <span className="text-xs px-2 py-0.5 rounded-full bg-gray-200 text-gray-700">
                {payment.type === 'subscription' ? 'Subscription' : 'Bill'}
              </span>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 text-center py-2 text-sm font-medium text-gray-600 hover:text-black transition-colors duration-200">
        Manage All Payments
      </button>
    </div>
  );
};

export default UpcomingPayments;

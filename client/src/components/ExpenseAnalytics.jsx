import React from 'react';
import { PieChart, TrendingUp } from 'lucide-react';

const ExpenseAnalytics = ({ 
  totalSpent, 
  currency, 
  categories,
  comparedToLastMonth
}) => {
  const formattedTotal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(totalSpent);
  
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Expense Analytics</h3>
        <div className="bg-gray-100 p-2 rounded-full">
          <PieChart size={18} className="text-gray-700" />
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex items-center">
          <p className="text-2xl font-bold text-gray-900">{formattedTotal}</p>
          <div className="ml-2 flex items-center bg-gray-100 px-2 py-1 rounded-full">
            <TrendingUp size={14} className={comparedToLastMonth >= 0 ? "text-green-500" : "text-red-500"} />
            <span className={`text-xs font-medium ml-1 ${comparedToLastMonth >= 0 ? "text-green-500" : "text-red-500"}`}>
              {comparedToLastMonth > 0 ? '+' : ''}{comparedToLastMonth}%
            </span>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-1">Total spent this month</p>
      </div>
      
      <div className="space-y-4">
        {categories.map((category, index) => (
          <div key={index}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">{category.category}</span>
              <span className="text-sm font-medium text-gray-900">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency,
                }).format(category.amount)}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="h-2 rounded-full" 
                style={{ 
                  width: `${category.percentage}%`,
                  backgroundColor: category.color 
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-6 text-center py-2 text-sm font-medium text-gray-600 hover:text-black transition-colors duration-200">
        View Detailed Report
      </button>
    </div>
  );
};

export default ExpenseAnalytics;

import React from 'react';
import { ArrowRight, Wallet } from 'lucide-react';

const ExpenseCategoryDetails = ({ budgetData, categoryBudgets }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const getCategoryColor = (category) => {
    const colors = [
      'bg-blue-100 text-blue-800',
      'bg-green-100 text-green-800',
      'bg-purple-100 text-purple-800',
      'bg-yellow-100 text-yellow-800',
      'bg-pink-100 text-pink-800',
      'bg-indigo-100 text-indigo-800',
    ];

    const hash = category.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  return (
    <div className="space-y-8">
      <h3 className="text-lg font-semibold">Budget Categories</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categoryBudgets.map((category, index) => {
          const spent = budgetData?.categorySpending[category] || 0;
          const budget = budgetData?.categoryBudgets[category] || 0;
          const percentage = (spent / budget) * 100;
          const isOverBudget = spent > budget;

          return (
            <div key={index} className="bg-gray-50 rounded-xl overflow-hidden">
              <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 ${getCategoryColor(category)}`}>
                      {category}
                    </span>
                    <h4 className="text-lg font-bold">{formatCurrency(spent)}</h4>
                    <p className="text-sm text-gray-500">
                      of {formatCurrency(budget)} budget
                    </p>
                  </div>

                  <div className={`text-sm font-medium ${isOverBudget ? 'text-red-500' : 'text-green-500'}`}>
                    {percentage.toFixed(0)}%
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div
                    className={`h-2 rounded-full ${isOverBudget ? 'bg-red-500' : 'bg-black'}`}
                    style={{
                      width: `${Math.min(percentage, 100)}%`,
                    }}
                  ></div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <Wallet size={14} className="mr-1" />
                    <span>Monthly Budget</span>
                  </div>
                  <span className={percentage > 90 ? 'text-red-500 font-medium' : ''}>
                    {percentage > 90 ? 'Near limit' : 'Within budget'}
                  </span>
                </div>
              </div>

              <button className="w-full px-5 py-3 bg-gray-100 text-sm font-medium text-gray-700 hover:text-black flex items-center justify-center transition-colors duration-200">
                <span>View Details</span>
                <ArrowRight size={14} className="ml-1" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExpenseCategoryDetails;

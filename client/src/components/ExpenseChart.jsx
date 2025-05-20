import React, { useState } from 'react';
import { BarChart, PieChart } from 'lucide-react';

const ExpenseChart = ({ budgetData, categoryBudgets }) => {
  const [chartType, setChartType] = useState('bar');

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const totalBudget = Object.values(budgetData?.categoryBudgets || {}).reduce(
    (acc, val) => acc + (typeof val === 'number' ? val : 0),
    0
  );

  const totalSpent = Object.values(budgetData?.categorySpending || {}).reduce(
    (acc, val) => acc + (typeof val === 'number' ? val : 0),
    0
  );



  return (
    <div className="bg-white rounded-xl p-8  transition-all duration-300 shadow-gray-300 hover:shadow-gray-400 shadow-md hover:shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Expense Distribution</h3>
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setChartType('bar')}
            className={`p-2 rounded-md text-sm flex items-center transition-all duration-200 ${
              chartType === 'bar' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <BarChart size={16} className="mr-1" />
            <span>Bar</span>
          </button>
          <button
            onClick={() => setChartType('pie')}
            className={`p-2 rounded-md text-sm flex items-center transition-all duration-200 ${
              chartType === 'pie' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <PieChart size={16} className="mr-1" />
            <span>Pie</span>
          </button>
        </div>
      </div>

      <div className="h-72 flex items-center justify-center">
        {chartType === 'bar' ? (
          <div className="w-full h-full flex items-end space-x-2 pt-8 pb-6">
            {categoryBudgets.map((category, index) => {
              const spent = budgetData?.categorySpending[category] || 0;
              const spentPercentage = (spent / totalSpent) * 100;

              return (
                <div key={index} className="flex-1 h-full flex flex-col items-center group">
                  <div className="w-full h-full flex justify-center items-end mb-1 relative">
                    <div
                      className="w-full max-w-[40px] rounded-t-sm transition-all opacity-100 duration-300 group-hover:opacity-90"
                      style={{
                        height: `${spentPercentage.toFixed(0)}%`,
                        backgroundColor: "black",
                        width: '100%',
                      }}
                    >
                      <div className="opacity-0 group-hover:opacity-100 relative -top-8 left-1/2  -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap transition-all duration-200">
                        {formatCurrency(spent)}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 rotate-0 truncate w-16 text-center">
                    {category}
                  </p>
                  <p className="text-xs font-medium mt-1 text-gray-900">
                    {spentPercentage > 0 ? `${spentPercentage.toFixed(0)}%` : '0%'}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="absolute right-0 h-full flex flex-col justify-center space-y-3">
              {categoryBudgets.map((category, index) => {
                const spent = budgetData?.categorySpending[category] || 0;
                const percentage = (spent / totalSpent) * 100;

                return (
                  <div key={index} className="flex items-center text-sm group">
                    <div
                      className="w-4 h-4 mr-3 rounded transition-transform duration-200 group-hover:scale-110"
                      style={{ backgroundColor: getCategoryColor(index) }}
                    ></div>
                    <span className="mr-2 font-medium text-gray-900">{category}</span>
                    <span className="text-gray-500">{percentage.toFixed(1)}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="mt-0 grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
        <div>
          <p className="text-sm text-gray-500 mb-1">Total Budget</p>
          <p className="text-lg font-bold text-gray-900">{formatCurrency(totalBudget)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">Total Spent</p>
          <p className="text-lg font-bold text-gray-900">{formatCurrency(totalSpent)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">Remaining</p>
          <p className="text-lg font-bold text-gray-900">{formatCurrency(totalBudget - totalSpent)}</p>
        </div>
      </div>
    </div>
  );
};

export default ExpenseChart;
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

  const getCategoryColor = (index) => {
    const colors = [
      '#000000', // Black
      '#4F46E5', // Indigo
      '#EC4899', // Pink
      '#10B981', // Emerald
      '#F59E0B', // Amber
      '#6366F1', // Indigo
      '#8B5CF6', // Violet
      '#EF4444', // Red
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-semibold">Expense Distribution</h3>
        <div className="flex bg-gray-200 rounded-lg p-1">
          <button
            onClick={() => setChartType('bar')}
            className={`p-1.5 rounded-md text-xs flex items-center ${
              chartType === 'bar' ? 'bg-white shadow-sm' : 'text-gray-600'
            }`}
          >
            <BarChart size={14} className="mr-1" />
            <span>Bar</span>
          </button>
          <button
            onClick={() => setChartType('pie')}
            className={`p-1.5 rounded-md text-xs flex items-center ${
              chartType === 'pie' ? 'bg-white shadow-sm' : 'text-gray-600'
            }`}
          >
            <PieChart size={14} className="mr-1" />
            <span>Pie</span>
          </button>
        </div>
      </div>

      <div className="h-64 flex items-center justify-center">
        {chartType === 'bar' ? (
          <div className="w-full h-full flex items-end space-x-1 pt-8 pb-6">
            {categoryBudgets.map((category, index) => {
              const spent = budgetData?.categorySpending[category] || 0;
              const spentPercentage = (spent / totalSpent) * 100;
              const color = getCategoryColor(index);

              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full flex justify-center mb-1">
                    <div
                      className="w-full rounded-t-sm max-w-[40px]"
                      style={{
                        height: `${Math.max(spentPercentage * 2, 5)}%`,
                        backgroundColor: color
                      }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 rotate-270 truncate w-10 text-center">
                    {category.substring(0, 4)}
                  </p>
                  <p className="text-xs font-semibold mt-1">
                    {spentPercentage > 10 ? `${spentPercentage.toFixed(0)}%` : ''}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="absolute right-0 h-full flex flex-col justify-center space-y-2">
              {categoryBudgets.map((category, index) => {
                const spent = budgetData?.categorySpending[category] || 0;
                const percentage = (spent / totalSpent) * 100;

                return (
                  <div key={index} className="flex items-center text-xs">
                    <div
                      className="w-3 h-3 mr-2 rounded-sm"
                      style={{ backgroundColor: getCategoryColor(index) }}
                    ></div>
                    <span className="mr-2 font-medium">{category}</span>
                    <span className="text-gray-500">{percentage.toFixed(1)}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 flex justify-between text-sm">
        <div>
          <p className="text-gray-500">Total Budget</p>
          <p className="font-bold">{formatCurrency(totalBudget)}</p>
        </div>
        <div>
          <p className="text-gray-500">Total Spent</p>
          <p className="font-bold">{formatCurrency(totalSpent)}</p>
        </div>
        <div>
          <p className="text-gray-500">Remaining</p>
          <p className="font-bold">{formatCurrency(totalBudget - totalSpent)}</p>
        </div>
      </div>
    </div>
  );
};

export default ExpenseChart;

import React, { useEffect, useState } from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const MonthlyComparison = ({allYearBudgets}) => {
  // Sample data for illustration
  const [thisMonthStateData, setThisMonthStateData] = useState({});
  const [lastMonthStateData, setLastMonthStateData] = useState({});
  const monthlyData = [
    {
      month: 'This Month',
      amount: 45600,
      change: 12,
      categories: [
        { name: 'Food', amount: 12500, change: 5 },
        { name: 'Shopping', amount: 9800, change: 18 },
        { name: 'Entertainment', amount: 7300, change: -8 },
        { name: 'Utilities', amount: 6500, change: 0 },
      ],
    },
    {
      month: 'Last Month',
      amount: 40700,
      change: -3,
      categories: [
        { name: 'Food', amount: 11900, change: -5 },
        { name: 'Shopping', amount: 8300, change: -10 },
        { name: 'Entertainment', amount: 7900, change: 15 },
        { name: 'Utilities', amount: 6500, change: 2 },
      ],
    },
  ];

  useEffect(()=>{
    const thisMonthData=allYearBudgets?.find((budget)=>(budget?.month==new Date().getMonth()+1 && budget?.year==new Date().getFullYear()));
  const prevMonth=thisMonthData?.month-1==0?12:thisMonthData?.month-1;
  const prevYear=thisMonthData?.month-1==0?thisMonthData?.year-1:thisMonthData?.year;
  const lastMonthData=allYearBudgets?.find((budget)=>(budget?.month==prevMonth && budget?.year==prevYear));
  console.log("this month data",thisMonthData);
  console.log("last month data",lastMonthData);
  setThisMonthStateData(thisMonthData);
  setLastMonthStateData(lastMonthData);
  },[])

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getCategoryColor = (index) => {
    const colors = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#6366F1'];
    return colors[index % colors.length];
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Monthly Comparison</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {monthlyData.map((data, index) => (
          <div key={index} className="bg-gray-50 shadow-gray-300 hover:shadow-gray-400 transition-all duration-300 shadow-md hover:shadow-lg rounded-xl p-5">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-base font-medium">{data.month}</h4>
              <div
                className={`flex items-center ${
                  data.change >= 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {data.change >= 0 ? (
                  <ArrowUpRight size={16} className="mr-1" />
                ) : (
                  <ArrowDownRight size={16} className="mr-1" />
                )}
                <span className="text-sm font-medium">{data.change}%</span>
              </div>
            </div>

            <p className="text-2xl font-bold mb-4">{formatCurrency(data.amount)}</p>

            <div className="space-y-4">
              {data.categories.map((category, catIndex) => {
                const percent = data.amount > 0 ? (category.amount / data.amount) * 100 : 0;

                const barColor =
                  category.change > 0
                    ? 'bg-green-500'
                    : category.change < 0
                    ? 'bg-red-500'
                    : 'bg-gray-400';

                return (
                  <div key={catIndex}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">{category.name}</span>
                      <div className="flex items-center">
                        <span className="text-sm font-medium mr-2">
                          {formatCurrency(category.amount)}
                        </span>
                        <div
                          className={`flex items-center text-xs ${
                            category.change > 0
                              ? 'text-green-600'
                              : category.change < 0
                              ? 'text-red-600'
                              : 'text-gray-500'
                          }`}
                        >
                          {category.change > 0 ? (
                            <ArrowUpRight size={12} />
                          ) : category.change < 0 ? (
                            <ArrowDownRight size={12} />
                          ) : null}
                          <span>{category.change !== 0 ? `${category.change}%` : '—'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full transition-all duration-500`}
                        style={{
                          width: `${percent}%`,
                          backgroundColor: getCategoryColor(catIndex),
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        <div className="bg-gray-50 shadow-gray-300 hover:shadow-gray-400 transition-all duration-300 shadow-md hover:shadow-lg rounded-xl p-5">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-base font-medium">{lastMonthStateData?.month}</h4>
              <div
                className={`flex items-center ${
                  data.change >= 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {data.change >= 0 ? (
                  <ArrowUpRight size={16} className="mr-1" />
                ) : (
                  <ArrowDownRight size={16} className="mr-1" />
                )}
                <span className="text-sm font-medium">{data.change}%</span>
              </div>
            </div>

            <p className="text-2xl font-bold mb-4">{formatCurrency(data.amount)}</p>

            <div className="space-y-4">
              {data.categories.map((category, catIndex) => {
                const percent = data.amount > 0 ? (category.amount / data.amount) * 100 : 0;

                const barColor =
                  category.change > 0
                    ? 'bg-green-500'
                    : category.change < 0
                    ? 'bg-red-500'
                    : 'bg-gray-400';

                return (
                  <div key={catIndex}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">{category.name}</span>
                      <div className="flex items-center">
                        <span className="text-sm font-medium mr-2">
                          {formatCurrency(category.amount)}
                        </span>
                        <div
                          className={`flex items-center text-xs ${
                            category.change > 0
                              ? 'text-green-600'
                              : category.change < 0
                              ? 'text-red-600'
                              : 'text-gray-500'
                          }`}
                        >
                          {category.change > 0 ? (
                            <ArrowUpRight size={12} />
                          ) : category.change < 0 ? (
                            <ArrowDownRight size={12} />
                          ) : null}
                          <span>{category.change !== 0 ? `${category.change}%` : '—'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full transition-all duration-500`}
                        style={{
                          width: `${percent}%`,
                          backgroundColor: getCategoryColor(catIndex),
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
      </div>
    </div>
  );
};

export default MonthlyComparison;

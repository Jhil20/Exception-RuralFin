import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PieChart, Wallet, TrendingUp, BellRing } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const BudgetTracking = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const phoneRef = useRef(null);
  const featuresRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.from([titleRef.current, descriptionRef.current], {
      opacity: 0,
      y: 30,
      stagger: 0.2,
      duration: 0.8,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
      }
    });

    if (phoneRef.current) {
      gsap.from(phoneRef.current, {
        opacity: 0,
        x: -50,
        duration: 1,
        scrollTrigger: {
          trigger: phoneRef.current,
          start: 'top 70%',
        }
      });
    }

    if (featuresRef.current) {
      const features = featuresRef.current.querySelectorAll('.budget-feature');

      gsap.from(features, {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.6,
        scrollTrigger: {
          trigger: featuresRef.current,
          start: 'top 80%',
        }
      });
    }
  }, []);

  const budgetFeatures = [
    {
      icon: <PieChart size={24} />,
      title: 'Expense Categorization',
      description: 'Automatically categorize expenses to see where your money goes.'
    },
    {
      icon: <Wallet size={24} />,
      title: 'Personalized Budgets',
      description: 'Create custom budgets based on your income and financial goals.'
    },
    {
      icon: <TrendingUp size={24} />,
      title: 'Spending Insights',
      description: 'Get visual reports and actionable insights on your spending habits.'
    },
    {
      icon: <BellRing size={24} />,
      title: 'Budget Alerts',
      description: 'Receive notifications when you\'re approaching your budget limits.'
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-20 px-6 md:px-12 bg-gray-50"
      id="financial-tools"
    >
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Budget Tracking Made Simple
          </h2>
          <p 
            ref={descriptionRef}
            className="text-lg text-gray-700 max-w-3xl mx-auto"
          >
            Take control of your finances with our intuitive budget tracking tools,
            designed to help you manage your money effectively.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div 
            ref={phoneRef}
            className="w-full lg:w-1/2 order-2 lg:order-1"
          >
            <div className="bg-gradient-to-br from-gray-800 to-black p-3 rounded-[2.5rem] shadow-xl max-w-[320px] mx-auto">
              <div className="bg-white rounded-[2rem] overflow-hidden">
                <div className="bg-black text-white px-4 py-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Budget Tracker</p>
                    <div className="flex items-center gap-2">
                      <Wallet size={16} />
                      <p className="text-sm font-medium">₹12,580</p>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <p className="text-sm font-medium mb-2">Monthly Overview</p>
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-xs text-gray-500">Income</p>
                      <p className="text-sm font-medium">₹15,000</p>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-xs text-gray-500">Expenses</p>
                      <p className="text-sm font-medium">₹8,450</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-gray-500">Savings</p>
                      <p className="text-sm font-medium text-green-500">₹6,550</p>
                    </div>
                  </div>

                  <p className="text-sm font-medium mb-3">Budget Categories</p>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-xs">Food & Dining</p>
                        <p className="text-xs">₹3,200 / ₹4,000</p>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="bg-black h-2 rounded-full" style={{ width: '80%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-xs">Transportation</p>
                        <p className="text-xs">₹1,500 / ₹2,000</p>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="bg-black h-2 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-xs">Entertainment</p>
                        <p className="text-xs">₹1,100 / ₹1,000</p>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-xs">Utilities</p>
                        <p className="text-xs">₹1,800 / ₹2,500</p>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="bg-black h-2 rounded-full" style={{ width: '72%' }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center">
                      <BellRing size={16} className="text-orange-500 mr-2" />
                      <p className="text-xs">Alert: Entertainment budget exceeded by 10%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div 
            ref={featuresRef}
            className="w-full lg:w-1/2 order-1 lg:order-2"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {budgetFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="budget-feature p-8 shadow-md shadow-black/10 hover:shadow-lg hover:shadow-gray-300 transition-shadow duration-300 bg-white  rounded-xl"
                >
                  <div className="bg-black text-white h-12 w-12 rounded-lg flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BudgetTracking;

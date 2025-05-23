import React from 'react';
import { ShieldCheck, Calendar, Clock, AlertTriangle, CheckCircle, ArrowRight, FileText } from 'lucide-react';

const SecurityBond = ({ bondData }) => {
  const currentDate = new Date();
  const endDate = new Date(bondData.bondEndDate);
  const daysRemaining = Math.ceil((endDate - currentDate) / (1000 * 60 * 60 * 24));

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const bondSteps = [
    {
      title: 'Security Deposit Made',
      date: formatDate(bondData.bondStartDate),
      status: 'completed',
      icon: <ShieldCheck size={20} className="text-white" />
    },
    {
      title: 'Initial Verification Period',
      date: '30 Days',
      status: 'completed',
      icon: <CheckCircle size={20} className="text-white" />
    },
    {
      title: 'Midterm Review',
      date: '90 Days',
      status: 'in-progress',
      icon: <Clock size={20} className="text-white" />
    },
    {
      title: 'Final Bond Maturity',
      date: formatDate(bondData.bondEndDate),
      status: 'upcoming',
      icon: <Calendar size={20} className="text-white" />
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Security Bond Management</h1>

      {/* Bond Overview Card */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row justify-between">
          <div>
            <h2 className="text-xl font-semibold flex items-center">
              <ShieldCheck size={24} className="text-gray-800 mr-2" />
              Security Bond Status
            </h2>
            <p className="text-gray-600 mt-1">
              Your security deposit ensures liquidity and builds trust in the platform.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center">
            <div className="text-right">
              <div className="text-sm text-gray-600">Bond Completion</div>
              <div className="text-2xl font-bold">{bondData.bondCompletionPercentage}%</div>
            </div>
          </div>
        </div>

        {/* Bond Progress */}
        <div className="mt-6">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Bond Progress</span>
            <span className="font-medium">{daysRemaining} days remaining</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-black rounded-full h-2.5 transition-all duration-1000"
              style={{ width: `${bondData.bondCompletionPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{formatDate(bondData.bondStartDate)}</span>
            <span>{formatDate(bondData.bondEndDate)}</span>
          </div>
        </div>
      </div>

      {/* Bond Details Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Bond Details</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Security Deposit Amount</span>
              <span className="font-semibold">₹{bondData.securityDeposit.toLocaleString()}</span>
            </div>
            <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
              <span className="text-gray-600">Start Date</span>
              <span>{formatDate(bondData.bondStartDate)}</span>
            </div>
            <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
              <span className="text-gray-600">Maturity Date</span>
              <span>{formatDate(bondData.bondEndDate)}</span>
            </div>
            <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
              <span className="text-gray-600">Bond Term</span>
              <span>6 Months</span>
            </div>
            <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
              <span className="text-gray-600">Bond Status</span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Active
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Performance Metrics</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Transactions</span>
              <span className="font-semibold">{bondData.transactionsProcessed}</span>
            </div>
            <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
              <span className="text-gray-600">Commission Earned</span>
              <span>₹{bondData.commissionEarned.toLocaleString()}</span>
            </div>
            <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
              <span className="text-gray-600">Active Users Served</span>
              <span>{bondData.activeUsers}</span>
            </div>
            <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
              <span className="text-gray-600">Complaints</span>
              <span>0</span>
            </div>
            <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
              <span className="text-gray-600">Policy Violations</span>
              <span>None</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bond Timeline */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-6">Bond Timeline</h2>
        <div className="relative">
          <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-gray-200"></div>
          <div className="space-y-8">
            {bondSteps.map((step, index) => (
              <div key={index} className="relative flex items-start">
                <div className={`flex-shrink-0 h-14 w-14 rounded-full flex items-center justify-center z-10 ${
                  step.status === 'completed' ? 'bg-black' :
                  step.status === 'in-progress' ? 'bg-yellow-500' :
                  'bg-gray-300'
                }`}>
                  {step.icon}
                </div>
                <div className="ml-4 pt-1">
                  <h3 className="text-base font-medium text-gray-900">{step.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{step.date}</p>
                  {step.status === 'in-progress' && (
                    <div className="mt-2 flex items-center text-yellow-600 text-sm">
                      <Clock size={14} className="mr-1" />
                      In Progress
                    </div>
                  )}
                  {step.status === 'completed' && (
                    <div className="mt-2 flex items-center text-green-600 text-sm">
                      <CheckCircle size={14} className="mr-1" />
                      Completed
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
          <div className="flex items-start">
            <div className="p-3 rounded-full bg-yellow-100 mr-4">
              <AlertTriangle size={20} className="text-yellow-700" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Bond Violations Policy</h3>
              <p className="text-sm text-gray-600 mt-1">
                Any fraudulent activity or policy violations during the bond period will result in partial or complete forfeiture of the security deposit.
              </p>
              <button className="mt-3 text-sm font-medium flex items-center text-black">
                Review Full Policy <ArrowRight size={14} className="ml-1" />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
          <div className="flex items-start">
            <div className="p-3 rounded-full bg-blue-100 mr-4">
              <FileText size={20} className="text-blue-700" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Bond Maturity Process</h3>
              <p className="text-sm text-gray-600 mt-1">
                Upon successful completion of the 6-month bond period, your security deposit will be released back to your account within 3 business days.
              </p>
              <button className="mt-3 text-sm font-medium flex items-center text-black">
                Learn More <ArrowRight size={14} className="ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityBond;

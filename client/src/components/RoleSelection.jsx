import React from 'react';
import { User, Building } from 'lucide-react';

const RoleSelection = ({ setRole }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Role</h2>
        <p className="text-gray-600 px-20">Select how you want to participate in our financial ecosystem. Each role comes with unique features and responsibilities.</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        <button
          onClick={() => setRole('user')}
          className="flex flex-col items-center justify-center cursor-pointer p-8 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg hover:border-gray-300 hover:shadow-black/20  transition-all duration-300"
        >
          <div className="h-16 w-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
            <User className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">User</h3>
          <p className="text-gray-600 text-center mt-2 text-sm">
            Create an account to Access secure digital payments, manage your finances, and enjoy seamless transactions. Perfect for individuals looking for modern financial solutions.
          </p>
        </button>
        
        <button
          onClick={() => setRole('agent')}
          className="flex flex-col items-center justify-center cursor-pointer p-8 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg hover:border-gray-300 hover:shadow-black/20 transition-all duration-300"
        >
          <div className="h-16 w-16 rounded-full bg-green-50 flex items-center justify-center mb-4">
            <Building className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Agent</h3>
          <p className="text-gray-600 text-center mt-2 text-sm">
   Create an account to become a financial service provider in your community. Help others access digital financial services while earning commission on transactions.          </p>
        </button>
      </div>
    </div>
  );
};

export default RoleSelection;

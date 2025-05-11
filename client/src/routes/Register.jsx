import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import Header from '../components/Header';
import RoleSelection from '../components/RoleSelection';
import UserForm from '../components/UserForm';
import AgentForm from '../components/AgentForm';
const Register = () => {
  const [role, setRole] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const handleFormSubmit = (values) => {
    console.log('Form submitted with values:', values);
    setSubmittedData({
      ...values,
      role: role
    });
    setIsSubmitted(true);
  };

  const resetRole = () => {
    setRole(null);
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setSubmittedData(null);
    setRole(null);
  };

  const renderSuccessMessage = () => (
    <div className="text-center space-y-6 animate-fadeIn">
      <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-green-100 text-green-600 mb-4">
        <CheckCircle className="h-12 w-12" />
      </div>
      
      <h2 className="text-3xl font-bold text-gray-900">Registration Successful!</h2>
      
      <p className="text-lg text-gray-600 max-w-md mx-auto">
        Thank you for registering as a $1 with Rural Fin Finance. Your eWallet account has been successfully created.
      </p>
      
      <div className="mt-8">
        <button
          onClick={resetForm}
          className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-300"
        >
          Back to Home
        </button>
      </div>
    </div>
  );

  const renderContent = () => {
    if (isSubmitted) {
      return renderSuccessMessage();
    }

    if (!role) {
      return <RoleSelection setRole={setRole} />;
    }

    if (role === 'user') {
      return <UserForm onSubmit={handleFormSubmit} resetRole={resetRole} />;
    }

    if (role === 'agent') {
      return <AgentForm onSubmit={handleFormSubmit} resetRole={resetRole} />;
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      <Header />

      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-3xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
              Register To Become a User or an Agent
            </h1>
            <p className="text-gray-600 text-lg">
              Join RuralFin Finance to access financial services and manage your eWallet easily.
            </p>
          </div>

          <div className={`bg-white shadow-xl rounded-2xl p-8  border-gray-300 border-[1px] transition-all duration-300 shadow-black/20 ${isSubmitted ? 'py-16' : ''}`}>
            {renderContent()}
          </div>

          {!isSubmitted && (
            <div className="text-center mt-8">
              <p className="text-xs text-gray-500">
                By creating an eWallet account, you agree to our{" "}
                <a
                  href="/terms"
                  className="text-gray-700 hover:text-black transition-colors"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="/privacy"
                  className="text-gray-700 hover:text-black transition-colors"
                >
                  Privacy Policy
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;

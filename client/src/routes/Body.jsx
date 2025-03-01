import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const Body = () => {
  const navigate = useNavigate();
  const isSignedIn = useSelector((state) => state.signin.isSignedIn);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6 space-y-8">
      {/* Landing Page */}
      <div className="rounded-2xl bg-white p-6 shadow-lg">
        <div className="flex justify-between items-center mb-8">
          <div className="text-2xl font-bold text-blue-600">RuralFin</div>
          <div className="flex gap-6">
            <button className="px-4 py-2 rounded-lg hover:bg-blue-50">About</button>
            <button className="px-4 py-2 rounded-lg hover:bg-blue-50">Services</button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">Get Started</button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Banking Made Simple for Everyone</h1>
            <p className="text-gray-600">Secure, Fast, and Reliable Financial Services at Your Fingertips</p>
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-xl flex items-center gap-2">
                Start Banking <ArrowUpRight size={20} />
              </button>
              <button className="px-6 py-3 border border-blue-600 text-blue-600 rounded-xl">Learn More</button>
            </div>
          </div>
          <div className="bg-blue-100 rounded-2xl h-64 flex items-center justify-center">
            Interactive Animation Area
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;

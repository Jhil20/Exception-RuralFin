import React from "react";
import { User, Star, ChevronRight } from "lucide-react";

const AgentList = ({ agents }) => {
  return (
    <div className="bg-gray-50  h-full rounded-2xl p-8 shadow-md shadow-gray-300">
      <h3 className="text-xl font-semibold text-black mb-6">Select an Agent</h3>

      <div className="flex gap-4">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className="bg-gray-100 ring-1 ring-gray-300 flex-1 mx-0.5 cursor-pointer p-5 rounded-lg shadow-md hover:shadow-lg shadow-black/30 transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex items-center mb-4">
              <div className="bg-gray-900 p-2 rounded-full mr-4">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-black text-lg font-semibold">
                  {agent.name}
                </span>
                <div className="flex items-center text-gray-900 text-sm">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  {agent.rating}
                </div>
              </div>
            </div>

            <div className="text-gray-600 text-sm">{agent.location}</div>
          </div>
        ))}
        {/* View More Box */}
        <div className="bg-black  p-5 rounded-lg shadow-md hover:shadow-lg shadow-black/40 transition-all duration-300 transform hover:scale-105 cursor-pointer flex items-center justify-center">
          <span className="text-white text-lg font-semibold mr-">View More</span>
          <ChevronRight className="w-5 h-5 text-white mt-[2px]" />
        </div>
      </div>
    </div>
  );
};

export default AgentList;

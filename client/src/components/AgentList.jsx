import React from "react";
import { User, Star, ChevronRight } from "lucide-react";

const AgentList = ({ agents }) => {
  return (
    <div className="bg-black rounded-2xl p-8 shadow-lg">
      <h3 className="text-xl font-semibold text-white mb-6">Select an Agent</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className="bg-gray-800/80 cursor-pointer p-5 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
          >
            <div className="flex items-center mb-4">
              <div className="bg-gray-700 p-2 rounded-full mr-4">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-white text-lg font-semibold">
                  {agent.name}
                </span>
                <div className="flex items-center text-gray-400 text-sm">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  {agent.rating}
                </div>
              </div>
            </div>

            <div className="text-gray-400 text-sm">{agent.location}</div>
          </div>
        ))}
        {/* View More Box */}
        <div className="bg-black  p-5 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer flex items-center justify-center">
          <span className="text-white text-lg font-semibold mr-2">View More</span>
          <ChevronRight className="w-5 h-5 text-white" />
        </div>
      </div>
    </div>
  );
};

export default AgentList;

import React, { useEffect, useState } from "react";
import { User, Star, ChevronRight } from "lucide-react";
import axios from "axios";
import { BACKEND_URL } from "../utils/constants";
import capitalize from "../utils/capitalize";

const AgentList = ({
  setShowAgentDetails,
  setSelectedAgent,
  setShowAgentsViewMore,
}) => {
  const [allAgents, setAllAgents] = useState([]);
  useEffect(() => {
    getAgents();
  }, []);

  const getAgents = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/agent/`);
      console.log("response of geting agents", response);
      setAllAgents(response?.data?.agents);
    } catch (err) {
      console.log("error in fetching agents", err);
    }
  };

  return (
    <div className="bg-gray-50  h-full rounded-2xl p-8 shadow-md shadow-gray-300">
      <h3 className="text-xl font-semibold text-black mb-6">Select an Agent</h3>

      <div className="grid grid-cols-4 gap-4">
        {allAgents.map((agent) => (
          <div
            key={agent?._id}
            onClick={() => {
              setSelectedAgent(agent);
              setShowAgentDetails(true);
            }}
            className="bg-gray-100 ring-1 ring-gray-300  mx-0.5 cursor-pointer p-5 rounded-lg shadow-md hover:shadow-lg shadow-black/30 transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex items-center">
              <div className="bg-gray-900 p-2 rounded-full mr-4">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-black text-lg font-semibold">
                  {capitalize(agent?.firstName) +
                    " " +
                    capitalize(agent?.lastName)}
                </span>
                <span className="text-gray-700 text-sm my-1 font-normal">
                  Amount: ₹{agent?.balance}
                </span>
                <div className="text-gray-700 text-sm  ">
                  Address : {agent?.address}
                </div>

                {/* <div className="flex items-center text-gray-900 text-sm">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  {agent?.rating}
                </div> */}
              </div>
            </div>
          </div>
        ))}
        {/* View More Box */}
        <div
          onClick={() => setShowAgentsViewMore(true)}
          className="bg-black  p-5 rounded-lg shadow-md hover:shadow-lg shadow-black/40 transition-all duration-300 transform hover:scale-105 cursor-pointer flex items-center justify-center"
        >
          <span className="text-white text-lg font-semibold mr-">
            View More
          </span>
          <ChevronRight className="w-5 h-5 text-white mt-[2px]" />
        </div>
      </div>
    </div>
  );
};

export default AgentList;

import { Search, User, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../utils/constants";
import capitalize from "../utils/capitalize";
import Cookies from "js-cookie";

const AgentsViewMore = ({
  setShowAgentsViewMore,
  setSelectedAgent,
  setShowAgentDetails,
}) => {
  const [searchInput, setSearchInput] = useState("");
  const [allAgents, setAllAgents] = useState([]);
  const [filteredAgents, setFilteredAgents] = useState([]);
  useEffect(() => {
    getAgents();
  }, []);
  const token = Cookies.get("token");

  const getAgents = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/agent/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //console.log("response of geting agents", response);
      setAllAgents(response?.data?.agents);
      setFilteredAgents(response?.data?.agents);
    } catch (err) {
      console.log("error in fetching agents", err);
    }
  };
  return (
    <div className="bg-white h-11/12 w-11/12 lg:w-9/12 rounded-2xl shadow-xl transition-all duration-300 transform animate-fade-in">
      <div className="flex justify-between items-center h-18 mt-2 px-6 pb-2 border-b border-gray-300">
        <h2 className="text-2xl ml-2 font-semibold text-gray-900">
          Agent List
        </h2>
        <button
          onClick={() => {
            setShowAgentsViewMore(false);
          }}
          className="p-2 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors duration-200 group"
          aria-label="Close"
        >
          <X
            size={24}
            className="text-gray-500 group-hover:text-gray-900 transition-colors duration-200"
          />
        </button>
      </div>
      <div className="w-full flex justify-center items-center mt-4 h-1/12 p-2">
        <div className="relative border-1 border-gray-300 rounded-lg hover:border-black focus-within:border-black transition-all duration-300 w-9/12 h-10">
          <Search
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search Agents..."
            value={searchInput}
            className="w-full h-full pl-10 pr-4 rounded-lg outline-none"
            onChange={(e) => {
              const value = e.target.value.toLowerCase();
              setSearchInput(e.target.value);
              setFilteredAgents(
                allAgents.filter(
                  (agent) =>
                    agent?.city.toLowerCase().includes(value) ||
                    agent?.state.toLowerCase().includes(value) ||
                    agent?.country.toLowerCase().includes(value) ||
                    agent?.zipCode.toLowerCase().includes(value) ||
                    (agent?.firstName + " " + agent?.lastName)
                      .toLowerCase()
                      .includes(value)
                )
              );
            }}
          />
        </div>
      </div>
      <div className={`h-9/12  overflow-y-auto p-4 px-8 ${filteredAgents.length ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 lg:grid-rows-3 md:gap-6":""} justify-items-center`}>
        {filteredAgents?.map((agent) => (
          <div
            key={agent?._id}
            onClick={() => {
              setSelectedAgent(agent);
              setShowAgentDetails(true);
            }}
            className="bg-white ring-1 w-full ring-gray-300 h-fit mx-0.5 cursor-pointer p-5 rounded-lg shadow-md hover:shadow-lg shadow-black/30 transition-all duration-300 transform hover:scale-101"
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
                <span className="text-gray-700 text-sm font-normal">
                  Amount: ₹{agent?.balance}
                </span>
                <div className="text-gray-700 text-sm  ">
                  City : {agent?.city}
                </div>
                <div className="text-gray-700 text-sm  ">
                  State : {agent?.state}
                </div>
                <div className="text-gray-700 text-sm  ">
                  Country : {agent?.country} - {agent?.zipCode}
                </div>
                <div className="text-gray-700 text-sm">
                  Phone : {agent?.phone}
                </div>
              </div>
            </div>
          </div>
        ))}
        {filteredAgents.length == 0 && (
          <div className="w-40 md:w-fit  h-full flex items-center justify-center">
            <h1 className="text-xl md:text-2xl text-center font-semibold text-gray-500">
              No Matching Agents Found
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentsViewMore;

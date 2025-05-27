import { User, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../utils/constants";
import capitalize from "../utils/capitalize";

const AgentsViewMore = ({
  setShowAgentsViewMore,
  setSelectedAgent,
  setShowAgentDetails,
}) => {
  const [searchInput, setSearchInput] = useState("");
  const [allAgents, setAllAgents] = useState([]);
  const [filteredAgents, setFilteredAgents] = useState([]);
  const [searchBy, setSearchBy] = useState("name");
  useEffect(() => {
    getAgents();
  }, []);

  const getAgents = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/agent/`);
      console.log("response of geting agents", response);
      setAllAgents(response?.data?.agents);
      setFilteredAgents(response?.data?.agents);
    } catch (err) {
      console.log("error in fetching agents", err);
    }
  };
  return (
    <div className="bg-white h-11/12 w-2/3 rounded-2xl shadow-xl transition-all duration-300 transform animate-fade-in">
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
        <input
          type="text"
          placeholder="Search Agents..."
          value={searchInput}
          className="w-6/12 h-10 px-4 border border-gray-300 rounded-lg hover:border-black focus:border-black transition-all duration-300"
          onChange={(e) => {
            if (searchBy == "name") {
              setSearchInput(e.target.value);
              setFilteredAgents(
                allAgents.filter((agent) =>
                  (agent?.firstName + " " + agent?.lastName)
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
                )
              );
            }else{
                setSearchInput(e.target.value);
                setFilteredAgents(
                    allAgents.filter((agent) =>
                    agent?.address.toLowerCase().includes(e.target.value.toLowerCase())
                    )
                );
            }
          }}
        ></input>
        <div className="flex h-full items-center ml-4 space-x-3">
          <button
            onClick={() => setSearchBy("name")}
            className={`py-2 px-5 rounded-lg cursor-pointer border transition-all duration-200 shadow-sm hover:shadow-md 
      ${
        searchBy === "name"
          ? "bg-black text-white border-black ring-1 ring-black"
          : "bg-white text-black border-gray-300 hover:bg-gray-100"
      }`}
          >
            Search by Name
          </button>
          <button
            className={`py-2 px-5 rounded-lg border cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md 
      ${
        searchBy === "address"
          ? "bg-black text-white border-black ring-1 ring-black"
          : "bg-white text-black border-gray-300 hover:bg-gray-100"
      }`}
            onClick={() => setSearchBy("address")}
          >
            Search by Address
          </button>
        </div>
      </div>
      <div className="h-9/12 overflow-y-auto p-4 px-8 grid grid-cols-4 grid-rows-3 gap-4 justify-items-center">
        {filteredAgents?.map((agent) => (
          <div
            key={agent?._id}
            onClick={() => {
              setSelectedAgent(agent);
              setShowAgentDetails(true);
            }}
            className="bg-white ring-1 ring-gray-300  mx-0.5 cursor-pointer p-5 rounded-lg shadow-md hover:shadow-lg shadow-black/30 transition-all duration-300 transform hover:scale-101"
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
                  Amount: ₹{agent?.securityDeposit}
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
      </div>
    </div>
  );
};

export default AgentsViewMore;

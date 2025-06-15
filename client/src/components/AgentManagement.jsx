import { useMemo, useState } from "react";
import { Search, AlertTriangle, CheckCircle, Wallet } from "lucide-react";
import Card from "../components/Card";
import AgentDetailsModal from "./AgentDetailsModal";
import { BACKEND_URL } from "../utils/constants";
import { useEffect } from "react";
import axios from "axios";
import capitalize from "../utils/capitalize";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { getSocket } from "../utils/socket";

const AgentManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [agents, setAgents] = useState([]);
  const [filteredAgents, setFilteredAgents] = useState([]);
  const token = Cookies.get("token");
  const decoded = useMemo(() => {
    if (!token) return null;
    return jwtDecode(token);
  }, [token]);

  useEffect(() => {
    if (!decoded) return;
    console.log("Decoded token: for socket in agent", decoded);

    const socket = getSocket(decoded.id);
    const handler1 = (data) => {
      // console.log("New account created: handler1", data);
      if (data?.role == "agent") {
        setAgents((prevAgents) => [...prevAgents, data]);
        setFilteredAgents((prevAgents) => [...prevAgents, data]);
      }
    };
    socket.on("newAccountCreatedBackend", handler1);
    return () => {
      socket.off("newAccountCreatedBackend", handler1);
    };
  }, [decoded]);

  const handleViewDetails = (agent) => {
    setSelectedAgent(agent);
    setIsModalOpen(true);
  };

  const getAgentData = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/agent/`);
      console.log("Agent data fetched successfully:", response.data);
      setAgents(response.data.agents);
      setFilteredAgents(response.data.agents);
    } catch (error) {
      console.error("Error fetching agent data:", error);
    }
  };

  useEffect(() => {
    getAgentData();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <span className="badge badge-success flex justify-center items-center text-green-600 bg-green-100 px-2 py-1 rounded-full text-sm font-medium">
            <CheckCircle size={12} className="mr-1" />
            Active
          </span>
        );
      case "inactive":
        return (
          <span className="badge badge-danger flex justify-center items-center text-red-600 bg-red-100 px-2 py-1 rounded-full text-sm font-medium">
            <AlertTriangle size={12} className="mr-1" />
            Inactive
          </span>
        );
      case "pending":
        return (
          <span className="badge badge-warning flex justify-center items-center text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full text-sm font-medium">
            <AlertTriangle size={12} className="mr-1" />
            Pending
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6  h-12/12  mt-2 ml-3 w-[82vw]">
      <div className="flex h-fit items-center gap-4 mb-7">
        <div className="flex items-start w-7/12 flex-wrap">
          <div className="flex flex-row  mb-4 w-full items-center justify-between gap-4">
            <h1 className="text-2xl font-bold text-gray-800">
              Agent Management
            </h1>
          </div>
          <div className="relative w-full bg-white h-14 rounded-xl flex-1">
            <input
              type="text"
              placeholder="Search agents by name or ID..."
              className=" w-full h-full border-gray-300 rounded-xl   hover:border-gray-400 focus:border-gray-400 transition-all duration-300 border-2 outline-0 py-2 pl-10"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                const filter = agents.filter(
                  (agent) =>
                    (agent?.firstName + " " + agent?.lastName)
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    agent._id.toString().includes(searchTerm)
                );
                setFilteredAgents(filter);
              }}
            />
            <Search
              size={18}
              className="absolute left-[14px] mt-1 top-4 text-gray-400"
            />
          </div>
        </div>
        <div className="grid w-5/12 mt-1 grid-cols-2 gap-6">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Agents</p>
                <p className="text-2xl font-bold text-gray-800">
                  {agents?.length}
                </p>
              </div>
              <div className="p-3 bg-gray-200 rounded-lg text-gray-800">
                <Wallet size={20} />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Active Agents</p>
                <p className="text-2xl font-bold text-gray-800">
                  {agents?.length}
                </p>
              </div>
              <div className="p-3 bg-gray-200 rounded-lg text-gray-800">
                <CheckCircle size={20} />
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="bg-gray-100 h-[67vh] rounded-2xl overflow-y-auto hover:shadow-gray-300 hover:shadow-lg transition-all duration-300 ">
        <div className="bg-white h-full rounded-xl border-2 border-gray-300 ">
          <div className="bg-gray-200 grid grid-cols-5 p-3 rounded-t-md text-sm font-semibold  text-gray-700">
            <span className="w-full text-center">Agent ID</span>
            <span className="w-full text-center">Name</span>
            <span className="w-full text-center">Security Deposit</span>
            <span className="w-full text-center">Balance</span>
            <span className="w-full text-center">Status</span>
          </div>
          <div className="h-14/16  overflow-y-auto">
            {filteredAgents.map((agent) => (
              <div
                key={agent._id}
                onClick={() => handleViewDetails(agent)}
                className="grid text-center h-13.4 border-b-1 w-full border-gray-300 px-4 grid-cols-5  hover:bg-gray-100 cursor-pointer rounded-md"
              >
                <div className="px-1 flex items-center justify-center pr-2 py-3">
                  #{agent._id.toLocaleString()}
                </div>

                <div className="px-1 py-3 flex items-center pl-2 justify-center font-medium text-gray-800">
                  {capitalize(agent?.firstName) +
                    " " +
                    capitalize(agent?.lastName)}
                </div>

                <div className="px-1 flex items-center pl-4 justify-center py-3">
                  ₹{agent.securityDeposit.toLocaleString()}
                </div>

                <div className="px-1 flex items-center pl-7 justify-center py-3">
                  ₹{agent.balance.toLocaleString()}
                </div>

                <div className=" pl-9 mx-10 py-3">
                  {getStatusBadge(agent?.isActive ? "active" : "inactive")}
                </div>
              </div>
            ))}
          </div>
        </div>

        {filteredAgents.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">
              No agents found matching your search criteria.
            </p>
          </div>
        )}
      </div>

      {selectedAgent && (
        <AgentDetailsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          agent={selectedAgent}
        />
      )}
    </div>
  );
};

export default AgentManagement;

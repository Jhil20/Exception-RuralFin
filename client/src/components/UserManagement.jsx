import { useEffect, useMemo, useState } from "react";
import { Search, AlertTriangle, CheckCircle, Wallet } from "lucide-react";
import Card from "../components/Card";
import UserDetailsModal from "./UserDetailsModal";
import axios from "axios";
import { BACKEND_URL } from "../utils/constants";
import capitalize from "../utils/capitalize";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { getSocket } from "../utils/socket";

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFilter, setCurrentFilter] = useState("all");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  // const filteredUsers =

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };
  const token = Cookies.get("token");
  const decoded = useMemo(() => {
    if (!token) return null;
    return jwtDecode(token);
  }, [token]);

  useEffect(() => {
    if (!decoded) return;
    // console.log("Decoded token: for socket in user", decoded);

    const socket = getSocket(decoded.id);

    const handler1 = (data) => {
      // console.log("New account user created: handler1", data);
      if (data?.role === "user") {
        setUsers((prevUsers) => [...prevUsers, data]);
        setFilteredUsers((prevUsers) => [...prevUsers, data]);
      }
    };

    socket.on("newAccountCreatedBackend", handler1);

    return () => {
      socket.off("newAccountCreatedBackend", handler1);
    };
  }, [decoded]);

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
      case "suspended":
      case "pending":
        return (
          <span className="badge badge-warning flex justify-center items-center text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full text-sm font-medium">
            <AlertTriangle size={12} className="mr-1" />
            {status?.charAt(0)?.toUpperCase() + status?.slice(1)}
          </span>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/user/getAllUsersWithFinance`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("User data fetched successfully:", response.data);
      setUsers(response?.data?.data);
      setFilteredUsers(response?.data?.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <div className="space-y-0 p-3 h-9/12">
      <div className="flex h-fit items-center gap-4 mb-6">
        <div className="flex items-start w-4/12 flex-wrap">
          <div className="flex flex-row mt-1 mb-4 w-full items-center justify-between gap-4">
            <h1 className="text-2xl font-bold text-gray-800">
              User Management
            </h1>
          </div>
          <div className="relative w-full bg-white h-14 rounded-xl flex-1">
            <input
              type="text"
              placeholder="Search users by name or ID..."
              className="w-full h-full border-gray-300 rounded-xl hover:border-gray-400 focus:border-gray-400 transition-all duration-300 border-2 outline-0 py-2 pl-10"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e?.target?.value);
                const filter = users.filter(
                  (user) =>
                    (user?.name
                      ?.toLowerCase()
                      ?.includes(searchTerm?.toLowerCase()) ||
                      user?.ruralFinID?.includes(searchTerm)) &&
                    (currentFilter === "all" || user?.status === currentFilter)
                );
                setFilteredUsers(filter);
              }}
            />
            <Search
              size={18}
              className="absolute left-[14px] mt-1 top-4 text-gray-400"
            />
          </div>
        </div>
        <div className="grid w-8/12 mt-1 grid-cols-3 gap-6">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Users</p>
                <p className="text-2xl font-bold text-gray-800">
                  {users?.length || "0"}
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
                <p className="text-gray-500 text-sm">Active Users</p>
                <p className="text-2xl font-bold text-gray-800">
                  {users?.filter((user) => user?.isActive == true)?.length}
                </p>
              </div>
              <div className="p-3 bg-gray-200 rounded-lg text-gray-800">
                <CheckCircle size={20} />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">With Budget Plans</p>
                <p className="text-2xl font-bold text-gray-800">
                  {
                    users?.filter(
                      (user) => user?.finance?.isBudgetPlanningEnabled == true
                    )?.length
                  }
                </p>
              </div>
              <div className="p-3 bg-gray-200 rounded-lg text-gray-800">
                <Wallet size={20} />
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="bg-gray-100 h-[64vh] rounded-2xl mt-8 hover:shadow-gray-300 hover:shadow-lg transition-all duration-300">
        <div className="bg-white h-full overflow-y-auto rounded-xl border-2 border-gray-300">
          <div className="bg-gray-200 grid grid-cols-7 p-3 justify-items-center rounded-t-md text-sm font-semibold text-gray-700 text-center">
            <span className="text-center pl-11">User ID</span>
            <span className="text-center pl-12">Name</span>
            <span className="text-center pl-12">Rural Fin ID</span>
            <span className="text-center pl-13">Wallet Balance</span>
            <span className="text-center pl-7">Budget Status</span>
            <span className="text-center pl-6">Status</span>
            <span className="text-center">Last User Activity</span>
          </div>
          <div className="h-14/16 overflow-y-auto">
            {filteredUsers?.map((user) => (
              <div
                key={user?._id}
                onClick={() => handleViewDetails(user)}
                className="grid w-full grid-cols-7  border-b border-b-gray-300 text-center px-4 py-3 items-center hover:bg-gray-100 cursor-pointer"
              >
                <div className="pr-1">#{user?._id}</div>
                <div className="font-medium text-gray-800 ml-11">
                  {capitalize(user?.firstName) +
                    " " +
                    capitalize(user?.lastName)}
                </div>
                <div className="pl-3 text-center ">{user?.ruralFinId}</div>
                <div className="pl-13">
                  ₹{user?.finance?.balance?.toLocaleString()}
                </div>
                <div className="pl-8 mx-3">
                  {getStatusBadge(
                    user?.finance?.isBudgetPlanningEnabled
                      ? "active"
                      : "inactive"
                  )}
                </div>
                <div className="pl-7 mx-4">
                  {getStatusBadge(user?.isActive ? "active" : "inactive")}
                </div>
                <div className="pl-4">
                  {new Date(
                    Math.max(
                      new Date(user?.finance?.updatedAt)?.getTime(),
                      new Date(user?.updatedAt)?.getTime()
                    )
                  )?.toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {filteredUsers?.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">
              No users found matching your search criteria.
            </p>
          </div>
        )}
      </div>

      {selectedUser && (
        <UserDetailsModal
          isOpen={isModalOpen}
          onClose={() => {setIsModalOpen(false)
            setSelectedUser(null);
          }}
          user={selectedUser}
        />
      )}
    </div>
  );
};

export default UserManagement;

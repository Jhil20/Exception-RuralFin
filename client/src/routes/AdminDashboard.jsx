import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../components/AdminSidebar";
import AgentManagement from "../components/AgentManagement";
import UserManagement from "../components/UserManagement";
import AgentCommissions from "../components/AgentCommissions";
import PlatformSettings from "../components/PlatformSettings";
import AdminOverview from "../components/AdminOverview";
import useAuth from "../utils/useAuth";

const AdminDashboard = () => {
  useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "overview":
        return <AdminOverview />;
      case "agents":
        return <AgentManagement />;
      case "users":
        return <UserManagement />;
      case "withdrawals":
        return <WithdrawalQueue />;
      case "commissions":
        return <AgentCommissions />;
      case "analytics":
        return <BudgetAnalytics />;
      case "settings":
        return <PlatformSettings />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="flex h-[90.7vh] bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className=" h-full w-full flex flex-col overflow-hidden">
        <main className=" h-full w-full overflow-y-auto p-4 md:p-3">
          {renderActiveComponent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;

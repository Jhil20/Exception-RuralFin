import React from "react";
import {
  LayoutDashboard,
  Users,
  UserCog,
  BadgeDollarSign,
  AlertTriangle,
  BarChart3,
  DollarSign,
  Settings,
} from "lucide-react";

const NavItem = ({ icon, label, isActive, onClick }) => {
  return (
    <li
      className={`flex items-center p-3 rounded-xl cursor-pointer transition-all duration-200 ${
        isActive ? "bg-gray-200 text-black" : "text-gray-500 hover:bg-gray-100"
      }`}
      onClick={onClick}
    >
      <span className="mr-3">{icon}</span>
      <span
        className={`transition-all duration-300 ${
          isActive ? "font-semibold" : "font-medium"
        }`}
      >
        {label}
      </span>
    </li>
  );
};

const AdminSidebar = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: "overview", label: "Overview", icon: <LayoutDashboard size={20} /> },
    { id: "agents", label: "Agent Management", icon: <UserCog size={20} /> },
    { id: "users", label: "User Management", icon: <Users size={20} /> },
    
    // {
    //   id: "fraud",
    //   label: "Fraud Detection",
    //   icon: <AlertTriangle size={20} />,
    // },
    {
      id: "commissions",
      label: "Agent Commissions",
      icon: <BadgeDollarSign size={20} />,
    },
    {
      id: "settings",
      label: "Platform Settings",
      icon: <Settings size={20} />,
    },
  ];

  return (
    <aside
      className={`bg-white shadow-md transition-all duration-300 ease-in-out w-64 flex flex-col`}
    >
      <nav className="flex-1 px-4 py-6 overflow-y-auto">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <NavItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              isActive={activeTab === item.id}
              onClick={() => setActiveTab(item.id)}
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;

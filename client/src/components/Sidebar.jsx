import React from 'react';
import { 
  LayoutDashboard, 
  Repeat, 
  ShieldCheck, 
  Users, 
  MapPin, 
  Settings, 
  LogOut 
} from 'lucide-react';

const Sidebar = ({ activeSection, onNavigate }) => {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={20} /> },
    { id: 'transactions', label: 'Transactions', icon: <Repeat size={20} /> },
    { id: 'security', label: 'Security Bond', icon: <ShieldCheck size={20} /> },
    { id: 'users', label: 'User Management', icon: <Users size={20} /> },
    { id: 'nearby', label: 'Nearby Agents', icon: <MapPin size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <aside className="w-64 bg-black text-white h-full flex flex-col">
      <div className="p-5 border-b border-gray-800">
        <h1 className="text-xl font-bold">FinTrust Agent</h1>
        <p className="text-sm text-gray-400 mt-1">Financial Inclusion Platform</p>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4">
        <ul>
          {navItems.map((item) => (
            <li key={item.id} className="mb-1">
              <button
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center px-5 py-3 text-left transition-colors duration-200 ${
                  activeSection === item.id 
                    ? 'bg-white text-black font-medium' 
                    : 'text-gray-300 hover:bg-gray-900'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-800">
        <button 
          className="flex items-center text-gray-300 hover:text-white w-full px-3 py-2"
        >
          <LogOut size={20} className="mr-3" />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

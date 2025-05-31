import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../components/AdminSidebar';
import Overview from '../components/AdminOverview';
import AgentManagement from '../components/AgentManagement';
import UserManagement from '../components/UserManagement';
import AgentCommissions from '../components/AgentCommissions';
import PlatformSettings from '../components/PlatformSettings';

const AdminDashboard=()=> {
  const [activeTab, setActiveTab] = useState('overview');
  

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview />;
      case 'agents':
        return <AgentManagement />;
      case 'users':
        return <UserManagement />;
      case 'withdrawals':
        return <WithdrawalQueue />;
    //   case 'fraud':
    //     return <FraudDetection />;
      case 'commissions':
        return <AgentCommissions />;
      case 'analytics':
        return <BudgetAnalytics />;
      case 'settings':
        return <PlatformSettings />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="flex h-[90.7vh] bg-gray-100">
      

      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      <div className="flex-1 flex flex-col overflow-hidden">

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {renderActiveComponent()}
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;

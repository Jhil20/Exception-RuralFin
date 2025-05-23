import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Overview from './Overview';
import Transactions from './Transactions';
import SecurityBond from './SecurityBond';
import UserManagement from './UserManagement';
import NearbyAgents from './NearbyAgents';
import Settings from './Settings';

// Mock data
const mockAgent = {
  id: 'AG12345',
  name: 'Aditi Sharma',
  balance: 7500,
  securityDeposit: 10000,
  bondStartDate: '2024-10-15',
  bondEndDate: '2025-04-15',
  commissionEarned: 2450,
  transactionsProcessed: 142,
  activeUsers: 38,
  status: 'active',
  location: {
    address: '123 Main Street, Rajpur Village',
    district: 'Nashik',
    state: 'Maharashtra',
    coordinates: { lat: 19.9975, lng: 73.7898 }
  },
  availableLiquidity: 7500,
  commissionRate: 1.5,
  pendingWithdrawals: 2,
  bondCompletionPercentage: 35
};

const AgentDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const renderActiveComponent = () => {
    switch (activeSection) {
      case 'overview':
        return <Overview agentData={mockAgent} />;
      case 'transactions':
        return <Transactions />;
      case 'security':
        return <SecurityBond bondData={mockAgent} />;
      case 'users':
        return <UserManagement />;
      case 'nearby':
        return <NearbyAgents />;
      case 'settings':
        return <Settings agent={mockAgent} />;
      default:
        return <Overview agentData={mockAgent} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        activeSection={activeSection} 
        onNavigate={setActiveSection} 
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header agentData={mockAgent} />
        <main className="flex-1 overflow-y-auto bg-white p-4">
          {renderActiveComponent()}
        </main>
      </div>
    </div>
  );
};

export default AgentDashboard;

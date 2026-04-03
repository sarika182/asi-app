import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import HeaderBar from '../components/HeaderBar';
import CancellationPolicies from '../modules/policies/CancellationPolicies';
import RateAdjustmentPanel from '../modules/rates/RateAdjustmentPanel';
import '../styles/tokens.css';
import './PoliciesPage.css';

const PoliciesPage: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeNavKey, setActiveNavKey] = useState('calendar');

  const handleSidebarToggle = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  const handleNavigate = (key: string) => {
    setActiveNavKey(key);
  };

  const handleSearch = (_value: string) => {
    // Global search handler
  };

  const renderContent = () => {
    switch (activeNavKey) {
      case 'calendar':
        return (
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 600, margin: 0 }}>Calendar View</h1>
          </div>
        );
      case 'cancellation-policies':
        return <CancellationPolicies />;
      case 'rate-adjustment-panel':
        return <RateAdjustmentPanel />;
      default:
        return (
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 600, margin: 0 }}>Calendar View</h1>
          </div>
        );
    }
  };

  return (
    <div className="policies-page">
      <Sidebar
        collapsed={sidebarCollapsed}
        activeKey={activeNavKey}
        onNavigate={handleNavigate}
        onToggle={handleSidebarToggle}
      />

      <HeaderBar
        sidebarCollapsed={sidebarCollapsed}
        onSearch={handleSearch}
      />

      <main className={`policies-main ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <div className="policies-content">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default PoliciesPage;

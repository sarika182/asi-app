import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import HeaderBar from '../components/HeaderBar';
import CancellationPolicies from '../modules/policies/CancellationPolicies';
import RateAdjustmentPanel from '../modules/rates/RateAdjustmentPanel';
import LateCheckout from '../modules/front-desk/LateCheckout';
import BatchFolio from '../modules/front-desk/BatchFolio';
import Calendar from '../modules/calendar/Calendar';
import Reports from '../modules/reports/Reports';
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
        return <Calendar />;
      case 'cancellation-policies':
        return <CancellationPolicies />;
      case 'rate-adjustment-panel':
        return <RateAdjustmentPanel />;
      case 'late-checkout':
        return <LateCheckout />;
      case 'batch-folio':
        return <BatchFolio />;
      case 'reports':
        return <Reports />;
      default:
        return <Calendar />;
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

      <main className={`policies-main ${sidebarCollapsed ? 'sidebar-collapsed' : ''} ${activeNavKey === 'calendar' ? 'calendar-active' : ''}`}>
        <div className={`policies-content ${activeNavKey === 'calendar' ? 'calendar-active' : ''}`}>
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default PoliciesPage;

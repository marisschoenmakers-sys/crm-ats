import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { Topbar } from '../components/Topbar';
import type { CRMPage } from '../types';

interface MainLayoutProps {
  children: React.ReactNode;
  activePage?: CRMPage;
  onChangePage?: (page: CRMPage) => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  activePage = 'dashboard',
  onChangePage 
}) => {
  const handleSidebarItemClick = (page: CRMPage) => {
    onChangePage?.(page);
    console.log('Navigate to:', page);
  };

  const handleSearch = (query: string) => {
    console.log('Search query:', query);
  };

  const handleNewClick = () => {
    console.log('New item clicked');
  };

  const handleNotificationClick = () => {
    console.log('Notifications clicked');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f7' }} className="flex">
      {/* Sidebar */}
      <Sidebar 
        activePage={activePage}
        onChangePage={handleSidebarItemClick}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <Topbar
          onSearch={handleSearch}
          onNewClick={handleNewClick}
          onNotificationClick={handleNotificationClick}
          userName="Maris"
        />

        {/* Page Content */}
        <main className="main-content">
          <div className="page-container">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Topbar } from '../components/Topbar';
import type { CRMPage } from '../types';

interface MainLayoutProps {
  children?: React.ReactNode;
}

// Map URL paths to CRMPage types
const getActivePageFromPath = (pathname: string): CRMPage => {
  if (pathname === '/' || pathname.startsWith('/dashboard')) return 'dashboard';
  if (pathname.startsWith('/vacancies')) return 'vacancies';
  if (pathname.startsWith('/companies')) return 'companies';
  if (pathname.startsWith('/candidates')) return 'candidates';
  if (pathname.startsWith('/talentpools')) return 'talentpools';
  if (pathname.startsWith('/mailbox')) return 'mailbox';
  if (pathname.startsWith('/analytics')) return 'analytics';
  if (pathname.startsWith('/settings')) return 'settings';
  return 'dashboard';
};

// Map CRMPage types to URL paths
const getPathFromPage = (page: CRMPage): string => {
  switch (page) {
    case 'dashboard': return '/';
    case 'vacancies': return '/vacancies';
    case 'vacancyDetail': return '/vacancies';
    case 'companies': return '/companies';
    case 'companyDetail': return '/companies';
    case 'candidates': return '/candidates';
    case 'candidateDetail': return '/candidates';
    case 'talentpools': return '/talentpools';
    case 'mailbox': return '/mailbox';
    case 'analytics': return '/analytics';
    case 'settings': return '/settings';
    default: return '/';
  }
};

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const activePage = getActivePageFromPath(location.pathname);

  const handleSidebarItemClick = (page: CRMPage) => {
    navigate(getPathFromPage(page));
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearch = (query: string) => {
    console.log('Search query:', query);
  };

  const handleNotificationClick = () => {
    console.log('Notifications clicked');
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      width: '100%',
      backgroundColor: 'var(--color-bg-secondary)',
      color: 'var(--color-text)',
      display: 'flex'
    }}>
      {/* Mobile Overlay */}
      <div 
        className={`mobile-overlay ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={handleMobileMenuToggle}
      />

      {/* Sidebar */}
      <Sidebar 
        activePage={activePage}
        onChangePage={handleSidebarItemClick}
        className={isMobileMenuOpen ? 'open' : ''}
      />

      {/* Main Content Area */}
      <div className="main-content">
        {/* Topbar */}
        <Topbar
          onSearch={handleSearch}
          onNotificationClick={handleNotificationClick}
          userName="Maris"
          onMobileMenuToggle={handleMobileMenuToggle}
        />

        {/* Page Content */}
        <main className="page-container">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

import React from 'react';
import {
  DashboardIcon,
  VacancyIcon,
  CompanyIcon,
  CandidateIcon,
  TalentPoolIcon,
  MailIcon,
  AnalyticsIcon
} from '../icons';
import type { CRMPage } from '../types';

interface SidebarProps {
  activePage?: CRMPage;
  onChangePage?: (page: CRMPage) => void;
}

const sidebarItems = [
  {
    id: 'dashboard' as CRMPage,
    label: 'Dashboard',
    icon: DashboardIcon,
  },
  {
    id: 'vacancies' as CRMPage,
    label: 'Vacatures',
    icon: VacancyIcon,
  },
  {
    id: 'companies' as CRMPage,
    label: 'Bedrijven',
    icon: CompanyIcon,
  },
  {
    id: 'candidates' as CRMPage,
    label: 'Kandidaten',
    icon: CandidateIcon,
  },
  {
    id: 'talentpools' as CRMPage,
    label: 'Talentpools',
    icon: TalentPoolIcon,
  },
  {
    id: 'mailbox' as CRMPage,
    label: 'Mailbox',
    icon: MailIcon,
  },
  {
    id: 'analytics' as CRMPage,
    label: 'Analytics',
    icon: AnalyticsIcon,
  }
];

export const Sidebar: React.FC<SidebarProps> = ({ 
  activePage = 'dashboard',
  onChangePage 
}) => {
  const handleItemClick = (page: CRMPage) => {
    onChangePage?.(page);
  };

  return (
    <div className="sidebar">
      {/* Header */}
      <div style={{ padding: '16px', borderBottom: '1px solid #374151' }}>
        <h1 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white', margin: 0 }}>
          CRM-ATS
        </h1>
      </div>

      {/* Navigation */}
      <nav style={{ padding: '8px' }}>
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`sidebar-item ${isActive ? 'active' : ''}`}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px',
                padding: '12px 16px',
                color: 'white',
                backgroundColor: isActive ? '#2563eb' : 'transparent',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
                width: '100%',
                textAlign: 'left',
                fontSize: '14px'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = '#374151';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <Icon style={{ width: '20px', height: '20px' }} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

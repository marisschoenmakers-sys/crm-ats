import React from 'react';
import {
  DashboardIcon,
  VacancyIcon,
  CompanyIcon,
  CandidateIcon,
  TalentPoolIcon,
  MailIcon,
  AnalyticsIcon,
  SettingsIcon
} from '../icons';
import type { CRMPage } from '../types';

interface SidebarProps {
  activePage?: CRMPage;
  onChangePage?: (page: CRMPage) => void;
  className?: string;
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
  },
  {
    id: 'settings' as CRMPage,
    label: 'Instellingen',
    icon: SettingsIcon,
  }
];

export const Sidebar: React.FC<SidebarProps> = ({ 
  activePage = 'dashboard',
  onChangePage,
  className
}) => {
  const handleItemClick = (page: CRMPage) => {
    onChangePage?.(page);
  };

  return (
    <div className={`sidebar ${className || ''}`} style={{ backgroundColor: 'var(--color-sidebar-bg)' }}>
      {/* Header */}
      <div style={{ padding: '16px', borderBottom: '1px solid var(--color-sidebar-border)' }}>
        <h1 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--color-sidebar-text)', margin: 0 }}>
          ATS
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
                color: 'var(--color-sidebar-text)',
                backgroundColor: isActive ? 'var(--color-sidebar-active)' : 'transparent',
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
                  e.currentTarget.style.backgroundColor = 'var(--color-sidebar-hover)';
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

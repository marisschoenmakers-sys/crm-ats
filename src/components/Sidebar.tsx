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
  className?: string;
  isCollapsed?: boolean;
  onHoverChange?: (isHovered: boolean) => void;
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
  onChangePage,
  className,
  isCollapsed = false,
  onHoverChange
}) => {
  const handleItemClick = (page: CRMPage) => {
    onChangePage?.(page);
  };

  const showLabels = !isCollapsed;

  return (
    <div 
      className={`sidebar ${className || ''}`} 
      style={{ 
        backgroundColor: 'var(--color-sidebar-bg)',
        width: isCollapsed ? '64px' : '180px',
        transition: 'width 0.3s ease'
      }}
      onMouseEnter={() => onHoverChange?.(true)}
      onMouseLeave={() => onHoverChange?.(false)}
    >
      {/* Header */}
      <div style={{ 
        padding: isCollapsed ? '16px 12px' : '16px', 
        borderBottom: '1px solid var(--color-sidebar-border)',
        display: 'flex',
        justifyContent: isCollapsed ? 'center' : 'flex-start'
      }}>
        <h1 style={{ 
          fontSize: '18px', 
          fontWeight: 'bold', 
          color: 'var(--color-sidebar-text)', 
          margin: 0,
          whiteSpace: 'nowrap',
          overflow: 'hidden'
        }}>
          {isCollapsed ? 'A' : 'ATS'}
        </h1>
      </div>

      {/* Navigation */}
      <nav style={{ padding: isCollapsed ? '8px 4px' : '8px' }}>
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`sidebar-item ${isActive ? 'active' : ''}`}
              title={isCollapsed ? item.label : undefined}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: isCollapsed ? 'center' : 'flex-start',
                gap: '12px',
                padding: isCollapsed ? '12px' : '12px 16px',
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
              <Icon style={{ width: '20px', height: '20px', flexShrink: 0 }} />
              {showLabels && <span style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>{item.label}</span>}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

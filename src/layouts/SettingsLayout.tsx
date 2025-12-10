import React, { type ReactNode } from "react";
import { useNavigate } from "react-router-dom";

// Settings navigation structure
export type SettingsSection = 
  | 'profile' 
  | 'notifications'
  | 'company-general'
  | 'team'
  | 'roles'
  | 'locations'
  | 'rejection-reasons'
  | 'tags-sources'
  | 'departments'
  | 'vacancy-templates'
  | 'funnels'
  | 'evaluation-forms'
  | 'question-lists'
  | 'api-tokens';

interface SettingsLayoutProps {
  children: ReactNode;
  activeSection: SettingsSection;
  onSectionChange: (section: SettingsSection) => void;
  onBackToDashboard: () => void;
}

interface NavItem {
  id: SettingsSection;
  label: string;
}

interface NavSection {
  label: string;
  items: NavItem[];
}

const navigationSections: NavSection[] = [
  {
    label: 'Mijn account',
    items: [
      { id: 'profile', label: 'Profiel' },
      { id: 'notifications', label: 'Meldingen' },
    ]
  },
  {
    label: 'Bedrijf',
    items: [
      { id: 'company-general', label: 'Bedrijfsinstellingen' },
      { id: 'team', label: 'Teamgenoten' },
      { id: 'roles', label: 'Gebruikersrollen' },
      { id: 'locations', label: 'Locaties' },
    ]
  },
  {
    label: 'Workflow',
    items: [
      { id: 'rejection-reasons', label: 'Afwijzingsredenen' },
      { id: 'tags-sources', label: 'Tags & Bronnen' },
      { id: 'departments', label: 'Afdelingen' },
    ]
  },
  {
    label: 'Templates',
    items: [
      { id: 'vacancy-templates', label: 'Vacatures' },
      { id: 'funnels', label: 'Funnels' },
      { id: 'evaluation-forms', label: 'Evaluatieformulieren' },
      { id: 'question-lists', label: 'Vragenlijsten' },
    ]
  },
  {
    label: 'Apps & plugins',
    items: [
      { id: 'api-tokens', label: 'API tokens' },
    ]
  }
];

// Map section IDs to URL paths
const getSectionPath = (section: SettingsSection): string => {
  const pathMap: Record<SettingsSection, string> = {
    'profile': '/settings/account/profile',
    'notifications': '/settings/account/notifications',
    'company-general': '/settings/company/general',
    'team': '/settings/company/team',
    'roles': '/settings/company/roles',
    'locations': '/settings/company/locations',
    'rejection-reasons': '/settings/workflow/rejection-reasons',
    'tags-sources': '/settings/workflow/tags-sources',
    'departments': '/settings/workflow/departments',
    'vacancy-templates': '/settings/templates/vacancies',
    'funnels': '/settings/templates/funnels',
    'evaluation-forms': '/settings/templates/evaluation-forms',
    'question-lists': '/settings/templates/question-lists',
    'api-tokens': '/settings/apps/api-tokens',
  };
  return pathMap[section];
};

export const SettingsLayout: React.FC<SettingsLayoutProps> = ({
  children,
  activeSection,
  onSectionChange,
  onBackToDashboard
}) => {
  const navigate = useNavigate();

  const handleSectionClick = (section: SettingsSection) => {
    onSectionChange(section);
    navigate(getSectionPath(section));
  };

  return (
    <div style={{ 
      display: 'flex', 
      minHeight: 'calc(100vh - 64px)',
      backgroundColor: 'var(--color-bg-secondary)'
    }}>
      {/* Sidebar */}
      <aside style={{
        width: '280px',
        backgroundColor: 'var(--color-card-bg)',
        borderRight: '1px solid var(--color-border)',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0
      }}>
        {/* Sidebar Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--color-border)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h2 style={{ 
              fontSize: '18px', 
              fontWeight: '700', 
              color: 'var(--color-text)',
              margin: 0
            }}>
              Instellingen
            </h2>
            <span style={{
              fontSize: '11px',
              fontWeight: '600',
              color: 'var(--color-primary)',
              backgroundColor: 'var(--color-primary-bg)',
              padding: '2px 8px',
              borderRadius: '4px'
            }}>
              CRM ATS
            </span>
          </div>
        </div>

        {/* Navigation Sections */}
        <nav style={{ 
          flex: 1, 
          overflowY: 'auto',
          padding: '16px 0'
        }}>
          {navigationSections.map((section, sectionIndex) => (
            <div key={sectionIndex} style={{ marginBottom: '24px' }}>
              {/* Section Label */}
              <div style={{
                padding: '0 24px',
                marginBottom: '8px',
                fontSize: '11px',
                fontWeight: '600',
                color: 'var(--color-text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {section.label}
              </div>

              {/* Section Items */}
              {section.items.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSectionClick(item.id)}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '10px 24px',
                      backgroundColor: isActive ? 'var(--color-primary-bg)' : 'transparent',
                      border: 'none',
                      borderLeft: isActive ? '3px solid var(--color-primary)' : '3px solid transparent',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: isActive ? '500' : '400',
                      color: isActive ? 'var(--color-primary)' : 'var(--color-text)',
                      textAlign: 'left',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid var(--color-border)'
        }}>
          <button
            onClick={onBackToDashboard}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 16px',
              backgroundColor: 'var(--color-bg-secondary)',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              color: 'var(--color-text)',
              width: '100%',
              transition: 'background-color 0.15s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-button-hover-bg)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)'}
          >
            <span>←</span>
            <span>Terug naar dashboard</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{
        flex: 1,
        padding: '32px 40px',
        overflowY: 'auto'
      }}>
        {children}
      </main>
    </div>
  );
};

// Helper component for settings page headers
export const SettingsPageHeader: React.FC<{
  title: string;
  subtitle?: string;
  action?: ReactNode;
}> = ({ title, subtitle, action }) => (
  <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '32px'
  }}>
    <div>
      <h1 style={{
        fontSize: '24px',
        fontWeight: '700',
        color: 'var(--color-text)',
        margin: '0 0 4px 0'
      }}>
        {title}
      </h1>
      {subtitle && (
        <p style={{
          fontSize: '14px',
          color: 'var(--color-text-muted)',
          margin: 0
        }}>
          {subtitle}
        </p>
      )}
    </div>
    {action && <div>{action}</div>}
  </div>
);

// Placeholder component for sections that are not yet implemented
export const SettingsPlaceholder: React.FC<{
  title: string;
  description: string;
  icon?: string;
}> = ({ title, description, icon = '◆' }) => (
  <div style={{
    backgroundColor: 'var(--color-card-bg)',
    borderRadius: '12px',
    border: '1px solid var(--color-border)',
    padding: '64px',
    textAlign: 'center'
  }}>
    <div style={{ fontSize: '48px', marginBottom: '16px', color: 'var(--color-text-muted)' }}>{icon}</div>
    <h3 style={{
      fontSize: '18px',
      fontWeight: '600',
      color: 'var(--color-text)',
      marginBottom: '8px'
    }}>
      {title}
    </h3>
    <p style={{
      fontSize: '14px',
      color: 'var(--color-text-muted)',
      maxWidth: '400px',
      margin: '0 auto'
    }}>
      {description}
    </p>
  </div>
);

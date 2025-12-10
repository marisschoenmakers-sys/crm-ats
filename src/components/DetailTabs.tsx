import React from 'react';

interface DetailTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  'Overzicht',
  'Bestanden',
  'Activiteit',
  'Evaluaties'
];

export const DetailTabs: React.FC<DetailTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div style={{
      borderBottom: '1px solid var(--color-border)',
      marginBottom: '24px'
    }}>
      <div style={{ display: 'flex', gap: '32px' }}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            style={{
              padding: '12px 0',
              fontSize: '14px',
              fontWeight: activeTab === tab ? '600' : '400',
              color: activeTab === tab ? 'var(--color-text)' : 'var(--color-text-muted)',
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: activeTab === tab ? '2px solid var(--color-primary)' : '2px solid transparent',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              outline: 'none'
            }}
            onMouseEnter={(e) => {
              if (activeTab !== tab) {
                e.currentTarget.style.color = 'var(--color-text)';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== tab) {
                e.currentTarget.style.color = 'var(--color-text-muted)';
              }
            }}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

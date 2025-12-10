import React from 'react';

interface DetailTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  'Overzicht',
  'Notities',
  'Bestanden',
  'Activiteit',
  'Evaluaties'
];

export const DetailTabs: React.FC<DetailTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div style={{
      borderBottom: '1px solid #e5e7eb',
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
              color: activeTab === tab ? '#111827' : '#6b7280',
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: activeTab === tab ? '2px solid #2563eb' : '2px solid transparent',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              outline: 'none'
            }}
            onMouseEnter={(e) => {
              if (activeTab !== tab) {
                e.currentTarget.style.color = '#374151';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== tab) {
                e.currentTarget.style.color = '#6b7280';
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

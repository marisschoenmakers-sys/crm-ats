import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, icon }) => {
  return (
    <div style={{
      backgroundColor: 'var(--color-card-bg)',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
      border: '1px solid var(--color-border)',
      transition: 'all 0.2s ease',
      position: 'relative',
      overflow: 'hidden'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
      e.currentTarget.style.transform = 'translateY(-2px)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
      e.currentTarget.style.transform = 'translateY(0)';
    }}
    >
      {/* Background Icon */}
      <div style={{
        position: 'absolute',
        top: '-8px',
        right: '-8px',
        opacity: 0.1,
        transform: 'rotate(-15deg)'
      }}>
        {icon}
      </div>

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 1
      }}>
        {/* Value */}
        <div style={{
          fontSize: '32px',
          fontWeight: '700',
          color: 'var(--color-text)',
          marginBottom: '8px',
          lineHeight: '1'
        }}>
          {value}
        </div>

        {/* Label */}
        <div style={{
          fontSize: '14px',
          color: 'var(--color-text-muted)',
          fontWeight: '500'
        }}>
          {label}
        </div>
      </div>
    </div>
  );
};

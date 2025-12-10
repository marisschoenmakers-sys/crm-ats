import React from 'react';
import type { DashboardActivity } from '../../types/dashboard';

interface ActivityTimelineProps {
  activities: DashboardActivity[];
}

export const ActivityTimeline: React.FC<ActivityTimelineProps> = ({ activities }) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'candidate': return '●';
      case 'vacancy': return '◆';
      case 'note': return '○';
      case 'file': return '◇';
      default: return '●';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'candidate': return 'var(--color-primary-bg)';
      case 'vacancy': return 'var(--color-warning-bg)';
      case 'note': return 'var(--color-bg-secondary)';
      case 'file': return 'var(--color-success-bg)';
      default: return 'var(--color-bg-secondary)';
    }
  };

  return (
    <div style={{
      backgroundColor: 'var(--color-card-bg)',
      borderRadius: '8px',
      padding: '24px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid var(--color-border)'
    }}>
      {/* Title */}
      <h3 style={{
        fontSize: '18px',
        fontWeight: '600',
        color: 'var(--color-text)',
        marginBottom: '20px'
      }}>
        Activiteit ({activities.length})
      </h3>

      {/* Timeline */}
      <div style={{ position: 'relative' }}>
        {/* Timeline Line */}
        <div style={{
          position: 'absolute',
          left: '20px',
          top: '0',
          bottom: '0',
          width: '2px',
          backgroundColor: 'var(--color-border)'
        }} />

        {/* Activity Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {activities.map((activity) => (
            <div
              key={activity.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px'
              }}
            >
              {/* Activity Icon */}
              <div style={{
                position: 'relative',
                zIndex: 1,
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: getTypeColor(activity.type),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                flexShrink: 0,
                border: '2px solid var(--color-card-bg)',
                color: 'var(--color-text)'
              }}>
                {getTypeIcon(activity.type)}
              </div>

              {/* Activity Content */}
              <div style={{ flex: 1, paddingTop: '6px' }}>
                <div style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: 'var(--color-text)',
                  marginBottom: '4px',
                  lineHeight: '1.4'
                }}>
                  {activity.description}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: 'var(--color-text-muted)'
                }}>
                  {activity.timestamp}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div style={{
        marginTop: '20px',
        padding: '12px',
        backgroundColor: 'var(--color-bg-secondary)',
        borderRadius: '6px',
        border: '1px solid var(--color-border)'
      }}>
        <div style={{
          fontSize: '13px',
          color: 'var(--color-text-muted)'
        }}>
          Laatste activiteit: <strong style={{ color: 'var(--color-text)' }}>{activities[0]?.timestamp}</strong>
        </div>
      </div>
    </div>
  );
};

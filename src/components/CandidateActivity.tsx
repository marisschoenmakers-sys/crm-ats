import React from 'react';
import type { CandidateActivity } from '../types/candidate';

interface CandidateActivityProps {
  activities: CandidateActivity[];
}

export const CandidateActivity: React.FC<CandidateActivityProps> = ({ activities }) => {
  const getActivityIcon = (type: CandidateActivity['type']): string => {
    switch (type) {
      case 'note':
        return '📝';
      case 'file':
        return '📄';
      case 'status':
        return '🔄';
      case 'evaluation':
        return '⭐';
      case 'update':
        return '✏️';
      default:
        return '📌';
    }
  };

  const getActivityColor = (type: CandidateActivity['type']): string => {
    switch (type) {
      case 'note':
        return '#fef3c7';
      case 'file':
        return '#dcfce7';
      case 'status':
        return '#dbeafe';
      case 'evaluation':
        return '#e9d5ff';
      case 'update':
        return '#f3f4f6';
      default:
        return '#f3f4f6';
    }
  };

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '24px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#111827',
          margin: 0
        }}>
          Activiteit ({activities.length})
        </h3>
      </div>

      {/* Timeline */}
      <div style={{ position: 'relative' }}>
        {/* Timeline Line */}
        <div style={{
          position: 'absolute',
          left: '20px',
          top: '0',
          bottom: '0',
          width: '2px',
          backgroundColor: '#e5e7eb'
        }} />

        {/* Activity Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {activities.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '40px',
              color: '#9ca3af',
              fontSize: '14px'
            }}>
              Nog geen activiteiten geregistreerd
            </div>
          ) : (
            activities.map((activity) => (
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
                  backgroundColor: getActivityColor(activity.type),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  flexShrink: 0,
                  border: '2px solid white',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                }}>
                  {getActivityIcon(activity.type)}
                </div>

                {/* Activity Content */}
                <div style={{ flex: 1, paddingTop: '6px' }}>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#111827',
                    marginBottom: '4px',
                    lineHeight: '1.4'
                  }}>
                    {activity.description}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#9ca3af'
                  }}>
                    {activity.createdAt}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Summary */}
      {activities.length > 0 && (
        <div style={{
          marginTop: '24px',
          padding: '12px',
          backgroundColor: '#f9fafb',
          borderRadius: '6px',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{
            fontSize: '13px',
            color: '#6b7280'
          }}>
            Laatste activiteit: <strong style={{ color: '#111827' }}>{activities[0]?.createdAt}</strong>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { getRecentActivities } from '../../api/activities';
import type { DashboardActivity } from '../../types/dashboard';

interface ActivityTimelineProps {
  activities?: DashboardActivity[];
}

export const ActivityTimeline: React.FC<ActivityTimelineProps> = ({ activities: propActivities }) => {
  const [activities, setActivities] = useState<DashboardActivity[]>(propActivities || []);

  // Load activities from Supabase
  useEffect(() => {
    async function loadActivities() {
      const { data, error } = await getRecentActivities(10);
      if (error) {
        console.error('Error loading activities:', error);
        return;
      }
      if (data && data.length > 0) {
        const formattedActivities: DashboardActivity[] = data.map((a: any) => ({
          id: a.id,
          type: mapActivityType(a.activity_type) as DashboardActivity['type'],
          description: `${a.title}${a.description ? ': ' + a.description : ''}`,
          timestamp: formatTimestamp(a.created_at),
          user: a.user_name
        }));
        setActivities(formattedActivities);
      }
    }
    loadActivities();
  }, []);

  // Map activity_type to display type
  const mapActivityType = (activityType: string): string => {
    if (activityType.includes('candidate')) return 'candidate';
    if (activityType.includes('vacancy')) return 'vacancy';
    if (activityType.includes('note')) return 'note';
    if (activityType.includes('file')) return 'file';
    if (activityType.includes('task')) return 'task';
    if (activityType.includes('email')) return 'email';
    if (activityType.includes('event')) return 'event';
    if (activityType.includes('company')) return 'company';
    return 'other';
  };

  // Format timestamp
  const formatTimestamp = (dateStr: string): string => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return 'Zojuist';
    if (diffMins < 60) return `${diffMins} min geleden`;
    if (diffHours < 24) return `${diffHours} uur geleden`;
    if (diffDays === 1) return 'Gisteren';
    if (diffDays < 7) return `${diffDays} dagen geleden`;
    return date.toLocaleDateString('nl-NL', { day: 'numeric', month: 'short' });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'candidate': return '👤';
      case 'vacancy': return '💼';
      case 'note': return '📝';
      case 'file': return '📎';
      case 'task': return '✓';
      case 'email': return '✉️';
      case 'event': return '📅';
      case 'company': return '🏢';
      default: return '●';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'candidate': return 'var(--color-primary-bg)';
      case 'vacancy': return 'var(--color-warning-bg)';
      case 'note': return 'var(--color-bg-secondary)';
      case 'file': return 'var(--color-success-bg)';
      case 'task': return '#E0F2FE';
      case 'email': return '#FEF3C7';
      case 'event': return '#FCE7F3';
      case 'company': return '#DBEAFE';
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

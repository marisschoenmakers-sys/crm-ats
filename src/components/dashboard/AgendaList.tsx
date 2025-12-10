import React from 'react';
import type { DashboardEvent } from '../../types/dashboard';

interface AgendaListProps {
  events: DashboardEvent[];
}

export const AgendaList: React.FC<AgendaListProps> = ({ events }) => {
  const getEventColor = (date: string) => {
    if (date === 'Vandaag') return '#dc2626';
    if (date === 'Morgen') return '#f59e0b';
    return '#6b7280';
  };

  const getLocationIcon = (location: string) => {
    if (location.toLowerCase().includes('teams')) return '💻';
    if (location.toLowerCase().includes('kantoor')) return '📍';
    return '📍';
  };

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '24px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb'
    }}>
      {/* Title */}
      <h3 style={{
        fontSize: '18px',
        fontWeight: '600',
        color: '#111827',
        marginBottom: '20px'
      }}>
        Agenda ({events.length})
      </h3>

      {/* Events List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {events.map((event) => (
          <div
            key={event.id}
            style={{
              padding: '16px',
              backgroundColor: '#f9fafb',
              borderRadius: '6px',
              border: '1px solid #e5e7eb'
            }}
          >
            {/* Event Title */}
            <div style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#111827',
              marginBottom: '8px'
            }}>
              {event.title}
            </div>

            {/* Event Details */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              fontSize: '13px',
              color: '#6b7280'
            }}>
              {/* Date */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: getEventColor(event.date),
                fontWeight: event.date === 'Vandaag' ? '500' : '400'
              }}>
                <span>📅</span>
                <span>{event.date}</span>
              </div>

              {/* Time */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <span>🕐</span>
                <span>{event.time}</span>
              </div>

              {/* Location */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <span>{getLocationIcon(event.location)}</span>
                <span>{event.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div style={{
        marginTop: '16px',
        padding: '12px',
        backgroundColor: '#eff6ff',
        borderRadius: '6px',
        border: '1px solid #dbeafe'
      }}>
        <div style={{
          fontSize: '13px',
          color: '#1e40af'
        }}>
          📆 {events.filter(e => e.date === 'Vandaag').length} afspraak{events.filter(e => e.date === 'Vandaag').length === 1 ? '' : 'ken'} vandaag
        </div>
      </div>
    </div>
  );
};

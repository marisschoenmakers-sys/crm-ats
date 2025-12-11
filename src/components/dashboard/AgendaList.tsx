import React, { useState } from 'react';
import { createCalendarEvent } from '../../api/calendar';
import { logEventCreated } from '../../api/activities';
import type { DashboardEvent } from '../../types/dashboard';

interface AgendaListProps {
  events: DashboardEvent[];
  onEventAdded?: () => void;
}

export const AgendaList: React.FC<AgendaListProps> = ({ events, onEventAdded }) => {
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');

  const handleAddEvent = async () => {
    if (!newEventTitle.trim()) return;
    
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(10, 0, 0, 0);
    
    const { data, error } = await createCalendarEvent({
      title: newEventTitle.trim(),
      start_time: tomorrow.toISOString(),
      end_time: new Date(tomorrow.getTime() + 60 * 60 * 1000).toISOString(),
      event_type: 'meeting',
      is_completed: false
    } as any);
    
    if (error) {
      console.error('Error creating event:', error);
      alert('Fout bij aanmaken afspraak: ' + error.message);
      return;
    }
    
    if (data) {
      logEventCreated((data as any).id, (data as any).title);
      setNewEventTitle('');
      setShowAddEvent(false);
      onEventAdded?.();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddEvent();
    } else if (e.key === 'Escape') {
      setShowAddEvent(false);
      setNewEventTitle('');
    }
  };
  const getEventColor = (date: string) => {
    if (date === 'Vandaag') return 'var(--color-danger)';
    if (date === 'Morgen') return 'var(--color-warning)';
    return 'var(--color-text-muted)';
  };

  const getLocationIcon = (location: string) => {
    if (location.toLowerCase().includes('teams')) return '○';
    if (location.toLowerCase().includes('kantoor')) return '●';
    return '●';
  };

  return (
    <div style={{
      backgroundColor: 'var(--color-card-bg)',
      borderRadius: '8px',
      padding: '24px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid var(--color-border)'
    }}>
      {/* Title with Add Button */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: 'var(--color-text)',
          margin: 0
        }}>
          Agenda ({events.length})
        </h3>
        <button
          onClick={() => setShowAddEvent(true)}
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '6px',
            border: '1px solid var(--color-border)',
            backgroundColor: 'transparent',
            color: 'var(--color-text-muted)',
            fontSize: '18px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)';
            e.currentTarget.style.color = 'var(--color-text)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = 'var(--color-text-muted)';
          }}
        >
          +
        </button>
      </div>

      {/* Add Event Input */}
      {showAddEvent && (
        <div style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '12px',
          padding: '12px',
          backgroundColor: 'var(--color-bg-secondary)',
          borderRadius: '6px',
          border: '1px solid var(--color-border)'
        }}>
          <input
            type="text"
            value={newEventTitle}
            onChange={(e) => setNewEventTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Nieuwe afspraak..."
            autoFocus
            style={{
              flex: 1,
              padding: '8px 12px',
              border: '1px solid var(--color-border)',
              borderRadius: '6px',
              fontSize: '14px',
              backgroundColor: 'var(--color-card-bg)',
              color: 'var(--color-text)',
              outline: 'none'
            }}
          />
          <button
            onClick={handleAddEvent}
            disabled={!newEventTitle.trim()}
            style={{
              padding: '8px 16px',
              backgroundColor: newEventTitle.trim() ? 'var(--color-primary)' : 'var(--color-border)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: '500',
              cursor: newEventTitle.trim() ? 'pointer' : 'not-allowed'
            }}
          >
            Toevoegen
          </button>
          <button
            onClick={() => { setShowAddEvent(false); setNewEventTitle(''); }}
            style={{
              padding: '8px 12px',
              backgroundColor: 'transparent',
              color: 'var(--color-text-muted)',
              border: '1px solid var(--color-border)',
              borderRadius: '6px',
              fontSize: '13px',
              cursor: 'pointer'
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Events List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {events.map((event) => (
          <div
            key={event.id}
            style={{
              padding: '16px',
              backgroundColor: 'var(--color-bg-secondary)',
              borderRadius: '6px',
              border: '1px solid var(--color-border)'
            }}
          >
            {/* Event Title */}
            <div style={{
              fontSize: '14px',
              fontWeight: '600',
              color: 'var(--color-text)',
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
              color: 'var(--color-text-muted)'
            }}>
              {/* Date */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: getEventColor(event.date),
                fontWeight: event.date === 'Vandaag' ? '500' : '400'
              }}>
                <span>◆</span>
                <span>{event.date}</span>
              </div>

              {/* Time */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <span>◇</span>
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
        backgroundColor: 'var(--color-primary-bg)',
        borderRadius: '6px',
        border: '1px solid var(--color-border)'
      }}>
        <div style={{
          fontSize: '13px',
          color: 'var(--color-primary)'
        }}>
          ◆ {events.filter(e => e.date === 'Vandaag').length} afspraak{events.filter(e => e.date === 'Vandaag').length === 1 ? '' : 'ken'} vandaag
        </div>
      </div>
    </div>
  );
};

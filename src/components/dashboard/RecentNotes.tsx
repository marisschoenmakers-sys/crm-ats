import React from 'react';
import type { DashboardNote } from '../../types/dashboard';

interface RecentNotesProps {
  notes: DashboardNote[];
}

export const RecentNotes: React.FC<RecentNotesProps> = ({ notes }) => {
  const getAuthorInitials = (author: string) => {
    return author
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
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
        Recente Notities ({notes.length})
      </h3>

      {/* Notes List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {notes.map((note) => (
          <div
            key={note.id}
            style={{
              padding: '16px',
              backgroundColor: 'var(--color-bg-secondary)',
              borderRadius: '6px',
              border: '1px solid var(--color-border)'
            }}
          >
            {/* Note Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '8px'
            }}>
              {/* Author Avatar */}
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: '600',
                color: 'var(--color-text)',
                flexShrink: 0
              }}>
                {getAuthorInitials(note.author)}
              </div>

              {/* Author Name */}
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: 'var(--color-text)'
                }}>
                  {note.author}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: 'var(--color-text-muted)'
                }}>
                  {note.createdAt}
                </div>
              </div>
            </div>

            {/* Note Content */}
            <div style={{
              fontSize: '14px',
              lineHeight: '1.5',
              color: 'var(--color-text)'
            }}>
              {note.content}
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div style={{
        marginTop: '16px',
        textAlign: 'center'
      }}>
        <button
          style={{
            padding: '8px 16px',
            backgroundColor: 'transparent',
            color: 'var(--color-primary)',
            border: '1px solid var(--color-border)',
            borderRadius: '6px',
            fontSize: '13px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-primary-bg)';
            e.currentTarget.style.borderColor = 'var(--color-primary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.borderColor = 'var(--color-border)';
          }}
        >
          Alle notities bekijken
        </button>
      </div>
    </div>
  );
};

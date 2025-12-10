import React, { useState } from 'react';
import type { CandidateNote } from '../types/candidate';

interface NotesSidebarProps {
  notes: CandidateNote[];
  onAddNote: (content: string) => void;
}

export const NotesSidebar: React.FC<NotesSidebarProps> = ({ notes, onAddNote }) => {
  const [newNote, setNewNote] = useState('');

  const handleSubmit = () => {
    if (newNote.trim()) {
      onAddNote(newNote.trim());
      setNewNote('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div style={{
      backgroundColor: 'var(--color-card-bg)',
      borderRadius: '12px',
      border: '1px solid var(--color-border)',
      height: 'fit-content',
      position: 'sticky',
      top: '24px'
    }}>
      {/* Header */}
      <div style={{
        padding: '16px 20px',
        borderBottom: '1px solid var(--color-border)'
      }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: '600',
          color: 'var(--color-text)',
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span>○</span>
          Notities
          <span style={{
            backgroundColor: 'var(--color-bg-secondary)',
            color: 'var(--color-text-muted)',
            fontSize: '12px',
            fontWeight: '500',
            padding: '2px 8px',
            borderRadius: '10px'
          }}>
            {notes.length}
          </span>
        </h3>
      </div>

      {/* Add Note Input */}
      <div style={{
        padding: '16px 20px',
        borderBottom: '1px solid var(--color-border)'
      }}>
        <div style={{ position: 'relative' }}>
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Notitie toevoegen..."
            rows={3}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid var(--color-input-border)',
              borderRadius: '8px',
              fontSize: '14px',
              resize: 'none',
              fontFamily: 'inherit',
              transition: 'border-color 0.2s',
              backgroundColor: 'var(--color-input-bg)',
              color: 'var(--color-text)'
            }}
            onFocus={(e) => e.currentTarget.style.borderColor = 'var(--color-primary)'}
            onBlur={(e) => e.currentTarget.style.borderColor = 'var(--color-input-border)'}
          />
          {newNote.trim() && (
            <button
              onClick={handleSubmit}
              style={{
                position: 'absolute',
                bottom: '8px',
                right: '8px',
                padding: '6px 12px',
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-sidebar-text)',
                border: 'none',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Toevoegen
            </button>
          )}
        </div>
        <div style={{
          fontSize: '11px',
          color: 'var(--color-text-muted)',
          marginTop: '6px'
        }}>
          Druk op Enter om toe te voegen
        </div>
      </div>

      {/* Notes List */}
      <div style={{
        maxHeight: '500px',
        overflowY: 'auto'
      }}>
        {notes.length === 0 ? (
          <div style={{
            padding: '32px 20px',
            textAlign: 'center',
            color: 'var(--color-text-muted)',
            fontSize: '14px'
          }}>
            Nog geen notities
          </div>
        ) : (
          notes.map((note, index) => (
            <div
              key={note.id}
              style={{
                padding: '16px 20px',
                borderBottom: index < notes.length - 1 ? '1px solid var(--color-border)' : 'none'
              }}
            >
              {/* Author and Time */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '8px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-primary-bg)',
                    color: 'var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    fontWeight: '600'
                  }}>
                    {note.author.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <span style={{
                    fontSize: '13px',
                    fontWeight: '500',
                    color: 'var(--color-text)'
                  }}>
                    {note.author}
                  </span>
                </div>
                <span style={{
                  fontSize: '11px',
                  color: 'var(--color-text-muted)'
                }}>
                  {note.createdAt}
                </span>
              </div>

              {/* Content */}
              <div style={{
                fontSize: '13px',
                lineHeight: '1.5',
                color: 'var(--color-text)',
                paddingLeft: '32px'
              }}>
                {note.content}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import type { CompanyNote } from '../types/company';

interface CompanyNotesProps {
  notes: CompanyNote[];
  onAddNote: (content: string) => void;
}

export const CompanyNotes: React.FC<CompanyNotesProps> = ({ notes, onAddNote }) => {
  const [newNoteContent, setNewNoteContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newNoteContent.trim()) {
      onAddNote(newNoteContent.trim());
      setNewNoteContent('');
    }
  };

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
          color: 'var(--color-text)',
          margin: 0
        }}>
          Notities ({notes.length})
        </h3>
      </div>

      {/* Add Note Form */}
      <form onSubmit={handleSubmit} style={{
        marginBottom: '24px',
        padding: '16px',
        backgroundColor: 'var(--color-bg-secondary)',
        borderRadius: '8px',
        border: '1px solid var(--color-border)'
      }}>
        <div style={{ marginBottom: '12px' }}>
          <textarea
            value={newNoteContent}
            onChange={(e) => setNewNoteContent(e.target.value)}
            placeholder="Voeg een nieuwe notitie toe..."
            rows={3}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid var(--color-input-border)',
              borderRadius: '6px',
              fontSize: '14px',
              color: 'var(--color-text)',
              backgroundColor: 'var(--color-input-bg)',
              resize: 'vertical',
              fontFamily: 'inherit'
            }}
          />
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="submit"
            disabled={!newNoteContent.trim()}
            style={{
              padding: '8px 16px',
              backgroundColor: newNoteContent.trim() ? 'var(--color-primary)' : 'var(--color-text-muted)',
              color: 'var(--color-sidebar-text)',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: newNoteContent.trim() ? 'pointer' : 'not-allowed'
            }}
          >
            Notitie toevoegen
          </button>
        </div>
      </form>

      {/* Notes List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {notes.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            color: 'var(--color-text-muted)',
            fontSize: '14px'
          }}>
            Nog geen notities toegevoegd
          </div>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              style={{
                padding: '16px',
                backgroundColor: 'var(--color-bg-secondary)',
                borderRadius: '8px',
                border: '1px solid var(--color-border)'
              }}
            >
              {/* Note Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '12px'
              }}>
                {/* Author Avatar */}
                <div style={{
                  width: '36px',
                  height: '36px',
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

                {/* Author Info */}
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
                lineHeight: '1.6',
                color: 'var(--color-text)',
                whiteSpace: 'pre-wrap'
              }}>
                {note.content}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Summary */}
      {notes.length > 0 && (
        <div style={{
          marginTop: '24px',
          padding: '12px',
          backgroundColor: 'var(--color-primary-bg)',
          borderRadius: '6px',
          border: '1px solid var(--color-primary)'
        }}>
          <div style={{
            fontSize: '13px',
            color: 'var(--color-primary)'
          }}>
            ○ {notes.length} notit{notes.length === 1 ? 'ie' : 'ies'} van {notes.length} verschillende auteurs
          </div>
        </div>
      )}
    </div>
  );
};

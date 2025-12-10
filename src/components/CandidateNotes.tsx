import React, { useState } from 'react';
import type { CandidateNote } from '../types/candidate';

interface CandidateNotesProps {
  notes: CandidateNote[];
  onAddNote: (content: string) => void;
}

export const CandidateNotes: React.FC<CandidateNotesProps> = ({ notes, onAddNote }) => {
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
          Notities ({notes.length})
        </h3>
      </div>

      {/* Add Note Form */}
      <form onSubmit={handleSubmit} style={{
        marginBottom: '24px',
        padding: '16px',
        backgroundColor: '#f9fafb',
        borderRadius: '8px',
        border: '1px solid #e5e7eb'
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
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              color: '#111827',
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
              backgroundColor: newNoteContent.trim() ? '#2563eb' : '#9ca3af',
              color: 'white',
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
            color: '#9ca3af',
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
                backgroundColor: '#f9fafb',
                borderRadius: '8px',
                border: '1px solid #e5e7eb'
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
                  backgroundColor: '#e5e7eb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#374151',
                  flexShrink: 0
                }}>
                  {getAuthorInitials(note.author)}
                </div>

                {/* Author Info */}
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#111827'
                  }}>
                    {note.author}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#9ca3af'
                  }}>
                    {note.createdAt}
                  </div>
                </div>
              </div>

              {/* Note Content */}
              <div style={{
                fontSize: '14px',
                lineHeight: '1.6',
                color: '#374151',
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
          backgroundColor: '#eff6ff',
          borderRadius: '6px',
          border: '1px solid #dbeafe'
        }}>
          <div style={{
            fontSize: '13px',
            color: '#1e40af'
          }}>
            📝 {notes.length} notit{notes.length === 1 ? 'tie' : 'ties'} van {notes.length} verschillende auteurs
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import type { CandidateEvaluation } from '../types/candidate';

interface CandidateEvaluationsProps {
  evaluations: CandidateEvaluation[];
  onUpdateScore: (id: string, newScore: number, comment: string) => void;
}

export const CandidateEvaluations: React.FC<CandidateEvaluationsProps> = ({ 
  evaluations, 
  onUpdateScore 
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempScore, setTempScore] = useState<number>(0);
  const [tempComment, setTempComment] = useState<string>('');

  const handleEditStart = (evaluation: CandidateEvaluation) => {
    setEditingId(evaluation.id);
    setTempScore(evaluation.score);
    setTempComment(evaluation.comment);
  };

  const handleSave = () => {
    if (editingId) {
      onUpdateScore(editingId, tempScore, tempComment);
      setEditingId(null);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setTempScore(0);
    setTempComment('');
  };

  const renderStars = (score: number, onChange: (newScore: number) => void, interactive: boolean = false) => {
    return (
      <div style={{ display: 'flex', gap: '4px' }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => interactive && onChange(star)}
            disabled={!interactive}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              fontSize: '20px',
              cursor: interactive ? 'pointer' : 'default',
              color: star <= score ? '#fbbf24' : '#d1d5db',
              transition: 'color 0.2s ease',
              padding: '0'
            }}
            onMouseEnter={(e) => {
              if (interactive && star > score) {
                e.currentTarget.style.color = '#fbbf24';
              }
            }}
            onMouseLeave={(e) => {
              if (interactive && star > score) {
                e.currentTarget.style.color = '#d1d5db';
              }
            }}
          >
            {star <= score ? '★' : '☆'}
          </button>
        ))}
      </div>
    );
  };

  const getScoreColor = (score: number): string => {
    if (score >= 4.5) return '#059669';
    if (score >= 3.5) return '#2563eb';
    if (score >= 2.5) return '#f59e0b';
    return '#dc2626';
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
          Evaluaties ({evaluations.length})
        </h3>
      </div>

      {/* Evaluations List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {evaluations.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            color: '#9ca3af',
            fontSize: '14px'
          }}>
            Nog geen evaluaties toegevoegd
          </div>
        ) : (
          evaluations.map((evaluation) => (
            <div
              key={evaluation.id}
              style={{
                padding: '20px',
                backgroundColor: '#f9fafb',
                borderRadius: '8px',
                border: '1px solid #e5e7eb'
              }}
            >
              {/* Category Header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '16px'
              }}>
                <h4 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#111827',
                  margin: 0
                }}>
                  {evaluation.category}
                </h4>
                
                {editingId !== evaluation.id && (
                  <button
                    onClick={() => handleEditStart(evaluation)}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: 'white',
                      color: '#374151',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}
                  >
                    Bewerken
                  </button>
                )}
              </div>

              {/* Score Display */}
              <div style={{ marginBottom: '16px' }}>
                {editingId === evaluation.id ? (
                  <div>
                    <div style={{
                      fontSize: '12px',
                      color: '#6b7280',
                      marginBottom: '8px'
                    }}>
                      Klik op sterren om score aan te passen:
                    </div>
                    {renderStars(tempScore, setTempScore, true)}
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {renderStars(evaluation.score, () => {}, false)}
                    <div style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: getScoreColor(evaluation.score)
                    }}>
                      {evaluation.score}/5
                    </div>
                  </div>
                )}
              </div>

              {/* Comment */}
              <div style={{ marginBottom: '16px' }}>
                {editingId === evaluation.id ? (
                  <textarea
                    value={tempComment}
                    onChange={(e) => setTempComment(e.target.value)}
                    placeholder="Voeg een opmerking toe..."
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px',
                      color: '#111827',
                      resize: 'vertical',
                      fontFamily: 'inherit'
                    }}
                  />
                ) : (
                  <div style={{
                    fontSize: '14px',
                    lineHeight: '1.6',
                    color: '#374151'
                  }}>
                    {evaluation.comment}
                  </div>
                )}
              </div>

              {/* Edit Actions */}
              {editingId === evaluation.id && (
                <div style={{
                  display: 'flex',
                  gap: '12px',
                  justifyContent: 'flex-end'
                }}>
                  <button
                    onClick={handleCancel}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: 'white',
                      color: '#374151',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}
                  >
                    Annuleren
                  </button>
                  
                  <button
                    onClick={handleSave}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#2563eb',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}
                  >
                    Opslaan
                  </button>
                </div>
              )}

              {/* Last Updated */}
              {editingId !== evaluation.id && (
                <div style={{
                  fontSize: '12px',
                  color: '#9ca3af',
                  marginTop: '12px'
                }}>
                  Laatst bijgewerkt: {evaluation.updatedAt}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Summary */}
      {evaluations.length > 0 && (
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
            ⭐ Gemiddelde score: <strong style={{ color: '#1e40af' }}>
              {(evaluations.reduce((sum, evaluation) => sum + evaluation.score, 0) / evaluations.length).toFixed(1)}/5
            </strong> over {evaluations.length} categori{evaluations.length === 1 ? 'e' : 'ën'}
          </div>
        </div>
      )}
    </div>
  );
};

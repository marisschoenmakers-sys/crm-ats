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
              color: star <= score ? 'var(--color-warning)' : 'var(--color-border)',
              transition: 'color 0.2s ease',
              padding: '0'
            }}
            onMouseEnter={(e) => {
              if (interactive && star > score) {
                e.currentTarget.style.color = 'var(--color-warning)';
              }
            }}
            onMouseLeave={(e) => {
              if (interactive && star > score) {
                e.currentTarget.style.color = 'var(--color-border)';
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
    if (score >= 4.5) return 'var(--color-success)';
    if (score >= 3.5) return 'var(--color-primary)';
    if (score >= 2.5) return 'var(--color-warning)';
    return 'var(--color-danger)';
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
          Evaluaties ({evaluations.length})
        </h3>
      </div>

      {/* Evaluations List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {evaluations.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            color: 'var(--color-text-muted)',
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
                backgroundColor: 'var(--color-bg-secondary)',
                borderRadius: '8px',
                border: '1px solid var(--color-border)'
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
                  color: 'var(--color-text)',
                  margin: 0
                }}>
                  {evaluation.category}
                </h4>
                
                {editingId !== evaluation.id && (
                  <button
                    onClick={() => handleEditStart(evaluation)}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: 'var(--color-card-bg)',
                      color: 'var(--color-text)',
                      border: '1px solid var(--color-border)',
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
                      color: 'var(--color-text-muted)',
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
                      border: '1px solid var(--color-input-border)',
                      borderRadius: '6px',
                      fontSize: '14px',
                      color: 'var(--color-text)',
                      backgroundColor: 'var(--color-input-bg)',
                      resize: 'vertical',
                      fontFamily: 'inherit'
                    }}
                  />
                ) : (
                  <div style={{
                    fontSize: '14px',
                    lineHeight: '1.6',
                    color: 'var(--color-text)'
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
                      backgroundColor: 'var(--color-card-bg)',
                      color: 'var(--color-text)',
                      border: '1px solid var(--color-border)',
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
                      backgroundColor: 'var(--color-primary)',
                      color: 'var(--color-sidebar-text)',
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
                  color: 'var(--color-text-muted)',
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
          backgroundColor: 'var(--color-primary-bg)',
          borderRadius: '6px',
          border: '1px solid var(--color-primary)'
        }}>
          <div style={{
            fontSize: '13px',
            color: 'var(--color-primary)'
          }}>
            ★ Gemiddelde score: <strong style={{ color: 'var(--color-primary)' }}>
              {(evaluations.reduce((sum, evaluation) => sum + evaluation.score, 0) / evaluations.length).toFixed(1)}/5
            </strong> over {evaluations.length} categori{evaluations.length === 1 ? 'e' : 'ën'}
          </div>
        </div>
      )}
    </div>
  );
};

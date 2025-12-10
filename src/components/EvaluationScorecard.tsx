import React, { useState } from 'react';
import type { CandidateEvaluation, EvaluationCategory, EvaluationScore } from '../types/evaluations';

interface EvaluationScorecardProps {
  evaluation: CandidateEvaluation;
  mode?: 'view' | 'edit';
  onScoreUpdate?: (categoryId: string, score: number, comment?: string) => void;
  showAverage?: boolean;
  compact?: boolean;
}

export const EvaluationScorecard: React.FC<EvaluationScorecardProps> = ({
  evaluation,
  mode = 'view',
  onScoreUpdate,
  showAverage = true,
  compact = false
}) => {
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [tempScores, setTempScores] = useState<Record<string, { score: number; comment?: string }>>({});

  const getScoreColor = (score: number) => {
    if (score >= 4.5) return 'var(--color-success)'; // Groen
    if (score >= 3.5) return 'var(--color-success)'; // Lichtgroen
    if (score >= 2.5) return 'var(--color-warning)'; // Oranje
    if (score >= 1.5) return 'var(--color-warning)'; // Lichtoranje
    return 'var(--color-danger)'; // Rood
  };

  const getScoreLabel = (score: number) => {
    if (score >= 4.5) return 'Uitstekend';
    if (score >= 3.5) return 'Goed';
    if (score >= 2.5) return 'Voldoende';
    if (score >= 1.5) return 'Matig';
    return 'Onvoldoende';
  };

  const handleScoreClick = (categoryId: string) => {
    if (mode === 'edit') {
      setEditingCategory(categoryId);
      const current = evaluation.categories.find(c => c.id === categoryId);
      setTempScores({
        ...tempScores,
        [categoryId]: {
          score: current?.score?.score || 3,
          comment: current?.score?.comment || ''
        }
      });
    }
  };

  const handleScoreChange = (categoryId: string, score: number, comment?: string) => {
    setTempScores({
      ...tempScores,
      [categoryId]: { score, comment }
    });
  };

  const saveScore = (categoryId: string) => {
    const temp = tempScores[categoryId];
    if (temp && onScoreUpdate) {
      onScoreUpdate(categoryId, temp.score, temp.comment);
    }
    setEditingCategory(null);
  };

  const cancelEdit = (categoryId: string) => {
    setEditingCategory(null);
    const newTemp = { ...tempScores };
    delete newTemp[categoryId];
    setTempScores(newTemp);
  };

  const renderScoreInput = (category: EvaluationCategory & { score?: EvaluationScore }) => {
    const isEditing = editingCategory === category.id;
    const currentScore = category.score?.score;
    const temp = tempScores[category.id];

    if (isEditing && temp) {
      return (
        <div style={{
          backgroundColor: 'var(--color-bg-secondary)',
          border: '1px solid var(--color-border)',
          borderRadius: '8px',
          padding: '12px',
          marginTop: '8px'
        }}>
          {/* Score selector */}
          <div style={{ marginBottom: '8px' }}>
            <label style={{ fontSize: '12px', fontWeight: '500', color: 'var(--color-text)', marginBottom: '4px', display: 'block' }}>
              Score (1-5):
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[1, 2, 3, 4, 5].map(score => (
                <button
                  key={score}
                  onClick={() => handleScoreChange(category.id, score, temp.comment)}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '6px',
                    border: `2px solid ${temp.score === score ? 'var(--color-primary)' : 'var(--color-border)'}`,
                    backgroundColor: temp.score === score ? 'var(--color-primary-bg)' : 'var(--color-card-bg)',
                    color: temp.score === score ? 'var(--color-primary)' : 'var(--color-text)',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {score}
                </button>
              ))}
            </div>
          </div>

          {/* Comment input */}
          <div style={{ marginBottom: '12px' }}>
            <label style={{ fontSize: '12px', fontWeight: '500', color: 'var(--color-text)', marginBottom: '4px', display: 'block' }}>
              Opmerking:
            </label>
            <textarea
              value={temp.comment || ''}
              onChange={(e) => handleScoreChange(category.id, temp.score, e.target.value)}
              placeholder="Voeg een opmerking toe..."
              style={{
                width: '100%',
                minHeight: '60px',
                padding: '8px',
                border: '1px solid var(--color-border)',
                borderRadius: '6px',
                fontSize: '13px',
                resize: 'vertical'
              }}
            />
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
            <button
              onClick={() => cancelEdit(category.id)}
              style={{
                padding: '6px 12px',
                fontSize: '12px',
                backgroundColor: 'var(--color-card-bg)',
                color: 'var(--color-text-muted)',
                border: '1px solid var(--color-border)',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Annuleren
            </button>
            <button
              onClick={() => saveScore(category.id)}
              style={{
                padding: '6px 12px',
                fontSize: '12px',
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-sidebar-text)',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Opslaan
            </button>
          </div>
        </div>
      );
    }

    return (
      <div 
        onClick={() => handleScoreClick(category.id)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px',
          backgroundColor: 'var(--color-card-bg)',
          border: '1px solid var(--color-border)',
          borderRadius: '8px',
          cursor: mode === 'edit' ? 'pointer' : 'default',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          if (mode === 'edit') {
            e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)';
            e.currentTarget.style.borderColor = 'var(--color-text-muted)';
          }
        }}
        onMouseLeave={(e) => {
          if (mode === 'edit') {
            e.currentTarget.style.backgroundColor = 'var(--color-card-bg)';
            e.currentTarget.style.borderColor = 'var(--color-border)';
          }
        }}
      >
        {/* Category info */}
        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: compact ? '14px' : '16px',
            fontWeight: '600',
            color: 'var(--color-text)',
            marginBottom: '4px'
          }}>
            {category.label}
          </div>
          {category.description && (
            <div style={{
              fontSize: '12px',
              color: 'var(--color-text-muted)',
              lineHeight: '1.4'
            }}>
              {category.description}
            </div>
          )}
        </div>

        {/* Score display */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {currentScore !== undefined ? (
            <>
              <div style={{ textAlign: 'right' }}>
                <div style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  color: getScoreColor(currentScore),
                  lineHeight: '1'
                }}>
                  {currentScore}
                </div>
                <div style={{
                  fontSize: '11px',
                  color: 'var(--color-text-muted)',
                  marginTop: '2px'
                }}>
                  {getScoreLabel(currentScore)}
                </div>
              </div>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: getScoreColor(currentScore)
              }} />
            </>
          ) : (
            <div style={{
              padding: '8px 16px',
              backgroundColor: 'var(--color-bg-secondary)',
              borderRadius: '6px',
              fontSize: '13px',
              color: 'var(--color-text-muted)'
            }}>
              {mode === 'edit' ? 'Klik om te beoordelen' : 'Niet beoordeeld'}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div style={{
      backgroundColor: 'var(--color-card-bg)',
      borderRadius: '12px',
      border: '1px solid var(--color-border)',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        padding: compact ? '16px' : '20px',
        borderBottom: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-bg-secondary)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start'
        }}>
          <div>
            <h3 style={{
              fontSize: compact ? '16px' : '18px',
              fontWeight: '600',
              color: 'var(--color-text)',
              margin: '0 0 4px 0'
            }}>
              {evaluation.template.title}
            </h3>
            {evaluation.template.description && (
              <p style={{
                fontSize: '13px',
                color: 'var(--color-text-muted)',
                margin: 0,
                lineHeight: '1.4'
              }}>
                {evaluation.template.description}
              </p>
            )}
          </div>
          
          {showAverage && (
            <div style={{ textAlign: 'right' }}>
              <div style={{
                fontSize: '13px',
                color: 'var(--color-text-muted)',
                marginBottom: '2px'
              }}>
                Gemiddelde
              </div>
              <div style={{
                fontSize: '20px',
                fontWeight: '700',
                color: getScoreColor(evaluation.averageScore)
              }}>
                {evaluation.averageScore.toFixed(1)}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Categories */}
      <div style={{ padding: compact ? '16px' : '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {evaluation.categories.map(category => (
            <div key={category.id}>
              {renderScoreInput(category)}
              
              {/* Show comment if exists and not editing */}
              {!editingCategory && category.score?.comment && (
                <div style={{
                  marginTop: '8px',
                  padding: '8px 12px',
                  backgroundColor: 'var(--color-bg-secondary)',
                  borderLeft: '3px solid var(--color-primary)',
                  borderRadius: '4px',
                  fontSize: '12px',
                  color: 'var(--color-text)',
                  fontStyle: 'italic'
                }}>
                  "{category.score.comment}"
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty state */}
        {evaluation.categories.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '40px 20px',
            color: 'var(--color-text-muted)'
          }}>
            <div style={{ fontSize: '14px', marginBottom: '8px' }}>
              Geen evaluatiecategorieën beschikbaar
            </div>
            <div style={{ fontSize: '12px' }}>
              Maak eerst een evaluatie template voor deze vacature
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      {mode === 'edit' && (
        <div style={{
          padding: '16px 20px',
          borderTop: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-bg-secondary)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
            Klik op een categorie om de score aan te passen
          </div>
          <div style={{
            fontSize: '12px',
            color: 'var(--color-text-muted)'
          }}>
            Laatst bijgewerkt: {new Date(evaluation.lastUpdated).toLocaleDateString('nl-NL')}
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import type { FilledEvaluation } from './EvaluationFormFiller';
import { finalScoreLabels } from '../types/evaluationBuilder';

interface CandidateEvaluationsListProps {
  evaluations: FilledEvaluation[];
  onAddEvaluation: () => void;
}

// SVG Smiley Component
const SmileyIcon: React.FC<{ type: 'very_sad' | 'sad' | 'happy' | 'very_happy'; size?: number; color?: string }> = ({ 
  type, 
  size = 24, 
  color = 'currentColor' 
}) => {
  const getPath = () => {
    switch (type) {
      case 'very_sad':
        return (
          <>
            <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill="none" />
            <circle cx="8" cy="9" r="1.5" fill={color} />
            <circle cx="16" cy="9" r="1.5" fill={color} />
            <path d="M8 17c1.5-2 5.5-2 8 0" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
          </>
        );
      case 'sad':
        return (
          <>
            <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill="none" />
            <circle cx="8" cy="9" r="1.5" fill={color} />
            <circle cx="16" cy="9" r="1.5" fill={color} />
            <path d="M8 16c1.5-1.5 5.5-1.5 8 0" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
          </>
        );
      case 'happy':
        return (
          <>
            <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill="none" />
            <circle cx="8" cy="9" r="1.5" fill={color} />
            <circle cx="16" cy="9" r="1.5" fill={color} />
            <path d="M8 14c1.5 1.5 5.5 1.5 8 0" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
          </>
        );
      case 'very_happy':
        return (
          <>
            <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill="none" />
            <circle cx="8" cy="9" r="1.5" fill={color} />
            <circle cx="16" cy="9" r="1.5" fill={color} />
            <path d="M7 13c1.5 3 7.5 3 10 0" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
          </>
        );
    }
  };

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: 'block' }}>
      {getPath()}
    </svg>
  );
};

const smileyTypes: Record<string, 'very_sad' | 'sad' | 'happy' | 'very_happy'> = {
  niet_goed: 'very_sad',
  misschien: 'sad',
  goed: 'happy',
  zeer_goed: 'very_happy'
};

// Evaluation Detail View
const EvaluationDetail: React.FC<{
  evaluation: FilledEvaluation;
  onClose: () => void;
}> = ({ evaluation, onClose }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('nl-NL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatValue = (answer: FilledEvaluation['answers'][0]) => {
    if (answer.value === null || answer.value === undefined) {
      return <span style={{ color: 'var(--color-text-muted)', fontStyle: 'italic' }}>Niet ingevuld</span>;
    }

    switch (answer.questionType) {
      case 'scorecard':
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {Array.from({ length: answer.value as number }, (_, i) => (
              <span key={i} style={{ color: 'var(--color-warning)' }}>★</span>
            ))}
            <span style={{ marginLeft: '8px', color: 'var(--color-text)' }}>{answer.value}/5</span>
          </div>
        );
      case 'yes_no':
        return answer.value ? (
          <span style={{ color: 'var(--color-success)', fontWeight: '500' }}>Ja</span>
        ) : (
          <span style={{ color: 'var(--color-danger)', fontWeight: '500' }}>Nee</span>
        );
      case 'multiple_choice':
      case 'multiple_choice_title':
        return Array.isArray(answer.value) ? answer.value.join(', ') : String(answer.value);
      default:
        return String(answer.value);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'var(--color-card-bg)',
        borderRadius: '16px',
        maxWidth: '700px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto'
      }}>
        {/* Header */}
        <div style={{
          padding: '24px',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start'
        }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'var(--color-text)', marginBottom: '4px' }}>
              {evaluation.templateName}
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>
              {evaluation.category} • Ingevuld door {evaluation.filledBy}
            </p>
            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
              {formatDate(evaluation.filledAt)}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              padding: '8px',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '20px',
              color: 'var(--color-text-muted)'
            }}
          >
            ✕
          </button>
        </div>

        {/* Answers */}
        <div style={{ padding: '24px' }}>
          {evaluation.answers.map((answer, index) => (
            <div
              key={answer.questionId}
              style={{
                padding: '16px',
                backgroundColor: index % 2 === 0 ? 'var(--color-bg-secondary)' : 'var(--color-card-bg)',
                borderRadius: '8px',
                marginBottom: '8px'
              }}
            >
              <div style={{ fontSize: '14px', fontWeight: '500', color: 'var(--color-text)', marginBottom: '8px' }}>
                {answer.questionLabel}
              </div>
              <div style={{ fontSize: '14px', color: 'var(--color-text)' }}>
                {formatValue(answer)}
              </div>
            </div>
          ))}

          {/* Final Score */}
          {evaluation.finalScore && (
            <div style={{
              marginTop: '24px',
              padding: '20px',
              backgroundColor: finalScoreLabels[evaluation.finalScore].bgColor,
              borderRadius: '12px',
              border: `2px solid ${finalScoreLabels[evaluation.finalScore].color}`,
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}>
              <SmileyIcon 
                type={smileyTypes[evaluation.finalScore]} 
                size={48} 
                color={finalScoreLabels[evaluation.finalScore].color} 
              />
              <div>
                <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
                  Eindbeoordeling
                </div>
                <div style={{ 
                  fontSize: '18px', 
                  fontWeight: '600', 
                  color: finalScoreLabels[evaluation.finalScore].color 
                }}>
                  {finalScoreLabels[evaluation.finalScore].label}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid var(--color-border)',
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '10px 20px',
              backgroundColor: 'var(--color-bg-secondary)',
              color: 'var(--color-text)',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            Sluiten
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Component
export const CandidateEvaluationsList: React.FC<CandidateEvaluationsListProps> = ({
  evaluations,
  onAddEvaluation
}) => {
  const [selectedEvaluation, setSelectedEvaluation] = useState<FilledEvaluation | null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('nl-NL', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div style={{
      backgroundColor: 'var(--color-card-bg)',
      borderRadius: '12px',
      border: '1px solid var(--color-border)',
      padding: '24px'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--color-text)', margin: 0 }}>
          Evaluaties ({evaluations.length})
        </h3>
        <button
          onClick={onAddEvaluation}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 16px',
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-sidebar-text)',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          <span>+</span>
          Evaluatie toevoegen
        </button>
      </div>

      {/* Evaluations List */}
      {evaluations.length === 0 ? (
        <div style={{
          padding: '40px',
          textAlign: 'center',
          color: 'var(--color-text-muted)',
          backgroundColor: 'var(--color-bg-secondary)',
          borderRadius: '8px'
        }}>
          <div style={{ fontSize: '32px', marginBottom: '12px' }}>📋</div>
          <div style={{ fontSize: '14px' }}>Nog geen evaluaties toegevoegd</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {evaluations.map(evaluation => (
            <button
              key={evaluation.id}
              onClick={() => setSelectedEvaluation(evaluation)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '16px',
                backgroundColor: 'var(--color-bg-secondary)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-button-hover-bg)';
                e.currentTarget.style.borderColor = 'var(--color-text-muted)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)';
                e.currentTarget.style.borderColor = 'var(--color-border)';
              }}
            >
              {/* Score Icon */}
              {evaluation.finalScore && (
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: finalScoreLabels[evaluation.finalScore].bgColor,
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <SmileyIcon 
                    type={smileyTypes[evaluation.finalScore]} 
                    size={28} 
                    color={finalScoreLabels[evaluation.finalScore].color} 
                  />
                </div>
              )}

              {/* Info */}
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--color-text)', marginBottom: '4px' }}>
                  {evaluation.templateName}
                </div>
                <div style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
                  {evaluation.category} • {evaluation.filledBy} • {formatDate(evaluation.filledAt)}
                </div>
              </div>

              {/* Final Score Badge */}
              {evaluation.finalScore && (
                <div style={{
                  padding: '6px 12px',
                  backgroundColor: finalScoreLabels[evaluation.finalScore].bgColor,
                  color: finalScoreLabels[evaluation.finalScore].color,
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: '500'
                }}>
                  {finalScoreLabels[evaluation.finalScore].label}
                </div>
              )}

              <div style={{ color: 'var(--color-text-muted)', fontSize: '16px' }}>→</div>
            </button>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {selectedEvaluation && (
        <EvaluationDetail
          evaluation={selectedEvaluation}
          onClose={() => setSelectedEvaluation(null)}
        />
      )}
    </div>
  );
};

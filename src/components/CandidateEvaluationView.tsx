import React, { useState } from 'react';
import { EvaluationScorecard } from './EvaluationScorecard';
import { getCandidateEvaluation } from '../utils/mockEvaluations';
import type { EvaluationSummary } from '../types/evaluations';

interface CandidateEvaluationViewProps {
  candidateId: string;
  candidateName: string;
  vacancyId?: string;
  mode?: 'view' | 'edit';
  onScoreUpdate?: (candidateId: string, vacancyId: string, categoryId: string, score: number, comment?: string) => void;
}

export const CandidateEvaluationView: React.FC<CandidateEvaluationViewProps> = ({
  candidateId,
  candidateName,
  vacancyId,
  mode = 'view',
  onScoreUpdate
}) => {
  const [selectedVacancyId, setSelectedVacancyId] = useState<string | null>(vacancyId || null);
  const [showHistory, setShowHistory] = useState(false);

  // Get evaluation for selected vacancy
  const currentEvaluation = selectedVacancyId 
    ? getCandidateEvaluation(candidateId, selectedVacancyId)
    : undefined;

  // Calculate overall summary across all vacancies (mock data)
  const evaluationSummary: EvaluationSummary = {
    totalCandidates: 1,
    averageScore: 3.8,
    categoryAverages: {
      'Communicatie': 4.2,
      'Technisch': 3.5,
      'Commercieel': 3.8,
      'Creativiteit': 4.0
    },
    completionRate: 75
  };

  const handleScoreUpdate = (categoryId: string, score: number, comment?: string) => {
    if (selectedVacancyId && onScoreUpdate) {
      onScoreUpdate(candidateId, selectedVacancyId, categoryId, score, comment);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 4.5) return 'var(--color-success)';
    if (score >= 3.5) return 'var(--color-success)';
    if (score >= 2.5) return 'var(--color-warning)';
    if (score >= 1.5) return 'var(--color-warning)';
    return 'var(--color-danger)';
  };

  const getCompletionColor = (rate: number) => {
    if (rate >= 80) return 'var(--color-success)';
    if (rate >= 60) return 'var(--color-warning)';
    return 'var(--color-danger)';
  };

  // Mock vacancies for dropdown
  const mockVacancies = [
    { id: '1', title: 'Sales Professional' },
    { id: '2', title: 'Senior Developer' },
    { id: '3', title: 'Marketing Specialist' },
    { id: '4', title: 'DevOps Engineer' }
  ];

  const selectedVacancy = mockVacancies.find(v => v.id === selectedVacancyId);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{
        backgroundColor: 'var(--color-card-bg)',
        borderRadius: '12px',
        padding: '24px',
        border: '1px solid var(--color-border)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '20px'
        }}>
          <div>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: 'var(--color-text)',
              margin: '0 0 8px 0'
            }}>
              Evaluatie: {candidateName}
            </h2>
            {selectedVacancy && (
              <p style={{
                fontSize: '14px',
                color: 'var(--color-text-muted)',
                margin: 0
              }}>
                Vacature: {selectedVacancy.title}
              </p>
            )}
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => setShowHistory(!showHistory)}
              style={{
                padding: '8px 16px',
                backgroundColor: showHistory ? 'var(--color-primary)' : 'var(--color-card-bg)',
                color: showHistory ? 'var(--color-sidebar-text)' : 'var(--color-text)',
                border: '1px solid var(--color-border)',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {showHistory ? 'Verberg historie' : 'Toon historie'}
            </button>
          </div>
        </div>

        {/* Vacancy selector */}
        {!vacancyId && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px',
            backgroundColor: 'var(--color-bg-secondary)',
            borderRadius: '8px',
            border: '1px solid var(--color-border)'
          }}>
            <label style={{
              fontSize: '14px',
              fontWeight: '500',
              color: 'var(--color-text)',
              minWidth: '80px'
            }}>
              Vacature:
            </label>
            <select
              value={selectedVacancyId || ''}
              onChange={(e) => setSelectedVacancyId(e.target.value || null)}
              style={{
                flex: 1,
                maxWidth: '300px',
                padding: '8px 12px',
                border: '1px solid var(--color-border)',
                borderRadius: '6px',
                fontSize: '14px',
                backgroundColor: 'var(--color-card-bg)'
              }}
            >
              <option value="">Selecteer een vacature...</option>
              {mockVacancies.map(vacancy => (
                <option key={vacancy.id} value={vacancy.id}>
                  {vacancy.title}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Summary Cards */}
      {selectedVacancyId && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px'
        }}>
          <div style={{
            backgroundColor: 'var(--color-card-bg)',
            borderRadius: '8px',
            padding: '16px',
            border: '1px solid var(--color-border)'
          }}>
            <div style={{
              fontSize: '12px',
              color: 'var(--color-text-muted)',
              marginBottom: '4px',
              textTransform: 'uppercase',
              fontWeight: '500'
            }}>
              Gemiddelde Score
            </div>
            <div style={{
              fontSize: '28px',
              fontWeight: '700',
              color: currentEvaluation ? getScoreColor(currentEvaluation.averageScore) : 'var(--color-text-muted)'
            }}>
              {currentEvaluation ? currentEvaluation.averageScore.toFixed(1) : '-'}
            </div>
          </div>

          <div style={{
            backgroundColor: 'var(--color-card-bg)',
            borderRadius: '8px',
            padding: '16px',
            border: '1px solid var(--color-border)'
          }}>
            <div style={{
              fontSize: '12px',
              color: 'var(--color-text-muted)',
              marginBottom: '4px',
              textTransform: 'uppercase',
              fontWeight: '500'
            }}>
              Voltooid
            </div>
            <div style={{
              fontSize: '28px',
              fontWeight: '700',
              color: getCompletionColor(evaluationSummary.completionRate)
            }}>
              {evaluationSummary.completionRate}%
            </div>
          </div>

          <div style={{
            backgroundColor: 'var(--color-card-bg)',
            borderRadius: '8px',
            padding: '16px',
            border: '1px solid var(--color-border)'
          }}>
            <div style={{
              fontSize: '12px',
              color: 'var(--color-text-muted)',
              marginBottom: '4px',
              textTransform: 'uppercase',
              fontWeight: '500'
            }}>
              Categorieën
            </div>
            <div style={{
              fontSize: '28px',
              fontWeight: '700',
              color: 'var(--color-text)'
            }}>
              {currentEvaluation?.categories.length || 0}
            </div>
          </div>

          <div style={{
            backgroundColor: 'var(--color-card-bg)',
            borderRadius: '8px',
            padding: '16px',
            border: '1px solid var(--color-border)'
          }}>
            <div style={{
              fontSize: '12px',
              color: 'var(--color-text-muted)',
              marginBottom: '4px',
              textTransform: 'uppercase',
              fontWeight: '500'
            }}>
              Laatste update
            </div>
            <div style={{
              fontSize: '14px',
              fontWeight: '500',
              color: 'var(--color-text)'
            }}>
              {currentEvaluation ? new Date(currentEvaluation.lastUpdated).toLocaleDateString('nl-NL') : '-'}
            </div>
          </div>
        </div>
      )}

      {/* Main Evaluation */}
      {currentEvaluation && (
        <EvaluationScorecard
          evaluation={currentEvaluation}
          mode={mode}
          onScoreUpdate={handleScoreUpdate}
          showAverage={false} // Already shown in summary
        />
      )}

      {/* No evaluation selected */}
      {!currentEvaluation && selectedVacancyId && (
        <div style={{
          backgroundColor: 'var(--color-card-bg)',
          borderRadius: '12px',
          padding: '40px',
          border: '1px solid var(--color-border)',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '16px',
            color: 'var(--color-text-muted)',
            marginBottom: '8px'
          }}>
            Geen evaluatie beschikbaar
          </div>
          <div style={{
            fontSize: '14px',
            color: 'var(--color-text-muted)'
          }}>
            Er is nog geen evaluatie template gekoppeld aan deze vacature
          </div>
        </div>
      )}

      {/* No vacancy selected */}
      {!selectedVacancyId && (
        <div style={{
          backgroundColor: 'var(--color-card-bg)',
          borderRadius: '12px',
          padding: '40px',
          border: '1px solid var(--color-border)',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '16px',
            color: 'var(--color-text-muted)',
            marginBottom: '8px'
          }}>
            Selecteer een vacature
          </div>
          <div style={{
            fontSize: '14px',
            color: 'var(--color-text-muted)'
          }}>
            Kies een vacature om de evaluatie van {candidateName} te bekijken
          </div>
        </div>
      )}

      {/* History Section */}
      {showHistory && (
        <div style={{
          backgroundColor: 'var(--color-card-bg)',
          borderRadius: '12px',
          padding: '24px',
          border: '1px solid var(--color-border)'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: 'var(--color-text)',
            margin: '0 0 16px 0'
          }}>
            Evaluatie Historie
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Mock history items */}
            <div style={{
              padding: '12px',
              backgroundColor: 'var(--color-bg-secondary)',
              borderRadius: '8px',
              border: '1px solid var(--color-border)'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: 'var(--color-text)',
                    marginBottom: '4px'
                  }}>
                    Sales Professional - Telefoon screening
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: 'var(--color-text-muted)'
                  }}>
                    25 november 2024 door Jan Janssen
                  </div>
                </div>
                <div style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: getScoreColor(4.2)
                }}>
                  4.2
                </div>
              </div>
            </div>

            <div style={{
              padding: '12px',
              backgroundColor: 'var(--color-bg-secondary)',
              borderRadius: '8px',
              border: '1px solid var(--color-border)'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: 'var(--color-text)',
                    marginBottom: '4px'
                  }}>
                    Senior Developer - Technisch interview
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: 'var(--color-text-muted)'
                  }}>
                    20 november 2024 door Piet Pietersen
                  </div>
                </div>
                <div style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: getScoreColor(3.8)
                }}>
                  3.8
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

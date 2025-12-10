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
    if (score >= 4.5) return '#22c55e';
    if (score >= 3.5) return '#84cc16';
    if (score >= 2.5) return '#f59e0b';
    if (score >= 1.5) return '#fb923c';
    return '#ef4444';
  };

  const getCompletionColor = (rate: number) => {
    if (rate >= 80) return '#22c55e';
    if (rate >= 60) return '#f59e0b';
    return '#ef4444';
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
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '24px',
        border: '1px solid #e5e7eb'
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
              color: '#111827',
              margin: '0 0 8px 0'
            }}>
              Evaluatie: {candidateName}
            </h2>
            {selectedVacancy && (
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
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
                backgroundColor: showHistory ? '#3b82f6' : 'white',
                color: showHistory ? 'white' : '#374151',
                border: '1px solid #d1d5db',
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
            backgroundColor: '#f8fafc',
            borderRadius: '8px',
            border: '1px solid #e5e7eb'
          }}>
            <label style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
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
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                backgroundColor: 'white'
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
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '16px',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{
              fontSize: '12px',
              color: '#6b7280',
              marginBottom: '4px',
              textTransform: 'uppercase',
              fontWeight: '500'
            }}>
              Gemiddelde Score
            </div>
            <div style={{
              fontSize: '28px',
              fontWeight: '700',
              color: currentEvaluation ? getScoreColor(currentEvaluation.averageScore) : '#6b7280'
            }}>
              {currentEvaluation ? currentEvaluation.averageScore.toFixed(1) : '-'}
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '16px',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{
              fontSize: '12px',
              color: '#6b7280',
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
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '16px',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{
              fontSize: '12px',
              color: '#6b7280',
              marginBottom: '4px',
              textTransform: 'uppercase',
              fontWeight: '500'
            }}>
              Categorieën
            </div>
            <div style={{
              fontSize: '28px',
              fontWeight: '700',
              color: '#111827'
            }}>
              {currentEvaluation?.categories.length || 0}
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '16px',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{
              fontSize: '12px',
              color: '#6b7280',
              marginBottom: '4px',
              textTransform: 'uppercase',
              fontWeight: '500'
            }}>
              Laatste update
            </div>
            <div style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#111827'
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
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '40px',
          border: '1px solid #e5e7eb',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '16px',
            color: '#6b7280',
            marginBottom: '8px'
          }}>
            Geen evaluatie beschikbaar
          </div>
          <div style={{
            fontSize: '14px',
            color: '#9ca3af'
          }}>
            Er is nog geen evaluatie template gekoppeld aan deze vacature
          </div>
        </div>
      )}

      {/* No vacancy selected */}
      {!selectedVacancyId && (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '40px',
          border: '1px solid #e5e7eb',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '16px',
            color: '#6b7280',
            marginBottom: '8px'
          }}>
            Selecteer een vacature
          </div>
          <div style={{
            fontSize: '14px',
            color: '#9ca3af'
          }}>
            Kies een vacature om de evaluatie van {candidateName} te bekijken
          </div>
        </div>
      )}

      {/* History Section */}
      {showHistory && (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '24px',
          border: '1px solid #e5e7eb'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#111827',
            margin: '0 0 16px 0'
          }}>
            Evaluatie Historie
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Mock history items */}
            <div style={{
              padding: '12px',
              backgroundColor: '#f8fafc',
              borderRadius: '8px',
              border: '1px solid #e5e7eb'
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
                    color: '#111827',
                    marginBottom: '4px'
                  }}>
                    Sales Professional - Telefoon screening
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#6b7280'
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
              backgroundColor: '#f8fafc',
              borderRadius: '8px',
              border: '1px solid #e5e7eb'
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
                    color: '#111827',
                    marginBottom: '4px'
                  }}>
                    Senior Developer - Technisch interview
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#6b7280'
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

import React from 'react';
import { vacancyCandidatesByVacancyId } from '../../utils/mockVacancies';
import type { VacancyCandidate } from '../../types/vacancy';

export const MiniFunnel: React.FC = () => {
  // Define stages for mini funnel
  const stages: ('Gesolliciteerd' | 'Telefonisch interview' | 'Voorgesteld')[] = [
    'Gesolliciteerd',
    'Telefonisch interview', 
    'Voorgesteld'
  ];

  // Get all candidates across all vacancies
  const allCandidates = Object.values(vacancyCandidatesByVacancyId).flat();
  
  // Group candidates by stage
  const candidatesByStage = stages.reduce((acc, stage) => {
    acc[stage] = allCandidates.filter(candidate => candidate.stage === stage);
    return acc;
  }, {} as Record<string, VacancyCandidate[]>);

  const getStageColor = (stage: 'Gesolliciteerd' | 'Geen gehoor' | 'Telefonisch interview' | 'In afwachting CV' | 'Twijfel kandidaat' | 'Afwijzen' | 'Voorgesteld') => {
    const colors = {
      'Gesolliciteerd': 'var(--color-primary-bg)',
      'Geen gehoor': 'var(--color-bg-secondary)',
      'Telefonisch interview': 'var(--color-warning-bg)',
      'In afwachting CV': 'var(--color-warning-bg)',
      'Twijfel kandidaat': 'var(--color-warning-bg)',
      'Afwijzen': 'var(--color-danger-bg)',
      'Voorgesteld': 'var(--color-success-bg)'
    };
    return colors[stage] || 'var(--color-bg-secondary)';
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
        Recruitment Funnel
      </h3>

      {/* Mini Pipeline */}
      <div style={{
        display: 'flex',
        gap: '12px',
        marginBottom: '16px'
      }}>
        {stages.map((stage) => {
          const stageCandidates = candidatesByStage[stage] || [];
          
          return (
            <div
              key={stage}
              style={{
                flex: 1,
                backgroundColor: getStageColor(stage),
                borderRadius: '8px',
                padding: '16px',
                textAlign: 'center',
                border: '1px solid rgba(0, 0, 0, 0.1)'
              }}
            >
              {/* Stage Name */}
              <div style={{
                fontSize: '12px',
                fontWeight: '600',
                color: 'var(--color-text)',
                marginBottom: '8px'
              }}>
                {stage}
              </div>

              {/* Candidate Count */}
              <div style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: 'var(--color-text)'
              }}>
                {stageCandidates.length}
              </div>

              {/* Label */}
              <div style={{
                fontSize: '11px',
                color: 'var(--color-text-muted)',
                marginTop: '4px'
              }}>
                kandidaten
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div style={{
        padding: '12px',
        backgroundColor: 'var(--color-bg-secondary)',
        borderRadius: '6px',
        border: '1px solid var(--color-border)'
      }}>
        <div style={{
          fontSize: '13px',
          color: 'var(--color-text-muted)'
        }}>
          Totaal <strong style={{ color: 'var(--color-text)' }}>{allCandidates.length}</strong> kandidaten in pipeline
        </div>
      </div>
    </div>
  );
};

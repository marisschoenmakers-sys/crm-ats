import React from 'react';
import { vacancyCandidatesByVacancyId } from '../../utils/mockVacancies';

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
  }, {} as Record<string, any[]>);

  const getStageColor = (stage: 'Gesolliciteerd' | 'Geen gehoor' | 'Telefonisch interview' | 'In afwachting CV' | 'Twijfel kandidaat' | 'Afwijzen' | 'Voorgesteld') => {
    const colors = {
      'Gesolliciteerd': '#dbeafe',
      'Geen gehoor': '#f3f4f6',
      'Telefonisch interview': '#e9d5ff',
      'In afwachting CV': '#fef3c7',
      'Twijfel kandidaat': '#fed7aa',
      'Afwijzen': '#fee2e2',
      'Voorgesteld': '#dcfce7'
    };
    return colors[stage] || '#f3f4f6';
  };

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '24px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb'
    }}>
      {/* Title */}
      <h3 style={{
        fontSize: '18px',
        fontWeight: '600',
        color: '#111827',
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
                color: '#374151',
                marginBottom: '8px'
              }}>
                {stage}
              </div>

              {/* Candidate Count */}
              <div style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#111827'
              }}>
                {stageCandidates.length}
              </div>

              {/* Label */}
              <div style={{
                fontSize: '11px',
                color: '#6b7280',
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
        backgroundColor: '#f9fafb',
        borderRadius: '6px',
        border: '1px solid #e5e7eb'
      }}>
        <div style={{
          fontSize: '13px',
          color: '#6b7280'
        }}>
          Totaal <strong style={{ color: '#111827' }}>{allCandidates.length}</strong> kandidaten in pipeline
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { vacancyCandidatesByVacancyId } from '../utils/mockVacancies';
import type { VacancyCandidate } from '../types/vacancy';

interface VacancyPipelineProps {
  vacancyId: string;
}

export const VacancyPipeline: React.FC<VacancyPipelineProps> = ({ vacancyId }) => {
  // Get candidates for this vacancy
  const vacancyCandidates = vacancyCandidatesByVacancyId[vacancyId] || [];
  
  // Define stages (recruitment funnel from left to right)
  const stages = [
    'Gesolliciteerd',
    'Geen gehoor',
    'Telefonisch interview',
    'In afwachting van CV',
    'Twijfel kandidaat',
    'Nog afwijzen',
    'Voorgesteld',
    'Afspraak op locatie',
    'Aanbod',
    'Aangenomen'
  ];

  // Group candidates by stage
  const candidatesByStage = stages.reduce((acc, stage) => {
    acc[stage] = vacancyCandidates.filter(candidate => candidate.stage === stage);
    return acc;
  }, {} as Record<string, VacancyCandidate[]>);

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '16px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      width: '100%',
      margin: '0'
    }}>
      {/* Title */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h2 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#111827',
          margin: 0
        }}>
          Vacature Funnel
        </h2>
        
        {/* Summary */}
        <div style={{
          fontSize: '14px',
          color: '#6b7280'
        }}>
          <span style={{ fontWeight: '500' }}>{vacancyCandidates.length}</span> kandidaten
        </div>
      </div>

      {/* Pipeline Container */}
      <div style={{
        display: 'flex',
        gap: '20px',
        overflowX: 'auto',
        paddingBottom: '16px',
        minHeight: '70vh',
        width: '100%'
      }}>
        {stages.map((stage) => {
          const stageCandidates = candidatesByStage[stage] || [];
          
          return (
            <div
              key={stage}
              style={{
                minWidth: '300px',
                maxWidth: '350px',
                width: '300px',
                backgroundColor: '#f3f4f6',
                borderRadius: '8px',
                padding: '16px',
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
              }}
            >
              {/* Stage Header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '12px',
                paddingBottom: '8px',
                borderBottom: '1px solid #e5e7eb'
              }}>
                <h3 style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#111827',
                  margin: 0
                }}>
                  {stage}
                </h3>
                
                {/* Candidate Count Badge */}
                <span style={{
                  backgroundColor: '#e5e7eb',
                  color: '#374151',
                  fontSize: '12px',
                  fontWeight: '500',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  minWidth: '24px',
                  textAlign: 'center'
                }}>
                  {stageCandidates.length}
                </span>
              </div>

              {/* Candidates List */}
              <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column'
              }}>
                {stageCandidates.length === 0 ? (
                  <div style={{
                    fontSize: '12px',
                    color: '#9ca3af',
                    fontStyle: 'italic',
                    textAlign: 'center',
                    padding: '20px 0'
                  }}>
                    Geen kandidaten
                  </div>
                ) : (
                  stageCandidates.map((candidate) => (
                    <VacancyCandidateCard
                      key={candidate.id}
                      name={candidate.fullName}
                      role={candidate.role}
                      stage={candidate.stage}
                      appliedAt={candidate.appliedAt}
                      source={candidate.source}
                    />
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div style={{
        marginTop: '24px',
        padding: '16px',
        backgroundColor: '#f9fafb',
        borderRadius: '8px',
        border: '1px solid #e5e7eb'
      }}>
        <div style={{
          fontSize: '14px',
          fontWeight: '500',
          color: '#111827',
          marginBottom: '8px'
        }}>
          Funnel Statistieken
        </div>
        <div style={{
          display: 'flex',
          gap: '24px',
          fontSize: '13px',
          color: '#6b7280'
        }}>
          <span>Totaal kandidaten: <strong style={{ color: '#111827' }}>{vacancyCandidates.length}</strong></span>
          <span>Actieve stages: <strong style={{ color: '#111827' }}>{stages.filter(stage => candidatesByStage[stage].length > 0).length}</strong></span>
          <span>Gemiddeld per stage: <strong style={{ color: '#111827' }}>{Math.round(vacancyCandidates.length / stages.length)}</strong></span>
        </div>
      </div>
    </div>
  );
};

// Simple candidate card for vacancy pipeline
interface VacancyCandidateCardProps {
  name: string;
  role: string;
  stage: 'Gesolliciteerd' | 'Geen gehoor' | 'Telefonisch interview' | 'In afwachting van CV' | 'Twijfel kandidaat' | 'Nog afwijzen' | 'Voorgesteld' | 'Afspraak op locatie' | 'Aanbod' | 'Aangenomen';
  appliedAt: string;
  source?: string;
}

const VacancyCandidateCard: React.FC<VacancyCandidateCardProps> = ({ 
  name, 
  role, 
  stage, 
  appliedAt, 
  source 
}) => {
  const getStageColor = (stage: 'Gesolliciteerd' | 'Geen gehoor' | 'Telefonisch interview' | 'In afwachting van CV' | 'Twijfel kandidaat' | 'Nog afwijzen' | 'Voorgesteld' | 'Afspraak op locatie' | 'Aanbod' | 'Aangenomen') => {
    const colors = {
      'Gesolliciteerd': '#dbeafe',
      'Geen gehoor': '#f3f4f6',
      'Telefonisch interview': '#e9d5ff',
      'In afwachting van CV': '#fef3c7',
      'Twijfel kandidaat': '#fed7aa',
      'Nog afwijzen': '#fecaca',
      'Voorgesteld': '#dcfce7',
      'Afspraak op locatie': '#bfdbfe',
      'Aanbod': '#c7d2fe',
      'Aangenomen': '#86efac'
    };
    return colors[stage] || '#f3f4f6';
  };

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '12px',
      marginBottom: '8px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      cursor: 'pointer',
      transition: 'box-shadow 0.2s ease, transform 0.2s ease'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
      e.currentTarget.style.transform = 'translateY(-1px)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
      e.currentTarget.style.transform = 'translateY(0)';
    }}
    >
      {/* Candidate Name */}
      <div style={{
        fontSize: '14px',
        fontWeight: '600',
        color: '#111827',
        marginBottom: '6px'
      }}>
        {name}
      </div>

      {/* Role */}
      <div style={{
        fontSize: '13px',
        color: '#374151',
        marginBottom: '4px'
      }}>
        {role}
      </div>

      {/* Stage Badge */}
      <div style={{ marginBottom: '4px' }}>
        <span style={{
          display: 'inline-block',
          padding: '2px 6px',
          borderRadius: '10px',
          fontSize: '11px',
          fontWeight: '500',
          backgroundColor: getStageColor(stage),
          color: '#374151'
        }}>
          {stage}
        </span>
      </div>

      {/* Applied Date */}
      <div style={{
        fontSize: '11px',
        color: '#9ca3af',
        fontStyle: 'italic'
      }}>
        Sinds: {appliedAt}
      </div>

      {/* Optional Source */}
      {source && (
        <div style={{
          fontSize: '10px',
          color: '#9ca3af',
          marginTop: '4px'
        }}>
          Bron: {source}
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { vacancyCandidatesByVacancyId } from '../utils/mockVacancies';
import type { VacancyCandidate } from '../types/vacancy';

// Stage type for all 10 stages
type StageType = 'Gesolliciteerd' | 'Geen gehoor' | 'Telefonisch interview' | 'In afwachting van CV' | 'Twijfel kandidaat' | 'Nog afwijzen' | 'Voorgesteld' | 'Afspraak op locatie' | 'Aanbod' | 'Aangenomen';

interface VacancyPipelineProps {
  vacancyId: string;
}

export const VacancyPipeline: React.FC<VacancyPipelineProps> = ({ vacancyId }) => {
  // Get candidates for this vacancy and make them stateful
  const initialCandidates = vacancyCandidatesByVacancyId[vacancyId] || [];
  const [candidates, setCandidates] = useState<VacancyCandidate[]>(initialCandidates);
  const [draggedCandidate, setDraggedCandidate] = useState<VacancyCandidate | null>(null);
  const [dragOverStage, setDragOverStage] = useState<string | null>(null);
  
  // Define stages (recruitment funnel from left to right)
  const stages: StageType[] = [
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
    acc[stage] = candidates.filter(candidate => candidate.stage === stage);
    return acc;
  }, {} as Record<string, VacancyCandidate[]>);

  // Handle moving a candidate to a new stage
  const moveCandidate = (candidateId: string, newStage: StageType) => {
    setCandidates(prev => prev.map(c => 
      c.id === candidateId ? { ...c, stage: newStage } : c
    ));
  };

  return (
    <div style={{
      backgroundColor: 'var(--color-card-bg)',
      borderRadius: '8px',
      padding: '16px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid var(--color-border)',
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
          color: 'var(--color-text)',
          margin: 0
        }}>
          Vacature Funnel
        </h2>
        
        {/* Summary */}
        <div style={{
          fontSize: '14px',
          color: 'var(--color-text-muted)'
        }}>
          <span style={{ fontWeight: '500' }}>{candidates.length}</span> kandidaten
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
              onDragOver={(e) => {
                e.preventDefault();
                setDragOverStage(stage);
              }}
              onDragLeave={() => setDragOverStage(null)}
              onDrop={(e) => {
                e.preventDefault();
                if (draggedCandidate) {
                  moveCandidate(draggedCandidate.id, stage);
                  setDraggedCandidate(null);
                }
                setDragOverStage(null);
              }}
              style={{
                minWidth: '300px',
                maxWidth: '350px',
                width: '300px',
                backgroundColor: dragOverStage === stage ? 'var(--color-primary-bg)' : 'var(--color-bg-secondary)',
                borderRadius: '8px',
                padding: '16px',
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                border: dragOverStage === stage ? '2px dashed var(--color-primary)' : '2px solid transparent',
                transition: 'background-color 0.2s, border-color 0.2s'
              }}
            >
              {/* Stage Header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '12px',
                paddingBottom: '8px',
                borderBottom: '1px solid var(--color-border)'
              }}>
                <h3 style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: 'var(--color-text)',
                  margin: 0
                }}>
                  {stage}
                </h3>
                
                {/* Candidate Count Badge */}
                <span style={{
                  backgroundColor: 'var(--color-border)',
                  color: 'var(--color-text)',
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
                    color: 'var(--color-text-muted)',
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
                      candidate={candidate}
                      stages={stages}
                      onMoveCandidate={moveCandidate}
                      onDragStart={() => setDraggedCandidate(candidate)}
                      onDragEnd={() => setDraggedCandidate(null)}
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
        backgroundColor: 'var(--color-bg-secondary)',
        borderRadius: '8px',
        border: '1px solid var(--color-border)'
      }}>
        <div style={{
          fontSize: '14px',
          fontWeight: '500',
          color: 'var(--color-text)',
          marginBottom: '8px'
        }}>
          Funnel Statistieken
        </div>
        <div style={{
          display: 'flex',
          gap: '24px',
          fontSize: '13px',
          color: 'var(--color-text-muted)'
        }}>
          <span>Totaal kandidaten: <strong style={{ color: 'var(--color-text)' }}>{candidates.length}</strong></span>
          <span>Actieve stages: <strong style={{ color: 'var(--color-text)' }}>{stages.filter(stage => candidatesByStage[stage].length > 0).length}</strong></span>
          <span>Gemiddeld per stage: <strong style={{ color: 'var(--color-text)' }}>{Math.round(candidates.length / stages.length)}</strong></span>
        </div>
      </div>
    </div>
  );
};

// Candidate card with drag-and-drop and move menu
interface VacancyCandidateCardProps {
  candidate: VacancyCandidate;
  stages: StageType[];
  onMoveCandidate: (candidateId: string, newStage: StageType) => void;
  onDragStart: () => void;
  onDragEnd: () => void;
}

const VacancyCandidateCard: React.FC<VacancyCandidateCardProps> = ({ 
  candidate,
  stages,
  onMoveCandidate,
  onDragStart,
  onDragEnd
}) => {
  const [showMoveMenu, setShowMoveMenu] = useState(false);

  return (
    <div 
      draggable
      onDragStart={(e) => {
        e.dataTransfer.effectAllowed = 'move';
        onDragStart();
      }}
      onDragEnd={onDragEnd}
      style={{
        backgroundColor: 'var(--color-card-bg)',
        borderRadius: '8px',
        padding: '12px',
        marginBottom: '8px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        border: '1px solid var(--color-border)',
        cursor: 'grab',
        transition: 'box-shadow 0.2s ease, transform 0.2s ease',
        position: 'relative'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        e.currentTarget.style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        e.currentTarget.style.transform = 'translateY(0)';
        setShowMoveMenu(false);
      }}
    >
      {/* Header with name and move button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
        <div style={{
          fontSize: '14px',
          fontWeight: '600',
          color: 'var(--color-text)'
        }}>
          {candidate.fullName}
        </div>
        
        {/* Move button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowMoveMenu(!showMoveMenu);
          }}
          style={{
            padding: '4px 8px',
            backgroundColor: 'var(--color-bg-secondary)',
            border: '1px solid var(--color-border)',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '11px',
            color: 'var(--color-text-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          ↔ Verplaats
        </button>
      </div>

      {/* Move Menu Dropdown */}
      {showMoveMenu && (
        <div style={{
          position: 'absolute',
          top: '40px',
          right: '12px',
          backgroundColor: 'var(--color-card-bg)',
          border: '1px solid var(--color-border)',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          zIndex: 100,
          minWidth: '200px',
          maxHeight: '300px',
          overflowY: 'auto'
        }}>
          <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--color-border)', fontSize: '12px', fontWeight: '600', color: 'var(--color-text-muted)' }}>
            Verplaats naar:
          </div>
          {stages.map((stage) => (
            <button
              key={stage}
              onClick={(e) => {
                e.stopPropagation();
                onMoveCandidate(candidate.id, stage);
                setShowMoveMenu(false);
              }}
              disabled={stage === candidate.stage}
              style={{
                display: 'block',
                width: '100%',
                padding: '10px 12px',
                backgroundColor: stage === candidate.stage ? 'var(--color-primary-bg)' : 'transparent',
                border: 'none',
                textAlign: 'left',
                cursor: stage === candidate.stage ? 'default' : 'pointer',
                fontSize: '13px',
                color: stage === candidate.stage ? 'var(--color-primary)' : 'var(--color-text)',
                fontWeight: stage === candidate.stage ? '600' : 'normal',
                borderBottom: '1px solid var(--color-border)'
              }}
              onMouseEnter={(e) => {
                if (stage !== candidate.stage) {
                  e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)';
                }
              }}
              onMouseLeave={(e) => {
                if (stage !== candidate.stage) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              {stage === candidate.stage ? `✓ ${stage}` : stage}
            </button>
          ))}
        </div>
      )}

      {/* Role */}
      <div style={{
        fontSize: '13px',
        color: 'var(--color-text)',
        marginBottom: '4px'
      }}>
        {candidate.role}
      </div>

      {/* Applied Date */}
      <div style={{
        fontSize: '11px',
        color: 'var(--color-text-muted)',
        fontStyle: 'italic'
      }}>
        Sinds: {candidate.appliedAt}
      </div>

      {/* Optional Source */}
      {candidate.source && (
        <div style={{
          fontSize: '10px',
          color: 'var(--color-text-muted)',
          marginTop: '4px'
        }}>
          Bron: {candidate.source}
        </div>
      )}
    </div>
  );
};

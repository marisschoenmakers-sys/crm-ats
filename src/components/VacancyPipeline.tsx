import React, { useState } from 'react';
import { vacancyCandidatesByVacancyId } from '../utils/mockVacancies';
import { FunnelEditorModal } from './FunnelEditorModal';
import type { VacancyCandidate } from '../types/vacancy';

interface FunnelStage {
  id: string;
  name: string;
  color: string;
}

// Default stages
const defaultStages: FunnelStage[] = [
  { id: 'stage-1', name: 'Gesolliciteerd', color: '#6B7280' },
  { id: 'stage-2', name: 'Geen gehoor', color: '#3B82F6' },
  { id: 'stage-3', name: 'Telefonisch interview', color: '#8B5CF6' },
  { id: 'stage-4', name: 'In afwachting van CV', color: '#F59E0B' },
  { id: 'stage-5', name: 'Twijfel kandidaat', color: '#EC4899' },
  { id: 'stage-6', name: 'Nog afwijzen', color: '#EF4444' },
  { id: 'stage-7', name: 'Voorgesteld', color: '#10B981' },
  { id: 'stage-8', name: 'Afspraak op locatie', color: '#06B6D4' },
  { id: 'stage-9', name: 'Aanbod', color: '#059669' },
  { id: 'stage-10', name: 'Aangenomen', color: '#22C55E' },
];

interface VacancyPipelineProps {
  vacancyId: string;
}

export const VacancyPipeline: React.FC<VacancyPipelineProps> = ({ vacancyId }) => {
  const initialCandidates = vacancyCandidatesByVacancyId[vacancyId] || [];
  const [candidates, setCandidates] = useState<VacancyCandidate[]>(initialCandidates);
  const [draggedCandidate, setDraggedCandidate] = useState<VacancyCandidate | null>(null);
  const [dragOverStage, setDragOverStage] = useState<string | null>(null);
  const [stages, setStages] = useState<FunnelStage[]>(defaultStages);
  const [showFunnelEditor, setShowFunnelEditor] = useState(false);

  // Group candidates by stage name
  const candidatesByStage = stages.reduce((acc, stage) => {
    acc[stage.name] = candidates.filter(candidate => candidate.stage === stage.name);
    return acc;
  }, {} as Record<string, VacancyCandidate[]>);

  // Handle moving a candidate to a new stage
  const moveCandidate = (candidateId: string, newStageName: string) => {
    setCandidates(prev => prev.map(c => 
      c.id === candidateId ? { ...c, stage: newStageName as any } : c
    ));
  };

  const handleSaveFunnelStages = (newStages: FunnelStage[]) => {
    setStages(newStages);
    setShowFunnelEditor(false);
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
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Edit Funnel Button */}
          <button
            onClick={() => setShowFunnelEditor(true)}
            style={{
              padding: '8px 12px',
              backgroundColor: 'var(--color-bg-secondary)',
              color: 'var(--color-text)',
              border: '1px solid var(--color-border)',
              borderRadius: '6px',
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            ⚙️ Funnel bewerken
          </button>
          
          {/* Summary */}
          <div style={{
            fontSize: '14px',
            color: 'var(--color-text-muted)'
          }}>
            <span style={{ fontWeight: '500' }}>{candidates.length}</span> kandidaten
          </div>
        </div>
      </div>

      {/* Funnel Editor Modal */}
      {showFunnelEditor && (
        <FunnelEditorModal
          stages={stages}
          onClose={() => setShowFunnelEditor(false)}
          onSave={handleSaveFunnelStages}
        />
      )}

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
          const stageCandidates = candidatesByStage[stage.name] || [];
          
          return (
            <div
              key={stage.id}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOverStage(stage.id);
              }}
              onDragLeave={() => setDragOverStage(null)}
              onDrop={(e) => {
                e.preventDefault();
                if (draggedCandidate) {
                  moveCandidate(draggedCandidate.id, stage.name);
                  setDraggedCandidate(null);
                }
                setDragOverStage(null);
              }}
              style={{
                minWidth: '300px',
                maxWidth: '350px',
                width: '300px',
                backgroundColor: dragOverStage === stage.id ? 'var(--color-primary-bg)' : 'var(--color-bg-secondary)',
                borderRadius: '8px',
                padding: '16px',
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                border: dragOverStage === stage.id ? '2px dashed var(--color-primary)' : '2px solid transparent',
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
                borderBottom: `2px solid ${stage.color}`
              }}>
                <h3 style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: 'var(--color-text)',
                  margin: 0
                }}>
                  {stage.name}
                </h3>
                
                {/* Candidate Count Badge */}
                <span style={{
                  backgroundColor: stage.color,
                  color: 'white',
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
          <span>Actieve stages: <strong style={{ color: 'var(--color-text)' }}>{stages.filter(stage => (candidatesByStage[stage.name] || []).length > 0).length}</strong></span>
          <span>Gemiddeld per stage: <strong style={{ color: 'var(--color-text)' }}>{stages.length > 0 ? Math.round(candidates.length / stages.length) : 0}</strong></span>
        </div>
      </div>
    </div>
  );
};

// Candidate card with drag-and-drop and move menu
interface VacancyCandidateCardProps {
  candidate: VacancyCandidate;
  stages: FunnelStage[];
  onMoveCandidate: (candidateId: string, newStageName: string) => void;
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
              key={stage.id}
              onClick={(e) => {
                e.stopPropagation();
                onMoveCandidate(candidate.id, stage.name);
                setShowMoveMenu(false);
              }}
              disabled={stage.name === candidate.stage}
              style={{
                display: 'block',
                width: '100%',
                padding: '10px 12px',
                backgroundColor: stage.name === candidate.stage ? 'var(--color-primary-bg)' : 'transparent',
                border: 'none',
                textAlign: 'left',
                cursor: stage.name === candidate.stage ? 'default' : 'pointer',
                fontSize: '13px',
                color: stage.name === candidate.stage ? 'var(--color-primary)' : 'var(--color-text)',
                fontWeight: stage.name === candidate.stage ? '600' : 'normal',
                borderBottom: '1px solid var(--color-border)'
              }}
              onMouseEnter={(e) => {
                if (stage.name !== candidate.stage) {
                  e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)';
                }
              }}
              onMouseLeave={(e) => {
                if (stage.name !== candidate.stage) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: stage.color, marginRight: '8px', verticalAlign: 'middle' }}></span>
              {stage.name === candidate.stage ? `✓ ${stage.name}` : stage.name}
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

import React from 'react';
import { PipelineCandidateCard } from './PipelineCandidateCard';
import { mockStages, mockCandidates } from '../utils/mockPipeline';
import type { PipelineCandidate } from '../types/funnel';

interface PipelineViewProps {
  title?: string;
}

export const PipelineView: React.FC<PipelineViewProps> = ({ title = "Pipeline Funnel" }) => {
  // Group candidates by stage
  const candidatesByStage = mockStages.reduce((acc, stage) => {
    acc[stage.id] = mockCandidates.filter(candidate => candidate.currentStageId === stage.id);
    return acc;
  }, {} as Record<string, PipelineCandidate[]>);

  return (
    <div style={{ marginTop: '32px' }}>
      {/* Title */}
      <h2 style={{
        fontSize: '20px',
        fontWeight: '600',
        color: 'var(--color-text)',
        marginBottom: '16px'
      }}>
        {title}
      </h2>

      {/* Pipeline Container */}
      <div style={{
        display: 'flex',
        gap: '16px',
        overflowX: 'auto',
        paddingBottom: '16px',
        minHeight: '400px'
      }}>
        {mockStages.map((stage) => {
          const stageCandidates = candidatesByStage[stage.id] || [];
          
          return (
            <div
              key={stage.id}
              style={{
                minWidth: '260px',
                backgroundColor: 'var(--color-bg-secondary)',
                borderRadius: '8px',
                padding: '12px',
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column'
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
                  {stage.name}
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
                    <PipelineCandidateCard
                      key={candidate.id}
                      candidate={candidate}
                      stageName={stage.name}
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
          Pipeline Overzicht
        </div>
        <div style={{
          display: 'flex',
          gap: '24px',
          fontSize: '13px',
          color: 'var(--color-text-muted)'
        }}>
          <span>Totaal kandidaten: <strong style={{ color: 'var(--color-text)' }}>{mockCandidates.length}</strong></span>
          <span>Actieve stages: <strong style={{ color: 'var(--color-text)' }}>{mockStages.length}</strong></span>
          <span>Gemiddeld per stage: <strong style={{ color: 'var(--color-text)' }}>{Math.round(mockCandidates.length / mockStages.length)}</strong></span>
        </div>
      </div>
    </div>
  );
};

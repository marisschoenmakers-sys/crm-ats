import React from 'react';
import type { PipelineCandidate } from '../types/funnel';

interface PipelineCandidateCardProps {
  candidate: PipelineCandidate;
  stageName?: string;
}

export const PipelineCandidateCard: React.FC<PipelineCandidateCardProps> = ({ candidate, stageName }) => {
  const getStageName = () => {
    return stageName || candidate.currentStageId;
  };

  return (
    <div style={{
      backgroundColor: 'var(--color-card-bg)',
      borderRadius: '8px',
      padding: '12px',
      marginBottom: '8px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid var(--color-border)',
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
        color: 'var(--color-text)',
        marginBottom: '6px'
      }}>
        {candidate.name}
      </div>

      {/* Role */}
      <div style={{
        fontSize: '13px',
        color: 'var(--color-text)',
        marginBottom: '4px'
      }}>
        {candidate.role}
      </div>

      {/* Company + Location */}
      <div style={{
        fontSize: '12px',
        color: 'var(--color-text-muted)',
        marginBottom: '4px'
      }}>
        {candidate.company} • {candidate.location}
      </div>

      {/* Stage */}
      <div style={{
        fontSize: '11px',
        color: 'var(--color-primary)',
        fontWeight: '500',
        marginBottom: '4px'
      }}>
        {getStageName()}
      </div>

      {/* Applied Date */}
      <div style={{
        fontSize: '11px',
        color: 'var(--color-text-muted)',
        fontStyle: 'italic'
      }}>
        Sinds: {candidate.appliedAt}
      </div>

      {/* Optional Note */}
      {candidate.note && (
        <div style={{
          fontSize: '11px',
          color: 'var(--color-text-muted)',
          marginTop: '6px',
          padding: '4px 6px',
          backgroundColor: 'var(--color-bg-secondary)',
          borderRadius: '4px',
          fontStyle: 'italic'
        }}>
          {candidate.note}
        </div>
      )}

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

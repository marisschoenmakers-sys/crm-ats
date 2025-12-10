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
        {candidate.name}
      </div>

      {/* Role */}
      <div style={{
        fontSize: '13px',
        color: '#374151',
        marginBottom: '4px'
      }}>
        {candidate.role}
      </div>

      {/* Company + Location */}
      <div style={{
        fontSize: '12px',
        color: '#6b7280',
        marginBottom: '4px'
      }}>
        {candidate.company} • {candidate.location}
      </div>

      {/* Stage */}
      <div style={{
        fontSize: '11px',
        color: '#2563eb',
        fontWeight: '500',
        marginBottom: '4px'
      }}>
        {getStageName()}
      </div>

      {/* Applied Date */}
      <div style={{
        fontSize: '11px',
        color: '#9ca3af',
        fontStyle: 'italic'
      }}>
        Sinds: {candidate.appliedAt}
      </div>

      {/* Optional Note */}
      {candidate.note && (
        <div style={{
          fontSize: '11px',
          color: '#6b7280',
          marginTop: '6px',
          padding: '4px 6px',
          backgroundColor: '#f9fafb',
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
          color: '#9ca3af',
          marginTop: '4px'
        }}>
          Bron: {candidate.source}
        </div>
      )}
    </div>
  );
};

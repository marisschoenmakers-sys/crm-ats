import React from 'react';
import type { CompanyCandidateLink } from '../types/company';

interface CompanyCandidatesProps {
  candidates: CompanyCandidateLink[];
}

export const CompanyCandidates: React.FC<CompanyCandidatesProps> = ({ candidates }) => {
  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Voorgesteld':
        return 'var(--color-success-bg)';
      case 'Telefonisch interview':
        return 'var(--color-warning-bg)';
      case 'Gesolliciteerd':
        return 'var(--color-primary-bg)';
      case 'In afwachting CV':
        return 'var(--color-warning-bg)';
      case 'Geen gehoor':
        return 'var(--color-bg-secondary)';
      case 'Twijfel kandidaat':
        return 'var(--color-warning-bg)';
      default:
        return 'var(--color-bg-secondary)';
    }
  };

  const getStageTextColor = () => {
    return 'var(--color-text)';
  };

  if (candidates.length === 0) {
    return (
      <div style={{
        backgroundColor: 'var(--color-card-bg)',
        borderRadius: '8px',
        padding: '24px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        border: '1px solid var(--color-border)'
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: 'var(--color-text)',
          marginBottom: '16px'
        }}>
          Kandidaten ({candidates.length})
        </h3>
        <div style={{
          textAlign: 'center',
          padding: '40px',
          color: 'var(--color-text-muted)',
          fontSize: '14px'
        }}>
          Geen kandidaten gevonden
        </div>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: 'var(--color-card-bg)',
      borderRadius: '8px',
      padding: '24px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid var(--color-border)'
    }}>
      <h3 style={{
        fontSize: '18px',
        fontWeight: '600',
        color: 'var(--color-text)',
        marginBottom: '20px'
      }}>
        Kandidaten ({candidates.length})
      </h3>

      {/* Table Header */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 2fr 150px',
        gap: '16px',
        padding: '12px 16px',
        backgroundColor: 'var(--color-bg-secondary)',
        borderRadius: '6px',
        marginBottom: '12px',
        fontSize: '12px',
        fontWeight: '600',
        color: 'var(--color-text-muted)'
      }}>
        <div>Kandidaat</div>
        <div>Functie</div>
        <div>Stage</div>
      </div>

      {/* Candidates List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {candidates.map((candidate) => (
          <div
            key={candidate.id}
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 2fr 150px',
              gap: '16px',
              padding: '16px',
              backgroundColor: 'var(--color-bg-secondary)',
              borderRadius: '6px',
              border: '1px solid var(--color-border)',
              alignItems: 'center',
              transition: 'background-color 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-button-hover-bg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)';
            }}
          >
            {/* Candidate Name */}
            <div style={{
              fontSize: '14px',
              fontWeight: '500',
              color: 'var(--color-text)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span>●</span>
              <span>{candidate.candidateName}</span>
            </div>

            {/* Role */}
            <div style={{
              fontSize: '14px',
              color: 'var(--color-text)'
            }}>
              {candidate.role}
            </div>

            {/* Stage */}
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end'
            }}>
              <div style={{
                padding: '4px 8px',
                borderRadius: '12px',
                fontSize: '11px',
                fontWeight: '500',
                color: getStageTextColor(),
                backgroundColor: getStageColor(candidate.stage)
              }}>
                {candidate.stage}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div style={{
        marginTop: '20px',
        padding: '12px',
        backgroundColor: 'var(--color-primary-bg)',
        borderRadius: '6px',
        border: '1px solid var(--color-primary)'
      }}>
        <div style={{
          fontSize: '13px',
          color: 'var(--color-primary)'
        }}>
          ● {candidates.length} kandidaat{candidates.length === 1 ? '' : 'en'} • 
          {' '}{candidates.filter(c => c.stage === 'Voorgesteld').length} voorgesteld, 
          {' '}{candidates.filter(c => c.stage === 'Telefonisch interview').length} in interview
        </div>
      </div>
    </div>
  );
};

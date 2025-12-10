import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Candidate } from '../types/candidate';

interface CandidateListProps {
  candidates: Candidate[];
  onCandidateClick?: (candidateId: string) => void;
}

const getStageColor = (stage: Candidate['stage']) => {
  switch (stage) {
    case 'Gesolliciteerd':
      return { bg: 'var(--color-primary-bg)', color: 'var(--color-primary)' };
    case 'Telefonisch interview':
      return { bg: 'var(--color-warning-bg)', color: 'var(--color-warning)' };
    case 'Voorgesteld':
      return { bg: 'var(--color-success-bg)', color: 'var(--color-success)' };
    case 'Afwijzen':
      return { bg: 'var(--color-danger-bg)', color: 'var(--color-danger)' };
    case 'Twijfel kandidaat':
      return { bg: 'var(--color-warning-bg)', color: 'var(--color-warning)' };
    case 'In afwachting CV':
      return { bg: 'var(--color-primary-bg)', color: 'var(--color-primary)' };
    case 'Geen gehoor':
      return { bg: 'var(--color-bg-secondary)', color: 'var(--color-text-muted)' };
    default:
      return { bg: 'var(--color-bg-secondary)', color: 'var(--color-text-muted)' };
  }
};

export const CandidateList: React.FC<CandidateListProps> = ({ candidates, onCandidateClick }) => {
  const navigate = useNavigate();
  
  const handleClick = (candidateId: string) => {
    if (onCandidateClick) {
      onCandidateClick(candidateId);
    } else {
      navigate(`/candidates/${candidateId}`);
    }
  };

  if (candidates.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '40px',
        color: 'var(--color-text-muted)',
        fontSize: '16px',
        backgroundColor: 'var(--color-card-bg)',
        borderRadius: '8px',
        border: '1px solid var(--color-border)'
      }}>
        Geen kandidaten gevonden
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: 'var(--color-card-bg)',
      borderRadius: '8px',
      border: '1px solid var(--color-border)',
      overflow: 'hidden'
    }}>
      {/* Table Header */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1.5fr 1.5fr 1fr 1fr',
        gap: '16px',
        padding: '14px 20px',
        backgroundColor: 'var(--color-bg-secondary)',
        borderBottom: '1px solid var(--color-border)',
        fontSize: '13px',
        fontWeight: '600',
        color: 'var(--color-text)'
      }}>
        <div>Kandidaat</div>
        <div>Vacature</div>
        <div>Fase</div>
        <div>Locatie</div>
        <div>Toegevoegd</div>
      </div>

      {/* Table Rows */}
      {candidates.map((candidate, index) => {
        const stageColors = getStageColor(candidate.stage);
        
        return (
          <div
            key={candidate.id}
            onClick={() => handleClick(candidate.id)}
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1.5fr 1.5fr 1fr 1fr',
              gap: '16px',
              padding: '16px 20px',
              borderBottom: index < candidates.length - 1 ? '1px solid var(--color-border)' : 'none',
              cursor: 'pointer',
              transition: 'background-color 0.15s',
              alignItems: 'center'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-card-bg)'}
          >
            {/* Kandidaat */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-sidebar-text)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: '600',
                flexShrink: 0
              }}>
                {candidate.fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--color-text)' }}>
                  {candidate.fullName}
                </div>
                <div style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
                  {candidate.role}
                </div>
              </div>
            </div>

            {/* Vacature */}
            <div style={{ fontSize: '14px', color: 'var(--color-text)' }}>
              {candidate.vacancy}
            </div>

            {/* Fase */}
            <div>
              <span style={{
                display: 'inline-block',
                padding: '4px 10px',
                backgroundColor: stageColors.bg,
                color: stageColors.color,
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: '500'
              }}>
                {candidate.stage}
              </span>
            </div>

            {/* Locatie */}
            <div style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>
              {candidate.location}
            </div>

            {/* Toegevoegd */}
            <div style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
              {candidate.addedAt}
            </div>
          </div>
        );
      })}
    </div>
  );
};

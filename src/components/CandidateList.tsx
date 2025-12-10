import React from 'react';
import { CandidateCard } from './CandidateCard';
import type { Candidate } from '../types/candidate';

interface CandidateListProps {
  candidates: Candidate[];
  onCandidateClick?: () => void;
}

export const CandidateList: React.FC<CandidateListProps> = ({ candidates, onCandidateClick }) => {
  if (candidates.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '40px',
        color: '#6b7280',
        fontSize: '16px'
      }}>
        Geen kandidaten gevonden
      </div>
    );
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '16px',
      padding: '16px 0'
    }}>
      {candidates.map((candidate) => (
        <div key={candidate.id} onClick={onCandidateClick}>
          <CandidateCard candidate={candidate} />
        </div>
      ))}
    </div>
  );
};

import React, { useState } from 'react';
import { CandidateFilterBar } from '../components/CandidateFilterBar';
import { CandidateList } from '../components/CandidateList';
import { candidates } from '../utils/mockCandidates';

interface CandidatesPageProps {
  onChangePage: (page: 'candidates' | 'candidateDetail') => void;
}

export const CandidatesPage: React.FC<CandidatesPageProps> = ({ onChangePage }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter candidates based on search term
  const filteredCandidates = candidates.filter(candidate =>
    candidate.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleCandidateClick = () => {
    onChangePage('candidateDetail');
  };

  return (
    <div>
      {/* Page Title */}
      <h1 style={{
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: '8px'
      }}>
        Kandidaten
      </h1>

      {/* Page Description */}
      <p style={{
        fontSize: '14px',
        color: '#6b7280',
        marginBottom: '24px'
      }}>
        Beheer en volg alle kandidaten door het recruitment proces. Gebruik de zoekbalk om snel specifieke kandidaten te vinden.
      </p>

      {/* Filter Bar */}
      <CandidateFilterBar onSearchChange={handleSearchChange} />

      {/* Candidate List */}
      <CandidateList candidates={filteredCandidates} onCandidateClick={handleCandidateClick} />

      {/* Results Summary */}
      <div style={{
        marginTop: '24px',
        padding: '16px',
        backgroundColor: '#f9fafb',
        borderRadius: '8px',
        border: '1px solid #e5e7eb'
      }}>
        <div style={{
          fontSize: '14px',
          color: '#6b7280'
        }}>
          {searchTerm ? (
            <>
              <span style={{ fontWeight: '500' }}>{filteredCandidates.length}</span> kandidaten gevonden voor "{searchTerm}"
            </>
          ) : (
            <>
              <span style={{ fontWeight: '500' }}>{candidates.length}</span> totaal kandidaten
            </>
          )}
        </div>
      </div>
    </div>
  );
};

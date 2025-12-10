import React from 'react';
import type { CompanyCandidateLink } from '../types/company';

interface CompanyCandidatesProps {
  candidates: CompanyCandidateLink[];
}

export const CompanyCandidates: React.FC<CompanyCandidatesProps> = ({ candidates }) => {
  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Voorgesteld':
        return '#dcfce7';
      case 'Telefonisch interview':
        return '#e9d5ff';
      case 'Gesolliciteerd':
        return '#dbeafe';
      case 'In afwachting CV':
        return '#fef3c7';
      case 'Geen gehoor':
        return '#f3f4f6';
      case 'Twijfel kandidaat':
        return '#fed7aa';
      default:
        return '#f3f4f6';
    }
  };

  const getStageTextColor = (stage: string) => {
    switch (stage) {
      case 'Voorgesteld':
        return '#166534';
      case 'Telefonisch interview':
        return '#6b21a8';
      case 'Gesolliciteerd':
        return '#1e40af';
      case 'In afwachting CV':
        return '#a16207';
      case 'Geen gehoor':
        return '#374151';
      case 'Twijfel kandidaat':
        return '#c2410c';
      default:
        return '#374151';
    }
  };

  if (candidates.length === 0) {
    return (
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '24px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb'
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#111827',
          marginBottom: '16px'
        }}>
          Kandidaten ({candidates.length})
        </h3>
        <div style={{
          textAlign: 'center',
          padding: '40px',
          color: '#9ca3af',
          fontSize: '14px'
        }}>
          Geen kandidaten gevonden
        </div>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '24px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb'
    }}>
      <h3 style={{
        fontSize: '18px',
        fontWeight: '600',
        color: '#111827',
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
        backgroundColor: '#f9fafb',
        borderRadius: '6px',
        marginBottom: '12px',
        fontSize: '12px',
        fontWeight: '600',
        color: '#6b7280'
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
              backgroundColor: '#f9fafb',
              borderRadius: '6px',
              border: '1px solid #e5e7eb',
              alignItems: 'center',
              transition: 'background-color 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f3f4f6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f9fafb';
            }}
          >
            {/* Candidate Name */}
            <div style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#111827',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span>👤</span>
              <span>{candidate.candidateName}</span>
            </div>

            {/* Role */}
            <div style={{
              fontSize: '14px',
              color: '#374151'
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
                color: getStageTextColor(candidate.stage),
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
        backgroundColor: '#eff6ff',
        borderRadius: '6px',
        border: '1px solid #dbeafe'
      }}>
        <div style={{
          fontSize: '13px',
          color: '#1e40af'
        }}>
          👥 {candidates.length} kandidaat{candidates.length === 1 ? '' : 'en'} • 
          {' '}{candidates.filter(c => c.stage === 'Voorgesteld').length} voorgesteld, 
          {' '}{candidates.filter(c => c.stage === 'Telefonisch interview').length} in interview
        </div>
      </div>
    </div>
  );
};

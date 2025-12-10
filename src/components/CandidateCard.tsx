import React from 'react';
import type { Candidate } from '../types/candidate';

interface CandidateCardProps {
  candidate: Candidate;
}

export const CandidateCard: React.FC<CandidateCardProps> = ({ candidate }) => {
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const getStageColor = (stage: 'Gesolliciteerd' | 'Geen gehoor' | 'Telefonisch interview' | 'In afwachting CV' | 'Twijfel kandidaat' | 'Afwijzen' | 'Voorgesteld') => {
    const colors = {
      'Gesolliciteerd': 'var(--color-primary-bg)',
      'Geen gehoor': 'var(--color-bg-secondary)',
      'Telefonisch interview': 'var(--color-warning-bg)',
      'In afwachting CV': 'var(--color-warning-bg)',
      'Twijfel kandidaat': 'var(--color-warning-bg)',
      'Afwijzen': 'var(--color-danger-bg)',
      'Voorgesteld': 'var(--color-success-bg)'
    };
    return colors[stage] || 'var(--color-bg-secondary)';
  };

  return (
    <div style={{
      backgroundColor: 'var(--color-card-bg)',
      borderRadius: '8px',
      padding: '12px',
      marginBottom: '12px',
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
      <div style={{ display: 'flex', gap: '12px' }}>
        {/* Avatar */}
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          backgroundColor: candidate.avatarUrl ? 'transparent' : 'var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '16px',
          fontWeight: '600',
          color: 'var(--color-text)',
          flexShrink: 0,
          overflow: 'hidden'
        }}>
          {candidate.avatarUrl ? (
            <img 
              src={candidate.avatarUrl} 
              alt={`${candidate.fullName}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            getInitials(candidate.firstName, candidate.lastName)
          )}
        </div>

        {/* Candidate Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Full Name */}
          <div style={{
            fontSize: '16px',
            fontWeight: '600',
            color: 'var(--color-text)',
            marginBottom: '4px'
          }}>
            {candidate.fullName}
          </div>

          {/* Role + Vacancy */}
          <div style={{
            fontSize: '14px',
            color: 'var(--color-text)',
            marginBottom: '4px'
          }}>
            {candidate.role} bij {candidate.vacancy.split(' bij ')[1] || candidate.vacancy}
          </div>

          {/* Location */}
          <div style={{
            fontSize: '13px',
            color: 'var(--color-text-muted)',
            marginBottom: '6px'
          }}>
            ● {candidate.location}
          </div>

          {/* Stage Badge */}
          <div style={{ marginBottom: '8px' }}>
            <span style={{
              display: 'inline-block',
              padding: '4px 8px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: '500',
              backgroundColor: getStageColor(candidate.stage),
              color: 'var(--color-text)'
            }}>
              {candidate.stage}
            </span>
          </div>

          {/* Tags */}
          {candidate.tags.length > 0 && (
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '4px' 
            }}>
              {candidate.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  style={{
                    display: 'inline-block',
                    padding: '2px 6px',
                    borderRadius: '10px',
                    fontSize: '10px',
                    fontWeight: '500',
                    backgroundColor: 'var(--color-bg-secondary)',
                    color: 'var(--color-text-muted)',
                    border: '1px solid var(--color-border)'
                  }}
                >
                  {tag}
                </span>
              ))}
              {candidate.tags.length > 3 && (
                <span style={{
                  fontSize: '10px',
                  color: 'var(--color-text-muted)',
                  fontStyle: 'italic'
                }}>
                  +{candidate.tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

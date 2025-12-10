import React from 'react';
import type { CandidateDetail } from '../types/candidate';

interface CandidateDetailHeaderProps {
  candidate: CandidateDetail;
}

export const CandidateDetailHeader: React.FC<CandidateDetailHeaderProps> = ({ candidate }) => {
  const getInitials = (fullName: string) => {
    return fullName
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase();
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
      padding: '24px',
      marginBottom: '24px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid var(--color-border)'
    }}>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
        {/* Avatar */}
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          backgroundColor: candidate.avatarUrl ? 'transparent' : 'var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          fontWeight: '600',
          color: 'var(--color-text)',
          flexShrink: 0,
          overflow: 'hidden'
        }}>
          {candidate.avatarUrl ? (
            <img 
              src={candidate.avatarUrl} 
              alt={candidate.fullName}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            getInitials(candidate.fullName)
          )}
        </div>

        {/* Candidate Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Full Name */}
          <h1 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: 'var(--color-text)',
            marginBottom: '8px',
            margin: '0 0 8px 0'
          }}>
            {candidate.fullName}
          </h1>

          {/* Role + Vacancy */}
          <div style={{
            fontSize: '16px',
            color: 'var(--color-text)',
            marginBottom: '6px'
          }}>
            {candidate.role} • {candidate.vacancy}
          </div>

          {/* Location */}
          <div style={{
            fontSize: '14px',
            color: 'var(--color-text-muted)',
            marginBottom: '8px'
          }}>
            ● {candidate.location}
          </div>

          {/* Stage Badge */}
          <div style={{ marginBottom: '12px' }}>
            <span style={{
              display: 'inline-block',
              padding: '6px 12px',
              borderRadius: '16px',
              fontSize: '13px',
              fontWeight: '500',
              backgroundColor: getStageColor(candidate.stage),
              color: 'var(--color-text)'
            }}>
              {candidate.stage}
            </span>
          </div>

          {/* Contact Info */}
          <div style={{ display: 'flex', gap: '24px', fontSize: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>◆</span>
              <span style={{ color: 'var(--color-text)' }}>{candidate.email}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>◇</span>
              <span style={{ color: 'var(--color-text)' }}>{candidate.phone}</span>
            </div>
          </div>

          {/* Added Date */}
          <div style={{
            fontSize: '12px',
            color: 'var(--color-text-muted)',
            marginTop: '8px'
          }}>
            Toegevoegd op {candidate.addedAt}
          </div>
        </div>
      </div>
    </div>
  );
};

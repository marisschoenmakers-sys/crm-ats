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
      'Gesolliciteerd': '#dbeafe',
      'Geen gehoor': '#f3f4f6',
      'Telefonisch interview': '#e9d5ff',
      'In afwachting CV': '#fef3c7',
      'Twijfel kandidaat': '#fed7aa',
      'Afwijzen': '#fee2e2',
      'Voorgesteld': '#dcfce7'
    };
    return colors[stage] || '#f3f4f6';
  };

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '24px',
      marginBottom: '24px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb'
    }}>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
        {/* Avatar */}
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          backgroundColor: candidate.avatarUrl ? 'transparent' : '#e5e7eb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          fontWeight: '600',
          color: '#374151',
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
            color: '#111827',
            marginBottom: '8px',
            margin: '0 0 8px 0'
          }}>
            {candidate.fullName}
          </h1>

          {/* Role + Vacancy */}
          <div style={{
            fontSize: '16px',
            color: '#374151',
            marginBottom: '6px'
          }}>
            {candidate.role} • {candidate.vacancy}
          </div>

          {/* Location */}
          <div style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '8px'
          }}>
            📍 {candidate.location}
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
              color: '#374151'
            }}>
              {candidate.stage}
            </span>
          </div>

          {/* Contact Info */}
          <div style={{ display: 'flex', gap: '24px', fontSize: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: '#6b7280' }}>📧</span>
              <span style={{ color: '#374151' }}>{candidate.email}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: '#6b7280' }}>📱</span>
              <span style={{ color: '#374151' }}>{candidate.phone}</span>
            </div>
          </div>

          {/* Added Date */}
          <div style={{
            fontSize: '12px',
            color: '#9ca3af',
            marginTop: '8px'
          }}>
            Toegevoegd op {candidate.addedAt}
          </div>
        </div>
      </div>
    </div>
  );
};

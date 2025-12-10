import React from 'react';
import type { Vacancy } from '../types/vacancy';

interface VacancyDetailHeaderProps {
  vacancy: Vacancy;
}

export const VacancyDetailHeader: React.FC<VacancyDetailHeaderProps> = ({ vacancy }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Actief': return 'var(--color-success-bg)';
      case 'Gesloten': return 'var(--color-danger-bg)';
      case 'Concept': return 'var(--color-bg-secondary)';
      default: return 'var(--color-bg-secondary)';
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case 'Actief': return 'var(--color-success)';
      case 'Gesloten': return 'var(--color-danger)';
      case 'Concept': return 'var(--color-text)';
      default: return 'var(--color-text)';
    }
  };

  return (
    <div style={{
      backgroundColor: 'var(--color-card-bg)',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '16px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid var(--color-border)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '12px'
      }}>
        {/* Left side: Title and company/location */}
        <div style={{ flex: 1 }}>
          <h1 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: 'var(--color-text)',
            marginBottom: '8px',
            margin: '0 0 8px 0'
          }}>
            {vacancy.title}
          </h1>
          
          <div style={{
            fontSize: '14px',
            color: 'var(--color-text)',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span>{vacancy.company}</span>
            <span style={{ color: 'var(--color-text-muted)' }}>•</span>
            <span>{vacancy.location}</span>
          </div>

          {/* Status Badge */}
          <div>
            <span style={{
              display: 'inline-block',
              padding: '6px 12px',
              borderRadius: '16px',
              fontSize: '13px',
              fontWeight: '500',
              backgroundColor: getStatusColor(vacancy.status),
              color: getStatusTextColor(vacancy.status)
            }}>
              {vacancy.status}
            </span>
          </div>
        </div>

        {/* Right side: Action buttons */}
        <div style={{
          display: 'flex',
          gap: '8px',
          flexShrink: 0
        }}>
          <button
            style={{
              padding: '8px 16px',
              backgroundColor: 'var(--color-card-bg)',
              color: 'var(--color-text)',
              border: '1px solid var(--color-border)',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-card-bg)';
            }}
          >
            Bewerken
          </button>
          
          <button
            style={{
              padding: '8px 16px',
              backgroundColor: 'var(--color-card-bg)',
              color: 'var(--color-text)',
              border: '1px solid var(--color-border)',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-card-bg)';
            }}
          >
            Delen
          </button>
        </div>
      </div>

      {/* Additional info row */}
      <div style={{
        display: 'flex',
        gap: '20px',
        fontSize: '13px',
        color: 'var(--color-text-muted)',
        borderTop: '1px solid var(--color-border)',
        paddingTop: '12px'
      }}>
        <div>
          <span style={{ fontWeight: '500' }}>Type:</span> {vacancy.employmentType}
        </div>
        {vacancy.salaryRange && (
          <div>
            <span style={{ fontWeight: '500' }}>Salaris:</span> {vacancy.salaryRange}
          </div>
        )}
        {vacancy.sector && (
          <div>
            <span style={{ fontWeight: '500' }}>Sector:</span> {vacancy.sector}
          </div>
        )}
        <div>
          <span style={{ fontWeight: '500' }}>Geplaatst:</span> {vacancy.createdAt}
        </div>
      </div>
    </div>
  );
};

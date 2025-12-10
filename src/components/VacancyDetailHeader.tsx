import React from 'react';
import type { Vacancy } from '../types/vacancy';

interface VacancyDetailHeaderProps {
  vacancy: Vacancy;
}

export const VacancyDetailHeader: React.FC<VacancyDetailHeaderProps> = ({ vacancy }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Actief': return '#dcfce7';
      case 'Gesloten': return '#fee2e2';
      case 'Concept': return '#f3f4f6';
      default: return '#f3f4f6';
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case 'Actief': return '#166534';
      case 'Gesloten': return '#991b1b';
      case 'Concept': return '#374151';
      default: return '#374151';
    }
  };

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '16px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb'
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
            color: '#111827',
            marginBottom: '8px',
            margin: '0 0 8px 0'
          }}>
            {vacancy.title}
          </h1>
          
          <div style={{
            fontSize: '14px',
            color: '#374151',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span>{vacancy.company}</span>
            <span style={{ color: '#9ca3af' }}>•</span>
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
              backgroundColor: 'white',
              color: '#374151',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f9fafb';
              e.currentTarget.style.borderColor = '#9ca3af';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
              e.currentTarget.style.borderColor = '#d1d5db';
            }}
          >
            Bewerken
          </button>
          
          <button
            style={{
              padding: '8px 16px',
              backgroundColor: 'white',
              color: '#374151',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f9fafb';
              e.currentTarget.style.borderColor = '#9ca3af';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
              e.currentTarget.style.borderColor = '#d1d5db';
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
        color: '#6b7280',
        borderTop: '1px solid #f3f4f6',
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

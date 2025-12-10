import React from 'react';
import type { CompanyVacancyLink } from '../types/company';

interface CompanyVacanciesProps {
  vacancies: CompanyVacancyLink[];
}

export const CompanyVacancies: React.FC<CompanyVacanciesProps> = ({ vacancies }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'actief':
        return '#dcfce7';
      case 'gesloten':
        return '#fee2e2';
      default:
        return '#f3f4f6';
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'actief':
        return '#166534';
      case 'gesloten':
        return '#dc2626';
      default:
        return '#374151';
    }
  };

  if (vacancies.length === 0) {
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
          Vacatures ({vacancies.length})
        </h3>
        <div style={{
          textAlign: 'center',
          padding: '40px',
          color: '#9ca3af',
          fontSize: '14px'
        }}>
          Geen vacatures gevonden
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
        Vacatures ({vacancies.length})
      </h3>

      {/* Table Header */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 100px',
        gap: '16px',
        padding: '12px 16px',
        backgroundColor: '#f9fafb',
        borderRadius: '6px',
        marginBottom: '12px',
        fontSize: '12px',
        fontWeight: '600',
        color: '#6b7280'
      }}>
        <div>Vacature</div>
        <div>Locatie</div>
        <div>Status</div>
      </div>

      {/* Vacancies List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {vacancies.map((vacancy) => (
          <div
            key={vacancy.id}
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 100px',
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
            {/* Vacancy Title */}
            <div style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#111827'
            }}>
              {vacancy.vacancyTitle}
            </div>

            {/* Location */}
            <div style={{
              fontSize: '14px',
              color: '#374151',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <span>📍</span>
              <span>{vacancy.location}</span>
            </div>

            {/* Status */}
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end'
            }}>
              <div style={{
                padding: '4px 8px',
                borderRadius: '12px',
                fontSize: '11px',
                fontWeight: '500',
                color: getStatusTextColor(vacancy.status),
                backgroundColor: getStatusColor(vacancy.status)
              }}>
                {vacancy.status}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div style={{
        marginTop: '20px',
        padding: '12px',
        backgroundColor: '#f0fdf4',
        borderRadius: '6px',
        border: '1px solid #bbf7d0'
      }}>
        <div style={{
          fontSize: '13px',
          color: '#166534'
        }}>
          📋 {vacancies.length} vacature{vacancies.length === 1 ? '' : 's'} • 
          {' '}{vacancies.filter(v => v.status.toLowerCase() === 'actief').length} actief, 
          {' '}{vacancies.filter(v => v.status.toLowerCase() === 'gesloten').length} gesloten
        </div>
      </div>
    </div>
  );
};

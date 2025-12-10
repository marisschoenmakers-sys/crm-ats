import React from 'react';
import type { CompanyVacancyLink } from '../types/company';

interface CompanyVacanciesProps {
  vacancies: CompanyVacancyLink[];
}

export const CompanyVacancies: React.FC<CompanyVacanciesProps> = ({ vacancies }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'actief':
        return 'var(--color-success-bg)';
      case 'gesloten':
        return 'var(--color-danger-bg)';
      default:
        return 'var(--color-bg-secondary)';
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'actief':
        return 'var(--color-success)';
      case 'gesloten':
        return 'var(--color-danger)';
      default:
        return 'var(--color-text)';
    }
  };

  if (vacancies.length === 0) {
    return (
      <div style={{
        backgroundColor: 'var(--color-card-bg)',
        borderRadius: '8px',
        padding: '24px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        border: '1px solid var(--color-border)'
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: 'var(--color-text)',
          marginBottom: '16px'
        }}>
          Vacatures ({vacancies.length})
        </h3>
        <div style={{
          textAlign: 'center',
          padding: '40px',
          color: 'var(--color-text-muted)',
          fontSize: '14px'
        }}>
          Geen vacatures gevonden
        </div>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: 'var(--color-card-bg)',
      borderRadius: '8px',
      padding: '24px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid var(--color-border)'
    }}>
      <h3 style={{
        fontSize: '18px',
        fontWeight: '600',
        color: 'var(--color-text)',
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
        backgroundColor: 'var(--color-bg-secondary)',
        borderRadius: '6px',
        marginBottom: '12px',
        fontSize: '12px',
        fontWeight: '600',
        color: 'var(--color-text-muted)'
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
              backgroundColor: 'var(--color-bg-secondary)',
              borderRadius: '6px',
              border: '1px solid var(--color-border)',
              alignItems: 'center',
              transition: 'background-color 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-button-hover-bg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)';
            }}
          >
            {/* Vacancy Title */}
            <div style={{
              fontSize: '14px',
              fontWeight: '500',
              color: 'var(--color-text)'
            }}>
              {vacancy.vacancyTitle}
            </div>

            {/* Location */}
            <div style={{
              fontSize: '14px',
              color: 'var(--color-text)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <span>●</span>
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
        backgroundColor: 'var(--color-success-bg)',
        borderRadius: '6px',
        border: '1px solid var(--color-success)'
      }}>
        <div style={{
          fontSize: '13px',
          color: 'var(--color-success)'
        }}>
          ● {vacancies.length} vacature{vacancies.length === 1 ? '' : 's'} • 
          {' '}{vacancies.filter(v => v.status.toLowerCase() === 'actief').length} actief, 
          {' '}{vacancies.filter(v => v.status.toLowerCase() === 'gesloten').length} gesloten
        </div>
      </div>
    </div>
  );
};

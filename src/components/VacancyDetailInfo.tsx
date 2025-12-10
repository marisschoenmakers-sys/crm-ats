import React from 'react';
import type { Vacancy } from '../types/vacancy';

interface VacancyDetailInfoProps {
  vacancy: Vacancy;
}

export const VacancyDetailInfo: React.FC<VacancyDetailInfoProps> = ({ vacancy }) => {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '24px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb'
    }}>
      {/* Meta Info Block */}
      <div style={{
        backgroundColor: '#f9fafb',
        borderRadius: '6px',
        padding: '16px',
        marginBottom: '24px',
        border: '1px solid #e5e7eb'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px'
        }}>
          <div>
            <div style={{
              fontSize: '12px',
              fontWeight: '500',
              color: '#9ca3af',
              marginBottom: '4px'
            }}>
              Werkgever
            </div>
            <div style={{
              fontSize: '14px',
              color: '#111827'
            }}>
              {vacancy.company}
            </div>
          </div>

          <div>
            <div style={{
              fontSize: '12px',
              fontWeight: '500',
              color: '#9ca3af',
              marginBottom: '4px'
            }}>
              Locatie
            </div>
            <div style={{
              fontSize: '14px',
              color: '#111827'
            }}>
              {vacancy.location}
            </div>
          </div>

          <div>
            <div style={{
              fontSize: '12px',
              fontWeight: '500',
              color: '#9ca3af',
              marginBottom: '4px'
            }}>
              Contracttype
            </div>
            <div style={{
              fontSize: '14px',
              color: '#111827'
            }}>
              {vacancy.employmentType}
            </div>
          </div>

          {vacancy.salaryRange && (
            <div>
              <div style={{
                fontSize: '12px',
                fontWeight: '500',
                color: '#9ca3af',
                marginBottom: '4px'
              }}>
                Salarisindicatie
              </div>
              <div style={{
                fontSize: '14px',
                color: '#111827'
              }}>
                {vacancy.salaryRange}
              </div>
            </div>
          )}

          {vacancy.sector && (
            <div>
              <div style={{
                fontSize: '12px',
                fontWeight: '500',
                color: '#9ca3af',
                marginBottom: '4px'
              }}>
                Sector
              </div>
              <div style={{
                fontSize: '14px',
                color: '#111827'
              }}>
                {vacancy.sector}
              </div>
            </div>
          )}

          {vacancy.priority && (
            <div>
              <div style={{
                fontSize: '12px',
                fontWeight: '500',
                color: '#9ca3af',
                marginBottom: '4px'
              }}>
                Prioriteit
              </div>
              <div style={{
                fontSize: '14px',
                color: '#111827'
              }}>
                {vacancy.priority}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Two Column Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '32px'
      }}>
        {/* Left: Description */}
        <div>
          <h2 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#111827',
            marginBottom: '16px'
          }}>
            Functieomschrijving
          </h2>
          <div style={{
            fontSize: '14px',
            lineHeight: '1.6',
            color: '#374151'
          }}>
            {vacancy.description.split('\n').map((paragraph, index) => (
              <p key={index} style={{ margin: '0 0 12px 0' }}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Right: Requirements */}
        <div>
          <h2 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#111827',
            marginBottom: '16px'
          }}>
            Functie-eisen
          </h2>
          <ul style={{
            margin: 0,
            paddingLeft: '20px',
            fontSize: '14px',
            lineHeight: '1.6',
            color: '#374151'
          }}>
            {vacancy.requirements.map((requirement, index) => (
              <li key={index} style={{ marginBottom: '8px' }}>
                {requirement}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

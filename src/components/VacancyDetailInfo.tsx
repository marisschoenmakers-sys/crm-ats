import React from 'react';

interface Vacancy {
  id: string;
  title: string;
  company_name: string;
  location: string | null;
  employment_type: string;
  salary_range: string | null;
  description: string | null;
  requirements: string[] | null;
  sector: string | null;
  priority: 'Laag' | 'Middel' | 'Hoog';
  status: 'Actief' | 'Gesloten' | 'Concept';
}

interface VacancyDetailInfoProps {
  vacancy: Vacancy;
}

export const VacancyDetailInfo: React.FC<VacancyDetailInfoProps> = ({ vacancy }) => {
  return (
    <div style={{
      backgroundColor: 'var(--color-card-bg)',
      borderRadius: '8px',
      padding: '24px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid var(--color-border)'
    }}>
      {/* Meta Info Block */}
      <div style={{
        backgroundColor: 'var(--color-bg-secondary)',
        borderRadius: '6px',
        padding: '16px',
        marginBottom: '24px',
        border: '1px solid var(--color-border)'
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
              color: 'var(--color-text-muted)',
              marginBottom: '4px'
            }}>
              Werkgever
            </div>
            <div style={{
              fontSize: '14px',
              color: 'var(--color-text)'
            }}>
              {vacancy.company_name}
            </div>
          </div>

          <div>
            <div style={{
              fontSize: '12px',
              fontWeight: '500',
              color: 'var(--color-text-muted)',
              marginBottom: '4px'
            }}>
              Locatie
            </div>
            <div style={{
              fontSize: '14px',
              color: 'var(--color-text)'
            }}>
              {vacancy.location}
            </div>
          </div>

          <div>
            <div style={{
              fontSize: '12px',
              fontWeight: '500',
              color: 'var(--color-text-muted)',
              marginBottom: '4px'
            }}>
              Contracttype
            </div>
            <div style={{
              fontSize: '14px',
              color: 'var(--color-text)'
            }}>
              {vacancy.employment_type}
            </div>
          </div>

          {vacancy.salary_range && (
            <div>
              <div style={{
                fontSize: '12px',
                fontWeight: '500',
                color: 'var(--color-text-muted)',
                marginBottom: '4px'
              }}>
                Salarisindicatie
              </div>
              <div style={{
                fontSize: '14px',
                color: 'var(--color-text)'
              }}>
                {vacancy.salary_range}
              </div>
            </div>
          )}

          {vacancy.sector && (
            <div>
              <div style={{
                fontSize: '12px',
                fontWeight: '500',
                color: 'var(--color-text-muted)',
                marginBottom: '4px'
              }}>
                Sector
              </div>
              <div style={{
                fontSize: '14px',
                color: 'var(--color-text)'
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
                color: 'var(--color-text-muted)',
                marginBottom: '4px'
              }}>
                Prioriteit
              </div>
              <div style={{
                fontSize: '14px',
                color: 'var(--color-text)'
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
            color: 'var(--color-text)',
            marginBottom: '16px'
          }}>
            Functieomschrijving
          </h2>
          <div style={{
            fontSize: '14px',
            lineHeight: '1.6',
            color: 'var(--color-text)'
          }}>
            {(vacancy.description || '').split('\n').map((paragraph, index) => (
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
            color: 'var(--color-text)',
            marginBottom: '16px'
          }}>
            Functie-eisen
          </h2>
          <ul style={{
            margin: 0,
            paddingLeft: '20px',
            fontSize: '14px',
            lineHeight: '1.6',
            color: 'var(--color-text)'
          }}>
            {(vacancy.requirements || []).map((requirement, index) => (
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

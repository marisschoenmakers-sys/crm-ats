import React from 'react';
import { useNavigate } from 'react-router-dom';
import { vacancies } from '../utils/mockVacancies';

interface VacanciesPageProps {
  onChangePage?: (vacancyId: string) => void;
}

export const VacanciesPage: React.FC<VacanciesPageProps> = ({ onChangePage }) => {
  const navigate = useNavigate();
  
  const handleVacancyClick = (vacancyId: string) => {
    if (onChangePage) {
      onChangePage(vacancyId);
    } else {
      navigate(`/vacancies/${vacancyId}`);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Actief': return 'badge-green';
      case 'Gesloten': return 'badge-red';
      case 'Concept': return 'badge-gray';
      default: return 'badge-gray';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'Hoog': return 'badge-red';
      case 'Middel': return 'badge-yellow';
      case 'Laag': return 'badge-blue';
      default: return 'badge-gray';
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px', color: 'var(--color-text)' }}>Vacatures</h1>
      
      <div className="card" style={{ padding: '16px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--color-border)', textAlign: 'left' }}>
              <th style={{ padding: '12px', fontSize: '14px', fontWeight: '600', color: 'var(--color-text)' }}>Functie</th>
              <th style={{ padding: '12px', fontSize: '14px', fontWeight: '600', color: 'var(--color-text)' }}>Bedrijf</th>
              <th style={{ padding: '12px', fontSize: '14px', fontWeight: '600', color: 'var(--color-text)' }}>Locatie</th>
              <th style={{ padding: '12px', fontSize: '14px', fontWeight: '600', color: 'var(--color-text)' }}>Status</th>
              <th style={{ padding: '12px', fontSize: '14px', fontWeight: '600', color: 'var(--color-text)' }}>Prioriteit</th>
              <th style={{ padding: '12px', fontSize: '14px', fontWeight: '600', color: 'var(--color-text)' }}>Type</th>
            </tr>
          </thead>
          <tbody>
            {vacancies.map((vacancy) => (
              <tr 
                key={vacancy.id}
                onClick={() => handleVacancyClick(vacancy.id)}
                style={{ 
                  borderBottom: '1px solid var(--color-border)', 
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <td style={{ padding: '16px 12px' }}>
                  <div style={{ fontWeight: '600', color: 'var(--color-text)', marginBottom: '4px' }}>
                    {vacancy.title}
                  </div>
                  <div style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>
                    {vacancy.sector}
                  </div>
                </td>
                <td style={{ padding: '16px 12px', color: 'var(--color-text)' }}>
                  {vacancy.company}
                </td>
                <td style={{ padding: '16px 12px', color: 'var(--color-text-muted)' }}>
                  {vacancy.location}
                </td>
                <td style={{ padding: '16px 12px' }}>
                  <span className={`badge ${getStatusBadge(vacancy.status)}`}>
                    {vacancy.status}
                  </span>
                </td>
                <td style={{ padding: '16px 12px' }}>
                  <span className={`badge ${getPriorityBadge(vacancy.priority || 'Middel')}`}>
                    {vacancy.priority || 'Middel'}
                  </span>
                </td>
                <td style={{ padding: '16px 12px', color: 'var(--color-text-muted)' }}>
                  {vacancy.employmentType}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pipeline Section */}
      <div style={{ marginTop: '32px' }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: '600',
          color: 'var(--color-text)',
          marginBottom: '16px'
        }}>
          Funnel voorbeeld (mock data)
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
          Klik op een vacature hierboven om de gedetailleerde funnel per vacature te bekijken.
        </p>
      </div>
    </div>
  );
};

import React from 'react';
import { vacancies } from '../utils/mockVacancies';

interface VacanciesPageProps {
  onChangePage: (vacancyId: string) => void;
}

export const VacanciesPage: React.FC<VacanciesPageProps> = ({ onChangePage }) => {
  const handleVacancyClick = (vacancyId: string) => {
    onChangePage(vacancyId);
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
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>Vacatures</h1>
      
      <div className="card" style={{ padding: '16px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #e5e7eb', textAlign: 'left' }}>
              <th style={{ padding: '12px', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Functie</th>
              <th style={{ padding: '12px', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Bedrijf</th>
              <th style={{ padding: '12px', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Locatie</th>
              <th style={{ padding: '12px', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Status</th>
              <th style={{ padding: '12px', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Prioriteit</th>
              <th style={{ padding: '12px', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Type</th>
            </tr>
          </thead>
          <tbody>
            {vacancies.map((vacancy) => (
              <tr 
                key={vacancy.id}
                onClick={() => handleVacancyClick(vacancy.id)}
                style={{ 
                  borderBottom: '1px solid #f3f4f6', 
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f9fafb';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <td style={{ padding: '16px 12px' }}>
                  <div style={{ fontWeight: '600', color: '#111827', marginBottom: '4px' }}>
                    {vacancy.title}
                  </div>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>
                    {vacancy.sector}
                  </div>
                </td>
                <td style={{ padding: '16px 12px', color: '#374151' }}>
                  {vacancy.company}
                </td>
                <td style={{ padding: '16px 12px', color: '#6b7280' }}>
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
                <td style={{ padding: '16px 12px', color: '#6b7280' }}>
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
          color: '#111827',
          marginBottom: '16px'
        }}>
          Funnel voorbeeld (mock data)
        </h2>
        <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
          Klik op een vacature hierboven om de gedetailleerde funnel per vacature te bekijken.
        </p>
      </div>
    </div>
  );
};

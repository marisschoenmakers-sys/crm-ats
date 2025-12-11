import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getVacancies } from '../api/vacancies';

interface Vacancy {
  id: string;
  title: string;
  company_name: string;
  location: string | null;
  status: 'Actief' | 'Gesloten' | 'Concept';
  priority: 'Laag' | 'Middel' | 'Hoog';
  employment_type: string;
  sector: string | null;
}

interface VacanciesPageProps {
  onChangePage?: (vacancyId: string) => void;
}

export const VacanciesPage: React.FC<VacanciesPageProps> = ({ onChangePage }) => {
  const navigate = useNavigate();
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);
  // Load collapsed companies from localStorage
  const [collapsedCompanies, setCollapsedCompanies] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('vacancies-collapsed-companies');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  useEffect(() => {
    async function loadVacancies() {
      const { data, error } = await getVacancies();
      if (error) {
        console.error('Error loading vacancies:', error);
      } else {
        setVacancies(data || []);
      }
      setLoading(false);
    }
    loadVacancies();
  }, []);

  // Save collapsed state to localStorage
  useEffect(() => {
    localStorage.setItem('vacancies-collapsed-companies', JSON.stringify([...collapsedCompanies]));
  }, [collapsedCompanies]);

  // Group vacancies by company
  const vacanciesByCompany = useMemo(() => {
    const grouped: Record<string, Vacancy[]> = {};
    vacancies.forEach(vacancy => {
      const company = vacancy.company_name || 'Onbekend bedrijf';
      if (!grouped[company]) {
        grouped[company] = [];
      }
      grouped[company].push(vacancy);
    });
    return grouped;
  }, [vacancies]);

  const toggleCompany = (company: string) => {
    setCollapsedCompanies(prev => {
      const next = new Set(prev);
      if (next.has(company)) {
        next.delete(company);
      } else {
        next.add(company);
      }
      return next;
    });
  };

  // Company is expanded if NOT in collapsed set
  const isCompanyExpanded = (company: string) => !collapsedCompanies.has(company);
  
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

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
        Laden...
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px', color: 'var(--color-text)' }}>Vacatures</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {Object.entries(vacanciesByCompany).map(([company, companyVacancies]) => {
          const isExpanded = isCompanyExpanded(company);
          const activeCount = companyVacancies.filter(v => v.status === 'Actief').length;
          
          return (
            <div 
              key={company}
              className="card"
              style={{ 
                overflow: 'hidden',
                border: '1px solid var(--color-border)',
                borderRadius: '8px'
              }}
            >
              {/* Company Header - Clickable */}
              <button
                onClick={() => toggleCompany(company)}
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  backgroundColor: 'var(--color-card-bg)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-card-bg)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {/* Chevron */}
                  <span style={{
                    fontSize: '12px',
                    color: 'var(--color-text-muted)',
                    transition: 'transform 0.2s ease',
                    transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)'
                  }}>
                    ▶
                  </span>
                  
                  {/* Company Name */}
                  <span style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: 'var(--color-text)'
                  }}>
                    {company}
                  </span>
                  
                  {/* Vacancy Count */}
                  <span style={{
                    fontSize: '13px',
                    color: 'var(--color-text-muted)',
                    backgroundColor: 'var(--color-bg-secondary)',
                    padding: '2px 8px',
                    borderRadius: '12px'
                  }}>
                    {companyVacancies.length} vacature{companyVacancies.length !== 1 ? 's' : ''}
                  </span>
                  
                  {/* Active Badge */}
                  {activeCount > 0 && (
                    <span className="badge badge-green" style={{ fontSize: '11px' }}>
                      {activeCount} actief
                    </span>
                  )}
                </div>
              </button>

              {/* Vacancies List - Collapsible */}
              {isExpanded && (
                <div style={{ borderTop: '1px solid var(--color-border)' }}>
                  {companyVacancies.map((vacancy, index) => (
                    <div
                      key={vacancy.id}
                      onClick={() => handleVacancyClick(vacancy.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                        borderBottom: index < companyVacancies.length - 1 ? '1px solid var(--color-border)' : 'none',
                        transition: 'background-color 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      {/* Title */}
                      <div style={{ 
                        flex: '2',
                        padding: '12px 16px 12px 44px',
                        borderRight: '1px solid var(--color-border)'
                      }}>
                        <div style={{ 
                          fontWeight: '500', 
                          color: 'var(--color-text)',
                          fontSize: '14px'
                        }}>
                          {vacancy.title}
                        </div>
                      </div>
                      
                      {/* Location */}
                      <div style={{ 
                        flex: '1',
                        padding: '12px 16px',
                        borderRight: '1px solid var(--color-border)',
                        fontSize: '13px', 
                        color: 'var(--color-text-muted)' 
                      }}>
                        {vacancy.location || 'Geen locatie'}
                      </div>
                      
                      {/* Type */}
                      <div style={{ 
                        width: '100px',
                        padding: '12px 16px',
                        borderRight: '1px solid var(--color-border)',
                        fontSize: '13px', 
                        color: 'var(--color-text-muted)',
                        textAlign: 'center'
                      }}>
                        {vacancy.employment_type}
                      </div>
                      
                      {/* Status */}
                      <div style={{ 
                        width: '100px',
                        padding: '12px 16px',
                        borderRight: '1px solid var(--color-border)',
                        textAlign: 'center'
                      }}>
                        <span className={`badge ${getStatusBadge(vacancy.status)}`}>
                          {vacancy.status}
                        </span>
                      </div>
                      
                      {/* Priority */}
                      <div style={{ 
                        width: '100px',
                        padding: '12px 16px',
                        textAlign: 'center'
                      }}>
                        <span className={`badge ${getPriorityBadge(vacancy.priority || 'Middel')}`}>
                          {vacancy.priority || 'Middel'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div style={{
        marginTop: '24px',
        padding: '16px',
        backgroundColor: 'var(--color-bg-secondary)',
        borderRadius: '8px',
        border: '1px solid var(--color-border)'
      }}>
        <div style={{
          fontSize: '14px',
          color: 'var(--color-text-muted)'
        }}>
          <span style={{ fontWeight: '500' }}>{vacancies.length}</span> vacatures bij{' '}
          <span style={{ fontWeight: '500' }}>{Object.keys(vacanciesByCompany).length}</span> bedrijven
        </div>
      </div>
    </div>
  );
};

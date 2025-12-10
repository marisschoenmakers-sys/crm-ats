import React from 'react';
import { CompanyCard } from './CompanyCard';
import type { Company } from '../types/company';

interface CompanyListProps {
  companies: Company[];
  onSelectCompany?: (company: Company) => void;
}

export const CompanyList: React.FC<CompanyListProps> = ({ 
  companies, 
  onSelectCompany 
}) => {
  if (companies.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '60px 20px',
        color: 'var(--color-text-muted)',
        fontSize: '14px'
      }}>
        Geen bedrijven gevonden
      </div>
    );
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
      gap: '16px'
    }}>
      {companies.map((company) => (
        <CompanyCard
          key={company.id}
          company={company}
          onClick={() => onSelectCompany?.(company)}
        />
      ))}
    </div>
  );
};

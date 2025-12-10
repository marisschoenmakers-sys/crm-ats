import React, { useState, useMemo } from 'react';
import { CompanyList } from '../components/CompanyList';
import { CompanyDetailPage } from './CompanyDetailPage';
import { companies } from '../utils/mockCompanies';
import type { Company } from '../types/company';

interface CompaniesPageProps {
  onChangePage?: (page: 'companies' | 'companyDetail') => void;
}

export const CompaniesPage: React.FC<CompaniesPageProps> = ({ onChangePage }) => {
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('');

  // Get unique sectors for filter dropdown
  const sectors = useMemo(() => {
    const uniqueSectors = [...new Set(companies.map(c => c.sector).filter(Boolean))];
    return uniqueSectors as string[];
  }, []);

  // Filter companies based on search and sector
  const filteredCompanies = useMemo(() => {
    return companies.filter(company => {
      const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           company.location?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSector = !selectedSector || company.sector === selectedSector;
      return matchesSearch && matchesSector;
    });
  }, [searchTerm, selectedSector]);

  const handleCompanySelect = (company: Company) => {
    setSelectedCompanyId(company.id);
    onChangePage?.('companyDetail');
  };

  const handleBackToCompanies = () => {
    setSelectedCompanyId(null);
    onChangePage?.('companies');
  };

  const selectedCompany = companies.find(c => c.id === selectedCompanyId);

  // If a company is selected, show detail view
  if (selectedCompanyId && selectedCompany) {
    return (
      <div style={{ display: 'flex', gap: '24px' }}>
        {/* Company List - Left side */}
        <div style={{ flex: '0 0 400px' }}>
          <div style={{ marginBottom: '16px' }}>
            <button
              onClick={handleBackToCompanies}
              style={{
                padding: '8px 16px',
                backgroundColor: 'white',
                color: '#374151',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              ← Terug naar bedrijven
            </button>
          </div>
          <CompanyList 
            companies={companies} 
            onSelectCompany={handleCompanySelect}
          />
        </div>

        {/* Company Detail - Right side */}
        <div style={{ flex: 1 }}>
          <CompanyDetailPage 
            companyId={selectedCompanyId}
          />
        </div>
      </div>
    );
  }

  // Show companies list
  return (
    <div>
      {/* Page Title */}
      <h1 style={{
        fontSize: '28px',
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: '16px'
      }}>
        Bedrijven
      </h1>

      {/* Intro Text */}
      <p style={{
        fontSize: '16px',
        color: '#6b7280',
        marginBottom: '32px',
        lineHeight: '1.5'
      }}>
        Beheer uw bedrijfsrelaties en bekijk vacatures, kandidaten en contactpersonen per organisatie.
      </p>

      {/* Filters */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '24px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 200px',
          gap: '16px',
          alignItems: 'end'
        }}>
          {/* Search Field */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '6px'
            }}>
              Zoek bedrijven
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Bedrijfsnaam of locatie..."
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                color: '#111827'
              }}
            />
          </div>

          {/* Sector Dropdown */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '6px'
            }}>
              Sector
            </label>
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                color: '#111827',
                backgroundColor: 'white'
              }}
            >
              <option value="">Alle sectoren</option>
              {sectors.map(sector => (
                <option key={sector} value={sector}>
                  {sector}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div style={{
          marginTop: '16px',
          fontSize: '13px',
          color: '#6b7280'
        }}>
          {filteredCompanies.length} van {companies.length} bedrijven
        </div>
      </div>

      {/* Companies List */}
      <CompanyList 
        companies={filteredCompanies} 
        onSelectCompany={handleCompanySelect}
      />
    </div>
  );
};

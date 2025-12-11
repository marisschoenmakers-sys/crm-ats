import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { CompanyList } from '../components/CompanyList';
import { getCompanies } from '../api/companies';
import { CompanyDetailModal } from '../components/CompanyDetailModal';
import type { Company } from '../types/company';

interface CompaniesPageProps {
  onChangePage?: (page: 'companies' | 'companyDetail') => void;
}

export const CompaniesPage: React.FC<CompaniesPageProps> = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('');
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);

  // Load companies from Supabase
  useEffect(() => {
    async function loadCompanies() {
      const { data, error } = await getCompanies();
      if (error) {
        console.error('Error loading companies:', error);
      } else {
        setCompanies((data || []) as Company[]);
      }
      setLoading(false);
    }
    loadCompanies();
  }, []);

  // Get unique sectors for filter dropdown
  const sectors = useMemo(() => {
    const uniqueSectors = [...new Set(companies.map(c => c.sector).filter(Boolean))];
    return uniqueSectors as string[];
  }, [companies]);

  // Filter companies based on search and sector
  const filteredCompanies = useMemo(() => {
    return companies.filter(company => {
      const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           company.location?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSector = !selectedSector || company.sector === selectedSector;
      return matchesSearch && matchesSector;
    });
  }, [companies, searchTerm, selectedSector]);

  const handleCompanySelect = (company: Company) => {
    setSelectedCompanyId(company.id);
  };

  const handleCloseModal = useCallback(() => {
    setSelectedCompanyId(null);
  }, []);

  // Show companies list
  return (
    <div>
      {/* Page Title */}
      <h1 style={{
        fontSize: '28px',
        fontWeight: 'bold',
        color: 'var(--color-text)',
        marginBottom: '16px'
      }}>
        Bedrijven
      </h1>

      {/* Intro Text */}
      <p style={{
        fontSize: '16px',
        color: 'var(--color-text-muted)',
        marginBottom: '32px',
        lineHeight: '1.5'
      }}>
        Beheer uw bedrijfsrelaties en bekijk vacatures, kandidaten en contactpersonen per organisatie.
      </p>

      {/* Filters */}
      <div style={{
        backgroundColor: 'var(--color-card-bg)',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '24px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        border: '1px solid var(--color-border)'
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
              color: 'var(--color-text)',
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
                border: '1px solid var(--color-input-border)',
                borderRadius: '6px',
                fontSize: '14px',
                color: 'var(--color-text)',
                backgroundColor: 'var(--color-input-bg)'
              }}
            />
          </div>

          {/* Sector Dropdown */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: 'var(--color-text)',
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
                border: '1px solid var(--color-input-border)',
                borderRadius: '6px',
                fontSize: '14px',
                color: 'var(--color-text)',
                backgroundColor: 'var(--color-input-bg)'
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
          color: 'var(--color-text-muted)'
        }}>
          {filteredCompanies.length} van {companies.length} bedrijven
        </div>
      </div>

      {/* Companies List */}
      <CompanyList 
        companies={filteredCompanies} 
        onSelectCompany={handleCompanySelect}
      />

      {/* Company Detail Modal */}
      {selectedCompanyId && (
        <CompanyDetailModal
          companyId={selectedCompanyId}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

import React from 'react';
import type { Company } from '../types/company';

interface CompanyOverviewProps {
  company: Company;
}

export const CompanyOverview: React.FC<CompanyOverviewProps> = ({ company }) => {
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
        Overzicht
      </h3>

      {/* Description */}
      <div style={{ marginBottom: '24px' }}>
        <h4 style={{
          fontSize: '14px',
          fontWeight: '600',
          color: 'var(--color-text)',
          marginBottom: '8px'
        }}>
          Beschrijving
        </h4>
        <p style={{
          fontSize: '14px',
          lineHeight: '1.6',
          color: 'var(--color-text)',
          margin: 0
        }}>
          {company.description}
        </p>
      </div>

      {/* Basic Info Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px'
      }}>
        {/* Sector */}
        {company.sector && (
          <div>
            <h4 style={{
              fontSize: '14px',
              fontWeight: '600',
              color: 'var(--color-text)',
              marginBottom: '6px'
            }}>
              Sector
            </h4>
            <div style={{
              fontSize: '14px',
              color: 'var(--color-text)'
            }}>
              {company.sector}
            </div>
          </div>
        )}

        {/* Size */}
        {company.size && (
          <div>
            <h4 style={{
              fontSize: '14px',
              fontWeight: '600',
              color: 'var(--color-text)',
              marginBottom: '6px'
            }}>
              Grootte
            </h4>
            <div style={{
              fontSize: '14px',
              color: 'var(--color-text)'
            }}>
              {company.size}
            </div>
          </div>
        )}

        {/* Location */}
        <div>
          <h4 style={{
            fontSize: '14px',
            fontWeight: '600',
            color: 'var(--color-text)',
            marginBottom: '6px'
          }}>
            Locatie
          </h4>
          <div style={{
            fontSize: '14px',
            color: 'var(--color-text)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <span>●</span>
            <span>{company.location}</span>
          </div>
        </div>

        {/* Website */}
        {company.website && (
          <div>
            <h4 style={{
              fontSize: '14px',
              fontWeight: '600',
              color: 'var(--color-text)',
              marginBottom: '6px'
            }}>
              Website
            </h4>
            <div style={{
              fontSize: '14px',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <span>◆</span>
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'var(--color-primary)',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.textDecoration = 'none';
                }}
              >
                {company.website}
              </a>
            </div>
          </div>
        )}

        {/* Priority */}
        {company.priority && (
          <div>
            <h4 style={{
              fontSize: '14px',
              fontWeight: '600',
              color: 'var(--color-text)',
              marginBottom: '6px'
            }}>
              Prioriteit
            </h4>
            <div style={{
              display: 'inline-block',
              padding: '4px 8px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: '500',
              color: 'var(--color-sidebar-text)',
              backgroundColor: company.priority === 'Hoog' ? 'var(--color-danger)' : 
                               company.priority === 'Middel' ? 'var(--color-warning)' : 'var(--color-success)'
            }}>
              {company.priority}
            </div>
          </div>
        )}

        {/* Created At */}
        <div>
          <h4 style={{
            fontSize: '14px',
            fontWeight: '600',
            color: 'var(--color-text)',
            marginBottom: '6px'
          }}>
            Toegevoegd op
          </h4>
          <div style={{
            fontSize: '14px',
            color: 'var(--color-text)'
          }}>
            {company.createdAt}
          </div>
        </div>
      </div>
    </div>
  );
};

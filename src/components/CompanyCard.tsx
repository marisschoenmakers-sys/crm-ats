import React from 'react';
import type { Company } from '../types/company';

interface CompanyCardProps {
  company: Company;
  onClick?: () => void;
}

export const CompanyCard: React.FC<CompanyCardProps> = ({ company, onClick }) => {
  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'Hoog':
        return 'var(--color-danger)';
      case 'Middel':
        return 'var(--color-warning)';
      case 'Laag':
        return 'var(--color-success)';
      default:
        return 'var(--color-text-muted)';
    }
  };

  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: 'var(--color-card-bg)',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        border: '1px solid var(--color-border)',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s ease',
        minHeight: '140px'
      }}
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }
      }}
      onMouseLeave={(e) => {
        if (onClick) {
          e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
          e.currentTarget.style.transform = 'translateY(0)';
        }
      }}
    >
      {/* Company Name */}
      <div style={{
        fontSize: '16px',
        fontWeight: '600',
        color: 'var(--color-text)',
        marginBottom: '8px',
        lineHeight: '1.3'
      }}>
        {company.name}
      </div>

      {/* Sector and Size */}
      <div style={{
        fontSize: '13px',
        color: 'var(--color-text-muted)',
        marginBottom: '6px'
      }}>
        {company.sector && <span>{company.sector}</span>}
        {company.sector && company.size && <span> • </span>}
        {company.size && <span>{company.size}</span>}
      </div>

      {/* Location */}
      <div style={{
        fontSize: '13px',
        color: 'var(--color-text-muted)',
        marginBottom: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '4px'
      }}>
        <span>●</span>
        <span>{company.location}</span>
      </div>

      {/* Website */}
      {company.website && (
        <div style={{
          fontSize: '12px',
          color: 'var(--color-primary)',
          marginBottom: '12px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}>
          {company.website}
        </div>
      )}

      {/* Priority Badge */}
      {company.priority && (
        <div style={{
          display: 'inline-block',
          padding: '4px 8px',
          borderRadius: '12px',
          fontSize: '11px',
          fontWeight: '500',
          color: 'var(--color-sidebar-text)',
          backgroundColor: getPriorityColor(company.priority)
        }}>
          {company.priority} prioriteit
        </div>
      )}
    </div>
  );
};

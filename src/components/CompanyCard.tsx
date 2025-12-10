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
        return '#dc2626';
      case 'Middel':
        return '#f59e0b';
      case 'Laag':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb',
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
        color: '#111827',
        marginBottom: '8px',
        lineHeight: '1.3'
      }}>
        {company.name}
      </div>

      {/* Sector and Size */}
      <div style={{
        fontSize: '13px',
        color: '#6b7280',
        marginBottom: '6px'
      }}>
        {company.sector && <span>{company.sector}</span>}
        {company.sector && company.size && <span> • </span>}
        {company.size && <span>{company.size}</span>}
      </div>

      {/* Location */}
      <div style={{
        fontSize: '13px',
        color: '#6b7280',
        marginBottom: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '4px'
      }}>
        <span>📍</span>
        <span>{company.location}</span>
      </div>

      {/* Website */}
      {company.website && (
        <div style={{
          fontSize: '12px',
          color: '#2563eb',
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
          color: 'white',
          backgroundColor: getPriorityColor(company.priority)
        }}>
          {company.priority} prioriteit
        </div>
      )}
    </div>
  );
};

import React from 'react';
import type { Company } from '../types/company';

interface CompanyDetailHeaderProps {
  company: Company;
}

export const CompanyDetailHeader: React.FC<CompanyDetailHeaderProps> = ({ company }) => {
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
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '24px',
      marginBottom: '24px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb'
    }}>
      {/* Company Name and Priority */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '16px'
      }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: 'bold',
          color: '#111827',
          margin: 0,
          lineHeight: '1.2'
        }}>
          {company.name}
        </h1>

        {/* Priority Badge */}
        {company.priority && (
          <div style={{
            display: 'inline-block',
            padding: '6px 12px',
            borderRadius: '16px',
            fontSize: '12px',
            fontWeight: '600',
            color: 'white',
            backgroundColor: getPriorityColor(company.priority)
          }}>
            {company.priority} prioriteit
          </div>
        )}
      </div>

      {/* Sector and Size */}
      <div style={{
        fontSize: '16px',
        color: '#6b7280',
        marginBottom: '12px',
        fontWeight: '500'
      }}>
        {company.sector && <span>{company.sector}</span>}
        {company.sector && company.size && <span> • </span>}
        {company.size && <span>{company.size}</span>}
      </div>

      {/* Location */}
      <div style={{
        fontSize: '14px',
        color: '#374151',
        marginBottom: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
      }}>
        <span>📍</span>
        <span>{company.location}</span>
      </div>

      {/* Website */}
      {company.website && (
        <div style={{
          fontSize: '14px',
          color: '#2563eb',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <span>🌐</span>
          <a
            href={company.website}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#2563eb',
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
      )}

      {/* Created At */}
      <div style={{
        fontSize: '12px',
        color: '#9ca3af'
      }}>
        Toegevoegd op {company.createdAt}
      </div>
    </div>
  );
};

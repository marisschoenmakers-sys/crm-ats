import React from 'react';
import type { Company } from '../types/company';

interface CompanyDetailHeaderProps {
  company: Company;
}

export const CompanyDetailHeader: React.FC<CompanyDetailHeaderProps> = ({ company }) => {
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
    <div style={{
      backgroundColor: 'var(--color-card-bg)',
      borderRadius: '8px',
      padding: '24px',
      marginBottom: '24px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid var(--color-border)'
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
          color: 'var(--color-text)',
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
            color: 'var(--color-sidebar-text)',
            backgroundColor: getPriorityColor(company.priority)
          }}>
            {company.priority} prioriteit
          </div>
        )}
      </div>

      {/* Sector and Size */}
      <div style={{
        fontSize: '16px',
        color: 'var(--color-text-muted)',
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
        color: 'var(--color-text)',
        marginBottom: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
      }}>
        <span>●</span>
        <span>{company.location}</span>
      </div>

      {/* Website */}
      {company.website && (
        <div style={{
          fontSize: '14px',
          color: 'var(--color-primary)',
          marginBottom: '16px',
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
      )}

      {/* Created At */}
      <div style={{
        fontSize: '12px',
        color: 'var(--color-text-muted)'
      }}>
        Toegevoegd op {company.createdAt}
      </div>
    </div>
  );
};

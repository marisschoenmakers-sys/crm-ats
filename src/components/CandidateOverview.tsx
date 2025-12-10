import React from 'react';
import type { CandidateDetail } from '../types/candidate';

interface CandidateOverviewProps {
  candidate: CandidateDetail;
}

export const CandidateOverview: React.FC<CandidateOverviewProps> = ({ candidate }) => {
  return (
    <div style={{
      backgroundColor: 'var(--color-card-bg)',
      borderRadius: '8px',
      padding: '24px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid var(--color-border)'
    }}>
      <h2 style={{
        fontSize: '18px',
        fontWeight: '600',
        color: 'var(--color-text)',
        marginBottom: '16px'
      }}>
        Overzicht
      </h2>

      {/* Summary */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{
          fontSize: '14px',
          fontWeight: '600',
          color: 'var(--color-text)',
          marginBottom: '8px'
        }}>
          Samenvatting
        </h3>
        <p style={{
          fontSize: '14px',
          lineHeight: '1.6',
          color: 'var(--color-text-muted)',
          margin: 0
        }}>
          {candidate.summary}
        </p>
      </div>

      {/* Basic Info Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px'
      }}>
        <div>
          <div style={{
            fontSize: '12px',
            fontWeight: '500',
            color: 'var(--color-text-muted)',
            marginBottom: '4px'
          }}>
            Functie
          </div>
          <div style={{
            fontSize: '14px',
            color: 'var(--color-text)'
          }}>
            {candidate.role}
          </div>
        </div>

        <div>
          <div style={{
            fontSize: '12px',
            fontWeight: '500',
            color: 'var(--color-text-muted)',
            marginBottom: '4px'
          }}>
            Vacature
          </div>
          <div style={{
            fontSize: '14px',
            color: 'var(--color-text)'
          }}>
            {candidate.vacancy}
          </div>
        </div>

        <div>
          <div style={{
            fontSize: '12px',
            fontWeight: '500',
            color: 'var(--color-text-muted)',
            marginBottom: '4px'
          }}>
            Locatie
          </div>
          <div style={{
            fontSize: '14px',
            color: 'var(--color-text)'
          }}>
            {candidate.location}
          </div>
        </div>

        <div>
          <div style={{
            fontSize: '12px',
            fontWeight: '500',
            color: 'var(--color-text-muted)',
            marginBottom: '4px'
          }}>
            Huidige stage
          </div>
          <div style={{
            fontSize: '14px',
            color: 'var(--color-text)'
          }}>
            {candidate.stage}
          </div>
        </div>

        <div>
          <div style={{
            fontSize: '12px',
            fontWeight: '500',
            color: 'var(--color-text-muted)',
            marginBottom: '4px'
          }}>
            Startdatum
          </div>
          <div style={{
            fontSize: '14px',
            color: 'var(--color-text)'
          }}>
            {candidate.addedAt}
          </div>
        </div>

        <div>
          <div style={{
            fontSize: '12px',
            fontWeight: '500',
            color: 'var(--color-text-muted)',
            marginBottom: '4px'
          }}>
            Email
          </div>
          <div style={{
            fontSize: '14px',
            color: 'var(--color-text)'
          }}>
            {candidate.email}
          </div>
        </div>

        <div>
          <div style={{
            fontSize: '12px',
            fontWeight: '500',
            color: 'var(--color-text-muted)',
            marginBottom: '4px'
          }}>
            Telefoon
          </div>
          <div style={{
            fontSize: '14px',
            color: 'var(--color-text)'
          }}>
            {candidate.phone}
          </div>
        </div>
      </div>

      {/* Status Section */}
      <div style={{
        marginTop: '24px',
        padding: '16px',
        backgroundColor: 'var(--color-bg-secondary)',
        borderRadius: '6px',
        border: '1px solid var(--color-border)'
      }}>
        <div style={{
          fontSize: '14px',
          fontWeight: '500',
          color: 'var(--color-text)',
          marginBottom: '8px'
        }}>
          Status
        </div>
        <div style={{
          fontSize: '13px',
          color: 'var(--color-text-muted)'
        }}>
          Kandidaat bevindt zich momenteel in de <strong>{candidate.stage}</strong> fase.
          {candidate.stage === 'Telefonisch interview' && ' Volgende stap: persoonlijk gesprek plannen.'}
          {candidate.stage === 'Voorgesteld' && ' Kandidaat is voorgesteld aan de hiring manager.'}
          {candidate.stage === 'Gesolliciteerd' && ' Wacht op eerste contact van recruiter.'}
        </div>
      </div>
    </div>
  );
};

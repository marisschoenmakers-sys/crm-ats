import React from 'react';
import type { CandidateDetail } from '../types/candidate';

interface CandidateOverviewProps {
  candidate: CandidateDetail;
}

export const CandidateOverview: React.FC<CandidateOverviewProps> = ({ candidate }) => {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '24px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb'
    }}>
      <h2 style={{
        fontSize: '18px',
        fontWeight: '600',
        color: '#111827',
        marginBottom: '16px'
      }}>
        Overzicht
      </h2>

      {/* Summary */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{
          fontSize: '14px',
          fontWeight: '600',
          color: '#374151',
          marginBottom: '8px'
        }}>
          Samenvatting
        </h3>
        <p style={{
          fontSize: '14px',
          lineHeight: '1.6',
          color: '#6b7280',
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
            color: '#9ca3af',
            marginBottom: '4px'
          }}>
            Functie
          </div>
          <div style={{
            fontSize: '14px',
            color: '#111827'
          }}>
            {candidate.role}
          </div>
        </div>

        <div>
          <div style={{
            fontSize: '12px',
            fontWeight: '500',
            color: '#9ca3af',
            marginBottom: '4px'
          }}>
            Vacature
          </div>
          <div style={{
            fontSize: '14px',
            color: '#111827'
          }}>
            {candidate.vacancy}
          </div>
        </div>

        <div>
          <div style={{
            fontSize: '12px',
            fontWeight: '500',
            color: '#9ca3af',
            marginBottom: '4px'
          }}>
            Locatie
          </div>
          <div style={{
            fontSize: '14px',
            color: '#111827'
          }}>
            {candidate.location}
          </div>
        </div>

        <div>
          <div style={{
            fontSize: '12px',
            fontWeight: '500',
            color: '#9ca3af',
            marginBottom: '4px'
          }}>
            Huidige stage
          </div>
          <div style={{
            fontSize: '14px',
            color: '#111827'
          }}>
            {candidate.stage}
          </div>
        </div>

        <div>
          <div style={{
            fontSize: '12px',
            fontWeight: '500',
            color: '#9ca3af',
            marginBottom: '4px'
          }}>
            Startdatum
          </div>
          <div style={{
            fontSize: '14px',
            color: '#111827'
          }}>
            {candidate.addedAt}
          </div>
        </div>

        <div>
          <div style={{
            fontSize: '12px',
            fontWeight: '500',
            color: '#9ca3af',
            marginBottom: '4px'
          }}>
            Email
          </div>
          <div style={{
            fontSize: '14px',
            color: '#111827'
          }}>
            {candidate.email}
          </div>
        </div>

        <div>
          <div style={{
            fontSize: '12px',
            fontWeight: '500',
            color: '#9ca3af',
            marginBottom: '4px'
          }}>
            Telefoon
          </div>
          <div style={{
            fontSize: '14px',
            color: '#111827'
          }}>
            {candidate.phone}
          </div>
        </div>
      </div>

      {/* Status Section */}
      <div style={{
        marginTop: '24px',
        padding: '16px',
        backgroundColor: '#f9fafb',
        borderRadius: '6px',
        border: '1px solid #e5e7eb'
      }}>
        <div style={{
          fontSize: '14px',
          fontWeight: '500',
          color: '#374151',
          marginBottom: '8px'
        }}>
          Status
        </div>
        <div style={{
          fontSize: '13px',
          color: '#6b7280'
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

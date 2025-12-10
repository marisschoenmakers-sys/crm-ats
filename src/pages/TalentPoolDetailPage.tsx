import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Mock data
const mockTalentPools = [
  { id: '1', name: 'Frontend Developers', description: 'Ervaren frontend developers met React kennis', candidateCount: 45 },
  { id: '2', name: 'Sales Professionals', description: 'Sales kandidaten voor diverse sectoren', candidateCount: 32 },
  { id: '3', name: 'Marketing Specialisten', description: 'Digital marketing en content specialisten', candidateCount: 28 },
];

export const TalentPoolDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const pool = mockTalentPools.find(p => p.id === id);

  if (!pool) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Talentpool niet gevonden</h2>
        <button onClick={() => navigate('/talentpools')} style={{ marginTop: '16px', padding: '10px 20px', cursor: 'pointer' }}>
          Terug naar talentpools
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Back Button */}
      <button
        onClick={() => navigate('/talentpools')}
        style={{
          padding: '8px 16px',
          backgroundColor: 'transparent',
          color: 'var(--color-primary)',
          border: '1px solid var(--color-border)',
          borderRadius: '6px',
          fontSize: '14px',
          fontWeight: '500',
          cursor: 'pointer',
          marginBottom: '24px',
        }}
      >
        ← Terug naar talentpools
      </button>

      {/* Header */}
      <div style={{
        backgroundColor: 'var(--color-card-bg)',
        borderRadius: '12px',
        padding: '24px',
        border: '1px solid var(--color-border)',
        marginBottom: '24px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            backgroundColor: 'var(--color-primary-bg)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '28px',
          }}>
            🎯
          </div>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '600', color: 'var(--color-text)', margin: 0 }}>
              {pool.name}
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
              {pool.description}
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px',
        marginBottom: '24px',
      }}>
        <div style={{
          backgroundColor: 'var(--color-card-bg)',
          borderRadius: '12px',
          padding: '20px',
          border: '1px solid var(--color-border)',
        }}>
          <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--color-primary)' }}>{pool.candidateCount}</div>
          <div style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>Kandidaten</div>
        </div>
        <div style={{
          backgroundColor: 'var(--color-card-bg)',
          borderRadius: '12px',
          padding: '20px',
          border: '1px solid var(--color-border)',
        }}>
          <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--color-success)' }}>12</div>
          <div style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>Actief</div>
        </div>
        <div style={{
          backgroundColor: 'var(--color-card-bg)',
          borderRadius: '12px',
          padding: '20px',
          border: '1px solid var(--color-border)',
        }}>
          <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--color-warning)' }}>5</div>
          <div style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>Nieuw deze week</div>
        </div>
      </div>

      {/* Candidates placeholder */}
      <div style={{
        backgroundColor: 'var(--color-card-bg)',
        borderRadius: '12px',
        padding: '40px',
        border: '1px solid var(--color-border)',
        textAlign: 'center',
        color: 'var(--color-text-muted)',
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>👥</div>
        <p>Kandidaten in deze pool worden hier weergegeven</p>
      </div>
    </div>
  );
};

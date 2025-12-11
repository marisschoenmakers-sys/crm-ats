import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { seedDatabase, clearDatabase } from '../utils/seedDatabase';

export const AdminSeedPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSeed = async () => {
    setLoading(true);
    setMessage(null);
    
    const result = await seedDatabase();
    
    setMessage({
      type: result.success ? 'success' : 'error',
      text: result.message
    });
    setLoading(false);
  };

  const handleClear = async () => {
    if (!confirm('Weet je zeker dat je de data wilt verwijderen? Pipeline stages blijven behouden.')) {
      return;
    }
    
    setLoading(true);
    setMessage(null);
    
    const result = await clearDatabase();
    
    setMessage({
      type: result.success ? 'success' : 'error',
      text: result.message
    });
    setLoading(false);
  };

  return (
    <div style={{ padding: '24px', maxWidth: '900px', margin: '0 auto' }}>
      <button
        onClick={() => navigate('/settings')}
        style={{
          padding: '8px 16px',
          backgroundColor: 'transparent',
          color: 'var(--color-primary)',
          border: '1px solid var(--color-border)',
          borderRadius: '6px',
          fontSize: '14px',
          cursor: 'pointer',
          marginBottom: '24px'
        }}
      >
        ← Terug naar instellingen
      </button>

      <h1 style={{
        fontSize: '28px',
        fontWeight: 'bold',
        color: 'var(--color-text)',
        marginBottom: '8px'
      }}>
        Database Beheer
      </h1>
      
      <p style={{
        fontSize: '16px',
        color: 'var(--color-text-muted)',
        marginBottom: '32px'
      }}>
        Vul de database met mock data of verwijder data. Pipeline stages en evaluatie vraagtypen blijven altijd behouden.
      </p>

      {message && (
        <div style={{
          padding: '16px',
          borderRadius: '8px',
          marginBottom: '24px',
          backgroundColor: message.type === 'success' ? 'var(--color-success-bg)' : 'var(--color-danger-bg)',
          color: message.type === 'success' ? 'var(--color-success)' : 'var(--color-danger)',
          border: `1px solid ${message.type === 'success' ? 'var(--color-success)' : 'var(--color-danger)'}`
        }}>
          {message.text}
        </div>
      )}

      <div style={{
        display: 'grid',
        gap: '24px',
        gridTemplateColumns: '1fr 1fr'
      }}>
        {/* Clear Database Card - FIRST */}
        <div style={{
          backgroundColor: 'var(--color-card-bg)',
          borderRadius: '12px',
          padding: '24px',
          border: '1px solid var(--color-border)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '16px'
          }}>
            <div style={{
              fontSize: '32px'
            }}>
              🗑️
            </div>
            <div style={{
              backgroundColor: 'var(--color-bg-secondary)',
              padding: '4px 12px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: '600',
              color: 'var(--color-text-muted)'
            }}>
              STAP 1
            </div>
          </div>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: 'var(--color-text)',
            marginBottom: '12px'
          }}>
            Database Legen
          </h2>
          
          <p style={{
            fontSize: '14px',
            color: 'var(--color-text-muted)',
            marginBottom: '16px',
            lineHeight: '1.5'
          }}>
            Verwijdert de volgende data:
          </p>
          
          <ul style={{
            fontSize: '13px',
            color: 'var(--color-text-muted)',
            marginBottom: '16px',
            paddingLeft: '20px',
            lineHeight: '1.6'
          }}>
            <li>Kandidaten & notities</li>
            <li>Vacatures</li>
            <li>Bedrijven & contactpersonen</li>
            <li>Evaluatieformulieren & antwoorden</li>
            <li>Talent pools & leden</li>
          </ul>

          <div style={{
            backgroundColor: 'var(--color-success-bg)',
            padding: '12px',
            borderRadius: '6px',
            marginBottom: '16px'
          }}>
            <p style={{
              fontSize: '13px',
              color: 'var(--color-success)',
              margin: 0
            }}>
              ✓ <strong>Blijft behouden:</strong> Pipeline stages (Nieuw, Screening, Interview, etc.)
            </p>
          </div>

          <button
            onClick={handleClear}
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px 24px',
              backgroundColor: 'var(--color-danger)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Bezig...' : '🗑️ Database Legen'}
          </button>
        </div>

        {/* Seed Database Card - SECOND */}
        <div style={{
          backgroundColor: 'var(--color-card-bg)',
          borderRadius: '12px',
          padding: '24px',
          border: '1px solid var(--color-border)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '16px'
          }}>
            <div style={{
              fontSize: '32px'
            }}>
              🌱
            </div>
            <div style={{
              backgroundColor: 'var(--color-primary-bg)',
              padding: '4px 12px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: '600',
              color: 'var(--color-primary)'
            }}>
              STAP 2
            </div>
          </div>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: 'var(--color-text)',
            marginBottom: '12px'
          }}>
            Database Vullen
          </h2>
          <p style={{
            fontSize: '14px',
            color: 'var(--color-text-muted)',
            marginBottom: '16px',
            lineHeight: '1.5'
          }}>
            Voegt mock data toe:
          </p>
          <ul style={{
            fontSize: '13px',
            color: 'var(--color-text-muted)',
            marginBottom: '16px',
            paddingLeft: '20px',
            lineHeight: '1.6'
          }}>
            <li><strong>50 kandidaten</strong> met Nederlandse namen</li>
            <li><strong>20 vacatures</strong> bij 10 bedrijven</li>
            <li><strong>10 bedrijven</strong> met contactpersonen</li>
            <li><strong>20 evaluatie templates</strong></li>
            <li><strong>5 talent pools</strong> met leden</li>
            <li><strong>25 kandidaat-vacature koppelingen</strong></li>
          </ul>
          
          <div style={{
            backgroundColor: 'var(--color-bg-secondary)',
            padding: '12px',
            borderRadius: '6px',
            marginBottom: '16px'
          }}>
            <p style={{
              fontSize: '13px',
              color: 'var(--color-text-muted)',
              margin: 0
            }}>
              💡 Pipeline stages worden alleen toegevoegd als ze nog niet bestaan.
            </p>
          </div>

          <button
            onClick={handleSeed}
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px 24px',
              backgroundColor: 'var(--color-primary)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Bezig...' : '🚀 Database Vullen'}
          </button>
        </div>
      </div>

      {/* Info Section */}
      <div style={{
        marginTop: '32px',
        padding: '20px',
        backgroundColor: 'var(--color-bg-secondary)',
        borderRadius: '8px',
        border: '1px solid var(--color-border)'
      }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: '600',
          color: 'var(--color-text)',
          marginBottom: '12px'
        }}>
          ℹ️ Hoe werkt het?
        </h3>
        <p style={{
          fontSize: '14px',
          color: 'var(--color-text-muted)',
          lineHeight: '1.6',
          margin: 0
        }}>
          <strong>1.</strong> Klik eerst op "Database Legen" om bestaande data te verwijderen (pipeline stages blijven behouden).<br/>
          <strong>2.</strong> Klik daarna op "Database Vullen" om de mock data in Supabase te laden.<br/>
          <strong>3.</strong> Vanaf nu worden alle wijzigingen automatisch opgeslagen in Supabase.
        </p>
      </div>
    </div>
  );
};

export default AdminSeedPage;

import React, { useState, useEffect } from 'react';
import type { CandidateDetail } from '../types/candidate';

interface CandidateEditPanelProps {
  candidate: CandidateDetail;
  open: boolean;
  onClose: () => void;
  onSave: (updated: CandidateDetail) => void;
}

const stages: CandidateDetail['stage'][] = [
  'Gesolliciteerd',
  'Geen gehoor',
  'Telefonisch interview',
  'In afwachting CV',
  'Twijfel kandidaat',
  'Afwijzen',
  'Voorgesteld'
];

export const CandidateEditPanel: React.FC<CandidateEditPanelProps> = ({ 
  candidate, 
  open, 
  onClose, 
  onSave 
}) => {
  const [formData, setFormData] = useState<CandidateDetail>(candidate);

  useEffect(() => {
    setFormData(candidate);
  }, [candidate]);

  const handleChange = (field: keyof CandidateDetail, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleCancel = () => {
    setFormData(candidate);
    onClose();
  };

  if (!open) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'var(--color-card-bg)',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '600px',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
      }}>
        {/* Header */}
        <div style={{
          padding: '24px',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: 'var(--color-text)',
            margin: 0
          }}>
            Kandidaat Bewerken
          </h2>
          
          <button
            onClick={handleCancel}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              fontSize: '24px',
              color: 'var(--color-text-muted)',
              cursor: 'pointer',
              padding: '0',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Full Name */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: 'var(--color-text)',
                marginBottom: '6px'
              }}>
                Volledige naam
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid var(--color-input-border)',
                  borderRadius: '6px',
                  fontSize: '14px',
                  color: 'var(--color-text)',
                  backgroundColor: 'var(--color-input-bg)'
                }}
                required
              />
            </div>

            {/* Role */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: 'var(--color-text)',
                marginBottom: '6px'
              }}>
                Functie
              </label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => handleChange('role', e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid var(--color-input-border)',
                  borderRadius: '6px',
                  fontSize: '14px',
                  color: 'var(--color-text)',
                  backgroundColor: 'var(--color-input-bg)'
                }}
                required
              />
            </div>

            {/* Location */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: 'var(--color-text)',
                marginBottom: '6px'
              }}>
                Locatie
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid var(--color-input-border)',
                  borderRadius: '6px',
                  fontSize: '14px',
                  color: 'var(--color-text)',
                  backgroundColor: 'var(--color-input-bg)'
                }}
                required
              />
            </div>

            {/* Email */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: 'var(--color-text)',
                marginBottom: '6px'
              }}>
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid var(--color-input-border)',
                  borderRadius: '6px',
                  fontSize: '14px',
                  color: 'var(--color-text)',
                  backgroundColor: 'var(--color-input-bg)'
                }}
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: 'var(--color-text)',
                marginBottom: '6px'
              }}>
                Telefoon
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid var(--color-input-border)',
                  borderRadius: '6px',
                  fontSize: '14px',
                  color: 'var(--color-text)',
                  backgroundColor: 'var(--color-input-bg)'
                }}
                required
              />
            </div>

            {/* Stage */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: 'var(--color-text)',
                marginBottom: '6px'
              }}>
                Stage
              </label>
              <select
                value={formData.stage}
                onChange={(e) => handleChange('stage', e.target.value as CandidateDetail['stage'])}
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
                {stages.map(stage => (
                  <option key={stage} value={stage}>
                    {stage}
                  </option>
                ))}
              </select>
            </div>

            {/* Vacancy */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: 'var(--color-text)',
                marginBottom: '6px'
              }}>
                Vacature
              </label>
              <input
                type="text"
                value={formData.vacancy}
                onChange={(e) => handleChange('vacancy', e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid var(--color-input-border)',
                  borderRadius: '6px',
                  fontSize: '14px',
                  color: 'var(--color-text)',
                  backgroundColor: 'var(--color-input-bg)'
                }}
                required
              />
            </div>

            {/* Summary */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: 'var(--color-text)',
                marginBottom: '6px'
              }}>
                Samenvatting
              </label>
              <textarea
                value={formData.summary}
                onChange={(e) => handleChange('summary', e.target.value)}
                rows={4}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid var(--color-input-border)',
                  borderRadius: '6px',
                  fontSize: '14px',
                  color: 'var(--color-text)',
                  backgroundColor: 'var(--color-input-bg)',
                  resize: 'vertical'
                }}
                required
              />
            </div>
          </div>

          {/* Buttons */}
          <div style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'flex-end',
            marginTop: '32px',
            paddingTop: '24px',
            borderTop: '1px solid var(--color-border)'
          }}>
            <button
              type="button"
              onClick={handleCancel}
              style={{
                padding: '10px 20px',
                backgroundColor: 'var(--color-card-bg)',
                color: 'var(--color-text)',
                border: '1px solid var(--color-border)',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Annuleren
            </button>
            
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-sidebar-text)',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Opslaan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

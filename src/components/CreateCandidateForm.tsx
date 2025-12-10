import React, { useState } from 'react';
import { createCandidate } from '../api/candidates';

interface CreateCandidateFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateCandidateForm({ onClose, onSuccess }: CreateCandidateFormProps) {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    location: '',
    job_title: '',
    summary: '',
    source: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await createCandidate(formData);
    
    if (error) {
      setError(error.message);
    } else {
      onSuccess();
      onClose();
    }
    
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

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
            Nieuwe kandidaat
          </h2>
          <button
            onClick={onClose}
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
          {error && (
            <div style={{
              backgroundColor: '#ef4444',
              color: 'white',
              padding: '12px',
              borderRadius: '6px',
              marginBottom: '16px'
            }}>
              {error}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Voornaam */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: 'var(--color-text)',
                marginBottom: '6px'
              }}>
                Voornaam *
              </label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid var(--color-input-border)',
                  borderRadius: '6px',
                  fontSize: '14px',
                  color: 'var(--color-text)',
                  backgroundColor: 'var(--color-input-bg)'
                }}
              />
            </div>

            {/* Achternaam */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: 'var(--color-text)',
                marginBottom: '6px'
              }}>
                Achternaam *
              </label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid var(--color-input-border)',
                  borderRadius: '6px',
                  fontSize: '14px',
                  color: 'var(--color-text)',
                  backgroundColor: 'var(--color-input-bg)'
                }}
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
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid var(--color-input-border)',
                  borderRadius: '6px',
                  fontSize: '14px',
                  color: 'var(--color-text)',
                  backgroundColor: 'var(--color-input-bg)'
                }}
              />
            </div>

            {/* Telefoon */}
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
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid var(--color-input-border)',
                  borderRadius: '6px',
                  fontSize: '14px',
                  color: 'var(--color-text)',
                  backgroundColor: 'var(--color-input-bg)'
                }}
              />
            </div>

            {/* Locatie */}
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
                name="location"
                value={formData.location}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid var(--color-input-border)',
                  borderRadius: '6px',
                  fontSize: '14px',
                  color: 'var(--color-text)',
                  backgroundColor: 'var(--color-input-bg)'
                }}
              />
            </div>

            {/* Huidige functie */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: 'var(--color-text)',
                marginBottom: '6px'
              }}>
                Huidige functie
              </label>
              <input
                type="text"
                name="job_title"
                value={formData.job_title}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid var(--color-input-border)',
                  borderRadius: '6px',
                  fontSize: '14px',
                  color: 'var(--color-text)',
                  backgroundColor: 'var(--color-input-bg)'
                }}
              />
            </div>

            {/* Bron */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: 'var(--color-text)',
                marginBottom: '6px'
              }}>
                Bron
              </label>
              <input
                type="text"
                name="source"
                value={formData.source}
                onChange={handleChange}
                placeholder="LinkedIn, Indeed, etc."
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid var(--color-input-border)',
                  borderRadius: '6px',
                  fontSize: '14px',
                  color: 'var(--color-text)',
                  backgroundColor: 'var(--color-input-bg)'
                }}
              />
            </div>

            {/* Samenvatting */}
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
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                rows={3}
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
              />
            </div>
          </div>

          {/* Footer */}
          <div style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'flex-end',
            marginTop: '24px'
          }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '8px 16px',
                border: '1px solid var(--color-border)',
                borderRadius: '6px',
                fontSize: '14px',
                cursor: 'pointer',
                backgroundColor: 'var(--color-input-bg)',
                color: 'var(--color-text)'
              }}
            >
              Annuleren
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '8px 16px',
                backgroundColor: 'var(--color-primary)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.6 : 1
              }}
            >
              {loading ? 'Opslaan...' : 'Kandidaat aanmaken'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

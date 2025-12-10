import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { CreateType } from './CreateMenu';

interface CreateModalProps {
  isOpen: boolean;
  type: CreateType | null;
  onClose: () => void;
  onSave: (type: CreateType, data: Record<string, unknown>) => void;
}

const modalTitles: Record<CreateType, string> = {
  candidate: 'Nieuwe kandidaat aanmaken',
  vacancy: 'Nieuwe vacature aanmaken',
  company: 'Nieuw bedrijf aanmaken',
  talentpool: 'Nieuwe talentpool aanmaken',
  evaluation: 'Nieuw evaluatieformulier aanmaken',
};

export const CreateModal: React.FC<CreateModalProps> = ({ isOpen, type, onClose, onSave }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Record<string, string>>({});

  if (!isOpen || !type) return null;

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // For evaluation forms, redirect to the builder
    if (type === 'evaluation') {
      onClose();
      navigate('/settings/templates/evaluation-forms/new');
      return;
    }
    
    onSave(type, formData);
    setFormData({});
    onClose();
  };

  const renderForm = () => {
    switch (type) {
      case 'candidate':
        return (
          <>
            <FormField label="Volledige naam" field="name" value={formData.name || ''} onChange={handleChange} required />
            <FormField label="E-mail" field="email" value={formData.email || ''} onChange={handleChange} type="email" required />
            <FormField label="Telefoon" field="phone" value={formData.phone || ''} onChange={handleChange} />
            <FormField label="Functie / Rol" field="role" value={formData.role || ''} onChange={handleChange} />
            <FormField label="Locatie" field="location" value={formData.location || ''} onChange={handleChange} />
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: 'var(--color-text)', marginBottom: '6px' }}>
                CV uploaden
              </label>
              <div style={{
                border: '2px dashed var(--color-border)',
                borderRadius: '8px',
                padding: '24px',
                textAlign: 'center',
                color: 'var(--color-text-muted)',
                fontSize: '14px',
              }}>
                Sleep een bestand hierheen of klik om te uploaden
              </div>
            </div>
          </>
        );
      
      case 'vacancy':
        return (
          <>
            <FormField label="Functietitel" field="title" value={formData.title || ''} onChange={handleChange} required />
            <FormField label="Afdeling" field="department" value={formData.department || ''} onChange={handleChange} />
            <FormField label="Locatie" field="location" value={formData.location || ''} onChange={handleChange} />
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: 'var(--color-text)', marginBottom: '6px' }}>
                Prioriteit
              </label>
              <select
                value={formData.priority || 'Medium'}
                onChange={(e) => handleChange('priority', e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid var(--color-input-border)',
                  borderRadius: '8px',
                  fontSize: '14px',
                  backgroundColor: 'var(--color-input-bg)',
                  color: 'var(--color-text)',
                }}
              >
                <option value="Hoog">Hoog</option>
                <option value="Medium">Medium</option>
                <option value="Laag">Laag</option>
              </select>
            </div>
            <FormField label="Bedrijf" field="company" value={formData.company || ''} onChange={handleChange} />
          </>
        );
      
      case 'company':
        return (
          <>
            <FormField label="Bedrijfsnaam" field="name" value={formData.name || ''} onChange={handleChange} required />
            <FormField label="Locatie" field="location" value={formData.location || ''} onChange={handleChange} />
            <FormField label="Sector" field="sector" value={formData.sector || ''} onChange={handleChange} />
            <FormField label="Contactpersoon" field="contact" value={formData.contact || ''} onChange={handleChange} />
          </>
        );
      
      case 'talentpool':
        return (
          <>
            <FormField label="Naam talentpool" field="name" value={formData.name || ''} onChange={handleChange} required />
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: 'var(--color-text)', marginBottom: '6px' }}>
                Beschrijving
              </label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={3}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid var(--color-input-border)',
                  borderRadius: '8px',
                  fontSize: '14px',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                  backgroundColor: 'var(--color-input-bg)',
                  color: 'var(--color-text)',
                }}
                placeholder="Beschrijf deze talentpool..."
              />
            </div>
          </>
        );
      
      case 'evaluation':
        return (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px', color: 'var(--color-primary)' }}>◆</div>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>
              Je wordt doorgestuurd naar de evaluatieformulier builder.
            </p>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={onClose}
      >
        {/* Modal */}
        <div
          style={{
            backgroundColor: 'var(--color-card-bg)',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '500px',
            maxHeight: '90vh',
            overflow: 'auto',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div style={{
            padding: '20px 24px',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--color-text)', margin: 0 }}>
              {modalTitles[type]}
            </h2>
            <button
              onClick={onClose}
              style={{
                padding: '8px',
                backgroundColor: 'transparent',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '20px',
                color: 'var(--color-text-muted)',
              }}
            >
              ×
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div style={{ padding: '24px' }}>
              {renderForm()}
            </div>

            {/* Footer */}
            <div style={{
              padding: '16px 24px',
              borderTop: '1px solid var(--color-border)',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '12px',
            }}>
              <button
                type="button"
                onClick={onClose}
                style={{
                  padding: '10px 20px',
                  backgroundColor: 'var(--color-card-bg)',
                  color: 'var(--color-text)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
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
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                }}
              >
                {type === 'evaluation' ? 'Ga naar builder' : 'Opslaan'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

// Helper component for form fields
const FormField: React.FC<{
  label: string;
  field: string;
  value: string;
  onChange: (field: string, value: string) => void;
  type?: string;
  required?: boolean;
}> = ({ label, field, value, onChange, type = 'text', required = false }) => (
  <div style={{ marginBottom: '16px' }}>
    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: 'var(--color-text)', marginBottom: '6px' }}>
      {label} {required && <span style={{ color: 'var(--color-danger)' }}>*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(field, e.target.value)}
      required={required}
      style={{
        width: '100%',
        padding: '10px 12px',
        border: '1px solid var(--color-input-border)',
        borderRadius: '8px',
        fontSize: '14px',
        backgroundColor: 'var(--color-input-bg)',
        color: 'var(--color-text)',
      }}
    />
  </div>
);

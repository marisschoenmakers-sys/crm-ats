import React, { useState } from 'react';
import { updateVacancy } from '../api/vacancies';

interface Vacancy {
  id: string;
  title: string;
  company_name: string;
  company_id: string | null;
  location: string | null;
  employment_type: string;
  salary_range: string | null;
  description: string | null;
  requirements: string[] | null;
  sector: string | null;
  priority: 'Laag' | 'Middel' | 'Hoog';
  status: 'Actief' | 'Gesloten' | 'Concept';
}

interface VacancyEditModalProps {
  vacancy: Vacancy;
  onClose: () => void;
  onSave: (updatedVacancy: Vacancy) => void;
}

export const VacancyEditModal: React.FC<VacancyEditModalProps> = ({ vacancy, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: vacancy.title,
    company_name: vacancy.company_name,
    location: vacancy.location || '',
    employment_type: vacancy.employment_type,
    salary_range: vacancy.salary_range || '',
    description: vacancy.description || '',
    requirements: (vacancy.requirements || []).join('\n'),
    sector: vacancy.sector || '',
    priority: vacancy.priority,
    status: vacancy.status,
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    
    const updates = {
      title: formData.title,
      company_name: formData.company_name,
      location: formData.location || undefined,
      employment_type: formData.employment_type,
      salary_range: formData.salary_range || undefined,
      description: formData.description || undefined,
      requirements: formData.requirements.split('\n').filter(r => r.trim()),
      sector: formData.sector || undefined,
      priority: formData.priority as 'Laag' | 'Middel' | 'Hoog',
      status: formData.status as 'Actief' | 'Gesloten' | 'Concept',
    };

    const { data, error } = await updateVacancy(vacancy.id, updates);
    
    if (error) {
      console.error('Error updating vacancy:', error);
      alert('Fout bij opslaan: ' + error.message);
    } else if (data) {
      onSave({ ...vacancy, ...updates } as Vacancy);
    }
    
    setSaving(false);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 9998,
        }}
      />

      {/* Modal */}
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        maxWidth: '600px',
        maxHeight: '90vh',
        backgroundColor: 'var(--color-card-bg)',
        borderRadius: '12px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        border: '1px solid var(--color-border)',
        zIndex: 9999,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--color-text)', margin: 0 }}>
            Vacature bewerken
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: 'var(--color-text-muted)',
              padding: '4px',
            }}
          >
            ×
          </button>
        </div>

        {/* Form */}
        <div style={{
          padding: '24px',
          overflowY: 'auto',
          flex: 1,
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Title */}
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: 'var(--color-text)', marginBottom: '6px' }}>
                Functietitel *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  fontSize: '14px',
                  backgroundColor: 'var(--color-card-bg)',
                  color: 'var(--color-text)',
                }}
              />
            </div>

            {/* Company & Location */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: 'var(--color-text)', marginBottom: '6px' }}>
                  Bedrijf
                </label>
                <input
                  type="text"
                  value={formData.company_name}
                  onChange={(e) => handleChange('company_name', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    fontSize: '14px',
                    backgroundColor: 'var(--color-card-bg)',
                    color: 'var(--color-text)',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: 'var(--color-text)', marginBottom: '6px' }}>
                  Locatie
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    fontSize: '14px',
                    backgroundColor: 'var(--color-card-bg)',
                    color: 'var(--color-text)',
                  }}
                />
              </div>
            </div>

            {/* Employment Type & Salary */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: 'var(--color-text)', marginBottom: '6px' }}>
                  Dienstverband
                </label>
                <select
                  value={formData.employment_type}
                  onChange={(e) => handleChange('employment_type', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    fontSize: '14px',
                    backgroundColor: 'var(--color-card-bg)',
                    color: 'var(--color-text)',
                  }}
                >
                  <option value="Fulltime">Fulltime</option>
                  <option value="Parttime">Parttime</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Stage">Stage</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: 'var(--color-text)', marginBottom: '6px' }}>
                  Salarisindicatie
                </label>
                <input
                  type="text"
                  value={formData.salary_range}
                  onChange={(e) => handleChange('salary_range', e.target.value)}
                  placeholder="bijv. €50.000 - €65.000"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    fontSize: '14px',
                    backgroundColor: 'var(--color-card-bg)',
                    color: 'var(--color-text)',
                  }}
                />
              </div>
            </div>

            {/* Sector, Priority & Status */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: 'var(--color-text)', marginBottom: '6px' }}>
                  Sector
                </label>
                <input
                  type="text"
                  value={formData.sector}
                  onChange={(e) => handleChange('sector', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    fontSize: '14px',
                    backgroundColor: 'var(--color-card-bg)',
                    color: 'var(--color-text)',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: 'var(--color-text)', marginBottom: '6px' }}>
                  Prioriteit
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => handleChange('priority', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    fontSize: '14px',
                    backgroundColor: 'var(--color-card-bg)',
                    color: 'var(--color-text)',
                  }}
                >
                  <option value="Laag">Laag</option>
                  <option value="Middel">Middel</option>
                  <option value="Hoog">Hoog</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: 'var(--color-text)', marginBottom: '6px' }}>
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleChange('status', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    fontSize: '14px',
                    backgroundColor: 'var(--color-card-bg)',
                    color: 'var(--color-text)',
                  }}
                >
                  <option value="Actief">Actief</option>
                  <option value="Concept">Concept</option>
                  <option value="Gesloten">Gesloten</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: 'var(--color-text)', marginBottom: '6px' }}>
                Beschrijving
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={4}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  fontSize: '14px',
                  backgroundColor: 'var(--color-card-bg)',
                  color: 'var(--color-text)',
                  resize: 'vertical',
                }}
              />
            </div>

            {/* Requirements */}
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: 'var(--color-text)', marginBottom: '6px' }}>
                Functie-eisen (één per regel)
              </label>
              <textarea
                value={formData.requirements}
                onChange={(e) => handleChange('requirements', e.target.value)}
                rows={4}
                placeholder="5+ jaar ervaring&#10;HBO/WO niveau&#10;Goede communicatieve vaardigheden"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  fontSize: '14px',
                  backgroundColor: 'var(--color-card-bg)',
                  color: 'var(--color-text)',
                  resize: 'vertical',
                }}
              />
            </div>
          </div>
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
            onClick={onClose}
            style={{
              padding: '10px 20px',
              backgroundColor: 'var(--color-card-bg)',
              color: 'var(--color-text)',
              border: '1px solid var(--color-border)',
              borderRadius: '8px',
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            Annuleren
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !formData.title}
            style={{
              padding: '10px 20px',
              backgroundColor: 'var(--color-primary)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: saving ? 'not-allowed' : 'pointer',
              opacity: saving ? 0.7 : 1,
            }}
          >
            {saving ? 'Opslaan...' : 'Opslaan'}
          </button>
        </div>
      </div>
    </>
  );
};

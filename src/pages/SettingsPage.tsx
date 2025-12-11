import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  SettingsLayout, 
  SettingsPageHeader, 
  SettingsPlaceholder,
  type SettingsSection 
} from '../layouts/SettingsLayout';
import { EvaluationTemplateBuilder } from '../components/EvaluationTemplateBuilder';
import { getTemplates } from '../api/evaluations';
import type { EvaluationTemplate } from '../types/evaluationBuilder';

interface SettingsPageProps {
  onBackToDashboard?: () => void;
  initialSection?: SettingsSection;
  isNewTemplate?: boolean;
}

// Evaluation Forms Section Component
const EvaluationFormsSection: React.FC = () => {
  const [templates, setTemplates] = useState<EvaluationTemplate[]>([]);
  const [loading, setLoading] = useState(true);

  // Load templates from Supabase
  useEffect(() => {
    async function loadTemplates() {
      const { data, error } = await getTemplates();
      if (error) {
        console.error('Error loading evaluation templates:', error);
      } else if (data) {
        const loadedTemplates: EvaluationTemplate[] = data.map((t: any) => ({
          id: t.id,
          name: t.name,
          description: t.description || '',
          category: t.category || 'Algemeen',
          questions: [],
          includeFinalScore: true,
          createdAt: t.created_at,
          updatedAt: t.updated_at || t.created_at
        }));
        setTemplates(loadedTemplates);
      }
      setLoading(false);
    }
    loadTemplates();
  }, []);
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<EvaluationTemplate | undefined>(undefined);

  const handleSaveTemplate = (template: EvaluationTemplate) => {
    if (editingTemplate) {
      setTemplates(prev => prev.map(t => t.id === template.id ? template : t));
    } else {
      setTemplates(prev => [...prev, template]);
    }
    setIsBuilderOpen(false);
    setEditingTemplate(undefined);
  };

  const handleEditTemplate = (template: EvaluationTemplate) => {
    setEditingTemplate(template);
    setIsBuilderOpen(true);
  };

  const handleDeleteTemplate = (templateId: string) => {
    if (confirm('Weet je zeker dat je deze template wilt verwijderen?')) {
      setTemplates(prev => prev.filter(t => t.id !== templateId));
    }
  };

  const handleNewTemplate = () => {
    setEditingTemplate(undefined);
    setIsBuilderOpen(true);
  };

  if (isBuilderOpen) {
    return (
      <EvaluationTemplateBuilder
        initialTemplate={editingTemplate}
        onSave={handleSaveTemplate}
        onCancel={() => {
          setIsBuilderOpen(false);
          setEditingTemplate(undefined);
        }}
      />
    );
  }

  return (
    <div>
      <SettingsPageHeader
        title="Evaluatieformulieren"
        subtitle="Maak en beheer evaluatieformulieren voor kandidaatbeoordelingen"
        action={
          <button
            onClick={handleNewTemplate}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 16px',
              backgroundColor: 'var(--color-primary)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            <span>+</span>
            Nieuw formulier
          </button>
        }
      />

      {templates.length === 0 ? (
        <div style={{
          backgroundColor: 'var(--color-card-bg)',
          borderRadius: '12px',
          border: '2px dashed var(--color-border)',
          padding: '48px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📋</div>
          <h4 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--color-text)', marginBottom: '8px' }}>
            Geen evaluatieformulieren
          </h4>
          <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Maak je eerste evaluatieformulier om kandidaten te beoordelen
          </p>
          <button
            onClick={handleNewTemplate}
            style={{
              padding: '10px 20px',
              backgroundColor: 'var(--color-primary)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            Eerste formulier maken
          </button>
        </div>
      ) : (
        <div style={{ 
          backgroundColor: 'var(--color-card-bg)',
          borderRadius: '12px',
          border: '1px solid var(--color-border)',
          overflow: 'hidden'
        }}>
          {templates.map((template, index) => (
            <div
              key={template.id}
              style={{
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                borderBottom: index < templates.length - 1 ? '1px solid var(--color-border)' : 'none'
              }}
            >
              {/* Icon */}
              <div style={{
                width: '48px',
                height: '48px',
                backgroundColor: 'var(--color-primary-bg)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                flexShrink: 0
              }}>
                📋
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <h4 style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  color: 'var(--color-text)',
                  marginBottom: '4px'
                }}>
                  {template.name}
                </h4>
                <p style={{
                  fontSize: '13px',
                  color: 'var(--color-text-muted)'
                }}>
                  {template.category} • {template.questions.length} vragen
                  {template.includeFinalScore && ' • Eindbeoordeling'}
                </p>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => handleEditTemplate(template)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: 'var(--color-bg-secondary)',
                    color: 'var(--color-text)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: '500'
                  }}
                >
                  Bewerken
                </button>
                <button
                  onClick={() => handleDeleteTemplate(template.id)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: 'var(--color-card-bg)',
                    color: 'var(--color-danger)',
                    border: '1px solid var(--color-danger)',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: '500'
                  }}
                >
                  Verwijderen
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Profile Section
const ProfileSection: React.FC = () => (
  <div>
    <SettingsPageHeader
      title="Profiel"
      subtitle="Beheer je persoonlijke gegevens en voorkeuren"
    />
    <div style={{
      backgroundColor: 'var(--color-card-bg)',
      borderRadius: '12px',
      border: '1px solid var(--color-border)',
      padding: '24px'
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: 'var(--color-text)', marginBottom: '6px' }}>
            Voornaam
          </label>
          <input
            type="text"
            defaultValue="Maris"
            style={{
              width: '100%',
              padding: '10px 12px',
              border: '1px solid var(--color-border)',
              borderRadius: '6px',
              fontSize: '14px'
            }}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: 'var(--color-text)', marginBottom: '6px' }}>
            Achternaam
          </label>
          <input
            type="text"
            defaultValue="Schoenmakers"
            style={{
              width: '100%',
              padding: '10px 12px',
              border: '1px solid var(--color-border)',
              borderRadius: '6px',
              fontSize: '14px'
            }}
          />
        </div>
        <div style={{ gridColumn: 'span 2' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: 'var(--color-text)', marginBottom: '6px' }}>
            E-mailadres
          </label>
          <input
            type="email"
            defaultValue="maris@example.com"
            style={{
              width: '100%',
              padding: '10px 12px',
              border: '1px solid var(--color-border)',
              borderRadius: '6px',
              fontSize: '14px'
            }}
          />
        </div>
      </div>
      <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
        <button
          style={{
            padding: '10px 20px',
            backgroundColor: 'var(--color-primary)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          Opslaan
        </button>
      </div>
    </div>
  </div>
);

// Main Settings Page Component
export const SettingsPage: React.FC<SettingsPageProps> = ({ onBackToDashboard, initialSection }) => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<SettingsSection>(initialSection || 'profile');
  
  const handleBackToDashboard = () => {
    if (onBackToDashboard) {
      onBackToDashboard();
    } else {
      navigate('/');
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return <ProfileSection />;
      
      case 'notifications':
        return (
          <>
            <SettingsPageHeader title="Meldingen" subtitle="Beheer je notificatie voorkeuren" />
            <SettingsPlaceholder 
              title="Meldingen" 
              description="Configureer welke meldingen je wilt ontvangen via e-mail of in de app."
              icon="🔔"
            />
          </>
        );
      
      case 'company-general':
        return (
          <>
            <SettingsPageHeader title="Bedrijfsinstellingen" subtitle="Algemene instellingen voor je organisatie" />
            <SettingsPlaceholder 
              title="Bedrijfsinstellingen" 
              description="Configureer algemene bedrijfsinstellingen zoals naam, logo en contactgegevens."
              icon="🏢"
            />
          </>
        );
      
      case 'team':
        return (
          <>
            <SettingsPageHeader title="Teamgenoten" subtitle="Beheer teamleden en hun toegang" />
            <SettingsPlaceholder 
              title="Teamgenoten" 
              description="Nodig teamleden uit en beheer hun toegangsrechten."
              icon="👥"
            />
          </>
        );
      
      case 'roles':
        return (
          <>
            <SettingsPageHeader title="Gebruikersrollen" subtitle="Definieer rollen en permissies" />
            <SettingsPlaceholder 
              title="Gebruikersrollen" 
              description="Maak aangepaste rollen en configureer permissies voor je team."
              icon="🔐"
            />
          </>
        );
      
      case 'locations':
        return (
          <>
            <SettingsPageHeader title="Locaties" subtitle="Beheer kantoorlocaties" />
            <SettingsPlaceholder 
              title="Locaties" 
              description="Voeg kantoorlocaties toe en koppel deze aan vacatures."
              icon="📍"
            />
          </>
        );
      
      case 'rejection-reasons':
        return (
          <>
            <SettingsPageHeader title="Afwijzingsredenen" subtitle="Standaard redenen voor afwijzing" />
            <SettingsPlaceholder 
              title="Afwijzingsredenen" 
              description="Definieer standaard afwijzingsredenen voor een consistente workflow."
              icon="❌"
            />
          </>
        );
      
      case 'tags-sources':
        return (
          <>
            <SettingsPageHeader title="Tags & Bronnen" subtitle="Beheer tags en kandidaatbronnen" />
            <SettingsPlaceholder 
              title="Tags & Bronnen" 
              description="Maak tags voor kandidaten en definieer bronnen zoals LinkedIn, Indeed, etc."
              icon="🏷️"
            />
          </>
        );
      
      case 'departments':
        return (
          <>
            <SettingsPageHeader title="Afdelingen" subtitle="Beheer afdelingen binnen je organisatie" />
            <SettingsPlaceholder 
              title="Afdelingen" 
              description="Voeg afdelingen toe om vacatures en kandidaten te organiseren."
              icon="🗂️"
            />
          </>
        );
      
      case 'vacancy-templates':
        return (
          <>
            <SettingsPageHeader title="Vacature Templates" subtitle="Standaard templates voor vacatures" />
            <SettingsPlaceholder 
              title="Vacature Templates" 
              description="Maak herbruikbare templates voor vacatureteksten."
              icon="📄"
            />
          </>
        );
      
      case 'funnels':
        return (
          <>
            <SettingsPageHeader title="Funnels" subtitle="Configureer recruitment funnels" />
            <SettingsPlaceholder 
              title="Funnels" 
              description="Definieer de stappen in je recruitment proces per type vacature."
              icon="🔄"
            />
          </>
        );
      
      case 'evaluation-forms':
        return <EvaluationFormsSection />;
      
      case 'question-lists':
        return (
          <>
            <SettingsPageHeader title="Vragenlijsten" subtitle="Standaard vragenlijsten voor interviews" />
            <SettingsPlaceholder 
              title="Vragenlijsten" 
              description="Maak vragenlijsten die je kunt gebruiken tijdens interviews."
              icon="❓"
            />
          </>
        );
      
      case 'api-tokens':
        return (
          <>
            <SettingsPageHeader title="API Tokens" subtitle="Beheer API toegang" />
            <SettingsPlaceholder 
              title="API Tokens" 
              description="Genereer en beheer API tokens voor integraties met externe systemen."
              icon="🔑"
            />
          </>
        );
      
      default:
        return null;
    }
  };

  return (
    <SettingsLayout
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      onBackToDashboard={handleBackToDashboard}
    >
      {renderContent()}
    </SettingsLayout>
  );
};

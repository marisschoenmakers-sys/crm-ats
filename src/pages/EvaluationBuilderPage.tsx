import React, { useState } from 'react';
import { EvaluationTemplateBuilder } from '../components/EvaluationTemplateBuilder';
import type { EvaluationTemplate } from '../types/evaluationBuilder';

// Mock saved templates
const mockTemplates: EvaluationTemplate[] = [
  {
    id: '1',
    name: 'Sales Interview Evaluatie',
    description: 'Standaard evaluatieformulier voor sales kandidaten',
    categories: [
      {
        id: 'cat1',
        name: 'Communicatie',
        questions: [
          { id: 'q1', type: 'scorecard', label: 'Presentatievaardigheden', maxScore: 5 },
          { id: 'q2', type: 'text', label: 'Opmerkingen over communicatie' }
        ]
      }
    ],
    includeFinalScore: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  }
];

export const EvaluationBuilderPage: React.FC = () => {
  const [templates, setTemplates] = useState<EvaluationTemplate[]>(mockTemplates);
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<EvaluationTemplate | undefined>(undefined);

  const handleSaveTemplate = (template: EvaluationTemplate) => {
    if (editingTemplate) {
      // Update existing
      setTemplates(prev => prev.map(t => t.id === template.id ? template : t));
    } else {
      // Add new
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
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <div>
          <h1 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: 'var(--color-text)',
            marginBottom: '4px'
          }}>
            Evaluatieformulieren
          </h1>
          <p style={{
            fontSize: '14px',
            color: 'var(--color-text-muted)'
          }}>
            Maak en beheer evaluatieformulieren voor kandidaten
          </p>
        </div>
        <button
          onClick={handleNewTemplate}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 20px',
            backgroundColor: 'var(--color-primary)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          <span style={{ fontSize: '18px' }}>+</span>
          Nieuw formulier
        </button>
      </div>

      {/* Templates Grid */}
      {templates.length === 0 ? (
        <div style={{
          backgroundColor: 'var(--color-card-bg)',
          borderRadius: '12px',
          border: '2px dashed var(--color-border)',
          padding: '64px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>📋</div>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: 'var(--color-text)',
            marginBottom: '8px'
          }}>
            Geen evaluatieformulieren
          </h3>
          <p style={{
            fontSize: '14px',
            color: 'var(--color-text-muted)',
            marginBottom: '24px'
          }}>
            Maak je eerste evaluatieformulier om kandidaten te beoordelen
          </p>
          <button
            onClick={handleNewTemplate}
            style={{
              padding: '12px 24px',
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
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '20px'
        }}>
          {templates.map(template => (
            <div
              key={template.id}
              style={{
                backgroundColor: 'var(--color-card-bg)',
                borderRadius: '12px',
                border: '1px solid var(--color-border)',
                overflow: 'hidden',
                transition: 'box-shadow 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Card Header */}
              <div style={{
                padding: '20px',
                borderBottom: '1px solid var(--color-border)'
              }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: 'var(--color-text)',
                  marginBottom: '4px'
                }}>
                  {template.name}
                </h3>
                {template.description && (
                  <p style={{
                    fontSize: '13px',
                    color: 'var(--color-text-muted)',
                    lineHeight: '1.4'
                  }}>
                    {template.description}
                  </p>
                )}
              </div>

              {/* Card Stats */}
              <div style={{
                padding: '16px 20px',
                backgroundColor: 'var(--color-bg-secondary)',
                display: 'flex',
                gap: '24px'
              }}>
                <div>
                  <div style={{ fontSize: '20px', fontWeight: '700', color: 'var(--color-text)' }}>
                    {template.categories.length}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                    Categorieën
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '20px', fontWeight: '700', color: 'var(--color-text)' }}>
                    {template.categories.reduce((sum, cat) => sum + cat.questions.length, 0)}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                    Vragen
                  </div>
                </div>
                {template.includeFinalScore && (
                  <div style={{
                    marginLeft: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '12px',
                    color: 'var(--color-success)'
                  }}>
                    <span>✓</span>
                    <span>Eindbeoordeling</span>
                  </div>
                )}
              </div>

              {/* Card Actions */}
              <div style={{
                padding: '12px 20px',
                display: 'flex',
                gap: '8px',
                borderTop: '1px solid var(--color-border)'
              }}>
                <button
                  onClick={() => handleEditTemplate(template)}
                  style={{
                    flex: 1,
                    padding: '8px 16px',
                    backgroundColor: 'var(--color-primary)',
                    color: 'white',
                    border: 'none',
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

          {/* Add New Card */}
          <button
            onClick={handleNewTemplate}
            style={{
              backgroundColor: 'var(--color-bg-secondary)',
              borderRadius: '12px',
              border: '2px dashed var(--color-border)',
              padding: '40px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              minHeight: '200px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)';
              e.currentTarget.style.borderColor = 'var(--color-text-muted)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)';
              e.currentTarget.style.borderColor = 'var(--color-border)';
            }}
          >
            <span style={{ fontSize: '32px', color: 'var(--color-text-muted)' }}>+</span>
            <span style={{ fontSize: '14px', color: 'var(--color-text-muted)', fontWeight: '500' }}>
              Nieuw formulier
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

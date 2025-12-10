import React, { useState } from 'react';
import type { 
  EvaluationTemplate, 
  EvaluationQuestion,
  FinalEvaluationScore 
} from '../types/evaluationBuilder';
import { 
  questionTypeLabels,
  finalScoreLabels 
} from '../types/evaluationBuilder';

// Types for filled evaluation
export interface FilledAnswer {
  questionId: string;
  questionLabel: string;
  questionType: string;
  value: string | string[] | number | boolean | null;
  comment?: string;
}

export interface FilledEvaluation {
  id: string;
  templateId: string;
  templateName: string;
  category: string;
  candidateId: string;
  answers: FilledAnswer[];
  finalScore: FinalEvaluationScore | null;
  filledBy: string;
  filledAt: string;
}

interface EvaluationFormFillerProps {
  templates: EvaluationTemplate[];
  candidateId: string;
  candidateName: string;
  onSave: (evaluation: FilledEvaluation) => void;
  onCancel: () => void;
}

// SVG Smiley Component
const SmileyIcon: React.FC<{ type: 'very_sad' | 'sad' | 'happy' | 'very_happy'; size?: number; color?: string }> = ({ 
  type, 
  size = 40, 
  color = 'currentColor' 
}) => {
  const getPath = () => {
    switch (type) {
      case 'very_sad':
        return (
          <>
            <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill="none" />
            <circle cx="8" cy="9" r="1.5" fill={color} />
            <circle cx="16" cy="9" r="1.5" fill={color} />
            <path d="M8 17c1.5-2 5.5-2 8 0" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
          </>
        );
      case 'sad':
        return (
          <>
            <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill="none" />
            <circle cx="8" cy="9" r="1.5" fill={color} />
            <circle cx="16" cy="9" r="1.5" fill={color} />
            <path d="M8 16c1.5-1.5 5.5-1.5 8 0" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
          </>
        );
      case 'happy':
        return (
          <>
            <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill="none" />
            <circle cx="8" cy="9" r="1.5" fill={color} />
            <circle cx="16" cy="9" r="1.5" fill={color} />
            <path d="M8 14c1.5 1.5 5.5 1.5 8 0" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
          </>
        );
      case 'very_happy':
        return (
          <>
            <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill="none" />
            <circle cx="8" cy="9" r="1.5" fill={color} />
            <circle cx="16" cy="9" r="1.5" fill={color} />
            <path d="M7 13c1.5 3 7.5 3 10 0" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
          </>
        );
    }
  };

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: 'block' }}>
      {getPath()}
    </svg>
  );
};

const smileyTypes: Record<FinalEvaluationScore, 'very_sad' | 'sad' | 'happy' | 'very_happy'> = {
  niet_goed: 'very_sad',
  misschien: 'sad',
  goed: 'happy',
  zeer_goed: 'very_happy'
};

// Question Input Component
const QuestionInput: React.FC<{
  question: EvaluationQuestion;
  value: string | string[] | number | boolean | null;
  onChange: (value: string | string[] | number | boolean | null) => void;
}> = ({ question, value, onChange }) => {
  
  const renderInput = () => {
    switch (question.type) {
      case 'text':
        return (
          <textarea
            value={(value as string) || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Typ je antwoord hier..."
            rows={3}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid var(--color-input-border)',
              borderRadius: '8px',
              fontSize: '14px',
              resize: 'vertical',
              backgroundColor: 'var(--color-card-bg)',
              color: 'var(--color-text)'
            }}
          />
        );

      case 'scorecard':
        const maxScore = question.maxScore || 5;
        const currentScore = (value as number) || 0;
        return (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {Array.from({ length: maxScore }, (_, i) => i + 1).map(score => (
              <button
                key={score}
                type="button"
                onClick={() => onChange(score)}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '8px',
                  border: `2px solid ${currentScore === score ? 'var(--color-primary)' : 'var(--color-border)'}`,
                  backgroundColor: currentScore === score ? 'var(--color-primary-bg)' : 'var(--color-card-bg)',
                  color: currentScore === score ? 'var(--color-primary)' : 'var(--color-text)',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {score}
              </button>
            ))}
          </div>
        );

      case 'yes_no':
        const yesNoValue = value as boolean | null;
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="button"
                onClick={() => onChange(true)}
                style={{
                  padding: '12px 32px',
                  borderRadius: '8px',
                  border: `2px solid ${yesNoValue === true ? 'var(--color-success)' : 'var(--color-border)'}`,
                  backgroundColor: yesNoValue === true ? 'var(--color-success-bg)' : 'var(--color-card-bg)',
                  color: yesNoValue === true ? 'var(--color-success)' : 'var(--color-text)',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Ja
              </button>
              <button
                type="button"
                onClick={() => onChange(false)}
                style={{
                  padding: '12px 32px',
                  borderRadius: '8px',
                  border: `2px solid ${yesNoValue === false ? 'var(--color-danger)' : 'var(--color-border)'}`,
                  backgroundColor: yesNoValue === false ? 'var(--color-danger-bg)' : 'var(--color-card-bg)',
                  color: yesNoValue === false ? 'var(--color-danger)' : 'var(--color-text)',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Nee
              </button>
            </div>
          </div>
        );

      case 'single_choice':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {question.options?.map(option => (
              <label
                key={option.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px',
                  backgroundColor: value === option.id ? 'var(--color-primary-bg)' : 'var(--color-bg-secondary)',
                  border: `1px solid ${value === option.id ? 'var(--color-primary)' : 'var(--color-border)'}`,
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                <input
                  type="radio"
                  name={question.id}
                  checked={value === option.id}
                  onChange={() => onChange(option.id)}
                  style={{ width: '18px', height: '18px' }}
                />
                <span style={{ fontSize: '14px', color: 'var(--color-text)' }}>{option.label}</span>
              </label>
            ))}
          </div>
        );

      case 'multiple_choice':
      case 'multiple_choice_title':
        const selectedValues = (value as string[]) || [];
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {question.options?.map(option => {
              const isChecked = selectedValues.includes(option.id);
              return (
                <label
                  key={option.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px',
                    backgroundColor: isChecked ? 'var(--color-primary-bg)' : 'var(--color-bg-secondary)',
                    border: `1px solid ${isChecked ? 'var(--color-primary)' : 'var(--color-border)'}`,
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {
                      if (isChecked) {
                        onChange(selectedValues.filter(v => v !== option.id));
                      } else {
                        onChange([...selectedValues, option.id]);
                      }
                    }}
                    style={{ width: '18px', height: '18px' }}
                  />
                  <span style={{ fontSize: '14px', color: 'var(--color-text)' }}>{option.label}</span>
                </label>
              );
            })}
          </div>
        );

      case 'dropdown':
        return (
          <select
            value={(value as string) || ''}
            onChange={(e) => onChange(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid var(--color-input-border)',
              borderRadius: '8px',
              fontSize: '14px',
              backgroundColor: 'var(--color-card-bg)',
              color: 'var(--color-text)'
            }}
          >
            <option value="">Selecteer een optie...</option>
            {question.options?.map(option => (
              <option key={option.id} value={option.id}>{option.label}</option>
            ))}
          </select>
        );

      case 'file_upload':
        return (
          <div style={{
            padding: '24px',
            border: '2px dashed var(--color-border)',
            borderRadius: '8px',
            textAlign: 'center',
            backgroundColor: 'var(--color-bg-secondary)'
          }}>
            <div style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>
              Bestand uploaden (nog niet geïmplementeerd)
            </div>
          </div>
        );

      case 'info_box':
        return (
          <div style={{
            padding: '16px',
            backgroundColor: 'var(--color-primary-bg)',
            border: '1px solid var(--color-primary)',
            borderRadius: '8px',
            fontSize: '14px',
            color: 'var(--color-primary)'
          }}>
            ℹ️ {question.label}
          </div>
        );

      default:
        return (
          <textarea
            value={(value as string) || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Typ je antwoord hier..."
            rows={3}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid var(--color-input-border)',
              borderRadius: '8px',
              fontSize: '14px',
              resize: 'vertical',
              backgroundColor: 'var(--color-card-bg)',
              color: 'var(--color-text)'
            }}
          />
        );
    }
  };

  return (
    <div style={{
      backgroundColor: 'var(--color-card-bg)',
      borderRadius: '12px',
      border: '1px solid var(--color-border)',
      padding: '20px',
      marginBottom: '16px'
    }}>
      {/* Question Label */}
      <div style={{ marginBottom: '12px' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px',
          marginBottom: '4px'
        }}>
          <span style={{ 
            fontSize: '16px', 
            fontWeight: '600', 
            color: 'var(--color-text)' 
          }}>
            {question.label}
          </span>
          {question.required && (
            <span style={{ color: 'var(--color-danger)', fontSize: '14px' }}>*</span>
          )}
        </div>
        {question.description && (
          <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', margin: 0 }}>
            {question.description}
          </p>
        )}
        <span style={{ 
          fontSize: '11px', 
          color: 'var(--color-text-muted)',
          backgroundColor: 'var(--color-bg-secondary)',
          padding: '2px 6px',
          borderRadius: '4px',
          marginTop: '8px',
          display: 'inline-block'
        }}>
          {questionTypeLabels[question.type]}
        </span>
      </div>

      {/* Input */}
      {renderInput()}
    </div>
  );
};

// ID generator
let idCounter = 0;
const generateId = () => {
  idCounter += 1;
  return `eval-${idCounter}-${Math.random().toString(36).substr(2, 9)}`;
};

// Main Component
export const EvaluationFormFiller: React.FC<EvaluationFormFillerProps> = ({
  templates,
  candidateId,
  candidateName,
  onSave,
  onCancel
}) => {
  const [step, setStep] = useState<'select' | 'fill'>('select');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<EvaluationTemplate | null>(null);
  const [answers, setAnswers] = useState<Record<string, string | string[] | number | boolean | null>>({});
  const [finalScore, setFinalScore] = useState<FinalEvaluationScore | null>(null);

  // Filter templates based on search
  const filteredTemplates = templates.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectTemplate = (template: EvaluationTemplate) => {
    setSelectedTemplate(template);
    setAnswers({});
    setFinalScore(null);
    setStep('fill');
  };

  const handleAnswerChange = (questionId: string, value: string | string[] | number | boolean | null) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleSave = () => {
    if (!selectedTemplate) return;

    const filledAnswers: FilledAnswer[] = selectedTemplate.questions.map(q => ({
      questionId: q.id,
      questionLabel: q.label,
      questionType: q.type,
      value: answers[q.id] ?? null
    }));

    const evaluation: FilledEvaluation = {
      id: generateId(),
      templateId: selectedTemplate.id,
      templateName: selectedTemplate.name,
      category: selectedTemplate.category,
      candidateId,
      answers: filledAnswers,
      finalScore,
      filledBy: 'Maris', // TODO: Get from auth
      filledAt: new Date().toISOString()
    };

    onSave(evaluation);
  };

  // Step 1: Select Template
  if (step === 'select') {
    return (
      <div style={{ width: '100%' }}>
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'var(--color-text)', marginBottom: '4px' }}>
            Evaluatie toevoegen voor {candidateName}
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>
            Kies een evaluatieformulier om in te vullen
          </p>
        </div>

        {/* Search */}
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Zoek op naam of categorie..."
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '1px solid var(--color-input-border)',
              borderRadius: '8px',
              fontSize: '14px',
              backgroundColor: 'var(--color-card-bg)',
              color: 'var(--color-text)'
            }}
          />
        </div>

        {/* Template List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filteredTemplates.length === 0 ? (
            <div style={{
              padding: '40px',
              textAlign: 'center',
              color: 'var(--color-text-muted)',
              backgroundColor: 'var(--color-bg-secondary)',
              borderRadius: '12px'
            }}>
              {searchTerm ? 'Geen formulieren gevonden' : 'Geen evaluatieformulieren beschikbaar'}
            </div>
          ) : (
            filteredTemplates.map(template => (
              <button
                key={template.id}
                onClick={() => handleSelectTemplate(template)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '16px 20px',
                  backgroundColor: 'var(--color-card-bg)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-primary)';
                  e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-border)';
                  e.currentTarget.style.backgroundColor = 'var(--color-card-bg)';
                }}
              >
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
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--color-text)' }}>
                    {template.name}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
                    {template.category} • {template.questions.length} vragen
                  </div>
                </div>
                <div style={{ color: 'var(--color-text-muted)', fontSize: '20px' }}>→</div>
              </button>
            ))
          )}
        </div>

        {/* Cancel Button */}
        <div style={{ marginTop: '24px' }}>
          <button
            onClick={onCancel}
            style={{
              padding: '10px 20px',
              backgroundColor: 'var(--color-card-bg)',
              color: 'var(--color-text)',
              border: '1px solid var(--color-input-border)',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Annuleren
          </button>
        </div>
      </div>
    );
  }

  // Step 2: Fill Form
  return (
    <div style={{ width: '100%' }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start',
        marginBottom: '24px' 
      }}>
        <div>
          <button
            onClick={() => setStep('select')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '0',
              backgroundColor: 'transparent',
              border: 'none',
              color: 'var(--color-text-muted)',
              fontSize: '14px',
              cursor: 'pointer',
              marginBottom: '8px'
            }}
          >
            ← Ander formulier kiezen
          </button>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'var(--color-text)', marginBottom: '4px' }}>
            {selectedTemplate?.name}
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>
            Evaluatie voor {candidateName} • {selectedTemplate?.category}
          </p>
        </div>
      </div>

      {/* Questions */}
      <div style={{ marginBottom: '24px' }}>
        {selectedTemplate?.questions.map(question => (
          <QuestionInput
            key={question.id}
            question={question}
            value={answers[question.id] ?? null}
            onChange={(value) => handleAnswerChange(question.id, value)}
          />
        ))}
      </div>

      {/* Final Score */}
      {selectedTemplate?.includeFinalScore && (
        <div style={{
          backgroundColor: 'var(--color-card-bg)',
          borderRadius: '12px',
          border: '1px solid var(--color-border)',
          padding: '24px',
          marginBottom: '24px'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--color-text)', marginBottom: '8px' }}>
            Eindbeoordeling
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', marginBottom: '20px' }}>
            Geef een algemene beoordeling van de kandidaat
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
            {(['niet_goed', 'misschien', 'goed', 'zeer_goed'] as FinalEvaluationScore[]).map(score => {
              const config = finalScoreLabels[score];
              const isSelected = finalScore === score;
              
              return (
                <button
                  key={score}
                  type="button"
                  onClick={() => setFinalScore(isSelected ? null : score)}
                  style={{
                    padding: '20px 16px',
                    backgroundColor: isSelected ? config.bgColor : 'var(--color-card-bg)',
                    border: `2px solid ${isSelected ? config.color : 'var(--color-border)'}`,
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                >
                  <SmileyIcon 
                    type={smileyTypes[score]} 
                    size={48} 
                    color={isSelected ? config.color : 'var(--color-text-muted)'} 
                  />
                  <div style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: isSelected ? config.color : 'var(--color-text)'
                  }}>
                    {config.label}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '12px',
        paddingTop: '24px',
        borderTop: '1px solid var(--color-border)'
      }}>
        <button
          onClick={onCancel}
          style={{
            padding: '12px 24px',
            backgroundColor: 'var(--color-card-bg)',
            color: 'var(--color-text)',
            border: '1px solid var(--color-input-border)',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          Annuleren
        </button>
        <button
          onClick={handleSave}
          style={{
            padding: '12px 24px',
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-sidebar-text)',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          Evaluatie opslaan
        </button>
      </div>
    </div>
  );
};

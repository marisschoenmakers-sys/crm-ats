import React, { useState, useCallback } from 'react';
import type { 
  EvaluationTemplate, 
  EvaluationQuestion, 
  QuestionType,
  QuestionOption,
  FinalEvaluationScore
} from '../types/evaluationBuilder';
import { 
  questionTypeLabels, 
  questionTypeIcons,
  finalScoreLabels 
} from '../types/evaluationBuilder';

interface EvaluationTemplateBuilderProps {
  initialTemplate?: EvaluationTemplate;
  onSave: (template: EvaluationTemplate) => void;
  onCancel: () => void;
}

// ID generator
let idCounter = 0;
const generateId = () => {
  idCounter += 1;
  return `id-${idCounter}-${Math.random().toString(36).substr(2, 9)}`;
};

// Predefined categories
const predefinedCategories = [
  'Algemeen',
  'Sales',
  'Technisch',
  'HR',
  'Management',
  'Klantenservice',
  'Marketing',
  'Finance',
  'Anders'
];

// Add Question Menu Component
const AddQuestionMenu: React.FC<{
  onSelect: (type: QuestionType) => void;
  onClose: () => void;
}> = ({ onSelect, onClose }) => {
  const questionTypes: QuestionType[] = [
    'text',
    'multiple_choice_title',
    'scorecard',
    'yes_no',
    'single_choice',
    'multiple_choice',
    'dropdown',
    'file_upload',
    'info_box'
  ];

  return (
    <div style={{
      position: 'absolute',
      top: '100%',
      left: '0',
      backgroundColor: 'var(--color-card-bg)',
      borderRadius: '8px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
      border: '1px solid var(--color-border)',
      padding: '8px',
      zIndex: 100,
      minWidth: '220px',
      marginTop: '8px'
    }}>
      <div style={{ 
        fontSize: '12px', 
        fontWeight: '600', 
        color: 'var(--color-text-muted)', 
        padding: '8px 12px',
        borderBottom: '1px solid var(--color-border)',
        marginBottom: '4px'
      }}>
        Kies vraagtype
      </div>
      {questionTypes.map(type => (
        <button
          key={type}
          onClick={() => {
            onSelect(type);
            onClose();
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            width: '100%',
            padding: '10px 12px',
            backgroundColor: 'transparent',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            color: 'var(--color-text)',
            textAlign: 'left',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <span style={{ fontSize: '16px', width: '24px', textAlign: 'center' }}>
            {questionTypeIcons[type]}
          </span>
          <span>{questionTypeLabels[type]}</span>
        </button>
      ))}
    </div>
  );
};

// Add Button Component
const AddButton: React.FC<{
  onAddQuestion: (type: QuestionType) => void;
  label?: string;
}> = ({ onAddQuestion, label = 'Vraag toevoegen' }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setShowMenu(!showMenu)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 20px',
          backgroundColor: showMenu ? 'var(--color-primary)' : 'var(--color-card-bg)',
          color: showMenu ? 'var(--color-sidebar-text)' : 'var(--color-text)',
          border: '2px dashed var(--color-border)',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500',
          transition: 'all 0.2s',
          width: '100%'
        }}
        onMouseEnter={(e) => {
          if (!showMenu) {
            e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)';
            e.currentTarget.style.borderColor = 'var(--color-text-muted)';
          }
        }}
        onMouseLeave={(e) => {
          if (!showMenu) {
            e.currentTarget.style.backgroundColor = 'var(--color-card-bg)';
            e.currentTarget.style.borderColor = 'var(--color-border)';
          }
        }}
      >
        <span style={{ fontSize: '18px', fontWeight: 'bold' }}>+</span>
        <span>{label}</span>
      </button>
      
      {showMenu && (
        <>
          <div 
            style={{ position: 'fixed', inset: 0, zIndex: 99 }} 
            onClick={() => setShowMenu(false)} 
          />
          <AddQuestionMenu 
            onSelect={onAddQuestion} 
            onClose={() => setShowMenu(false)} 
          />
        </>
      )}
    </div>
  );
};

// Question Editor Component
const QuestionEditor: React.FC<{
  question: EvaluationQuestion;
  onUpdate: (question: EvaluationQuestion) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
}> = ({ question, onUpdate, onDelete, onMoveUp, onMoveDown, isFirst, isLast }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const addOption = () => {
    const newOption: QuestionOption = {
      id: generateId(),
      label: `Optie ${(question.options?.length || 0) + 1}`
    };
    onUpdate({
      ...question,
      options: [...(question.options || []), newOption]
    });
  };

  const updateOption = (optionId: string, label: string) => {
    onUpdate({
      ...question,
      options: question.options?.map(opt => 
        opt.id === optionId ? { ...opt, label } : opt
      )
    });
  };

  const deleteOption = (optionId: string) => {
    onUpdate({
      ...question,
      options: question.options?.filter(opt => opt.id !== optionId)
    });
  };

  const needsOptions = ['multiple_choice_title', 'single_choice', 'multiple_choice', 'dropdown'].includes(question.type);

  return (
    <div style={{
      backgroundColor: 'var(--color-card-bg)',
      borderRadius: '8px',
      border: '1px solid var(--color-border)',
      overflow: 'hidden'
    }}>
      {/* Question Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 16px',
        backgroundColor: 'var(--color-bg-secondary)',
        borderBottom: isExpanded ? '1px solid var(--color-border)' : 'none'
      }}>
        <span style={{ fontSize: '18px' }}>{questionTypeIcons[question.type]}</span>
        <span style={{ 
          fontSize: '12px', 
          color: 'var(--color-text-muted)',
          backgroundColor: 'var(--color-border)',
          padding: '2px 8px',
          borderRadius: '4px'
        }}>
          {questionTypeLabels[question.type]}
        </span>
        <div style={{ flex: 1 }} />
        
        {/* Move buttons */}
        <button
          onClick={onMoveUp}
          disabled={isFirst}
          style={{
            padding: '4px 8px',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: isFirst ? 'not-allowed' : 'pointer',
            opacity: isFirst ? 0.3 : 1,
            fontSize: '14px'
          }}
          title="Omhoog"
        >
          ↑
        </button>
        <button
          onClick={onMoveDown}
          disabled={isLast}
          style={{
            padding: '4px 8px',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: isLast ? 'not-allowed' : 'pointer',
            opacity: isLast ? 0.3 : 1,
            fontSize: '14px'
          }}
          title="Omlaag"
        >
          ↓
        </button>
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            padding: '4px 8px',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          {isExpanded ? '▼' : '▶'}
        </button>
        
        <button
          onClick={onDelete}
          style={{
            padding: '4px 8px',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--color-danger)',
            fontSize: '14px'
          }}
          title="Verwijderen"
        >
          ✕
        </button>
      </div>

      {/* Question Content */}
      {isExpanded && (
        <div style={{ padding: '16px' }}>
          {/* Label */}
          <div style={{ marginBottom: '12px' }}>
            <label style={{ 
              display: 'block', 
              fontSize: '13px', 
              fontWeight: '500', 
              color: 'var(--color-text)',
              marginBottom: '4px'
            }}>
              {question.type === 'info_box' ? 'Informatietekst' : 'Vraag / Label'}
            </label>
            <input
              type="text"
              value={question.label}
              onChange={(e) => onUpdate({ ...question, label: e.target.value })}
              placeholder={question.type === 'info_box' ? 'Voer informatietekst in...' : 'Voer vraag in...'}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid var(--color-border)',
                borderRadius: '6px',
                fontSize: '14px',
                backgroundColor: 'var(--color-card-bg)',
                color: 'var(--color-text)'
              }}
            />
          </div>

          {/* Description (not for info_box) */}
          {question.type !== 'info_box' && (
            <div style={{ marginBottom: '12px' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '13px', 
                fontWeight: '500', 
                color: 'var(--color-text)',
                marginBottom: '4px'
              }}>
                Beschrijving (optioneel)
              </label>
              <input
                type="text"
                value={question.description || ''}
                onChange={(e) => onUpdate({ ...question, description: e.target.value })}
                placeholder="Extra uitleg bij de vraag..."
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid var(--color-border)',
                  borderRadius: '6px',
                  fontSize: '14px',
                  backgroundColor: 'var(--color-card-bg)',
                  color: 'var(--color-text)'
                }}
              />
            </div>
          )}

          {/* Options for choice questions */}
          {needsOptions && (
            <div style={{ marginBottom: '12px' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '13px', 
                fontWeight: '500', 
                color: 'var(--color-text)',
                marginBottom: '8px'
              }}>
                Opties
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {question.options?.map((option, index) => (
                  <div key={option.id} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span style={{ 
                      color: 'var(--color-text-muted)', 
                      fontSize: '14px',
                      width: '24px'
                    }}>
                      {question.type === 'single_choice' ? '○' : 
                       question.type === 'dropdown' ? `${index + 1}.` : '☐'}
                    </span>
                    <input
                      type="text"
                      value={option.label}
                      onChange={(e) => updateOption(option.id, e.target.value)}
                      style={{
                        flex: 1,
                        padding: '8px 12px',
                        border: '1px solid var(--color-border)',
                        borderRadius: '6px',
                        fontSize: '14px',
                        backgroundColor: 'var(--color-card-bg)',
                        color: 'var(--color-text)'
                      }}
                    />
                    <button
                      onClick={() => deleteOption(option.id)}
                      style={{
                        padding: '6px 10px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'var(--color-danger)',
                        fontSize: '14px'
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  onClick={addOption}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 12px',
                    backgroundColor: 'var(--color-bg-secondary)',
                    border: '1px dashed var(--color-border)',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    color: 'var(--color-text-muted)'
                  }}
                >
                  <span>+</span> Optie toevoegen
                </button>
              </div>
            </div>
          )}

          {/* Scorecard max score */}
          {question.type === 'scorecard' && (
            <div style={{ marginBottom: '12px' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '13px', 
                fontWeight: '500', 
                color: 'var(--color-text)',
                marginBottom: '4px'
              }}>
                Maximum score
              </label>
              <select
                value={question.maxScore || 5}
                onChange={(e) => onUpdate({ ...question, maxScore: parseInt(e.target.value) })}
                style={{
                  padding: '10px 12px',
                  border: '1px solid var(--color-border)',
                  borderRadius: '6px',
                  fontSize: '14px',
                  backgroundColor: 'var(--color-card-bg)',
                  color: 'var(--color-text)'
                }}
              >
                <option value={5}>5 sterren</option>
                <option value={10}>10 punten</option>
              </select>
            </div>
          )}

          {/* Required toggle */}
          {question.type !== 'info_box' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                id={`required-${question.id}`}
                checked={question.required || false}
                onChange={(e) => onUpdate({ ...question, required: e.target.checked })}
                style={{ width: '16px', height: '16px' }}
              />
              <label 
                htmlFor={`required-${question.id}`}
                style={{ fontSize: '13px', color: 'var(--color-text)' }}
              >
                Verplicht veld
              </label>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// SVG Smiley Components
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
            <line x1="6" y1="6" x2="9" y2="8" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
            <line x1="18" y1="6" x2="15" y2="8" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
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
            <path d="M7 13c1.5 3 7.5 3 10 0" fill={color} opacity="0.2" />
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

// Final Score Selector Component
const FinalScoreSelector: React.FC<{
  selectedScore: FinalEvaluationScore | null;
  onSelect: (score: FinalEvaluationScore | null) => void;
}> = ({ selectedScore, onSelect }) => {
  const scores: FinalEvaluationScore[] = ['niet_goed', 'misschien', 'goed', 'zeer_goed'];

  return (
    <div style={{
      backgroundColor: 'var(--color-card-bg)',
      borderRadius: '12px',
      border: '1px solid var(--color-border)',
      padding: '24px'
    }}>
      <h3 style={{
        fontSize: '18px',
        fontWeight: '600',
        color: 'var(--color-text)',
        marginBottom: '8px'
      }}>
        Eindbeoordeling kandidaat
      </h3>
      <p style={{
        fontSize: '14px',
        color: 'var(--color-text-muted)',
        marginBottom: '20px'
      }}>
        Geef een algemene beoordeling van de kandidaat
      </p>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '12px'
      }}>
        {scores.map(score => {
          const config = finalScoreLabels[score];
          const isSelected = selectedScore === score;
          
          return (
            <button
              key={score}
              onClick={() => onSelect(isSelected ? null : score)}
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
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = config.color;
                  e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = 'var(--color-border)';
                  e.currentTarget.style.backgroundColor = 'var(--color-card-bg)';
                }
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
  );
};

// Main Builder Component
export const EvaluationTemplateBuilder: React.FC<EvaluationTemplateBuilderProps> = ({
  initialTemplate,
  onSave,
  onCancel
}) => {
  const [template, setTemplate] = useState<EvaluationTemplate>(initialTemplate || {
    id: generateId(),
    name: '',
    description: '',
    category: 'Algemeen',
    questions: [],
    includeFinalScore: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });

  const [previewScore, setPreviewScore] = useState<FinalEvaluationScore | null>(null);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const addQuestion = useCallback((type: QuestionType, insertIndex?: number) => {
    const newQuestion: EvaluationQuestion = {
      id: generateId(),
      type,
      label: '',
      options: ['multiple_choice_title', 'single_choice', 'multiple_choice', 'dropdown'].includes(type) 
        ? [{ id: generateId(), label: 'Optie 1' }] 
        : undefined,
      maxScore: type === 'scorecard' ? 5 : undefined
    };
    
    setTemplate(prev => {
      const newQuestions = [...prev.questions];
      if (insertIndex !== undefined) {
        newQuestions.splice(insertIndex, 0, newQuestion);
      } else {
        newQuestions.push(newQuestion);
      }
      return { ...prev, questions: newQuestions };
    });
  }, []);

  const updateQuestion = useCallback((questionId: string, updatedQuestion: EvaluationQuestion) => {
    setTemplate(prev => ({
      ...prev,
      questions: prev.questions.map(q => 
        q.id === questionId ? updatedQuestion : q
      )
    }));
  }, []);

  const deleteQuestion = useCallback((questionId: string) => {
    setTemplate(prev => ({
      ...prev,
      questions: prev.questions.filter(q => q.id !== questionId)
    }));
  }, []);

  const moveQuestion = useCallback((index: number, direction: 'up' | 'down') => {
    setTemplate(prev => {
      const newQuestions = [...prev.questions];
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      [newQuestions[index], newQuestions[newIndex]] = [newQuestions[newIndex], newQuestions[index]];
      return { ...prev, questions: newQuestions };
    });
  }, []);

  const handleSave = () => {
    if (!template.name.trim()) {
      alert('Vul een template naam in');
      return;
    }
    onSave({
      ...template,
      updatedAt: new Date().toISOString()
    });
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <h1 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: 'var(--color-text)'
        }}>
          {initialTemplate ? 'Template bewerken' : 'Nieuw evaluatieformulier'}
        </h1>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={onCancel}
            style={{
              padding: '10px 20px',
              backgroundColor: 'var(--color-card-bg)',
              color: 'var(--color-text)',
              border: '1px solid var(--color-border)',
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
            Template opslaan
          </button>
        </div>
      </div>

      {/* Template Info with Category */}
      <div style={{
        backgroundColor: 'var(--color-card-bg)',
        borderRadius: '12px',
        border: '1px solid var(--color-border)',
        padding: '24px',
        marginBottom: '24px'
      }}>
        {/* Title and Category Row */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr auto', 
          gap: '16px',
          marginBottom: '16px'
        }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: 'var(--color-text)',
              marginBottom: '6px'
            }}>
              Template naam *
            </label>
            <input
              type="text"
              value={template.name}
              onChange={(e) => setTemplate(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Bijv. Sales Interview Evaluatie"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                fontSize: '16px',
                backgroundColor: 'var(--color-card-bg)',
                color: 'var(--color-text)'
              }}
            />
          </div>
          
          {/* Category Selector */}
          <div style={{ position: 'relative' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: 'var(--color-text)',
              marginBottom: '6px'
            }}>
              Categorie
            </label>
            <button
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 16px',
                backgroundColor: 'var(--color-bg-secondary)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                color: 'var(--color-text)',
                minWidth: '180px',
                justifyContent: 'space-between'
              }}
            >
              <span>{template.category}</span>
              <span style={{ fontSize: '12px' }}>▼</span>
            </button>
            
            {showCategoryDropdown && (
              <>
                <div 
                  style={{ position: 'fixed', inset: 0, zIndex: 99 }} 
                  onClick={() => setShowCategoryDropdown(false)} 
                />
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  backgroundColor: 'var(--color-card-bg)',
                  borderRadius: '8px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                  border: '1px solid var(--color-border)',
                  padding: '8px',
                  zIndex: 100,
                  minWidth: '180px',
                  marginTop: '4px'
                }}>
                  {predefinedCategories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => {
                        setTemplate(prev => ({ ...prev, category: cat }));
                        setShowCategoryDropdown(false);
                      }}
                      style={{
                        display: 'block',
                        width: '100%',
                        padding: '10px 12px',
                        backgroundColor: template.category === cat ? 'var(--color-primary-bg)' : 'transparent',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        color: template.category === cat ? 'var(--color-primary)' : 'var(--color-text)',
                        textAlign: 'left',
                        fontWeight: template.category === cat ? '500' : '400'
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
        
        {/* Description */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '600',
            color: 'var(--color-text)',
            marginBottom: '6px'
          }}>
            Beschrijving (optioneel)
          </label>
          <textarea
            value={template.description || ''}
            onChange={(e) => setTemplate(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Korte beschrijving van dit evaluatieformulier..."
            rows={2}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '1px solid var(--color-border)',
              borderRadius: '8px',
              fontSize: '14px',
              resize: 'vertical',
              backgroundColor: 'var(--color-card-bg)',
              color: 'var(--color-text)'
            }}
          />
        </div>
      </div>

      {/* Questions Section */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: 'var(--color-text)',
          marginBottom: '16px'
        }}>
          Vragen
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {template.questions.map((question, index) => (
            <React.Fragment key={question.id}>
              <QuestionEditor
                question={question}
                onUpdate={(q) => updateQuestion(question.id, q)}
                onDelete={() => deleteQuestion(question.id)}
                onMoveUp={() => moveQuestion(index, 'up')}
                onMoveDown={() => moveQuestion(index, 'down')}
                isFirst={index === 0}
                isLast={index === template.questions.length - 1}
              />
              
              {/* Add button between questions */}
              {index < template.questions.length - 1 && (
                <div style={{ margin: '4px 0' }}>
                  <AddButton 
                    onAddQuestion={(type) => addQuestion(type, index + 1)} 
                    label="+ Vraag tussenvoegen"
                  />
                </div>
              )}
            </React.Fragment>
          ))}
          
          {/* Add button at the end */}
          <div style={{ marginTop: template.questions.length > 0 ? '8px' : '0' }}>
            <AddButton onAddQuestion={(type) => addQuestion(type)} />
          </div>
        </div>
      </div>

      {/* Final Score Section */}
      <div style={{ marginBottom: '24px' }}>
        <FinalScoreSelector 
          selectedScore={previewScore}
          onSelect={setPreviewScore}
        />
      </div>

      {/* Bottom Save Button */}
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
            border: '1px solid var(--color-border)',
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
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          Template opslaan
        </button>
      </div>
    </div>
  );
};

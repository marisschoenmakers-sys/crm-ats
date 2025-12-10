// Evaluation Builder Types

export type QuestionType = 
  | 'text'           // Regel (tekstvak)
  | 'multiple_choice_title' // Meerkeuze met titel
  | 'scorecard'      // Scorekaart
  | 'yes_no'         // Ja/Nee met tekstvak erboven
  | 'single_choice'  // Enkele keuze
  | 'multiple_choice'// Meerkeuze
  | 'dropdown'       // Drop-down
  | 'file_upload'    // Bestand toevoegen
  | 'info_box';      // Informatiebox

export interface QuestionOption {
  id: string;
  label: string;
}

export interface EvaluationQuestion {
  id: string;
  type: QuestionType;
  label: string;
  description?: string;
  required?: boolean;
  options?: QuestionOption[]; // Voor meerkeuze, enkele keuze, dropdown
  placeholder?: string;       // Voor tekstvak
  infoText?: string;          // Voor informatiebox
  maxScore?: number;          // Voor scorekaart
}

export interface EvaluationCategory {
  id: string;
  name: string;
  questions: EvaluationQuestion[];
}

export type FinalEvaluationScore = 'niet_goed' | 'misschien' | 'goed' | 'zeer_goed';

export interface EvaluationTemplate {
  id: string;
  name: string;
  description?: string;
  category: string;  // Single category for the whole template
  questions: EvaluationQuestion[];  // Questions directly on template
  includeFinalScore: boolean;
  createdAt: string;
  updatedAt: string;
}

// Question type labels for UI
export const questionTypeLabels: Record<QuestionType, string> = {
  text: 'Regel (tekstvak)',
  multiple_choice_title: 'Meerkeuze met titel',
  scorecard: 'Scorekaart',
  yes_no: 'Ja/Nee met tekstvak',
  single_choice: 'Enkele keuze',
  multiple_choice: 'Meerkeuze',
  dropdown: 'Drop-down',
  file_upload: 'Bestand toevoegen',
  info_box: 'Informatiebox'
};

export const questionTypeIcons: Record<QuestionType, string> = {
  text: '📝',
  multiple_choice_title: '☑️',
  scorecard: '⭐',
  yes_no: '✓✗',
  single_choice: '○',
  multiple_choice: '☐',
  dropdown: '▼',
  file_upload: '📎',
  info_box: 'ℹ️'
};

export const finalScoreLabels: Record<FinalEvaluationScore, { label: string; color: string; bgColor: string; icon: string }> = {
  niet_goed: { label: 'Niet goed', color: '#dc2626', bgColor: '#fee2e2', icon: '👎👎' },
  misschien: { label: 'Misschien', color: '#f59e0b', bgColor: '#fef3c7', icon: '👎' },
  goed: { label: 'Goed', color: '#22c55e', bgColor: '#dcfce7', icon: '👍' },
  zeer_goed: { label: 'Zeer goed', color: '#059669', bgColor: '#d1fae5', icon: '👍👍' }
};

export type EvaluationTemplate = {
  id: string;
  vacancyId: string;
  title: string;            // bijv. "Sales Interview Scorecard"
  description?: string;
};

export type EvaluationCategory = {
  id: string;
  templateId: string;
  label: string;            // bijv. "Communicatie"
  description?: string;
};

export type EvaluationScore = {
  id: string;
  candidateId: string;
  vacancyId: string;
  categoryId: string;
  score: number;            // 1–5
  comment?: string;
  updatedAt: string;
};

export type CandidateEvaluation = {
  candidateId: string;
  vacancyId: string;
  template: EvaluationTemplate;
  categories: (EvaluationCategory & {
    score?: EvaluationScore;
  })[];
  averageScore: number;
  lastUpdated: string;
};

export type EvaluationSummary = {
  totalCandidates: number;
  averageScore: number;
  categoryAverages: Record<string, number>;
  completionRate: number;
};

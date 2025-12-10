import type { 
  EvaluationTemplate, 
  EvaluationCategory, 
  EvaluationScore,
  CandidateEvaluation 
} from '../types/evaluations';

// Evaluation Templates - 1 template per vacancy
export const evaluationTemplates: EvaluationTemplate[] = [
  {
    id: 'eval-template-1',
    vacancyId: '1',
    title: 'Sales Professional Scorecard',
    description: 'Evaluatie voor sales posities met focus op communicatie en commerciële vaardigheden'
  },
  {
    id: 'eval-template-2', 
    vacancyId: '2',
    title: 'Technical Developer Assessment',
    description: 'Technische evaluatie voor ontwikkelaars met focus op code kwaliteit en probleemoplossing'
  },
  {
    id: 'eval-template-3',
    vacancyId: '3', 
    title: 'Marketing Specialist Evaluation',
    description: 'Marketing evaluatie met focus op creativiteit en strategisch inzicht'
  },
  {
    id: 'eval-template-4',
    vacancyId: '4',
    title: 'DevOps Engineer Scorecard', 
    description: 'DevOps evaluatie met focus op systemen en automation'
  }
];

// Evaluation Categories - 3-5 categorieën per template
export const evaluationCategories: EvaluationCategory[] = [
  // Sales Professional categories
  {
    id: 'cat-1',
    templateId: 'eval-template-1',
    label: 'Communicatie',
    description: 'Mondelinge en schriftelijke communicatievaardigheden'
  },
  {
    id: 'cat-2', 
    templateId: 'eval-template-1',
    label: 'Commercieel inzicht',
    description: 'Vermogen om commerciële kansen te identificeren en benutten'
  },
  {
    id: 'cat-3',
    templateId: 'eval-template-1', 
    label: 'Onderhandeling',
    description: 'Onderhandelingsvaardigheden en deal closing'
  },
  {
    id: 'cat-4',
    templateId: 'eval-template-1',
    label: 'Klantgerichtheid',
    description: 'Focus op klanttevredenheid en relatiebeheer'
  },
  {
    id: 'cat-5',
    templateId: 'eval-template-1',
    label: 'Target behalen',
    description: 'Resultaatgerichtheid en target realisatie'
  },

  // Technical Developer categories
  {
    id: 'cat-6',
    templateId: 'eval-template-2',
    label: 'Code kwaliteit',
    description: 'Schone, onderhoudbare en efficiënte code'
  },
  {
    id: 'cat-7',
    templateId: 'eval-template-2', 
    label: 'Probleemoplossing',
    description: 'Analytisch vermogen en oplossingsgericht denken'
  },
  {
    id: 'cat-8',
    templateId: 'eval-template-2',
    label: 'Technische kennis',
    description: 'Diepgaande kennis van relevante technologieën'
  },
  {
    id: 'cat-9',
    templateId: 'eval-template-2',
    label: 'System design',
    description: 'Ontwerpen van schaalbare en robuuste systemen'
  },

  // Marketing Specialist categories  
  {
    id: 'cat-10',
    templateId: 'eval-template-3',
    label: 'Creativiteit',
    description: 'Creatieve concepten en campagne ontwikkeling'
  },
  {
    id: 'cat-11',
    templateId: 'eval-template-3',
    label: 'Strategisch inzicht',
    description: 'Marketing strategie en marktpositionering'
  },
  {
    id: 'cat-12',
    templateId: 'eval-template-3',
    label: 'Data analyse',
    description: 'Campaign data analyseren en optimaliseren'
  },
  {
    id: 'cat-13',
    templateId: 'eval-template-3',
    label: 'Content creatie',
    description: 'Kwaliteit van content en copywriting'
  },

  // DevOps Engineer categories
  {
    id: 'cat-14',
    templateId: 'eval-template-4',
    label: 'Systemen beheer',
    description: 'Linux/Windows systemen en netwerken'
  },
  {
    id: 'cat-15',
    templateId: 'eval-template-4', 
    label: 'Automation',
    description: 'CI/CD pipelines en infrastructure as code'
  },
  {
    id: 'cat-16',
    templateId: 'eval-template-4',
    label: 'Monitoring',
    description: 'System monitoring en performance optimalisatie'
  },
  {
    id: 'cat-17',
    templateId: 'eval-template-4',
    label: 'Security',
    description: 'Security best practices en vulnerability management'
  }
];

// Mock scores voor kandidaten
export const evaluationScores: EvaluationScore[] = [
  // Sales candidate scores
  {
    id: 'score-1',
    candidateId: '1',
    vacancyId: '1',
    categoryId: 'cat-1',
    score: 4,
    comment: 'Goede communicator, helder en overtuigend',
    updatedAt: '2024-11-25T10:30:00Z'
  },
  {
    id: 'score-2',
    candidateId: '1', 
    vacancyId: '1',
    categoryId: 'cat-2',
    score: 5,
    comment: 'Uitstekend commercieel inzicht, spot kansen snel',
    updatedAt: '2024-11-25T10:30:00Z'
  },
  {
    id: 'score-3',
    candidateId: '1',
    vacancyId: '1', 
    categoryId: 'cat-3',
    score: 3,
    comment: 'Redelijk in onderhandelen, kan nog groeien',
    updatedAt: '2024-11-25T10:30:00Z'
  },
  {
    id: 'score-4',
    candidateId: '2',
    vacancyId: '1',
    categoryId: 'cat-1',
    score: 2,
    comment: 'Communicatie kan verbeterd worden, soms onduidelijk',
    updatedAt: '2024-11-24T14:15:00Z'
  },
  {
    id: 'score-5',
    candidateId: '2',
    vacancyId: '1',
    categoryId: 'cat-2', 
    score: 3,
    comment: 'Basis commercieel inzicht aanwezig',
    updatedAt: '2024-11-24T14:15:00Z'
  },

  // Technical candidate scores
  {
    id: 'score-6',
    candidateId: '3',
    vacancyId: '2',
    categoryId: 'cat-6',
    score: 5,
    comment: 'Uitstekende code kwaliteit, clean en documented',
    updatedAt: '2024-11-23T09:45:00Z'
  },
  {
    id: 'score-7',
    candidateId: '3',
    vacancyId: '2',
    categoryId: 'cat-7',
    score: 4,
    comment: 'Goede probleemoplosser, systematische aanpak',
    updatedAt: '2024-11-23T09:45:00Z'
  },
  {
    id: 'score-8',
    candidateId: '4',
    vacancyId: '2',
    categoryId: 'cat-6',
    score: 3,
    comment: 'Code is functioneel maar kan schoner',
    updatedAt: '2024-11-22T16:20:00Z'
  }
];

// Helper functies om data op te halen
export const getTemplateByVacancyId = (vacancyId: string): EvaluationTemplate | undefined => {
  return evaluationTemplates.find(template => template.vacancyId === vacancyId);
};

export const getCategoriesByTemplateId = (templateId: string): EvaluationCategory[] => {
  return evaluationCategories.filter(category => category.templateId === templateId);
};

export const getScoresByCandidateAndVacancy = (candidateId: string, vacancyId: string): EvaluationScore[] => {
  return evaluationScores.filter(score => 
    score.candidateId === candidateId && score.vacancyId === vacancyId
  );
};

export const getCandidateEvaluation = (candidateId: string, vacancyId: string): CandidateEvaluation | undefined => {
  const template = getTemplateByVacancyId(vacancyId);
  if (!template) return undefined;

  const categories = getCategoriesByTemplateId(template.id);
  const scores = getScoresByCandidateAndVacancy(candidateId, vacancyId);
  
  const categoriesWithScores = categories.map(category => ({
    ...category,
    score: scores.find(score => score.categoryId === category.id)
  }));

  const validScores = categoriesWithScores
    .map(cat => cat.score?.score)
    .filter(score => score !== undefined) as number[];

  const averageScore = validScores.length > 0 
    ? validScores.reduce((sum, score) => sum + score, 0) / validScores.length
    : 0;

  const lastUpdated = scores.length > 0 
    ? Math.max(...scores.map(s => new Date(s.updatedAt).getTime())).toString()
    : new Date().toISOString();

  return {
    candidateId,
    vacancyId,
    template,
    categories: categoriesWithScores,
    averageScore: Math.round(averageScore * 10) / 10,
    lastUpdated
  };
};

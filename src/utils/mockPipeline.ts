import type { CandidateStage, PipelineCandidate } from '../types/funnel';

export const mockStages: CandidateStage[] = [
  { id: 'applied', name: 'Gesolliciteerd', order: 1 },
  { id: 'no-response', name: 'Geen gehoor', order: 2 },
  { id: 'phone-interview', name: 'Telefonisch interview', order: 3 },
  { id: 'awaiting-cv', name: 'In afwachting CV', order: 4 },
  { id: 'doubtful', name: 'Twijfel kandidaat', order: 5 },
  { id: 'rejected', name: 'Afwijzen', order: 6 },
  { id: 'proposed', name: 'Voorgesteld', order: 7 },
];

export const mockCandidates: PipelineCandidate[] = [
  {
    id: '1',
    name: 'Jan Jansen',
    role: 'Frontend Developer',
    company: 'TechCorp B.V.',
    location: 'Amsterdam',
    currentStageId: 'phone-interview',
    appliedAt: '12-10-2025',
    source: 'LinkedIn',
    note: 'Sterke React ervaring'
  },
  {
    id: '2',
    name: 'Maria de Vries',
    role: 'Marketing Manager',
    company: 'Marketing Solutions',
    location: 'Utrecht',
    currentStageId: 'applied',
    appliedAt: '14-10-2025',
    source: 'Website'
  },
  {
    id: '3',
    name: 'Pieter Bakker',
    role: 'Data Analyst',
    company: 'Data Insights',
    location: 'Rotterdam',
    currentStageId: 'proposed',
    appliedAt: '10-10-2025',
    source: 'Referral',
    note: 'Uitstekende analytische vaardigheden'
  },
  {
    id: '4',
    name: 'Lisa Visser',
    role: 'HR Business Partner',
    company: 'People First',
    location: 'Den Haag',
    currentStageId: 'awaiting-cv',
    appliedAt: '15-10-2025',
    source: 'LinkedIn'
  },
  {
    id: '5',
    name: 'Mark van Dijk',
    role: 'Backend Developer',
    company: 'StartupHub',
    location: 'Eindhoven',
    currentStageId: 'no-response',
    appliedAt: '11-10-2025',
    source: 'Website'
  },
  {
    id: '6',
    name: 'Sarah Mulder',
    role: 'Sales Executive',
    company: 'SalesPro',
    location: 'Amsterdam',
    currentStageId: 'doubtful',
    appliedAt: '13-10-2025',
    source: 'LinkedIn',
    note: 'Goede sales ervaring maar salarisverwachting hoog'
  },
  {
    id: '7',
    name: 'Tom de Boer',
    role: 'Senior Frontend Developer',
    company: 'TechCorp B.V.',
    location: 'Utrecht',
    currentStageId: 'phone-interview',
    appliedAt: '09-10-2025',
    source: 'Referral'
  },
  {
    id: '8',
    name: 'Emma van der Meer',
    role: 'Marketing Manager',
    company: 'Creative Agency',
    location: 'Rotterdam',
    currentStageId: 'rejected',
    appliedAt: '08-10-2025',
    source: 'Website'
  },
  {
    id: '9',
    name: 'David van Leeuwen',
    role: 'Full Stack Developer',
    company: 'Digital Solutions',
    location: 'Amsterdam',
    currentStageId: 'applied',
    appliedAt: '16-10-2025',
    source: 'LinkedIn'
  },
  {
    id: '10',
    name: 'Femke Janssen',
    role: 'UX Designer',
    company: 'Design Studio',
    location: 'Den Haag',
    currentStageId: 'awaiting-cv',
    appliedAt: '17-10-2025',
    source: 'Referral',
    note: 'Indrukwekkend portfolio'
  }
];

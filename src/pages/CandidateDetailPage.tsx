import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CandidateDetailHeader } from '../components/CandidateDetailHeader';
import { DetailTabs } from '../components/DetailTabs';
import { CandidateOverview } from '../components/CandidateOverview';
import { CandidateFiles } from '../components/CandidateFiles';
import { CandidateActivity } from '../components/CandidateActivity';
import { CandidateEvaluationsList } from '../components/CandidateEvaluationsList';
import { EvaluationFormFiller, type FilledEvaluation } from '../components/EvaluationFormFiller';
import { NotesSidebar } from '../components/NotesSidebar';
import type { EvaluationTemplate } from '../types/evaluationBuilder';
import type { CandidateNote } from '../types/candidate';
import { 
  candidateDetail, 
  candidateNotes as initialNotes, 
  candidateFiles, 
  candidateActivities
} from '../utils/mockCandidateDetail';

interface CandidateDetailPageProps {
  onChangePage?: (page: 'candidates') => void;
}

// Mock evaluation templates (in real app, these would come from settings/API)
const mockEvaluationTemplates: EvaluationTemplate[] = [
  {
    id: '1',
    name: 'Sales Interview Evaluatie',
    description: 'Standaard evaluatieformulier voor sales kandidaten',
    category: 'Sales',
    questions: [
      { id: 'q1', type: 'scorecard', label: 'Communicatievaardigheden', description: 'Hoe goed kan de kandidaat communiceren?', maxScore: 5 },
      { id: 'q2', type: 'scorecard', label: 'Presentatievaardigheden', maxScore: 5 },
      { id: 'q3', type: 'text', label: 'Sterke punten', description: 'Beschrijf de sterke punten van de kandidaat' },
      { id: 'q4', type: 'text', label: 'Verbeterpunten' },
      { id: 'q5', type: 'yes_no', label: 'Geschikt voor de functie?' }
    ],
    includeFinalScore: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'Technisch Interview',
    description: 'Evaluatieformulier voor technische functies',
    category: 'Technisch',
    questions: [
      { id: 'q1', type: 'scorecard', label: 'Technische kennis', maxScore: 5 },
      { id: 'q2', type: 'scorecard', label: 'Probleemoplossend vermogen', maxScore: 5 },
      { id: 'q3', type: 'multiple_choice', label: 'Bekende programmeertalen', options: [
        { id: 'o1', label: 'JavaScript' },
        { id: 'o2', label: 'Python' },
        { id: 'o3', label: 'Java' },
        { id: 'o4', label: 'C#' },
        { id: 'o5', label: 'TypeScript' }
      ]},
      { id: 'q4', type: 'text', label: 'Technische opmerkingen' }
    ],
    includeFinalScore: true,
    createdAt: '2024-01-20T14:00:00Z',
    updatedAt: '2024-01-20T14:00:00Z'
  },
  {
    id: '3',
    name: 'HR Screening',
    description: 'Eerste screening door HR',
    category: 'HR',
    questions: [
      { id: 'q1', type: 'yes_no', label: 'CV komt overeen met profiel?' },
      { id: 'q2', type: 'single_choice', label: 'Beschikbaarheid', options: [
        { id: 'o1', label: 'Direct beschikbaar' },
        { id: 'o2', label: 'Binnen 1 maand' },
        { id: 'o3', label: 'Binnen 3 maanden' },
        { id: 'o4', label: 'Langer dan 3 maanden' }
      ]},
      { id: 'q3', type: 'text', label: 'Salarisverwachting' },
      { id: 'q4', type: 'text', label: 'Algemene indruk' }
    ],
    includeFinalScore: true,
    createdAt: '2024-01-25T09:00:00Z',
    updatedAt: '2024-01-25T09:00:00Z'
  }
];

// ID generator for new notes
let noteIdCounter = 100;
const generateNoteId = () => {
  noteIdCounter += 1;
  return `note-${noteIdCounter}`;
};

export const CandidateDetailPage: React.FC<CandidateDetailPageProps> = ({ onChangePage }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overzicht');
  const [showEvaluationForm, setShowEvaluationForm] = useState(false);
  const [filledEvaluations, setFilledEvaluations] = useState<FilledEvaluation[]>([]);
  const [notes, setNotes] = useState<CandidateNote[]>(initialNotes);

  const handleSaveEvaluation = (evaluation: FilledEvaluation) => {
    setFilledEvaluations(prev => [...prev, evaluation]);
    setShowEvaluationForm(false);
  };

  const handleAddNote = (content: string) => {
    const newNote: CandidateNote = {
      id: generateNoteId(),
      author: 'Maris', // TODO: Get from auth
      content,
      createdAt: 'Zojuist'
    };
    setNotes(prev => [newNote, ...prev]);
  };

  const renderTabContent = () => {
    // If evaluation form is open, show it instead of tab content
    if (showEvaluationForm && activeTab === 'Evaluaties') {
      return (
        <EvaluationFormFiller
          templates={mockEvaluationTemplates}
          candidateId={candidateDetail.id}
          candidateName={candidateDetail.fullName}
          onSave={handleSaveEvaluation}
          onCancel={() => setShowEvaluationForm(false)}
        />
      );
    }

    switch (activeTab) {
      case 'Overzicht':
        return <CandidateOverview candidate={candidateDetail} />;
      case 'Bestanden':
        return <CandidateFiles files={candidateFiles} onUpload={() => {}} />;
      case 'Activiteit':
        return <CandidateActivity activities={candidateActivities} />;
      case 'Evaluaties':
        return (
          <CandidateEvaluationsList
            evaluations={filledEvaluations}
            onAddEvaluation={() => setShowEvaluationForm(true)}
          />
        );
      default:
        return <CandidateOverview candidate={candidateDetail} />;
    }
  };

  return (
    <div>
      {/* Back Button */}
      <button
        onClick={() => onChangePage ? onChangePage('candidates') : navigate('/candidates')}
        style={{
          padding: '8px 16px',
          backgroundColor: 'transparent',
          color: 'var(--color-primary)',
          border: '1px solid var(--color-border)',
          borderRadius: '6px',
          fontSize: '14px',
          fontWeight: '500',
          cursor: 'pointer',
          marginBottom: '16px',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--color-primary-bg)';
          e.currentTarget.style.borderColor = 'var(--color-primary)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.borderColor = 'var(--color-border)';
        }}
      >
        ← Terug naar kandidaten
      </button>

      {/* Page Title */}
      <h1 style={{
        fontSize: '24px',
        fontWeight: 'bold',
        color: 'var(--color-text)',
        marginBottom: '24px'
      }}>
        Kandidaatdetails
      </h1>

      {/* Candidate Header */}
      <CandidateDetailHeader candidate={candidateDetail} />

      {/* Tabs */}
      <DetailTabs 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />

      {/* Main Content with Notes Sidebar */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 340px',
        gap: '24px',
        alignItems: 'start'
      }}>
        {/* Tab Content */}
        <div>
          {renderTabContent()}
        </div>

        {/* Notes Sidebar - Always visible */}
        <NotesSidebar 
          notes={notes}
          onAddNote={handleAddNote}
        />
      </div>
    </div>
  );
};

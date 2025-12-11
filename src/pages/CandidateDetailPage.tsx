import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CandidateDetailHeader } from '../components/CandidateDetailHeader';
import { DetailTabs } from '../components/DetailTabs';
import { CandidateOverview } from '../components/CandidateOverview';
import { CandidateFiles } from '../components/CandidateFiles';
import { CandidateActivity } from '../components/CandidateActivity';
import { CandidateEvaluationsList } from '../components/CandidateEvaluationsList';
import { EvaluationFormFiller, type FilledEvaluation } from '../components/EvaluationFormFiller';
import { NotesSidebar } from '../components/NotesSidebar';
import { getTemplates } from '../api/evaluations';
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
  const [evaluationTemplates, setEvaluationTemplates] = useState<EvaluationTemplate[]>([]);

  // Load evaluation templates from Supabase
  useEffect(() => {
    async function loadTemplates() {
      const { data, error } = await getTemplates();
      if (error) {
        console.error('Error loading evaluation templates:', error);
      } else if (data) {
        // Transform Supabase data to match EvaluationTemplate type
        const templates: EvaluationTemplate[] = data.map((t: any) => ({
          id: t.id,
          name: t.name,
          description: t.description || '',
          category: t.category || 'Algemeen',
          questions: [], // Templates from DB don't have questions yet - they're in sections
          includeFinalScore: true,
          createdAt: t.created_at,
          updatedAt: t.updated_at || t.created_at
        }));
        setEvaluationTemplates(templates);
      }
    }
    loadTemplates();
  }, []);

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
          templates={evaluationTemplates}
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

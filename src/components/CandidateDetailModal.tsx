import React, { useEffect, useCallback } from 'react';
import { CandidateDetailHeader } from './CandidateDetailHeader';
import { DetailTabs } from './DetailTabs';
import { CandidateOverview } from './CandidateOverview';
import { CandidateFiles } from './CandidateFiles';
import { CandidateActivity } from './CandidateActivity';
import { CandidateEvaluationsList } from './CandidateEvaluationsList';
import { NotesSidebar } from './NotesSidebar';
import { 
  candidateDetail, 
  candidateNotes as initialNotes, 
  candidateFiles, 
  candidateActivities
} from '../utils/mockCandidateDetail';
import type { CandidateNote } from '../types/candidate';

interface CandidateDetailModalProps {
  candidateId: string;
  onClose: () => void;
}

export const CandidateDetailModal: React.FC<CandidateDetailModalProps> = ({ 
  candidateId, 
  onClose 
}) => {
  const [activeTab, setActiveTab] = React.useState('Overzicht');
  const [notes, setNotes] = React.useState<CandidateNote[]>(initialNotes);

  // Handle Escape key to close modal
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [handleKeyDown]);

  const handleAddNote = (content: string) => {
    const newNote: CandidateNote = {
      id: `note-${Date.now()}`,
      author: 'Maris',
      content,
      createdAt: 'Zojuist'
    };
    setNotes(prev => [newNote, ...prev]);
  };

  const renderTabContent = () => {
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
            evaluations={[]}
            onAddEvaluation={() => {}}
          />
        );
      default:
        return <CandidateOverview candidate={candidateDetail} />;
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          zIndex: 1000,
          backdropFilter: 'blur(4px)'
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: 'fixed',
          top: '5%',
          left: '5%',
          right: '5%',
          bottom: '5%',
          backgroundColor: 'var(--color-bg-secondary)',
          borderRadius: '16px',
          zIndex: 1001,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}
      >
        {/* Header with close button */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 24px',
          borderBottom: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-card-bg)'
        }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: 'var(--color-text)',
            margin: 0
          }}>
            Kandidaatdetails
          </h2>
          <button
            onClick={onClose}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '6px',
              border: '1px solid var(--color-border)',
              backgroundColor: 'transparent',
              color: 'var(--color-text-muted)',
              fontSize: '18px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)';
              e.currentTarget.style.color = 'var(--color-text)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--color-text-muted)';
            }}
          >
            ✕
          </button>
        </div>

        {/* Scrollable content */}
        <div style={{
          flex: 1,
          overflow: 'auto',
          padding: '24px'
        }}>
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
            gridTemplateColumns: '1fr 300px',
            gap: '24px',
            alignItems: 'start'
          }}>
            {/* Tab Content */}
            <div>
              {renderTabContent()}
            </div>

            {/* Notes Sidebar */}
            <NotesSidebar 
              notes={notes}
              onAddNote={handleAddNote}
            />
          </div>
        </div>

        {/* Footer hint */}
        <div style={{
          padding: '12px 24px',
          borderTop: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-card-bg)',
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
          <span style={{
            fontSize: '12px',
            color: 'var(--color-text-muted)'
          }}>
            Druk op <kbd style={{
              padding: '2px 6px',
              backgroundColor: 'var(--color-bg-secondary)',
              borderRadius: '4px',
              border: '1px solid var(--color-border)',
              marginLeft: '4px',
              marginRight: '4px'
            }}>Esc</kbd> om te sluiten
          </span>
        </div>
      </div>
    </>
  );
};

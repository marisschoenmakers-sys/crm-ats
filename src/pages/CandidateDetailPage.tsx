import React, { useState } from 'react';
import { CandidateDetailHeader } from '../components/CandidateDetailHeader';
import { DetailTabs } from '../components/DetailTabs';
import { CandidateOverview } from '../components/CandidateOverview';
import { CandidateNotes } from '../components/CandidateNotes';
import { CandidateFiles } from '../components/CandidateFiles';
import { CandidateActivity } from '../components/CandidateActivity';
import { CandidateEvaluations } from '../components/CandidateEvaluations';
import { 
  candidateDetail, 
  candidateNotes, 
  candidateFiles, 
  candidateActivities, 
  candidateEvaluations 
} from '../utils/mockCandidateDetail';

interface CandidateDetailPageProps {
  onChangePage: (page: 'candidates') => void;
}

export const CandidateDetailPage: React.FC<CandidateDetailPageProps> = ({ onChangePage }) => {
  const [activeTab, setActiveTab] = useState('Overzicht');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Overzicht':
        return <CandidateOverview candidate={candidateDetail} />;
      case 'Notities':
        return <CandidateNotes notes={candidateNotes} />;
      case 'Bestanden':
        return <CandidateFiles files={candidateFiles} />;
      case 'Activiteit':
        return <CandidateActivity activities={candidateActivities} />;
      case 'Evaluaties':
        return <CandidateEvaluations evaluations={candidateEvaluations} />;
      default:
        return <CandidateOverview candidate={candidateDetail} />;
    }
  };

  return (
    <div>
      {/* Back Button */}
      <button
        onClick={() => onChangePage('candidates')}
        style={{
          padding: '8px 16px',
          backgroundColor: 'transparent',
          color: '#2563eb',
          border: '1px solid #d1d5db',
          borderRadius: '6px',
          fontSize: '14px',
          fontWeight: '500',
          cursor: 'pointer',
          marginBottom: '16px',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#eff6ff';
          e.currentTarget.style.borderColor = '#2563eb';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.borderColor = '#d1d5db';
        }}
      >
        ← Terug naar kandidaten
      </button>

      {/* Page Title */}
      <h1 style={{
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#111827',
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

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
};

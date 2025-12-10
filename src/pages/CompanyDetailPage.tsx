import React, { useState } from 'react';
import { CompanyDetailHeader } from '../components/CompanyDetailHeader';
import { CompanyOverview } from '../components/CompanyOverview';
import { CompanyContacts } from '../components/CompanyContacts';
import { CompanyVacancies } from '../components/CompanyVacancies';
import { CompanyCandidates } from '../components/CompanyCandidates';
import { CompanyNotes } from '../components/CompanyNotes';
import { 
  companies, 
  companyContacts, 
  companyNotes, 
  companyVacancies, 
  companyCandidates 
} from '../utils/mockCompanies';
import type { CompanyNote } from '../types/company';

interface CompanyDetailPageProps {
  companyId: string;
}

export const CompanyDetailPage: React.FC<CompanyDetailPageProps> = ({ 
  companyId 
}) => {
  const [activeTab, setActiveTab] = useState<'overzicht' | 'contactpersonen' | 'vacatures' | 'kandidaten' | 'notities'>('overzicht');
  const [notes, setNotes] = useState<CompanyNote[]>(companyNotes.filter(n => n.companyId === companyId));

  // Get company data
  const company = companies.find(c => c.id === companyId);
  const contacts = companyContacts.filter(c => c.companyId === companyId);
  const vacancies = companyVacancies.filter(v => v.companyId === companyId);
  const candidates = companyCandidates.filter(c => c.companyId === companyId);

  if (!company) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '60px',
        color: '#9ca3af',
        fontSize: '16px'
      }}>
        Bedrijf niet gevonden
      </div>
    );
  }

  const handleAddNote = (content: string) => {
    const newNote: CompanyNote = {
      id: Date.now().toString(),
      companyId: companyId,
      author: 'Huidige Gebruiker',
      content: content,
      createdAt: 'Zojuist'
    };
    setNotes([newNote, ...notes]);
  };

  const tabs = [
    { id: 'overzicht' as const, label: 'Overzicht' },
    { id: 'contactpersonen' as const, label: 'Contactpersonen' },
    { id: 'vacatures' as const, label: 'Vacatures' },
    { id: 'kandidaten' as const, label: 'Kandidaten' },
    { id: 'notities' as const, label: 'Notities' }
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'overzicht':
        return <CompanyOverview company={company} />;
      case 'contactpersonen':
        return <CompanyContacts contacts={contacts} />;
      case 'vacatures':
        return <CompanyVacancies vacancies={vacancies} />;
      case 'kandidaten':
        return <CompanyCandidates candidates={candidates} />;
      case 'notities':
        return <CompanyNotes notes={notes} onAddNote={handleAddNote} />;
      default:
        return <CompanyOverview company={company} />;
    }
  };

  return (
    <div>
      {/* Header */}
      <CompanyDetailHeader company={company} />

      {/* Tab Navigation */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '8px',
        marginBottom: '24px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb'
      }}>
        <div style={{
          display: 'flex',
          gap: '4px'
        }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '10px 16px',
                backgroundColor: activeTab === tab.id ? '#2563eb' : 'transparent',
                color: activeTab === tab.id ? 'white' : '#374151',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {renderActiveTab()}
    </div>
  );
};

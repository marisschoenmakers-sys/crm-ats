import React, { useEffect, useCallback, useState } from 'react';
import { CompanyDetailHeader } from './CompanyDetailHeader';
import { CompanyOverview } from './CompanyOverview';
import { CompanyContacts } from './CompanyContacts';
import { CompanyVacancies } from './CompanyVacancies';
import { CompanyCandidates } from './CompanyCandidates';
import { CompanyNotes } from './CompanyNotes';
import { 
  companies, 
  companyContacts, 
  companyNotes, 
  companyVacancies, 
  companyCandidates 
} from '../utils/mockCompanies';
import type { CompanyNote } from '../types/company';

interface CompanyDetailModalProps {
  companyId: string;
  onClose: () => void;
}

export const CompanyDetailModal: React.FC<CompanyDetailModalProps> = ({ 
  companyId, 
  onClose 
}) => {
  const [activeTab, setActiveTab] = useState<'overzicht' | 'contactpersonen' | 'vacatures' | 'kandidaten' | 'notities'>('overzicht');
  const [notes, setNotes] = useState<CompanyNote[]>(companyNotes.filter(n => n.companyId === companyId));

  // Get company data
  const company = companies.find(c => c.id === companyId);
  const contacts = companyContacts.filter(c => c.companyId === companyId);
  const vacancies = companyVacancies.filter(v => v.companyId === companyId);
  const candidates = companyCandidates.filter(c => c.companyId === companyId);

  // Handle Escape key to close modal
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [handleKeyDown]);

  const handleAddNote = (content: string) => {
    const newNote: CompanyNote = {
      id: Date.now().toString(),
      companyId: companyId,
      author: 'Maris',
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
    if (!company) return null;
    
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

  if (!company) {
    return (
      <>
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
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'var(--color-card-bg)',
            borderRadius: '12px',
            padding: '40px',
            zIndex: 1001,
            textAlign: 'center'
          }}
        >
          <p style={{ color: 'var(--color-text-muted)' }}>Bedrijf niet gevonden</p>
          <button onClick={onClose} style={{ marginTop: '16px', padding: '8px 16px' }}>Sluiten</button>
        </div>
      </>
    );
  }

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
            Bedrijfsdetails
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
          {/* Company Header */}
          <CompanyDetailHeader company={company} />

          {/* Tab Navigation */}
          <div style={{
            backgroundColor: 'var(--color-card-bg)',
            borderRadius: '8px',
            padding: '8px',
            marginBottom: '24px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            border: '1px solid var(--color-border)'
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
                    backgroundColor: activeTab === tab.id ? 'var(--color-primary)' : 'transparent',
                    color: activeTab === tab.id ? 'var(--color-sidebar-text)' : 'var(--color-text)',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (activeTab !== tab.id) {
                      e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)';
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

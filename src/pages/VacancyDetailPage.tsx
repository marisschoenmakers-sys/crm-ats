import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { VacancyDetailHeader } from '../components/VacancyDetailHeader';
import { VacancyDetailInfo } from '../components/VacancyDetailInfo';
import { VacancyPipeline } from '../components/VacancyPipeline';
import { VacancyEditModal } from '../components/VacancyEditModal';
import { getVacancyById } from '../api/vacancies';

interface Vacancy {
  id: string;
  title: string;
  company_name: string;
  company_id: string | null;
  location: string | null;
  employment_type: string;
  salary_range: string | null;
  description: string | null;
  requirements: string[] | null;
  sector: string | null;
  priority: 'Laag' | 'Middel' | 'Hoog';
  status: 'Actief' | 'Gesloten' | 'Concept';
}

interface VacancyDetailPageProps {
  vacancyId?: string;
  onChangePage?: (page: 'vacancies') => void;
}

export const VacancyDetailPage: React.FC<VacancyDetailPageProps> = ({ vacancyId: propVacancyId, onChangePage }) => {
  const { id: paramId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'info' | 'funnel'>('funnel');
  const [vacancy, setVacancy] = useState<Vacancy | null>(null);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);

  // Use prop or URL param
  const vacancyId = propVacancyId || paramId || '';

  // Load vacancy from Supabase
  useEffect(() => {
    async function loadVacancy() {
      if (!vacancyId) {
        setLoading(false);
        return;
      }
      const { data, error } = await getVacancyById(vacancyId);
      if (error) {
        console.error('Error loading vacancy:', error);
      } else {
        setVacancy(data as Vacancy);
      }
      setLoading(false);
    }
    loadVacancy();
  }, [vacancyId]);

  if (!vacancy) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '40px',
        color: 'var(--color-text-muted)',
        fontSize: '16px'
      }}>
        Vacature niet gevonden
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'info':
        return <VacancyDetailInfo vacancy={vacancy} />;
      case 'funnel':
        return <VacancyPipeline vacancyId={vacancyId} />;
      default:
        return <VacancyDetailInfo vacancy={vacancy} />;
    }
  };

  return (
    <div>
      {/* Back Button */}
      <button
        onClick={() => onChangePage ? onChangePage('vacancies') : navigate('/vacancies')}
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
        ← Terug naar vacatures
      </button>

      {/* Page Title */}
      <h1 style={{
        fontSize: '24px',
        fontWeight: 'bold',
        color: 'var(--color-text)',
        marginBottom: '24px'
      }}>
        Vacaturedetails
      </h1>

      {/* Vacancy Header */}
      <VacancyDetailHeader vacancy={vacancy} onEdit={() => setShowEditModal(true)} />

      {/* Edit Modal */}
      {showEditModal && (
        <VacancyEditModal
          vacancy={vacancy}
          onClose={() => setShowEditModal(false)}
          onSave={(updatedVacancy) => {
            setVacancy(updatedVacancy);
            setShowEditModal(false);
          }}
        />
      )}

      {/* Tab Navigation */}
      <div style={{
        borderBottom: '1px solid var(--color-border)',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', gap: '32px' }}>
          <button
            onClick={() => setActiveTab('info')}
            style={{
              padding: '12px 0',
              fontSize: '14px',
              fontWeight: activeTab === 'info' ? '600' : '400',
              color: activeTab === 'info' ? 'var(--color-text)' : 'var(--color-text-muted)',
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'info' ? '2px solid var(--color-primary)' : '2px solid transparent',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              outline: 'none'
            }}
            onMouseEnter={(e) => {
              if (activeTab !== 'info') {
                e.currentTarget.style.color = 'var(--color-text)';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== 'info') {
                e.currentTarget.style.color = 'var(--color-text-muted)';
              }
            }}
          >
            Info
          </button>
          
          <button
            onClick={() => setActiveTab('funnel')}
            style={{
              padding: '12px 0',
              fontSize: '14px',
              fontWeight: activeTab === 'funnel' ? '600' : '400',
              color: activeTab === 'funnel' ? 'var(--color-text)' : 'var(--color-text-muted)',
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'funnel' ? '2px solid var(--color-primary)' : '2px solid transparent',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              outline: 'none'
            }}
            onMouseEnter={(e) => {
              if (activeTab !== 'funnel') {
                e.currentTarget.style.color = 'var(--color-text)';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== 'funnel') {
                e.currentTarget.style.color = 'var(--color-text-muted)';
              }
            }}
          >
            Funnel
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
};

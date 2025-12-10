import React, { useState } from 'react';
import { VacancyDetailHeader } from '../components/VacancyDetailHeader';
import { VacancyDetailInfo } from '../components/VacancyDetailInfo';
import { VacancyPipeline } from '../components/VacancyPipeline';
import { vacancies } from '../utils/mockVacancies';

interface VacancyDetailPageProps {
  vacancyId: string;
  onChangePage: (page: 'vacancies') => void;
}

export const VacancyDetailPage: React.FC<VacancyDetailPageProps> = ({ vacancyId, onChangePage }) => {
  const [activeTab, setActiveTab] = useState<'info' | 'funnel'>('funnel');

  // Find the vacancy by ID
  const vacancy = vacancies.find(v => v.id === vacancyId);

  if (!vacancy) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '40px',
        color: '#6b7280',
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
        onClick={() => onChangePage('vacancies')}
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
        ← Terug naar vacatures
      </button>

      {/* Page Title */}
      <h1 style={{
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: '24px'
      }}>
        Vacaturedetails
      </h1>

      {/* Vacancy Header */}
      <VacancyDetailHeader vacancy={vacancy} />

      {/* Tab Navigation */}
      <div style={{
        borderBottom: '1px solid #e5e7eb',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', gap: '32px' }}>
          <button
            onClick={() => setActiveTab('info')}
            style={{
              padding: '12px 0',
              fontSize: '14px',
              fontWeight: activeTab === 'info' ? '600' : '400',
              color: activeTab === 'info' ? '#111827' : '#6b7280',
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'info' ? '2px solid #2563eb' : '2px solid transparent',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              outline: 'none'
            }}
            onMouseEnter={(e) => {
              if (activeTab !== 'info') {
                e.currentTarget.style.color = '#374151';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== 'info') {
                e.currentTarget.style.color = '#6b7280';
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
              color: activeTab === 'funnel' ? '#111827' : '#6b7280',
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'funnel' ? '2px solid #2563eb' : '2px solid transparent',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              outline: 'none'
            }}
            onMouseEnter={(e) => {
              if (activeTab !== 'funnel') {
                e.currentTarget.style.color = '#374151';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== 'funnel') {
                e.currentTarget.style.color = '#6b7280';
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

import { useState } from 'react'
import { MainLayout } from './layout/MainLayout'
import { VacanciesPage } from './pages/VacanciesPage'
import { VacancyDetailPage } from './pages/VacancyDetailPage'
import { CompaniesPage } from './pages/CompaniesPage'
import { CandidatesPage } from './pages/CandidatesPage'
import { CandidateDetailPage } from './pages/CandidateDetailPage'
import { DashboardPage } from './pages/DashboardPage'
import type { CRMPage } from './types'
import './App.css'

// Simple page components

const TalentpoolsPage = () => (
  <div>
    <h1 className="text-2xl font-bold mb-4">Talentpools</h1>
    <p className="text-gray-600">Beheer talent pools.</p>
  </div>
)

const MailboxPage = () => (
  <div>
    <h1 className="text-2xl font-bold mb-4">Mailbox</h1>
    <p className="text-gray-600">Beheer e-mail communicatie.</p>
  </div>
)

const AnalyticsPage = () => (
  <div>
    <h1 className="text-2xl font-bold mb-4">Analytics</h1>
    <p className="text-gray-600">Bekijk statistieken en analyses.</p>
  </div>
)

function App() {
  const [activePage, setActivePage] = useState<CRMPage>('dashboard')
  const [selectedVacancyId, setSelectedVacancyId] = useState<string | null>(null)

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardPage />
      case 'vacancies':
        return <VacanciesPage onChangePage={(vacancyId) => {
          setSelectedVacancyId(vacancyId);
          setActivePage('vacancyDetail');
        }} />
      case 'vacancyDetail':
        return selectedVacancyId ? (
          <VacancyDetailPage 
            vacancyId={selectedVacancyId} 
            onChangePage={() => {
              setSelectedVacancyId(null);
              setActivePage('vacancies');
            }} 
          />
        ) : (
          <div>Geen vacature geselecteerd</div>
        )
      case 'companies':
        return <CompaniesPage onChangePage={() => setActivePage('companyDetail')} />
      case 'companyDetail':
        return <div>Company detail placeholder - handled by CompaniesPage</div>
      case 'candidates':
        return <CandidatesPage onChangePage={() => setActivePage('candidateDetail')} />
      case 'candidateDetail':
        return <CandidateDetailPage onChangePage={() => setActivePage('candidates')} />
      case 'talentpools':
        return <TalentpoolsPage />
      case 'mailbox':
        return <MailboxPage />
      case 'analytics':
        return <AnalyticsPage />
      default:
        return <DashboardPage />
    }
  }

  return (
    <MainLayout 
      activePage={activePage}
      onChangePage={setActivePage}
    >
      {renderPage()}
    </MainLayout>
  )
}

export default App

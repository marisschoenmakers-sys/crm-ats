import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from './layout/MainLayout';
import { DashboardPage } from './pages/DashboardPage';
import { VacanciesPage } from './pages/VacanciesPage';
import { VacancyDetailPage } from './pages/VacancyDetailPage';
import { CompaniesPage } from './pages/CompaniesPage';
import { CompanyDetailPage } from './pages/CompanyDetailPage';
import { CandidatesPage } from './pages/CandidatesPage';
import { CandidateDetailPage } from './pages/CandidateDetailPage';
import { TalentPoolsPage } from './pages/TalentPoolsPage';
import { TalentPoolDetailPage } from './pages/TalentPoolDetailPage';
import { MailboxPage } from './pages/MailboxPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { SettingsPage } from './pages/SettingsPage';
import { SkeletonPage } from './pages/skeletons/SkeletonPage';
import DebugSupabase from './components/DebugSupabase';
import { AdminSeedPage } from './pages/AdminSeedPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      // Dashboard
      { index: true, element: <DashboardPage /> },
      { path: 'dashboard', element: <DashboardPage /> },
      
      // Vacancies
      { path: 'vacancies', element: <VacanciesPage /> },
      { path: 'vacancies/:id', element: <VacancyDetailPage /> },
      
      // Companies
      { path: 'companies', element: <CompaniesPage /> },
      { path: 'companies/:id', element: <CompanyDetailPage /> },
      
      // Candidates
      { path: 'candidates', element: <CandidatesPage /> },
      { path: 'candidates/:id', element: <CandidateDetailPage /> },
      
      // Talent Pools
      { path: 'talentpools', element: <TalentPoolsPage /> },
      { path: 'talentpools/:id', element: <TalentPoolDetailPage /> },
      
      // Mailbox
      { path: 'mailbox', element: <MailboxPage /> },
      
      // Analytics
      { path: 'analytics', element: <AnalyticsPage /> },
      
      // Debug
      { path: 'debug/supabase', element: <DebugSupabase /> },
      
      // Admin
      { path: 'admin/seed', element: <AdminSeedPage /> },
      
      // Settings - main and all subroutes
      { path: 'settings', element: <SettingsPage /> },
      { path: 'settings/account/profile', element: <SettingsPage initialSection="profile" /> },
      { path: 'settings/account/notifications', element: <SettingsPage initialSection="notifications" /> },
      { path: 'settings/company/general', element: <SettingsPage initialSection="company-general" /> },
      { path: 'settings/company/team', element: <SettingsPage initialSection="team" /> },
      { path: 'settings/company/roles', element: <SettingsPage initialSection="roles" /> },
      { path: 'settings/company/locations', element: <SettingsPage initialSection="locations" /> },
      { path: 'settings/workflow/rejection-reasons', element: <SettingsPage initialSection="rejection-reasons" /> },
      { path: 'settings/workflow/tags-sources', element: <SettingsPage initialSection="tags-sources" /> },
      { path: 'settings/workflow/departments', element: <SettingsPage initialSection="departments" /> },
      { path: 'settings/templates/vacancies', element: <SettingsPage initialSection="vacancy-templates" /> },
      { path: 'settings/templates/funnels', element: <SettingsPage initialSection="funnels" /> },
      { path: 'settings/templates/evaluation-forms', element: <SettingsPage initialSection="evaluation-forms" /> },
      { path: 'settings/templates/evaluation-forms/new', element: <SettingsPage initialSection="evaluation-forms" isNewTemplate /> },
      { path: 'settings/templates/evaluation-forms/:id', element: <SettingsPage initialSection="evaluation-forms" /> },
      { path: 'settings/templates/question-lists', element: <SettingsPage initialSection="question-lists" /> },
      { path: 'settings/apps/api-tokens', element: <SettingsPage initialSection="api-tokens" /> },
      
      // Catch-all for undefined routes
      { path: '*', element: <SkeletonPage title="Pagina niet gevonden" description="Deze pagina bestaat niet of is verplaatst." /> },
    ],
  },
]);

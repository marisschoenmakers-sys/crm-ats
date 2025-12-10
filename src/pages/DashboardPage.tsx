import React from 'react';
import { StatCard } from '../components/dashboard/StatCard';
import { MiniFunnel } from '../components/dashboard/MiniFunnel';
import { TaskList } from '../components/dashboard/TaskList';
import { AgendaList } from '../components/dashboard/AgendaList';
import { RecentNotes } from '../components/dashboard/RecentNotes';
import { ActivityTimeline } from '../components/dashboard/ActivityTimeline';
import { 
  BriefcaseIcon,
  UsersIcon,
  CalendarIcon,
  ClockIcon,
  TrendingUpIcon,
  TargetIcon,
  CheckSquareIcon,
  ListIcon,
  RefreshCwIcon,
  FileTextIcon,
  PlusIcon,
  BarChartIcon
} from '../icons/DashboardIcons';
import { 
  dashboardStats, 
  dashboardTasks, 
  dashboardEvents, 
  dashboardNotes, 
  dashboardActivities 
} from '../utils/mockDashboard';

export const DashboardPage: React.FC = () => {
  // Get current date for welcome message
  const getCurrentDate = () => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date().toLocaleDateString('nl-NL', options);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Goedemorgen';
    if (hour < 18) return 'Goedemiddag';
    return 'Goedenavond';
  };

  const iconStyle = {
    width: '20px',
    height: '20px',
    color: '#64748b'
  };

  return (
    <div style={{
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
      padding: '24px'
    }}>
      {/* Welcome Header */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '32px',
        marginBottom: '32px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
        border: '1px solid #f1f5f9'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h1 style={{
              fontSize: '32px',
              fontWeight: '700',
              color: '#1e293b',
              marginBottom: '8px',
              margin: 0
            }}>
              {getGreeting()}
            </h1>
            <p style={{
              fontSize: '16px',
              color: '#64748b',
              margin: 0,
              fontWeight: '400'
            }}>
              {getCurrentDate()} • Welkom terug bij uw CRM-ATS dashboard
            </p>
          </div>
          
          {/* Quick Actions */}
          <div style={{
            display: 'flex',
            gap: '12px'
          }}>
            <button style={{
              padding: '12px 20px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease'
            }}>
              <PlusIcon style={{ width: '16px', height: '16px', color: 'white' }} />
              Nieuwe vacature
            </button>
            <button style={{
              padding: '12px 20px',
              backgroundColor: 'white',
              color: '#475569',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease'
            }}>
              <BarChartIcon style={{ width: '16px', height: '16px', color: '#475569' }} />
              Rapportage
            </button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div style={{
        marginBottom: '32px'
      }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: '600',
          color: '#1e293b',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <TrendingUpIcon style={iconStyle} />
          Overzicht
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px'
        }}>
          <StatCard
            label="Openstaande vacatures"
            value={dashboardStats.openVacancies}
            icon={<BriefcaseIcon style={{ width: '48px', height: '48px', color: '#1e293b', opacity: 0.1 }} />}
          />
          <StatCard
            label="Actieve kandidaten"
            value={dashboardStats.activeCandidates}
            icon={<UsersIcon style={{ width: '48px', height: '48px', color: '#1e293b', opacity: 0.1 }} />}
          />
          <StatCard
            label="Interviews deze week"
            value={dashboardStats.interviewsThisWeek}
            icon={<CalendarIcon style={{ width: '48px', height: '48px', color: '#1e293b', opacity: 0.1 }} />}
          />
          <StatCard
            label="Gem. time-to-hire"
            value={dashboardStats.avgTimeToHire}
            icon={<ClockIcon style={{ width: '48px', height: '48px', color: '#1e293b', opacity: 0.1 }} />}
          />
        </div>
      </div>

      {/* Main Content Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '32px',
        marginBottom: '32px'
      }}>
        {/* Left Column - Funnel & Tasks */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '32px'
        }}>
          {/* Recruitment Funnel */}
          <div>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#1e293b',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <TargetIcon style={iconStyle} />
              Recruitment Funnel
            </h2>
            <MiniFunnel />
          </div>

          {/* Recent Activities */}
          <div>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#1e293b',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <RefreshCwIcon style={iconStyle} />
              Recente Activiteiten
            </h2>
            <ActivityTimeline activities={dashboardActivities} />
          </div>
        </div>

        {/* Right Column - Tasks & Agenda */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '32px'
        }}>
          {/* Tasks */}
          <div>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#1e293b',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <CheckSquareIcon style={iconStyle} />
              Taken
            </h2>
            <TaskList tasks={dashboardTasks} />
          </div>

          {/* Agenda */}
          <div>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#1e293b',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <ListIcon style={iconStyle} />
              Agenda
            </h2>
            <AgendaList events={dashboardEvents} />
          </div>
        </div>
      </div>

      {/* Bottom Section - Notes */}
      <div>
        <h2 style={{
          fontSize: '20px',
          fontWeight: '600',
          color: '#1e293b',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <FileTextIcon style={iconStyle} />
          Recent Notities
        </h2>
        <RecentNotes notes={dashboardNotes} />
      </div>
    </div>
  );
};

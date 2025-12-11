import React, { useState, useEffect } from 'react';
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
import { getPendingTasks, updateTask } from '../api/tasks';
import { getUpcomingEvents } from '../api/calendar';
import { 
  dashboardStats, 
  dashboardNotes, 
  dashboardActivities 
} from '../utils/mockDashboard';
import type { DashboardTask, DashboardEvent } from '../types/dashboard';

export const DashboardPage: React.FC = () => {
  const [tasks, setTasks] = useState<DashboardTask[]>([]);
  const [events, setEvents] = useState<DashboardEvent[]>([]);

  // Load tasks and events from Supabase
  useEffect(() => {
    async function loadData() {
      // Load tasks
      const { data: tasksData } = await getPendingTasks(10);
      if (tasksData) {
        const formattedTasks: DashboardTask[] = tasksData.map((t: any) => ({
          id: t.id,
          title: t.title,
          dueDate: t.due_date ? formatDueDate(t.due_date) : 'Geen deadline',
          completed: t.status === 'completed',
          priority: t.priority
        }));
        setTasks(formattedTasks);
      }

      // Load events
      const { data: eventsData } = await getUpcomingEvents(5);
      if (eventsData) {
        const formattedEvents: DashboardEvent[] = eventsData.map((e: any) => ({
          id: e.id,
          title: e.title,
          date: formatEventDate(e.start_time),
          time: formatEventTime(e.start_time),
          type: e.event_type || 'other',
          location: e.location || ''
        }));
        setEvents(formattedEvents);
      }
    }
    loadData();
  }, []);

  // Helper to format due date
  const formatDueDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) return 'Vandaag';
    if (date.toDateString() === tomorrow.toDateString()) return 'Morgen';
    return date.toLocaleDateString('nl-NL', { weekday: 'short', day: 'numeric', month: 'short' });
  };

  // Helper to format event date
  const formatEventDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) return 'Vandaag';
    if (date.toDateString() === tomorrow.toDateString()) return 'Morgen';
    return date.toLocaleDateString('nl-NL', { weekday: 'short', day: 'numeric', month: 'short' });
  };

  // Helper to format event time
  const formatEventTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' });
  };

  // Handle task completion toggle
  const handleTaskToggle = async (taskId: string, completed: boolean) => {
    await updateTask(taskId, { status: completed ? 'completed' : 'todo' });
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, completed } : t));
  };

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
    color: 'var(--color-text-muted)'
  };

  return (
    <div style={{
      backgroundColor: 'var(--color-bg-secondary)',
      minHeight: '100vh',
      padding: '24px'
    }}>
      {/* Welcome Header */}
      <div style={{
        backgroundColor: 'var(--color-card-bg)',
        borderRadius: '16px',
        padding: '32px',
        marginBottom: '32px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
        border: '1px solid var(--color-border)'
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
              color: 'var(--color-text)',
              marginBottom: '8px',
              margin: 0
            }}>
              {getGreeting()}
            </h1>
            <p style={{
              fontSize: '16px',
              color: 'var(--color-text-muted)',
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
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-sidebar-text)',
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
              <PlusIcon style={{ width: '16px', height: '16px', color: 'var(--color-sidebar-text)' }} />
              Nieuwe vacature
            </button>
            <button style={{
              padding: '12px 20px',
              backgroundColor: 'var(--color-card-bg)',
              color: 'var(--color-text)',
              border: '1px solid var(--color-border)',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease'
            }}>
              <BarChartIcon style={{ width: '16px', height: '16px', color: 'var(--color-text-muted)' }} />
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
          color: 'var(--color-text)',
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
            icon={<BriefcaseIcon style={{ width: '48px', height: '48px', color: 'var(--color-text)', opacity: 0.1 }} />}
          />
          <StatCard
            label="Actieve kandidaten"
            value={dashboardStats.activeCandidates}
            icon={<UsersIcon style={{ width: '48px', height: '48px', color: 'var(--color-text)', opacity: 0.1 }} />}
          />
          <StatCard
            label="Interviews deze week"
            value={dashboardStats.interviewsThisWeek}
            icon={<CalendarIcon style={{ width: '48px', height: '48px', color: 'var(--color-text)', opacity: 0.1 }} />}
          />
          <StatCard
            label="Gem. time-to-hire"
            value={dashboardStats.avgTimeToHire}
            icon={<ClockIcon style={{ width: '48px', height: '48px', color: 'var(--color-text)', opacity: 0.1 }} />}
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
              color: 'var(--color-text)',
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
              color: 'var(--color-text)',
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
              color: 'var(--color-text)',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <CheckSquareIcon style={iconStyle} />
              Taken
            </h2>
            <TaskList tasks={tasks} />
          </div>

          {/* Agenda */}
          <div>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: 'var(--color-text)',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <ListIcon style={iconStyle} />
              Agenda
            </h2>
            <AgendaList events={events} />
          </div>
        </div>
      </div>

      {/* Bottom Section - Notes */}
      <div>
        <h2 style={{
          fontSize: '20px',
          fontWeight: '600',
          color: 'var(--color-text)',
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

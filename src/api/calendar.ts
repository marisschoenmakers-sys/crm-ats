import { supabase } from '../lib/supabase';

// ============================================
// CALENDAR EVENTS (AGENDA)
// ============================================

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  start_time: string;
  end_time: string;
  event_type: 'interview' | 'meeting' | 'call' | 'other';
  location?: string;
  candidate_id?: string;
  vacancy_id?: string;
  attendees?: string[];
  is_completed: boolean;
  created_at: string;
  updated_at: string;
}

export async function getCalendarEvents() {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };
  
  return supabase
    .from('calendar_events')
    .select('*')
    .order('start_time', { ascending: true });
}

export async function getCalendarEventsByDateRange(startDate: string, endDate: string) {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };
  
  return supabase
    .from('calendar_events')
    .select('*')
    .gte('start_time', startDate)
    .lte('start_time', endDate)
    .order('start_time', { ascending: true });
}

export async function getUpcomingEvents(limit: number = 5) {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };
  
  const now = new Date().toISOString();
  return supabase
    .from('calendar_events')
    .select('*')
    .gte('start_time', now)
    .eq('is_completed', false)
    .order('start_time', { ascending: true })
    .limit(limit);
}

export async function createCalendarEvent(event: Omit<CalendarEvent, 'id' | 'created_at' | 'updated_at'>) {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };
  
  return supabase
    .from('calendar_events')
    .insert(event)
    .select()
    .single();
}

export async function updateCalendarEvent(id: string, updates: Partial<CalendarEvent>) {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };
  
  return supabase
    .from('calendar_events')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
}

export async function deleteCalendarEvent(id: string) {
  if (!supabase) return { error: new Error('Supabase not configured') };
  
  return supabase
    .from('calendar_events')
    .delete()
    .eq('id', id);
}

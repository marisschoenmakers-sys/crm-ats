import { supabase } from '../lib/supabase';

// ============================================
// TASKS (TAKEN)
// ============================================

export interface Task {
  id: string;
  title: string;
  description?: string;
  due_date?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in_progress' | 'completed';
  assigned_to?: string;
  candidate_id?: string;
  vacancy_id?: string;
  company_id?: string;
  created_at: string;
  updated_at: string;
}

export async function getTasks() {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };
  
  return supabase
    .from('tasks')
    .select('*')
    .order('due_date', { ascending: true });
}

export async function getTasksByStatus(status: 'todo' | 'in_progress' | 'completed') {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };
  
  return supabase
    .from('tasks')
    .select('*')
    .eq('status', status)
    .order('due_date', { ascending: true });
}

export async function getPendingTasks(limit: number = 10) {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };
  
  return supabase
    .from('tasks')
    .select('*')
    .neq('status', 'completed')
    .order('due_date', { ascending: true })
    .limit(limit);
}

export async function createTask(task: {
  title: string;
  description?: string;
  due_date?: string;
  priority?: 'low' | 'medium' | 'high';
  status?: 'todo' | 'in_progress' | 'completed';
  assigned_to?: string;
  candidate_id?: string;
  vacancy_id?: string;
  company_id?: string;
}) {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };
  
  return supabase
    .from('tasks')
    .insert(task as any)
    .select()
    .single();
}

export async function updateTask(id: string, updates: Partial<Task>) {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };
  
  return supabase
    .from('tasks')
    .update({ ...updates, updated_at: new Date().toISOString() } as any)
    .eq('id', id)
    .select()
    .single();
}

export async function deleteTask(id: string) {
  if (!supabase) return { error: new Error('Supabase not configured') };
  
  return supabase
    .from('tasks')
    .delete()
    .eq('id', id);
}

export async function completeTask(id: string) {
  return updateTask(id, { status: 'completed' });
}

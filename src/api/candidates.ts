import { supabase } from '../lib/supabase';

// ============================================
// CANDIDATES
// ============================================

export async function getCandidates() {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };
  
  return supabase
    .from('candidates')
    .select('*')
    .order('created_at', { ascending: false });
}

export async function getCandidateById(id: string) {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };
  
  return supabase
    .from('candidates')
    .select('*')
    .eq('id', id)
    .single();
}

export async function getCandidateWithDetails(id: string) {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };
  
  return supabase
    .from('candidates')
    .select(`
      *,
      candidate_notes (*),
      candidate_files (*),
      candidate_activity (*),
      candidate_vacancies (
        *,
        vacancy:vacancies (*),
        stage:pipeline_stages (*)
      )
    `)
    .eq('id', id)
    .single();
}

export async function createCandidate(candidate: {
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  location?: string;
  job_title?: string;
  summary?: string;
  source?: string;
  tags?: string[];
}) {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };
  
  return supabase
    .from('candidates')
    .insert(candidate)
    .select()
    .single();
}

export async function updateCandidate(id: string, updates: {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  location?: string;
  job_title?: string;
  summary?: string;
  source?: string;
  tags?: string[];
}) {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };
  
  return supabase
    .from('candidates')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
}

export async function deleteCandidate(id: string) {
  if (!supabase) return { error: new Error('Supabase not configured') };
  
  return supabase
    .from('candidates')
    .delete()
    .eq('id', id);
}

// ============================================
// CANDIDATE NOTES
// ============================================

export async function getCandidateNotes(candidateId: string) {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };
  
  return supabase
    .from('candidate_notes')
    .select('*')
    .eq('candidate_id', candidateId)
    .order('created_at', { ascending: false });
}

export async function createCandidateNote(note: {
  candidate_id: string;
  author: string;
  content: string;
}) {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };
  
  return supabase
    .from('candidate_notes')
    .insert(note)
    .select()
    .single();
}

// ============================================
// CANDIDATE FILES
// ============================================

export async function getCandidateFiles(candidateId: string) {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };
  
  return supabase
    .from('candidate_files')
    .select('*')
    .eq('candidate_id', candidateId)
    .order('uploaded_at', { ascending: false });
}

export async function createCandidateFile(file: {
  candidate_id: string;
  file_name: string;
  file_url: string;
  file_size?: string;
  file_type?: string;
}) {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };
  
  return supabase
    .from('candidate_files')
    .insert(file)
    .select()
    .single();
}

// ============================================
// CANDIDATE ACTIVITY
// ============================================

export async function getCandidateActivity(candidateId: string) {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };
  
  return supabase
    .from('candidate_activity')
    .select('*')
    .eq('candidate_id', candidateId)
    .order('created_at', { ascending: false });
}

export async function createCandidateActivity(activity: {
  candidate_id: string;
  type: 'note' | 'file' | 'status' | 'evaluation' | 'email' | 'call' | 'meeting' | 'other';
  description: string;
  metadata?: Record<string, unknown>;
}) {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };
  
  return supabase
    .from('candidate_activity')
    .insert(activity)
    .select()
    .single();
}

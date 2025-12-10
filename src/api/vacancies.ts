import { supabase } from '../lib/supabase';

// ============================================
// VACANCIES
// ============================================

export async function getVacancies() {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };
  
  return supabase
    .from('vacancies')
    .select('*')
    .order('created_at', { ascending: false });
}

export async function getVacancyById(id: string) {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };
  
  return supabase
    .from('vacancies')
    .select('*')
    .eq('id', id)
    .single();
}

export async function getVacancyWithCandidates(id: string) {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };
  
  return supabase
    .from('vacancies')
    .select(`
      *,
      candidate_vacancies (
        *,
        candidate:candidates (*),
        stage:pipeline_stages (*)
      )
    `)
    .eq('id', id)
    .single();
}

export async function createVacancy(vacancy: {
  title: string;
  company_name: string;
  company_id?: string;
  location?: string;
  employment_type?: string;
  salary_range?: string;
  description?: string;
  requirements?: string[];
  sector?: string;
  priority?: 'Laag' | 'Middel' | 'Hoog';
  status?: 'Actief' | 'Gesloten' | 'Concept';
}) {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };
  
  return supabase
    .from('vacancies')
    .insert(vacancy)
    .select()
    .single();
}

export async function updateVacancy(id: string, updates: {
  title?: string;
  company_name?: string;
  company_id?: string;
  location?: string;
  employment_type?: string;
  salary_range?: string;
  description?: string;
  requirements?: string[];
  sector?: string;
  priority?: 'Laag' | 'Middel' | 'Hoog';
  status?: 'Actief' | 'Gesloten' | 'Concept';
}) {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };
  
  return supabase
    .from('vacancies')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
}

export async function deleteVacancy(id: string) {
  if (!supabase) return { error: new Error('Supabase not configured') };
  
  return supabase
    .from('vacancies')
    .delete()
    .eq('id', id);
}

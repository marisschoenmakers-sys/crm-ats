import { supabase } from '../lib/supabase';

// ============================================
// PIPELINE STAGES
// ============================================

export async function getStages() {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };
  
  return supabase
    .from('pipeline_stages')
    .select('*')
    .eq('is_active', true)
    .order('order_index', { ascending: true });
}

// ============================================
// CANDIDATE-VACANCY PIPELINE
// ============================================

export async function getCandidateVacancies(candidateId: string) {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };
  
  return supabase
    .from('candidate_vacancies')
    .select(`
      *,
      vacancy:vacancies (*),
      stage:pipeline_stages (*)
    `)
    .eq('candidate_id', candidateId);
}

export async function getVacancyCandidates(vacancyId: string) {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };
  
  return supabase
    .from('candidate_vacancies')
    .select(`
      *,
      candidate:candidates (*),
      stage:pipeline_stages (*)
    `)
    .eq('vacancy_id', vacancyId);
}

export async function addCandidateToVacancy(data: {
  candidate_id: string;
  vacancy_id: string;
  stage_id: string;
}) {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };
  
  return supabase
    .from('candidate_vacancies')
    .insert(data)
    .select()
    .single();
}

export async function moveCandidateStage(
  candidateVacancyId: string,
  newStageId: string,
  changedBy?: string,
  notes?: string
) {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };
  
  // Get current stage
  const { data: current } = await supabase
    .from('candidate_vacancies')
    .select('stage_id')
    .eq('id', candidateVacancyId)
    .single();
  
  // Update stage
  const { data, error } = await supabase
    .from('candidate_vacancies')
    .update({ stage_id: newStageId })
    .eq('id', candidateVacancyId)
    .select()
    .single();
  
  if (error) return { data: null, error };
  
  // Log history
  await supabase
    .from('candidate_stage_history')
    .insert({
      candidate_vacancy_id: candidateVacancyId,
      from_stage_id: current?.stage_id || null,
      to_stage_id: newStageId,
      changed_by: changedBy,
      notes
    });
  
  return { data, error: null };
}

export async function removeCandidateFromVacancy(candidateVacancyId: string) {
  if (!supabase) return { error: new Error('Supabase not configured') };
  
  return supabase
    .from('candidate_vacancies')
    .delete()
    .eq('id', candidateVacancyId);
}

// ============================================
// STAGE HISTORY
// ============================================

export async function getStageHistory(candidateVacancyId: string) {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };
  
  return supabase
    .from('candidate_stage_history')
    .select(`
      *,
      from_stage:pipeline_stages!from_stage_id (*),
      to_stage:pipeline_stages!to_stage_id (*)
    `)
    .eq('candidate_vacancy_id', candidateVacancyId)
    .order('created_at', { ascending: false });
}

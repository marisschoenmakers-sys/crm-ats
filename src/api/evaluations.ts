import { supabase } from '../lib/supabase';

// ============================================
// EVALUATION TEMPLATES
// ============================================

export async function getTemplates() {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };
  
  return supabase
    .from('evaluation_templates')
    .select('*')
    .eq('is_active', true)
    .order('name', { ascending: true });
}

export async function getTemplateById(id: string) {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };
  
  return supabase
    .from('evaluation_templates')
    .select(`
      *,
      evaluation_template_sections (
        *,
        evaluation_questions (*)
      )
    `)
    .eq('id', id)
    .single();
}

export async function createTemplate(template: {
  name: string;
  description?: string;
  category?: string;
  is_active?: boolean;
}) {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };
  
  return supabase
    .from('evaluation_templates')
    .insert(template)
    .select()
    .single();
}

export async function createTemplateSection(section: {
  template_id: string;
  title: string;
  description?: string;
  order_index: number;
}) {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };
  
  return supabase
    .from('evaluation_template_sections')
    .insert(section)
    .select()
    .single();
}

export async function createQuestion(question: {
  section_id: string;
  template_id: string;
  type: 'text' | 'scorecard' | 'single_choice' | 'multiple_choice' | 'yes_no' | 'dropdown' | 'file_upload' | 'info_box';
  label: string;
  description?: string;
  is_required?: boolean;
  options?: unknown[];
  max_score?: number;
  order_index: number;
}) {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };
  
  return supabase
    .from('evaluation_questions')
    .insert(question)
    .select()
    .single();
}

// ============================================
// CANDIDATE EVALUATIONS
// ============================================

export async function getCandidateEvaluations(candidateId: string) {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };
  
  return supabase
    .from('candidate_evaluation_forms')
    .select(`
      *,
      template:evaluation_templates (*),
      vacancy:vacancies (*)
    `)
    .eq('candidate_id', candidateId)
    .order('created_at', { ascending: false });
}

export async function createEvaluationForm(form: {
  candidate_id: string;
  vacancy_id?: string;
  template_id?: string;
  evaluator: string;
  status?: 'draft' | 'completed';
}) {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };
  
  return supabase
    .from('candidate_evaluation_forms')
    .insert(form)
    .select()
    .single();
}

export async function updateEvaluationForm(id: string, updates: {
  status?: 'draft' | 'completed';
  final_score?: number;
  final_comment?: string;
  completed_at?: string;
}) {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };
  
  return supabase
    .from('candidate_evaluation_forms')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
}

export async function saveEvaluationAnswer(answer: {
  evaluation_form_id: string;
  question_id: string;
  answer_value: unknown;
  score?: number;
}) {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };
  
  return supabase
    .from('candidate_evaluation_answers')
    .upsert(answer, { onConflict: 'evaluation_form_id,question_id' })
    .select()
    .single();
}

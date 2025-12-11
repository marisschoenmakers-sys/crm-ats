import { supabase } from '../lib/supabase';

// ============================================
// ACTIVITY TRACKING
// ============================================

export type ActivityType = 
  | 'vacancy_created'
  | 'vacancy_updated'
  | 'vacancy_deleted'
  | 'candidate_created'
  | 'candidate_updated'
  | 'candidate_deleted'
  | 'candidate_stage_changed'
  | 'note_added'
  | 'evaluation_completed'
  | 'task_created'
  | 'task_completed'
  | 'email_sent'
  | 'event_created'
  | 'company_created'
  | 'company_updated'
  | 'file_uploaded';

export interface Activity {
  id: string;
  activity_type: ActivityType;
  title: string;
  description?: string;
  user_name: string;
  entity_type?: string;
  entity_id?: string;
  entity_name?: string;
  metadata?: Record<string, any>;
  created_at: string;
}

export async function getActivities(limit: number = 20) {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };
  
  return supabase
    .from('activities')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);
}

export async function getRecentActivities(limit: number = 10) {
  return getActivities(limit);
}

export async function logActivity(activity: {
  activity_type: ActivityType;
  title: string;
  description?: string;
  user_name?: string;
  entity_type?: string;
  entity_id?: string;
  entity_name?: string;
  metadata?: Record<string, any>;
}) {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };
  
  return supabase
    .from('activities')
    .insert({
      ...activity,
      user_name: activity.user_name || 'Maris' // TODO: Get from auth
    } as any)
    .select()
    .single();
}

// Helper functions for common activities
export async function logVacancyCreated(vacancyId: string, vacancyTitle: string) {
  return logActivity({
    activity_type: 'vacancy_created',
    title: 'Vacature aangemaakt',
    description: vacancyTitle,
    entity_type: 'vacancy',
    entity_id: vacancyId,
    entity_name: vacancyTitle
  });
}

export async function logVacancyUpdated(vacancyId: string, vacancyTitle: string) {
  return logActivity({
    activity_type: 'vacancy_updated',
    title: 'Vacature bijgewerkt',
    description: vacancyTitle,
    entity_type: 'vacancy',
    entity_id: vacancyId,
    entity_name: vacancyTitle
  });
}

export async function logCandidateCreated(candidateId: string, candidateName: string) {
  return logActivity({
    activity_type: 'candidate_created',
    title: 'Kandidaat toegevoegd',
    description: candidateName,
    entity_type: 'candidate',
    entity_id: candidateId,
    entity_name: candidateName
  });
}

export async function logCandidateStageChanged(candidateId: string, candidateName: string, newStage: string) {
  return logActivity({
    activity_type: 'candidate_stage_changed',
    title: 'Kandidaat verplaatst',
    description: `${candidateName} → ${newStage}`,
    entity_type: 'candidate',
    entity_id: candidateId,
    entity_name: candidateName,
    metadata: { new_stage: newStage }
  });
}

export async function logNoteAdded(entityType: string, entityId: string, entityName: string) {
  return logActivity({
    activity_type: 'note_added',
    title: 'Notitie geplaatst',
    description: `Bij ${entityName}`,
    entity_type: entityType,
    entity_id: entityId,
    entity_name: entityName
  });
}

export async function logEvaluationCompleted(candidateId: string, candidateName: string, templateName: string) {
  return logActivity({
    activity_type: 'evaluation_completed',
    title: 'Evaluatie ingevuld',
    description: `${candidateName} - ${templateName}`,
    entity_type: 'candidate',
    entity_id: candidateId,
    entity_name: candidateName,
    metadata: { template_name: templateName }
  });
}

export async function logTaskCreated(taskId: string, taskTitle: string) {
  return logActivity({
    activity_type: 'task_created',
    title: 'Taak aangemaakt',
    description: taskTitle,
    entity_type: 'task',
    entity_id: taskId,
    entity_name: taskTitle
  });
}

export async function logTaskCompleted(taskId: string, taskTitle: string) {
  return logActivity({
    activity_type: 'task_completed',
    title: 'Taak voltooid',
    description: taskTitle,
    entity_type: 'task',
    entity_id: taskId,
    entity_name: taskTitle
  });
}

export async function logCompanyCreated(companyId: string, companyName: string) {
  return logActivity({
    activity_type: 'company_created',
    title: 'Bedrijf toegevoegd',
    description: companyName,
    entity_type: 'company',
    entity_id: companyId,
    entity_name: companyName
  });
}

export async function logFileUploaded(entityType: string, entityId: string, fileName: string) {
  return logActivity({
    activity_type: 'file_uploaded',
    title: 'Bestand geüpload',
    description: fileName,
    entity_type: entityType,
    entity_id: entityId,
    entity_name: fileName
  });
}

export async function logEmailSent(recipientName: string, subject: string) {
  return logActivity({
    activity_type: 'email_sent',
    title: 'E-mail verzonden',
    description: `Naar ${recipientName}: ${subject}`,
    entity_type: 'email',
    entity_name: subject
  });
}

export async function logEventCreated(eventId: string, eventTitle: string) {
  return logActivity({
    activity_type: 'event_created',
    title: 'Agenda item aangemaakt',
    description: eventTitle,
    entity_type: 'event',
    entity_id: eventId,
    entity_name: eventTitle
  });
}

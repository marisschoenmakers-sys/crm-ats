import { supabase } from '../lib/supabase';

// ============================================
// EMAILS (MAILBOX)
// ============================================

export interface Email {
  id: string;
  subject: string;
  body: string;
  from_email: string;
  from_name: string;
  to_email: string;
  to_name?: string;
  folder: 'inbox' | 'sent' | 'drafts' | 'trash' | 'archive';
  is_read: boolean;
  is_starred: boolean;
  candidate_id?: string;
  vacancy_id?: string;
  received_at: string;
  created_at: string;
}

export async function getEmails(folder?: string) {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };
  
  let query = supabase
    .from('emails')
    .select('*')
    .order('received_at', { ascending: false });
  
  if (folder) {
    query = query.eq('folder', folder);
  }
  
  return query;
}

export async function getEmailById(id: string) {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };
  
  return supabase
    .from('emails')
    .select('*')
    .eq('id', id)
    .single();
}

export async function getUnreadCount() {
  if (!supabase) return { count: 0, error: new Error('Supabase not configured') };
  
  const { count, error } = await supabase
    .from('emails')
    .select('*', { count: 'exact', head: true })
    .eq('folder', 'inbox')
    .eq('is_read', false);
  
  return { count: count || 0, error };
}

export async function createEmail(email: {
  subject: string;
  body: string;
  from_email: string;
  from_name: string;
  to_email: string;
  to_name?: string;
  folder?: 'inbox' | 'sent' | 'drafts' | 'trash' | 'archive';
  is_read?: boolean;
  is_starred?: boolean;
  candidate_id?: string;
  vacancy_id?: string;
  received_at?: string;
}) {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };
  
  return supabase
    .from('emails')
    .insert({
      ...email,
      folder: email.folder || 'inbox',
      is_read: email.is_read ?? false,
      is_starred: email.is_starred ?? false,
      received_at: email.received_at || new Date().toISOString(),
    } as any)
    .select()
    .single();
}

export async function updateEmail(id: string, updates: Partial<Email>) {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };
  
  return supabase
    .from('emails')
    .update(updates as any)
    .eq('id', id)
    .select()
    .single();
}

export async function markAsRead(id: string) {
  return updateEmail(id, { is_read: true });
}

export async function markAsUnread(id: string) {
  return updateEmail(id, { is_read: false });
}

export async function toggleStar(id: string, isStarred: boolean) {
  return updateEmail(id, { is_starred: isStarred });
}

export async function moveToFolder(id: string, folder: Email['folder']) {
  return updateEmail(id, { folder });
}

export async function deleteEmail(id: string) {
  if (!supabase) return { error: new Error('Supabase not configured') };
  
  return supabase
    .from('emails')
    .delete()
    .eq('id', id);
}

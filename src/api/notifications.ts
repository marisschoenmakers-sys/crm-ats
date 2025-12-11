import { supabase } from '../lib/supabase';

// ============================================
// NOTIFICATIONS
// ============================================

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'mention' | 'task' | 'reminder' | 'system';
  is_read: boolean;
  link?: string;
  metadata?: Record<string, any>;
  created_at: string;
}

export async function getNotifications(userId?: string) {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };
  
  let query = supabase
    .from('notifications')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (userId) {
    query = query.eq('user_id', userId);
  }
  
  return query;
}

export async function getUnreadNotifications(userId?: string) {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };
  
  let query = supabase
    .from('notifications')
    .select('*')
    .eq('is_read', false)
    .order('created_at', { ascending: false });
  
  if (userId) {
    query = query.eq('user_id', userId);
  }
  
  return query;
}

export async function getUnreadCount(userId?: string) {
  if (!supabase) return { count: 0, error: new Error('Supabase not configured') };
  
  let query = supabase
    .from('notifications')
    .select('*', { count: 'exact', head: true })
    .eq('is_read', false);
  
  if (userId) {
    query = query.eq('user_id', userId);
  }
  
  const { count, error } = await query;
  return { count: count || 0, error };
}

export async function createNotification(notification: {
  user_id: string;
  title: string;
  message: string;
  type?: 'mention' | 'task' | 'reminder' | 'system';
  link?: string;
  metadata?: Record<string, any>;
}) {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };
  
  return supabase
    .from('notifications')
    .insert({
      ...notification,
      type: notification.type || 'system',
      is_read: false
    } as any)
    .select()
    .single();
}

export async function markAsRead(id: string) {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };
  
  return supabase
    .from('notifications')
    .update({ is_read: true } as any)
    .eq('id', id)
    .select()
    .single();
}

export async function markAllAsRead(userId?: string) {
  if (!supabase) return { error: new Error('Supabase not configured') };
  
  let query = supabase
    .from('notifications')
    .update({ is_read: true } as any)
    .eq('is_read', false);
  
  if (userId) {
    query = query.eq('user_id', userId);
  }
  
  return query;
}

export async function deleteNotification(id: string) {
  if (!supabase) return { error: new Error('Supabase not configured') };
  
  return supabase
    .from('notifications')
    .delete()
    .eq('id', id);
}

// Helper function to create a mention notification
export async function notifyMention(
  mentionedUserId: string,
  mentionedByName: string,
  context: string,
  link?: string
) {
  return createNotification({
    user_id: mentionedUserId,
    title: 'Je bent genoemd',
    message: `${mentionedByName} heeft je genoemd: "${context}"`,
    type: 'mention',
    link,
    metadata: { mentioned_by: mentionedByName }
  });
}

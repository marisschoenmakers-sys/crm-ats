import { supabase } from '../lib/supabase';

// ============================================
// COMPANIES
// ============================================

export async function getCompanies() {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };
  
  return supabase
    .from('companies')
    .select('*')
    .order('name', { ascending: true });
}

export async function getCompanyById(id: string) {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };
  
  return supabase
    .from('companies')
    .select(`
      *,
      company_contacts (*),
      company_notes (*),
      vacancies (*)
    `)
    .eq('id', id)
    .single();
}

export async function createCompany(company: {
  name: string;
  industry?: string;
  website?: string;
  location?: string;
  description?: string;
  logo_url?: string;
  priority?: 'Laag' | 'Middel' | 'Hoog';
}) {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };
  
  return supabase
    .from('companies')
    .insert(company)
    .select()
    .single();
}

export async function updateCompany(id: string, updates: {
  name?: string;
  industry?: string;
  website?: string;
  location?: string;
  description?: string;
  logo_url?: string;
  priority?: 'Laag' | 'Middel' | 'Hoog';
}) {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };
  
  return supabase
    .from('companies')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
}

export async function deleteCompany(id: string) {
  if (!supabase) return { error: new Error('Supabase not configured') };
  
  return supabase
    .from('companies')
    .delete()
    .eq('id', id);
}

// ============================================
// COMPANY CONTACTS
// ============================================

export async function getCompanyContacts(companyId: string) {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };
  
  return supabase
    .from('company_contacts')
    .select('*')
    .eq('company_id', companyId)
    .order('is_primary', { ascending: false });
}

export async function createCompanyContact(contact: {
  company_id: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  role?: string;
  is_primary?: boolean;
}) {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };
  
  return supabase
    .from('company_contacts')
    .insert(contact)
    .select()
    .single();
}

// ============================================
// COMPANY NOTES
// ============================================

export async function getCompanyNotes(companyId: string) {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };
  
  return supabase
    .from('company_notes')
    .select('*')
    .eq('company_id', companyId)
    .order('created_at', { ascending: false });
}

export async function createCompanyNote(note: {
  company_id: string;
  author: string;
  content: string;
}) {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };
  
  return supabase
    .from('company_notes')
    .insert(note)
    .select()
    .single();
}

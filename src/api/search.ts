import { supabase } from '../lib/supabase';

export interface SearchResult {
  id: string;
  type: 'candidate' | 'vacancy' | 'company';
  title: string;
  subtitle: string;
  url: string;
}

interface CandidateSearchRow {
  id: string;
  first_name: string;
  last_name: string;
  job_title: string | null;
}

interface VacancySearchRow {
  id: string;
  title: string;
  company_name: string | null;
  location: string | null;
}

interface CompanySearchRow {
  id: string;
  name: string;
  sector: string | null;
}

export async function globalSearch(query: string): Promise<SearchResult[]> {
  if (!supabase || !query.trim() || query.length < 2) {
    return [];
  }

  const searchTerm = `%${query.toLowerCase()}%`;
  const results: SearchResult[] = [];

  try {
    // Search candidates by name
    const { data: candidates } = await supabase
      .from('candidates')
      .select('id, first_name, last_name, job_title')
      .or(`first_name.ilike.${searchTerm},last_name.ilike.${searchTerm}`)
      .limit(5);

    if (candidates) {
      (candidates as CandidateSearchRow[]).forEach(c => {
        results.push({
          id: c.id,
          type: 'candidate',
          title: `${c.first_name} ${c.last_name}`,
          subtitle: c.job_title || 'Kandidaat',
          url: `/candidates/${c.id}`
        });
      });
    }

    // Search vacancies by title or company
    const { data: vacancies } = await supabase
      .from('vacancies')
      .select('id, title, company_name, location')
      .or(`title.ilike.${searchTerm},company_name.ilike.${searchTerm}`)
      .limit(5);

    if (vacancies) {
      (vacancies as VacancySearchRow[]).forEach(v => {
        results.push({
          id: v.id,
          type: 'vacancy',
          title: v.title,
          subtitle: v.company_name || v.location || 'Vacature',
          url: `/vacancies/${v.id}`
        });
      });
    }

    // Search companies by name
    const { data: companies } = await supabase
      .from('companies')
      .select('id, name, sector')
      .ilike('name', searchTerm)
      .limit(5);

    if (companies) {
      (companies as CompanySearchRow[]).forEach(c => {
        results.push({
          id: c.id,
          type: 'company',
          title: c.name,
          subtitle: c.sector || 'Bedrijf',
          url: `/companies/${c.id}`
        });
      });
    }

  } catch (error) {
    console.error('Search error:', error);
  }

  return results;
}

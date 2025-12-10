-- ============================================
-- CRM-ATS COMPLETE DATABASE SCHEMA FOR SUPABASE
-- ============================================
-- Run this in Supabase SQL Editor

BEGIN;

-- ============================================
-- 1. COMPANIES (Bedrijven)
-- ============================================
CREATE TABLE IF NOT EXISTS public.companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  industry VARCHAR(100),
  website VARCHAR(255),
  location VARCHAR(255),
  description TEXT,
  logo_url VARCHAR(500),
  priority VARCHAR(20) DEFAULT 'Middel' CHECK (priority IN ('Laag', 'Middel', 'Hoog')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.company_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(50),
  role VARCHAR(100),
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.company_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  author VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- 2. PIPELINE STAGES (Funnel stappen)
-- ============================================
CREATE TABLE IF NOT EXISTS public.pipeline_stages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  order_index INTEGER NOT NULL,
  color VARCHAR(20),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Insert default stages
INSERT INTO public.pipeline_stages (name, slug, order_index, color) VALUES
  ('Gesolliciteerd', 'gesolliciteerd', 1, '#3b82f6'),
  ('Geen gehoor', 'geen-gehoor', 2, '#6b7280'),
  ('Telefonisch interview', 'telefonisch-interview', 3, '#8b5cf6'),
  ('In afwachting van CV', 'in-afwachting-cv', 4, '#f59e0b'),
  ('Twijfel kandidaat', 'twijfel-kandidaat', 5, '#f97316'),
  ('Nog afwijzen', 'nog-afwijzen', 6, '#ef4444'),
  ('Voorgesteld', 'voorgesteld', 7, '#10b981'),
  ('Afspraak op locatie', 'afspraak-op-locatie', 8, '#06b6d4'),
  ('Aanbod', 'aanbod', 9, '#8b5cf6'),
  ('Aangenomen', 'aangenomen', 10, '#22c55e')
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- 3. VACANCIES (Vacatures)
-- ============================================
CREATE TABLE IF NOT EXISTS public.vacancies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  company_id UUID REFERENCES public.companies(id) ON DELETE SET NULL,
  company_name VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  employment_type VARCHAR(50) DEFAULT 'Fulltime',
  salary_range VARCHAR(100),
  description TEXT,
  requirements TEXT[],
  sector VARCHAR(100),
  priority VARCHAR(20) DEFAULT 'Middel' CHECK (priority IN ('Laag', 'Middel', 'Hoog')),
  status VARCHAR(20) DEFAULT 'Actief' CHECK (status IN ('Actief', 'Gesloten', 'Concept')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- 4. EVALUATION TEMPLATES (Evaluatieformulieren)
-- ============================================
CREATE TABLE IF NOT EXISTS public.evaluation_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.evaluation_template_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id UUID NOT NULL REFERENCES public.evaluation_templates(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.evaluation_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id UUID NOT NULL REFERENCES public.evaluation_template_sections(id) ON DELETE CASCADE,
  template_id UUID NOT NULL REFERENCES public.evaluation_templates(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL CHECK (type IN ('text', 'scorecard', 'single_choice', 'multiple_choice', 'yes_no', 'dropdown', 'file_upload', 'info_box')),
  label TEXT NOT NULL,
  description TEXT,
  is_required BOOLEAN DEFAULT false,
  options JSONB DEFAULT '[]',
  max_score INTEGER DEFAULT 5,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Link vacancies to evaluation templates
CREATE TABLE IF NOT EXISTS public.vacancy_evaluation_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vacancy_id UUID NOT NULL REFERENCES public.vacancies(id) ON DELETE CASCADE,
  template_id UUID NOT NULL REFERENCES public.evaluation_templates(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(vacancy_id, template_id)
);

-- ============================================
-- 5. CANDIDATES (Kandidaten)
-- ============================================
CREATE TABLE IF NOT EXISTS public.candidates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(50),
  location VARCHAR(255),
  job_title VARCHAR(255),
  summary TEXT,
  avatar_url VARCHAR(500),
  source VARCHAR(100),
  linkedin_url VARCHAR(500),
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.candidate_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_id UUID NOT NULL REFERENCES public.candidates(id) ON DELETE CASCADE,
  author VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.candidate_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_id UUID NOT NULL REFERENCES public.candidates(id) ON DELETE CASCADE,
  file_name VARCHAR(255) NOT NULL,
  file_url VARCHAR(500) NOT NULL,
  file_size VARCHAR(50),
  file_type VARCHAR(100),
  uploaded_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.candidate_activity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_id UUID NOT NULL REFERENCES public.candidates(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL CHECK (type IN ('note', 'file', 'status', 'evaluation', 'email', 'call', 'meeting', 'other')),
  description TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- 6. CANDIDATE-VACANCY PIPELINE (Koppeling)
-- ============================================
CREATE TABLE IF NOT EXISTS public.candidate_vacancies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_id UUID NOT NULL REFERENCES public.candidates(id) ON DELETE CASCADE,
  vacancy_id UUID NOT NULL REFERENCES public.vacancies(id) ON DELETE CASCADE,
  stage_id UUID NOT NULL REFERENCES public.pipeline_stages(id) ON DELETE RESTRICT,
  applied_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(candidate_id, vacancy_id)
);

CREATE TABLE IF NOT EXISTS public.candidate_stage_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_vacancy_id UUID NOT NULL REFERENCES public.candidate_vacancies(id) ON DELETE CASCADE,
  from_stage_id UUID REFERENCES public.pipeline_stages(id) ON DELETE SET NULL,
  to_stage_id UUID NOT NULL REFERENCES public.pipeline_stages(id) ON DELETE RESTRICT,
  changed_by VARCHAR(255),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- 7. CANDIDATE EVALUATIONS (Ingevulde evaluaties)
-- ============================================
CREATE TABLE IF NOT EXISTS public.candidate_evaluation_forms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_id UUID NOT NULL REFERENCES public.candidates(id) ON DELETE CASCADE,
  vacancy_id UUID REFERENCES public.vacancies(id) ON DELETE SET NULL,
  template_id UUID REFERENCES public.evaluation_templates(id) ON DELETE SET NULL,
  evaluator VARCHAR(255) NOT NULL,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'completed')),
  final_score DECIMAL(3,1),
  final_comment TEXT,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.candidate_evaluation_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  evaluation_form_id UUID NOT NULL REFERENCES public.candidate_evaluation_forms(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES public.evaluation_questions(id) ON DELETE CASCADE,
  answer_value JSONB NOT NULL,
  score INTEGER,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- 8. TALENT POOLS
-- ============================================
CREATE TABLE IF NOT EXISTS public.talent_pools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  color VARCHAR(20),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.pool_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pool_id UUID NOT NULL REFERENCES public.talent_pools(id) ON DELETE CASCADE,
  candidate_id UUID NOT NULL REFERENCES public.candidates(id) ON DELETE CASCADE,
  added_by VARCHAR(255),
  notes TEXT,
  added_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(pool_id, candidate_id)
);

-- ============================================
-- 9. INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX IF NOT EXISTS idx_candidates_email ON public.candidates(email);
CREATE INDEX IF NOT EXISTS idx_candidates_name ON public.candidates(first_name, last_name);
CREATE INDEX IF NOT EXISTS idx_vacancies_company ON public.vacancies(company_id);
CREATE INDEX IF NOT EXISTS idx_vacancies_status ON public.vacancies(status);
CREATE INDEX IF NOT EXISTS idx_candidate_vacancies_candidate ON public.candidate_vacancies(candidate_id);
CREATE INDEX IF NOT EXISTS idx_candidate_vacancies_vacancy ON public.candidate_vacancies(vacancy_id);
CREATE INDEX IF NOT EXISTS idx_candidate_vacancies_stage ON public.candidate_vacancies(stage_id);
CREATE INDEX IF NOT EXISTS idx_candidate_notes_candidate ON public.candidate_notes(candidate_id);
CREATE INDEX IF NOT EXISTS idx_candidate_files_candidate ON public.candidate_files(candidate_id);
CREATE INDEX IF NOT EXISTS idx_candidate_activity_candidate ON public.candidate_activity(candidate_id);
CREATE INDEX IF NOT EXISTS idx_pool_members_pool ON public.pool_members(pool_id);
CREATE INDEX IF NOT EXISTS idx_pool_members_candidate ON public.pool_members(candidate_id);

-- ============================================
-- 10. UPDATED_AT TRIGGER
-- ============================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers
DROP TRIGGER IF EXISTS update_companies_updated_at ON public.companies;
CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON public.companies FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_vacancies_updated_at ON public.vacancies;
CREATE TRIGGER update_vacancies_updated_at BEFORE UPDATE ON public.vacancies FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_candidates_updated_at ON public.candidates;
CREATE TRIGGER update_candidates_updated_at BEFORE UPDATE ON public.candidates FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_candidate_vacancies_updated_at ON public.candidate_vacancies;
CREATE TRIGGER update_candidate_vacancies_updated_at BEFORE UPDATE ON public.candidate_vacancies FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_evaluation_templates_updated_at ON public.evaluation_templates;
CREATE TRIGGER update_evaluation_templates_updated_at BEFORE UPDATE ON public.evaluation_templates FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_candidate_evaluation_forms_updated_at ON public.candidate_evaluation_forms;
CREATE TRIGGER update_candidate_evaluation_forms_updated_at BEFORE UPDATE ON public.candidate_evaluation_forms FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_talent_pools_updated_at ON public.talent_pools;
CREATE TRIGGER update_talent_pools_updated_at BEFORE UPDATE ON public.talent_pools FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- 11. ROW LEVEL SECURITY (RLS)
-- ============================================
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vacancies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pipeline_stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_vacancies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_stage_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evaluation_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evaluation_template_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evaluation_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vacancy_evaluation_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_evaluation_forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_evaluation_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.talent_pools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pool_members ENABLE ROW LEVEL SECURITY;

-- Policies: Allow all for authenticated users (adjust for production)
CREATE POLICY "Enable all access" ON public.companies FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all access" ON public.company_contacts FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all access" ON public.company_notes FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all access" ON public.vacancies FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all access" ON public.pipeline_stages FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all access" ON public.candidates FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all access" ON public.candidate_notes FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all access" ON public.candidate_files FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all access" ON public.candidate_activity FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all access" ON public.candidate_vacancies FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all access" ON public.candidate_stage_history FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all access" ON public.evaluation_templates FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all access" ON public.evaluation_template_sections FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all access" ON public.evaluation_questions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all access" ON public.vacancy_evaluation_templates FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all access" ON public.candidate_evaluation_forms FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all access" ON public.candidate_evaluation_answers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all access" ON public.talent_pools FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all access" ON public.pool_members FOR ALL USING (true) WITH CHECK (true);

-- ============================================
-- SCHEMA COMPLETE
-- ============================================

COMMIT;

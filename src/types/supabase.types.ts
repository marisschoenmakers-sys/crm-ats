// ============================================
// SUPABASE DATABASE TYPES - AUTO GENERATED STYLE
// ============================================

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      // ============================================
      // COMPANIES
      // ============================================
      companies: {
        Row: {
          id: string
          name: string
          industry: string | null
          website: string | null
          location: string | null
          description: string | null
          logo_url: string | null
          priority: 'Laag' | 'Middel' | 'Hoog'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          industry?: string | null
          website?: string | null
          location?: string | null
          description?: string | null
          logo_url?: string | null
          priority?: 'Laag' | 'Middel' | 'Hoog'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          industry?: string | null
          website?: string | null
          location?: string | null
          description?: string | null
          logo_url?: string | null
          priority?: 'Laag' | 'Middel' | 'Hoog'
          created_at?: string
          updated_at?: string
        }
      }
      company_contacts: {
        Row: {
          id: string
          company_id: string
          first_name: string
          last_name: string
          email: string | null
          phone: string | null
          role: string | null
          is_primary: boolean
          created_at: string
        }
        Insert: {
          id?: string
          company_id: string
          first_name: string
          last_name: string
          email?: string | null
          phone?: string | null
          role?: string | null
          is_primary?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          first_name?: string
          last_name?: string
          email?: string | null
          phone?: string | null
          role?: string | null
          is_primary?: boolean
          created_at?: string
        }
      }
      company_notes: {
        Row: {
          id: string
          company_id: string
          author: string
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          company_id: string
          author: string
          content: string
          created_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          author?: string
          content?: string
          created_at?: string
        }
      }
      // ============================================
      // PIPELINE STAGES
      // ============================================
      pipeline_stages: {
        Row: {
          id: string
          name: string
          slug: string
          order_index: number
          color: string | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          order_index: number
          color?: string | null
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          order_index?: number
          color?: string | null
          is_active?: boolean
          created_at?: string
        }
      }
      // ============================================
      // VACANCIES
      // ============================================
      vacancies: {
        Row: {
          id: string
          title: string
          company_id: string | null
          company_name: string
          location: string | null
          employment_type: string
          salary_range: string | null
          description: string | null
          requirements: string[] | null
          sector: string | null
          priority: 'Laag' | 'Middel' | 'Hoog'
          status: 'Actief' | 'Gesloten' | 'Concept'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          company_id?: string | null
          company_name: string
          location?: string | null
          employment_type?: string
          salary_range?: string | null
          description?: string | null
          requirements?: string[] | null
          sector?: string | null
          priority?: 'Laag' | 'Middel' | 'Hoog'
          status?: 'Actief' | 'Gesloten' | 'Concept'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          company_id?: string | null
          company_name?: string
          location?: string | null
          employment_type?: string
          salary_range?: string | null
          description?: string | null
          requirements?: string[] | null
          sector?: string | null
          priority?: 'Laag' | 'Middel' | 'Hoog'
          status?: 'Actief' | 'Gesloten' | 'Concept'
          created_at?: string
          updated_at?: string
        }
      }
      vacancy_evaluation_templates: {
        Row: {
          id: string
          vacancy_id: string
          template_id: string
          created_at: string
        }
        Insert: {
          id?: string
          vacancy_id: string
          template_id: string
          created_at?: string
        }
        Update: {
          id?: string
          vacancy_id?: string
          template_id?: string
          created_at?: string
        }
      }
      // ============================================
      // CANDIDATES
      // ============================================
      candidates: {
        Row: {
          id: string
          first_name: string
          last_name: string
          email: string | null
          phone: string | null
          location: string | null
          job_title: string | null
          summary: string | null
          avatar_url: string | null
          source: string | null
          linkedin_url: string | null
          tags: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          first_name: string
          last_name: string
          email?: string | null
          phone?: string | null
          location?: string | null
          current_role?: string | null
          summary?: string | null
          avatar_url?: string | null
          source?: string | null
          linkedin_url?: string | null
          tags?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          email?: string | null
          phone?: string | null
          location?: string | null
          current_role?: string | null
          summary?: string | null
          avatar_url?: string | null
          source?: string | null
          linkedin_url?: string | null
          tags?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      candidate_notes: {
        Row: {
          id: string
          candidate_id: string
          author: string
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          candidate_id: string
          author: string
          content: string
          created_at?: string
        }
        Update: {
          id?: string
          candidate_id?: string
          author?: string
          content?: string
          created_at?: string
        }
      }
      candidate_files: {
        Row: {
          id: string
          candidate_id: string
          file_name: string
          file_url: string
          file_size: string | null
          file_type: string | null
          uploaded_at: string
        }
        Insert: {
          id?: string
          candidate_id: string
          file_name: string
          file_url: string
          file_size?: string | null
          file_type?: string | null
          uploaded_at?: string
        }
        Update: {
          id?: string
          candidate_id?: string
          file_name?: string
          file_url?: string
          file_size?: string | null
          file_type?: string | null
          uploaded_at?: string
        }
      }
      candidate_activity: {
        Row: {
          id: string
          candidate_id: string
          type: 'note' | 'file' | 'status' | 'evaluation' | 'email' | 'call' | 'meeting' | 'other'
          description: string
          metadata: Json
          created_at: string
        }
        Insert: {
          id?: string
          candidate_id: string
          type: 'note' | 'file' | 'status' | 'evaluation' | 'email' | 'call' | 'meeting' | 'other'
          description: string
          metadata?: Json
          created_at?: string
        }
        Update: {
          id?: string
          candidate_id?: string
          type?: 'note' | 'file' | 'status' | 'evaluation' | 'email' | 'call' | 'meeting' | 'other'
          description?: string
          metadata?: Json
          created_at?: string
        }
      }
      // ============================================
      // CANDIDATE-VACANCY PIPELINE
      // ============================================
      candidate_vacancies: {
        Row: {
          id: string
          candidate_id: string
          vacancy_id: string
          stage_id: string
          applied_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          candidate_id: string
          vacancy_id: string
          stage_id: string
          applied_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          candidate_id?: string
          vacancy_id?: string
          stage_id?: string
          applied_at?: string
          updated_at?: string
        }
      }
      candidate_stage_history: {
        Row: {
          id: string
          candidate_vacancy_id: string
          from_stage_id: string | null
          to_stage_id: string
          changed_by: string | null
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          candidate_vacancy_id: string
          from_stage_id?: string | null
          to_stage_id: string
          changed_by?: string | null
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          candidate_vacancy_id?: string
          from_stage_id?: string | null
          to_stage_id?: string
          changed_by?: string | null
          notes?: string | null
          created_at?: string
        }
      }
      // ============================================
      // EVALUATION TEMPLATES
      // ============================================
      evaluation_templates: {
        Row: {
          id: string
          name: string
          description: string | null
          category: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          category?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          category?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      evaluation_template_sections: {
        Row: {
          id: string
          template_id: string
          title: string
          description: string | null
          order_index: number
          created_at: string
        }
        Insert: {
          id?: string
          template_id: string
          title: string
          description?: string | null
          order_index?: number
          created_at?: string
        }
        Update: {
          id?: string
          template_id?: string
          title?: string
          description?: string | null
          order_index?: number
          created_at?: string
        }
      }
      evaluation_questions: {
        Row: {
          id: string
          section_id: string
          template_id: string
          type: 'text' | 'scorecard' | 'single_choice' | 'multiple_choice' | 'yes_no' | 'dropdown' | 'file_upload' | 'info_box'
          label: string
          description: string | null
          is_required: boolean
          options: Json
          max_score: number
          order_index: number
          created_at: string
        }
        Insert: {
          id?: string
          section_id: string
          template_id: string
          type: 'text' | 'scorecard' | 'single_choice' | 'multiple_choice' | 'yes_no' | 'dropdown' | 'file_upload' | 'info_box'
          label: string
          description?: string | null
          is_required?: boolean
          options?: Json
          max_score?: number
          order_index?: number
          created_at?: string
        }
        Update: {
          id?: string
          section_id?: string
          template_id?: string
          type?: 'text' | 'scorecard' | 'single_choice' | 'multiple_choice' | 'yes_no' | 'dropdown' | 'file_upload' | 'info_box'
          label?: string
          description?: string | null
          is_required?: boolean
          options?: Json
          max_score?: number
          order_index?: number
          created_at?: string
        }
      }
      // ============================================
      // CANDIDATE EVALUATIONS
      // ============================================
      candidate_evaluation_forms: {
        Row: {
          id: string
          candidate_id: string
          vacancy_id: string | null
          template_id: string | null
          evaluator: string
          status: 'draft' | 'completed'
          final_score: number | null
          final_comment: string | null
          completed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          candidate_id: string
          vacancy_id?: string | null
          template_id?: string | null
          evaluator: string
          status?: 'draft' | 'completed'
          final_score?: number | null
          final_comment?: string | null
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          candidate_id?: string
          vacancy_id?: string | null
          template_id?: string | null
          evaluator?: string
          status?: 'draft' | 'completed'
          final_score?: number | null
          final_comment?: string | null
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      candidate_evaluation_answers: {
        Row: {
          id: string
          evaluation_form_id: string
          question_id: string
          answer_value: Json
          score: number | null
          created_at: string
        }
        Insert: {
          id?: string
          evaluation_form_id: string
          question_id: string
          answer_value: Json
          score?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          evaluation_form_id?: string
          question_id?: string
          answer_value?: Json
          score?: number | null
          created_at?: string
        }
      }
      // ============================================
      // TALENT POOLS
      // ============================================
      talent_pools: {
        Row: {
          id: string
          name: string
          description: string | null
          color: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          color?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          color?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      pool_members: {
        Row: {
          id: string
          pool_id: string
          candidate_id: string
          added_by: string | null
          notes: string | null
          added_at: string
        }
        Insert: {
          id?: string
          pool_id: string
          candidate_id: string
          added_by?: string | null
          notes?: string | null
          added_at?: string
        }
        Update: {
          id?: string
          pool_id?: string
          candidate_id?: string
          added_by?: string | null
          notes?: string | null
          added_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// ============================================
// HELPER TYPES
// ============================================
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type InsertTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type UpdateTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']

// ============================================
// EXPORTED ROW TYPES
// ============================================
export type Company = Tables<'companies'>
export type CompanyContact = Tables<'company_contacts'>
export type CompanyNote = Tables<'company_notes'>
export type PipelineStage = Tables<'pipeline_stages'>
export type Vacancy = Tables<'vacancies'>
export type VacancyEvaluationTemplate = Tables<'vacancy_evaluation_templates'>
export type Candidate = Tables<'candidates'>
export type CandidateNote = Tables<'candidate_notes'>
export type CandidateFile = Tables<'candidate_files'>
export type CandidateActivity = Tables<'candidate_activity'>
export type CandidateVacancy = Tables<'candidate_vacancies'>
export type CandidateStageHistory = Tables<'candidate_stage_history'>
export type EvaluationTemplate = Tables<'evaluation_templates'>
export type EvaluationTemplateSection = Tables<'evaluation_template_sections'>
export type EvaluationQuestion = Tables<'evaluation_questions'>
export type CandidateEvaluationForm = Tables<'candidate_evaluation_forms'>
export type CandidateEvaluationAnswer = Tables<'candidate_evaluation_answers'>
export type TalentPool = Tables<'talent_pools'>
export type PoolMember = Tables<'pool_members'>

// ============================================
// EXTENDED TYPES WITH RELATIONS
// ============================================
export type CandidateWithVacancies = Candidate & {
  candidate_vacancies: (CandidateVacancy & {
    vacancy: Vacancy
    stage: PipelineStage
  })[]
}

export type VacancyWithCandidates = Vacancy & {
  candidate_vacancies: (CandidateVacancy & {
    candidate: Candidate
    stage: PipelineStage
  })[]
}

export type EvaluationTemplateWithQuestions = EvaluationTemplate & {
  sections: (EvaluationTemplateSection & {
    questions: EvaluationQuestion[]
  })[]
}

export type TalentPoolWithMembers = TalentPool & {
  pool_members: (PoolMember & {
    candidate: Candidate
  })[]
}

export interface CandidateStage {
  id: string;
  name: string;
  order: number;
}

export interface PipelineCandidate {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  currentStageId: string;
  appliedAt: string;
  source?: string;
  note?: string;
}

export interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  role: string;
  location: string;
  stage: 'Gesolliciteerd' | 'Geen gehoor' | 'Telefonisch interview' | 'In afwachting CV' | 'Twijfel kandidaat' | 'Afwijzen' | 'Voorgesteld';
  vacancy: string;
  addedAt: string;
  tags: string[];
  avatarUrl?: string;
}

export interface CandidateDetail {
  id: string;
  fullName: string;
  role: string;
  vacancy: string;
  location: string;
  stage: 'Gesolliciteerd' | 'Geen gehoor' | 'Telefonisch interview' | 'In afwachting CV' | 'Twijfel kandidaat' | 'Afwijzen' | 'Voorgesteld';
  avatarUrl?: string;
  addedAt: string;
  email: string;
  phone: string;
  summary: string;
}

export interface CandidateNote {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

export interface CandidateFile {
  id: string;
  fileName: string;
  fileSize: string;
  uploadedAt: string;
}

export interface CandidateActivity {
  id: string;
  type: "note" | "file" | "status" | "evaluation" | "update";
  description: string;
  createdAt: string;
}

export interface CandidateEvaluation {
  id: string;
  category: string;
  score: number;
  comment: string;
  updatedAt: string;
}

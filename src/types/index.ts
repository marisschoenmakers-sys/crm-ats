export type CRMPage = "dashboard" | "vacancies" | "vacancyDetail" | "companies" | "companyDetail" | "candidates" | "candidateDetail" | "talentpools" | "mailbox" | "analytics";

export interface Candidate {
  id: number;
  name: string;
  email: string;
  phone: string;
  vacancy: string;
  currentPhase: 'Gesolliciteerd' | 'Geen gehoor' | 'Telefonisch interview' | 'In afwachting CV' | 'Twijfel kandidaat' | 'Voorgesteld';
  location: string;
  appliedDate: string;
}

export interface Vacancy {
  id: number;
  functie: string;
  sector: string;
  locatie: string;
  bedrijf: string;
  prioriteit: 'Hoog' | 'Medium' | 'Laag';
  status: 'Open' | 'In behandeling' | 'Gesloten';
  kandidaten: number;
}

export interface TalentPool {
  id: number;
  name: string;
  description: string;
  candidateCount: number;
}

export interface Email {
  id: number;
  sender: string;
  senderEmail: string;
  subject: string;
  preview: string;
  time: string;
  isRead: boolean;
  isStarred: boolean;
  category: 'inbox' | 'sent' | 'draft' | 'spam';
}

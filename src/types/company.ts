export type Company = {
  id: string;
  name: string;
  sector?: string;
  size?: string; // bijv "50-200 medewerkers"
  location: string;
  website?: string;
  description: string;
  createdAt: string;
  priority?: "Laag" | "Middel" | "Hoog";
};

export type CompanyContact = {
  id: string;
  companyId: string;
  fullName: string;
  role: string;
  email: string;
  phone?: string;
};

export type CompanyNote = {
  id: string;
  companyId: string;
  author: string;
  content: string;
  createdAt: string;
};

export type CompanyVacancyLink = {
  id: string;
  companyId: string;
  vacancyTitle: string;
  location: string;
  status: string; // bijv "Actief", "Gesloten"
};

export type CompanyCandidateLink = {
  id: string;
  companyId: string;
  candidateName: string;
  role: string;
  stage: string;
};

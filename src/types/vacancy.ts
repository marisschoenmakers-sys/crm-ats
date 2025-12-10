export interface Vacancy {
  id: string;
  title: string;
  company: string;
  location: string;
  employmentType: string;
  salaryRange?: string;
  createdAt: string;
  status: "Actief" | "Gesloten" | "Concept";
  description: string;
  requirements: string[];
  sector?: string;
  priority?: "Laag" | "Middel" | "Hoog";
}

export interface VacancyCandidate {
  id: string;
  fullName: string;
  role: string;
  stage: 'Gesolliciteerd' | 'Geen gehoor' | 'Telefonisch interview' | 'In afwachting van CV' | 'Twijfel kandidaat' | 'Nog afwijzen' | 'Voorgesteld' | 'Afspraak op locatie' | 'Aanbod' | 'Aangenomen';
  appliedAt: string;
  source?: string;
}

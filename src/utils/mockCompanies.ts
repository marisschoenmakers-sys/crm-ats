import type { 
  Company, 
  CompanyContact, 
  CompanyNote, 
  CompanyVacancyLink, 
  CompanyCandidateLink 
} from '../types/company';

export const companies: Company[] = [
  {
    id: '1',
    name: 'TechCorp B.V.',
    sector: 'Technologie',
    size: '250-500 medewerkers',
    location: 'Amsterdam',
    website: 'https://techcorp.nl',
    description: 'TechCorp is een leidende Nederlandse technologiebedrijf gespecialiseerd in enterprise software solutions en cloud architectuur. We helpen Fortune 500 bedrijven met hun digitale transformatie en innovatie strategieën.',
    createdAt: '01-03-2023',
    priority: 'Hoog'
  },
  {
    id: '2',
    name: 'Digital Marketing Agency',
    sector: 'Marketing',
    size: '50-100 medewerkers',
    location: 'Utrecht',
    website: 'https://digitalma.nl',
    description: 'Full-service digital marketing agency met focus op data-gedreven campagnes, content creatie en performance marketing. Werkt met zowel B2B als B2C klanten in diverse sectoren.',
    createdAt: '15-04-2023',
    priority: 'Middel'
  },
  {
    id: '3',
    name: 'HealthCare Solutions',
    sector: 'Gezondheidszorg',
    size: '100-250 medewerkers',
    location: 'Rotterdam',
    website: 'https://healthcaresolutions.nl',
    description: 'Innovatieve zorgtechnologie bedrijf dat software en hardware ontwikkelt voor moderne ziekenhuizen en zorginstellingen. Gespecialiseerd in patient management systemen en medische data analyse.',
    createdAt: '20-05-2023',
    priority: 'Hoog'
  },
  {
    id: '4',
    name: 'FinTech Innovations',
    sector: 'Financiën',
    size: '25-50 medewerkers',
    location: 'Amsterdam',
    website: 'https://fintechinnovations.nl',
    description: 'Startup gericht op revolutionaire financiële technologieën en blockchain oplossingen voor de bankensector. Ontwikkelt veilige en schaalbare payment processing systemen.',
    createdAt: '10-06-2023',
    priority: 'Middel'
  },
  {
    id: '5',
    name: 'E-commerce Giant',
    sector: 'Retail',
    size: '500+ medewerkers',
    location: 'Eindhoven',
    website: 'https://ecommercegiant.nl',
    description: 'Een van de grootste e-commerce platforms in de Benelux met een focus op fashion en lifestyle producten. Bekend om hun geavanceerde supply chain en customer experience technologie.',
    createdAt: '05-07-2023',
    priority: 'Hoog'
  },
  {
    id: '6',
    name: 'Green Energy Systems',
    sector: 'Energie',
    size: '100-250 medewerkers',
    location: 'Groningen',
    website: 'https://greenenergy.nl',
    description: 'Duurzame energie specialist ontwikkelaar van slimme grid oplossingen en renewable energy management systemen. Werkt aan de transitie naar groene energie voor industriële klanten.',
    createdAt: '12-08-2023',
    priority: 'Laag'
  },
  {
    id: '7',
    name: 'Education Tech',
    sector: 'Onderwijs',
    size: '50-100 medewerkers',
    location: 'Leiden',
    website: 'https://edutech.nl',
    description: 'EdTech bedrijf dat innovatieve leerplatforms en educatieve software ontwikkelt voor het hoger onderwijs en corporate training. Focus op personalized learning en AI-gedreven educatie.',
    createdAt: '25-09-2023',
    priority: 'Middel'
  }
];

export const companyContacts: CompanyContact[] = [
  // TechCorp B.V. contacts
  {
    id: '1',
    companyId: '1',
    fullName: 'Erik van der Meer',
    role: 'CTO',
    email: 'e.vandermeer@techcorp.nl',
    phone: '+31 20 1234567'
  },
  {
    id: '2',
    companyId: '1',
    fullName: 'Lisa de Jong',
    role: 'HR Manager',
    email: 'l.dejong@techcorp.nl',
    phone: '+31 20 1234568'
  },
  {
    id: '3',
    companyId: '1',
    fullName: 'Mark Bakker',
    role: 'Head of Engineering',
    email: 'm.bakker@techcorp.nl',
    phone: '+31 20 1234569'
  },
  
  // Digital Marketing Agency contacts
  {
    id: '4',
    companyId: '2',
    fullName: 'Sarah Visser',
    role: 'Creative Director',
    email: 's.visser@digitalma.nl',
    phone: '+31 30 2345678'
  },
  {
    id: '5',
    companyId: '2',
    fullName: 'Tom Jansen',
    role: 'Account Manager',
    email: 't.jansen@digitalma.nl',
    phone: '+31 30 2345679'
  },
  
  // HealthCare Solutions contacts
  {
    id: '6',
    companyId: '3',
    fullName: 'Dr. Peter van Dijk',
    role: 'Medical Director',
    email: 'p.vandijk@healthcaresolutions.nl',
    phone: '+31 10 3456789'
  },
  {
    id: '7',
    companyId: '3',
    fullName: 'Emma de Vries',
    role: 'Product Manager',
    email: 'e.devries@healthcaresolutions.nl',
    phone: '+31 10 3456790'
  },
  
  // FinTech Innovations contacts
  {
    id: '8',
    companyId: '4',
    fullName: 'Kevin Mulder',
    role: 'CEO',
    email: 'k.mulder@fintechinnovations.nl',
    phone: '+31 20 4567890'
  },
  {
    id: '9',
    companyId: '4',
    fullName: 'Anna Bos',
    role: 'Lead Developer',
    email: 'a.bos@fintechinnovations.nl',
    phone: '+31 20 4567891'
  },
  
  // E-commerce Giant contacts
  {
    id: '10',
    companyId: '5',
    fullName: 'Michael Smit',
    role: 'Operations Director',
    email: 'm.smit@ecommercegiant.nl',
    phone: '+31 40 5678901'
  },
  {
    id: '11',
    companyId: '5',
    fullName: 'Laura van den Berg',
    role: 'Head of E-commerce',
    email: 'l.vandenberg@ecommercegiant.nl',
    phone: '+31 40 5678902'
  }
];

export const companyNotes: CompanyNote[] = [
  {
    id: '1',
    companyId: '1',
    author: 'Maris de Vries',
    content: 'TechCorp is een strategische partner voor ons. Ze hebben constante behoefte aan senior developers en zijn bereid om competitieve salarissen te betalen. Goede bedrijfscultuur met focus op innovatie.',
    createdAt: '3 dagen geleden'
  },
  {
    id: '2',
    companyId: '1',
    author: 'Pieter Bakker',
    content: 'Erik van der Meer (CTO) is onze primaire contactpersoon. Hij is zeer betrokken bij het recruitment proces en geeft snel feedback op kandidaten. Ze gebruiken moderne tech stack.',
    createdAt: '1 week geleden'
  },
  {
    id: '3',
    companyId: '2',
    author: 'Lisa Visser',
    content: 'Digital Marketing Agency groeit snel. Ze zoeken momenteel marketing automation specialisten en data analysts. Goede work-life balance en flexibele werktijden.',
    createdAt: '4 dagen geleden'
  },
  {
    id: '4',
    companyId: '3',
    author: 'Tom de Boer',
    content: 'HealthCare Solutions heeft strikte compliance requirements voor medische software. Kandidaten moeten ervaring hebben met healthcare IT en GDPR. Lange contracten mogelijk.',
    createdAt: '2 weken geleden'
  },
  {
    id: '5',
    companyId: '4',
    author: 'Emma van der Meer',
    content: 'FinTech startup met veel potentie. Ze zoeken blockchain developers en financial software engineers. Risicovol maar hoge beloning mogelijk in aandelenopties.',
    createdAt: '5 dagen geleden'
  },
  {
    id: '6',
    companyId: '5',
    author: 'Mark van Dijk',
    content: 'E-commerce Giant heeft meerdere vacatures voor supply chain en logistics software. Ze gebruiken eigen platform gebouwd in Java/Python. Goede stabiliteit en benefits.',
    createdAt: '1 week geleden'
  }
];

export const companyVacancies: CompanyVacancyLink[] = [
  // TechCorp B.V. vacancies
  {
    id: '1',
    companyId: '1',
    vacancyTitle: 'Senior Frontend Developer',
    location: 'Amsterdam',
    status: 'Actief'
  },
  {
    id: '2',
    companyId: '1',
    vacancyTitle: 'DevOps Engineer',
    location: 'Amsterdam',
    status: 'Actief'
  },
  {
    id: '3',
    companyId: '1',
    vacancyTitle: 'Product Owner',
    location: 'Amsterdam',
    status: 'Gesloten'
  },
  
  // Digital Marketing Agency vacancies
  {
    id: '4',
    companyId: '2',
    vacancyTitle: 'Marketing Automation Specialist',
    location: 'Utrecht',
    status: 'Actief'
  },
  {
    id: '5',
    companyId: '2',
    vacancyTitle: 'Data Analyst',
    location: 'Utrecht',
    status: 'Actief'
  },
  
  // HealthCare Solutions vacancies
  {
    id: '6',
    companyId: '3',
    vacancyTitle: 'Healthcare Software Developer',
    location: 'Rotterdam',
    status: 'Actief'
  },
  {
    id: '7',
    companyId: '3',
    vacancyTitle: 'UX Designer Healthcare',
    location: 'Rotterdam',
    status: 'Actief'
  },
  
  // FinTech Innovations vacancies
  {
    id: '8',
    companyId: '4',
    vacancyTitle: 'Blockchain Developer',
    location: 'Amsterdam',
    status: 'Actief'
  },
  {
    id: '9',
    companyId: '4',
    vacancyTitle: 'Financial Software Engineer',
    location: 'Amsterdam',
    status: 'Gesloten'
  },
  
  // E-commerce Giant vacancies
  {
    id: '10',
    companyId: '5',
    vacancyTitle: 'Supply Chain Software Engineer',
    location: 'Eindhoven',
    status: 'Actief'
  },
  {
    id: '11',
    companyId: '5',
    vacancyTitle: 'Logistics Coordinator',
    location: 'Eindhoven',
    status: 'Actief'
  }
];

export const companyCandidates: CompanyCandidateLink[] = [
  // TechCorp B.V. candidates
  {
    id: '1',
    companyId: '1',
    candidateName: 'Jan Jansen',
    role: 'Senior Frontend Developer',
    stage: 'Telefonisch interview'
  },
  {
    id: '2',
    companyId: '1',
    candidateName: 'Sarah Mulder',
    role: 'DevOps Engineer',
    stage: 'Voorgesteld'
  },
  {
    id: '3',
    companyId: '1',
    candidateName: 'Pieter Bakker',
    role: 'Senior Frontend Developer',
    stage: 'Gesolliciteerd'
  },
  
  // Digital Marketing Agency candidates
  {
    id: '4',
    companyId: '2',
    candidateName: 'Emma van der Meer',
    role: 'Marketing Automation Specialist',
    stage: 'Telefonisch interview'
  },
  {
    id: '5',
    companyId: '2',
    candidateName: 'Tom de Boer',
    role: 'Data Analyst',
    stage: 'In afwachting CV'
  },
  
  // HealthCare Solutions candidates
  {
    id: '6',
    companyId: '3',
    candidateName: 'Lisa Visser',
    role: 'Healthcare Software Developer',
    stage: 'Voorgesteld'
  },
  {
    id: '7',
    companyId: '3',
    candidateName: 'Mark van Dijk',
    role: 'UX Designer Healthcare',
    stage: 'Gesolliciteerd'
  },
  
  // FinTech Innovations candidates
  {
    id: '8',
    companyId: '4',
    candidateName: 'Kevin Mulder',
    role: 'Blockchain Developer',
    stage: 'Telefonisch interview'
  },
  
  // E-commerce Giant candidates
  {
    id: '9',
    companyId: '5',
    candidateName: 'Michael Smit',
    role: 'Supply Chain Software Engineer',
    stage: 'Voorgesteld'
  },
  {
    id: '10',
    companyId: '5',
    candidateName: 'Laura van den Berg',
    role: 'Logistics Coordinator',
    stage: 'Gesolliciteerd'
  }
];

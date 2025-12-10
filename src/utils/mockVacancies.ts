import type { Vacancy, VacancyCandidate } from '../types/vacancy';

export const vacancies: Vacancy[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp B.V.',
    location: 'Amsterdam',
    employmentType: 'Fulltime',
    salaryRange: '€60.000 - €80.000',
    createdAt: '01-11-2024',
    status: 'Actief',
    description: 'We zijn op zoek naar een ervaren frontend developer die ons team komt versterken. Je zult werken aan innovatieve webapplicaties voor enterprise klanten met moderne technologieën zoals React, TypeScript en Next.js. Je speelt een sleutelrol in de ontwikkeling van gebruikersinterfaces die niet alleen functioneel zijn, maar ook een uitstekende user experience bieden.',
    requirements: [
      'Minimaal 5 jaar ervaring met frontend development',
      'Expertise in React en TypeScript',
      'Ervaring met state management (Redux, Zustand, etc.)',
      'Kennis van moderne CSS frameworks',
      'Ervaring met testing (Jest, React Testing Library)',
      'Goede beheersing van de Nederlandse taal'
    ],
    sector: 'IT',
    priority: 'Hoog'
  },
  {
    id: '2',
    title: 'Marketing Manager',
    company: 'Marketing Solutions',
    location: 'Utrecht',
    employmentType: 'Fulltime',
    salaryRange: '€55.000 - €70.000',
    createdAt: '05-11-2024',
    status: 'Actief',
    description: 'Als Marketing Manager ben je verantwoordelijk voor het ontwikkelen en uitvoeren van onze marketingstrategie. Je leidt een team van marketing professionals en werkt nauw samen met sales en product development. Je focus ligt op B2B marketing en het vergroten van onze marktpositie in de Benelux.',
    requirements: [
      'HBO/WO werk- en denkniveau',
      'Minimaal 3 jaar ervaring in een vergelijkbare rol',
      'Ervaring met B2B marketing',
      'Kennis van digitale marketing tools',
      'Leiderschapsqualiteiten',
      'Uitstekende communicatieve vaardigheden'
    ],
    sector: 'Marketing',
    priority: 'Middel'
  },
  {
    id: '3',
    title: 'Data Analyst',
    company: 'Data Insights',
    location: 'Rotterdam',
    employmentType: 'Fulltime',
    salaryRange: '€45.000 - €60.000',
    createdAt: '10-11-2024',
    status: 'Actief',
    description: 'Voor onze data analytics afdeling zoeken we een gedreven Data Analyst. Je zult complexe datasets analyseren, rapportages opstellen en inzichten genereren die het management helpen bij besluitvorming. Je werkt met moderne tools zoals Python, SQL en Tableau.',
    requirements: [
      'Afgeronde HBO/WO opleiding in relevante richting',
      'Ervaring met SQL en Python',
      'Kennis van statistische analyse',
      'Ervaring met data visualisatie tools',
      'Analytisch en probleemoplossend vermogen',
      'Goede beheersing van Excel'
    ],
    sector: 'Data & Analytics',
    priority: 'Hoog'
  },
  {
    id: '4',
    title: 'HR Business Partner',
    company: 'People First',
    location: 'Den Haag',
    employmentType: 'Parttime',
    salaryRange: '€40.000 - €55.000',
    createdAt: '15-11-2024',
    status: 'Concept',
    description: 'Als HR Business Partner ben je de strategische partner voor het management en medewerkers. Je adviseert over HR-vraagstukken, ontwikkelt HR-beleid en zorgt voor implementatie hiervan. Je bent betrokken bij werving & selectie, performance management en organisatieontwikkeling.',
    requirements: [
      'HBO opleiding HRM of vergelijkbaar',
      'Minimaal 4 jaar relevante werkervaring',
      'Ervaring als HR Business Partner',
      'Kennis van arbeidsrecht',
      'Strategisch denkvermogen',
      'Goede communicatieve vaardigheden'
    ],
    sector: 'HR',
    priority: 'Middel'
  },
  {
    id: '5',
    title: 'Junior Backend Developer',
    company: 'StartupHub',
    location: 'Eindhoven',
    employmentType: 'Fulltime',
    salaryRange: '€35.000 - €45.000',
    createdAt: '20-11-2024',
    status: 'Gesloten',
    description: 'Ben je een junior developer met passie voor backend technologieën? Wil je meegroeien in een dynamische startup omgeving? Dan is dit je kans! Je zult werken aan RESTful APIs, database ontwerp en cloud infrastructure.',
    requirements: [
      'Afgeronde HBO/WO opleiding Informatica of vergelijkbaar',
      'Basis kennis van Java of Python',
      'Ervaring met databases (SQL/NoSQL)',
      'Affiniteit met cloud technologieën',
      'Leergierig en proactief',
      'Goede teamspeler'
    ],
    sector: 'IT',
    priority: 'Laag'
  }
];

export const vacancyCandidatesByVacancyId: Record<string, VacancyCandidate[]> = {
  '1': [
    {
      id: '1',
      fullName: 'Jan Jansen',
      role: 'Frontend Developer',
      stage: 'Telefonisch interview',
      appliedAt: '15-11-2024',
      source: 'LinkedIn'
    },
    {
      id: '2',
      fullName: 'Tom de Boer',
      role: 'Senior Frontend Developer',
      stage: 'Telefonisch interview',
      appliedAt: '09-11-2024',
      source: 'Website'
    },
    {
      id: '3',
      fullName: 'David van Leeuwen',
      role: 'Full Stack Developer',
      stage: 'Gesolliciteerd',
      appliedAt: '16-11-2024',
      source: 'Referral'
    },
    {
      id: '4',
      fullName: 'Kevin de Wit',
      role: 'DevOps Engineer',
      stage: 'In afwachting van CV',
      appliedAt: '18-11-2024',
      source: 'LinkedIn'
    },
    {
      id: '5',
      fullName: 'Michael Smit',
      role: 'Backend Developer',
      stage: 'Gesolliciteerd',
      appliedAt: '20-11-2024',
      source: 'Indeed'
    }
  ],
  '2': [
    {
      id: '6',
      fullName: 'Maria de Vries',
      role: 'Marketing Manager',
      stage: 'Gesolliciteerd',
      appliedAt: '14-11-2024',
      source: 'LinkedIn'
    },
    {
      id: '7',
      fullName: 'Emma van der Meer',
      role: 'Marketing Specialist',
      stage: 'Nog afwijzen',
      appliedAt: '08-11-2024',
      source: 'Website'
    },
    {
      id: '8',
      fullName: 'Sarah Mulder',
      role: 'Sales Executive',
      stage: 'Telefonisch interview',
      appliedAt: '10-11-2024',
      source: 'Referral'
    }
  ],
  '3': [
    {
      id: '9',
      fullName: 'Pieter Bakker',
      role: 'Data Analyst',
      stage: 'Voorgesteld',
      appliedAt: '13-11-2024',
      source: 'LinkedIn'
    },
    {
      id: '10',
      fullName: 'Femke Janssen',
      role: 'UX Designer',
      stage: 'In afwachting van CV',
      appliedAt: '17-11-2024',
      source: 'Behance'
    },
    {
      id: '11',
      fullName: 'Judith de Jong',
      role: 'Data Scientist',
      stage: 'Twijfel kandidaat',
      appliedAt: '21-11-2024',
      source: 'Academic'
    }
  ],
  '4': [
    {
      id: '12',
      fullName: 'Lisa Visser',
      role: 'HR Business Partner',
      stage: 'Gesolliciteerd',
      appliedAt: '12-11-2024',
      source: 'LinkedIn'
    }
  ],
  '5': [
    {
      id: '13',
      fullName: 'Mark van Dijk',
      role: 'Backend Developer',
      stage: 'Geen gehoor',
      appliedAt: '11-11-2024',
      source: 'GitHub'
    },
    {
      id: '14',
      fullName: 'Nina Bosch',
      role: 'Frontend Developer',
      stage: 'Telefonisch interview',
      appliedAt: '23-11-2024',
      source: 'University'
    }
  ]
};

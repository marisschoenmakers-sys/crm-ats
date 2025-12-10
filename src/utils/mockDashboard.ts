import type { 
  DashboardStats, 
  DashboardTask, 
  DashboardEvent, 
  DashboardNote, 
  DashboardActivity 
} from '../types/dashboard';

export const dashboardStats: DashboardStats = {
  openVacancies: 5,
  activeCandidates: 18,
  interviewsThisWeek: 7,
  avgTimeToHire: 23
};

export const dashboardTasks: DashboardTask[] = [
  {
    id: '1',
    title: 'Telefonisch interview met Jan Jansen plannen',
    dueDate: 'Vandaag',
    completed: false
  },
  {
    id: '2',
    title: 'Referentiecheck uitvoeren voor Pieter Bakker',
    dueDate: 'Morgen',
    completed: false
  },
  {
    id: '3',
    title: 'CV review van Emma van der Meer afronden',
    dueDate: 'Vandaag',
    completed: true
  },
  {
    id: '4',
    title: 'Vacaturetekst Senior Frontend Developer updaten',
    dueDate: '12-12-2024',
    completed: false
  },
  {
    id: '5',
    title: 'Contractvoorstel voorbereiden Tom de Boer',
    dueDate: '13-12-2024',
    completed: false
  },
  {
    id: '6',
    title: 'Team meeting voorbereiden',
    dueDate: 'Morgen',
    completed: true
  },
  {
    id: '7',
    title: 'LinkedIn post nieuwe vacature plaatsen',
    dueDate: '14-12-2024',
    completed: false
  }
];

export const dashboardEvents: DashboardEvent[] = [
  {
    id: '1',
    title: 'Technisch gesprek - Jan Jansen',
    date: 'Vandaag',
    time: '14:00',
    location: 'Kantoor Amsterdam'
  },
  {
    id: '2',
    title: 'Telefonisch interview - Sarah Mulder',
    date: 'Vandaag',
    time: '16:30',
    location: 'Teams'
  },
  {
    id: '3',
    title: 'Persoonlijk gesprek - Pieter Bakker',
    date: 'Morgen',
    time: '10:00',
    location: 'Kantoor Rotterdam'
  },
  {
    id: '4',
    title: 'Team meeting - Recruitment',
    date: 'Morgen',
    time: '13:00',
    location: 'Teams'
  },
  {
    id: '5',
    title: 'Contract bespreking - Tom de Boer',
    date: '13-12-2024',
    time: '15:00',
    location: 'Kantoor Utrecht'
  }
];

export const dashboardNotes: DashboardNote[] = [
  {
    id: '1',
    author: 'Maris de Vries',
    content: 'Jan Jansen heeft sterke technische skills. Goede ervaring met React en TypeScript. Past goed in het team.',
    createdAt: '2 uur geleden'
  },
  {
    id: '2',
    author: 'Pieter Bakker',
    content: 'Sarah Mulder is enthousiast en heeft goede communicatieve vaardigheden. Nog technische assessment afwachten.',
    createdAt: '4 uur geleden'
  },
  {
    id: '3',
    author: 'Lisa Visser',
    content: 'Marketing Manager vacature krijgt veel interesse. Kwaliteit van kandidaten is hoog. Moeten snel handelen.',
    createdAt: 'Gisteren'
  },
  {
    id: '4',
    author: 'Mark van Dijk',
    content: 'Data Analyst rol is moeilijk te vervullen. Weinig geschikte kandidaten met juiste ervaring. Overwegen salaris te verhogen.',
    createdAt: 'Gisteren'
  },
  {
    id: '5',
    author: 'Emma van der Meer',
    content: 'Nieuwe onboarding workflow werkt goed. Kandidaten geven positieve feedback over proces.',
    createdAt: '2 dagen geleden'
  }
];

export const dashboardActivities: DashboardActivity[] = [
  {
    id: '1',
    description: 'Nieuwe sollicitatie ontvangen: David van Leeuwen voor Frontend Developer',
    timestamp: '10 minuten geleden',
    type: 'candidate'
  },
  {
    id: '2',
    description: 'Vacature "Senior Frontend Developer" status gewijzigd naar Actief',
    timestamp: '30 minuten geleden',
    type: 'vacancy'
  },
  {
    id: '3',
    description: 'Notitie toegevoegd aan kandidaat Jan Jansen',
    timestamp: '1 uur geleden',
    type: 'note'
  },
  {
    id: '4',
    description: 'CV geüpload voor kandidaat Kevin de Wit',
    timestamp: '2 uur geleden',
    type: 'file'
  },
  {
    id: '5',
    description: 'Interview gepland met Sarah Mulder',
    timestamp: '3 uur geleden',
    type: 'candidate'
  },
  {
    id: '6',
    description: 'Vacature "Marketing Manager" gedeeld op LinkedIn',
    timestamp: '4 uur geleden',
    type: 'vacancy'
  },
  {
    id: '7',
    description: 'Evaluatie voltooid voor Pieter Bakker',
    timestamp: '5 uur geleden',
    type: 'candidate'
  },
  {
    id: '8',
    description: 'Bestand geüpload: Portfolio_2024.pdf',
    timestamp: '6 uur geleden',
    type: 'file'
  },
  {
    id: '9',
    description: 'Notitie toegevoegd aan vacature Data Analyst',
    timestamp: '8 uur geleden',
    type: 'note'
  },
  {
    id: '10',
    description: 'Kandidaat Emma van der Meer voorgesteld aan hiring manager',
    timestamp: '12 uur geleden',
    type: 'candidate'
  }
];

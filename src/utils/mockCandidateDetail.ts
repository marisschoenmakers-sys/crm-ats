import type { 
  CandidateDetail, 
  CandidateNote, 
  CandidateFile, 
  CandidateActivity, 
  CandidateEvaluation 
} from '../types/candidate';

export const candidateDetail: CandidateDetail = {
  id: '1',
  fullName: 'Jan Jansen',
  role: 'Senior Frontend Developer',
  vacancy: 'Senior Frontend Developer - TechCorp B.V.',
  location: 'Amsterdam',
  stage: 'Telefonisch interview',
  avatarUrl: undefined,
  addedAt: '15-11-2024',
  email: 'jan.jansen@email.com',
  phone: '+31 6 12345678',
  summary: 'Ervaren frontend developer met 8+ jaar ervaring in React, TypeScript en moderne JavaScript frameworks. Gespecialiseerd in het bouwen van schaalbare webapplicaties met focus op performance en user experience. Heeft gewerkt aan diverse enterprise projecten en heeft sterke communicatieve vaardigheden.'
};

export const candidateNotes: CandidateNote[] = [
  {
    id: '1',
    author: 'Maris de Vries',
    content: 'Jan heeft uitstekende technische skills. Zijn portfolio toont moderne React projecten met TypeScript. Goede ervaring met state management en testing frameworks. Past goed in ons team.',
    createdAt: '2 uur geleden'
  },
  {
    id: '2',
    author: 'Pieter Bakker',
    content: 'Technisch interview verliep zeer goed. Jan heeft diepgaande kennis van React hooks, performance optimalisatie en accessibility. Heeft goede vragen gesteld over onze architectuur.',
    createdAt: 'Gisteren'
  },
  {
    id: '3',
    author: 'Lisa Visser',
    content: 'Telefonische kennismaking was positief. Jan is enthousiast en goed voorbereid. Hij heeft duidelijke carrière doelen en is geïnteresseerd in onze bedrijfscultuur.',
    createdAt: '3 dagen geleden'
  },
  {
    id: '4',
    author: 'Tom de Boer',
    content: 'CV review: Sterke technische achtergrond met relevante certificeringen. Werkervaring bij bekende tech bedrijven. Goede match met onze requirements.',
    createdAt: '5 dagen geleden'
  }
];

export const candidateFiles: CandidateFile[] = [
  {
    id: '1',
    fileName: 'Jan_Jansen_CV_2024.pdf',
    fileSize: '2.4 MB',
    uploadedAt: '15-11-2024'
  },
  {
    id: '2',
    fileName: 'Portfolio_Jan_Jansen.pdf',
    fileSize: '8.7 MB',
    uploadedAt: '15-11-2024'
  },
  {
    id: '3',
    fileName: 'Certificaat_React_Advanced.pdf',
    fileSize: '1.2 MB',
    uploadedAt: '16-11-2024'
  },
  {
    id: '4',
    fileName: 'Referenties_Jan_Jansen.pdf',
    fileSize: '856 KB',
    uploadedAt: '18-11-2024'
  },
  {
    id: '5',
    fileName: 'Technical_Assessment_Results.pdf',
    fileSize: '3.1 MB',
    uploadedAt: '20-11-2024'
  }
];

export const candidateActivities: CandidateActivity[] = [
  {
    id: '1',
    type: 'status',
    description: 'Kandidaat status gewijzigd naar "Telefonisch interview"',
    createdAt: '2 uur geleden'
  },
  {
    id: '2',
    type: 'note',
    description: 'Notitie toegevoegd door Maris de Vries',
    createdAt: '2 uur geleden'
  },
  {
    id: '3',
    type: 'file',
    description: 'Technical assessment resultaten geüpload',
    createdAt: 'Gisteren'
  },
  {
    id: '4',
    type: 'evaluation',
    description: 'Technische evaluatie voltooid met score 4.5',
    createdAt: 'Gisteren'
  },
  {
    id: '5',
    type: 'update',
    description: 'Contactinformatie bijgewerkt',
    createdAt: '3 dagen geleden'
  },
  {
    id: '6',
    type: 'status',
    description: 'Kandidaat status gewijzigd naar "Gesolliciteerd"',
    createdAt: '5 dagen geleden'
  },
  {
    id: '7',
    type: 'file',
    description: 'CV geüpload',
    createdAt: '5 dagen geleden'
  },
  {
    id: '8',
    type: 'note',
    description: 'Notitie toegevoegd door Tom de Boer',
    createdAt: '5 dagen geleden'
  },
  {
    id: '9',
    type: 'update',
    description: 'Kandidaat toegevoegd aan systeem',
    createdAt: '6 dagen geleden'
  },
  {
    id: '10',
    type: 'file',
    description: 'Portfolio geüpload',
    createdAt: '6 dagen geleden'
  }
];

export const candidateEvaluations: CandidateEvaluation[] = [
  {
    id: '1',
    category: 'Technische Vaardigheden',
    score: 5,
    comment: 'Uitstekende kennis van React, TypeScript en moderne frontend technologieën. Toont diepgaand begrip van state management en performance optimalisatie.',
    updatedAt: 'Gisteren'
  },
  {
    id: '2',
    category: 'Communicatie',
    score: 4,
    comment: 'Goede communicatieve vaardigheden, kan technische concepten duidelijk uitleggen. Soms iets te technisch in communicatie met niet-technische stakeholders.',
    updatedAt: 'Gisteren'
  },
  {
    id: '3',
    category: 'Teamwork',
    score: 5,
    comment: 'Uitstekende teamspeler, ervaring met agile methodologies. Heeft goede ervaring met code reviews en mentoring van junior developers.',
    updatedAt: '3 dagen geleden'
  },
  {
    id: '4',
    category: 'Probleemoplossend Vermogen',
    score: 4,
    comment: 'Sterk analytisch vermogen, kan complexe problemen opdelen in behapbare delen. Soms iets te snel met oplossingen zonder volledige analyse.',
    updatedAt: '3 dagen geleden'
  },
  {
    id: '5',
    category: 'Culturele Fit',
    score: 4,
    comment: 'Goede match met bedrijfscultuur, enthousiast en proactief. Toont interesse in persoonlijke ontwikkeling en bedrijfsgroei.',
    updatedAt: '5 dagen geleden'
  }
];

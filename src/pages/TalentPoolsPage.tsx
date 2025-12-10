import React from 'react';
import type { TalentPool } from '../types';

const mockTalentPools: TalentPool[] = [
  {
    id: 1,
    name: 'Frontend Developers',
    description: 'Ervaring met React, Vue, Angular en moderne JavaScript frameworks. Gespecialiseerd in responsive design en user experience.',
    candidateCount: 24
  },
  {
    id: 2,
    name: 'Backend Engineers',
    description: 'Expertise in Node.js, Python, Java en database systemen. Sterk in API development en systeemarchitectuur.',
    candidateCount: 18
  },
  {
    id: 3,
    name: 'Data Scientists',
    description: 'Gevorderd in machine learning, statistiek en data analyse. Ervaring met Python, R en big data technologieën.',
    candidateCount: 12
  },
  {
    id: 4,
    name: 'Marketing Professionals',
    description: 'Strategische marketing, digital marketing, content creatie en campagne management. CRM en marketing automation ervaring.',
    candidateCount: 31
  },
  {
    id: 5,
    name: 'Sales Executives',
    description: 'B2B en B2C sales ervaring, account management en business development. Sterke communicatie en onderhandelingsvaardigheden.',
    candidateCount: 27
  },
  {
    id: 6,
    name: 'HR Business Partners',
    description: 'Strategische HR, talent management, recruitment en employee relations. Ervaring met HRIS en workforce planning.',
    candidateCount: 15
  },
  {
    id: 7,
    name: 'DevOps Engineers',
    description: 'CI/CD, cloud platforms (AWS, Azure), containerisatie en infrastructure as code. Monitoring en systeemoptimalisatie.',
    candidateCount: 9
  },
  {
    id: 8,
    name: 'UX/UI Designers',
    description: 'User research, wireframing, prototyping en visual design. Ervaring met design tools en design thinking methodologie.',
    candidateCount: 22
  }
];

export const TalentPoolsPage: React.FC = () => {
  return (
    <div>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>Talentpools</h1>
      <p style={{ color: '#6b7280', marginBottom: '24px' }}>Beheer uw talentpools.</p>
      
      {/* Talent Pools List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {mockTalentPools.map((pool) => (
          <div key={pool.id} className="card card-hover p-6">
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
                  {pool.name}
                </h3>
                <p style={{ color: '#6b7280', lineHeight: '1.5', fontSize: '14px' }}>
                  {pool.description}
                </p>
              </div>
              
              <div style={{ marginLeft: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ 
                  backgroundColor: '#dbeafe', 
                  color: '#1e40af', 
                  borderRadius: '8px', 
                  padding: '8px 16px', 
                  minWidth: '100px', 
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{pool.candidateCount}</div>
                  <div style={{ fontSize: '12px', fontWeight: '500' }}>Kandidaten</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

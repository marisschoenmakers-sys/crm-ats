import { supabase } from '../lib/supabase';

// ============================================
// SEED DATABASE WITH MOCK DATA
// ============================================

export async function seedDatabase(): Promise<{ success: boolean; message: string }> {
  if (!supabase) {
    return { success: false, message: 'Supabase niet geconfigureerd' };
  }

  try {
    // 1. Get or create Pipeline Stages
    console.log('Checking pipeline stages...');
    let stageIds: Record<string, string> = {};
    const { data: existingStages } = await supabase.from('pipeline_stages').select('id, slug');
    
    if (!existingStages || existingStages.length === 0) {
      console.log('Inserting pipeline stages...');
      const { data: newStages, error: stagesError } = await supabase.from('pipeline_stages').insert([
        { name: 'Nieuw', slug: 'nieuw', order_index: 1, color: '#6B7280', is_active: true },
        { name: 'Screening', slug: 'screening', order_index: 2, color: '#3B82F6', is_active: true },
        { name: 'Telefoon Interview', slug: 'telefoon', order_index: 3, color: '#8B5CF6', is_active: true },
        { name: 'Interview', slug: 'interview', order_index: 4, color: '#F59E0B', is_active: true },
        { name: 'Assessment', slug: 'assessment', order_index: 5, color: '#EC4899', is_active: true },
        { name: 'Aanbieding', slug: 'aanbieding', order_index: 6, color: '#10B981', is_active: true },
        { name: 'Aangenomen', slug: 'aangenomen', order_index: 7, color: '#059669', is_active: true },
        { name: 'Afgewezen', slug: 'afgewezen', order_index: 8, color: '#EF4444', is_active: true },
      ] as any).select();
      if (stagesError) throw new Error(`Pipeline stages: ${stagesError.message}`);
      if (newStages) {
        newStages.forEach((s: any) => { stageIds[s.slug] = s.id; });
      }
    } else {
      existingStages.forEach((s: any) => { stageIds[s.slug] = s.id; });
    }

    // 2. Insert Companies
    console.log('Inserting companies...');
    const { data: companies, error: companiesError } = await supabase.from('companies').insert([
      { name: 'TechVentures BV', industry: 'Technology', website: 'https://techventures.nl', location: 'Amsterdam', description: 'Innovatief technologiebedrijf.', priority: 'Hoog' },
      { name: 'FinanceFirst NV', industry: 'Finance', website: 'https://financefirst.nl', location: 'Rotterdam', description: 'Financiële dienstverlener.', priority: 'Hoog' },
      { name: 'HealthCare Plus', industry: 'Healthcare', website: 'https://healthcareplus.nl', location: 'Utrecht', description: 'Moderne zorginstelling.', priority: 'Middel' },
      { name: 'GreenEnergy Solutions', industry: 'Energy', website: 'https://greenenergy.nl', location: 'Eindhoven', description: 'Duurzame energieleverancier.', priority: 'Middel' },
      { name: 'LogiTrans BV', industry: 'Logistics', website: 'https://logitrans.nl', location: 'Breda', description: 'Logistiek bedrijf.', priority: 'Laag' },
      { name: 'MediaWorks Agency', industry: 'Marketing', website: 'https://mediaworks.nl', location: 'Amsterdam', description: 'Creatief marketingbureau.', priority: 'Middel' },
      { name: 'BuildRight Construction', industry: 'Construction', website: 'https://buildright.nl', location: 'Den Haag', description: 'Bouwbedrijf.', priority: 'Laag' },
      { name: 'EduTech Academy', industry: 'Education', website: 'https://edutech.nl', location: 'Groningen', description: 'Online onderwijsplatform.', priority: 'Middel' },
      { name: 'RetailMax BV', industry: 'Retail', website: 'https://retailmax.nl', location: 'Tilburg', description: 'E-commerce platform.', priority: 'Hoog' },
      { name: 'ConsultPro Partners', industry: 'Consulting', website: 'https://consultpro.nl', location: 'Amsterdam', description: 'Management consultancy.', priority: 'Hoog' },
    ] as any).select();
    if (companiesError) throw new Error(`Companies: ${companiesError.message}`);
    
    const companyIds: Record<string, string> = {};
    if (companies) {
      companies.forEach((c: any) => { companyIds[c.name] = c.id; });
    }

    // 3. Insert Vacancies
    console.log('Inserting vacancies...');
    const { data: vacancies, error: vacanciesError } = await supabase.from('vacancies').insert([
      { title: 'Senior Software Engineer', company_id: companyIds['TechVentures BV'], company_name: 'TechVentures BV', location: 'Amsterdam', employment_type: 'Fulltime', salary_range: '€70.000 - €90.000', description: 'Ervaren software engineer gezocht.', requirements: ['5+ jaar ervaring', 'Python/Java'], sector: 'IT', priority: 'Hoog', status: 'Actief' },
      { title: 'Frontend Developer', company_id: companyIds['TechVentures BV'], company_name: 'TechVentures BV', location: 'Amsterdam', employment_type: 'Fulltime', salary_range: '€50.000 - €65.000', description: 'React developer gezocht.', requirements: ['React', 'TypeScript'], sector: 'IT', priority: 'Middel', status: 'Actief' },
      { title: 'Financial Analyst', company_id: companyIds['FinanceFirst NV'], company_name: 'FinanceFirst NV', location: 'Rotterdam', employment_type: 'Fulltime', salary_range: '€55.000 - €70.000', description: 'Financieel analist gezocht.', requirements: ['WO Finance', 'Excel'], sector: 'Finance', priority: 'Hoog', status: 'Actief' },
      { title: 'Risk Manager', company_id: companyIds['FinanceFirst NV'], company_name: 'FinanceFirst NV', location: 'Rotterdam', employment_type: 'Fulltime', salary_range: '€75.000 - €95.000', description: 'Risk manager gezocht.', requirements: ['CFA', 'Risk management'], sector: 'Finance', priority: 'Hoog', status: 'Actief' },
      { title: 'Verpleegkundige', company_id: companyIds['HealthCare Plus'], company_name: 'HealthCare Plus', location: 'Utrecht', employment_type: 'Fulltime', salary_range: '€35.000 - €45.000', description: 'Verpleegkundige gezocht.', requirements: ['BIG registratie'], sector: 'Healthcare', priority: 'Middel', status: 'Actief' },
      { title: 'Data Scientist', company_id: companyIds['HealthCare Plus'], company_name: 'HealthCare Plus', location: 'Utrecht', employment_type: 'Fulltime', salary_range: '€60.000 - €80.000', description: 'Data scientist gezocht.', requirements: ['Python', 'ML'], sector: 'Healthcare', priority: 'Hoog', status: 'Actief' },
      { title: 'Solar Engineer', company_id: companyIds['GreenEnergy Solutions'], company_name: 'GreenEnergy Solutions', location: 'Eindhoven', employment_type: 'Fulltime', salary_range: '€50.000 - €65.000', description: 'Solar engineer gezocht.', requirements: ['PV kennis'], sector: 'Energy', priority: 'Middel', status: 'Actief' },
      { title: 'Operations Manager', company_id: companyIds['LogiTrans BV'], company_name: 'LogiTrans BV', location: 'Breda', employment_type: 'Fulltime', salary_range: '€55.000 - €70.000', description: 'Operations manager gezocht.', requirements: ['Logistiek ervaring'], sector: 'Logistics', priority: 'Middel', status: 'Actief' },
      { title: 'Digital Marketing Manager', company_id: companyIds['MediaWorks Agency'], company_name: 'MediaWorks Agency', location: 'Amsterdam', employment_type: 'Fulltime', salary_range: '€50.000 - €65.000', description: 'Marketing manager gezocht.', requirements: ['Google Ads'], sector: 'Marketing', priority: 'Middel', status: 'Actief' },
      { title: 'Content Creator', company_id: companyIds['MediaWorks Agency'], company_name: 'MediaWorks Agency', location: 'Amsterdam', employment_type: 'Parttime', salary_range: '€30.000 - €40.000', description: 'Content creator gezocht.', requirements: ['Video editing'], sector: 'Marketing', priority: 'Laag', status: 'Actief' },
      { title: 'Project Manager Bouw', company_id: companyIds['BuildRight Construction'], company_name: 'BuildRight Construction', location: 'Den Haag', employment_type: 'Fulltime', salary_range: '€60.000 - €75.000', description: 'Project manager gezocht.', requirements: ['Bouwkunde'], sector: 'Construction', priority: 'Middel', status: 'Actief' },
      { title: 'Instructional Designer', company_id: companyIds['EduTech Academy'], company_name: 'EduTech Academy', location: 'Groningen', employment_type: 'Fulltime', salary_range: '€45.000 - €55.000', description: 'Instructional designer gezocht.', requirements: ['E-learning'], sector: 'Education', priority: 'Laag', status: 'Actief' },
      { title: 'E-commerce Manager', company_id: companyIds['RetailMax BV'], company_name: 'RetailMax BV', location: 'Tilburg', employment_type: 'Fulltime', salary_range: '€55.000 - €70.000', description: 'E-commerce manager gezocht.', requirements: ['CRO kennis'], sector: 'Retail', priority: 'Hoog', status: 'Actief' },
      { title: 'Customer Service Lead', company_id: companyIds['RetailMax BV'], company_name: 'RetailMax BV', location: 'Tilburg', employment_type: 'Fulltime', salary_range: '€40.000 - €50.000', description: 'CS lead gezocht.', requirements: ['Zendesk'], sector: 'Retail', priority: 'Middel', status: 'Actief' },
      { title: 'Management Consultant', company_id: companyIds['ConsultPro Partners'], company_name: 'ConsultPro Partners', location: 'Amsterdam', employment_type: 'Fulltime', salary_range: '€70.000 - €100.000', description: 'Consultant gezocht.', requirements: ['MBA'], sector: 'Consulting', priority: 'Hoog', status: 'Actief' },
      { title: 'Junior Developer', company_id: companyIds['TechVentures BV'], company_name: 'TechVentures BV', location: 'Amsterdam', employment_type: 'Fulltime', salary_range: '€35.000 - €45.000', description: 'Junior developer gezocht.', requirements: ['HBO ICT'], sector: 'IT', priority: 'Laag', status: 'Actief' },
      { title: 'HR Business Partner', company_id: companyIds['FinanceFirst NV'], company_name: 'FinanceFirst NV', location: 'Rotterdam', employment_type: 'Fulltime', salary_range: '€55.000 - €70.000', description: 'HR BP gezocht.', requirements: ['HR ervaring'], sector: 'HR', priority: 'Middel', status: 'Actief' },
      { title: 'DevOps Engineer', company_id: companyIds['TechVentures BV'], company_name: 'TechVentures BV', location: 'Amsterdam', employment_type: 'Fulltime', salary_range: '€60.000 - €80.000', description: 'DevOps engineer gezocht.', requirements: ['AWS', 'Kubernetes'], sector: 'IT', priority: 'Hoog', status: 'Actief' },
      { title: 'UX Designer', company_id: companyIds['MediaWorks Agency'], company_name: 'MediaWorks Agency', location: 'Amsterdam', employment_type: 'Fulltime', salary_range: '€45.000 - €60.000', description: 'UX designer gezocht.', requirements: ['Figma'], sector: 'Design', priority: 'Middel', status: 'Actief' },
      { title: 'Accountant', company_id: companyIds['FinanceFirst NV'], company_name: 'FinanceFirst NV', location: 'Rotterdam', employment_type: 'Fulltime', salary_range: '€45.000 - €60.000', description: 'Accountant gezocht.', requirements: ['RA/AA'], sector: 'Finance', priority: 'Laag', status: 'Actief' },
    ] as any).select();
    if (vacanciesError) throw new Error(`Vacancies: ${vacanciesError.message}`);
    
    const vacancyIds: string[] = vacancies ? vacancies.map((v: any) => v.id) : [];

    // 4. Insert Candidates (50)
    console.log('Inserting candidates...');
    const candidateData = [];
    const firstNames = ['Emma', 'Daan', 'Sophie', 'Lucas', 'Julia', 'Sem', 'Lotte', 'Finn', 'Isa', 'Noah', 'Tess', 'Levi', 'Mila', 'Jesse', 'Zoë', 'Milan', 'Eva', 'Luuk', 'Noor', 'Bram', 'Fleur', 'Max', 'Saar', 'Thijs', 'Lynn', 'Ruben', 'Anna', 'Thomas', 'Lisa', 'Stijn', 'Vera', 'Jasper', 'Roos', 'Tim', 'Sara', 'Nick', 'Eline', 'Joris', 'Kim', 'Wouter', 'Amber', 'Daniël', 'Merel', 'Rick', 'Iris', 'Bart', 'Laura', 'Mark', 'Femke', 'Jeroen'];
    const lastNames = ['de Vries', 'Jansen', 'Bakker', 'Visser', 'Smit', 'Meijer', 'de Boer', 'Mulder', 'de Groot', 'Bos', 'Vos', 'Peters', 'Hendriks', 'van Dijk', 'van den Berg', 'Dekker', 'van Leeuwen', 'Willems', 'de Jong', 'van der Linden', 'Jacobs', 'van der Meer', 'Koster', 'van Beek', 'Vermeer', 'Brouwer', 'van Vliet', 'de Wit', 'van der Heijden', 'Kuiper', 'van Dam', 'Schouten', 'van Houten', 'Groen', 'van Dijk', 'Bosman', 'Prins', 'van Rijn', 'de Graaf', 'Kok', 'van Essen', 'Hofman', 'van der Wal', 'Dijkstra', 'van Zanten', 'Molenaar', 'van Wijk', 'Veldman', 'de Haan', 'van Schaik'];
    const jobTitles = ['Software Engineer', 'Financial Analyst', 'UX Designer', 'Project Manager', 'Data Scientist', 'Marketing Manager', 'HR Specialist', 'DevOps Engineer', 'Content Creator', 'Accountant', 'Verpleegkundige', 'Frontend Developer', 'Risk Manager', 'Solar Engineer', 'Management Consultant', 'Operations Manager', 'Instructional Designer', 'E-commerce Manager', 'Customer Service Lead', 'Junior Developer'];
    const locations = ['Amsterdam', 'Rotterdam', 'Utrecht', 'Den Haag', 'Eindhoven', 'Groningen', 'Breda', 'Tilburg'];
    const sources = ['LinkedIn', 'Indeed', 'Referral'];
    
    for (let i = 0; i < 50; i++) {
      candidateData.push({
        first_name: firstNames[i],
        last_name: lastNames[i],
        email: `${firstNames[i].toLowerCase()}.${lastNames[i].toLowerCase().replace(/ /g, '')}@email.nl`,
        phone: `+3161234${String(5000 + i).padStart(4, '0')}`,
        location: locations[i % locations.length],
        job_title: jobTitles[i % jobTitles.length],
        summary: `Ervaren ${jobTitles[i % jobTitles.length]} met sterke vaardigheden.`,
        source: sources[i % sources.length],
        tags: [jobTitles[i % jobTitles.length].split(' ')[0], locations[i % locations.length]]
      });
    }
    
    const { data: candidates, error: candidatesError } = await supabase.from('candidates').insert(candidateData as any).select();
    if (candidatesError) throw new Error(`Candidates: ${candidatesError.message}`);
    
    const candidateIds: string[] = candidates ? candidates.map((c: any) => c.id) : [];

    // 5. Insert Candidate-Vacancy relationships (25 connections)
    console.log('Inserting candidate-vacancy relationships...');
    console.log('Available stage IDs:', stageIds);
    
    // Get all stage IDs as array for fallback
    const allStageIdValues = Object.values(stageIds);
    if (allStageIdValues.length === 0) {
      console.warn('No pipeline stages found, skipping candidate-vacancy relationships');
    } else {
      const cvData = [];
      for (let i = 0; i < 25 && i < candidateIds.length && vacancyIds.length > 0; i++) {
        // Use stage IDs by index as fallback
        const stageId = allStageIdValues[i % allStageIdValues.length];
        cvData.push({
          candidate_id: candidateIds[i],
          vacancy_id: vacancyIds[i % vacancyIds.length],
          stage_id: stageId
        });
      }
      
      const { error: cvError } = await supabase.from('candidate_vacancies').insert(cvData as any);
      if (cvError) throw new Error(`Candidate-Vacancies: ${cvError.message}`);
    }

    // 6. Insert Evaluation Templates
    console.log('Inserting evaluation templates...');
    const templateData = [
      { name: 'Technisch Interview', description: 'Evaluatie voor technische interviews', category: 'Technical', is_active: true },
      { name: 'HR Screening', description: 'Eerste screening door HR', category: 'HR', is_active: true },
      { name: 'Culture Fit Assessment', description: 'Beoordeling culturele fit', category: 'Culture', is_active: true },
      { name: 'Management Interview', description: 'Evaluatie door hiring manager', category: 'Management', is_active: true },
      { name: 'Case Study Presentatie', description: 'Beoordeling case study', category: 'Assessment', is_active: true },
      { name: 'Telefoon Screening', description: 'Telefonische screening', category: 'HR', is_active: true },
      { name: 'Coding Challenge', description: 'Technische coding opdracht', category: 'Technical', is_active: true },
      { name: 'Behavioral Interview', description: 'Gedragsgerichte vragen', category: 'HR', is_active: true },
      { name: 'Leadership Assessment', description: 'Leiderschapskwaliteiten', category: 'Management', is_active: true },
      { name: 'Portfolio Review', description: 'Beoordeling portfolio', category: 'Assessment', is_active: true },
      { name: 'Final Round Interview', description: 'Laatste interview ronde', category: 'Management', is_active: true },
      { name: 'Junior Developer Assessment', description: 'Evaluatie junior posities', category: 'Technical', is_active: true },
      { name: 'Senior Developer Assessment', description: 'Evaluatie senior posities', category: 'Technical', is_active: true },
      { name: 'Sales Pitch Evaluation', description: 'Verkoopvaardigheden', category: 'Assessment', is_active: true },
      { name: 'Customer Service Roleplay', description: 'Rollenspel klantenservice', category: 'Assessment', is_active: true },
      { name: 'Finance Knowledge Test', description: 'Financiële kennistoets', category: 'Technical', is_active: true },
      { name: 'Design Critique', description: 'Design vaardigheden', category: 'Assessment', is_active: true },
      { name: 'Team Collaboration Assessment', description: 'Samenwerking evaluatie', category: 'Culture', is_active: true },
      { name: 'Problem Solving Interview', description: 'Probleemoplossend vermogen', category: 'Assessment', is_active: true },
      { name: 'Reference Check Form', description: 'Referentie check', category: 'HR', is_active: true },
    ];
    const { error: templatesError } = await supabase.from('evaluation_templates').insert(templateData as any);
    if (templatesError) throw new Error(`Evaluation Templates: ${templatesError.message}`);

    // 7. Insert Talent Pools
    console.log('Inserting talent pools...');
    const { data: pools, error: poolsError } = await supabase.from('talent_pools').insert([
      { name: 'Top Tech Talent', description: 'Hoogwaardige technische kandidaten', color: '#3B82F6' },
      { name: 'Finance Professionals', description: 'Ervaren finance kandidaten', color: '#10B981' },
      { name: 'Future Leaders', description: 'Kandidaten met leiderschapspotentieel', color: '#8B5CF6' },
      { name: 'Creative Minds', description: 'Creatieve professionals', color: '#F59E0B' },
      { name: 'Healthcare Specialists', description: 'Zorg professionals', color: '#EC4899' },
    ] as any).select();
    if (poolsError) throw new Error(`Talent Pools: ${poolsError.message}`);

    // 8. Insert Pool Members
    if (pools && pools.length > 0 && candidateIds.length >= 10) {
      console.log('Inserting pool members...');
      const poolMemberData = [
        { pool_id: pools[0].id, candidate_id: candidateIds[0], added_by: 'Maris', notes: 'Top talent' },
        { pool_id: pools[0].id, candidate_id: candidateIds[7], added_by: 'Maris', notes: 'DevOps expert' },
        { pool_id: pools[0].id, candidate_id: candidateIds[11], added_by: 'Maris', notes: 'Frontend developer' },
        { pool_id: pools[1].id, candidate_id: candidateIds[1], added_by: 'Maris', notes: 'Sterke analyst' },
        { pool_id: pools[1].id, candidate_id: candidateIds[9], added_by: 'Maris', notes: 'Accountant' },
        { pool_id: pools[2].id, candidate_id: candidateIds[3], added_by: 'Maris', notes: 'Project manager' },
        { pool_id: pools[2].id, candidate_id: candidateIds[14], added_by: 'Maris', notes: 'Consultant' },
        { pool_id: pools[3].id, candidate_id: candidateIds[2], added_by: 'Maris', notes: 'UX designer' },
        { pool_id: pools[3].id, candidate_id: candidateIds[8], added_by: 'Maris', notes: 'Content creator' },
        { pool_id: pools[4].id, candidate_id: candidateIds[10], added_by: 'Maris', notes: 'Verpleegkundige' },
      ];
      const { error: membersError } = await supabase.from('pool_members').insert(poolMemberData as any);
      if (membersError) console.warn('Pool members warning:', membersError.message);
    }

    // 9. Insert Company Contacts
    console.log('Inserting company contacts...');
    const contactData = Object.entries(companyIds).map(([name, id], index) => ({
      company_id: id,
      first_name: ['Jan', 'Peter', 'Maria', 'Tom', 'Sandra', 'Mark', 'Ellen', 'Robert', 'Anne', 'Kees'][index] || 'Contact',
      last_name: ['van der Berg', 'de Vries', 'Jansen', 'Hendriks', 'Mulder', 'Visser', 'Smit', 'de Boer', 'Meijer', 'van Dijk'][index] || 'Persoon',
      email: `contact@${name.toLowerCase().replace(/ /g, '')}.nl`,
      phone: `+3120123456${index}`,
      role: 'HR Manager',
      is_primary: true
    }));
    const { error: contactsError } = await supabase.from('company_contacts').insert(contactData as any);
    if (contactsError) console.warn('Company contacts warning:', contactsError.message);

    // 10. Insert Calendar Events (Agenda)
    console.log('Inserting calendar events...');
    const now = new Date();
    const calendarEvents = [
      { title: 'Interview Emma de Vries', description: 'Eerste interview voor Senior Software Engineer positie', start_time: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString(), end_time: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000).toISOString(), event_type: 'interview', location: 'Kantoor Amsterdam', candidate_id: candidateIds[0], vacancy_id: vacancyIds[0], is_completed: false },
      { title: 'Telefonisch interview Daan Jansen', description: 'Screening call', start_time: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000).toISOString(), end_time: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000).toISOString(), event_type: 'call', candidate_id: candidateIds[1], vacancy_id: vacancyIds[2], is_completed: false },
      { title: 'Team meeting recruitment', description: 'Wekelijkse sync', start_time: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString(), end_time: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000).toISOString(), event_type: 'meeting', location: 'Vergaderzaal 1', is_completed: false },
      { title: 'Interview Sophie Bakker', description: 'UX Designer interview', start_time: new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000).toISOString(), end_time: new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000 + 90 * 60 * 1000).toISOString(), event_type: 'interview', location: 'Online (Teams)', candidate_id: candidateIds[2], vacancy_id: vacancyIds[18], is_completed: false },
      { title: 'Klantgesprek TechVentures', description: 'Bespreken nieuwe vacatures', start_time: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString(), end_time: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000).toISOString(), event_type: 'meeting', location: 'TechVentures kantoor', is_completed: false },
      { title: 'Assessment Lucas Visser', description: 'Project management assessment', start_time: new Date(now.getTime() + 6 * 24 * 60 * 60 * 1000).toISOString(), end_time: new Date(now.getTime() + 6 * 24 * 60 * 60 * 1000 + 120 * 60 * 1000).toISOString(), event_type: 'interview', candidate_id: candidateIds[3], is_completed: false },
      { title: 'Eindgesprek Julia Smit', description: 'Finaal interview Data Scientist', start_time: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(), end_time: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000).toISOString(), event_type: 'interview', location: 'Kantoor Utrecht', candidate_id: candidateIds[4], vacancy_id: vacancyIds[5], is_completed: false },
      { title: 'Intake nieuwe klant', description: 'RetailMax BV wil samenwerken', start_time: new Date(now.getTime() + 8 * 24 * 60 * 60 * 1000).toISOString(), end_time: new Date(now.getTime() + 8 * 24 * 60 * 60 * 1000 + 90 * 60 * 1000).toISOString(), event_type: 'meeting', is_completed: false },
    ];
    const { error: calendarError } = await supabase.from('calendar_events').insert(calendarEvents as any);
    if (calendarError) console.warn('Calendar events warning:', calendarError.message);

    // 11. Insert Tasks (Taken)
    console.log('Inserting tasks...');
    const tasks = [
      { title: 'CV beoordelen Emma de Vries', description: 'CV en portfolio bekijken voor interview', due_date: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000).toISOString(), priority: 'high', status: 'todo', candidate_id: candidateIds[0] },
      { title: 'Referenties checken Daan Jansen', due_date: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString(), priority: 'medium', status: 'todo', candidate_id: candidateIds[1] },
      { title: 'Vacaturetekst updaten Senior Developer', description: 'Salaris range aanpassen', due_date: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString(), priority: 'low', status: 'in_progress', vacancy_id: vacancyIds[0] },
      { title: 'Feedback versturen Sophie Bakker', due_date: new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000).toISOString(), priority: 'high', status: 'todo', candidate_id: candidateIds[2] },
      { title: 'Contract opstellen Lucas Visser', description: 'Arbeidsvoorwaarden bespreken', due_date: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString(), priority: 'high', status: 'todo', candidate_id: candidateIds[3] },
      { title: 'LinkedIn vacature plaatsen', description: 'Frontend Developer vacature', due_date: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000).toISOString(), priority: 'medium', status: 'todo', vacancy_id: vacancyIds[1] },
      { title: 'Intake gesprek voorbereiden', description: 'RetailMax BV', due_date: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(), priority: 'medium', status: 'todo' },
      { title: 'Evaluatieformulier invullen', description: 'Interview Sem Meijer', due_date: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString(), priority: 'low', status: 'completed', candidate_id: candidateIds[5] },
      { title: 'Afwijzingsmail versturen', description: 'Kandidaten die niet door zijn', due_date: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000).toISOString(), priority: 'medium', status: 'todo' },
      { title: 'Wekelijkse rapportage maken', due_date: new Date(now.getTime() + 6 * 24 * 60 * 60 * 1000).toISOString(), priority: 'low', status: 'todo' },
    ];
    const { error: tasksError } = await supabase.from('tasks').insert(tasks as any);
    if (tasksError) console.warn('Tasks warning:', tasksError.message);

    // 12. Insert Emails
    console.log('Inserting emails...');
    const emails = [
      { subject: 'Sollicitatie Senior Software Engineer', body: 'Beste recruiter,\n\nHierbij solliciteer ik naar de functie van Senior Software Engineer bij TechVentures BV.\n\nMet vriendelijke groet,\nEmma de Vries', from_email: 'emma.devries@email.nl', from_name: 'Emma de Vries', to_email: 'recruitment@ats.nl', to_name: 'Recruitment Team', folder: 'inbox', is_read: true, is_starred: true, candidate_id: candidateIds[0], received_at: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString() },
      { subject: 'Re: Uitnodiging interview', body: 'Beste Emma,\n\nBedankt voor je reactie. We nodigen je graag uit voor een interview.\n\nMet vriendelijke groet,\nRecruitment Team', from_email: 'recruitment@ats.nl', from_name: 'Recruitment Team', to_email: 'emma.devries@email.nl', to_name: 'Emma de Vries', folder: 'sent', is_read: true, candidate_id: candidateIds[0], received_at: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString() },
      { subject: 'Interesse in Financial Analyst positie', body: 'Geachte heer/mevrouw,\n\nIk heb interesse in de Financial Analyst positie.\n\nMet vriendelijke groet,\nDaan Jansen', from_email: 'daan.jansen@email.nl', from_name: 'Daan Jansen', to_email: 'recruitment@ats.nl', to_name: 'Recruitment Team', folder: 'inbox', is_read: false, candidate_id: candidateIds[1], received_at: new Date(now.getTime() - 5 * 60 * 60 * 1000).toISOString() },
      { subject: 'Portfolio UX Designer', body: 'Hallo,\n\nHierbij stuur ik mijn portfolio voor de UX Designer functie.\n\nGroeten,\nSophie Bakker', from_email: 'sophie.bakker@email.nl', from_name: 'Sophie Bakker', to_email: 'recruitment@ats.nl', folder: 'inbox', is_read: false, is_starred: true, candidate_id: candidateIds[2], received_at: new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString() },
      { subject: 'Vraag over vacature', body: 'Beste,\n\nIk heb een vraag over de Project Manager vacature. Is remote werken mogelijk?\n\nMvg,\nLucas Visser', from_email: 'lucas.visser@email.nl', from_name: 'Lucas Visser', to_email: 'recruitment@ats.nl', folder: 'inbox', is_read: true, candidate_id: candidateIds[3], received_at: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString() },
      { subject: 'Nieuwe vacatures TechVentures', body: 'Beste partner,\n\nWij hebben 3 nieuwe vacatures die we graag met jullie willen bespreken.\n\nMet vriendelijke groet,\nJan van der Berg\nTechVentures BV', from_email: 'jan@techventures.nl', from_name: 'Jan van der Berg', to_email: 'recruitment@ats.nl', folder: 'inbox', is_read: false, received_at: new Date(now.getTime() - 30 * 60 * 1000).toISOString() },
      { subject: 'Bevestiging interview', body: 'Beste Julia,\n\nHierbij bevestigen we je interview op vrijdag om 14:00.\n\nTot dan!', from_email: 'recruitment@ats.nl', from_name: 'Recruitment Team', to_email: 'julia.smit@email.nl', to_name: 'Julia Smit', folder: 'sent', is_read: true, candidate_id: candidateIds[4], received_at: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString() },
      { subject: 'Concept: Vacaturetekst DevOps', body: 'Dit is een concept voor de DevOps Engineer vacature...', from_email: 'recruitment@ats.nl', from_name: 'Recruitment Team', to_email: '', folder: 'drafts', is_read: true, vacancy_id: vacancyIds[17], received_at: new Date().toISOString() },
    ];
    const { error: emailsError } = await supabase.from('emails').insert(emails as any);
    if (emailsError) console.warn('Emails warning:', emailsError.message);

    // 13. Insert Activities
    console.log('Inserting activities...');
    const activities = [
      { activity_type: 'vacancy_created', title: 'Vacature aangemaakt', description: 'Senior Software Engineer', user_name: 'Maris', entity_type: 'vacancy', created_at: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString() },
      { activity_type: 'candidate_created', title: 'Kandidaat toegevoegd', description: 'Emma de Vries', user_name: 'Maris', entity_type: 'candidate', created_at: new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString() },
      { activity_type: 'note_added', title: 'Notitie geplaatst', description: 'Bij Emma de Vries', user_name: 'Maris', entity_type: 'candidate', created_at: new Date(now.getTime() - 4 * 60 * 60 * 1000).toISOString() },
      { activity_type: 'candidate_stage_changed', title: 'Kandidaat verplaatst', description: 'Daan Jansen → Telefonisch interview', user_name: 'Maris', entity_type: 'candidate', created_at: new Date(now.getTime() - 5 * 60 * 60 * 1000).toISOString() },
      { activity_type: 'evaluation_completed', title: 'Evaluatie ingevuld', description: 'Sophie Bakker - Technisch Interview', user_name: 'Maris', entity_type: 'candidate', created_at: new Date(now.getTime() - 6 * 60 * 60 * 1000).toISOString() },
      { activity_type: 'task_created', title: 'Taak aangemaakt', description: 'CV beoordelen Emma de Vries', user_name: 'Maris', entity_type: 'task', created_at: new Date(now.getTime() - 8 * 60 * 60 * 1000).toISOString() },
      { activity_type: 'company_created', title: 'Bedrijf toegevoegd', description: 'TechVentures BV', user_name: 'Maris', entity_type: 'company', created_at: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString() },
      { activity_type: 'vacancy_updated', title: 'Vacature bijgewerkt', description: 'Frontend Developer', user_name: 'Maris', entity_type: 'vacancy', created_at: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString() },
      { activity_type: 'email_sent', title: 'E-mail verzonden', description: 'Naar Emma de Vries: Uitnodiging interview', user_name: 'Maris', entity_type: 'email', created_at: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString() },
      { activity_type: 'file_uploaded', title: 'Bestand geüpload', description: 'CV_Emma_de_Vries.pdf', user_name: 'Maris', entity_type: 'file', created_at: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString() },
    ];
    const { error: activitiesError } = await supabase.from('activities').insert(activities as any);
    if (activitiesError) console.warn('Activities warning:', activitiesError.message);

    console.log('Seed completed successfully!');
    return { 
      success: true, 
      message: `Database succesvol gevuld met ${candidateIds.length} kandidaten, ${vacancyIds.length} vacatures, ${Object.keys(companyIds).length} bedrijven, agenda items, taken en emails!` 
    };

  } catch (error) {
    console.error('Seed error:', error);
    return { success: false, message: `Fout bij seeden: ${error instanceof Error ? error.message : 'Onbekende fout'}` };
  }
}

export async function clearDatabase(): Promise<{ success: boolean; message: string }> {
  if (!supabase) {
    return { success: false, message: 'Supabase niet geconfigureerd' };
  }

  try {
    console.log('Clearing database...');
    
    // Delete new tables first
    await supabase.from('activities').delete().gte('created_at', '1900-01-01');
    await supabase.from('emails').delete().gte('created_at', '1900-01-01');
    await supabase.from('tasks').delete().gte('created_at', '1900-01-01');
    await supabase.from('calendar_events').delete().gte('created_at', '1900-01-01');
    
    // Delete in correct order due to foreign keys
    await supabase.from('pool_members').delete().gte('created_at', '1900-01-01');
    await supabase.from('talent_pools').delete().gte('created_at', '1900-01-01');
    await supabase.from('candidate_evaluation_answers').delete().gte('created_at', '1900-01-01');
    await supabase.from('candidate_evaluation_forms').delete().gte('created_at', '1900-01-01');
    await supabase.from('evaluation_questions').delete().gte('created_at', '1900-01-01');
    await supabase.from('evaluation_template_sections').delete().gte('created_at', '1900-01-01');
    await supabase.from('evaluation_templates').delete().gte('created_at', '1900-01-01');
    await supabase.from('candidate_stage_history').delete().gte('created_at', '1900-01-01');
    await supabase.from('candidate_vacancies').delete().gte('created_at', '1900-01-01');
    await supabase.from('candidate_activity').delete().gte('created_at', '1900-01-01');
    await supabase.from('candidate_files').delete().gte('created_at', '1900-01-01');
    await supabase.from('candidate_notes').delete().gte('created_at', '1900-01-01');
    await supabase.from('candidates').delete().gte('created_at', '1900-01-01');
    await supabase.from('vacancy_evaluation_templates').delete().gte('created_at', '1900-01-01');
    await supabase.from('vacancies').delete().gte('created_at', '1900-01-01');
    await supabase.from('company_notes').delete().gte('created_at', '1900-01-01');
    await supabase.from('company_contacts').delete().gte('created_at', '1900-01-01');
    await supabase.from('companies').delete().gte('created_at', '1900-01-01');
    // Pipeline stages worden NIET verwijderd
    
    console.log('Database cleared successfully!');
    return { success: true, message: 'Database succesvol geleegd! Je kunt nu op "Database Vullen" klikken.' };
  } catch (error) {
    console.error('Clear error:', error);
    return { success: false, message: `Fout bij legen: ${error instanceof Error ? error.message : 'Onbekende fout'}` };
  }
}

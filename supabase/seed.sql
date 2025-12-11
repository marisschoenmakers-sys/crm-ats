-- ============================================
-- SEED DATA FOR ATS DATABASE
-- 50 Candidates, 20 Vacancies, 20 Evaluation Forms
-- ============================================

-- Clear existing data (in correct order due to foreign keys)
TRUNCATE TABLE candidate_evaluation_answers CASCADE;
TRUNCATE TABLE candidate_evaluation_forms CASCADE;
TRUNCATE TABLE evaluation_questions CASCADE;
TRUNCATE TABLE evaluation_template_sections CASCADE;
TRUNCATE TABLE evaluation_templates CASCADE;
TRUNCATE TABLE candidate_stage_history CASCADE;
TRUNCATE TABLE candidate_vacancies CASCADE;
TRUNCATE TABLE candidate_activity CASCADE;
TRUNCATE TABLE candidate_files CASCADE;
TRUNCATE TABLE candidate_notes CASCADE;
TRUNCATE TABLE candidates CASCADE;
TRUNCATE TABLE vacancy_evaluation_templates CASCADE;
TRUNCATE TABLE vacancies CASCADE;
TRUNCATE TABLE company_notes CASCADE;
TRUNCATE TABLE company_contacts CASCADE;
TRUNCATE TABLE companies CASCADE;
TRUNCATE TABLE pool_members CASCADE;
TRUNCATE TABLE talent_pools CASCADE;
TRUNCATE TABLE pipeline_stages CASCADE;

-- ============================================
-- PIPELINE STAGES
-- ============================================
INSERT INTO pipeline_stages (id, name, slug, order_index, color, is_active) VALUES
('stage-1', 'Nieuw', 'nieuw', 1, '#6B7280', true),
('stage-2', 'Screening', 'screening', 2, '#3B82F6', true),
('stage-3', 'Telefoon Interview', 'telefoon', 3, '#8B5CF6', true),
('stage-4', 'Interview', 'interview', 4, '#F59E0B', true),
('stage-5', 'Assessment', 'assessment', 5, '#EC4899', true),
('stage-6', 'Aanbieding', 'aanbieding', 6, '#10B981', true),
('stage-7', 'Aangenomen', 'aangenomen', 7, '#059669', true),
('stage-8', 'Afgewezen', 'afgewezen', 8, '#EF4444', true);

-- ============================================
-- COMPANIES (10 companies)
-- ============================================
INSERT INTO companies (id, name, industry, website, location, description, priority) VALUES
('comp-1', 'TechVentures BV', 'Technology', 'https://techventures.nl', 'Amsterdam', 'Innovatief technologiebedrijf gespecialiseerd in AI en machine learning oplossingen.', 'Hoog'),
('comp-2', 'FinanceFirst NV', 'Finance', 'https://financefirst.nl', 'Rotterdam', 'Toonaangevende financiële dienstverlener met focus op duurzame investeringen.', 'Hoog'),
('comp-3', 'HealthCare Plus', 'Healthcare', 'https://healthcareplus.nl', 'Utrecht', 'Moderne zorginstelling met innovatieve digitale gezondheidsoplossingen.', 'Middel'),
('comp-4', 'GreenEnergy Solutions', 'Energy', 'https://greenenergy.nl', 'Eindhoven', 'Duurzame energieleverancier met focus op zonne- en windenergie.', 'Middel'),
('comp-5', 'LogiTrans BV', 'Logistics', 'https://logitrans.nl', 'Breda', 'Logistiek bedrijf gespecialiseerd in last-mile delivery.', 'Laag'),
('comp-6', 'MediaWorks Agency', 'Marketing', 'https://mediaworks.nl', 'Amsterdam', 'Creatief marketingbureau voor digitale campagnes.', 'Middel'),
('comp-7', 'BuildRight Construction', 'Construction', 'https://buildright.nl', 'Den Haag', 'Bouwbedrijf gespecialiseerd in duurzame woningbouw.', 'Laag'),
('comp-8', 'EduTech Academy', 'Education', 'https://edutech.nl', 'Groningen', 'Online onderwijsplatform voor professionele ontwikkeling.', 'Middel'),
('comp-9', 'RetailMax BV', 'Retail', 'https://retailmax.nl', 'Tilburg', 'E-commerce platform voor consumentenelektronica.', 'Hoog'),
('comp-10', 'ConsultPro Partners', 'Consulting', 'https://consultpro.nl', 'Amsterdam', 'Management consultancy voor digitale transformatie.', 'Hoog');

-- ============================================
-- VACANCIES (20 vacancies)
-- ============================================
INSERT INTO vacancies (id, title, company_id, company_name, location, employment_type, salary_range, description, requirements, sector, priority, status) VALUES
('vac-1', 'Senior Software Engineer', 'comp-1', 'TechVentures BV', 'Amsterdam', 'Fulltime', '€70.000 - €90.000', 'Wij zoeken een ervaren software engineer voor ons AI-team.', ARRAY['5+ jaar ervaring', 'Python/Java', 'Machine Learning kennis'], 'IT', 'Hoog', 'Actief'),
('vac-2', 'Frontend Developer', 'comp-1', 'TechVentures BV', 'Amsterdam', 'Fulltime', '€50.000 - €65.000', 'Ontwikkel moderne web applicaties met React en TypeScript.', ARRAY['3+ jaar ervaring', 'React', 'TypeScript'], 'IT', 'Middel', 'Actief'),
('vac-3', 'Financial Analyst', 'comp-2', 'FinanceFirst NV', 'Rotterdam', 'Fulltime', '€55.000 - €70.000', 'Analyseer financiële data en ondersteun investeringsbeslissingen.', ARRAY['WO Finance', 'Excel expert', 'SQL kennis'], 'Finance', 'Hoog', 'Actief'),
('vac-4', 'Risk Manager', 'comp-2', 'FinanceFirst NV', 'Rotterdam', 'Fulltime', '€75.000 - €95.000', 'Beheer en monitor risico''s binnen de organisatie.', ARRAY['5+ jaar ervaring', 'CFA certificering', 'Risk management'], 'Finance', 'Hoog', 'Actief'),
('vac-5', 'Verpleegkundige', 'comp-3', 'HealthCare Plus', 'Utrecht', 'Fulltime', '€35.000 - €45.000', 'Zorg voor patiënten in onze moderne kliniek.', ARRAY['BIG registratie', 'HBO Verpleegkunde', 'Teamplayer'], 'Healthcare', 'Middel', 'Actief'),
('vac-6', 'Data Scientist', 'comp-3', 'HealthCare Plus', 'Utrecht', 'Fulltime', '€60.000 - €80.000', 'Analyseer gezondheidsdata voor betere patiëntenzorg.', ARRAY['MSc Data Science', 'Python/R', 'Healthcare ervaring'], 'Healthcare', 'Hoog', 'Actief'),
('vac-7', 'Solar Engineer', 'comp-4', 'GreenEnergy Solutions', 'Eindhoven', 'Fulltime', '€50.000 - €65.000', 'Ontwerp en implementeer zonne-energie systemen.', ARRAY['Technische opleiding', 'PV kennis', 'Projectervaring'], 'Energy', 'Middel', 'Actief'),
('vac-8', 'Operations Manager', 'comp-5', 'LogiTrans BV', 'Breda', 'Fulltime', '€55.000 - €70.000', 'Leid de dagelijkse logistieke operaties.', ARRAY['5+ jaar logistiek', 'Leidinggevende ervaring', 'WMS kennis'], 'Logistics', 'Middel', 'Actief'),
('vac-9', 'Digital Marketing Manager', 'comp-6', 'MediaWorks Agency', 'Amsterdam', 'Fulltime', '€50.000 - €65.000', 'Ontwikkel en voer digitale marketingstrategieën uit.', ARRAY['3+ jaar marketing', 'Google Ads', 'Social Media'], 'Marketing', 'Middel', 'Actief'),
('vac-10', 'Content Creator', 'comp-6', 'MediaWorks Agency', 'Amsterdam', 'Parttime', '€30.000 - €40.000', 'Creëer engaging content voor diverse platforms.', ARRAY['Creatief schrijven', 'Video editing', 'Social Media'], 'Marketing', 'Laag', 'Actief'),
('vac-11', 'Project Manager Bouw', 'comp-7', 'BuildRight Construction', 'Den Haag', 'Fulltime', '€60.000 - €75.000', 'Leid bouwprojecten van start tot oplevering.', ARRAY['HBO Bouwkunde', '5+ jaar ervaring', 'Prince2'], 'Construction', 'Middel', 'Actief'),
('vac-12', 'Instructional Designer', 'comp-8', 'EduTech Academy', 'Groningen', 'Fulltime', '€45.000 - €55.000', 'Ontwerp effectieve online leertrajecten.', ARRAY['Onderwijskundige achtergrond', 'E-learning tools', 'Creativiteit'], 'Education', 'Laag', 'Actief'),
('vac-13', 'E-commerce Manager', 'comp-9', 'RetailMax BV', 'Tilburg', 'Fulltime', '€55.000 - €70.000', 'Beheer en optimaliseer onze webshop.', ARRAY['E-commerce ervaring', 'Data-driven', 'CRO kennis'], 'Retail', 'Hoog', 'Actief'),
('vac-14', 'Customer Service Lead', 'comp-9', 'RetailMax BV', 'Tilburg', 'Fulltime', '€40.000 - €50.000', 'Leid het customer service team.', ARRAY['Leidinggevende ervaring', 'Klantgericht', 'Zendesk'], 'Retail', 'Middel', 'Actief'),
('vac-15', 'Management Consultant', 'comp-10', 'ConsultPro Partners', 'Amsterdam', 'Fulltime', '€70.000 - €100.000', 'Adviseer klanten over digitale transformatie.', ARRAY['MBA of equivalent', '5+ jaar consulting', 'Analytisch'], 'Consulting', 'Hoog', 'Actief'),
('vac-16', 'Junior Developer', 'comp-1', 'TechVentures BV', 'Amsterdam', 'Fulltime', '€35.000 - €45.000', 'Start je carrière als developer in ons team.', ARRAY['HBO ICT', 'Leergierig', 'Basis programmeerkennis'], 'IT', 'Laag', 'Actief'),
('vac-17', 'HR Business Partner', 'comp-2', 'FinanceFirst NV', 'Rotterdam', 'Fulltime', '€55.000 - €70.000', 'Ondersteun de business met HR-vraagstukken.', ARRAY['HR achtergrond', '3+ jaar ervaring', 'Adviesvaardigheden'], 'HR', 'Middel', 'Actief'),
('vac-18', 'DevOps Engineer', 'comp-1', 'TechVentures BV', 'Amsterdam', 'Fulltime', '€60.000 - €80.000', 'Beheer en optimaliseer onze cloud infrastructuur.', ARRAY['AWS/Azure', 'Kubernetes', 'CI/CD'], 'IT', 'Hoog', 'Actief'),
('vac-19', 'UX Designer', 'comp-6', 'MediaWorks Agency', 'Amsterdam', 'Fulltime', '€45.000 - €60.000', 'Ontwerp gebruiksvriendelijke digitale ervaringen.', ARRAY['Figma/Sketch', 'User Research', 'Prototyping'], 'Design', 'Middel', 'Actief'),
('vac-20', 'Accountant', 'comp-2', 'FinanceFirst NV', 'Rotterdam', 'Fulltime', '€45.000 - €60.000', 'Verzorg de financiële administratie.', ARRAY['RA/AA', 'Exact kennis', 'Nauwkeurig'], 'Finance', 'Laag', 'Actief');

-- ============================================
-- CANDIDATES (50 candidates)
-- ============================================
INSERT INTO candidates (id, first_name, last_name, email, phone, location, job_title, summary, source, tags) VALUES
('cand-1', 'Emma', 'de Vries', 'emma.devries@email.nl', '+31612345001', 'Amsterdam', 'Software Engineer', 'Ervaren software engineer met focus op backend development en cloud architectuur.', 'LinkedIn', ARRAY['Python', 'AWS', 'Senior']),
('cand-2', 'Daan', 'Jansen', 'daan.jansen@email.nl', '+31612345002', 'Rotterdam', 'Financial Analyst', 'Analytisch ingestelde professional met sterke Excel en SQL vaardigheden.', 'Indeed', ARRAY['Finance', 'Excel', 'SQL']),
('cand-3', 'Sophie', 'Bakker', 'sophie.bakker@email.nl', '+31612345003', 'Utrecht', 'UX Designer', 'Creatieve designer met passie voor gebruiksvriendelijke interfaces.', 'Referral', ARRAY['Figma', 'UX', 'Design']),
('cand-4', 'Lucas', 'Visser', 'lucas.visser@email.nl', '+31612345004', 'Den Haag', 'Project Manager', 'Resultaatgerichte projectmanager met ervaring in IT en bouw.', 'LinkedIn', ARRAY['Agile', 'Scrum', 'PMP']),
('cand-5', 'Julia', 'Smit', 'julia.smit@email.nl', '+31612345005', 'Eindhoven', 'Data Scientist', 'Data scientist gespecialiseerd in machine learning en predictive analytics.', 'Indeed', ARRAY['Python', 'ML', 'Data']),
('cand-6', 'Sem', 'Meijer', 'sem.meijer@email.nl', '+31612345006', 'Groningen', 'Marketing Manager', 'Ervaren marketeer met focus op digitale campagnes en brand building.', 'LinkedIn', ARRAY['Marketing', 'Digital', 'Brand']),
('cand-7', 'Lotte', 'de Boer', 'lotte.deboer@email.nl', '+31612345007', 'Breda', 'HR Specialist', 'HR professional met expertise in recruitment en employee engagement.', 'Referral', ARRAY['HR', 'Recruitment', 'L&D']),
('cand-8', 'Finn', 'Mulder', 'finn.mulder@email.nl', '+31612345008', 'Tilburg', 'DevOps Engineer', 'DevOps specialist met sterke kennis van cloud platforms en automation.', 'LinkedIn', ARRAY['DevOps', 'AWS', 'Kubernetes']),
('cand-9', 'Isa', 'de Groot', 'isa.degroot@email.nl', '+31612345009', 'Amsterdam', 'Content Creator', 'Creatieve content creator met ervaring in video en social media.', 'Indeed', ARRAY['Content', 'Video', 'Social']),
('cand-10', 'Noah', 'Bos', 'noah.bos@email.nl', '+31612345010', 'Rotterdam', 'Accountant', 'Nauwkeurige accountant met RA certificering en Exact ervaring.', 'LinkedIn', ARRAY['Accounting', 'RA', 'Exact']),
('cand-11', 'Tess', 'Vos', 'tess.vos@email.nl', '+31612345011', 'Utrecht', 'Verpleegkundige', 'Toegewijde verpleegkundige met BIG registratie en IC ervaring.', 'Indeed', ARRAY['Healthcare', 'BIG', 'IC']),
('cand-12', 'Levi', 'Peters', 'levi.peters@email.nl', '+31612345012', 'Amsterdam', 'Frontend Developer', 'Frontend developer met expertise in React en moderne JavaScript.', 'LinkedIn', ARRAY['React', 'TypeScript', 'Frontend']),
('cand-13', 'Mila', 'Hendriks', 'mila.hendriks@email.nl', '+31612345013', 'Den Haag', 'Risk Manager', 'Ervaren risk manager met CFA certificering en banking achtergrond.', 'Referral', ARRAY['Risk', 'CFA', 'Banking']),
('cand-14', 'Jesse', 'van Dijk', 'jesse.vandijk@email.nl', '+31612345014', 'Eindhoven', 'Solar Engineer', 'Technisch specialist in zonne-energie systemen en duurzame oplossingen.', 'Indeed', ARRAY['Solar', 'Energy', 'Technical']),
('cand-15', 'Zoë', 'van den Berg', 'zoe.vandenberg@email.nl', '+31612345015', 'Amsterdam', 'Management Consultant', 'Strategisch consultant met MBA en ervaring bij Big Four.', 'LinkedIn', ARRAY['Consulting', 'MBA', 'Strategy']),
('cand-16', 'Milan', 'Dekker', 'milan.dekker@email.nl', '+31612345016', 'Rotterdam', 'Operations Manager', 'Operations expert met sterke logistieke achtergrond.', 'Indeed', ARRAY['Operations', 'Logistics', 'WMS']),
('cand-17', 'Eva', 'van Leeuwen', 'eva.vanleeuwen@email.nl', '+31612345017', 'Utrecht', 'Instructional Designer', 'E-learning specialist met onderwijskundige achtergrond.', 'LinkedIn', ARRAY['E-learning', 'Design', 'Education']),
('cand-18', 'Luuk', 'Willems', 'luuk.willems@email.nl', '+31612345018', 'Groningen', 'E-commerce Manager', 'E-commerce professional met focus op conversie optimalisatie.', 'Referral', ARRAY['E-commerce', 'CRO', 'Digital']),
('cand-19', 'Noor', 'de Jong', 'noor.dejong@email.nl', '+31612345019', 'Breda', 'Customer Service Lead', 'Klantgerichte teamleider met Zendesk expertise.', 'Indeed', ARRAY['Customer Service', 'Leadership', 'Zendesk']),
('cand-20', 'Bram', 'van der Linden', 'bram.vanderlinden@email.nl', '+31612345020', 'Amsterdam', 'Junior Developer', 'Ambitieuze starter met HBO ICT diploma en passie voor coding.', 'LinkedIn', ARRAY['Junior', 'Java', 'Learning']),
('cand-21', 'Fleur', 'Jacobs', 'fleur.jacobs@email.nl', '+31612345021', 'Rotterdam', 'HR Business Partner', 'Strategische HR partner met advieservaring.', 'Indeed', ARRAY['HR', 'Business Partner', 'Advisory']),
('cand-22', 'Max', 'van der Meer', 'max.vandermeer@email.nl', '+31612345022', 'Utrecht', 'Backend Developer', 'Backend specialist met Java en microservices ervaring.', 'LinkedIn', ARRAY['Java', 'Backend', 'Microservices']),
('cand-23', 'Saar', 'Koster', 'saar.koster@email.nl', '+31612345023', 'Den Haag', 'Digital Marketing Specialist', 'Google Ads gecertificeerde marketeer.', 'Referral', ARRAY['Google Ads', 'SEA', 'Marketing']),
('cand-24', 'Thijs', 'van Beek', 'thijs.vanbeek@email.nl', '+31612345024', 'Eindhoven', 'Full Stack Developer', 'Veelzijdige developer met frontend en backend skills.', 'LinkedIn', ARRAY['Full Stack', 'React', 'Node.js']),
('cand-25', 'Lynn', 'Vermeer', 'lynn.vermeer@email.nl', '+31612345025', 'Amsterdam', 'Product Manager', 'Product manager met technische achtergrond.', 'Indeed', ARRAY['Product', 'Agile', 'Tech']),
('cand-26', 'Ruben', 'Brouwer', 'ruben.brouwer@email.nl', '+31612345026', 'Rotterdam', 'Business Analyst', 'Analytische professional met IT en business kennis.', 'LinkedIn', ARRAY['Business Analysis', 'SQL', 'Requirements']),
('cand-27', 'Anna', 'van Vliet', 'anna.vanvliet@email.nl', '+31612345027', 'Utrecht', 'Graphic Designer', 'Creatieve designer met Adobe Suite expertise.', 'Referral', ARRAY['Design', 'Adobe', 'Creative']),
('cand-28', 'Thomas', 'de Wit', 'thomas.dewit@email.nl', '+31612345028', 'Den Haag', 'Sales Manager', 'Resultaatgerichte sales professional.', 'Indeed', ARRAY['Sales', 'B2B', 'Account Management']),
('cand-29', 'Lisa', 'van der Heijden', 'lisa.vanderheijden@email.nl', '+31612345029', 'Eindhoven', 'Quality Assurance Engineer', 'QA specialist met automation ervaring.', 'LinkedIn', ARRAY['QA', 'Testing', 'Automation']),
('cand-30', 'Stijn', 'Kuiper', 'stijn.kuiper@email.nl', '+31612345030', 'Groningen', 'System Administrator', 'Systeembeheerder met Windows en Linux kennis.', 'Indeed', ARRAY['Sysadmin', 'Windows', 'Linux']),
('cand-31', 'Vera', 'van Dam', 'vera.vandam@email.nl', '+31612345031', 'Breda', 'Recruiter', 'Tech recruiter met sterke sourcing skills.', 'LinkedIn', ARRAY['Recruitment', 'Tech', 'Sourcing']),
('cand-32', 'Jasper', 'Schouten', 'jasper.schouten@email.nl', '+31612345032', 'Tilburg', 'Cloud Architect', 'AWS gecertificeerde cloud architect.', 'Referral', ARRAY['Cloud', 'AWS', 'Architecture']),
('cand-33', 'Roos', 'van Houten', 'roos.vanhouten@email.nl', '+31612345033', 'Amsterdam', 'Social Media Manager', 'Social media expert met community management ervaring.', 'Indeed', ARRAY['Social Media', 'Community', 'Content']),
('cand-34', 'Tim', 'Groen', 'tim.groen@email.nl', '+31612345034', 'Rotterdam', 'Security Specialist', 'Cybersecurity professional met CISSP certificering.', 'LinkedIn', ARRAY['Security', 'CISSP', 'Cyber']),
('cand-35', 'Sara', 'van Dijk', 'sara.vandijk@email.nl', '+31612345035', 'Utrecht', 'Office Manager', 'Organisatorisch talent met facility management ervaring.', 'Indeed', ARRAY['Office Management', 'Facility', 'Admin']),
('cand-36', 'Nick', 'Bosman', 'nick.bosman@email.nl', '+31612345036', 'Den Haag', 'Mobile Developer', 'iOS en Android developer met Swift en Kotlin kennis.', 'LinkedIn', ARRAY['Mobile', 'iOS', 'Android']),
('cand-37', 'Eline', 'Prins', 'eline.prins@email.nl', '+31612345037', 'Eindhoven', 'Technical Writer', 'Technisch schrijver met IT achtergrond.', 'Referral', ARRAY['Technical Writing', 'Documentation', 'IT']),
('cand-38', 'Joris', 'van Rijn', 'joris.vanrijn@email.nl', '+31612345038', 'Groningen', 'Scrum Master', 'Gecertificeerde scrum master met coaching ervaring.', 'Indeed', ARRAY['Scrum', 'Agile', 'Coaching']),
('cand-39', 'Kim', 'de Graaf', 'kim.degraaf@email.nl', '+31612345039', 'Breda', 'Legal Counsel', 'Bedrijfsjurist met contract en compliance expertise.', 'LinkedIn', ARRAY['Legal', 'Contracts', 'Compliance']),
('cand-40', 'Wouter', 'Kok', 'wouter.kok@email.nl', '+31612345040', 'Tilburg', 'Database Administrator', 'DBA met PostgreSQL en MySQL expertise.', 'Indeed', ARRAY['DBA', 'PostgreSQL', 'MySQL']),
('cand-41', 'Amber', 'van Essen', 'amber.vanessen@email.nl', '+31612345041', 'Amsterdam', 'Event Manager', 'Ervaren event manager voor corporate events.', 'LinkedIn', ARRAY['Events', 'Corporate', 'Planning']),
('cand-42', 'Daniël', 'Hofman', 'daniel.hofman@email.nl', '+31612345042', 'Rotterdam', 'Network Engineer', 'Cisco gecertificeerde network engineer.', 'Referral', ARRAY['Network', 'Cisco', 'Infrastructure']),
('cand-43', 'Merel', 'van der Wal', 'merel.vanderwal@email.nl', '+31612345043', 'Utrecht', 'PR Specialist', 'PR professional met media relaties ervaring.', 'Indeed', ARRAY['PR', 'Media', 'Communications']),
('cand-44', 'Rick', 'Dijkstra', 'rick.dijkstra@email.nl', '+31612345044', 'Den Haag', 'Data Engineer', 'Data engineer met ETL en data warehouse ervaring.', 'LinkedIn', ARRAY['Data Engineering', 'ETL', 'Warehouse']),
('cand-45', 'Iris', 'van Zanten', 'iris.vanzanten@email.nl', '+31612345045', 'Eindhoven', 'Training Coordinator', 'L&D specialist met training development ervaring.', 'Indeed', ARRAY['Training', 'L&D', 'Development']),
('cand-46', 'Bart', 'Molenaar', 'bart.molenaar@email.nl', '+31612345046', 'Groningen', 'Supply Chain Analyst', 'Supply chain professional met SAP kennis.', 'LinkedIn', ARRAY['Supply Chain', 'SAP', 'Analytics']),
('cand-47', 'Laura', 'van Wijk', 'laura.vanwijk@email.nl', '+31612345047', 'Breda', 'Copywriter', 'Creatieve copywriter voor online en offline media.', 'Referral', ARRAY['Copywriting', 'Creative', 'Content']),
('cand-48', 'Mark', 'Veldman', 'mark.veldman@email.nl', '+31612345048', 'Tilburg', 'IT Support Specialist', 'Helpdesk specialist met ITIL certificering.', 'Indeed', ARRAY['IT Support', 'Helpdesk', 'ITIL']),
('cand-49', 'Femke', 'de Haan', 'femke.dehaan@email.nl', '+31612345049', 'Amsterdam', 'Controller', 'Financial controller met reporting expertise.', 'LinkedIn', ARRAY['Controlling', 'Finance', 'Reporting']),
('cand-50', 'Jeroen', 'van Schaik', 'jeroen.vanschaik@email.nl', '+31612345050', 'Rotterdam', 'Architect', 'Software architect met enterprise ervaring.', 'Indeed', ARRAY['Architecture', 'Enterprise', 'Design']);

-- ============================================
-- CANDIDATE-VACANCY RELATIONSHIPS (link candidates to vacancies)
-- ============================================
INSERT INTO candidate_vacancies (id, candidate_id, vacancy_id, stage_id) VALUES
('cv-1', 'cand-1', 'vac-1', 'stage-4'),
('cv-2', 'cand-2', 'vac-3', 'stage-3'),
('cv-3', 'cand-3', 'vac-19', 'stage-5'),
('cv-4', 'cand-4', 'vac-11', 'stage-2'),
('cv-5', 'cand-5', 'vac-6', 'stage-4'),
('cv-6', 'cand-6', 'vac-9', 'stage-3'),
('cv-7', 'cand-7', 'vac-17', 'stage-2'),
('cv-8', 'cand-8', 'vac-18', 'stage-5'),
('cv-9', 'cand-9', 'vac-10', 'stage-4'),
('cv-10', 'cand-10', 'vac-20', 'stage-3'),
('cv-11', 'cand-11', 'vac-5', 'stage-2'),
('cv-12', 'cand-12', 'vac-2', 'stage-4'),
('cv-13', 'cand-13', 'vac-4', 'stage-5'),
('cv-14', 'cand-14', 'vac-7', 'stage-3'),
('cv-15', 'cand-15', 'vac-15', 'stage-6'),
('cv-16', 'cand-16', 'vac-8', 'stage-4'),
('cv-17', 'cand-17', 'vac-12', 'stage-2'),
('cv-18', 'cand-18', 'vac-13', 'stage-5'),
('cv-19', 'cand-19', 'vac-14', 'stage-3'),
('cv-20', 'cand-20', 'vac-16', 'stage-2'),
('cv-21', 'cand-21', 'vac-17', 'stage-4'),
('cv-22', 'cand-22', 'vac-1', 'stage-3'),
('cv-23', 'cand-23', 'vac-9', 'stage-5'),
('cv-24', 'cand-24', 'vac-2', 'stage-4'),
('cv-25', 'cand-25', 'vac-1', 'stage-2'),
('cv-26', 'cand-26', 'vac-3', 'stage-3'),
('cv-27', 'cand-27', 'vac-19', 'stage-2'),
('cv-28', 'cand-28', 'vac-15', 'stage-4'),
('cv-29', 'cand-29', 'vac-1', 'stage-3'),
('cv-30', 'cand-30', 'vac-18', 'stage-2');

-- ============================================
-- EVALUATION TEMPLATES (20 templates)
-- ============================================
INSERT INTO evaluation_templates (id, name, description, category, is_active) VALUES
('eval-tpl-1', 'Technisch Interview', 'Evaluatieformulier voor technische interviews', 'Technical', true),
('eval-tpl-2', 'HR Screening', 'Eerste screening door HR', 'HR', true),
('eval-tpl-3', 'Culture Fit Assessment', 'Beoordeling van culturele fit', 'Culture', true),
('eval-tpl-4', 'Management Interview', 'Evaluatie door hiring manager', 'Management', true),
('eval-tpl-5', 'Case Study Presentatie', 'Beoordeling van case study', 'Assessment', true),
('eval-tpl-6', 'Telefoon Screening', 'Korte telefonische screening', 'HR', true),
('eval-tpl-7', 'Coding Challenge', 'Technische coding opdracht', 'Technical', true),
('eval-tpl-8', 'Behavioral Interview', 'Gedragsgerichte vragen', 'HR', true),
('eval-tpl-9', 'Leadership Assessment', 'Leiderschapskwaliteiten beoordeling', 'Management', true),
('eval-tpl-10', 'Portfolio Review', 'Beoordeling van portfolio/werk', 'Assessment', true),
('eval-tpl-11', 'Final Round Interview', 'Laatste interview ronde', 'Management', true),
('eval-tpl-12', 'Junior Developer Assessment', 'Evaluatie voor junior posities', 'Technical', true),
('eval-tpl-13', 'Senior Developer Assessment', 'Evaluatie voor senior posities', 'Technical', true),
('eval-tpl-14', 'Sales Pitch Evaluation', 'Beoordeling verkoopvaardigheden', 'Assessment', true),
('eval-tpl-15', 'Customer Service Roleplay', 'Rollenspel klantenservice', 'Assessment', true),
('eval-tpl-16', 'Finance Knowledge Test', 'Financiële kennistoets', 'Technical', true),
('eval-tpl-17', 'Design Critique', 'Beoordeling design vaardigheden', 'Assessment', true),
('eval-tpl-18', 'Team Collaboration Assessment', 'Samenwerking evaluatie', 'Culture', true),
('eval-tpl-19', 'Problem Solving Interview', 'Probleemoplossend vermogen', 'Assessment', true),
('eval-tpl-20', 'Reference Check Form', 'Referentie check formulier', 'HR', true);

-- ============================================
-- EVALUATION TEMPLATE SECTIONS
-- ============================================
INSERT INTO evaluation_template_sections (id, template_id, title, description, order_index) VALUES
-- Template 1: Technisch Interview
('sec-1-1', 'eval-tpl-1', 'Technische Vaardigheden', 'Beoordeel de technische kennis en vaardigheden', 1),
('sec-1-2', 'eval-tpl-1', 'Probleemoplossing', 'Hoe gaat de kandidaat om met technische problemen', 2),
('sec-1-3', 'eval-tpl-1', 'Code Kwaliteit', 'Beoordeling van code schrijfstijl', 3),
-- Template 2: HR Screening
('sec-2-1', 'eval-tpl-2', 'Motivatie', 'Waarom wil de kandidaat deze functie', 1),
('sec-2-2', 'eval-tpl-2', 'Beschikbaarheid', 'Startdatum en beschikbaarheid', 2),
('sec-2-3', 'eval-tpl-2', 'Salarisverwachting', 'Financiële verwachtingen', 3),
-- Template 3: Culture Fit
('sec-3-1', 'eval-tpl-3', 'Waarden Alignment', 'Past bij bedrijfswaarden', 1),
('sec-3-2', 'eval-tpl-3', 'Teamdynamiek', 'Hoe past kandidaat in het team', 2),
-- Template 4: Management Interview
('sec-4-1', 'eval-tpl-4', 'Ervaring', 'Relevante werkervaring', 1),
('sec-4-2', 'eval-tpl-4', 'Leiderschap', 'Leiderschapskwaliteiten', 2),
('sec-4-3', 'eval-tpl-4', 'Visie', 'Strategisch denkvermogen', 3),
-- Template 5: Case Study
('sec-5-1', 'eval-tpl-5', 'Analyse', 'Analytisch vermogen', 1),
('sec-5-2', 'eval-tpl-5', 'Presentatie', 'Presentatievaardigheden', 2),
('sec-5-3', 'eval-tpl-5', 'Oplossing', 'Kwaliteit van de oplossing', 3);

-- ============================================
-- EVALUATION QUESTIONS
-- ============================================
INSERT INTO evaluation_questions (id, section_id, template_id, type, label, description, is_required, options, max_score, order_index) VALUES
-- Section 1-1: Technische Vaardigheden
('q-1-1-1', 'sec-1-1', 'eval-tpl-1', 'scorecard', 'Programmeertaal kennis', 'Beoordeel kennis van relevante programmeertalen', true, '{"min": 1, "max": 5}', 5, 1),
('q-1-1-2', 'sec-1-1', 'eval-tpl-1', 'scorecard', 'Framework ervaring', 'Ervaring met relevante frameworks', true, '{"min": 1, "max": 5}', 5, 2),
('q-1-1-3', 'sec-1-1', 'eval-tpl-1', 'text', 'Technische sterke punten', 'Beschrijf de technische sterke punten', false, '{}', 0, 3),
-- Section 1-2: Probleemoplossing
('q-1-2-1', 'sec-1-2', 'eval-tpl-1', 'scorecard', 'Analytisch denken', 'Vermogen om problemen te analyseren', true, '{"min": 1, "max": 5}', 5, 1),
('q-1-2-2', 'sec-1-2', 'eval-tpl-1', 'scorecard', 'Creatieve oplossingen', 'Creativiteit in oplossingen', true, '{"min": 1, "max": 5}', 5, 2),
-- Section 2-1: Motivatie
('q-2-1-1', 'sec-2-1', 'eval-tpl-2', 'text', 'Motivatie voor de functie', 'Waarom solliciteert de kandidaat?', true, '{}', 0, 1),
('q-2-1-2', 'sec-2-1', 'eval-tpl-2', 'scorecard', 'Enthousiasme', 'Niveau van enthousiasme', true, '{"min": 1, "max": 5}', 5, 2),
-- Section 2-2: Beschikbaarheid
('q-2-2-1', 'sec-2-2', 'eval-tpl-2', 'single_choice', 'Opzegtermijn', 'Huidige opzegtermijn', true, '{"options": ["Direct beschikbaar", "1 maand", "2 maanden", "3+ maanden"]}', 0, 1),
('q-2-2-2', 'sec-2-2', 'eval-tpl-2', 'yes_no', 'Flexibele startdatum', 'Is de startdatum flexibel?', false, '{}', 0, 2),
-- Section 3-1: Waarden Alignment
('q-3-1-1', 'sec-3-1', 'eval-tpl-3', 'scorecard', 'Waarden match', 'Past bij onze kernwaarden', true, '{"min": 1, "max": 5}', 5, 1),
('q-3-1-2', 'sec-3-1', 'eval-tpl-3', 'text', 'Observaties', 'Specifieke observaties over culture fit', false, '{}', 0, 2),
-- Section 4-1: Ervaring
('q-4-1-1', 'sec-4-1', 'eval-tpl-4', 'scorecard', 'Relevante ervaring', 'Jaren relevante ervaring', true, '{"min": 1, "max": 5}', 5, 1),
('q-4-1-2', 'sec-4-1', 'eval-tpl-4', 'text', 'Belangrijkste projecten', 'Beschrijf belangrijkste projecten', true, '{}', 0, 2),
-- Section 5-1: Analyse
('q-5-1-1', 'sec-5-1', 'eval-tpl-5', 'scorecard', 'Data analyse', 'Kwaliteit van data analyse', true, '{"min": 1, "max": 5}', 5, 1),
('q-5-1-2', 'sec-5-1', 'eval-tpl-5', 'scorecard', 'Conclusies', 'Kwaliteit van conclusies', true, '{"min": 1, "max": 5}', 5, 2);

-- ============================================
-- CANDIDATE EVALUATION FORMS (completed evaluations)
-- ============================================
INSERT INTO candidate_evaluation_forms (id, candidate_id, vacancy_id, template_id, evaluator, status, final_score, final_comment, completed_at) VALUES
('eval-1', 'cand-1', 'vac-1', 'eval-tpl-1', 'Maris Schoenmakers', 'completed', 4.2, 'Uitstekende technische vaardigheden, goede culture fit.', NOW() - INTERVAL '5 days'),
('eval-2', 'cand-2', 'vac-3', 'eval-tpl-2', 'Maris Schoenmakers', 'completed', 3.8, 'Sterke analytische skills, goede motivatie.', NOW() - INTERVAL '4 days'),
('eval-3', 'cand-3', 'vac-19', 'eval-tpl-17', 'Maris Schoenmakers', 'completed', 4.5, 'Indrukwekkend portfolio, creatieve aanpak.', NOW() - INTERVAL '3 days'),
('eval-4', 'cand-5', 'vac-6', 'eval-tpl-1', 'Maris Schoenmakers', 'completed', 4.0, 'Sterke ML kennis, goed in probleemoplossing.', NOW() - INTERVAL '2 days'),
('eval-5', 'cand-8', 'vac-18', 'eval-tpl-1', 'Maris Schoenmakers', 'completed', 4.3, 'Uitgebreide DevOps ervaring, proactief.', NOW() - INTERVAL '1 day'),
('eval-6', 'cand-12', 'vac-2', 'eval-tpl-12', 'Maris Schoenmakers', 'draft', NULL, NULL, NULL),
('eval-7', 'cand-15', 'vac-15', 'eval-tpl-4', 'Maris Schoenmakers', 'completed', 4.7, 'Strategisch denker, uitstekende communicatie.', NOW() - INTERVAL '6 days'),
('eval-8', 'cand-13', 'vac-4', 'eval-tpl-16', 'Maris Schoenmakers', 'completed', 4.1, 'Sterke risk management achtergrond.', NOW() - INTERVAL '7 days'),
('eval-9', 'cand-18', 'vac-13', 'eval-tpl-5', 'Maris Schoenmakers', 'completed', 3.9, 'Goede case presentatie, data-driven.', NOW() - INTERVAL '8 days'),
('eval-10', 'cand-23', 'vac-9', 'eval-tpl-2', 'Maris Schoenmakers', 'draft', NULL, NULL, NULL);

-- ============================================
-- TALENT POOLS
-- ============================================
INSERT INTO talent_pools (id, name, description, color) VALUES
('pool-1', 'Top Tech Talent', 'Hoogwaardige technische kandidaten', '#3B82F6'),
('pool-2', 'Finance Professionals', 'Ervaren finance kandidaten', '#10B981'),
('pool-3', 'Future Leaders', 'Kandidaten met leiderschapspotentieel', '#8B5CF6'),
('pool-4', 'Creative Minds', 'Creatieve professionals', '#F59E0B'),
('pool-5', 'Healthcare Specialists', 'Zorg professionals', '#EC4899');

-- ============================================
-- POOL MEMBERS
-- ============================================
INSERT INTO pool_members (pool_id, candidate_id, added_by, notes) VALUES
('pool-1', 'cand-1', 'Maris', 'Senior engineer, sterke Python skills'),
('pool-1', 'cand-8', 'Maris', 'DevOps expert'),
('pool-1', 'cand-12', 'Maris', 'Veelbelovende frontend developer'),
('pool-1', 'cand-24', 'Maris', 'Full stack talent'),
('pool-2', 'cand-2', 'Maris', 'Sterke analyst'),
('pool-2', 'cand-10', 'Maris', 'RA gecertificeerd'),
('pool-2', 'cand-13', 'Maris', 'Risk management expert'),
('pool-3', 'cand-15', 'Maris', 'MBA, consulting achtergrond'),
('pool-3', 'cand-4', 'Maris', 'Ervaren project manager'),
('pool-4', 'cand-3', 'Maris', 'Creatieve UX designer'),
('pool-4', 'cand-9', 'Maris', 'Content creator'),
('pool-4', 'cand-27', 'Maris', 'Graphic designer'),
('pool-5', 'cand-11', 'Maris', 'Ervaren verpleegkundige');

-- ============================================
-- COMPANY CONTACTS
-- ============================================
INSERT INTO company_contacts (company_id, first_name, last_name, email, phone, role, is_primary) VALUES
('comp-1', 'Jan', 'van der Berg', 'jan@techventures.nl', '+31201234567', 'HR Manager', true),
('comp-1', 'Lisa', 'Bakker', 'lisa@techventures.nl', '+31201234568', 'CTO', false),
('comp-2', 'Peter', 'de Vries', 'peter@financefirst.nl', '+31102345678', 'Recruitment Lead', true),
('comp-3', 'Maria', 'Jansen', 'maria@healthcareplus.nl', '+31302345679', 'HR Director', true),
('comp-4', 'Tom', 'Hendriks', 'tom@greenenergy.nl', '+31402345680', 'Operations Manager', true),
('comp-5', 'Sandra', 'Mulder', 'sandra@logitrans.nl', '+31762345681', 'HR Coordinator', true),
('comp-6', 'Mark', 'Visser', 'mark@mediaworks.nl', '+31202345682', 'Creative Director', true),
('comp-7', 'Ellen', 'Smit', 'ellen@buildright.nl', '+31702345683', 'Project Director', true),
('comp-8', 'Robert', 'de Boer', 'robert@edutech.nl', '+31502345684', 'CEO', true),
('comp-9', 'Anne', 'Meijer', 'anne@retailmax.nl', '+31132345685', 'HR Manager', true),
('comp-10', 'Kees', 'van Dijk', 'kees@consultpro.nl', '+31202345686', 'Partner', true);

-- ============================================
-- CANDIDATE NOTES (sample notes)
-- ============================================
INSERT INTO candidate_notes (candidate_id, author, content) VALUES
('cand-1', 'Maris', 'Uitstekend eerste gesprek. Sterke technische achtergrond en goede communicatie.'),
('cand-1', 'Maris', 'Referenties gecheckt - zeer positief.'),
('cand-2', 'Maris', 'Goede analytische vaardigheden. Moet nog Excel test doen.'),
('cand-3', 'Maris', 'Portfolio is indrukwekkend. Goed gevoel voor UX.'),
('cand-5', 'Maris', 'ML expertise is precies wat we zoeken.'),
('cand-8', 'Maris', 'Kubernetes certificering is een plus.'),
('cand-12', 'Maris', 'Jong talent met veel potentieel.'),
('cand-15', 'Maris', 'Top kandidaat voor senior consulting rol.');

-- ============================================
-- CANDIDATE ACTIVITY (sample activities)
-- ============================================
INSERT INTO candidate_activity (candidate_id, type, description, metadata) VALUES
('cand-1', 'status', 'Verplaatst naar Interview fase', '{"from": "Screening", "to": "Interview"}'),
('cand-1', 'note', 'Notitie toegevoegd', '{"note_id": "note-1"}'),
('cand-2', 'status', 'Verplaatst naar Telefoon Interview', '{"from": "Nieuw", "to": "Telefoon Interview"}'),
('cand-3', 'evaluation', 'Evaluatie voltooid', '{"score": 4.5}'),
('cand-5', 'meeting', 'Interview gepland', '{"date": "2024-01-15", "type": "Technical Interview"}'),
('cand-8', 'status', 'Verplaatst naar Assessment', '{"from": "Interview", "to": "Assessment"}'),
('cand-12', 'file', 'CV geüpload', '{"file_name": "CV_Levi_Peters.pdf"}'),
('cand-15', 'status', 'Verplaatst naar Aanbieding', '{"from": "Assessment", "to": "Aanbieding"}');

SELECT 'Seed data inserted successfully!' as status;

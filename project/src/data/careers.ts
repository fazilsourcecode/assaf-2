import { CareerRecommendation } from '../types';

export const careerDatabase: CareerRecommendation[] = [
  {
    id: 'software-engineer',
    title: 'Software Engineer',
    description: 'Design, develop, and maintain software applications and systems',
    matchPercentage: 92,
    salaryRange: '$70,000 - $150,000',
    growthProspects: 'Excellent (22% growth expected)',
    requiredSkills: ['Programming', 'Problem Solving', 'System Design', 'Testing'],
    recommendedCourses: ['Full Stack Development', 'Data Structures & Algorithms', 'Cloud Computing'],
    jobRoles: ['Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'DevOps Engineer'],
    companies: ['Google', 'Microsoft', 'Amazon', 'Meta', 'Netflix'],
    workEnvironment: 'Hybrid/Remote friendly',
    category: 'Technology'
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    description: 'Analyze complex data to help organizations make informed decisions',
    matchPercentage: 88,
    salaryRange: '$80,000 - $160,000',
    growthProspects: 'Excellent (35% growth expected)',
    requiredSkills: ['Statistics', 'Machine Learning', 'Python/R', 'Data Visualization'],
    recommendedCourses: ['Machine Learning', 'Statistics', 'Big Data Analytics', 'Python for Data Science'],
    jobRoles: ['Data Analyst', 'ML Engineer', 'Research Scientist', 'Business Intelligence Analyst'],
    companies: ['Netflix', 'Uber', 'Airbnb', 'Tesla', 'IBM'],
    workEnvironment: 'Office/Remote hybrid',
    category: 'Technology'
  },
  {
    id: 'ux-designer',
    title: 'UX/UI Designer',
    description: 'Create intuitive and engaging user experiences for digital products',
    matchPercentage: 85,
    salaryRange: '$60,000 - $120,000',
    growthProspects: 'Very Good (13% growth expected)',
    requiredSkills: ['Design Tools', 'User Research', 'Prototyping', 'Visual Design'],
    recommendedCourses: ['UX Design Fundamentals', 'Figma Mastery', 'User Research Methods'],
    jobRoles: ['UX Designer', 'UI Designer', 'Product Designer', 'Design Researcher'],
    companies: ['Apple', 'Spotify', 'Adobe', 'Figma', 'Airbnb'],
    workEnvironment: 'Creative office spaces',
    category: 'Design'
  },
  {
    id: 'product-manager',
    title: 'Product Manager',
    description: 'Guide product development from conception to launch and beyond',
    matchPercentage: 82,
    salaryRange: '$90,000 - $180,000',
    growthProspects: 'Very Good (19% growth expected)',
    requiredSkills: ['Strategic Thinking', 'Market Analysis', 'Communication', 'Project Management'],
    recommendedCourses: ['Product Management', 'Agile Methodology', 'Market Research', 'Data Analytics'],
    jobRoles: ['Product Manager', 'Product Owner', 'Technical Product Manager', 'Growth Product Manager'],
    companies: ['Google', 'Amazon', 'Slack', 'Zoom', 'Salesforce'],
    workEnvironment: 'Collaborative office environment',
    category: 'Business'
  },
  {
    id: 'digital-marketer',
    title: 'Digital Marketing Specialist',
    description: 'Develop and execute online marketing strategies to reach target audiences',
    matchPercentage: 78,
    salaryRange: '$45,000 - $95,000',
    growthProspects: 'Good (10% growth expected)',
    requiredSkills: ['SEO/SEM', 'Social Media', 'Content Marketing', 'Analytics'],
    recommendedCourses: ['Digital Marketing', 'Google Analytics', 'Content Strategy', 'Social Media Marketing'],
    jobRoles: ['SEO Specialist', 'Social Media Manager', 'Content Marketer', 'PPC Specialist'],
    companies: ['HubSpot', 'Mailchimp', 'Buffer', 'Hootsuite', 'SEMrush'],
    workEnvironment: 'Dynamic, fast-paced',
    category: 'Marketing'
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity Analyst',
    description: 'Protect organizations from cyber threats and security breaches',
    matchPercentage: 80,
    salaryRange: '$75,000 - $140,000',
    growthProspects: 'Excellent (33% growth expected)',
    requiredSkills: ['Network Security', 'Risk Assessment', 'Incident Response', 'Compliance'],
    recommendedCourses: ['Cybersecurity Fundamentals', 'Ethical Hacking', 'Security Compliance'],
    jobRoles: ['Security Analyst', 'Penetration Tester', 'Security Consultant', 'CISO'],
    companies: ['CrowdStrike', 'Palo Alto Networks', 'Cisco', 'IBM Security', 'FireEye'],
    workEnvironment: 'Secure office environments',
    category: 'Technology'
  }
];

export const skillsDatabase = [
  'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'SQL', 'MongoDB',
  'Machine Learning', 'Data Analysis', 'Statistics', 'Excel', 'Tableau',
  'Figma', 'Adobe Creative Suite', 'Sketch', 'InVision', 'Wireframing',
  'Project Management', 'Agile', 'Scrum', 'Leadership', 'Communication',
  'SEO', 'Google Analytics', 'Social Media Marketing', 'Content Writing',
  'Network Security', 'Penetration Testing', 'Risk Assessment', 'Compliance'
];

export const interestsDatabase = [
  'Technology', 'Artificial Intelligence', 'Web Development', 'Mobile Apps',
  'Data Science', 'Machine Learning', 'Cybersecurity', 'Cloud Computing',
  'Design', 'User Experience', 'Visual Arts', 'Creative Writing',
  'Business Strategy', 'Entrepreneurship', 'Finance', 'Marketing',
  'Education', 'Healthcare', 'Environment', 'Social Impact',
  'Gaming', 'Sports', 'Travel', 'Photography', 'Music', 'Film'
];
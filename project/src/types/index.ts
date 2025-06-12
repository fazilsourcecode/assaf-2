export interface UserProfile {
  id: string;
  personalInfo: {
    name: string;
    email: string;
    age: number;
    location: string;
  };
  education: {
    level: string;
    field: string;
    gpa?: number;
    institution: string;
  };
  skills: {
    technical: string[];
    soft: string[];
    certifications: string[];
  };
  interests: string[];
  personalityTraits: {
    introversion: number;
    creativity: number;
    analyticalThinking: number;
    leadership: number;
    teamwork: number;
  };
  workPreferences: {
    environment: string;
    workLifeBalance: number;
    salaryExpectation: string;
    travelWillingness: number;
  };
}

export interface CareerRecommendation {
  id: string;
  title: string;
  description: string;
  matchPercentage: number;
  salaryRange: string;
  growthProspects: string;
  requiredSkills: string[];
  recommendedCourses: string[];
  jobRoles: string[];
  companies: string[];
  workEnvironment: string;
  category: string;
}

export interface SkillGap {
  skill: string;
  currentLevel: number;
  requiredLevel: number;
  importance: 'high' | 'medium' | 'low';
  courses: Course[];
}

export interface Course {
  id: string;
  title: string;
  provider: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  rating: number;
  price: number;
  url: string;
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}
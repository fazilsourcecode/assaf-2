import { UserProfile, CareerRecommendation, SkillGap } from '../types';
import { careerDatabase } from '../data/careers';

export class AICareerEngine {
  static calculateCareerMatch(profile: UserProfile, career: CareerRecommendation): number {
    let score = 0;
    let maxScore = 0;

    // Interest matching (30% weight)
    const interestWeight = 0.3;
    const interestMatch = this.calculateInterestMatch(profile.interests, career);
    score += interestMatch * interestWeight;
    maxScore += interestWeight;

    // Skills matching (25% weight)
    const skillsWeight = 0.25;
    const skillsMatch = this.calculateSkillsMatch(profile.skills, career.requiredSkills);
    score += skillsMatch * skillsWeight;
    maxScore += skillsWeight;

    // Personality matching (20% weight)
    const personalityWeight = 0.2;
    const personalityMatch = this.calculatePersonalityMatch(profile.personalityTraits, career);
    score += personalityMatch * personalityWeight;
    maxScore += personalityWeight;

    // Education matching (15% weight)
    const educationWeight = 0.15;
    const educationMatch = this.calculateEducationMatch(profile.education, career);
    score += educationMatch * educationWeight;
    maxScore += educationWeight;

    // Work preferences matching (10% weight)
    const workPrefWeight = 0.1;
    const workPrefMatch = this.calculateWorkPreferenceMatch(profile.workPreferences, career);
    score += workPrefMatch * workPrefWeight;
    maxScore += workPrefWeight;

    return Math.round((score / maxScore) * 100);
  }

  private static calculateInterestMatch(interests: string[], career: CareerRecommendation): number {
    const careerKeywords = [
      ...career.title.toLowerCase().split(' '),
      ...career.description.toLowerCase().split(' '),
      career.category.toLowerCase()
    ];

    let matches = 0;
    interests.forEach(interest => {
      if (careerKeywords.some(keyword => 
        keyword.includes(interest.toLowerCase()) || 
        interest.toLowerCase().includes(keyword)
      )) {
        matches++;
      }
    });

    return Math.min(matches / Math.max(interests.length, 1), 1);
  }

  private static calculateSkillsMatch(userSkills: any, requiredSkills: string[]): number {
    const allUserSkills = [
      ...userSkills.technical,
      ...userSkills.soft,
      ...userSkills.certifications
    ];

    let matches = 0;
    requiredSkills.forEach(skill => {
      if (allUserSkills.some(userSkill => 
        userSkill.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(userSkill.toLowerCase())
      )) {
        matches++;
      }
    });

    return matches / Math.max(requiredSkills.length, 1);
  }

  private static calculatePersonalityMatch(traits: any, career: CareerRecommendation): number {
    // Simplified personality matching based on career type
    let score = 0;

    if (career.category === 'Technology') {
      score = (traits.analyticalThinking * 0.4) + (traits.creativity * 0.3) + (traits.teamwork * 0.3);
    } else if (career.category === 'Design') {
      score = (traits.creativity * 0.5) + (traits.analyticalThinking * 0.2) + (traits.teamwork * 0.3);
    } else if (career.category === 'Business') {
      score = (traits.leadership * 0.4) + (traits.teamwork * 0.3) + (traits.analyticalThinking * 0.3);
    } else if (career.category === 'Marketing') {
      score = (traits.creativity * 0.4) + (traits.teamwork * 0.3) + (traits.leadership * 0.3);
    } else {
      score = (traits.analyticalThinking + traits.creativity + traits.teamwork + traits.leadership) / 4;
    }

    return score / 10; // Normalize to 0-1
  }

  private static calculateEducationMatch(education: any, career: CareerRecommendation): number {
    const relevantFields = {
      'Technology': ['computer science', 'engineering', 'mathematics', 'physics'],
      'Design': ['design', 'art', 'multimedia', 'graphics'],
      'Business': ['business', 'management', 'economics', 'finance'],
      'Marketing': ['marketing', 'business', 'communications', 'psychology']
    };

    const careerFields = relevantFields[career.category as keyof typeof relevantFields] || [];
    const userField = education.field.toLowerCase();

    return careerFields.some(field => 
      userField.includes(field) || field.includes(userField)
    ) ? 1 : 0.5;
  }

  private static calculateWorkPreferenceMatch(preferences: any, career: CareerRecommendation): number {
    // Simplified work preference matching
    let score = 0.7; // Base score

    if (career.workEnvironment.toLowerCase().includes('remote') && preferences.workLifeBalance > 7) {
      score += 0.2;
    }

    if (career.category === 'Technology' && preferences.environment === 'innovative') {
      score += 0.1;
    }

    return Math.min(score, 1);
  }

  static getTopCareerRecommendations(profile: UserProfile, limit = 3): CareerRecommendation[] {
    const scoredCareers = careerDatabase.map(career => ({
      ...career,
      matchPercentage: this.calculateCareerMatch(profile, career)
    }));

    return scoredCareers
      .sort((a, b) => b.matchPercentage - a.matchPercentage)
      .slice(0, limit);
  }

  static analyzeSkillGaps(profile: UserProfile, targetCareer: CareerRecommendation): SkillGap[] {
    const userSkills = [
      ...profile.skills.technical,
      ...profile.skills.soft,
      ...profile.skills.certifications
    ];

    return targetCareer.requiredSkills.map(skill => {
      const hasSkill = userSkills.some(userSkill => 
        userSkill.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(userSkill.toLowerCase())
      );

      return {
        skill,
        currentLevel: hasSkill ? Math.floor(Math.random() * 3) + 6 : Math.floor(Math.random() * 4) + 1,
        requiredLevel: Math.floor(Math.random() * 2) + 8,
        importance: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)] as 'high' | 'medium' | 'low',
        courses: this.getRecommendedCourses(skill)
      };
    });
  }

  private static getRecommendedCourses(skill: string) {
    const courseTemplates = [
      { provider: 'Coursera', rating: 4.8, difficulty: 'intermediate' as const },
      { provider: 'Udemy', rating: 4.6, difficulty: 'beginner' as const },
      { provider: 'edX', rating: 4.7, difficulty: 'advanced' as const },
      { provider: 'Pluralsight', rating: 4.5, difficulty: 'intermediate' as const }
    ];

    return courseTemplates.slice(0, 2).map((template, index) => ({
      id: `${skill}-${index}`,
      title: `Master ${skill} - Complete Guide`,
      provider: template.provider,
      duration: `${Math.floor(Math.random() * 20) + 10} hours`,
      difficulty: template.difficulty,
      rating: template.rating,
      price: Math.floor(Math.random() * 100) + 29,
      url: `https://${template.provider.toLowerCase()}.com/course/${skill.toLowerCase().replace(' ', '-')}`
    }));
  }

  static generateCareerInsights(profile: UserProfile): any {
    return {
      strengthAreas: this.identifyStrengths(profile),
      growthAreas: this.identifyGrowthAreas(profile),
      marketTrends: this.getMarketTrends(profile),
      salaryInsights: this.getSalaryInsights(profile)
    };
  }

  private static identifyStrengths(profile: UserProfile): string[] {
    const strengths = [];
    const traits = profile.personalityTraits;

    if (traits.analyticalThinking > 7) strengths.push('Strong analytical and problem-solving abilities');
    if (traits.creativity > 7) strengths.push('High creativity and innovative thinking');
    if (traits.leadership > 7) strengths.push('Natural leadership and management potential');
    if (traits.teamwork > 7) strengths.push('Excellent collaboration and teamwork skills');
    if (profile.skills.technical.length > 5) strengths.push('Diverse technical skill set');

    return strengths.length > 0 ? strengths : ['Well-rounded skill set with growth potential'];
  }

  private static identifyGrowthAreas(profile: UserProfile): string[] {
    const growthAreas = [];
    const traits = profile.personalityTraits;

    if (traits.leadership < 6) growthAreas.push('Leadership and management skills');
    if (traits.teamwork < 6) growthAreas.push('Collaboration and communication');
    if (traits.creativity < 6) growthAreas.push('Creative thinking and innovation');
    if (profile.skills.technical.length < 3) growthAreas.push('Technical skills development');

    return growthAreas;
  }

  private static getMarketTrends(profile: UserProfile): any {
    return {
      highDemandSkills: ['AI/Machine Learning', 'Cloud Computing', 'Cybersecurity', 'Data Analysis'],
      emergingFields: ['Quantum Computing', 'Blockchain', 'IoT', 'AR/VR'],
      salaryTrends: 'Tech salaries increased by 15% this year',
      remoteTrends: '70% of companies now offer remote work options'
    };
  }

  private static getSalaryInsights(profile: UserProfile): any {
    return {
      currentMarketRange: '$65,000 - $120,000',
      projectedGrowth: '12% over next 5 years',
      topPayingCompanies: ['Google', 'Netflix', 'Meta', 'Amazon', 'Microsoft'],
      locationFactors: 'San Francisco: +40%, New York: +25%, Austin: +10%'
    };
  }
}
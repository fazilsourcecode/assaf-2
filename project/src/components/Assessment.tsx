import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, User, GraduationCap, Brain, Briefcase, CheckCircle } from 'lucide-react';
import { UserProfile } from '../types';
import { skillsDatabase, interestsDatabase } from '../data/careers';

interface AssessmentProps {
  onComplete: (profile: UserProfile) => void;
  setCurrentView: (view: string) => void;
}

const Assessment: React.FC<AssessmentProps> = ({ onComplete, setCurrentView }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    personalInfo: { name: '', email: '', age: 0, location: '' },
    education: { level: '', field: '', institution: '' },
    skills: { technical: [], soft: [], certifications: [] },
    interests: [],
    personalityTraits: {
      introversion: 5,
      creativity: 5,
      analyticalThinking: 5,
      leadership: 5,
      teamwork: 5
    },
    workPreferences: {
      environment: '',
      workLifeBalance: 5,
      salaryExpectation: '',
      travelWillingness: 5
    }
  });

  const steps = [
    { id: 'personal', title: 'Personal Information', icon: User },
    { id: 'education', title: 'Education Background', icon: GraduationCap },
    { id: 'skills', title: 'Skills & Experience', icon: Brain },
    { id: 'interests', title: 'Interests & Passions', icon: Brain },
    { id: 'personality', title: 'Personality Assessment', icon: Brain },
    { id: 'preferences', title: 'Work Preferences', icon: Briefcase }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const completeProfile: UserProfile = {
        id: Date.now().toString(),
        ...profile as UserProfile
      };
      onComplete(completeProfile);
      setCurrentView('dashboard');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateProfile = (section: string, data: any) => {
    setProfile(prev => ({
      ...prev,
      [section]: { ...prev[section as keyof typeof prev], ...data }
    }));
  };

  const renderStepContent = () => {
    switch (steps[currentStep].id) {
      case 'personal':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Tell us about yourself</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={profile.personalInfo?.name || ''}
                  onChange={(e) => updateProfile('personalInfo', { name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={profile.personalInfo?.email || ''}
                  onChange={(e) => updateProfile('personalInfo', { email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                <input
                  type="number"
                  value={profile.personalInfo?.age || ''}
                  onChange={(e) => updateProfile('personalInfo', { age: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your age"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={profile.personalInfo?.location || ''}
                  onChange={(e) => updateProfile('personalInfo', { location: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="City, Country"
                />
              </div>
            </div>
          </div>
        );

      case 'education':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Educational Background</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Education Level</label>
                <select
                  value={profile.education?.level || ''}
                  onChange={(e) => updateProfile('education', { level: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select education level</option>
                  <option value="High School">High School</option>
                  <option value="Bachelor's Degree">Bachelor's Degree</option>
                  <option value="Master's Degree">Master's Degree</option>
                  <option value="PhD">PhD</option>
                  <option value="Professional Certification">Professional Certification</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Field of Study</label>
                <input
                  type="text"
                  value={profile.education?.field || ''}
                  onChange={(e) => updateProfile('education', { field: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Computer Science, Business, Design"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Institution</label>
                <input
                  type="text"
                  value={profile.education?.institution || ''}
                  onChange={(e) => updateProfile('education', { institution: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="University or institution name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">GPA (Optional)</label>
                <input
                  type="number"
                  step="0.1"
                  max="4.0"
                  value={profile.education?.gpa || ''}
                  onChange={(e) => updateProfile('education', { gpa: parseFloat(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 3.5"
                />
              </div>
            </div>
          </div>
        );

      case 'skills':
        return (
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Skills & Experience</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">Technical Skills</label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {skillsDatabase.slice(0, 16).map((skill) => (
                  <label key={skill} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profile.skills?.technical?.includes(skill) || false}
                      onChange={(e) => {
                        const currentSkills = profile.skills?.technical || [];
                        const newSkills = e.target.checked
                          ? [...currentSkills, skill]
                          : currentSkills.filter(s => s !== skill);
                        updateProfile('skills', { technical: newSkills });
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{skill}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">Soft Skills</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['Communication', 'Leadership', 'Problem Solving', 'Time Management', 'Creativity', 'Critical Thinking'].map((skill) => (
                  <label key={skill} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profile.skills?.soft?.includes(skill) || false}
                      onChange={(e) => {
                        const currentSkills = profile.skills?.soft || [];
                        const newSkills = e.target.checked
                          ? [...currentSkills, skill]
                          : currentSkills.filter(s => s !== skill);
                        updateProfile('skills', { soft: newSkills });
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{skill}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 'interests':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Interests & Passions</h3>
            <p className="text-gray-600 mb-6">Select the areas that genuinely interest you and align with your passions.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {interestsDatabase.map((interest) => (
                <label key={interest} className="flex items-center space-x-2 cursor-pointer p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors">
                  <input
                    type="checkbox"
                    checked={profile.interests?.includes(interest) || false}
                    onChange={(e) => {
                      const currentInterests = profile.interests || [];
                      const newInterests = e.target.checked
                        ? [...currentInterests, interest]
                        : currentInterests.filter(i => i !== interest);
                      updateProfile('interests', newInterests);
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{interest}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 'personality':
        return (
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Personality Assessment</h3>
            <p className="text-gray-600 mb-8">Rate yourself on a scale of 1-10 for each trait.</p>
            
            {Object.entries(profile.personalityTraits || {}).map(([trait, value]) => (
              <div key={trait} className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-gray-700 capitalize">
                    {trait.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  <span className="text-sm font-semibold text-blue-600">{value}/10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={value}
                  onChange={(e) => updateProfile('personalityTraits', { [trait]: parseInt(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>
            ))}
          </div>
        );

      case 'preferences':
        return (
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Work Preferences</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Work Environment</label>
              <select
                value={profile.workPreferences?.environment || ''}
                onChange={(e) => updateProfile('workPreferences', { environment: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select environment</option>
                <option value="office">Traditional Office</option>
                <option value="remote">Remote Work</option>
                <option value="hybrid">Hybrid (Office + Remote)</option>
                <option value="startup">Startup Environment</option>
                <option value="corporate">Large Corporation</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Expected Salary Range</label>
              <select
                value={profile.workPreferences?.salaryExpectation || ''}
                onChange={(e) => updateProfile('workPreferences', { salaryExpectation: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select range</option>
                <option value="30k-50k">$30,000 - $50,000</option>
                <option value="50k-75k">$50,000 - $75,000</option>
                <option value="75k-100k">$75,000 - $100,000</option>
                <option value="100k-150k">$100,000 - $150,000</option>
                <option value="150k+">$150,000+</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium text-gray-700">Work-Life Balance Importance</label>
                <span className="text-sm font-semibold text-blue-600">{profile.workPreferences?.workLifeBalance || 5}/10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={profile.workPreferences?.workLifeBalance || 5}
                onChange={(e) => updateProfile('workPreferences', { workLifeBalance: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium text-gray-700">Travel Willingness</label>
                <span className="text-sm font-semibold text-blue-600">{profile.workPreferences?.travelWillingness || 5}/10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={profile.workPreferences?.travelWillingness || 5}
                onChange={(e) => updateProfile('workPreferences', { travelWillingness: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Career Assessment</h2>
            <span className="text-sm text-gray-600">
              Step {currentStep + 1} of {steps.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Navigation */}
        <div className="flex justify-center mb-8 overflow-x-auto">
          <div className="flex space-x-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.id}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    index === currentStep
                      ? 'bg-blue-100 text-blue-700'
                      : index < currentStep
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {index < currentStep ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                  <span className="hidden sm:inline">{step.title}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
              currentStep === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            onClick={handleNext}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
          >
            <span>{currentStep === steps.length - 1 ? 'Complete Assessment' : 'Next'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Assessment;
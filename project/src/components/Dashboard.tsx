import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, Target, Award, BookOpen, Star, ExternalLink, DollarSign, MapPin } from 'lucide-react';
import { UserProfile, CareerRecommendation } from '../types';
import { AICareerEngine } from '../utils/aiEngine';

interface DashboardProps {
  userProfile: UserProfile;
  setCurrentView: (view: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ userProfile, setCurrentView }) => {
  const careerRecommendations = AICareerEngine.getTopCareerRecommendations(userProfile, 3);
  const insights = AICareerEngine.generateCareerInsights(userProfile);
  const skillGaps = AICareerEngine.analyzeSkillGaps(userProfile, careerRecommendations[0]);

  const skillData = skillGaps.map(gap => ({
    skill: gap.skill,
    current: gap.currentLevel,
    required: gap.requiredLevel,
    gap: gap.requiredLevel - gap.currentLevel
  }));

  const personalityData = Object.entries(userProfile.personalityTraits).map(([trait, value]) => ({
    trait: trait.replace(/([A-Z])/g, ' $1').trim(),
    value: value
  }));

  const COLORS = ['#3B82F6', '#8B5CF6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444'];

  const careerMatchData = careerRecommendations.map((career, index) => ({
    name: career.title,
    match: career.matchPercentage,
    fill: COLORS[index]
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {userProfile.personalInfo.name}!
          </h1>
          <p className="text-gray-600">Here's your personalized career analysis and recommendations</p>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Best Match</p>
                <p className="text-2xl font-bold text-green-600">{careerRecommendations[0]?.matchPercentage}%</p>
              </div>
              <Target className="w-8 h-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Skills Analyzed</p>
                <p className="text-2xl font-bold text-blue-600">
                  {userProfile.skills.technical.length + userProfile.skills.soft.length}
                </p>
              </div>
              <Award className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Career Options</p>
                <p className="text-2xl font-bold text-purple-600">{careerRecommendations.length}+</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Salary</p>
                <p className="text-2xl font-bold text-teal-600">$95K</p>
              </div>
              <DollarSign className="w-8 h-8 text-teal-500" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Career Recommendations */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Top Career Recommendations</h2>
              <div className="space-y-4">
                {careerRecommendations.map((career, index) => (
                  <div key={career.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{career.title}</h3>
                        <p className="text-gray-600 text-sm mb-3">{career.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <DollarSign className="w-4 h-4 mr-1" />
                            {career.salaryRange}
                          </span>
                          <span className="flex items-center">
                            <TrendingUp className="w-4 h-4 mr-1" />
                            {career.growthProspects}
                          </span>
                          <span className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {career.workEnvironment}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="text-2xl font-bold text-green-600 mb-2">
                          {career.matchPercentage}%
                        </div>
                        <div className="text-sm text-gray-500">Match</div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Required Skills:</p>
                        <div className="flex flex-wrap gap-2">
                          {career.requiredSkills.slice(0, 4).map((skill) => (
                            <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Top Companies:</p>
                        <div className="flex flex-wrap gap-2">
                          {career.companies.slice(0, 3).map((company) => (
                            <span key={company} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                              {company}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <button
                        onClick={() => setCurrentView('chat')}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                      >
                        Learn more about this career
                        <ExternalLink className="w-4 h-4 ml-1" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Career Match Chart */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Career Match Distribution</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={careerMatchData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="match"
                  >
                    {careerMatchData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Match']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-4">
                {careerMatchData.map((career, index) => (
                  <div key={career.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: career.fill }}
                      ></div>
                      <span className="text-gray-700">{career.name}</span>
                    </div>
                    <span className="font-semibold text-gray-900">{career.match}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Strengths</h3>
              <div className="space-y-3">
                {insights.strengthAreas.map((strength, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Star className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">{strength}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Skill Gap Analysis */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Skill Gap Analysis</h3>
              <button
                onClick={() => setCurrentView('resume')}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View Recommendations
              </button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={skillData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="skill" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  fontSize={12}
                />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Bar dataKey="current" fill="#3B82F6" name="Current Level" />
                <Bar dataKey="required" fill="#8B5CF6" name="Required Level" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Personality Profile */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Personality Profile</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={personalityData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 10]} />
                <YAxis 
                  dataKey="trait" 
                  type="category" 
                  width={100}
                  fontSize={12}
                />
                <Tooltip />
                <Bar dataKey="value" fill="#06B6D4" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Market Insights */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Market Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <h4 className="font-semibold text-gray-900 mb-2">High Demand Skills</h4>
              <div className="space-y-1">
                {insights.marketTrends.highDemandSkills.slice(0, 3).map((skill) => (
                  <span key={skill} className="block text-sm text-blue-600 font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="text-center">
              <h4 className="font-semibold text-gray-900 mb-2">Emerging Fields</h4>
              <div className="space-y-1">
                {insights.marketTrends.emergingFields.slice(0, 3).map((field) => (
                  <span key={field} className="block text-sm text-purple-600 font-medium">
                    {field}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="text-center">
              <h4 className="font-semibold text-gray-900 mb-2">Remote Work</h4>
              <p className="text-sm text-gray-600">{insights.marketTrends.remoteTrends}</p>
            </div>
            
            <div className="text-center">
              <h4 className="font-semibold text-gray-900 mb-2">Salary Growth</h4>
              <p className="text-sm text-green-600 font-semibold">{insights.marketTrends.salaryTrends}</p>
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-2xl text-white">
            <BookOpen className="w-8 h-8 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Skill Development</h3>
            <p className="text-blue-100 text-sm mb-4">
              Get personalized course recommendations to bridge skill gaps
            </p>
            <button
              onClick={() => setCurrentView('resume')}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg text-sm font-medium transition-all"
            >
              View Courses
            </button>
          </div>
          
          <div className="bg-gradient-to-r from-teal-500 to-blue-600 p-6 rounded-2xl text-white">
            <Target className="w-8 h-8 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Resume Analysis</h3>
            <p className="text-teal-100 text-sm mb-4">
              Get AI-powered suggestions to improve your resume
            </p>
            <button
              onClick={() => setCurrentView('resume')}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg text-sm font-medium transition-all"
            >
              Analyze Resume
            </button>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-6 rounded-2xl text-white">
            <TrendingUp className="w-8 h-8 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Career Coaching</h3>
            <p className="text-purple-100 text-sm mb-4">
              Chat with our AI career coach for personalized guidance
            </p>
            <button
              onClick={() => setCurrentView('chat')}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg text-sm font-medium transition-all"
            >
              Start Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
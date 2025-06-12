import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, TrendingUp, BookOpen, Award, ExternalLink } from 'lucide-react';
import { UserProfile, SkillGap, Course } from '../types';
import { AICareerEngine } from '../utils/aiEngine';

interface ResumeProps {
  userProfile: UserProfile;
}

const Resume: React.FC<ResumeProps> = ({ userProfile }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [activeTab, setActiveTab] = useState<'upload' | 'analysis' | 'courses'>('upload');

  const careerRecommendations = AICareerEngine.getTopCareerRecommendations(userProfile, 1);
  const skillGaps = AICareerEngine.analyzeSkillGaps(userProfile, careerRecommendations[0]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Simulate analysis
      setTimeout(() => {
        setAnalysisComplete(true);
        setActiveTab('analysis');
      }, 2000);
    }
  };

  const resumeScore = 78;
  const improvements = [
    {
      type: 'critical',
      title: 'Add Quantified Achievements',
      description: 'Include specific numbers and metrics to show your impact',
      example: 'Instead of "Improved system performance", use "Improved system performance by 40%, reducing load times from 3s to 1.8s"'
    },
    {
      type: 'important',
      title: 'Update Technical Skills Section',
      description: 'Add trending technologies relevant to your target role',
      example: 'Consider adding: React 18, TypeScript, Docker, AWS services'
    },
    {
      type: 'moderate',
      title: 'Enhance Professional Summary',
      description: 'Write a compelling 2-3 line summary highlighting your unique value',
      example: 'Full-stack developer with 3+ years building scalable web applications, specializing in React and Node.js'
    },
    {
      type: 'minor',
      title: 'Optimize for ATS',
      description: 'Use standard section headings and include relevant keywords',
      example: 'Use "Professional Experience" instead of "Work History"'
    }
  ];

  const getImprovementIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'important':
        return <AlertCircle className="w-5 h-5 text-orange-500" />;
      case 'moderate':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return <CheckCircle className="w-5 h-5 text-blue-500" />;
    }
  };

  const getImprovementBg = (type: string) => {
    switch (type) {
      case 'critical':
        return 'bg-red-50 border-red-200';
      case 'important':
        return 'bg-orange-50 border-orange-200';
      case 'moderate':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  const allCourses: Course[] = skillGaps.flatMap(gap => gap.courses);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Resume Analysis & Skill Development</h1>
          <p className="text-gray-600">Get AI-powered feedback on your resume and personalized course recommendations</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white p-1 rounded-xl shadow-sm border border-gray-100 mb-8 inline-flex">
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'upload'
                ? 'bg-blue-500 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Upload Resume
          </button>
          <button
            onClick={() => setActiveTab('analysis')}
            disabled={!analysisComplete}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'analysis'
                ? 'bg-blue-500 text-white shadow-sm'
                : analysisComplete
                ? 'text-gray-600 hover:text-gray-900'
                : 'text-gray-400 cursor-not-allowed'
            }`}
          >
            Analysis
          </button>
          <button
            onClick={() => setActiveTab('courses')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'courses'
                ? 'bg-blue-500 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Skill Development
          </button>
        </div>

        {activeTab === 'upload' && (
          <div className="space-y-8">
            {/* Upload Section */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="text-center">
                <FileText className="w-16 h-16 text-blue-500 mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Upload Your Resume</h2>
                <p className="text-gray-600 mb-8">Get instant AI-powered analysis and improvement suggestions</p>
                
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label htmlFor="resume-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-900 mb-2">
                      Drop your resume here or click to browse
                    </p>
                    <p className="text-sm text-gray-500">
                      Supports PDF, DOC, and DOCX files (Max 10MB)
                    </p>
                  </label>
                </div>

                {selectedFile && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-center space-x-3">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-blue-900">{selectedFile.name}</span>
                      {!analysisComplete && (
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100"></div>
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200"></div>
                        </div>
                      )}
                    </div>
                    {!analysisComplete && (
                      <p className="text-sm text-blue-700 mt-2">Analyzing your resume...</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">ATS Optimization</h3>
                <p className="text-sm text-gray-600">Ensure your resume passes applicant tracking systems</p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                <TrendingUp className="w-8 h-8 text-blue-500 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Impact Analysis</h3>
                <p className="text-sm text-gray-600">Get suggestions to quantify your achievements</p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                <Award className="w-8 h-8 text-purple-500 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Industry Alignment</h3>
                <p className="text-sm text-gray-600">Tailor your resume for your target industry</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analysis' && analysisComplete && (
          <div className="space-y-8">
            {/* Score Overview */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Resume Analysis Results</h2>
                  <p className="text-gray-600">Based on {careerRecommendations[0]?.title} role requirements</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">{resumeScore}/100</div>
                  <div className="text-sm text-gray-500">Overall Score</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">85</div>
                  <div className="text-sm text-gray-600">Skills Match</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">72</div>
                  <div className="text-sm text-gray-600">ATS Compatibility</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">80</div>
                  <div className="text-sm text-gray-600">Content Quality</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-teal-600 mb-1">75</div>
                  <div className="text-sm text-gray-600">Format & Design</div>
                </div>
              </div>
            </div>

            {/* Improvements */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Improvement Suggestions</h3>
              <div className="space-y-4">
                {improvements.map((improvement, index) => (
                  <div key={index} className={`p-6 rounded-lg border ${getImprovementBg(improvement.type)}`}>
                    <div className="flex items-start space-x-4">
                      {getImprovementIcon(improvement.type)}
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-2">{improvement.title}</h4>
                        <p className="text-gray-700 mb-3">{improvement.description}</p>
                        <div className="bg-white bg-opacity-70 p-3 rounded-lg">
                          <p className="text-sm text-gray-600 font-medium">Example:</p>
                          <p className="text-sm text-gray-700">{improvement.example}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Keywords */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Recommended Keywords</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-green-700 mb-3">✓ Keywords Found</h4>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.skills.technical.slice(0, 6).map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-red-700 mb-3">⚠ Missing Keywords</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Cloud Computing', 'DevOps', 'Microservices', 'API Design', 'Testing', 'Agile'].map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-red-100 text-red-700 text-sm rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'courses' && (
          <div className="space-y-8">
            {/* Skill Gap Overview */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Skill Development Plan</h2>
              <p className="text-gray-600 mb-6">
                Based on your career goals in {careerRecommendations[0]?.title}, here are the skills you should focus on:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {skillGaps.slice(0, 3).map((gap) => (
                  <div key={gap.skill} className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                    <h3 className="font-semibold text-gray-900 mb-3">{gap.skill}</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Current Level</span>
                        <span className="font-medium">{gap.currentLevel}/10</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${(gap.currentLevel / 10) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Target Level</span>
                        <span className="font-medium">{gap.requiredLevel}/10</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-500 h-2 rounded-full"
                          style={{ width: `${(gap.requiredLevel / 10) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className={`mt-3 px-3 py-1 rounded-full text-xs font-medium ${
                      gap.importance === 'high' ? 'bg-red-100 text-red-700' :
                      gap.importance === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {gap.importance.toUpperCase()} PRIORITY
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Recommendations */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Recommended Courses</h3>
                <BookOpen className="w-6 h-6 text-blue-500" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {allCourses.slice(0, 6).map((course) => (
                  <div key={course.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-2">{course.title}</h4>
                        <p className="text-sm text-gray-600 mb-3">by {course.provider}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{course.duration}</span>
                          <span className="flex items-center">
                            <Award className="w-4 h-4 mr-1" />
                            {course.difficulty}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-blue-600">${course.price}</div>
                        <div className="flex items-center text-sm text-yellow-500">
                          ⭐ {course.rating}
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => window.open(course.url, '_blank')}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <span>View Course</span>
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Path */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 rounded-2xl text-white">
              <h3 className="text-xl font-bold mb-4">Your Learning Path</h3>
              <p className="text-blue-100 mb-6">
                Follow this structured approach to achieve your career goals in {careerRecommendations[0]?.title}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white bg-opacity-20 p-6 rounded-lg">
                  <div className="text-2xl font-bold mb-2">1</div>
                  <h4 className="font-semibold mb-2">Foundation</h4>
                  <p className="text-sm text-blue-100">
                    Master core skills: {skillGaps.slice(0, 2).map(g => g.skill).join(', ')}
                  </p>
                </div>
                
                <div className="bg-white bg-opacity-20 p-6 rounded-lg">
                  <div className="text-2xl font-bold mb-2">2</div>
                  <h4 className="font-semibold mb-2">Specialization</h4>
                  <p className="text-sm text-blue-100">
                    Develop advanced skills in your chosen area
                  </p>
                </div>
                
                <div className="bg-white bg-opacity-20 p-6 rounded-lg">
                  <div className="text-2xl font-bold mb-2">3</div>
                  <h4 className="font-semibold mb-2">Application</h4>
                  <p className="text-sm text-blue-100">
                    Build projects and gain practical experience
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Resume;
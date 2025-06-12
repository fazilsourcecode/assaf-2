import React from 'react';
import { ArrowRight, Users, Target, Brain, TrendingUp, Star, CheckCircle } from 'lucide-react';

interface HomeProps {
  setCurrentView: (view: string) => void;
}

const Home: React.FC<HomeProps> = ({ setCurrentView }) => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Advanced machine learning algorithms analyze your profile for personalized recommendations'
    },
    {
      icon: Target,
      title: 'Career Matching',
      description: 'Find the perfect career match based on your skills, interests, and personality'
    },
    {
      icon: TrendingUp,
      title: 'Market Insights',
      description: 'Stay updated with the latest industry trends and salary information'
    },
    {
      icon: Users,
      title: 'Expert Guidance',
      description: '24/7 AI chatbot support for all your career-related questions'
    }
  ];

  const stats = [
    { label: 'Career Paths Analyzed', value: '500+' },
    { label: 'Success Rate', value: '94%' },
    { label: 'Users Helped', value: '10K+' },
    { label: 'Industry Partners', value: '150+' }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Software Engineer at Google',
      content: 'Career Buddy helped me transition from marketing to tech. The personalized recommendations were spot-on!',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'UX Designer at Airbnb',
      content: 'The AI analysis revealed career paths I never considered. Now I\'m doing what I love every day.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Data Scientist at Netflix',
      content: 'The skill gap analysis and course recommendations were incredibly valuable for my career growth.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full text-blue-700 text-sm font-medium mb-6">
              <Star className="w-4 h-4" />
              <span>AI-Powered Career Intelligence Platform</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Discover Your
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Perfect Career</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Leverage the power of artificial intelligence to find career paths that align with your 
              skills, interests, and aspirations. Get personalized recommendations backed by data.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setCurrentView('assessment')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <span>Start Career Assessment</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button 
                onClick={() => setCurrentView('chat')}
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-600 transition-all duration-300"
              >
                Talk to AI Career Coach
              </button>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-20 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Career Buddy?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our advanced AI technology provides comprehensive career guidance tailored to your unique profile
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              See how Career Buddy has transformed careers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have discovered their ideal career path with Career Buddy
          </p>
          <button 
            onClick={() => setCurrentView('assessment')}
            className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Get Started Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
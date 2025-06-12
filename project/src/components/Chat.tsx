import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, User, Bot, Sparkles, TrendingUp, BookOpen, Target } from 'lucide-react';
import { ChatMessage, UserProfile } from '../types';

interface ChatProps {
  userProfile: UserProfile;
}

const Chat: React.FC<ChatProps> = ({ userProfile }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      content: `Hello ${userProfile.personalInfo.name}! I'm your AI Career Coach. I'm here to help you with career guidance, skill development, interview preparation, and more. What would you like to discuss today?`,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickQuestions = [
    {
      text: "How can I improve my resume?",
      icon: Target
    },
    {
      text: "What skills should I learn next?",
      icon: TrendingUp
    },
    {
      text: "Tell me about my career matches",
      icon: Sparkles
    },
    {
      text: "Interview tips for tech roles",
      icon: BookOpen
    }
  ];

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('resume') || lowerMessage.includes('cv')) {
      return `Based on your profile in ${userProfile.education.field}, here are some resume tips:

• **Highlight Technical Skills**: Emphasize your ${userProfile.skills.technical.slice(0, 3).join(', ')} skills prominently
• **Quantify Achievements**: Use specific numbers and metrics to show impact
• **Tailor for Each Role**: Customize your resume for each job application
• **Professional Summary**: Write a compelling 2-3 line summary at the top
• **Clean Format**: Use a clean, ATS-friendly format with clear sections

Would you like me to review a specific section of your resume or provide templates?`;
    }
    
    if (lowerMessage.includes('skill') || lowerMessage.includes('learn')) {
      return `Great question! Based on your current skills and career interests, I recommend focusing on:

**High-Priority Skills:**
• Cloud Computing (AWS/Azure) - 35% job growth
• Machine Learning/AI - High demand across industries  
• Data Analysis - Essential for decision-making roles
• API Development - Critical for modern applications

**Emerging Technologies:**
• Kubernetes & Docker
• Blockchain development
• IoT and edge computing
• Cybersecurity fundamentals

I can help you create a personalized learning roadmap. Which area interests you most?`;
    }
    
    if (lowerMessage.includes('career') || lowerMessage.includes('match')) {
      return `Based on your assessment, your top career matches are excellent! Here's why:

**Your Strongest Matches:**
1. **Software Engineer (92% match)** - Your analytical thinking and technical skills align perfectly
2. **Data Scientist (88% match)** - Great fit for your problem-solving abilities
3. **UX Designer (85% match)** - Your creativity scores suggest design aptitude

**Why These Match:**
• Your ${userProfile.education.field} background provides strong foundation
• Personality traits show high analytical thinking (${userProfile.personalityTraits.analyticalThinking}/10)
• Technical skills align with industry requirements

Would you like me to dive deeper into any specific career path or discuss transition strategies?`;
    }
    
    if (lowerMessage.includes('interview') || lowerMessage.includes('tips')) {
      return `Here are key interview tips tailored to your background:

**Technical Interview Prep:**
• Practice coding problems on LeetCode/HackerRank
• Prepare system design scenarios
• Review your projects and be ready to explain them
• Know your tools: ${userProfile.skills.technical.slice(0, 4).join(', ')}

**Behavioral Questions:**
• Use the STAR method (Situation, Task, Action, Result)
• Prepare examples showing leadership and teamwork
• Practice explaining complex technical concepts simply

**Questions to Ask:**
• "What does success look like in this role?"
• "What are the biggest challenges facing the team?"
• "How do you support professional development?"

Want me to help you practice specific interview scenarios?`;
    }
    
    if (lowerMessage.includes('salary') || lowerMessage.includes('negotiate')) {
      return `Let's talk salary strategy! Based on your profile and target roles:

**Market Research:**
• Software Engineers: $70K-$150K (varies by location/experience)
• Data Scientists: $80K-$160K 
• Your location (${userProfile.personalInfo.location}) affects ranges

**Negotiation Tips:**
• Research industry standards on Glassdoor/Levels.fyi
• Consider total compensation (salary + benefits + equity)
• Wait for the offer before negotiating
• Be prepared to justify your ask with skills/experience

**Your Strengths:**
• ${userProfile.education.level} in ${userProfile.education.field}
• Strong skill set in ${userProfile.skills.technical.slice(0, 2).join(' and ')}
• ${userProfile.personalityTraits.leadership > 7 ? 'Leadership potential' : 'Strong analytical abilities'}

Need help preparing for a specific negotiation?`;
    }
    
    // Default responses for general questions
    const defaultResponses = [
      `That's a great question! Based on your background in ${userProfile.education.field} and your interests in ${userProfile.interests.slice(0, 2).join(' and ')}, I'd recommend focusing on building skills that align with your career goals. 

What specific area would you like to explore further? I can provide more targeted advice on:
• Career transitions
• Skill development plans  
• Interview preparation
• Industry insights
• Salary negotiation`,

      `I'm here to help you succeed in your career journey! With your strong background and diverse interests, there are many paths we can explore.

Some areas I can assist with:
• Analyzing job market trends in your field
• Creating personalized learning roadmaps
• Preparing for interviews and assessments
• Building your professional network
• Developing leadership skills

What would be most valuable for you right now?`,

      `Excellent! Let me help you with that. Given your profile and career aspirations, I can provide insights on various topics.

Your strengths include:
• Strong educational foundation in ${userProfile.education.field}
• Diverse skill set including ${userProfile.skills.technical.slice(0, 3).join(', ')}
• High ${Object.entries(userProfile.personalityTraits).find(([k, v]) => v >= Math.max(...Object.values(userProfile.personalityTraits)))?.[0]} traits

How can I help you leverage these strengths for your career growth?`
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: generateBotResponse(inputMessage),
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AI Career Coach</h1>
              <p className="text-gray-600">Get personalized career guidance and advice</p>
            </div>
          </div>
        </div>

        {/* Quick Questions */}
        {messages.length <= 1 && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {quickQuestions.map((question, index) => {
                const Icon = question.icon;
                return (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question.text)}
                    className="flex items-center space-x-3 p-4 bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors text-left"
                  >
                    <Icon className="w-5 h-5 text-blue-500" />
                    <span className="text-gray-700">{question.text}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Chat Messages */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col h-96 mb-6">
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`flex items-start space-x-3 max-w-3xl ${
                    message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.type === 'user' 
                      ? 'bg-blue-500' 
                      : 'bg-gradient-to-r from-purple-500 to-pink-500'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div
                    className={`p-4 rounded-2xl ${
                      message.type === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {message.content}
                    </div>
                    <div className={`text-xs mt-2 ${
                      message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-3 max-w-3xl">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="p-4 rounded-2xl bg-gray-100">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex space-x-4">
              <div className="flex-1 relative">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about your career..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={2}
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
            <MessageCircle className="w-8 h-8 text-blue-500 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">24/7 Availability</h3>
            <p className="text-sm text-gray-600">Get career guidance anytime, anywhere</p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
            <Sparkles className="w-8 h-8 text-purple-500 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Personalized Advice</h3>
            <p className="text-sm text-gray-600">Tailored recommendations based on your profile</p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
            <TrendingUp className="w-8 h-8 text-teal-500 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Market Insights</h3>
            <p className="text-sm text-gray-600">Latest industry trends and opportunities</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
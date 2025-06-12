import React, { useState } from 'react';
import { UserProfile } from './types';
import Header from './components/Header';
import Home from './components/Home';
import Assessment from './components/Assessment';
import Dashboard from './components/Dashboard';
import Chat from './components/Chat';
import Resume from './components/Resume';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const handleAssessmentComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setCurrentView('dashboard');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <Home setCurrentView={setCurrentView} />;
      case 'assessment':
        return (
          <Assessment 
            onComplete={handleAssessmentComplete}
            setCurrentView={setCurrentView}
          />
        );
      case 'dashboard':
        return userProfile ? (
          <Dashboard 
            userProfile={userProfile}
            setCurrentView={setCurrentView}
          />
        ) : (
          <Home setCurrentView={setCurrentView} />
        );
      case 'chat':
        return userProfile ? (
          <Chat userProfile={userProfile} />
        ) : (
          <Home setCurrentView={setCurrentView} />
        );
      case 'resume':
        return userProfile ? (
          <Resume userProfile={userProfile} />
        ) : (
          <Home setCurrentView={setCurrentView} />
        );
      default:
        return <Home setCurrentView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentView={currentView} setCurrentView={setCurrentView} />
      {renderCurrentView()}
    </div>
  );
}

export default App;
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { completeSessions } from '@/data/complete-sessions';
import { remainingSessions } from '@/data/remaining-sessions';
import { Session } from '@/types';

import Navigation from './Navigation';
import Hero from './Hero';
import Dashboard from './Dashboard';
import SessionLibrary from './SessionLibrary';
import EnhancedSessionPlayer from './EnhancedSessionPlayer';
import AuthModal from './AuthModal';

const AppLayout: React.FC = () => {
  const { user, signIn, signUp, guestAccess, signOut, updateUser } = useAuth();
  const [currentPage, setCurrentPage] = useState(user ? 'dashboard' : 'landing');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentSession, setCurrentSession] = useState<Session | null>(null);
  
  const allSessions = [...completeSessions, ...remainingSessions];
  const recommendedSession = allSessions[0]; // First session as recommended

  const handleSignIn = async (email: string, password: string) => {
    await signIn(email, password);
    setShowAuthModal(false);
    setCurrentPage('dashboard');
  };

  const handleSignUp = async (email: string, password: string, name: string) => {
    await signUp(email, password, name);
    setShowAuthModal(false);
    setCurrentPage('dashboard');
  };

  const handleGuestAccess = () => {
    guestAccess();
    setShowAuthModal(false);
    setCurrentPage('dashboard');
  };

  const handleSignOut = () => {
    signOut();
    setCurrentPage('landing');
    setCurrentSession(null);
  };

  const handleStartTrial = () => {
    setShowAuthModal(true);
  };

  const handlePlaySession = (session: Session) => {
    setCurrentSession(session);
    setCurrentPage('player');
  };

  const handleSessionComplete = () => {
    if (user && currentSession) {
      updateUser({
        totalSessions: user.totalSessions + 1,
        totalMinutes: user.totalMinutes + currentSession.duration,
        meditationStreak: user.meditationStreak + 1
      });
    }
    setCurrentSession(null);
    setCurrentPage('dashboard');
  };

  const handleBackFromPlayer = () => {
    setCurrentSession(null);
    setCurrentPage('library');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'landing':
        return (
          <Hero 
            onStartTrial={handleStartTrial}
            onSignIn={() => setShowAuthModal(true)}
          />
        );
      
      case 'dashboard':
        return user ? (
          <Dashboard
            user={user}
            recommendedSession={recommendedSession}
            onStartSession={handlePlaySession}
            onViewLibrary={() => setCurrentPage('library')}
          />
        ) : null;
      
      case 'library':
        return user ? (
          <SessionLibrary
            sessions={allSessions}
            onPlaySession={handlePlaySession}
            isPremium={user.subscriptionType === 'premium'}
          />
        ) : null;
      
      case 'player':
        return currentSession ? (
          <EnhancedSessionPlayer
            session={currentSession}
            onComplete={handleSessionComplete}
            onBack={handleBackFromPlayer}
          />
        ) : null;
      
      default:
        return user ? (
          <Dashboard
            user={user}
            recommendedSession={recommendedSession}
            onStartSession={handlePlaySession}
            onViewLibrary={() => setCurrentPage('library')}
          />
        ) : (
          <Hero 
            onStartTrial={handleStartTrial}
            onSignIn={() => setShowAuthModal(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {currentPage !== 'player' && (
        <Navigation
          user={user}
          onSignIn={() => setShowAuthModal(true)}
          onSignOut={handleSignOut}
          onProfile={() => {}} // TODO: Implement profile page
          currentPage={currentPage}
          onNavigate={setCurrentPage}
        />
      )}
      
      {renderCurrentPage()}
      
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSignIn={handleSignIn}
        onSignUp={handleSignUp}
        onGuestAccess={handleGuestAccess}
      />
    </div>
  );
};

export default AppLayout;
import React, { useState } from 'react';
import { Session, SessionCategory } from '@/types';
import SessionCard from './SessionCard';
import SessionEditModal from './SessionEditModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, Plus, Settings } from 'lucide-react';

interface SessionLibraryProps {
  sessions: Session[];
  onPlaySession: (session: Session) => void;
  isPremium: boolean;
  isAdmin?: boolean;
}

const categoryLabels: Record<SessionCategory, string> = {
  'truth-consciousness': 'Truth & Consciousness',
  'balance-integration': 'Balance & Integration',
  'present-moment': 'Present Moment Awareness',
  'love-acceptance': 'Love & Acceptance',
  'quick-reset': 'Quick Reset'
};

const SessionLibrary: React.FC<SessionLibraryProps> = ({ 
  sessions, onPlaySession, isPremium, isAdmin = false 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<SessionCategory | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingSession, setEditingSession] = useState<Session | null>(null);
  const [sessionList, setSessionList] = useState<Session[]>(sessions);

  const filteredSessions = sessions.filter(session => {
    const matchesSearch = session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || session.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || session.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const categories = Object.keys(categoryLabels) as SessionCategory[];

  const handleSaveSession = (updatedSession: Session) => {
    setSessionList(prev => {
      const existingIndex = prev.findIndex(s => s.id === updatedSession.id);
      if (existingIndex >= 0) {
        const newList = [...prev];
        newList[existingIndex] = updatedSession;
        return newList;
      } else {
        return [...prev, updatedSession];
      }
    });
  };

  const handleCreateNew = () => {
    setEditingSession(null);
    setShowEditModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-navy-900 mb-2">Session Library</h1>
          <p className="text-navy-600">
            Explore guided meditations for every stage of your journey
          </p>
        </div>
        
        {isAdmin && (
          <Button
            onClick={handleCreateNew}
            className="bg-sage-600 hover:bg-sage-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Session
          </Button>
        )}
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-sage-100 p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search sessions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as SessionCategory | 'all')}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {categoryLabels[category]}
              </option>
            ))}
          </select>
          
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-transparent"
          >
            <option value="all">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* Session Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredSessions.map(session => (
          <SessionCard
            key={session.id}
            session={session}
            onPlay={onPlaySession}
            isPremium={isPremium}
          />
        ))}
      </div>

      {filteredSessions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-navy-600 text-lg">No sessions found matching your criteria.</p>
          <Button 
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setSelectedDifficulty('all');
            }}
            variant="outline"
            className="mt-4 border-sage-600 text-sage-700 hover:bg-sage-50"
          >
            Clear Filters
          </Button>
        </div>
      )}

      {/* Session Edit Modal */}
      <SessionEditModal
        session={editingSession}
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={handleSaveSession}
      />
    </div>
  );
};

export default SessionLibrary;
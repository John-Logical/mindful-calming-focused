import React from 'react';
import { Session } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Play, Clock, Star, Lock } from 'lucide-react';

interface SessionCardProps {
  session: Session;
  onPlay: (session: Session) => void;
  isPremium: boolean;
}

const SessionCard: React.FC<SessionCardProps> = ({ session, onPlay, isPremium }) => {
  const canPlay = session.isFree || isPremium;
  
  const difficultyColors = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800'
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white border-sage-100">
      <div className="relative">
        <img 
          src={session.imageUrl} 
          alt={session.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        {!canPlay && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-t-lg">
            <Lock className="w-8 h-8 text-white" />
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[session.difficulty]}`}>
            {session.difficulty}
          </span>
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-navy-900 mb-2 group-hover:text-sage-700 transition-colors">
          {session.title}
        </h3>
        
        <p className="text-navy-600 text-sm mb-3 line-clamp-2">
          {session.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-navy-500 text-sm">
            <Clock className="w-4 h-4 mr-1" />
            {session.duration} min
          </div>
          
          <div className="flex items-center text-navy-500 text-sm">
            <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
            {session.rating}
          </div>
        </div>
        
        <Button 
          onClick={() => onPlay(session)}
          disabled={!canPlay}
          className="w-full bg-sage-600 hover:bg-sage-700 text-white disabled:bg-gray-300"
        >
          <Play className="w-4 h-4 mr-2" />
          {canPlay ? 'Start Session' : 'Premium Only'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default SessionCard;
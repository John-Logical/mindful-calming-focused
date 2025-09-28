import React from 'react';
import { User, Session } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Flame, Clock, Trophy, Play } from 'lucide-react';

interface DashboardProps {
  user: User;
  recommendedSession: Session;
  onStartSession: (session: Session) => void;
  onViewLibrary: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  user, recommendedSession, onStartSession, onViewLibrary 
}) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-navy-900 mb-2">
          Welcome back, {user.name}
        </h1>
        <p className="text-navy-600">
          Continue your journey of self-discovery and inner peace
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-sage-50 to-sage-100 border-sage-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sage-700 text-sm font-medium">Current Streak</p>
                <p className="text-3xl font-bold text-sage-800">{user.meditationStreak}</p>
                <p className="text-sage-600 text-sm">days</p>
              </div>
              <Flame className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-700 text-sm font-medium">Total Time</p>
                <p className="text-3xl font-bold text-blue-800">{user.totalMinutes}</p>
                <p className="text-blue-600 text-sm">minutes</p>
              </div>
              <Clock className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-700 text-sm font-medium">Sessions</p>
                <p className="text-3xl font-bold text-purple-800">{user.totalSessions}</p>
                <p className="text-purple-600 text-sm">completed</p>
              </div>
              <Trophy className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommended Session */}
      <Card className="mb-8 bg-gradient-to-r from-sage-600 to-sage-700 text-white">
        <CardHeader>
          <CardTitle className="text-xl">Today's Recommended Session</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">{recommendedSession.title}</h3>
              <p className="text-sage-100 mb-3">{recommendedSession.description}</p>
              <div className="flex items-center text-sage-200 text-sm">
                <Clock className="w-4 h-4 mr-1" />
                {recommendedSession.duration} minutes • {recommendedSession.difficulty}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Button 
                onClick={() => onStartSession(recommendedSession)}
                className="bg-white text-sage-700 hover:bg-sage-50 font-semibold px-6 py-3"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Session
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={onViewLibrary}>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-navy-900 mb-2">Explore Library</h3>
            <p className="text-navy-600 mb-4">
              Discover new sessions across all categories
            </p>
            <Button variant="outline" className="border-sage-600 text-sage-700 hover:bg-sage-50">
              Browse Sessions
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-navy-900 mb-2">Track Progress</h3>
            <p className="text-navy-600 mb-4">
              View your meditation journey and insights
            </p>
            <Button variant="outline" className="border-sage-600 text-sage-700 hover:bg-sage-50">
              View Progress
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
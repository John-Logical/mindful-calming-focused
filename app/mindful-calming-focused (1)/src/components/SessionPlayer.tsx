import React, { useState, useEffect } from 'react';
import { Session } from '@/types';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, 
  ArrowLeft, Settings, Heart 
} from 'lucide-react';

interface SessionPlayerProps {
  session: Session;
  onComplete: () => void;
  onBack: () => void;
}

const SessionPlayer: React.FC<SessionPlayerProps> = ({ 
  session, onComplete, onBack 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const totalTime = session.duration * 60; // Convert minutes to seconds
  const progress = (currentTime / totalTime) * 100;
  const remainingTime = totalTime - currentTime;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentTime < totalTime) {
      interval = setInterval(() => {
        setCurrentTime(prev => prev + 1);
      }, 1000 / playbackSpeed);
    } else if (currentTime >= totalTime) {
      onComplete();
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTime, totalTime, playbackSpeed, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSkip = (seconds: number) => {
    setCurrentTime(prev => Math.max(0, Math.min(totalTime, prev + seconds)));
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    setShowSettings(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 to-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-sage-100 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Button variant="ghost" onClick={onBack} className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="text-center">
            <h1 className="text-lg font-semibold text-navy-900">{session.title}</h1>
            <p className="text-sm text-navy-600">{session.duration} minutes</p>
          </div>
          <Button variant="ghost" className="p-2">
            <Heart className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Main Player */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-md w-full text-center">
          {/* Circular Progress */}
          <div className="relative w-64 h-64 mx-auto mb-8">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="2"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#7C9885"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-navy-900 mb-1">
                  {formatTime(remainingTime)}
                </div>
                <div className="text-sm text-navy-600">remaining</div>
              </div>
            </div>
          </div>

          {/* Session Description */}
          <p className="text-navy-600 mb-8 leading-relaxed">
            {session.description}
          </p>

          {/* Controls */}
          <div className="flex items-center justify-center space-x-6 mb-6">
            <Button
              variant="ghost"
              size="lg"
              onClick={() => handleSkip(-15)}
              className="p-3"
            >
              <SkipBack className="w-6 h-6" />
            </Button>

            <Button
              onClick={handlePlayPause}
              size="lg"
              className="w-16 h-16 rounded-full bg-sage-600 hover:bg-sage-700 text-white shadow-lg"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8" />
              ) : (
                <Play className="w-8 h-8 ml-1" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="lg"
              onClick={() => handleSkip(15)}
              className="p-3"
            >
              <SkipForward className="w-6 h-6" />
            </Button>
          </div>

          {/* Secondary Controls */}
          <div className="flex items-center justify-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => setIsMuted(!isMuted)}
              className="p-2"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </Button>

            <div className="relative">
              <Button
                variant="ghost"
                onClick={() => setShowSettings(!showSettings)}
                className="p-2"
              >
                <Settings className="w-5 h-5" />
              </Button>
              
              {showSettings && (
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg border border-sage-100 p-2 min-w-[120px]">
                  <div className="text-xs font-medium text-navy-600 mb-2">Playback Speed</div>
                  {[0.75, 1, 1.25].map(speed => (
                    <button
                      key={speed}
                      onClick={() => handleSpeedChange(speed)}
                      className={`block w-full text-left px-3 py-1 text-sm rounded ${
                        playbackSpeed === speed
                          ? 'bg-sage-100 text-sage-700'
                          : 'text-navy-600 hover:bg-sage-50'
                      }`}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionPlayer;
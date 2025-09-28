import React, { useState, useEffect } from 'react';
import { Session } from '@/types';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Play, Pause, SkipBack, SkipForward, Settings, 
  ArrowLeft, Heart, BarChart3
} from 'lucide-react';
import AudioManager from './AudioManager';

interface EnhancedSessionPlayerProps {
  session: Session;
  onComplete: () => void;
  onBack: () => void;
}

const EnhancedSessionPlayer: React.FC<EnhancedSessionPlayerProps> = ({ 
  session, onComplete, onBack 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalTime, setTotalTime] = useState(session.actualDuration || session.duration * 60);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [showAudioWave, setShowAudioWave] = useState(false);

  const progress = (currentTime / totalTime) * 100;
  const remainingTime = totalTime - currentTime;

  useEffect(() => {
    // If no audio file, use timer-only mode
    if (!session.audioUrl) {
      let interval: NodeJS.Timeout;
      if (isPlaying && currentTime < totalTime) {
        interval = setInterval(() => {
          setCurrentTime(prev => prev + 1);
        }, 1000 / playbackSpeed);
      } else if (currentTime >= totalTime) {
        onComplete();
      }
      return () => clearInterval(interval);
    }
  }, [isPlaying, currentTime, totalTime, playbackSpeed, onComplete, session.audioUrl]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSkip = (seconds: number) => {
    const newTime = Math.max(0, Math.min(totalTime, currentTime + seconds));
    setCurrentTime(newTime);
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    setShowSettings(false);
  };

  const handleTimeUpdate = (time: number) => {
    setCurrentTime(time);
  };

  const handleDurationChange = (duration: number) => {
    setTotalTime(duration);
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    onComplete();
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
            <p className="text-sm text-navy-600">
              {Math.ceil(totalTime / 60)} minutes
              {session.audioUrl && (
                <span className="ml-2 text-sage-600">• Audio Guided</span>
              )}
            </p>
          </div>
          <Button variant="ghost" className="p-2">
            <Heart className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Main Player */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-md w-full text-center">
          {/* Audio Manager */}
          {session.audioUrl && (
            <div className="mb-8">
              <AudioManager
                mainAudioUrl={session.audioUrl}
                backgroundMusicUrl={session.backgroundMusicUrl}
                isPlaying={isPlaying}
                currentTime={currentTime}
                playbackSpeed={playbackSpeed}
                onTimeUpdate={handleTimeUpdate}
                onDurationChange={handleDurationChange}
                onEnded={handleAudioEnded}
              />
            </div>
          )}

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

          {/* Audio Waveform Visualization */}
          {session.audioUrl && (
            <div className="mb-6">
              <Button
                variant="ghost"
                onClick={() => setShowAudioWave(!showAudioWave)}
                className="text-sage-600 hover:text-sage-700"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                {showAudioWave ? 'Hide' : 'Show'} Audio Progress
              </Button>
              
              {showAudioWave && (
                <div className="mt-4 bg-white rounded-lg p-4 border border-sage-200">
                  <Progress value={progress} className="h-2" />
                  <div className="flex justify-between text-xs text-navy-600 mt-2">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(totalTime)}</span>
                  </div>
                </div>
              )}
            </div>
          )}

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

          {/* Speed Control */}
          <div className="relative">
            <Button
              variant="ghost"
              onClick={() => setShowSettings(!showSettings)}
              className="p-2"
            >
              <Settings className="w-5 h-5 mr-2" />
              {playbackSpeed}x Speed
            </Button>
            
            {showSettings && (
              <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg border border-sage-100 p-2 min-w-[120px]">
                <div className="text-xs font-medium text-navy-600 mb-2">Playback Speed</div>
                {[0.75, 1, 1.25, 1.5].map(speed => (
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
  );
};

export default EnhancedSessionPlayer;
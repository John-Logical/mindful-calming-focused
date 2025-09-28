import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface AudioManagerProps {
  mainAudioUrl?: string;
  backgroundMusicUrl?: string;
  isPlaying: boolean;
  currentTime: number;
  playbackSpeed: number;
  onTimeUpdate: (time: number) => void;
  onDurationChange: (duration: number) => void;
  onEnded: () => void;
}

const AudioManager: React.FC<AudioManagerProps> = ({
  mainAudioUrl,
  backgroundMusicUrl,
  isPlaying,
  currentTime,
  playbackSpeed,
  onTimeUpdate,
  onDurationChange,
  onEnded
}) => {
  const mainAudioRef = useRef<HTMLAudioElement>(null);
  const backgroundAudioRef = useRef<HTMLAudioElement>(null);
  const [mainVolume, setMainVolume] = useState(100);
  const [backgroundVolume, setBackgroundVolume] = useState(30);
  const [backgroundEnabled, setBackgroundEnabled] = useState(false);
  const [mainMuted, setMainMuted] = useState(false);
  const [backgroundMuted, setBackgroundMuted] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  // Handle user interaction for mobile audio
  const handleUserInteraction = () => {
    if (!hasUserInteracted) {
      setHasUserInteracted(true);
      // Try to initialize audio context on mobile
      if (mainAudioRef.current) {
        mainAudioRef.current.load();
      }
      if (backgroundAudioRef.current) {
        backgroundAudioRef.current.load();
      }
    }
  };

  // Sync main audio with play state
  useEffect(() => {
    const mainAudio = mainAudioRef.current;
    if (!mainAudio || !mainAudioUrl) return;

    if (isPlaying && hasUserInteracted) {
      mainAudio.play().catch(console.error);
    } else {
      mainAudio.pause();
    }
  }, [isPlaying, mainAudioUrl, hasUserInteracted]);

  // Handle playback speed changes
  useEffect(() => {
    if (mainAudioRef.current) {
      mainAudioRef.current.playbackRate = playbackSpeed;
    }
    if (backgroundAudioRef.current) {
      backgroundAudioRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  // Handle time seeking
  useEffect(() => {
    if (mainAudioRef.current && Math.abs(mainAudioRef.current.currentTime - currentTime) > 1) {
      mainAudioRef.current.currentTime = currentTime;
    }
  }, [currentTime]);

  // Handle volume changes
  useEffect(() => {
    if (mainAudioRef.current) {
      mainAudioRef.current.volume = mainMuted ? 0 : mainVolume / 100;
    }
  }, [mainVolume, mainMuted]);

  useEffect(() => {
    if (backgroundAudioRef.current) {
      backgroundAudioRef.current.volume = backgroundMuted ? 0 : backgroundVolume / 100;
    }
  }, [backgroundVolume, backgroundMuted]);

  // Background music management
  useEffect(() => {
    const backgroundAudio = backgroundAudioRef.current;
    if (!backgroundAudio || !backgroundMusicUrl) return;

    if (backgroundEnabled && isPlaying && hasUserInteracted) {
      backgroundAudio.play().catch(console.error);
    } else {
      backgroundAudio.pause();
    }
  }, [backgroundEnabled, isPlaying, backgroundMusicUrl, hasUserInteracted]);

  const handleMainAudioTimeUpdate = () => {
    if (mainAudioRef.current) {
      onTimeUpdate(mainAudioRef.current.currentTime);
    }
  };

  const handleMainAudioLoadedMetadata = () => {
    if (mainAudioRef.current) {
      onDurationChange(mainAudioRef.current.duration);
    }
  };

  const handleMainAudioEnded = () => {
    onEnded();
  };

  return (
    <div className="space-y-4">
      {/* Audio Elements */}
      {mainAudioUrl && (
        <audio
          ref={mainAudioRef}
          src={mainAudioUrl}
          onTimeUpdate={handleMainAudioTimeUpdate}
          onLoadedMetadata={handleMainAudioLoadedMetadata}
          onEnded={handleMainAudioEnded}
          preload="metadata"
        />
      )}
      
      {backgroundMusicUrl && (
        <audio
          ref={backgroundAudioRef}
          src={backgroundMusicUrl}
          loop
          preload="metadata"
        />
      )}

      {/* Mobile Audio Activation */}
      {!hasUserInteracted && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center">
          <p className="text-amber-800 mb-3">
            Tap to enable audio for the best meditation experience
          </p>
          <Button 
            onClick={handleUserInteraction}
            className="bg-amber-600 hover:bg-amber-700 text-white"
          >
            Enable Audio
          </Button>
        </div>
      )}

      {/* Audio Controls */}
      <div className="bg-white rounded-lg border border-sage-200 p-4 space-y-4">
        {/* Main Audio Controls */}
        {mainAudioUrl && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-navy-700">Voice Audio</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMainMuted(!mainMuted)}
                className="p-1"
              >
                {mainMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </Button>
            </div>
            <Slider
              value={[mainMuted ? 0 : mainVolume]}
              onValueChange={([value]) => {
                setMainVolume(value);
                if (value > 0) setMainMuted(false);
              }}
              max={100}
              step={1}
              className="w-full"
            />
          </div>
        )}

        {/* Background Music Controls */}
        {backgroundMusicUrl && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-navy-700">Background Music</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setBackgroundEnabled(!backgroundEnabled)}
                  className={`p-1 ${backgroundEnabled ? 'text-sage-600' : 'text-gray-400'}`}
                >
                  <Music className="w-4 h-4" />
                </Button>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setBackgroundMuted(!backgroundMuted)}
                className="p-1"
                disabled={!backgroundEnabled}
              >
                {backgroundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </Button>
            </div>
            <Slider
              value={[backgroundMuted ? 0 : backgroundVolume]}
              onValueChange={([value]) => {
                setBackgroundVolume(value);
                if (value > 0) setBackgroundMuted(false);
              }}
              max={100}
              step={1}
              className="w-full"
              disabled={!backgroundEnabled}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioManager;
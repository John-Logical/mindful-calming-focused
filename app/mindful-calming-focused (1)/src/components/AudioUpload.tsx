import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Upload, Play, Pause, X, Check } from 'lucide-react';

interface AudioUploadProps {
  onAudioUpload: (audioFile: File, duration: number) => void;
  currentAudioUrl?: string;
  onRemoveAudio?: () => void;
}

const AudioUpload: React.FC<AudioUploadProps> = ({ 
  onAudioUpload, 
  currentAudioUrl, 
  onRemoveAudio 
}) => {
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewAudio, setPreviewAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    const audioFile = files.find(file => file.type.startsWith('audio/'));
    if (audioFile) {
      processAudioFile(audioFile);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      processAudioFile(file);
    }
  };

  const processAudioFile = (file: File) => {
    setUploading(true);
    const audio = new Audio();
    const url = URL.createObjectURL(file);
    
    audio.onloadedmetadata = () => {
      const audioDuration = Math.round(audio.duration / 60); // Convert to minutes
      setDuration(audioDuration);
      setPreviewAudio(audio);
      setUploading(false);
      onAudioUpload(file, audioDuration);
      URL.revokeObjectURL(url);
    };

    audio.onerror = () => {
      setUploading(false);
      alert('Error loading audio file. Please try a different file.');
      URL.revokeObjectURL(url);
    };

    audio.src = url;
  };

  const togglePreview = () => {
    if (!previewAudio) return;
    
    if (isPlaying) {
      previewAudio.pause();
      setIsPlaying(false);
    } else {
      previewAudio.play();
      setIsPlaying(true);
      previewAudio.onended = () => setIsPlaying(false);
    }
  };

  const formatTime = (minutes: number) => {
    return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
  };

  return (
    <div className="space-y-4">
      {!currentAudioUrl && !previewAudio ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragOver 
              ? 'border-sage-400 bg-sage-50' 
              : 'border-sage-200 hover:border-sage-300'
          }`}
        >
          <Upload className="w-12 h-12 text-sage-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-navy-900 mb-2">
            Upload Audio File
          </h3>
          <p className="text-navy-600 mb-4">
            Drag and drop an audio file here, or click to browse
          </p>
          <p className="text-sm text-navy-500 mb-4">
            Supports MP3, M4A, WAV files
          </p>
          
          <Button 
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="bg-sage-600 hover:bg-sage-700"
          >
            {uploading ? 'Processing...' : 'Choose File'}
          </Button>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          
          {uploading && (
            <div className="mt-4">
              <Progress value={50} className="w-full" />
              <p className="text-sm text-navy-600 mt-2">Analyzing audio...</p>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-sage-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-medium text-navy-900">Audio Ready</h4>
              {duration && (
                <p className="text-sm text-navy-600">
                  Duration: {formatTime(duration)}
                </p>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={togglePreview}
                className="p-2"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setPreviewAudio(null);
                  setDuration(null);
                  setIsPlaying(false);
                  onRemoveAudio?.();
                }}
                className="p-2 text-red-600 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center text-sage-600">
            <Check className="w-4 h-4 mr-2" />
            <span className="text-sm">Audio file uploaded successfully</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioUpload;
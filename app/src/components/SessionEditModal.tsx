import React, { useState } from 'react';
import { Session } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AudioUpload from './AudioUpload';

interface SessionEditModalProps {
  session: Session | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (session: Session) => void;
}

const SessionEditModal: React.FC<SessionEditModalProps> = ({
  session,
  isOpen,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState<Partial<Session>>(
    session || {
      title: '',
      description: '',
      duration: 5,
      category: 'truth-consciousness',
      difficulty: 'beginner',
      isFree: true,
      audioUrl: undefined,
      backgroundMusicUrl: undefined
    }
  );

  const handleInputChange = (field: keyof Session, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAudioUpload = (audioFile: File, duration: number) => {
    // In a real app, you'd upload to a server/CDN
    const audioUrl = URL.createObjectURL(audioFile);
    setFormData(prev => ({
      ...prev,
      audioUrl,
      duration,
      actualDuration: duration * 60
    }));
  };

  const handleBackgroundMusicUpload = (audioFile: File) => {
    const backgroundMusicUrl = URL.createObjectURL(audioFile);
    setFormData(prev => ({ ...prev, backgroundMusicUrl }));
  };

  const handleSave = () => {
    if (!formData.title || !formData.description) {
      alert('Please fill in all required fields');
      return;
    }

    const updatedSession: Session = {
      id: session?.id || Date.now().toString(),
      title: formData.title!,
      description: formData.description!,
      duration: formData.duration!,
      category: formData.category!,
      difficulty: formData.difficulty!,
      imageUrl: formData.imageUrl || session?.imageUrl || '',
      audioUrl: formData.audioUrl,
      backgroundMusicUrl: formData.backgroundMusicUrl,
      actualDuration: formData.actualDuration,
      isFree: formData.isFree!,
      rating: session?.rating || 0,
      completions: session?.completions || 0
    };

    onSave(updatedSession);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {session ? 'Edit Session' : 'Create New Session'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Session Title</Label>
              <Input
                id="title"
                value={formData.title || ''}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter session title"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description || ''}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe the meditation session"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => handleInputChange('category', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="truth-consciousness">Truth & Consciousness</SelectItem>
                    <SelectItem value="balance-integration">Balance & Integration</SelectItem>
                    <SelectItem value="present-moment">Present Moment</SelectItem>
                    <SelectItem value="love-acceptance">Love & Acceptance</SelectItem>
                    <SelectItem value="quick-reset">Quick Reset</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="difficulty">Difficulty</Label>
                <Select 
                  value={formData.difficulty} 
                  onValueChange={(value) => handleInputChange('difficulty', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Audio Upload */}
          <div>
            <Label className="text-base font-medium">Main Audio</Label>
            <p className="text-sm text-gray-600 mb-3">
              Upload the guided meditation audio. Duration will be auto-detected.
            </p>
            <AudioUpload
              onAudioUpload={handleAudioUpload}
              currentAudioUrl={formData.audioUrl}
              onRemoveAudio={() => handleInputChange('audioUrl', undefined)}
            />
          </div>

          {/* Background Music Upload */}
          <div>
            <Label className="text-base font-medium">Background Music (Optional)</Label>
            <p className="text-sm text-gray-600 mb-3">
              Upload ambient background music that will loop during the session.
            </p>
            <AudioUpload
              onAudioUpload={(file) => handleBackgroundMusicUpload(file)}
              currentAudioUrl={formData.backgroundMusicUrl}
              onRemoveAudio={() => handleInputChange('backgroundMusicUrl', undefined)}
            />
          </div>

          {/* Session Settings */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isFree"
              checked={formData.isFree}
              onChange={(e) => handleInputChange('isFree', e.target.checked)}
              className="rounded border-gray-300"
            />
            <Label htmlFor="isFree">Free session (available to all users)</Label>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-6 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-sage-600 hover:bg-sage-700">
              {session ? 'Update Session' : 'Create Session'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SessionEditModal;
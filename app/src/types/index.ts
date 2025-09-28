export interface User {
  id: string;
  email: string;
  name: string;
  isGuest: boolean;
  subscriptionType: 'free' | 'premium';
  meditationStreak: number;
  totalSessions: number;
  totalMinutes: number;
  createdAt: Date;
}

export interface Session {
  id: string;
  title: string;
  description: string;
  duration: number; // This will be auto-updated from audio file
  category: SessionCategory;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  imageUrl: string;
  audioUrl?: string;
  backgroundMusicUrl?: string;
  actualDuration?: number; // Duration from audio file in seconds
  isFree: boolean;
  rating: number;
  completions: number;
}

export type SessionCategory = 
  | 'truth-consciousness'
  | 'balance-integration'
  | 'present-moment'
  | 'love-acceptance'
  | 'quick-reset';

export interface UserProgress {
  sessionId: string;
  completedAt: Date;
  duration: number;
  moodBefore?: number;
  moodAfter?: number;
  notes?: string;
}

export interface AppState {
  user: User | null;
  currentSession: Session | null;
  isPlaying: boolean;
  currentTime: number;
  darkMode: boolean;
}
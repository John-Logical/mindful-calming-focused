import { Session } from '@/types';

export const sessions: Session[] = [
  // Truth & Consciousness
  {
    id: '1',
    title: 'Discovering Your Inner Truth',
    description: 'A guided journey to connect with your authentic self and inner wisdom.',
    duration: 5, // Will be updated when audio is uploaded
    category: 'truth-consciousness',
    difficulty: 'beginner',
    imageUrl: 'https://d64gsuwffb70l.cloudfront.net/68abf9aaa5f8797a860d9dc4_1756101082807_816e8809.webp',
    audioUrl: '/audio/discovering-inner-truth.mp3', // Sample audio path
    backgroundMusicUrl: '/audio/background/forest-ambience.mp3',
    actualDuration: 300, // 5 minutes in seconds
    isFree: true,
    rating: 4.8,
    completions: 1247
  },
  {
    id: '2',
    title: 'The Observer Within',
    description: 'Learn to witness your thoughts without judgment and find inner peace.',
    duration: 20,
    category: 'truth-consciousness',
    difficulty: 'intermediate',
    imageUrl: 'https://d64gsuwffb70l.cloudfront.net/68abf9aaa5f8797a860d9dc4_1756101084621_ccb5360b.webp',
    isFree: false,
    rating: 4.9,
    completions: 892
  },
  {
    id: '3',
    title: 'Consciousness Expansion',
    description: 'Advanced practice for expanding awareness beyond the thinking mind.',
    duration: 25,
    category: 'truth-consciousness',
    difficulty: 'advanced',
    imageUrl: 'https://d64gsuwffb70l.cloudfront.net/68abf9aaa5f8797a860d9dc4_1756101086380_b5dc0959.webp',
    isFree: false,
    rating: 4.7,
    completions: 634
  },
  
  // Balance & Integration
  {
    id: '4',
    title: 'Finding Your Center',
    description: 'Restore balance between mind, body, and spirit through mindful awareness.',
    duration: 12,
    category: 'balance-integration',
    difficulty: 'beginner',
    imageUrl: 'https://d64gsuwffb70l.cloudfront.net/68abf9aaa5f8797a860d9dc4_1756101091766_1d117600.webp',
    isFree: true,
    rating: 4.6,
    completions: 1156
  }
];
import { Session } from '@/types';

export const allSessions: Session[] = [
  // Present Moment (continued)
  {
    id: '9',
    title: 'Eternal Now',
    description: 'Advanced presence practice for transcending time.',
    duration: 22,
    category: 'present-moment',
    difficulty: 'advanced',
    imageUrl: 'https://d64gsuwffb70l.cloudfront.net/68abf9aaa5f8797a860d9dc4_1756101106272_b2eb528a.webp',
    isFree: false,
    rating: 4.9,
    completions: 678
  },

  // Love & Acceptance
  {
    id: '10',
    title: 'Self-Compassion',
    description: 'Cultivate unconditional love and acceptance for yourself.',
    duration: 16,
    category: 'love-acceptance',
    difficulty: 'beginner',
    imageUrl: 'https://d64gsuwffb70l.cloudfront.net/68abf9aaa5f8797a860d9dc4_1756101108026_dc650169.webp',
    isFree: false,
    rating: 4.8,
    completions: 1123
  },
  {
    id: '11',
    title: 'Heart Opening',
    description: 'Open your heart to love, compassion, and connection.',
    duration: 20,
    category: 'love-acceptance',
    difficulty: 'intermediate',
    imageUrl: 'https://d64gsuwffb70l.cloudfront.net/68abf9aaa5f8797a860d9dc4_1756101112731_5fcd34b9.webp',
    isFree: false,
    rating: 4.9,
    completions: 856
  },
  {
    id: '12',
    title: 'Universal Love',
    description: 'Experience the boundless love that connects all beings.',
    duration: 25,
    category: 'love-acceptance',
    difficulty: 'advanced',
    imageUrl: 'https://d64gsuwffb70l.cloudfront.net/68abf9aaa5f8797a860d9dc4_1756101114532_fe5cf443.webp',
    isFree: false,
    rating: 4.8,
    completions: 592
  },

  // Quick Reset
  {
    id: '13',
    title: '2-Minute Reset',
    description: 'Quick centering practice for busy moments.',
    duration: 2,
    category: 'quick-reset',
    difficulty: 'beginner',
    imageUrl: 'https://d64gsuwffb70l.cloudfront.net/68abf9aaa5f8797a860d9dc4_1756101116215_334bbd9f.webp',
    isFree: true,
    rating: 4.6,
    completions: 2341
  }
];
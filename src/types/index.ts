export type ScreenStep = 'caricamento' | 'home' | 'calendario' | 'scheda_sogno' | 'podcast' | 'profilo';

export interface CategoryItem {
  id: string;
  name: string;
  icon: 'peperoncini' | 'spirale' | 'lucciole' | 'nuvola' | 'cristallo';
  color: string;
  description: string;
}

export interface Dream {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD e.g. "2026-01-09"
  dayNumber: number; // e.g. 9
  monthName: string; // e.g. "gennaio"
  year: number; // 2026
  description: string;
  tags: string[];
  categoryIds: string[];
  audioUrl?: string;
  audioDurationSeconds?: number;
  isFavorite: boolean;
  lucid: boolean;
  mood?: 'calmo' | 'intenso' | 'mistico' | 'felice' | 'bizzarro';
}

export interface UserProfile {
  name: string;
  avatarUrl: string;
  streakDays: number;
  totalDreams: number;
  lucidDreams: number;
  favoriteQuote: string;
}

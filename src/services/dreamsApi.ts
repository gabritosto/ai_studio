import { Dream, CategoryItem, UserProfile } from '../types';

export const INITIAL_CATEGORIES: CategoryItem[] = [
  {
    id: 'cat-peperoncini',
    name: 'Intenso & Speziato',
    icon: 'peperoncini',
    color: '#47387e',
    description: 'Emozioni forti, brividi ed energia vibrante',
  },
  {
    id: 'cat-spirale',
    name: 'Spirale & Lucido',
    icon: 'spirale',
    color: '#47387e',
    description: 'Sogni ricorrenti, misteri e consapevolezza lucida',
  },
  {
    id: 'cat-lucciole',
    name: 'Sciame di Luce',
    icon: 'lucciole',
    color: '#47387e',
    description: 'Visioni stellari, pace profonda e meraviglia',
  },
];

export const INITIAL_USER: UserProfile = {
  name: 'Federica',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  streakDays: 7,
  totalDreams: 24,
  lucidDreams: 9,
  favoriteQuote: 'I sogni sono la porta segreta dell’anima.',
};

export const INITIAL_DREAMS: Dream[] = [
  {
    id: 'dream-2026-01-09',
    title: 'Volando tra le stelle',
    date: '2026-01-09',
    dayNumber: 9,
    monthName: 'gennaio',
    year: 2026,
    description: 'Fluttuavo leggera tra morbide nuvole color viola, accarezzata dalla luce calda della luna crescente. Una piccola stella dorata camminava al mio fianco.',
    tags: ['Volo', 'Stelle', 'Serenità', 'Luna'],
    categoryIds: ['cat-peperoncini', 'cat-spirale'],
    isFavorite: true,
    lucid: true,
    audioDurationSeconds: 42,
    mood: 'mistico',
  },
  {
    id: 'dream-2026-01-08',
    title: 'Nel Giardino dei Sussurri',
    date: '2026-01-08',
    dayNumber: 8,
    monthName: 'gennaio',
    year: 2026,
    description: 'Fiori fosforescenti sussurravano vecchie melodie dimenticate sotto una pioggia di polvere dorata.',
    tags: ['Natura', 'Magia', 'Musica'],
    categoryIds: ['cat-lucciole'],
    isFavorite: true,
    lucid: false,
    audioDurationSeconds: 28,
    mood: 'calmo',
  },
  {
    id: 'dream-2026-01-07',
    title: 'La Città d’Acqua e Specchi',
    date: '2026-01-07',
    dayNumber: 7,
    monthName: 'gennaio',
    year: 2026,
    description: 'Strade fatte di canali d’argento e ponti di cristallo che riflettevano costellazioni in movimento.',
    tags: ['Città', 'Acqua', 'Specchio'],
    categoryIds: ['cat-spirale'],
    isFavorite: false,
    lucid: true,
    audioDurationSeconds: 65,
    mood: 'bizzarro',
  },
  {
    id: 'dream-2026-01-10',
    title: 'Il Faro sulle Nuvole',
    date: '2026-01-10',
    dayNumber: 10,
    monthName: 'gennaio',
    year: 2026,
    description: 'Un raggio di luce viola guidava uccelli di carta attraverso una tempesta di zucchero filato.',
    tags: ['Faro', 'Nuvole'],
    categoryIds: ['cat-lucciole'],
    isFavorite: false,
    lucid: false,
    audioDurationSeconds: 19,
    mood: 'felice',
  },
  {
    id: 'dream-2026-01-11',
    title: 'Il Labirinto di Velluto',
    date: '2026-01-11',
    dayNumber: 11,
    monthName: 'gennaio',
    year: 2026,
    description: 'Un labirinto con pareti morbide color indaco, in cui ogni svolta rivelava ricordi felici d’infanzia.',
    tags: ['Ricordi', 'Labirinto'],
    categoryIds: ['cat-peperoncini', 'cat-spirale'],
    isFavorite: true,
    lucid: true,
    audioDurationSeconds: 51,
    mood: 'intenso',
  },
  {
    id: 'dream-2026-01-14',
    title: 'La Notte delle Onde Lucenti',
    date: '2026-01-14',
    dayNumber: 14,
    monthName: 'gennaio',
    year: 2026,
    description: 'Mare calmo di mezzanotte illuminato da minuscole creature bioluminescenti.',
    tags: ['Mare', 'Luce'],
    categoryIds: ['cat-lucciole'],
    isFavorite: true,
    lucid: false,
    audioDurationSeconds: 34,
    mood: 'calmo',
  },
  {
    id: 'dream-2026-01-22',
    title: 'La Porta del Vento Solare',
    date: '2026-01-22',
    dayNumber: 22,
    monthName: 'gennaio',
    year: 2026,
    description: 'Aprire una porta sospesa nell’aria e respirare un vento tiepido profumato di cedro e cannella.',
    tags: ['Vento', 'Mistero'],
    categoryIds: ['cat-peperoncini'],
    isFavorite: false,
    lucid: false,
    audioDurationSeconds: 22,
    mood: 'intenso',
  },
];

const STORAGE_KEY = 'sogni_app_dreams_v1';
const USER_KEY = 'sogni_app_user_v1';

function getStoredDreams(): Dream[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DREAMS));
      return INITIAL_DREAMS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_DREAMS;
  }
}

function saveStoredDreams(dreams: Dream[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dreams));
  } catch (e) {
    console.error('Failed to save to localStorage', e);
  }
}

// Simulated Async API calls for React Query
export const dreamsApi = {
  async getDreams(): Promise<Dream[]> {
    await new Promise((r) => setTimeout(r, 80));
    return getStoredDreams();
  },

  async getDreamById(id: string): Promise<Dream | null> {
    await new Promise((r) => setTimeout(r, 60));
    const dreams = getStoredDreams();
    return dreams.find((d) => d.id === id) || null;
  },

  async getDreamByDate(dateStr: string): Promise<Dream | null> {
    await new Promise((r) => setTimeout(r, 60));
    const dreams = getStoredDreams();
    return dreams.find((d) => d.date === dateStr) || null;
  },

  async saveDream(dream: Partial<Dream> & { id?: string; title: string; date: string }): Promise<Dream> {
    await new Promise((r) => setTimeout(r, 120));
    const dreams = getStoredDreams();
    const existingIndex = dreams.findIndex((d) => d.id === dream.id || d.date === dream.date);
    
    const dateParts = dream.date.split('-');
    const day = parseInt(dateParts[2] || '9', 10);
    const year = parseInt(dateParts[0] || '2026', 10);

    const completeDream: Dream = {
      id: dream.id || `dream-${dream.date}`,
      title: dream.title || 'Nuovo Sogno',
      date: dream.date,
      dayNumber: day,
      monthName: 'gennaio',
      year: year,
      description: dream.description || '',
      tags: dream.tags || ['Sogno'],
      categoryIds: dream.categoryIds || ['cat-lucciole'],
      audioUrl: dream.audioUrl,
      audioDurationSeconds: dream.audioDurationSeconds || 0,
      isFavorite: dream.isFavorite ?? false,
      lucid: dream.lucid ?? false,
      mood: dream.mood || 'mistico',
    };

    if (existingIndex >= 0) {
      dreams[existingIndex] = { ...dreams[existingIndex], ...completeDream };
    } else {
      dreams.push(completeDream);
    }

    saveStoredDreams(dreams);
    return completeDream;
  },

  async toggleFavorite(id: string): Promise<Dream> {
    await new Promise((r) => setTimeout(r, 60));
    const dreams = getStoredDreams();
    const target = dreams.find((d) => d.id === id);
    if (!target) {
      throw new Error('Dream not found');
    }
    target.isFavorite = !target.isFavorite;
    saveStoredDreams(dreams);
    return target;
  },

  async getUserProfile(): Promise<UserProfile> {
    await new Promise((r) => setTimeout(r, 40));
    try {
      const raw = localStorage.getItem(USER_KEY);
      if (raw) return JSON.parse(raw);
    } catch {}
    return INITIAL_USER;
  },

  async getCategories(): Promise<CategoryItem[]> {
    return INITIAL_CATEGORIES;
  },
};

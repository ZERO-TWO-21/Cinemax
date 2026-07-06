// Design System Types & Data

export interface Movie {
  id: string;
  title: string;
  year: number;
  rating: string;
  score: number;
  duration: string;
  genres: string[];
  description: string;
  poster: string;
  backdrop: string;
  trailer?: string;
  cast: CastMember[];
  director: string;
  studio: string;
  language: string;
  isNew?: boolean;
  isTrending?: boolean;
  isWatchlisted?: boolean;
  isLiked?: boolean;
  watchProgress?: number;
  reviews?: Review[];
}

export interface CastMember {
  id: string;
  name: string;
  character: string;
  photo: string;
}

export interface Review {
  id: string;
  user: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
  likes: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  count: number;
  poster: string;
}

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

export type Page = 
  | 'splash'
  | 'auth'
  | 'home'
  | 'browse'
  | 'details'
  | 'player'
  | 'search'
  | 'categories'
  | 'watchlist'
  | 'downloads'
  | 'profile'
  | 'subscription'
  | 'settings'
  | 'notifications'
  | 'continue-watching'
  | 'reviews'
  | 'cast-crew'
  | '404'
  | 'offline';

// ── Mock Data ──────────────────────────────

const CAST_1: CastMember[] = [
  { id: 'c1', name: 'Leonardo DiCaprio', character: 'Dom Cobb', photo: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=150&h=150&fit=crop' },
  { id: 'c2', name: 'Joseph Gordon-Levitt', character: 'Arthur', photo: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?w=150&h=150&fit=crop' },
  { id: 'c3', name: 'Elliot Page', character: 'Ariadne', photo: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?w=150&h=150&fit=crop' },
  { id: 'c4', name: 'Tom Hardy', character: 'Eames', photo: 'https://images.pexels.com/photos/936229/pexels-photo-936229.jpeg?w=150&h=150&fit=crop' },
  { id: 'c5', name: 'Ken Watanabe', character: 'Saito', photo: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?w=150&h=150&fit=crop' },
  { id: 'c6', name: 'Marion Cotillard', character: 'Mal', photo: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?w=150&h=150&fit=crop' },
];

const REVIEWS_1: Review[] = [
  { id: 'r1', user: 'Alex Chen', avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?w=60&h=60&fit=crop', rating: 5, comment: 'Absolutely mind-bending! Nolan at his absolute best. The layered narrative and stunning visuals create an experience unlike anything else in cinema.', date: '2 days ago', likes: 234 },
  { id: 'r2', user: 'Sarah Kim', avatar: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?w=60&h=60&fit=crop', rating: 4, comment: 'A masterpiece of storytelling. The practical effects combined with Hans Zimmer\'s score elevate this to legendary status. Watched it 3 times already.', date: '1 week ago', likes: 187 },
  { id: 'r3', user: 'Marcus J', avatar: 'https://images.pexels.com/photos/936229/pexels-photo-936229.jpeg?w=60&h=60&fit=crop', rating: 5, comment: 'The concept of dreams within dreams is executed flawlessly. The final scene still has me questioning everything years later.', date: '2 weeks ago', likes: 156 },
];

export const MOVIES: Movie[] = [
  {
    id: 'm1',
    title: 'Inception',
    year: 2010,
    rating: 'PG-13',
    score: 8.8,
    duration: '2h 28m',
    genres: ['Sci-Fi', 'Thriller', 'Action'],
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.',
    poster: 'https://images.pexels.com/photos/1117132/pexels-photo-1117132.jpeg?w=400&h=600&fit=crop',
    backdrop: 'https://images.pexels.com/photos/1117132/pexels-photo-1117132.jpeg?w=1400&h=700&fit=crop',
    director: 'Christopher Nolan',
    studio: 'Warner Bros.',
    language: 'English',
    isTrending: true,
    cast: CAST_1,
    reviews: REVIEWS_1,
    watchProgress: 45,
  },
  {
    id: 'm2',
    title: 'Interstellar',
    year: 2014,
    rating: 'PG-13',
    score: 8.6,
    duration: '2h 49m',
    genres: ['Sci-Fi', 'Drama', 'Adventure'],
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    poster: 'https://images.pexels.com/photos/1262302/pexels-photo-1262302.jpeg?w=400&h=600&fit=crop',
    backdrop: 'https://images.pexels.com/photos/1262302/pexels-photo-1262302.jpeg?w=1400&h=700&fit=crop',
    director: 'Christopher Nolan',
    studio: 'Paramount Pictures',
    language: 'English',
    isNew: true,
    cast: CAST_1.slice(0, 4),
    reviews: REVIEWS_1.slice(0, 2),
    isWatchlisted: true,
  },
  {
    id: 'm3',
    title: 'Dune',
    year: 2021,
    rating: 'PG-13',
    score: 8.0,
    duration: '2h 35m',
    genres: ['Sci-Fi', 'Adventure', 'Drama'],
    description: 'A noble family becomes embroiled in a war for control over the galaxy\'s most valuable asset while its heir becomes troubled by visions of a dark future.',
    poster: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?w=400&h=600&fit=crop',
    backdrop: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?w=1400&h=700&fit=crop',
    director: 'Denis Villeneuve',
    studio: 'Legendary Pictures',
    language: 'English',
    isNew: true,
    cast: CAST_1.slice(1, 5),
    reviews: REVIEWS_1.slice(1, 3),
  },
  {
    id: 'm4',
    title: 'The Dark Knight',
    year: 2008,
    rating: 'PG-13',
    score: 9.0,
    duration: '2h 32m',
    genres: ['Action', 'Crime', 'Drama'],
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    poster: 'https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?w=400&h=600&fit=crop',
    backdrop: 'https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?w=1400&h=700&fit=crop',
    director: 'Christopher Nolan',
    studio: 'Warner Bros.',
    language: 'English',
    isTrending: true,
    cast: CAST_1,
    reviews: REVIEWS_1,
    watchProgress: 72,
  },
  {
    id: 'm5',
    title: 'Blade Runner 2049',
    year: 2017,
    rating: 'R',
    score: 8.0,
    duration: '2h 44m',
    genres: ['Sci-Fi', 'Drama', 'Mystery'],
    description: 'A young blade runner discovers a long-buried secret that leads him to track down former blade runner Rick Deckard.',
    poster: 'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg?w=400&h=600&fit=crop',
    backdrop: 'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg?w=1400&h=700&fit=crop',
    director: 'Denis Villeneuve',
    studio: 'Alcon Entertainment',
    language: 'English',
    cast: CAST_1.slice(2, 6),
    reviews: REVIEWS_1,
    isWatchlisted: true,
  },
  {
    id: 'm6',
    title: 'Avatar: The Way of Water',
    year: 2022,
    rating: 'PG-13',
    score: 7.6,
    duration: '3h 12m',
    genres: ['Action', 'Adventure', 'Sci-Fi'],
    description: 'Jake Sully lives with his newfound family formed on the extrasolar moon Pandora.',
    poster: 'https://images.pexels.com/photos/3617500/pexels-photo-3617500.jpeg?w=400&h=600&fit=crop',
    backdrop: 'https://images.pexels.com/photos/3617500/pexels-photo-3617500.jpeg?w=1400&h=700&fit=crop',
    director: 'James Cameron',
    studio: '20th Century Studios',
    language: 'English',
    isNew: true,
    cast: CAST_1.slice(0, 4),
    reviews: REVIEWS_1.slice(0, 2),
  },
  {
    id: 'm7',
    title: 'Oppenheimer',
    year: 2023,
    rating: 'R',
    score: 8.5,
    duration: '3h',
    genres: ['Biography', 'Drama', 'History'],
    description: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.',
    poster: 'https://images.pexels.com/photos/355465/pexels-photo-355465.jpeg?w=400&h=600&fit=crop',
    backdrop: 'https://images.pexels.com/photos/355465/pexels-photo-355465.jpeg?w=1400&h=700&fit=crop',
    director: 'Christopher Nolan',
    studio: 'Universal Pictures',
    language: 'English',
    isTrending: true,
    isNew: true,
    cast: CAST_1,
    reviews: REVIEWS_1,
    watchProgress: 25,
  },
  {
    id: 'm8',
    title: 'The Matrix',
    year: 1999,
    rating: 'R',
    score: 8.7,
    duration: '2h 16m',
    genres: ['Action', 'Sci-Fi'],
    description: 'When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth—the life he knows is the elaborate deception of an evil cyber-intelligence.',
    poster: 'https://images.pexels.com/photos/373912/pexels-photo-373912.jpeg?w=400&h=600&fit=crop',
    backdrop: 'https://images.pexels.com/photos/373912/pexels-photo-373912.jpeg?w=1400&h=700&fit=crop',
    director: 'Wachowski Sisters',
    studio: 'Warner Bros.',
    language: 'English',
    cast: CAST_1.slice(1, 5),
    reviews: REVIEWS_1,
    isWatchlisted: true,
  },
  {
    id: 'm9',
    title: 'Mad Max: Fury Road',
    year: 2015,
    rating: 'R',
    score: 8.1,
    duration: '2h',
    genres: ['Action', 'Adventure', 'Sci-Fi'],
    description: 'In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners, a psychotic worshiper, and a drifter named Max.',
    poster: 'https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg?w=400&h=600&fit=crop',
    backdrop: 'https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg?w=1400&h=700&fit=crop',
    director: 'George Miller',
    studio: 'Kennedy Miller',
    language: 'English',
    isTrending: true,
    cast: CAST_1.slice(0, 4),
    reviews: REVIEWS_1,
  },
  {
    id: 'm10',
    title: 'Parasite',
    year: 2019,
    rating: 'R',
    score: 8.5,
    duration: '2h 12m',
    genres: ['Thriller', 'Drama', 'Comedy'],
    description: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
    poster: 'https://images.pexels.com/photos/2041447/pexels-photo-2041447.jpeg?w=400&h=600&fit=crop',
    backdrop: 'https://images.pexels.com/photos/2041447/pexels-photo-2041447.jpeg?w=1400&h=700&fit=crop',
    director: 'Bong Joon-ho',
    studio: 'CJ Entertainment',
    language: 'Korean',
    isNew: true,
    cast: CAST_1.slice(2, 6),
    reviews: REVIEWS_1,
    watchProgress: 60,
  },
  {
    id: 'm11',
    title: 'Everything Everywhere',
    year: 2022,
    rating: 'R',
    score: 7.8,
    duration: '2h 19m',
    genres: ['Sci-Fi', 'Action', 'Comedy'],
    description: 'A middle-aged Chinese immigrant is swept up into an insane adventure in which she alone can save existence by exploring other universes.',
    poster: 'https://images.pexels.com/photos/3775603/pexels-photo-3775603.jpeg?w=400&h=600&fit=crop',
    backdrop: 'https://images.pexels.com/photos/3775603/pexels-photo-3775603.jpeg?w=1400&h=700&fit=crop',
    director: 'Daniel Kwan & Daniel Scheinert',
    studio: 'A24',
    language: 'English',
    isTrending: true,
    cast: CAST_1.slice(0, 5),
    reviews: REVIEWS_1,
  },
  {
    id: 'm12',
    title: 'Tenet',
    year: 2020,
    rating: 'PG-13',
    score: 7.3,
    duration: '2h 30m',
    genres: ['Action', 'Sci-Fi', 'Thriller'],
    description: 'Armed with only one word, Tenet, and fighting for the survival of the entire world, a Protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time.',
    poster: 'https://images.pexels.com/photos/1496373/pexels-photo-1496373.jpeg?w=400&h=600&fit=crop',
    backdrop: 'https://images.pexels.com/photos/1496373/pexels-photo-1496373.jpeg?w=1400&h=700&fit=crop',
    director: 'Christopher Nolan',
    studio: 'Warner Bros.',
    language: 'English',
    cast: CAST_1.slice(1, 5),
    reviews: REVIEWS_1.slice(0, 2),
    isWatchlisted: true,
  },
];

export const CATEGORIES: Category[] = [
  { id: 'cat1', name: 'Action', icon: 'Zap', color: '#ef4444', count: 248, poster: 'https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg?w=400&h=240&fit=crop' },
  { id: 'cat2', name: 'Sci-Fi', icon: 'Rocket', color: '#0ea5e9', count: 186, poster: 'https://images.pexels.com/photos/1262302/pexels-photo-1262302.jpeg?w=400&h=240&fit=crop' },
  { id: 'cat3', name: 'Drama', icon: 'Theater', color: '#a855f7', count: 312, poster: 'https://images.pexels.com/photos/2041447/pexels-photo-2041447.jpeg?w=400&h=240&fit=crop' },
  { id: 'cat4', name: 'Thriller', icon: 'AlertTriangle', color: '#f97316', count: 174, poster: 'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg?w=400&h=240&fit=crop' },
  { id: 'cat5', name: 'Comedy', icon: 'Smile', color: '#f5c518', count: 225, poster: 'https://images.pexels.com/photos/3775603/pexels-photo-3775603.jpeg?w=400&h=240&fit=crop' },
  { id: 'cat6', name: 'Horror', icon: 'Ghost', color: '#6366f1', count: 132, poster: 'https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?w=400&h=240&fit=crop' },
  { id: 'cat7', name: 'Romance', icon: 'Heart', color: '#ec4899', count: 198, poster: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?w=400&h=240&fit=crop' },
  { id: 'cat8', name: 'Documentary', icon: 'Film', color: '#14b8a6', count: 89, poster: 'https://images.pexels.com/photos/355465/pexels-photo-355465.jpeg?w=400&h=240&fit=crop' },
];

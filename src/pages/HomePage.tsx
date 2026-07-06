import React, { useState, useEffect } from 'react';
import { Play, Plus, Info, Star, Volume2, VolumeX, ChevronDown } from 'lucide-react';
import { MOVIES } from '../data/movies';
import { MovieRow } from '../components/layout/MovieRow';
import type { Movie } from '../data/movies';

interface HomePageProps {
  onSelectMovie: (movie: Movie) => void;
  onNavigate: (page: import('../data/movies').Page) => void;
  addToast: (msg: string, type?: 'success' | 'info' | 'error' | 'warning') => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onSelectMovie, onNavigate, addToast }) => {
  const [heroIndex, setHeroIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const [trailerPlaying, setTrailerPlaying] = useState(false);

  const heroMovies = MOVIES.filter(m => m.isTrending || m.isNew).slice(0, 5);
  const hero = heroMovies[heroIndex];

  const trending = MOVIES.filter(m => m.isTrending);
  const newReleases = MOVIES.filter(m => m.isNew);
  const sciFi = MOVIES.filter(m => m.genres.includes('Sci-Fi'));
  const continueWatching = MOVIES.filter(m => m.watchProgress && m.watchProgress > 0);

  // Auto-rotate hero
  useEffect(() => {
    if (trailerPlaying) return;
    const t = setInterval(() => {
      setHeroIndex(i => (i + 1) % heroMovies.length);
    }, 8000);
    return () => clearInterval(t);
  }, [heroMovies.length, trailerPlaying]);

  const handleWatchlist = () => {
    addToast(`${hero.title} added to your watchlist`, 'success');
  };

  return (
    <div className="min-h-screen bg-surface-950 dark:bg-surface-950">
      {/* Hero Section */}
      <div className="relative h-[85vh] min-h-[500px] overflow-hidden">
        {/* Background Image */}
        {heroMovies.map((m, i) => (
          <div
            key={m.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${i === heroIndex ? 'opacity-100' : 'opacity-0'}`}
          >
            <img
              src={m.backdrop}
              alt={m.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {/* Overlays */}
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 gradient-hero-mobile md:hidden" />
        <div className="absolute bottom-0 left-0 right-0 h-40 gradient-surface" />

        {/* Content */}
        <div className="absolute inset-0 flex items-end md:items-center pb-16 md:pb-0">
          <div className="container-cinema w-full">
            <div className="max-w-xl animate-fadeUp" key={heroIndex}>
              {/* Badges */}
              <div className="flex items-center gap-2 mb-4">
                {hero.isTrending && (
                  <span className="flex items-center gap-1.5 text-xs font-bold text-white bg-primary-500 px-3 py-1 rounded-full">
                    🔥 TRENDING
                  </span>
                )}
                {hero.isNew && (
                  <span className="text-xs font-bold text-black bg-accent-gold px-3 py-1 rounded-full">
                    NEW RELEASE
                  </span>
                )}
              </div>

              <h1 className="text-display-xl text-white mb-3 leading-tight">{hero.title}</h1>

              {/* Meta */}
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <Star size={14} className="text-accent-gold fill-accent-gold" />
                  <span className="text-sm font-bold text-white">{hero.score}</span>
                </div>
                <span className="text-white/30">|</span>
                <span className="text-sm text-white/70">{hero.year}</span>
                <span className="text-white/30">|</span>
                <span className="text-sm text-white/70">{hero.duration}</span>
                <span className="text-white/30">|</span>
                <span className="text-xs border border-white/40 text-white/70 px-2 py-0.5 rounded">{hero.rating}</span>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {hero.genres.map(g => (
                  <span key={g} className="text-xs text-white/60 bg-white/10 px-2.5 py-1 rounded-full backdrop-blur-sm">
                    {g}
                  </span>
                ))}
              </div>

              <p className="text-body-md text-white/70 line-clamp-2 mb-6 max-w-md">
                {hero.description}
              </p>

              {/* Actions */}
              <div className="flex items-center gap-3 flex-wrap">
                <button
                  onClick={() => onSelectMovie(hero)}
                  className="flex items-center gap-2.5 bg-white text-black text-sm font-bold px-6 py-3 rounded-full hover:bg-white/90 active:scale-95 transition-all duration-200 shadow-elevation-2"
                >
                  <Play size={16} fill="currentColor" />
                  Play Now
                </button>
                <button
                  onClick={handleWatchlist}
                  className="flex items-center gap-2.5 glass text-white text-sm font-semibold px-5 py-3 rounded-full hover:bg-white/15 active:scale-95 transition-all duration-200"
                >
                  <Plus size={16} />
                  My List
                </button>
                <button
                  onClick={() => onSelectMovie(hero)}
                  className="flex items-center gap-2.5 glass text-white text-sm font-semibold px-5 py-3 rounded-full hover:bg-white/15 active:scale-95 transition-all"
                >
                  <Info size={16} />
                  More Info
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Controls row */}
        <div className="absolute bottom-8 right-4 md:right-12 flex items-center gap-3">
          <button
            onClick={() => setMuted(v => !v)}
            className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/70 hover:text-white transition-all"
            aria-label={muted ? 'Unmute' : 'Mute'}
          >
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
          <span className="text-xs text-white/40 border border-white/20 px-2 py-1 rounded">{hero.rating}</span>
        </div>

        {/* Hero dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {heroMovies.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroIndex(i)}
              className={`rounded-full transition-all duration-300 ${i === heroIndex ? 'w-6 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/30'}`}
              aria-label={`Hero ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Sections */}
      <div className="container-cinema pb-24 space-y-10 -mt-4 relative z-10">
        {continueWatching.length > 0 && (
          <MovieRow
            title="Continue Watching"
            movies={continueWatching}
            onSelect={onSelectMovie}
            cardVariant="landscape"
            showProgress
          />
        )}
        <MovieRow
          title="Trending Now"
          movies={trending}
          onSelect={onSelectMovie}
          cardVariant="featured"
          badge={<span className="text-xs font-bold text-primary-400 bg-primary-500/15 px-2.5 py-1 rounded-full">Hot</span>}
        />
        <MovieRow title="New Releases" movies={newReleases} onSelect={onSelectMovie} />
        <MovieRow title="Sci-Fi & Adventure" movies={sciFi} onSelect={onSelectMovie} />
        <MovieRow
          title="Top Rated"
          movies={[...MOVIES].sort((a, b) => b.score - a.score).slice(0, 8)}
          onSelect={onSelectMovie}
          cardVariant="landscape"
        />
        <MovieRow
          title="Because You Watched Inception"
          movies={MOVIES.slice(4)}
          onSelect={onSelectMovie}
        />
      </div>
    </div>
  );
};

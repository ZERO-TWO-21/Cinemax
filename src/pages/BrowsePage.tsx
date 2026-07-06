import React, { useState } from 'react';
import { Film, SlidersHorizontal, ChevronDown, Grid, List, Star } from 'lucide-react';
import { MOVIES, CATEGORIES } from '../data/movies';
import type { Movie } from '../data/movies';
import { MovieCard } from '../components/cards/MovieCard';
import { Dropdown, Tabs } from '../components/ui/Dropdown';

interface BrowsePageProps {
  onSelectMovie: (movie: Movie) => void;
}

export const BrowsePage: React.FC<BrowsePageProps> = ({ onSelectMovie }) => {
  const [genre, setGenre] = useState('all');
  const [sort, setSort] = useState('trending');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [activeTab, setActiveTab] = useState('all');

  const genreOptions = [
    { value: 'all', label: 'All Genres' },
    ...Array.from(new Set(MOVIES.flatMap(m => m.genres))).sort().map(g => ({ value: g, label: g }))
  ];

  const sortOptions = [
    { value: 'trending', label: 'Trending' },
    { value: 'rating', label: 'Top Rated' },
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'az', label: 'A–Z' },
  ];

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'movies', label: 'Movies' },
    { id: 'series', label: 'Series' },
    { id: 'new', label: 'New' },
    { id: 'trending', label: 'Trending' },
  ];

  let filtered = [...MOVIES];
  if (genre !== 'all') filtered = filtered.filter(m => m.genres.includes(genre));
  if (activeTab === 'new') filtered = filtered.filter(m => m.isNew);
  if (activeTab === 'trending') filtered = filtered.filter(m => m.isTrending);

  switch (sort) {
    case 'rating': filtered.sort((a, b) => b.score - a.score); break;
    case 'newest': filtered.sort((a, b) => b.year - a.year); break;
    case 'oldest': filtered.sort((a, b) => a.year - b.year); break;
    case 'az': filtered.sort((a, b) => a.title.localeCompare(b.title)); break;
  }

  return (
    <div className="min-h-screen bg-surface-950 pt-20 pb-24">
      <div className="container-cinema">
        {/* Header */}
        <div className="mb-6 animate-fadeDown">
          <h1 className="text-display-md text-white mb-1">Browse</h1>
          <p className="text-body-md text-white/50">{filtered.length} titles available</p>
        </div>

        {/* Category Banner Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {CATEGORIES.slice(0, 4).map(cat => (
            <button
              key={cat.id}
              onClick={() => setGenre(cat.name)}
              className={`relative h-24 rounded-2xl overflow-hidden text-left transition-all duration-200 active:scale-95 group ${genre === cat.name ? 'ring-2 ring-primary-500' : ''}`}
            >
              <img src={cat.poster} alt={cat.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/50" />
              <div className="absolute inset-0 p-3 flex flex-col justify-end">
                <p className="text-white font-bold text-sm">{cat.name}</p>
                <p className="text-white/50 text-xs">{cat.count} titles</p>
              </div>
            </button>
          ))}
        </div>

        {/* Tabs & Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} variant="pills" />
          <div className="flex items-center gap-2">
            <Dropdown value={genre} onChange={setGenre} options={genreOptions} size="sm" className="w-40" />
            <Dropdown value={sort} onChange={setSort} options={sortOptions} size="sm" className="w-36" />
            <button
              onClick={() => setView(v => v === 'grid' ? 'list' : 'grid')}
              className="w-9 h-9 rounded-xl bg-white/8 hover:bg-white/15 flex items-center justify-center text-white/60 hover:text-white transition-all"
            >
              {view === 'grid' ? <List size={16} /> : <Grid size={16} />}
            </button>
          </div>
        </div>

        {/* Grid/List */}
        {view === 'grid' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 animate-fadeIn">
            {filtered.map(movie => (
              <MovieCard key={movie.id} movie={movie} onSelect={onSelectMovie} />
            ))}
          </div>
        ) : (
          <div className="space-y-3 animate-fadeIn">
            {filtered.map(movie => (
              <button
                key={movie.id}
                onClick={() => onSelectMovie(movie)}
                className="w-full flex items-center gap-4 p-3 rounded-2xl bg-white/4 hover:bg-white/8 transition-all text-left group"
              >
                <img src={movie.poster} alt={movie.title} className="w-14 h-20 object-cover rounded-xl flex-shrink-0 transition-transform duration-300 group-hover:scale-105" />
                <div className="flex-1 min-w-0">
                  <p className="text-label-lg text-white">{movie.title}</p>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <div className="flex items-center gap-1">
                      <Star size={11} className="text-accent-gold fill-accent-gold" />
                      <span className="text-caption text-white/70 font-semibold">{movie.score}</span>
                    </div>
                    <span className="text-white/20">•</span>
                    <span className="text-caption text-white/50">{movie.year}</span>
                    <span className="text-white/20">•</span>
                    <span className="text-caption text-white/50">{movie.duration}</span>
                  </div>
                  <div className="flex gap-1.5 mt-2 flex-wrap">
                    {movie.genres.slice(0, 2).map(g => (
                      <span key={g} className="text-xs px-2 py-0.5 rounded-full bg-white/8 text-white/60">{g}</span>
                    ))}
                  </div>
                  <p className="text-caption text-white/40 mt-1.5 line-clamp-1">{movie.description}</p>
                </div>
                <div className="text-white/20 group-hover:text-white/60 transition-colors flex-shrink-0">
                  <ChevronDown size={18} className="-rotate-90" />
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-24">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
              <Film size={32} className="text-white/20" />
            </div>
            <h3 className="text-heading-lg text-white mb-2">No movies found</h3>
            <p className="text-body-md text-white/40">Try adjusting your filters</p>
            <button onClick={() => { setGenre('all'); setActiveTab('all'); }}
              className="mt-4 bg-primary-500 text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-primary-600 transition-colors">
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Bookmark, Trash2, Filter, Play } from 'lucide-react';
import { MOVIES } from '../data/movies';
import type { Movie } from '../data/movies';
import { WatchlistCard } from '../components/cards/MovieCard';

interface WatchlistPageProps {
  onSelectMovie: (movie: Movie) => void;
  addToast: (msg: string, type?: 'success' | 'info' | 'error' | 'warning') => void;
}

export const WatchlistPage: React.FC<WatchlistPageProps> = ({ onSelectMovie, addToast }) => {
  const [watchlist, setWatchlist] = useState<Movie[]>(MOVIES.filter(m => m.isWatchlisted));
  const [sortBy, setSortBy] = useState('added');

  const removeFromWatchlist = (id: string) => {
    setWatchlist(prev => prev.filter(m => m.id !== id));
    addToast('Removed from watchlist', 'info');
  };

  const clearAll = () => {
    setWatchlist([]);
    addToast('Watchlist cleared', 'info');
  };

  return (
    <div className="min-h-screen bg-surface-950 pt-20 pb-24">
      <div className="container-cinema">
        {/* Header */}
        <div className="flex items-start justify-between mb-8 animate-fadeDown">
          <div>
            <h1 className="text-display-md text-white mb-1">My Watchlist</h1>
            <p className="text-body-md text-white/50">{watchlist.length} title{watchlist.length !== 1 ? 's' : ''} saved</p>
          </div>
          {watchlist.length > 0 && (
            <div className="flex gap-2 mt-1">
              <button
                onClick={() => setSortBy(s => s === 'added' ? 'az' : 'added')}
                className="flex items-center gap-1.5 text-sm text-white/60 hover:text-white bg-white/8 hover:bg-white/15 px-3 py-2 rounded-xl transition-all"
              >
                <Filter size={14} />
                Sort
              </button>
              <button
                onClick={clearAll}
                className="flex items-center gap-1.5 text-sm text-error-500 hover:text-white hover:bg-error-500 bg-error-500/10 px-3 py-2 rounded-xl transition-all"
              >
                <Trash2 size={14} />
                Clear
              </button>
            </div>
          )}
        </div>

        {watchlist.length > 0 ? (
          <div className="space-y-3 animate-fadeUp">
            {watchlist.map(movie => (
              <WatchlistCard
                key={movie.id}
                movie={movie}
                onSelect={onSelectMovie}
                onRemove={removeFromWatchlist}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 animate-fadeUp">
            <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
              <Bookmark size={36} className="text-white/20" />
            </div>
            <h3 className="text-display-sm text-white mb-3">Your watchlist is empty</h3>
            <p className="text-body-md text-white/40 max-w-xs mx-auto">
              Save movies and shows you want to watch by tapping the + icon
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

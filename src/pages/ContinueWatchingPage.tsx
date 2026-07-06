import React, { useState } from 'react';
import { Play, MoreHorizontal } from 'lucide-react';
import { MOVIES } from '../data/movies';
import type { Movie } from '../data/movies';
import { ContinueWatchingCard } from '../components/cards/MovieCard';

interface ContinueWatchingPageProps {
  onSelectMovie: (movie: Movie) => void;
  onPlay: (movie: Movie) => void;
}

export const ContinueWatchingPage: React.FC<ContinueWatchingPageProps> = ({ onSelectMovie, onPlay }) => {
  const [items, setItems] = useState(MOVIES.filter(m => (m.watchProgress || 0) > 0));

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(m => m.id !== id));
  };

  return (
    <div className="min-h-screen bg-surface-950 pt-20 pb-24">
      <div className="container-cinema">
        <div className="mb-8 animate-fadeDown">
          <h1 className="text-display-md text-white mb-1">Continue Watching</h1>
          <p className="text-body-md text-white/50">{items.length} title{items.length !== 1 ? 's' : ''} in progress</p>
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 animate-fadeUp">
            {items.map(movie => (
              <ContinueWatchingCard
                key={movie.id}
                movie={movie}
                onSelect={onPlay}
                onRemove={removeItem}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-32">
            <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
              <Play size={36} className="text-white/20" />
            </div>
            <h3 className="text-display-sm text-white mb-3">Nothing in progress</h3>
            <p className="text-body-md text-white/40 max-w-xs mx-auto">
              Start watching a movie and it'll appear here
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

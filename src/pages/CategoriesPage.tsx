import React, { useState } from 'react';
import { CATEGORIES } from '../data/movies';
import type { Movie } from '../data/movies';
import { MOVIES } from '../data/movies';
import { MovieCard } from '../components/cards/MovieCard';
import { ChevronRight, Grid } from 'lucide-react';

interface CategoriesPageProps {
  onSelectMovie: (movie: Movie) => void;
}

export const CategoriesPage: React.FC<CategoriesPageProps> = ({ onSelectMovie }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const catMovies = selectedCategory
    ? MOVIES.filter(m => m.genres.includes(selectedCategory))
    : [];

  if (selectedCategory) {
    return (
      <div className="min-h-screen bg-surface-950 pt-20 pb-24">
        <div className="container-cinema">
          <button
            onClick={() => setSelectedCategory(null)}
            className="flex items-center gap-2 text-sm text-white/60 hover:text-white mb-6 transition-colors"
          >
            ← Back to Categories
          </button>
          <div className="flex items-center gap-3 mb-6">
            <h1 className="text-display-md text-white">{selectedCategory}</h1>
            <span className="text-sm text-white/40">{catMovies.length} titles</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 animate-fadeUp">
            {catMovies.map(movie => (
              <MovieCard key={movie.id} movie={movie} onSelect={onSelectMovie} />
            ))}
          </div>
          {catMovies.length === 0 && (
            <div className="text-center py-24">
              <p className="text-white/40">No movies found in this category</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-950 pt-20 pb-24">
      <div className="container-cinema">
        <div className="mb-8 animate-fadeDown">
          <h1 className="text-display-md text-white mb-1">Categories</h1>
          <p className="text-body-md text-white/50">Browse by genre</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-fadeUp">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.name)}
              className="relative h-36 rounded-3xl overflow-hidden text-left transition-all duration-250 active:scale-95 group shadow-card hover:shadow-card-hover"
            >
              <img
                src={cat.poster}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/30" style={{ background: `linear-gradient(135deg, ${cat.color}40 0%, rgba(0,0,0,0.7) 60%)` }} />
              <div className="absolute inset-0 p-5 flex flex-col justify-between">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${cat.color}30`, border: `1px solid ${cat.color}40` }}
                >
                  <Grid size={18} style={{ color: cat.color }} />
                </div>
                <div>
                  <p className="text-white font-bold text-lg">{cat.name}</p>
                  <p className="text-white/50 text-sm">{cat.count} titles</p>
                </div>
              </div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight size={20} className="text-white" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

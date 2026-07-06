import React, { useState, useEffect } from 'react';
import { Search, TrendingUp, Clock, X, Mic, Sparkles } from 'lucide-react';
import { MOVIES } from '../data/movies';
import type { Movie } from '../data/movies';
import { MovieCard } from '../components/cards/MovieCard';

const TRENDING_SEARCHES = [
  'Inception', 'Dune', 'Christopher Nolan', 'Sci-Fi 2024', 'Best Thrillers', 'A24 Films'
];
const RECENT_SEARCHES = ['Oppenheimer', 'Interstellar', 'Avatar'];

interface SearchPageProps {
  onSelectMovie: (movie: Movie) => void;
}

export const SearchPage: React.FC<SearchPageProps> = ({ onSelectMovie }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Movie[]>([]);
  const [focused, setFocused] = useState(false);
  const [searching, setSearching] = useState(false);
  const [recent, setRecent] = useState(RECENT_SEARCHES);

  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    setSearching(true);
    const t = setTimeout(() => {
      const q = query.toLowerCase();
      setResults(MOVIES.filter(m =>
        m.title.toLowerCase().includes(q) ||
        m.genres.some(g => g.toLowerCase().includes(q)) ||
        m.director.toLowerCase().includes(q) ||
        m.cast.some(c => c.name.toLowerCase().includes(q))
      ));
      setSearching(false);
    }, 300);
    return () => clearTimeout(t);
  }, [query]);

  const handleSearch = (q: string) => {
    setQuery(q);
    if (q && !recent.includes(q)) {
      setRecent(prev => [q, ...prev].slice(0, 5));
    }
  };

  const removeRecent = (term: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRecent(prev => prev.filter(r => r !== term));
  };

  return (
    <div className="min-h-screen bg-surface-950 pt-20 pb-24">
      <div className="container-cinema">
        {/* Search Header */}
        <div className="mb-8 animate-fadeDown">
          <h1 className="text-display-md text-white mb-2">Search</h1>
          <p className="text-body-md text-white/50">Discover movies, shows, and more</p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <div className={`flex items-center gap-3 px-4 py-4 rounded-2xl border transition-all duration-200 ${focused ? 'border-primary-500 bg-white/8 shadow-[0_0_0_3px_rgba(229,9,20,0.15)]' : 'border-white/10 bg-white/5'}`}>
            <Search size={20} className={`flex-shrink-0 transition-colors ${focused ? 'text-primary-400' : 'text-white/40'}`} />
            <input
              type="text"
              value={query}
              onChange={e => handleSearch(e.target.value)}
              placeholder="Search movies, genres, cast..."
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              autoFocus
              className="flex-1 bg-transparent text-white placeholder:text-white/30 text-base outline-none"
            />
            {searching && <div className="spinner spinner-sm flex-shrink-0" />}
            {query && !searching && (
              <button
                onClick={() => setQuery('')}
                className="text-white/40 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            )}
            <button className="text-white/40 hover:text-white transition-colors">
              <Mic size={18} />
            </button>
          </div>
        </div>

        {/* No query state */}
        {!query && (
          <div className="animate-fadeUp space-y-8">
            {/* Recent */}
            {recent.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-heading-md text-white flex items-center gap-2">
                    <Clock size={16} className="text-white/50" /> Recent Searches
                  </h3>
                  <button onClick={() => setRecent([])} className="text-sm text-primary-400 hover:text-primary-300 transition-colors">Clear all</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recent.map(term => (
                    <button
                      key={term}
                      onClick={() => handleSearch(term)}
                      className="flex items-center gap-2 bg-white/8 hover:bg-white/15 text-white/80 hover:text-white text-sm px-4 py-2 rounded-full transition-all duration-200 group"
                    >
                      <Clock size={13} className="text-white/30" />
                      {term}
                      <span
                        onClick={e => removeRecent(term, e)}
                        className="text-white/30 hover:text-white/70 transition-colors ml-1"
                      >
                        <X size={12} />
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Trending */}
            <div>
              <h3 className="text-heading-md text-white flex items-center gap-2 mb-4">
                <TrendingUp size={16} className="text-primary-400" /> Trending Searches
              </h3>
              <div className="flex flex-wrap gap-2">
                {TRENDING_SEARCHES.map((term, i) => (
                  <button
                    key={term}
                    onClick={() => handleSearch(term)}
                    className="flex items-center gap-2 bg-white/5 hover:bg-white/12 border border-white/10 hover:border-primary-500/40 text-white/70 hover:text-white text-sm px-4 py-2 rounded-full transition-all duration-200"
                  >
                    <span className="text-primary-400 font-bold text-xs">{i + 1}</span>
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Popular */}
            <div>
              <h3 className="text-heading-md text-white flex items-center gap-2 mb-4">
                <Sparkles size={16} className="text-accent-gold" /> Popular Right Now
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {MOVIES.filter(m => m.isTrending).map(movie => (
                  <MovieCard key={movie.id} movie={movie} onSelect={onSelectMovie} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Search Results */}
        {query && !searching && (
          <div className="animate-fadeUp">
            <p className="text-label-sm text-white/50 mb-5">
              {results.length > 0
                ? `${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"`
                : `No results for "${query}"`
              }
            </p>
            {results.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {results.map(movie => (
                  <MovieCard key={movie.id} movie={movie} onSelect={onSelectMovie} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24">
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                  <Search size={32} className="text-white/20" />
                </div>
                <h3 className="text-heading-lg text-white mb-2">No results found</h3>
                <p className="text-body-md text-white/40 max-w-xs mx-auto">
                  Try different keywords or check the spelling
                </p>
                <div className="flex flex-wrap gap-2 justify-center mt-6">
                  {TRENDING_SEARCHES.slice(0, 3).map(t => (
                    <button
                      key={t}
                      onClick={() => handleSearch(t)}
                      className="text-sm bg-white/8 hover:bg-white/15 text-white/70 px-4 py-2 rounded-full transition-all"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

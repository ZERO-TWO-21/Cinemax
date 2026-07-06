import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Movie } from '../../data/movies';
import { MovieCard } from '../cards/MovieCard';

interface MovieRowProps {
  title: string;
  movies: Movie[];
  onSelect: (movie: Movie) => void;
  cardVariant?: 'portrait' | 'landscape' | 'featured';
  showProgress?: boolean;
  badge?: React.ReactNode;
}

export const MovieRow: React.FC<MovieRowProps> = ({
  title,
  movies,
  onSelect,
  cardVariant = 'portrait',
  showProgress,
  badge,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({ left: dir === 'right' ? amount : -amount, behavior: 'smooth' });
    setTimeout(updateScrollState, 350);
  };

  const cardWidths = {
    portrait: 'min-w-[140px] sm:min-w-[160px] lg:min-w-[180px]',
    landscape: 'min-w-[220px] sm:min-w-[280px] lg:min-w-[320px]',
    featured: 'min-w-[180px] sm:min-w-[210px] lg:min-w-[240px]',
  };

  return (
    <div className="relative group/row">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 px-0">
        <div className="flex items-center gap-3">
          <h2 className="text-heading-xl text-white font-bold">{title}</h2>
          {badge}
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover/row:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`
              w-8 h-8 rounded-full glass flex items-center justify-center transition-all duration-200
              ${canScrollLeft ? 'text-white hover:bg-white/20 cursor-pointer' : 'text-white/20 cursor-not-allowed'}
            `}
            aria-label="Scroll left"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`
              w-8 h-8 rounded-full glass flex items-center justify-center transition-all duration-200
              ${canScrollRight ? 'text-white hover:bg-white/20 cursor-pointer' : 'text-white/20 cursor-not-allowed'}
            `}
            aria-label="Scroll right"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Scroll Track */}
      <div
        ref={scrollRef}
        onScroll={updateScrollState}
        className="flex gap-3 overflow-x-auto no-scrollbar pb-2 -mx-1 px-1"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {movies.map(movie => (
          <div
            key={movie.id}
            className={`${cardWidths[cardVariant]} flex-shrink-0`}
            style={{ scrollSnapAlign: 'start' }}
          >
            <MovieCard
              movie={movie}
              onSelect={onSelect}
              variant={cardVariant}
              showProgress={showProgress}
            />
          </div>
        ))}
      </div>

      {/* Fade edges */}
      {canScrollLeft && (
        <div className="absolute left-0 top-8 bottom-2 w-12 bg-gradient-to-r from-surface-950/80 to-transparent pointer-events-none" />
      )}
      {canScrollRight && (
        <div className="absolute right-0 top-8 bottom-2 w-12 bg-gradient-to-l from-surface-950/80 to-transparent pointer-events-none" />
      )}
    </div>
  );
};

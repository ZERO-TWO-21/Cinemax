import React, { useState } from 'react';
import { Star, Play, Plus, Check, Heart, ChevronRight, Clock, Download } from 'lucide-react';
import type { Movie } from '../../data/movies';

interface MovieCardProps {
  movie: Movie;
  onSelect: (movie: Movie) => void;
  onWatchlist?: (id: string) => void;
  variant?: 'portrait' | 'landscape' | 'featured';
  showProgress?: boolean;
  className?: string;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onSelect,
  onWatchlist,
  variant = 'portrait',
  showProgress,
  className = '',
}) => {
  const [hovered, setHovered] = useState(false);
  const [liked, setLiked] = useState(movie.isLiked || false);
  const [watchlisted, setWatchlisted] = useState(movie.isWatchlisted || false);
  const [likeAnimate, setLikeAnimate] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(v => !v);
    setLikeAnimate(true);
    setTimeout(() => setLikeAnimate(false), 300);
  };

  const handleWatchlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    setWatchlisted(v => !v);
    onWatchlist?.(movie.id);
  };

  if (variant === 'landscape') {
    return (
      <div
        className={`group cursor-pointer ${className}`}
        onClick={() => onSelect(movie)}
      >
        <div className="relative aspect-banner rounded-2xl overflow-hidden bg-surface-800 card-hover">
          <img
            src={movie.backdrop}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 gradient-card-bottom opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <div className="flex items-center gap-2">
              <button
                onClick={e => { e.stopPropagation(); onSelect(movie); }}
                className="flex items-center gap-1.5 bg-white text-black text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-white/90 transition-colors"
              >
                <Play size={10} fill="currentColor" /> Play
              </button>
              <button
                onClick={handleWatchlist}
                className="w-7 h-7 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
              >
                {watchlisted ? <Check size={12} /> : <Plus size={12} />}
              </button>
            </div>
          </div>
          {movie.isNew && (
            <div className="absolute top-2 left-2">
              <span className="text-xs font-bold bg-primary-500 text-white px-2 py-0.5 rounded-full">NEW</span>
            </div>
          )}
        </div>
        {showProgress && movie.watchProgress && (
          <div className="mt-1.5 px-0.5">
            <div className="h-1 bg-white/15 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary-500 rounded-full"
                style={{ width: `${movie.watchProgress}%` }}
              />
            </div>
          </div>
        )}
        <div className="mt-2 px-0.5">
          <p className="text-label-sm text-white line-clamp-1">{movie.title}</p>
          <p className="text-caption text-white/50 mt-0.5">{movie.year}</p>
        </div>
      </div>
    );
  }

  if (variant === 'featured') {
    return (
      <div
        className={`group cursor-pointer ${className}`}
        onClick={() => onSelect(movie)}
      >
        <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-surface-800 card-hover shadow-card">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 gradient-card-bottom" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          {/* Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
            <div className="flex flex-col gap-1">
              {movie.isTrending && (
                <span className="text-xs font-bold bg-primary-500 text-white px-2.5 py-1 rounded-full w-fit">TRENDING</span>
              )}
              {movie.isNew && (
                <span className="text-xs font-bold bg-accent-gold text-black px-2.5 py-1 rounded-full w-fit">NEW</span>
              )}
            </div>
            <button
              onClick={handleLike}
              className={`w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center transition-all ${likeAnimate ? 'animate-heartbeat' : ''}`}
            >
              <Heart
                size={14}
                className={`transition-colors ${liked ? 'text-primary-400 fill-primary-400' : 'text-white'}`}
              />
            </button>
          </div>

          {/* Bottom info */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Star size={11} className="text-accent-gold fill-accent-gold" />
              <span className="text-xs text-white font-semibold">{movie.score}</span>
              <span className="text-white/30 text-xs">•</span>
              <span className="text-xs text-white/60">{movie.year}</span>
            </div>
            <p className="text-label-md text-white leading-tight line-clamp-1">{movie.title}</p>
            <p className="text-caption text-white/50 mt-1 line-clamp-1">{movie.genres.join(', ')}</p>
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
              <Play size={20} className="text-black fill-black ml-1" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default portrait
  return (
    <div
      className={`group cursor-pointer ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onSelect(movie)}
    >
      <div className="relative aspect-movie rounded-2xl overflow-hidden bg-surface-800 card-hover shadow-card">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 gradient-card-bottom opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Hover actions */}
        <div className={`absolute inset-0 flex flex-col justify-between p-3 transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex justify-end gap-1.5">
            <button
              onClick={handleLike}
              className={`w-7 h-7 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center transition-all ${likeAnimate ? 'animate-heartbeat' : ''}`}
            >
              <Heart
                size={13}
                className={`transition-colors ${liked ? 'text-primary-400 fill-primary-400' : 'text-white'}`}
              />
            </button>
            <button
              onClick={handleWatchlist}
              className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center"
            >
              {watchlisted
                ? <Check size={13} className="text-primary-400" />
                : <Plus size={13} className="text-white" />
              }
            </button>
          </div>
          <div>
            <button
              onClick={e => { e.stopPropagation(); onSelect(movie); }}
              className="flex items-center gap-1.5 bg-white text-black text-xs font-bold px-3 py-1.5 rounded-full hover:bg-white/90 transition-colors"
            >
              <Play size={10} fill="currentColor" /> Play
            </button>
          </div>
        </div>

        {/* Badges */}
        {(movie.isNew || movie.isTrending) && !hovered && (
          <div className="absolute top-2 left-2">
            {movie.isTrending && (
              <span className="text-xs font-bold bg-primary-500 text-white px-2 py-0.5 rounded-full block mb-1">TRENDING</span>
            )}
            {movie.isNew && (
              <span className="text-xs font-bold bg-accent-gold text-black px-2 py-0.5 rounded-full block">NEW</span>
            )}
          </div>
        )}
      </div>

      {showProgress && movie.watchProgress && (
        <div className="mt-1.5">
          <div className="h-1 bg-white/15 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-500 rounded-full transition-all"
              style={{ width: `${movie.watchProgress}%` }}
            />
          </div>
        </div>
      )}

      <div className="mt-2 px-0.5">
        <p className="text-label-sm text-white line-clamp-1">{movie.title}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <div className="flex items-center gap-1">
            <Star size={10} className="text-accent-gold fill-accent-gold" />
            <span className="text-caption text-white/60">{movie.score}</span>
          </div>
          <span className="text-white/20 text-xs">•</span>
          <span className="text-caption text-white/50">{movie.year}</span>
        </div>
      </div>
    </div>
  );
};

// ── Continue Watching Card ──────────────────────

export const ContinueWatchingCard: React.FC<{
  movie: Movie;
  onSelect: (m: Movie) => void;
  onRemove?: (id: string) => void;
}> = ({ movie, onSelect, onRemove }) => (
  <div
    className="group cursor-pointer"
    onClick={() => onSelect(movie)}
  >
    <div className="relative aspect-banner rounded-2xl overflow-hidden bg-surface-800 card-hover">
      <img
        src={movie.backdrop}
        alt={movie.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 gradient-card-bottom" />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
          <Play size={20} className="text-black fill-black ml-1" />
        </div>
      </div>
      {onRemove && (
        <button
          onClick={e => { e.stopPropagation(); onRemove(movie.id); }}
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center text-white/60 hover:text-white opacity-0 group-hover:opacity-100 transition-all"
        >
          ×
        </button>
      )}
    </div>
    <div className="mt-1.5">
      <div className="h-1 bg-white/15 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary-500 rounded-full"
          style={{ width: `${movie.watchProgress || 0}%` }}
        />
      </div>
    </div>
    <div className="mt-2 px-0.5">
      <p className="text-label-sm text-white line-clamp-1">{movie.title}</p>
      <p className="text-caption text-white/50">{movie.watchProgress}% watched</p>
    </div>
  </div>
);

// ── Watchlist Card ─────────────────────────────

export const WatchlistCard: React.FC<{
  movie: Movie;
  onSelect: (m: Movie) => void;
  onRemove: (id: string) => void;
}> = ({ movie, onSelect, onRemove }) => (
  <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/4 hover:bg-white/8 transition-colors cursor-pointer group"
    onClick={() => onSelect(movie)}>
    <img
      src={movie.poster}
      alt={movie.title}
      className="w-16 h-24 object-cover rounded-xl flex-shrink-0"
    />
    <div className="flex-1 min-w-0">
      <p className="text-label-md text-white">{movie.title}</p>
      <div className="flex items-center gap-2 mt-1">
        <Star size={11} className="text-accent-gold fill-accent-gold" />
        <span className="text-caption text-white/60">{movie.score}</span>
        <span className="text-white/20">•</span>
        <span className="text-caption text-white/50">{movie.year}</span>
        <span className="text-white/20">•</span>
        <span className="text-caption text-white/50">{movie.duration}</span>
      </div>
      <div className="flex flex-wrap gap-1 mt-2">
        {movie.genres.slice(0, 2).map(g => (
          <span key={g} className="text-xs px-2 py-0.5 rounded-full bg-white/8 text-white/60">{g}</span>
        ))}
      </div>
    </div>
    <div className="flex flex-col items-center gap-2 flex-shrink-0">
      <button
        onClick={e => { e.stopPropagation(); onSelect(movie); }}
        className="w-9 h-9 rounded-full bg-primary-500 flex items-center justify-center hover:bg-primary-600 transition-colors"
      >
        <Play size={14} className="fill-white text-white ml-0.5" />
      </button>
      <button
        onClick={e => { e.stopPropagation(); onRemove(movie.id); }}
        className="w-9 h-9 rounded-full bg-white/8 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/15 transition-all"
      >
        <Check size={14} />
      </button>
    </div>
  </div>
);

// ── Review Card ────────────────────────────────

export const ReviewCard: React.FC<{ review: import('../../data/movies').Review }> = ({ review }) => {
  const [liked, setLiked] = useState(false);
  return (
    <div className="p-5 rounded-2xl bg-white/4 border border-white/8">
      <div className="flex items-start gap-3">
        <img
          src={review.avatar}
          alt={review.user}
          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-label-md text-white">{review.user}</p>
              <p className="text-caption text-white/40">{review.date}</p>
            </div>
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={i < review.rating ? 'text-accent-gold fill-accent-gold' : 'text-white/20'}
                />
              ))}
            </div>
          </div>
          <p className="text-body-sm text-white/70 mt-2 leading-relaxed">{review.comment}</p>
          <div className="flex items-center gap-3 mt-3">
            <button
              onClick={() => setLiked(v => !v)}
              className={`flex items-center gap-1.5 text-xs transition-colors ${liked ? 'text-primary-400' : 'text-white/40 hover:text-white/70'}`}
            >
              <Heart size={13} className={liked ? 'fill-current' : ''} />
              {review.likes + (liked ? 1 : 0)} Helpful
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Download Card ───────────────────────────────

export const DownloadCard: React.FC<{
  movie: Movie;
  onSelect: (m: Movie) => void;
  onDelete: (id: string) => void;
}> = ({ movie, onSelect, onDelete }) => (
  <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/4 hover:bg-white/8 transition-colors cursor-pointer group"
    onClick={() => onSelect(movie)}>
    <img
      src={movie.poster}
      alt={movie.title}
      className="w-14 h-20 object-cover rounded-xl flex-shrink-0"
    />
    <div className="flex-1 min-w-0">
      <p className="text-label-md text-white">{movie.title}</p>
      <div className="flex items-center gap-2 mt-1">
        <Download size={11} className="text-accent-blue" />
        <span className="text-caption text-white/50">1.2 GB • 1080p HD</span>
      </div>
      <div className="flex items-center gap-1.5 mt-2">
        <Clock size={11} className="text-white/40" />
        <span className="text-caption text-white/40">Expires in 30 days</span>
      </div>
    </div>
    <button
      onClick={e => { e.stopPropagation(); onDelete(movie.id); }}
      className="w-9 h-9 rounded-full bg-white/8 flex items-center justify-center text-white/40 hover:text-error-500 hover:bg-error-500/10 transition-all opacity-0 group-hover:opacity-100"
      aria-label="Delete download"
    >
      ×
    </button>
  </div>
);

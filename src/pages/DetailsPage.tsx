import React, { useState } from 'react';
import { Play, Plus, Check, Heart, Star, Share2, Download, ChevronLeft, Clock, Globe, Award, Users, ChevronDown, ChevronUp } from 'lucide-react';
import type { Movie } from '../data/movies';
import { ReviewCard } from '../components/cards/MovieCard';
import { Tabs } from '../components/ui/Dropdown';
import { MOVIES } from '../data/movies';
import { MovieRow } from '../components/layout/MovieRow';

interface DetailsPageProps {
  movie: Movie;
  onPlay: (movie: Movie) => void;
  onBack: () => void;
  onSelectMovie: (movie: Movie) => void;
  addToast: (msg: string, type?: 'success' | 'info' | 'error' | 'warning') => void;
}

export const DetailsPage: React.FC<DetailsPageProps> = ({
  movie,
  onPlay,
  onBack,
  onSelectMovie,
  addToast,
}) => {
  const [watchlisted, setWatchlisted] = useState(movie.isWatchlisted || false);
  const [liked, setLiked] = useState(movie.isLiked || false);
  const [likeAnim, setLikeAnim] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showFullDesc, setShowFullDesc] = useState(false);

  const handleWatchlist = () => {
    setWatchlisted(v => !v);
    addToast(watchlisted ? 'Removed from watchlist' : `${movie.title} added to watchlist`, watchlisted ? 'info' : 'success');
  };

  const handleLike = () => {
    setLiked(v => !v);
    setLikeAnim(true);
    setTimeout(() => setLikeAnim(false), 300);
  };

  const handleShare = () => {
    addToast('Link copied to clipboard!', 'success');
  };

  const similar = MOVIES.filter(m => m.id !== movie.id && m.genres.some(g => movie.genres.includes(g))).slice(0, 8);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'cast', label: 'Cast & Crew' },
    { id: 'reviews', label: 'Reviews', count: movie.reviews?.length || 0 },
    { id: 'similar', label: 'Similar' },
  ];

  return (
    <div className="min-h-screen bg-surface-950 pb-24">
      {/* Hero Backdrop */}
      <div className="relative h-[55vh] sm:h-[65vh] overflow-hidden">
        <img
          src={movie.backdrop}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 gradient-hero-mobile md:hidden" />
        <div className="absolute bottom-0 left-0 right-0 h-48 gradient-surface" />

        {/* Back button */}
        <button
          onClick={onBack}
          className="absolute top-20 left-4 md:left-12 w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:bg-white/20 transition-all animate-fadeDown"
        >
          <ChevronLeft size={20} />
        </button>
      </div>

      <div className="container-cinema -mt-32 relative z-10 animate-fadeUp">
        {/* Title section */}
        <div className="flex flex-col md:flex-row md:items-end gap-6 mb-8">
          {/* Poster */}
          <div className="flex-shrink-0 w-36 sm:w-44 rounded-2xl overflow-hidden shadow-elevation-4 border border-white/10">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full aspect-movie object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            {/* Badges */}
            <div className="flex gap-2 mb-3 flex-wrap">
              {movie.isTrending && (
                <span className="text-xs font-bold bg-primary-500 text-white px-2.5 py-1 rounded-full">TRENDING</span>
              )}
              {movie.isNew && (
                <span className="text-xs font-bold bg-accent-gold text-black px-2.5 py-1 rounded-full">NEW</span>
              )}
            </div>

            <h1 className="text-display-lg text-white mb-2 leading-tight">{movie.title}</h1>

            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <div className="flex items-center gap-1.5">
                <Star size={14} className="text-accent-gold fill-accent-gold" />
                <span className="text-sm font-bold text-white">{movie.score}</span>
                <span className="text-xs text-white/40">/10</span>
              </div>
              <span className="text-white/30">•</span>
              <span className="text-sm text-white/70">{movie.year}</span>
              <span className="text-white/30">•</span>
              <span className="text-sm text-white/70">{movie.duration}</span>
              <span className="text-white/30">•</span>
              <span className="text-xs border border-white/30 text-white/60 px-2 py-0.5 rounded">{movie.rating}</span>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-5">
              {movie.genres.map(g => (
                <span key={g} className="text-xs text-white/60 bg-white/10 px-2.5 py-1 rounded-full">{g}</span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <button
                onClick={() => onPlay(movie)}
                className="flex items-center gap-2 bg-white text-black text-sm font-bold px-6 py-3 rounded-full hover:bg-white/90 active:scale-95 transition-all shadow-elevation-2"
              >
                <Play size={16} fill="currentColor" />
                Play
              </button>
              <button
                onClick={handleWatchlist}
                className={`flex items-center gap-2 text-sm font-semibold px-5 py-3 rounded-full border transition-all active:scale-95 ${
                  watchlisted
                    ? 'bg-primary-500/15 border-primary-500 text-primary-400'
                    : 'glass border-white/20 text-white hover:bg-white/15'
                }`}
              >
                {watchlisted ? <Check size={16} /> : <Plus size={16} />}
                {watchlisted ? 'Saved' : 'My List'}
              </button>
              <button
                onClick={handleLike}
                className={`w-11 h-11 rounded-full glass border border-white/20 flex items-center justify-center transition-all active:scale-95 ${likeAnim ? 'animate-heartbeat' : ''}`}
              >
                <Heart size={17} className={liked ? 'fill-primary-400 text-primary-400' : 'text-white'} />
              </button>
              <button
                onClick={handleShare}
                className="w-11 h-11 rounded-full glass border border-white/20 flex items-center justify-center text-white hover:bg-white/15 transition-all"
              >
                <Share2 size={17} />
              </button>
              <button
                onClick={() => addToast('Download started', 'info')}
                className="w-11 h-11 rounded-full glass border border-white/20 flex items-center justify-center text-white hover:bg-white/15 transition-all"
              >
                <Download size={17} />
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} className="mb-6 overflow-x-auto no-scrollbar" />

        {/* Tab Content */}
        <div className="animate-fadeIn" key={activeTab}>
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {/* Description */}
                <div>
                  <h3 className="text-heading-lg text-white mb-3">Synopsis</h3>
                  <p className={`text-body-md text-white/70 leading-relaxed ${!showFullDesc ? 'line-clamp-3' : ''}`}>
                    {movie.description}
                  </p>
                  <button
                    onClick={() => setShowFullDesc(v => !v)}
                    className="flex items-center gap-1 text-sm text-primary-400 mt-2 hover:text-primary-300 transition-colors"
                  >
                    {showFullDesc ? <><ChevronUp size={14} /> Show less</> : <><ChevronDown size={14} /> Read more</>}
                  </button>
                </div>

                {/* Watch Progress */}
                {movie.watchProgress && (
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/8">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-label-sm text-white/70">Your progress</p>
                      <p className="text-label-sm text-white">{movie.watchProgress}%</p>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary-500 rounded-full transition-all"
                        style={{ width: `${movie.watchProgress}%` }}
                      />
                    </div>
                    <p className="text-caption text-white/40 mt-1">
                      Resume from {Math.floor((movie.watchProgress / 100) * 148)}m
                    </p>
                  </div>
                )}
              </div>

              {/* Info panel */}
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-white/4 border border-white/8 space-y-4">
                  {[
                    { icon: <Award size={16} />, label: 'Director', value: movie.director },
                    { icon: <Users size={16} />, label: 'Studio', value: movie.studio },
                    { icon: <Globe size={16} />, label: 'Language', value: movie.language },
                    { icon: <Clock size={16} />, label: 'Duration', value: movie.duration },
                  ].map(item => (
                    <div key={item.label} className="flex items-start gap-3">
                      <span className="text-white/30 mt-0.5">{item.icon}</span>
                      <div>
                        <p className="text-caption text-white/40 uppercase tracking-wide">{item.label}</p>
                        <p className="text-label-sm text-white mt-0.5">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'cast' && (
            <div>
              <h3 className="text-heading-lg text-white mb-5">Cast & Crew</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {movie.cast.map(member => (
                  <div key={member.id} className="text-center group cursor-pointer">
                    <div className="relative mx-auto w-20 h-20 rounded-full overflow-hidden bg-surface-800 mb-3 ring-2 ring-transparent group-hover:ring-primary-500 transition-all duration-200">
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <p className="text-label-sm text-white line-clamp-1">{member.name}</p>
                    <p className="text-caption text-white/50 line-clamp-1 mt-0.5">{member.character}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-heading-lg text-white">User Reviews</h3>
                <div className="flex items-center gap-2">
                  <Star size={16} className="text-accent-gold fill-accent-gold" />
                  <span className="text-white font-bold">{movie.score}</span>
                  <span className="text-white/40 text-sm">({movie.reviews?.length || 0} reviews)</span>
                </div>
              </div>
              <div className="space-y-4">
                {(movie.reviews || []).map(review => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'similar' && (
            <div>
              <h3 className="text-heading-lg text-white mb-5">More Like This</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {similar.map(m => (
                  <div key={m.id} className="cursor-pointer group" onClick={() => onSelectMovie(m)}>
                    <div className="relative aspect-movie rounded-2xl overflow-hidden bg-surface-800 card-hover">
                      <img src={m.poster} alt={m.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 gradient-card-bottom opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="w-full flex items-center justify-center gap-1.5 bg-white text-black text-xs font-bold py-1.5 rounded-full">
                          <Play size={10} fill="currentColor" /> Play
                        </button>
                      </div>
                    </div>
                    <p className="mt-2 text-label-sm text-white line-clamp-1">{m.title}</p>
                    <p className="text-caption text-white/50">{m.year}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

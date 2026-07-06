import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Play, Pause, SkipBack, SkipForward, Volume2, VolumeX,
  Maximize, Minimize, Settings, Subtitles, ChevronLeft,
  RotateCcw, RotateCw, Airplay, Cast, PictureInPicture
} from 'lucide-react';
import type { Movie } from '../data/movies';

interface VideoPlayerProps {
  movie: Movie;
  onBack: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ movie, onBack }) => {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(movie.watchProgress ? movie.watchProgress / 100 * 100 : 0);
  const [buffered, setBuffered] = useState(65);
  const [volume, setVolume] = useState(80);
  const [muted, setMuted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [quality, setQuality] = useState('1080p');
  const [playbackSpeed, setPlaybackSpeed] = useState('1x');
  const [subtitles, setSubtitles] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [hoverTime, setHoverTime] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const hideControlsTimer = useRef<number>();

  const totalSeconds = 148 * 60; // roughly 2h28m
  const currentSeconds = Math.floor((progress / 100) * totalSeconds);

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    return `${m}:${String(sec).padStart(2, '0')}`;
  };

  const resetHideTimer = useCallback(() => {
    clearTimeout(hideControlsTimer.current);
    setShowControls(true);
    if (playing) {
      hideControlsTimer.current = window.setTimeout(() => setShowControls(false), 3000);
    }
  }, [playing]);

  useEffect(() => {
    resetHideTimer();
    return () => clearTimeout(hideControlsTimer.current);
  }, [playing, resetHideTimer]);

  // Simulate playback
  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { setPlaying(false); return 100; }
        return p + 0.05;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [playing]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      switch(e.key) {
        case ' ': case 'k': e.preventDefault(); setPlaying(v => !v); break;
        case 'ArrowRight': e.preventDefault(); setProgress(p => Math.min(100, p + 1)); break;
        case 'ArrowLeft': e.preventDefault(); setProgress(p => Math.max(0, p - 1)); break;
        case 'm': setMuted(v => !v); break;
        case 'f': setFullscreen(v => !v); break;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = progressRef.current!.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setProgress(pct * 100);
  };

  const handleProgressHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = progressRef.current!.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setHoverTime(Math.floor(pct * totalSeconds));
  };

  const effectiveVolume = muted ? 0 : volume;

  return (
    <div
      ref={containerRef}
      className={`relative bg-black select-none ${fullscreen ? 'fixed inset-0 z-[200]' : 'h-screen'}`}
      onMouseMove={resetHideTimer}
      onClick={resetHideTimer}
    >
      {/* Video placeholder */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <img
          src={movie.backdrop}
          alt={movie.title}
          className={`w-full h-full object-cover transition-transform duration-[8000ms] ${playing ? 'scale-105' : 'scale-100'}`}
        />
        {!playing && (
          <div className="absolute inset-0 bg-black/30" />
        )}
      </div>

      {/* Gradient overlays */}
      <div className={`absolute inset-0 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/90 to-transparent" />
      </div>

      {/* Play/Pause overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <button
          className="pointer-events-auto w-20 h-20 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white transition-all hover:bg-black/60 active:scale-90"
          onClick={() => setPlaying(v => !v)}
          aria-label={playing ? 'Pause' : 'Play'}
          style={{ opacity: showControls ? 1 : 0, transition: 'opacity 0.3s ease' }}
        >
          {playing
            ? <Pause size={32} fill="currentColor" />
            : <Play size={32} fill="currentColor" className="ml-2" />
          }
        </button>
      </div>

      {/* Top bar */}
      <div
        className={`absolute top-0 left-0 right-0 px-4 py-4 flex items-center gap-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:bg-white/20 transition-all"
          aria-label="Back"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-white font-semibold text-sm sm:text-base truncate">{movie.title}</p>
          <p className="text-white/50 text-xs">{movie.year} • {movie.rating}</p>
        </div>
        <button className="w-9 h-9 rounded-full glass flex items-center justify-center text-white/70 hover:text-white transition-all">
          <Cast size={16} />
        </button>
        <button className="w-9 h-9 rounded-full glass flex items-center justify-center text-white/70 hover:text-white transition-all">
          <PictureInPicture size={16} />
        </button>
      </div>

      {/* Bottom Controls */}
      <div
        className={`absolute bottom-0 left-0 right-0 px-4 pb-safe transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        {/* Progress bar */}
        <div className="mb-3 relative">
          {/* Hover time tooltip */}
          {hoverTime !== null && (
            <div
              className="absolute -top-8 glass text-white text-xs px-2 py-1 rounded-lg pointer-events-none"
              style={{ left: `${(hoverTime / totalSeconds) * 100}%`, transform: 'translateX(-50%)' }}
            >
              {formatTime(hoverTime)}
            </div>
          )}
          <div
            ref={progressRef}
            className="player-progress group/progress"
            onClick={handleProgressClick}
            onMouseMove={handleProgressHover}
            onMouseLeave={() => setHoverTime(null)}
            role="slider"
            aria-label="Video progress"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            {/* Buffered */}
            <div
              className="absolute top-0 left-0 h-full bg-white/20 rounded-full pointer-events-none"
              style={{ width: `${buffered}%` }}
            />
            <div className="player-progress-fill" style={{ width: `${progress}%` }}>
              <div className="player-progress-thumb" />
            </div>
          </div>
        </div>

        {/* Controls row */}
        <div className="flex items-center gap-2 pb-4">
          {/* Left controls */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setProgress(p => Math.max(0, p - (10/totalSeconds*100)))}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all"
              aria-label="Rewind 10s"
            >
              <SkipBack size={18} />
            </button>
            <button
              onClick={() => setPlaying(v => !v)}
              className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-white/90 transition-all active:scale-95"
              aria-label={playing ? 'Pause' : 'Play'}
            >
              {playing
                ? <Pause size={18} fill="currentColor" />
                : <Play size={18} fill="currentColor" className="ml-0.5" />
              }
            </button>
            <button
              onClick={() => setProgress(p => Math.min(100, p + (10/totalSeconds*100)))}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all"
              aria-label="Forward 10s"
            >
              <SkipForward size={18} />
            </button>
          </div>

          {/* Volume */}
          <div className="flex items-center gap-2 group/vol">
            <button
              onClick={() => setMuted(v => !v)}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all"
              aria-label={muted ? 'Unmute' : 'Mute'}
            >
              {muted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <div className="w-0 overflow-hidden group-hover/vol:w-20 transition-all duration-200">
              <input
                type="range"
                min={0}
                max={100}
                value={effectiveVolume}
                onChange={e => { setVolume(Number(e.target.value)); if (Number(e.target.value) > 0) setMuted(false); }}
                className="w-20"
                style={{ background: `linear-gradient(to right, white 0%, white ${effectiveVolume}%, rgba(255,255,255,0.2) ${effectiveVolume}%, rgba(255,255,255,0.2) 100%)` }}
                aria-label="Volume"
              />
            </div>
          </div>

          {/* Time */}
          <div className="flex items-center gap-1 text-xs text-white/70 ml-1">
            <span className="text-white font-medium">{formatTime(currentSeconds)}</span>
            <span>/</span>
            <span>{formatTime(totalSeconds)}</span>
          </div>

          <div className="flex-1" />

          {/* Right controls */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setSubtitles(v => !v)}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:bg-white/10 ${subtitles ? 'text-primary-400' : 'text-white/50 hover:text-white'}`}
              aria-label="Subtitles"
            >
              <Subtitles size={17} />
            </button>

            <div className="relative">
              <button
                onClick={() => setShowSettings(v => !v)}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all"
                aria-label="Settings"
              >
                <Settings size={17} className={showSettings ? 'rotate-45' : ''} style={{ transition: 'transform 0.3s ease' }} />
              </button>
              {showSettings && (
                <div className="absolute bottom-full right-0 mb-2 w-56 glass-dark rounded-2xl overflow-hidden shadow-elevation-4 animate-scaleIn">
                  <div className="p-2">
                    <p className="text-caption text-white/40 uppercase tracking-wider px-3 py-1">Quality</p>
                    {['4K Ultra', '1080p', '720p', '480p'].map(q => (
                      <button
                        key={q}
                        onClick={() => { setQuality(q); setShowSettings(false); }}
                        className={`flex items-center justify-between w-full px-3 py-2 rounded-xl text-sm transition-colors ${quality === q ? 'text-primary-400 bg-primary-500/10' : 'text-white/70 hover:text-white hover:bg-white/10'}`}
                      >
                        {q}
                        {quality === q && <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />}
                      </button>
                    ))}
                    <p className="text-caption text-white/40 uppercase tracking-wider px-3 py-1 mt-2">Speed</p>
                    {['0.5x', '0.75x', '1x', '1.25x', '1.5x', '2x'].map(s => (
                      <button
                        key={s}
                        onClick={() => { setPlaybackSpeed(s); setShowSettings(false); }}
                        className={`flex items-center justify-between w-full px-3 py-2 rounded-xl text-sm transition-colors ${playbackSpeed === s ? 'text-primary-400 bg-primary-500/10' : 'text-white/70 hover:text-white hover:bg-white/10'}`}
                      >
                        {s}
                        {playbackSpeed === s && <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setFullscreen(v => !v)}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all"
              aria-label={fullscreen ? 'Exit fullscreen' : 'Fullscreen'}
            >
              {fullscreen ? <Minimize size={17} /> : <Maximize size={17} />}
            </button>
          </div>
        </div>
      </div>

      {/* Skip intro button */}
      {progress > 5 && progress < 20 && (
        <button
          onClick={() => setProgress(22)}
          className="absolute bottom-28 right-4 glass border border-white/30 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-white/20 transition-all animate-fadeIn"
        >
          Skip Intro →
        </button>
      )}

      {/* Next episode button */}
      {progress > 90 && (
        <button
          onClick={() => setProgress(0)}
          className="absolute bottom-28 right-4 bg-white text-black text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-white/90 transition-all animate-fadeIn flex items-center gap-2"
        >
          <SkipForward size={16} />
          Play Next
        </button>
      )}
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { Play } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'logo' | 'text' | 'fade'>('logo');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('text'), 800);
    const t2 = setTimeout(() => setPhase('fade'), 2200);
    const t3 = setTimeout(() => onComplete(), 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 bg-surface-950 flex items-center justify-center z-[200] transition-opacity duration-600 ${phase === 'fade' ? 'opacity-0' : 'opacity-100'}`}
    >
      {/* Background radial */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(229,9,20,0.15)_0%,transparent_70%)]" />

      <div className="relative flex flex-col items-center gap-6">
        {/* Logo mark */}
        <div
          className={`
            relative w-24 h-24 rounded-3xl bg-gradient-to-br from-primary-500 to-primary-700
            flex items-center justify-center shadow-glow-lg
            transition-all duration-700
            ${phase === 'logo' ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}
          `}
          style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
        >
          <span className="text-white font-black text-5xl tracking-tighter">C</span>
          {/* Shimmer effect */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden">
            <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-white/20 rotate-45 transform -translate-x-full animate-[shimmer_2s_ease_1s_1_forwards]" />
          </div>
        </div>

        {/* Brand name */}
        <div
          className={`
            flex flex-col items-center gap-1 transition-all duration-500
            ${phase === 'text' || phase === 'fade' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
        >
          <span className="text-display-md text-white font-black tracking-tighter">Cinemax</span>
          <span className="text-caption text-white/40 tracking-widest uppercase">Streaming</span>
        </div>

        {/* Loading dots */}
        <div
          className={`
            flex gap-1.5 transition-all duration-500 delay-200
            ${phase === 'text' || phase === 'fade' ? 'opacity-100' : 'opacity-0'}
          `}
        >
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-primary-500"
              style={{ animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// ── 404 Page ────────────────────────────────────

interface NotFoundPageProps {
  onNavigate: (page: import('../data/movies').Page) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => (
  <div className="min-h-screen bg-surface-950 flex items-center justify-center">
    <div className="text-center max-w-md px-4 animate-fadeUp">
      <div className="relative mx-auto w-32 h-32 mb-8">
        <div className="absolute inset-0 rounded-full bg-primary-500/10 animate-ping" />
        <div className="relative w-32 h-32 rounded-full bg-primary-500/15 flex items-center justify-center">
          <span className="text-6xl font-black text-primary-400">4</span>
          <Play size={28} className="text-primary-400 fill-primary-400 -ml-1" />
          <span className="text-6xl font-black text-primary-400">4</span>
        </div>
      </div>
      <h1 className="text-display-md text-white mb-3">Page Not Found</h1>
      <p className="text-body-md text-white/50 mb-8">
        Looks like this scene got cut from the final edit. Let's get you back to the show.
      </p>
      <button
        onClick={() => onNavigate('home')}
        className="bg-primary-500 hover:bg-primary-600 text-white font-bold px-8 py-3.5 rounded-full transition-all active:scale-95 shadow-glow"
      >
        Back to Home
      </button>
    </div>
  </div>
);

// ── Offline Page ────────────────────────────────

export const OfflinePage: React.FC<{ onNavigate: (page: import('../data/movies').Page) => void }> = ({ onNavigate }) => (
  <div className="min-h-screen bg-surface-950 flex items-center justify-center">
    <div className="text-center max-w-md px-4 animate-fadeUp">
      <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
        <svg className="w-12 h-12 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636a9 9 0 010 12.728M15.536 8.464a5 5 0 010 7.072M3 3l18 18" />
        </svg>
      </div>
      <h1 className="text-display-md text-white mb-3">You're Offline</h1>
      <p className="text-body-md text-white/50 mb-8 max-w-xs mx-auto">
        Check your internet connection. You can still watch your downloaded content.
      </p>
      <button
        onClick={() => onNavigate('downloads')}
        className="bg-white text-black font-bold px-8 py-3.5 rounded-full transition-all hover:bg-white/90 active:scale-95"
      >
        View Downloads
      </button>
    </div>
  </div>
);

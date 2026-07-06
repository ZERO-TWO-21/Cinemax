import React, { useState } from 'react';
import { Download, Wifi, WifiOff, Trash2, HardDrive, Play } from 'lucide-react';
import { MOVIES } from '../data/movies';
import type { Movie } from '../data/movies';
import { DownloadCard } from '../components/cards/MovieCard';

interface DownloadsPageProps {
  onSelectMovie: (movie: Movie) => void;
  addToast: (msg: string, type?: 'success' | 'info' | 'error' | 'warning') => void;
}

export const DownloadsPage: React.FC<DownloadsPageProps> = ({ onSelectMovie, addToast }) => {
  const [downloads, setDownloads] = useState<Movie[]>(MOVIES.slice(0, 4));
  const [isOnline, setIsOnline] = useState(true);

  const deleteDownload = (id: string) => {
    setDownloads(prev => prev.filter(m => m.id !== id));
    addToast('Download deleted', 'info');
  };

  const storageUsed = downloads.length * 1.2;
  const storageTotal = 10;
  const storagePct = (storageUsed / storageTotal) * 100;

  return (
    <div className="min-h-screen bg-surface-950 pt-20 pb-24">
      <div className="container-cinema">
        {/* Header */}
        <div className="flex items-start justify-between mb-6 animate-fadeDown">
          <div>
            <h1 className="text-display-md text-white mb-1">Downloads</h1>
            <p className="text-body-md text-white/50">{downloads.length} titles available offline</p>
          </div>
          <button
            onClick={() => setIsOnline(v => !v)}
            className={`flex items-center gap-2 text-sm px-3 py-2 rounded-xl transition-all ${isOnline ? 'text-success-500 bg-success-500/10' : 'text-error-500 bg-error-500/10'}`}
          >
            {isOnline ? <Wifi size={16} /> : <WifiOff size={16} />}
            {isOnline ? 'Online' : 'Offline'}
          </button>
        </div>

        {/* Storage info */}
        <div className="p-5 rounded-2xl bg-white/4 border border-white/8 mb-6 animate-fadeUp">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <HardDrive size={16} className="text-white/50" />
              <span className="text-label-md text-white">Storage</span>
            </div>
            <span className="text-label-sm text-white/60">{storageUsed.toFixed(1)} GB / {storageTotal} GB</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${storagePct > 80 ? 'bg-warning-500' : 'bg-primary-500'}`}
              style={{ width: `${storagePct}%` }}
            />
          </div>
          <p className="text-caption text-white/30 mt-2">{(storageTotal - storageUsed).toFixed(1)} GB remaining</p>
        </div>

        {!isOnline && (
          <div className="p-4 rounded-2xl bg-error-500/10 border border-error-500/20 mb-6 flex items-center gap-3 animate-fadeIn">
            <WifiOff size={18} className="text-error-500 flex-shrink-0" />
            <p className="text-sm text-white/80">You're offline. Only downloaded content is available.</p>
          </div>
        )}

        {downloads.length > 0 ? (
          <div className="space-y-3 animate-fadeUp">
            {downloads.map(movie => (
              <DownloadCard
                key={movie.id}
                movie={movie}
                onSelect={onSelectMovie}
                onDelete={deleteDownload}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-32">
            <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
              <Download size={36} className="text-white/20" />
            </div>
            <h3 className="text-display-sm text-white mb-3">No downloads yet</h3>
            <p className="text-body-md text-white/40 max-w-xs mx-auto">
              Download movies to watch offline anytime, anywhere
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

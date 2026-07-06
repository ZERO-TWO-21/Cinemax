import React, { useState, useCallback, useEffect } from 'react';
import type { Movie, Page, Toast } from './data/movies';

import { SplashScreen } from './pages/SplashScreen';
import { AuthPage } from './pages/AuthPage';
import { HomePage } from './pages/HomePage';
import { BrowsePage } from './pages/BrowsePage';
import { DetailsPage } from './pages/DetailsPage';
import { VideoPlayer } from './pages/VideoPlayer';
import { SearchPage } from './pages/SearchPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { WatchlistPage } from './pages/WatchlistPage';
import { DownloadsPage } from './pages/DownloadsPage';
import { ProfilePage } from './pages/ProfilePage';
import { SubscriptionPage } from './pages/SubscriptionPage';
import { SettingsPage } from './pages/SettingsPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { ContinueWatchingPage } from './pages/ContinueWatchingPage';
import { DesignSystemPage } from './pages/DesignSystemPage';
import { NotFoundPage, OfflinePage } from './pages/SplashScreen';

import { Navbar } from './components/layout/Navigation';
import { BottomNav } from './components/layout/Navigation';
import { ToastContainer } from './components/ui/Feedback';

function App() {
  const [appState, setAppState] = useState<'splash' | 'auth' | 'app'>('splash');
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isDark, setIsDark] = useState(true);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [pageHistory, setPageHistory] = useState<Page[]>(['home']);

  // Apply dark/light mode
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Set body background based on theme
  useEffect(() => {
    document.body.style.backgroundColor = isDark ? '#141414' : '#f8f8f8';
  }, [isDark]);

  const addToast = useCallback((message: string, type: Toast['type'] = 'info') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, message }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const navigate = useCallback((page: Page) => {
    setCurrentPage(page);
    setPageHistory(prev => [...prev.slice(-9), page]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const goBack = useCallback(() => {
    if (pageHistory.length > 1) {
      const newHistory = pageHistory.slice(0, -1);
      setPageHistory(newHistory);
      setCurrentPage(newHistory[newHistory.length - 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('home');
    }
  }, [pageHistory, navigate]);

  const handleSelectMovie = useCallback((movie: Movie) => {
    setSelectedMovie(movie);
    navigate('details');
  }, [navigate]);

  const handlePlay = useCallback((movie: Movie) => {
    setSelectedMovie(movie);
    navigate('player');
  }, [navigate]);

  // Splash → Auth
  if (appState === 'splash') {
    return (
      <>
        <SplashScreen onComplete={() => setAppState('auth')} />
      </>
    );
  }

  // Auth
  if (appState === 'auth') {
    return (
      <>
        <AuthPage onAuth={() => { setAppState('app'); }} />
        <ToastContainer toasts={toasts} onRemove={removeToast} />
      </>
    );
  }

  // Full player (no nav overlay)
  if (currentPage === 'player' && selectedMovie) {
    return (
      <>
        <VideoPlayer movie={selectedMovie} onBack={goBack} />
        <ToastContainer toasts={toasts} onRemove={removeToast} />
      </>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            onSelectMovie={handleSelectMovie}
            onNavigate={navigate}
            addToast={addToast}
          />
        );
      case 'browse':
        return <BrowsePage onSelectMovie={handleSelectMovie} />;
      case 'details':
        return selectedMovie ? (
          <DetailsPage
            movie={selectedMovie}
            onPlay={handlePlay}
            onBack={goBack}
            onSelectMovie={handleSelectMovie}
            addToast={addToast}
          />
        ) : null;
      case 'search':
        return <SearchPage onSelectMovie={handleSelectMovie} />;
      case 'categories':
        return <CategoriesPage onSelectMovie={handleSelectMovie} />;
      case 'watchlist':
        return <WatchlistPage onSelectMovie={handleSelectMovie} addToast={addToast} />;
      case 'downloads':
        return <DownloadsPage onSelectMovie={handleSelectMovie} addToast={addToast} />;
      case 'profile':
        return <ProfilePage onNavigate={navigate} />;
      case 'subscription':
        return <SubscriptionPage />;
      case 'settings':
        return <SettingsPage isDark={isDark} onToggleTheme={() => setIsDark(v => !v)} addToast={addToast} />;
      case 'notifications':
        return <NotificationsPage addToast={addToast} />;
      case 'continue-watching':
        return <ContinueWatchingPage onSelectMovie={handleSelectMovie} onPlay={handlePlay} />;
      case '404':
        return <NotFoundPage onNavigate={navigate} />;
      case 'offline':
        return <OfflinePage onNavigate={navigate} />;
      default:
        return <HomePage onSelectMovie={handleSelectMovie} onNavigate={navigate} addToast={addToast} />;
    }
  };

  const showNav = !['player', 'splash', 'auth'].includes(currentPage);

  return (
    <div className={`min-h-screen ${isDark ? 'bg-surface-950 text-white' : 'bg-surface-50 text-surface-950'} transition-colors duration-300`}>
      {showNav && (
        <Navbar
          currentPage={currentPage}
          onNavigate={navigate}
          isDark={isDark}
          onToggleTheme={() => setIsDark(v => !v)}
        />
      )}

      {/* Page with transition */}
      <main className="page-enter" key={currentPage}>
        {renderPage()}
      </main>

      {showNav && (
        <BottomNav currentPage={currentPage} onNavigate={navigate} />
      )}

      {/* Design System shortcut - accessible in bottom nav as hidden tab */}
      <div className="hidden">
        <DesignSystemPage />
      </div>

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}

export default App;

import React from 'react';
import { Home, Search, Bookmark, User, Film, ChevronRight, Grid, Download, Bell, Settings, Heart, Star, Clock, LogOut, HelpCircle } from 'lucide-react';
import type { Page } from '../../data/movies';

// ── Top Navigation ─────────────────────────────

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  userName?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  isDark,
  onToggleTheme,
  userName = 'Alex',
}) => {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navLinks = [
    { id: 'home' as Page, label: 'Home' },
    { id: 'browse' as Page, label: 'Movies' },
    { id: 'categories' as Page, label: 'Categories' },
    { id: 'continue-watching' as Page, label: 'My List' },
  ];

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled ? 'glass-dark shadow-elevation-2' : 'bg-transparent'}
      `}
    >
      <div className="container-cinema">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 flex-shrink-0"
          >
            <div className="w-8 h-8 rounded-xl bg-primary-500 flex items-center justify-center shadow-glow-sm">
              <span className="text-white font-black text-sm tracking-tight">C</span>
            </div>
            <span className="text-white font-bold text-lg tracking-tight hidden sm:block">Cinemax</span>
          </button>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`
                  relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200
                  ${currentPage === link.id
                    ? 'text-white bg-white/10'
                    : 'text-white/60 hover:text-white hover:bg-white/8'
                  }
                `}
              >
                {link.label}
                {currentPage === link.id && (
                  <span className="nav-active-bar" />
                )}
              </button>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => onNavigate('search')}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all"
              aria-label="Search"
            >
              <Search size={18} />
            </button>
            <button
              onClick={() => onNavigate('notifications')}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all relative"
              aria-label="Notifications"
            >
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary-500" />
            </button>
            <button
              onClick={() => onNavigate('profile')}
              className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-transparent hover:ring-primary-500 transition-all ml-1"
              aria-label="Profile"
            >
              <img
                src="https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?w=60&h=60&fit=crop"
                alt={userName}
                className="w-full h-full object-cover"
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

// ── Bottom Navigation (Mobile) ──────────────────

interface BottomNavProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentPage, onNavigate }) => {
  const tabs = [
    { id: 'home' as Page, label: 'Home', icon: Home },
    { id: 'search' as Page, label: 'Search', icon: Search },
    { id: 'watchlist' as Page, label: 'My List', icon: Bookmark },
    { id: 'downloads' as Page, label: 'Downloads', icon: Download },
    { id: 'profile' as Page, label: 'Profile', icon: User },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 glass-dark border-t border-white/8 safe-area-inset-bottom md:hidden"
      aria-label="Bottom navigation"
    >
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const active = currentPage === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`
                flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all duration-200
                ${active ? 'text-white' : 'text-white/40'}
              `}
              aria-label={tab.label}
              aria-current={active ? 'page' : undefined}
            >
              <div className="relative">
                <Icon
                  size={22}
                  className={`transition-all duration-200 ${active ? 'scale-110' : ''}`}
                  fill={active ? 'currentColor' : 'none'}
                />
                {active && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary-500" />
                )}
              </div>
              <span className={`text-[10px] font-medium transition-all ${active ? 'opacity-100' : 'opacity-60'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

// ── Sidebar ─────────────────────────────────────

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate, isOpen, onClose }) => {
  const navItems = [
    { id: 'home' as Page, label: 'Home', icon: Home },
    { id: 'browse' as Page, label: 'Browse', icon: Film },
    { id: 'categories' as Page, label: 'Categories', icon: Grid },
    { id: 'search' as Page, label: 'Search', icon: Search },
    { id: 'watchlist' as Page, label: 'Watchlist', icon: Bookmark },
    { id: 'continue-watching' as Page, label: 'Continue Watching', icon: Clock },
    { id: 'downloads' as Page, label: 'Downloads', icon: Download },
  ];

  const bottomItems = [
    { id: 'profile' as Page, label: 'Profile', icon: User },
    { id: 'settings' as Page, label: 'Settings', icon: Settings },
    { id: 'notifications' as Page, label: 'Notifications', icon: Bell },
  ];

  const navigate = (page: Page) => { onNavigate(page); onClose(); };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fadeIn"
          onClick={onClose}
        />
      )}
      <aside
        className={`
          fixed top-0 left-0 h-full w-72 z-50 glass-dark border-r border-white/8
          flex flex-col transition-transform duration-300 ease-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary-500 flex items-center justify-center shadow-glow-sm">
              <span className="text-white font-black">C</span>
            </div>
            <span className="text-white font-bold text-lg">Cinemax</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white/8 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/15 transition-all"
          >
            ×
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const active = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                  ${active
                    ? 'bg-primary-500/15 text-primary-400 border border-primary-500/20'
                    : 'text-white/60 hover:text-white hover:bg-white/8'
                  }
                `}
              >
                <Icon size={18} className="flex-shrink-0" />
                {item.label}
                {active && <ChevronRight size={14} className="ml-auto text-primary-400" />}
              </button>
            );
          })}

          <div className="pt-4 mt-4 border-t border-white/8 space-y-1">
            {bottomItems.map(item => {
              const Icon = item.icon;
              const active = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.id)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                    ${active ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white hover:bg-white/8'}
                  `}
                >
                  <Icon size={18} className="flex-shrink-0" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t border-white/8">
          <div className="flex items-center gap-3 px-3 py-3 mb-2">
            <img
              src="https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?w=60&h=60&fit=crop"
              alt="Profile"
              className="w-9 h-9 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-label-sm text-white truncate">Alex Chen</p>
              <p className="text-caption text-white/40 truncate">Premium</p>
            </div>
          </div>
          <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-white/50 hover:text-white hover:bg-white/8 transition-all">
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
};

// ── Breadcrumbs ─────────────────────────────────

interface BreadcrumbItem {
  label: string;
  page?: Page;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate: (page: Page) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, onNavigate }) => (
  <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm">
    {items.map((item, i) => (
      <React.Fragment key={i}>
        {i > 0 && <ChevronRight size={14} className="text-white/30 flex-shrink-0" />}
        {item.page && i < items.length - 1 ? (
          <button
            onClick={() => onNavigate(item.page!)}
            className="text-white/50 hover:text-white transition-colors"
          >
            {item.label}
          </button>
        ) : (
          <span className={i === items.length - 1 ? 'text-white font-medium' : 'text-white/50'}>
            {item.label}
          </span>
        )}
      </React.Fragment>
    ))}
  </nav>
);

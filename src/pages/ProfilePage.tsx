import React, { useState } from 'react';
import { User, Edit2, Star, Film, Heart, Clock, Settings, Crown, ChevronRight, Award, Camera } from 'lucide-react';
import type { Page } from '../data/movies';
import { MOVIES } from '../data/movies';

interface ProfilePageProps {
  onNavigate: (page: Page) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('activity');

  const stats = [
    { label: 'Watched', value: '142', icon: Film },
    { label: 'Watchlist', value: '28', icon: Clock },
    { label: 'Liked', value: '67', icon: Heart },
    { label: 'Reviews', value: '14', icon: Star },
  ];

  const menuItems = [
    { label: 'Edit Profile', icon: Edit2, action: () => {} },
    { label: 'Subscription', icon: Crown, page: 'subscription' as Page },
    { label: 'Settings', icon: Settings, page: 'settings' as Page },
    { label: 'Notifications', icon: Settings, page: 'notifications' as Page },
  ];

  const recentActivity = MOVIES.filter(m => m.watchProgress).slice(0, 5);

  return (
    <div className="min-h-screen bg-surface-950 pt-20 pb-24">
      <div className="container-cinema max-w-3xl">
        {/* Profile Header */}
        <div className="text-center mb-8 animate-fadeDown">
          <div className="relative inline-block mb-4">
            <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-primary-500 shadow-glow">
              <img
                src="https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?w=200&h=200&fit=crop"
                alt="Alex Chen"
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white shadow-glow-sm hover:bg-primary-600 transition-colors">
              <Camera size={14} />
            </button>
          </div>
          <h1 className="text-display-sm text-white mb-1">Alex Chen</h1>
          <div className="flex items-center justify-center gap-2 mb-3">
            <Crown size={14} className="text-accent-gold" />
            <span className="text-sm text-accent-gold font-semibold">Premium Member</span>
          </div>
          <p className="text-body-sm text-white/50">alex.chen@example.com</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3 mb-8 animate-fadeUp">
          {stats.map(stat => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="text-center p-4 rounded-2xl bg-white/4 border border-white/8">
                <Icon size={20} className="text-primary-400 mx-auto mb-2" />
                <p className="text-xl font-bold text-white">{stat.value}</p>
                <p className="text-caption text-white/50 mt-0.5">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Badges */}
        <div className="mb-8 p-5 rounded-2xl bg-white/4 border border-white/8">
          <h3 className="text-heading-md text-white mb-4 flex items-center gap-2">
            <Award size={16} className="text-accent-gold" />
            Achievements
          </h3>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Binge Watcher', icon: '🎬', desc: '50+ hours watched' },
              { label: 'Critic', icon: '⭐', desc: '10+ reviews' },
              { label: 'Explorer', icon: '🌍', desc: '10 genres' },
              { label: 'Early Bird', icon: '🌅', desc: 'First 100 users' },
            ].map(badge => (
              <div key={badge.label} className="flex items-center gap-2 bg-white/8 px-3 py-2 rounded-full">
                <span className="text-base">{badge.icon}</span>
                <div>
                  <p className="text-xs font-semibold text-white leading-none">{badge.label}</p>
                  <p className="text-[10px] text-white/40">{badge.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mb-8">
          <h3 className="text-heading-md text-white mb-4">Recently Watched</h3>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {recentActivity.map(movie => (
              <div key={movie.id} className="flex-shrink-0 w-24 cursor-pointer group">
                <div className="aspect-movie rounded-xl overflow-hidden bg-surface-800 relative">
                  <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                    <div className="h-full bg-primary-500 rounded-full" style={{ width: `${movie.watchProgress}%` }} />
                  </div>
                </div>
                <p className="text-xs text-white/60 mt-1.5 line-clamp-1">{movie.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Menu */}
        <div className="space-y-2">
          {menuItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={() => item.page ? onNavigate(item.page) : item.action?.()}
                className="w-full flex items-center gap-3 p-4 rounded-2xl bg-white/4 hover:bg-white/8 border border-white/8 hover:border-white/15 transition-all text-left group"
              >
                <div className="w-10 h-10 rounded-xl bg-white/8 flex items-center justify-center">
                  <Icon size={18} className="text-white/70 group-hover:text-white transition-colors" />
                </div>
                <span className="flex-1 text-label-md text-white">{item.label}</span>
                <ChevronRight size={16} className="text-white/30 group-hover:text-white/60 transition-colors" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

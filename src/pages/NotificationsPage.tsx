import React, { useState } from 'react';
import { Bell, Film, Star, Download, Zap, Heart, Check } from 'lucide-react';

interface Notification {
  id: string;
  type: 'new_release' | 'recommendation' | 'download' | 'system' | 'social';
  title: string;
  message: string;
  time: string;
  read: boolean;
  poster?: string;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 'n1', type: 'new_release', title: 'New Release', message: 'Dune: Part Three is now available to watch!', time: '2 min ago', read: false, poster: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?w=80&h=80&fit=crop' },
  { id: 'n2', type: 'recommendation', title: 'Because you watched Inception', message: 'We think you\'ll love Tenet — a mind-bending action thriller', time: '1 hour ago', read: false, poster: 'https://images.pexels.com/photos/1496373/pexels-photo-1496373.jpeg?w=80&h=80&fit=crop' },
  { id: 'n3', type: 'download', title: 'Download Complete', message: 'Oppenheimer (1080p) is ready to watch offline', time: '3 hours ago', read: true },
  { id: 'n4', type: 'social', title: 'New Review', message: 'Alex Chen left a review on your recommendation of The Dark Knight', time: '5 hours ago', read: true },
  { id: 'n5', type: 'new_release', title: 'Returning Soon', message: 'Everything Everywhere All At Once — The Sequel is coming next week!', time: '1 day ago', read: true, poster: 'https://images.pexels.com/photos/3775603/pexels-photo-3775603.jpeg?w=80&h=80&fit=crop' },
  { id: 'n6', type: 'system', title: 'Subscription Renewal', message: 'Your Premium plan renews in 7 days for $14.99/month', time: '2 days ago', read: true },
  { id: 'n7', type: 'recommendation', title: 'Top Pick for You', message: 'Blade Runner 2049 matches your taste — 98% match', time: '3 days ago', read: true, poster: 'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg?w=80&h=80&fit=crop' },
];

const typeIcons = {
  new_release: { icon: Film, color: 'text-primary-400', bg: 'bg-primary-500/15' },
  recommendation: { icon: Star, color: 'text-accent-gold', bg: 'bg-accent-gold/15' },
  download: { icon: Download, color: 'text-accent-blue', bg: 'bg-accent-blue/15' },
  system: { icon: Zap, color: 'text-white/60', bg: 'bg-white/10' },
  social: { icon: Heart, color: 'text-success-500', bg: 'bg-success-500/15' },
};

interface NotificationsPageProps {
  addToast: (msg: string, type?: 'success' | 'info' | 'error' | 'warning') => void;
}

export const NotificationsPage: React.FC<NotificationsPageProps> = ({ addToast }) => {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    addToast('All notifications marked as read', 'success');
  };

  const markRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const deleteNotif = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="min-h-screen bg-surface-950 pt-20 pb-24">
      <div className="container-cinema max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-fadeDown">
          <div>
            <h1 className="text-display-md text-white mb-1 flex items-center gap-3">
              Notifications
              {unreadCount > 0 && (
                <span className="text-sm font-medium bg-primary-500 text-white px-2.5 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </h1>
            <p className="text-body-md text-white/50">{unreadCount} unread</p>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="flex items-center gap-1.5 text-sm text-primary-400 hover:text-primary-300 bg-primary-500/10 hover:bg-primary-500/20 px-4 py-2 rounded-xl transition-all"
            >
              <Check size={14} />
              Mark all read
            </button>
          )}
        </div>

        {/* Notifications */}
        <div className="space-y-2 animate-fadeUp">
          {notifications.length === 0 && (
            <div className="text-center py-24">
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                <Bell size={32} className="text-white/20" />
              </div>
              <h3 className="text-heading-lg text-white mb-2">All caught up!</h3>
              <p className="text-body-md text-white/40">No notifications right now</p>
            </div>
          )}
          {notifications.map(notif => {
            const typeInfo = typeIcons[notif.type];
            const Icon = typeInfo.icon;
            return (
              <div
                key={notif.id}
                className={`
                  relative flex items-start gap-4 p-4 rounded-2xl transition-all cursor-pointer group
                  ${notif.read ? 'bg-white/3 hover:bg-white/6' : 'bg-primary-500/5 border border-primary-500/15 hover:bg-primary-500/8'}
                `}
                onClick={() => markRead(notif.id)}
              >
                {/* Unread dot */}
                {!notif.read && (
                  <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary-500" />
                )}

                {/* Icon or poster */}
                <div className="flex-shrink-0">
                  {notif.poster ? (
                    <div className="relative">
                      <img
                        src={notif.poster}
                        alt=""
                        className="w-12 h-12 rounded-xl object-cover"
                      />
                      <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full ${typeInfo.bg} flex items-center justify-center`}>
                        <Icon size={10} className={typeInfo.color} />
                      </div>
                    </div>
                  ) : (
                    <div className={`w-12 h-12 rounded-xl ${typeInfo.bg} flex items-center justify-center`}>
                      <Icon size={20} className={typeInfo.color} />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0 pr-6">
                  <p className={`text-label-sm ${notif.read ? 'text-white/70' : 'text-white'}`}>
                    {notif.title}
                  </p>
                  <p className="text-caption text-white/50 mt-0.5 leading-relaxed">{notif.message}</p>
                  <p className="text-caption text-white/30 mt-1.5">{notif.time}</p>
                </div>

                <button
                  onClick={e => { e.stopPropagation(); deleteNotif(notif.id); }}
                  className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white/8 flex items-center justify-center text-white/30 hover:text-white hover:bg-white/15 transition-all opacity-0 group-hover:opacity-100"
                >
                  ×
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

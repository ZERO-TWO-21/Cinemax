import React, { useState } from 'react';
import { Bell, Lock, Eye, Globe, Download, Moon, Sun, Trash2, ChevronRight, Volume2, Subtitles, Shield } from 'lucide-react';
import { Switch } from '../components/ui/Controls';
import { Dropdown } from '../components/ui/Dropdown';
import { Slider } from '../components/ui/Controls';

interface SettingsPageProps {
  isDark: boolean;
  onToggleTheme: () => void;
  addToast: (msg: string, type?: 'success' | 'info' | 'error' | 'warning') => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ isDark, onToggleTheme, addToast }) => {
  const [notifications, setNotifications] = useState(true);
  const [autoplay, setAutoplay] = useState(true);
  const [autoplayPreview, setAutoplayPreview] = useState(true);
  const [downloadOnWifi, setDownloadOnWifi] = useState(true);
  const [hdDownloads, setHdDownloads] = useState(false);
  const [subtitles, setSubtitles] = useState(true);
  const [language, setLanguage] = useState('en');
  const [quality, setQuality] = useState('auto');
  const [volume, setVolume] = useState(80);

  const save = () => addToast('Settings saved', 'success');

  const sections = [
    {
      title: 'Appearance',
      icon: Eye,
      items: [
        {
          label: 'Dark Mode',
          desc: 'Use dark theme across the app',
          control: <Switch checked={isDark} onChange={onToggleTheme} />,
        },
      ],
    },
    {
      title: 'Playback',
      icon: Volume2,
      items: [
        {
          label: 'Autoplay Next',
          desc: 'Automatically play the next episode',
          control: <Switch checked={autoplay} onChange={setAutoplay} />,
        },
        {
          label: 'Autoplay Previews',
          desc: 'Play video previews while browsing',
          control: <Switch checked={autoplayPreview} onChange={setAutoplayPreview} />,
        },
        {
          label: 'Subtitles',
          desc: 'Show subtitles by default',
          control: <Switch checked={subtitles} onChange={setSubtitles} />,
        },
      ],
    },
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        {
          label: 'Push Notifications',
          desc: 'Get notified about new releases',
          control: <Switch checked={notifications} onChange={setNotifications} />,
        },
      ],
    },
    {
      title: 'Downloads',
      icon: Download,
      items: [
        {
          label: 'Wi-Fi Only',
          desc: 'Download only on Wi-Fi',
          control: <Switch checked={downloadOnWifi} onChange={setDownloadOnWifi} />,
        },
        {
          label: 'HD Downloads',
          desc: 'Download in higher quality (uses more storage)',
          control: <Switch checked={hdDownloads} onChange={setHdDownloads} />,
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-surface-950 pt-20 pb-24">
      <div className="container-cinema max-w-2xl">
        <div className="mb-8 animate-fadeDown">
          <h1 className="text-display-md text-white mb-1">Settings</h1>
          <p className="text-body-md text-white/50">Customize your experience</p>
        </div>

        <div className="space-y-4 animate-fadeUp">
          {sections.map(section => {
            const SIcon = section.icon;
            return (
              <div key={section.title} className="rounded-3xl bg-white/4 border border-white/8 overflow-hidden">
                <div className="px-5 py-4 border-b border-white/8 flex items-center gap-2">
                  <SIcon size={16} className="text-white/50" />
                  <h3 className="text-label-lg text-white">{section.title}</h3>
                </div>
                {section.items.map((item, i) => (
                  <div
                    key={item.label}
                    className={`flex items-center justify-between px-5 py-4 ${i < section.items.length - 1 ? 'border-b border-white/6' : ''}`}
                  >
                    <div className="flex-1 min-w-0 pr-4">
                      <p className="text-label-md text-white">{item.label}</p>
                      <p className="text-caption text-white/40 mt-0.5">{item.desc}</p>
                    </div>
                    {item.control}
                  </div>
                ))}
              </div>
            );
          })}

          {/* Volume */}
          <div className="rounded-3xl bg-white/4 border border-white/8 p-5">
            <Slider value={volume} onChange={setVolume} label="Default Volume" showValue min={0} max={100} />
          </div>

          {/* Dropdowns */}
          <div className="rounded-3xl bg-white/4 border border-white/8 p-5 space-y-4">
            <Dropdown
              label="Stream Quality"
              value={quality}
              onChange={setQuality}
              options={[
                { value: 'auto', label: 'Auto' },
                { value: '4k', label: '4K Ultra HD' },
                { value: '1080p', label: '1080p Full HD' },
                { value: '720p', label: '720p HD' },
                { value: '480p', label: '480p SD' },
              ]}
            />
            <Dropdown
              label="Language"
              value={language}
              onChange={setLanguage}
              options={[
                { value: 'en', label: 'English' },
                { value: 'es', label: 'Español' },
                { value: 'fr', label: 'Français' },
                { value: 'de', label: 'Deutsch' },
                { value: 'ja', label: 'Japanese' },
                { value: 'ko', label: 'Korean' },
              ]}
            />
          </div>

          {/* Danger zone */}
          <div className="rounded-3xl bg-error-500/5 border border-error-500/20 overflow-hidden">
            <div className="px-5 py-4 border-b border-error-500/15 flex items-center gap-2">
              <Shield size={16} className="text-error-500" />
              <h3 className="text-label-lg text-error-500">Danger Zone</h3>
            </div>
            <button
              onClick={() => addToast('Account deletion requested. Check your email.', 'warning')}
              className="w-full flex items-center gap-3 px-5 py-4 text-error-500 hover:bg-error-500/10 transition-colors"
            >
              <Trash2 size={16} />
              <span className="text-sm font-medium">Delete Account</span>
              <ChevronRight size={14} className="ml-auto opacity-50" />
            </button>
          </div>

          <button
            onClick={save}
            className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-4 rounded-2xl transition-all active:scale-95"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Palette, Type, Layout, Layers, Box, Sparkles, Play, Heart, Bell, Star, Check, Plus, Search, Download, Settings, ChevronRight, Zap, Shield, Crown } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input, SearchBar } from '../components/ui/Input';
import { Checkbox, Radio, Switch, Slider } from '../components/ui/Controls';
import { Dropdown, Tabs } from '../components/ui/Dropdown';
import { SkeletonCard, SkeletonText, Spinner } from '../components/ui/Feedback';

export const DesignSystemPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('colors');
  const [checkVal, setCheckVal] = useState(true);
  const [radioVal, setRadioVal] = useState('a');
  const [switchVal, setSwitchVal] = useState(true);
  const [sliderVal, setSliderVal] = useState(60);
  const [inputVal, setInputVal] = useState('');
  const [searchVal, setSearchVal] = useState('');
  const [dropVal, setDropVal] = useState('md');
  const [tabVal, setTabVal] = useState('overview');

  const sections = ['colors', 'typography', 'spacing', 'components', 'cards', 'motion'];

  const colors = [
    { name: 'Primary', shades: ['#fff1f0', '#ffe1de', '#ffc7c2', '#ffa099', '#ff6b61', '#e50914', '#c40811', '#a3060e', '#870510', '#710812'] },
    { name: 'Surface', shades: ['#f8f8f8', '#f0f0f0', '#e8e8e8', '#d4d4d4', '#a8a8a8', '#737373', '#525252', '#404040', '#262626', '#141414'] },
    { name: 'Success', shades: ['#f0fdf4', '#dcfce7', '#bbf7d0', '#86efac', '#4ade80', '#22c55e', '#16a34a', '#15803d', '#166534', '#14532d'] },
    { name: 'Warning', shades: ['#fffbeb', '#fef3c7', '#fde68a', '#fcd34d', '#fbbf24', '#f59e0b', '#d97706', '#b45309', '#92400e', '#78350f'] },
    { name: 'Error', shades: ['#fef2f2', '#fee2e2', '#fecaca', '#fca5a5', '#f87171', '#ef4444', '#dc2626', '#b91c1c', '#991b1b', '#7f1d1d'] },
  ];

  const typeScale = [
    { name: 'Display 2XL', class: 'text-display-2xl', sample: 'The Future' },
    { name: 'Display XL', class: 'text-display-xl', sample: 'Epic Cinema' },
    { name: 'Display LG', class: 'text-display-lg', sample: 'Inception' },
    { name: 'Display MD', class: 'text-display-md', sample: 'Browse Movies' },
    { name: 'Display SM', class: 'text-display-sm', sample: 'Trending Now' },
    { name: 'Heading XL', class: 'text-heading-xl', sample: 'Action & Adventure' },
    { name: 'Heading LG', class: 'text-heading-lg', sample: 'Top Rated This Week' },
    { name: 'Body LG', class: 'text-body-lg', sample: 'A thief who steals corporate secrets through dream-sharing.' },
    { name: 'Body MD', class: 'text-body-md', sample: 'Watch anywhere on your phone, tablet, laptop or TV.' },
    { name: 'Body SM', class: 'text-body-sm', sample: '2h 28m • PG-13 • Thriller, Sci-Fi' },
    { name: 'Label MD', class: 'text-label-md', sample: 'Christopher Nolan' },
    { name: 'Caption', class: 'text-caption', sample: 'Added 2 hours ago' },
    { name: 'Overline', class: 'text-overline', sample: 'New Release' },
  ];

  const dropOptions = [
    { value: 'sm', label: 'Small' },
    { value: 'md', label: 'Medium' },
    { value: 'lg', label: 'Large' },
    { value: 'xl', label: 'Extra Large' },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'cast', label: 'Cast & Crew' },
    { id: 'reviews', label: 'Reviews', count: 24 },
    { id: 'similar', label: 'Similar' },
  ];

  return (
    <div className="min-h-screen bg-surface-950 pt-20 pb-24">
      <div className="container-cinema">
        {/* Header */}
        <div className="mb-10 animate-fadeDown">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-primary-500 flex items-center justify-center shadow-glow-sm">
              <Sparkles size={18} className="text-white" />
            </div>
            <span className="text-overline text-primary-400">Design System</span>
          </div>
          <h1 className="text-display-xl text-white mb-3">Cinemax DS</h1>
          <p className="text-body-lg text-white/60 max-w-xl">
            A complete cinema-grade design system with tokens, components, interactions, and accessibility standards.
          </p>
        </div>

        {/* Section Nav */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-10">
          {sections.map(s => (
            <button
              key={s}
              onClick={() => setActiveSection(s)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all capitalize ${
                activeSection === s ? 'bg-primary-500 text-white shadow-glow-sm' : 'bg-white/8 text-white/60 hover:text-white hover:bg-white/12'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {activeSection === 'colors' && (
          <div className="space-y-8 animate-fadeIn">
            <h2 className="text-display-sm text-white flex items-center gap-2"><Palette size={20} className="text-primary-400" /> Color System</h2>
            {colors.map(palette => (
              <div key={palette.name}>
                <p className="text-label-md text-white/60 mb-3">{palette.name}</p>
                <div className="flex gap-1.5 flex-wrap">
                  {palette.shades.map((color, i) => (
                    <div key={color} className="flex flex-col items-center gap-1.5 group cursor-pointer">
                      <div
                        className="w-10 h-10 rounded-xl border border-white/10 shadow-sm transition-transform group-hover:scale-110"
                        style={{ background: color }}
                        title={color}
                      />
                      <span className="text-[10px] text-white/30">{(i + 1) * 100 === 1000 ? '950' : (i + 1) * 100}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div>
              <p className="text-label-md text-white/60 mb-3">Semantic Tokens</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'Primary', color: '#e50914' },
                  { label: 'Surface', color: '#1a1a1a' },
                  { label: 'Accent Gold', color: '#f5c518' },
                  { label: 'Accent Blue', color: '#0ea5e9' },
                  { label: 'Success', color: '#22c55e' },
                  { label: 'Warning', color: '#f59e0b' },
                  { label: 'Error', color: '#ef4444' },
                  { label: 'Neutral', color: '#737373' },
                ].map(t => (
                  <div key={t.label} className="p-3 rounded-2xl bg-white/4 border border-white/8">
                    <div className="w-full h-8 rounded-xl mb-2" style={{ background: t.color }} />
                    <p className="text-label-sm text-white">{t.label}</p>
                    <p className="text-caption text-white/40 font-mono">{t.color}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'typography' && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-display-sm text-white flex items-center gap-2"><Type size={20} className="text-primary-400" /> Typography Scale</h2>
            {typeScale.map(t => (
              <div key={t.name} className="flex items-baseline gap-6 py-4 border-b border-white/6">
                <span className="text-caption text-white/30 font-mono w-28 flex-shrink-0">{t.name}</span>
                <span className={`${t.class} text-white flex-1 leading-normal`}>{t.sample}</span>
              </div>
            ))}
          </div>
        )}

        {activeSection === 'spacing' && (
          <div className="space-y-8 animate-fadeIn">
            <h2 className="text-display-sm text-white flex items-center gap-2"><Layout size={20} className="text-primary-400" /> Spacing & Radius</h2>
            <div>
              <p className="text-label-md text-white mb-4">8px Grid System</p>
              <div className="flex items-end gap-4 flex-wrap">
                {[1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20].map(n => (
                  <div key={n} className="flex flex-col items-center gap-2">
                    <div className="bg-primary-500/40 border border-primary-500/60 rounded" style={{ width: `${n * 8}px`, height: `${n * 8}px` }} />
                    <span className="text-[10px] text-white/40 font-mono">{n * 8}px</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-label-md text-white mb-4">Border Radius</p>
              <div className="flex flex-wrap gap-4">
                {[
                  { name: 'sm (6px)', value: '6px' },
                  { name: 'md (10px)', value: '10px' },
                  { name: 'lg (14px)', value: '14px' },
                  { name: 'xl (18px)', value: '18px' },
                  { name: '2xl (16px)', value: '16px' },
                  { name: '3xl (20px)', value: '20px' },
                  { name: 'full', value: '9999px' },
                ].map(r => (
                  <div key={r.name} className="flex flex-col items-center gap-2">
                    <div
                      className="w-20 h-20 bg-white/10 border border-white/20"
                      style={{ borderRadius: r.value }}
                    />
                    <span className="text-xs text-white/40 text-center">{r.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-label-md text-white mb-4">Elevation & Shadows</p>
              <div className="flex flex-wrap gap-6">
                {[1, 2, 3, 4, 5].map(level => (
                  <div
                    key={level}
                    className="w-24 h-24 bg-surface-800 rounded-2xl flex items-center justify-center"
                    style={{ boxShadow: `var(--shadow-${level})` }}
                  >
                    <span className="text-xs text-white/50">Level {level}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'components' && (
          <div className="space-y-10 animate-fadeIn">
            <h2 className="text-display-sm text-white flex items-center gap-2"><Box size={20} className="text-primary-400" /> Components</h2>

            {/* Buttons */}
            <div>
              <p className="text-label-lg text-white mb-5">Buttons</p>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3 items-center">
                  <Button variant="primary" icon={<Play size={16} fill="currentColor" />}>Play Now</Button>
                  <Button variant="secondary" icon={<Plus size={16} />}>Add to List</Button>
                  <Button variant="ghost" icon={<Heart size={16} />}>Like</Button>
                  <Button variant="glass" icon={<Download size={16} />}>Download</Button>
                  <Button variant="danger">Cancel</Button>
                </div>
                <div className="flex flex-wrap gap-3 items-center">
                  <Button variant="primary" size="xs">Extra Small</Button>
                  <Button variant="primary" size="sm">Small</Button>
                  <Button variant="primary" size="md">Medium</Button>
                  <Button variant="primary" size="lg">Large</Button>
                  <Button variant="primary" size="xl">Extra Large</Button>
                </div>
                <div className="flex flex-wrap gap-3 items-center">
                  <Button variant="primary" loading>Loading</Button>
                  <Button variant="primary" disabled>Disabled</Button>
                  <Button variant="primary" iconOnly icon={<Play size={16} fill="currentColor" />} aria-label="Play" />
                  <Button variant="secondary" iconOnly icon={<Heart size={16} />} aria-label="Like" />
                  <Button variant="primary" fab icon={<Plus size={22} />} aria-label="Add" />
                </div>
              </div>
            </div>

            {/* Inputs */}
            <div className="max-w-sm space-y-4">
              <p className="text-label-lg text-white">Input Fields</p>
              <Input label="Email" placeholder="hello@example.com" value={inputVal} onChange={setInputVal} icon={<Search size={16} />} clearable />
              <Input label="Password" placeholder="Your password" value={inputVal} onChange={setInputVal} type="password" />
              <Input label="With Error" placeholder="Enter value" value="" onChange={() => {}} error="This field is required" />
              <Input label="With Hint" placeholder="Enter value" value={inputVal} onChange={setInputVal} hint="Your username is public" />
              <SearchBar value={searchVal} onChange={setSearchVal} suggestions={['Inception', 'Interstellar', 'Inception 2', 'Oppenheimer']} />
            </div>

            {/* Form Controls */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <p className="text-label-lg text-white">Checkboxes</p>
                <Checkbox checked={checkVal} onChange={setCheckVal} label="Remember me" />
                <Checkbox checked={false} onChange={() => {}} label="Unchecked state" />
                <Checkbox checked={true} onChange={() => {}} label="Disabled" disabled />
              </div>
              <div className="space-y-4">
                <p className="text-label-lg text-white">Radio Buttons</p>
                <Radio selected={radioVal} value="a" onChange={setRadioVal} label="Option A" />
                <Radio selected={radioVal} value="b" onChange={setRadioVal} label="Option B" />
                <Radio selected={radioVal} value="c" onChange={setRadioVal} label="Option C" />
              </div>
              <div className="space-y-4">
                <p className="text-label-lg text-white">Switches</p>
                <Switch checked={switchVal} onChange={setSwitchVal} label="Autoplay" />
                <Switch checked={false} onChange={() => {}} label="Notifications" size="sm" />
                <Switch checked={true} onChange={() => {}} label="HD Downloads" size="lg" labelPosition="left" />
              </div>
            </div>

            {/* Slider */}
            <div className="max-w-sm">
              <p className="text-label-lg text-white mb-4">Sliders</p>
              <Slider value={sliderVal} onChange={setSliderVal} label="Volume" showValue />
              <Slider value={30} onChange={() => {}} label="Brightness" showValue className="mt-4" />
            </div>

            {/* Dropdowns & Tabs */}
            <div className="max-w-sm space-y-4">
              <p className="text-label-lg text-white">Dropdown</p>
              <Dropdown value={dropVal} onChange={setDropVal} options={dropOptions} label="Font Size" />
            </div>
            <div>
              <p className="text-label-lg text-white mb-4">Tabs</p>
              <div className="space-y-4">
                <Tabs tabs={tabs} activeTab={tabVal} onChange={setTabVal} variant="underline" />
                <Tabs tabs={tabs} activeTab={tabVal} onChange={setTabVal} variant="pills" />
                <div className="max-w-sm">
                  <Tabs tabs={tabs.slice(0, 3)} activeTab={tabVal} onChange={setTabVal} variant="default" />
                </div>
              </div>
            </div>

            {/* Skeleton */}
            <div>
              <p className="text-label-lg text-white mb-4">Skeleton & Loading</p>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                {Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
              <div className="mt-4 max-w-xs">
                <SkeletonText lines={3} />
              </div>
              <div className="flex gap-4 mt-4 items-center">
                <Spinner size="sm" />
                <Spinner size="md" />
                <Spinner size="lg" />
              </div>
            </div>
          </div>
        )}

        {activeSection === 'motion' && (
          <div className="space-y-8 animate-fadeIn">
            <h2 className="text-display-sm text-white flex items-center gap-2"><Zap size={20} className="text-primary-400" /> Motion & Animation</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Fade In', cls: 'animate-fadeIn', delay: 0 },
                { name: 'Fade Up', cls: 'animate-fadeUp', delay: 0.1 },
                { name: 'Scale In', cls: 'animate-scaleIn', delay: 0.2 },
                { name: 'Slide Right', cls: 'animate-slideInRight', delay: 0.3 },
              ].map(anim => (
                <div key={anim.name} className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <div className={`w-12 h-12 rounded-xl bg-primary-500 mx-auto mb-3 ${anim.cls}`} style={{ animationDelay: `${anim.delay}s` }} />
                  <p className="text-label-sm text-white">{anim.name}</p>
                  <p className="text-caption text-white/40 font-mono">{anim.cls}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['card-hover', 'card-scale'].map(cls => (
                <div key={cls} className={`p-5 rounded-2xl bg-white/5 border border-white/10 cursor-pointer ${cls}`}>
                  <div className="w-full aspect-movie rounded-xl bg-primary-500/20 mb-3" />
                  <p className="text-label-sm text-white">{cls}</p>
                </div>
              ))}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <div className="skeleton w-full h-16 rounded-xl mb-3" />
                <p className="text-label-sm text-white">skeleton</p>
              </div>
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center gap-3">
                <div className="w-3 h-3 rounded-full bg-primary-500 animate-bounceSubtle" style={{ animationDelay: '0s' }} />
                <div className="w-3 h-3 rounded-full bg-primary-500 animate-bounceSubtle" style={{ animationDelay: '0.2s' }} />
                <div className="w-3 h-3 rounded-full bg-primary-500 animate-bounceSubtle" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        )}

        {activeSection === 'cards' && (
          <div className="space-y-8 animate-fadeIn">
            <h2 className="text-display-sm text-white flex items-center gap-2"><Layers size={20} className="text-primary-400" /> Card Variants</h2>
            <p className="text-body-md text-white/50">Hover over cards to see interaction states</p>
            <p className="text-label-lg text-white">Portrait Cards (default)</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {/* Cards shown in browse/home pages */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

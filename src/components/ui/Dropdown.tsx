import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface DropdownOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface DropdownProps {
  value: string;
  onChange: (v: string) => void;
  options: DropdownOption[];
  placeholder?: string;
  label?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Dropdown: React.FC<DropdownProps> = ({
  value,
  onChange,
  options,
  placeholder = 'Select...',
  label,
  className = '',
  size = 'md',
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find(o => o.value === value);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const sizeClasses = {
    sm: 'h-9 px-3 text-sm rounded-xl',
    md: 'h-11 px-4 text-sm rounded-xl',
    lg: 'h-12 px-4 text-base rounded-2xl',
  };

  return (
    <div ref={ref} className={`relative ${className}`}>
      {label && <label className="block text-label-sm text-white/70 mb-1.5 px-1">{label}</label>}
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`
          flex items-center justify-between w-full gap-2
          border border-white/10 bg-white/5 backdrop-blur-sm
          text-left transition-all duration-200
          ${open ? 'border-primary-500 shadow-[0_0_0_3px_rgba(229,9,20,0.15)]' : 'hover:border-white/20'}
          ${sizeClasses[size]}
        `}
      >
        <span className={`flex items-center gap-2 flex-1 min-w-0 ${selected ? 'text-white' : 'text-white/30'}`}>
          {selected?.icon && <span className="flex-shrink-0">{selected.icon}</span>}
          <span className="truncate">{selected?.label || placeholder}</span>
        </span>
        <ChevronDown
          size={16}
          className={`flex-shrink-0 text-white/40 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div
          role="listbox"
          className="absolute z-50 top-full mt-2 left-0 right-0 glass-dark rounded-2xl overflow-hidden shadow-elevation-4 animate-scaleIn"
        >
          {options.map(opt => (
            <button
              key={opt.value}
              role="option"
              aria-selected={opt.value === value}
              disabled={opt.disabled}
              onClick={() => { if (!opt.disabled) { onChange(opt.value); setOpen(false); } }}
              className={`
                flex items-center justify-between w-full px-4 py-3 text-sm transition-colors
                ${opt.disabled ? 'opacity-40 cursor-not-allowed' : 'hover:bg-white/10 cursor-pointer'}
                ${opt.value === value ? 'text-primary-400' : 'text-white/80'}
              `}
            >
              <span className="flex items-center gap-2">
                {opt.icon && <span className="text-white/50">{opt.icon}</span>}
                {opt.label}
              </span>
              {opt.value === value && <Check size={14} className="text-primary-400" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// ── Tabs ───────────────────────────────────────

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  count?: number;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
  variant?: 'default' | 'pills' | 'underline';
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  variant = 'underline',
  className = '',
}) => {
  if (variant === 'pills') {
    return (
      <div className={`flex gap-2 flex-wrap ${className}`}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`
              flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
              ${activeTab === tab.id
                ? 'bg-primary-500 text-white shadow-glow-sm'
                : 'bg-white/8 text-white/60 hover:bg-white/12 hover:text-white'
              }
            `}
          >
            {tab.icon && tab.icon}
            {tab.label}
            {tab.count !== undefined && (
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-white/20' : 'bg-white/10'}`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>
    );
  }

  if (variant === 'default') {
    return (
      <div className={`flex bg-white/5 p-1 rounded-2xl gap-1 ${className}`}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`
              flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200
              ${activeTab === tab.id
                ? 'bg-white/10 text-white shadow-elevation-1'
                : 'text-white/50 hover:text-white/80'
              }
            `}
          >
            {tab.icon && tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
    );
  }

  // underline
  return (
    <div className={`flex border-b border-white/10 gap-0 ${className}`}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`
            relative flex items-center gap-1.5 px-4 py-3 text-sm font-medium transition-all duration-200 whitespace-nowrap
            ${activeTab === tab.id ? 'text-white' : 'text-white/50 hover:text-white/80'}
          `}
        >
          {tab.icon && tab.icon}
          {tab.label}
          {tab.count !== undefined && (
            <span className="text-xs px-1 bg-white/10 rounded">{tab.count}</span>
          )}
          {activeTab === tab.id && (
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-primary-500 rounded-full" />
          )}
        </button>
      ))}
    </div>
  );
};

import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Eye, EyeOff } from 'lucide-react';

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  type?: 'text' | 'email' | 'password' | 'number';
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  error?: string;
  hint?: string;
  disabled?: boolean;
  clearable?: boolean;
  className?: string;
  id?: string;
  autoFocus?: boolean;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  icon,
  iconRight,
  error,
  hint,
  disabled,
  clearable,
  className = '',
  id,
  autoFocus,
  onKeyDown,
}) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || `input-${Math.random().toString(36).slice(2)}`;
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={inputId} className="text-label-sm text-white/70 px-1">
          {label}
        </label>
      )}
      <div
        className={`
          relative flex items-center rounded-xl border transition-all duration-200
          ${focused ? 'border-primary-500 shadow-[0_0_0_3px_rgba(229,9,20,0.15)]' : 'border-white/10'}
          ${error ? 'border-error-500 shadow-[0_0_0_3px_rgba(239,68,68,0.15)]' : ''}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-text'}
          bg-white/5 backdrop-blur-sm
        `}
      >
        {icon && (
          <span className="pl-3 flex-shrink-0 text-white/40">{icon}</span>
        )}
        <input
          id={inputId}
          type={inputType}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          autoFocus={autoFocus}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={onKeyDown}
          className={`
            flex-1 bg-transparent text-white placeholder:text-white/30 text-sm
            py-3 outline-none min-w-0
            ${icon ? 'pl-2' : 'pl-4'}
            ${(clearable && value) || isPassword || iconRight ? 'pr-2' : 'pr-4'}
          `}
        />
        {clearable && value && !isPassword && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="p-2 mr-1 text-white/40 hover:text-white/70 rounded-lg transition-colors"
            aria-label="Clear"
          >
            <X size={14} />
          </button>
        )}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(v => !v)}
            className="p-2 mr-1 text-white/40 hover:text-white/70 rounded-lg transition-colors"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
        {iconRight && !isPassword && (
          <span className="pr-3 flex-shrink-0 text-white/40">{iconRight}</span>
        )}
      </div>
      {error && <p className="text-caption text-error-500 px-1">{error}</p>}
      {hint && !error && <p className="text-caption text-white/40 px-1">{hint}</p>}
    </div>
  );
};

// ── Search Bar ─────────────────────────────────

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
  onSearch?: () => void;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
  suggestions?: string[];
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSearch,
  placeholder = 'Search movies, shows, cast...',
  className = '',
  autoFocus,
  suggestions = [],
}) => {
  const [focused, setFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredSuggestions = suggestions.filter(s =>
    s.toLowerCase().includes(value.toLowerCase()) && value.length > 0
  );

  return (
    <div className={`relative ${className}`}>
      <div
        className={`
          flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all duration-200
          bg-white/8 backdrop-blur-sm
          ${focused ? 'border-primary-500 shadow-[0_0_0_3px_rgba(229,9,20,0.15)] bg-white/10' : 'border-white/10'}
        `}
      >
        <Search size={18} className={`flex-shrink-0 transition-colors ${focused ? 'text-primary-400' : 'text-white/40'}`} />
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          onFocus={() => { setFocused(true); setShowSuggestions(true); }}
          onBlur={() => { setFocused(false); setTimeout(() => setShowSuggestions(false), 200); }}
          onKeyDown={e => { if (e.key === 'Enter') onSearch?.(); }}
          className="flex-1 bg-transparent text-white placeholder:text-white/30 text-sm outline-none"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="text-white/40 hover:text-white transition-colors"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute top-full mt-2 left-0 right-0 glass-dark rounded-2xl overflow-hidden z-50 shadow-elevation-4 animate-scaleIn">
          {filteredSuggestions.map((s, i) => (
            <button
              key={i}
              type="button"
              onMouseDown={() => { onChange(s); setShowSuggestions(false); }}
              className="flex items-center gap-3 w-full px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Search size={14} className="text-white/30 flex-shrink-0" />
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

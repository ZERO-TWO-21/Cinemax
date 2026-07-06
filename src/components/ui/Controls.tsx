import React from 'react';
import { Check } from 'lucide-react';

// ── Checkbox ───────────────────────────────────

interface CheckboxProps {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  disabled,
  className = '',
}) => (
  <label
    className={`flex items-center gap-3 cursor-pointer select-none group ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
  >
    <div
      role="checkbox"
      aria-checked={checked}
      tabIndex={0}
      onClick={() => !disabled && onChange(!checked)}
      onKeyDown={e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); !disabled && onChange(!checked); } }}
      className={`
        relative flex-shrink-0 w-5 h-5 rounded-md border-2 transition-all duration-200
        ${checked
          ? 'bg-primary-500 border-primary-500'
          : 'bg-transparent border-white/30 group-hover:border-white/60'
        }
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-500
      `}
    >
      {checked && (
        <Check size={12} className="absolute inset-0 m-auto text-white animate-scaleIn" strokeWidth={3} />
      )}
    </div>
    {label && <span className="text-sm text-white/80">{label}</span>}
  </label>
);

// ── Radio ───────────────────────────────────────

interface RadioProps {
  selected: string;
  value: string;
  onChange: (v: string) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export const Radio: React.FC<RadioProps> = ({
  selected,
  value,
  onChange,
  label,
  disabled,
  className = '',
}) => {
  const isChecked = selected === value;
  return (
    <label
      className={`flex items-center gap-3 cursor-pointer select-none group ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      <div
        role="radio"
        aria-checked={isChecked}
        tabIndex={0}
        onClick={() => !disabled && onChange(value)}
        onKeyDown={e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); !disabled && onChange(value); } }}
        className={`
          relative flex-shrink-0 w-5 h-5 rounded-full border-2 transition-all duration-200
          ${isChecked
            ? 'border-primary-500'
            : 'border-white/30 group-hover:border-white/60'
          }
        `}
      >
        {isChecked && (
          <div className="absolute inset-1 rounded-full bg-primary-500 animate-scaleIn" />
        )}
      </div>
      {label && <span className="text-sm text-white/80">{label}</span>}
    </label>
  );
};

// ── Switch ─────────────────────────────────────

interface SwitchProps {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
  labelPosition?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  label,
  labelPosition = 'right',
  size = 'md',
  disabled,
  className = '',
}) => {
  const sizeMap = {
    sm: { track: 'w-8 h-4', thumb: 'w-3 h-3', translate: 'translate-x-4' },
    md: { track: 'w-11 h-6', thumb: 'w-4 h-4', translate: 'translate-x-5' },
    lg: { track: 'w-14 h-7', thumb: 'w-5 h-5', translate: 'translate-x-7' },
  };
  const s = sizeMap[size];

  const track = (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`
        relative flex-shrink-0 ${s.track} rounded-full transition-all duration-250 cursor-pointer
        ${checked ? 'bg-primary-500' : 'bg-white/20'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-500
      `}
    >
      <span
        className={`
          absolute top-1/2 -translate-y-1/2 left-1 ${s.thumb} rounded-full bg-white
          shadow-sm transition-transform duration-250 ease-out
          ${checked ? s.translate : 'translate-x-0'}
        `}
      />
    </button>
  );

  if (!label) return <div className={className}>{track}</div>;

  return (
    <label
      className={`flex items-center gap-3 cursor-pointer select-none ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {labelPosition === 'left' && <span className="text-sm text-white/80">{label}</span>}
      {track}
      {labelPosition === 'right' && <span className="text-sm text-white/80">{label}</span>}
    </label>
  );
};

// ── Slider ─────────────────────────────────────

interface SliderProps {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  showValue?: boolean;
  className?: string;
}

export const Slider: React.FC<SliderProps> = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  showValue,
  className = '',
}) => {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {(label || showValue) && (
        <div className="flex justify-between items-center">
          {label && <span className="text-label-sm text-white/70">{label}</span>}
          {showValue && <span className="text-label-sm text-white">{value}</span>}
        </div>
      )}
      <div className="relative">
        <div
          className="absolute top-1/2 -translate-y-1/2 left-0 h-1 rounded-full bg-primary-500 pointer-events-none"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="w-full relative z-10"
          style={{
            background: `linear-gradient(to right, #e50914 0%, #e50914 ${pct}%, rgba(255,255,255,0.2) ${pct}%, rgba(255,255,255,0.2) 100%)`
          }}
        />
      </div>
    </div>
  );
};

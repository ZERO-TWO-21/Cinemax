import React, { useState, useRef } from 'react';

interface RippleState {
  x: number;
  y: number;
  size: number;
  id: number;
}

interface ButtonProps {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'glass';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  iconOnly?: boolean;
  fab?: boolean;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  'aria-label'?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  iconOnly = false,
  fab = false,
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  className = '',
  type = 'button',
  'aria-label': ariaLabel,
}) => {
  const [ripples, setRipples] = useState<RippleState[]>([]);
  const btnRef = useRef<HTMLButtonElement>(null);
  const rippleCount = useRef(0);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;
    const rect = btnRef.current!.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    const id = rippleCount.current++;
    setRipples(prev => [...prev, { x, y, size, id }]);
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 600);
    onClick?.(e);
  };

  const variantClasses = {
    primary: 'bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white shadow-glow-sm hover:shadow-glow',
    secondary: 'bg-surface-800 hover:bg-surface-700 active:bg-surface-900 text-white border border-surface-700 hover:border-surface-600',
    ghost: 'bg-transparent hover:bg-white/10 active:bg-white/20 text-white border border-white/20 hover:border-white/40',
    danger: 'bg-error-500 hover:bg-error-600 active:bg-red-700 text-white',
    glass: 'glass hover:bg-white/15 active:bg-white/20 text-white',
  };

  const sizeClasses = {
    xs: 'h-7 px-3 text-xs rounded-lg gap-1',
    sm: 'h-9 px-4 text-sm rounded-xl gap-1.5',
    md: 'h-11 px-5 text-sm rounded-xl gap-2',
    lg: 'h-12 px-6 text-base rounded-2xl gap-2',
    xl: 'h-14 px-8 text-base rounded-2xl gap-2.5',
  };

  const iconOnlySizes = {
    xs: 'h-7 w-7 rounded-lg',
    sm: 'h-9 w-9 rounded-xl',
    md: 'h-11 w-11 rounded-xl',
    lg: 'h-12 w-12 rounded-2xl',
    xl: 'h-14 w-14 rounded-2xl',
  };

  const fabClasses = 'h-14 w-14 rounded-full shadow-elevation-3';

  const baseClasses = `
    relative overflow-hidden inline-flex items-center justify-center 
    font-medium transition-all duration-200 select-none cursor-pointer
    focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2
    disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none
    active:scale-[0.97]
    ${variantClasses[variant]}
    ${fab ? fabClasses : iconOnly ? iconOnlySizes[size] : sizeClasses[size]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `;

  return (
    <button
      ref={btnRef}
      type={type}
      disabled={disabled || loading}
      onClick={handleClick}
      aria-label={ariaLabel || (iconOnly && typeof children === 'string' ? children : undefined)}
      aria-busy={loading}
      className={baseClasses}
    >
      {ripples.map(r => (
        <span
          key={r.id}
          className="ripple-effect"
          style={{ left: r.x, top: r.y, width: r.size, height: r.size }}
        />
      ))}
      {loading ? (
        <span className="spinner spinner-sm" />
      ) : (
        <>
          {icon && <span className="flex-shrink-0">{icon}</span>}
          {!iconOnly && children && <span>{children}</span>}
          {iconRight && !iconOnly && <span className="flex-shrink-0">{iconRight}</span>}
        </>
      )}
    </button>
  );
};

// Icon Button Alias
export const IconButton: React.FC<Omit<ButtonProps, 'iconOnly'> & { label: string }> = ({
  label,
  ...props
}) => (
  <Button {...props} iconOnly aria-label={label} />
);

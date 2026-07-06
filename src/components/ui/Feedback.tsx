import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import type { Toast } from '../../data/movies';

// ── Toast ──────────────────────────────────────

interface ToastItemProps {
  toast: Toast;
  onRemove: (id: string) => void;
}

const icons = {
  success: <CheckCircle size={18} className="text-success-500 flex-shrink-0" />,
  error: <AlertCircle size={18} className="text-error-500 flex-shrink-0" />,
  warning: <AlertTriangle size={18} className="text-warning-500 flex-shrink-0" />,
  info: <Info size={18} className="text-accent-blue flex-shrink-0" />,
};

const borderColors = {
  success: 'border-l-4 border-l-success-500',
  error: 'border-l-4 border-l-error-500',
  warning: 'border-l-4 border-l-warning-500',
  info: 'border-l-4 border-l-accent-blue',
};

export const ToastItem: React.FC<ToastItemProps> = ({ toast, onRemove }) => {
  useEffect(() => {
    const timer = setTimeout(() => onRemove(toast.id), toast.duration || 4000);
    return () => clearTimeout(timer);
  }, [toast, onRemove]);

  return (
    <div
      className={`
        flex items-start gap-3 p-4 rounded-2xl glass-dark shadow-elevation-3 w-80 max-w-[calc(100vw-32px)]
        animate-toastIn ${borderColors[toast.type]}
      `}
      role="alert"
    >
      {icons[toast.type]}
      <p className="flex-1 text-sm text-white/90 leading-relaxed">{toast.message}</p>
      <button
        type="button"
        onClick={() => onRemove(toast.id)}
        className="text-white/30 hover:text-white/70 transition-colors flex-shrink-0"
        aria-label="Dismiss"
      >
        <X size={14} />
      </button>
    </div>
  );
};

export const ToastContainer: React.FC<{ toasts: Toast[]; onRemove: (id: string) => void }> = ({
  toasts,
  onRemove,
}) => (
  <div className="toast-container pointer-events-none">
    {toasts.map(t => (
      <div key={t.id} className="pointer-events-auto">
        <ToastItem toast={t} onRemove={onRemove} />
      </div>
    ))}
  </div>
);

// ── Modal ──────────────────────────────────────

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  hideClose?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  size = 'md',
  hideClose,
}) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape' && open) onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-[95vw] max-h-[95vh]',
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      />
      <div
        className={`
          relative w-full ${sizeClasses[size]} glass-dark rounded-3xl shadow-elevation-5
          animate-scaleIn overflow-hidden
        `}
      >
        {(title || !hideClose) && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/8">
            {title && <h2 className="text-heading-lg text-white">{title}</h2>}
            {!hideClose && (
              <button
                type="button"
                onClick={onClose}
                className="ml-auto text-white/40 hover:text-white hover:bg-white/10 p-2 rounded-xl transition-all"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            )}
          </div>
        )}
        <div className="overflow-y-auto max-h-[85vh]">{children}</div>
      </div>
    </div>
  );
};

// ── Loading Indicators ─────────────────────────

export const Spinner: React.FC<{ size?: 'sm' | 'md' | 'lg'; className?: string }> = ({
  size = 'md',
  className = '',
}) => (
  <div className={`spinner spinner-${size} ${className}`} aria-label="Loading" />
);

export const LoadingScreen: React.FC = () => (
  <div className="fixed inset-0 bg-surface-950 flex flex-col items-center justify-center z-50">
    <div className="flex flex-col items-center gap-6">
      <div className="relative">
        <div className="w-16 h-16 rounded-2xl bg-primary-500 flex items-center justify-center shadow-glow">
          <span className="text-white font-bold text-2xl tracking-tight">C</span>
        </div>
        <div className="absolute -bottom-2 -right-2 w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
      <div className="flex gap-1">
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-primary-500"
            style={{ animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite` }}
          />
        ))}
      </div>
    </div>
  </div>
);

// ── Skeleton ────────────────────────────────────

export const SkeletonCard: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`rounded-2xl overflow-hidden ${className}`}>
    <div className="skeleton aspect-movie rounded-2xl" />
    <div className="mt-3 space-y-2 px-1">
      <div className="skeleton h-4 rounded-lg w-4/5" />
      <div className="skeleton h-3 rounded-lg w-3/5" />
    </div>
  </div>
);

export const SkeletonBanner: React.FC = () => (
  <div className="skeleton aspect-banner rounded-3xl w-full" />
);

export const SkeletonText: React.FC<{ lines?: number; className?: string }> = ({
  lines = 3,
  className = '',
}) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <div
        key={i}
        className="skeleton h-3 rounded-lg"
        style={{ width: i === lines - 1 ? '60%' : '100%' }}
      />
    ))}
  </div>
);

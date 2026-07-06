import React, { useState } from 'react';
import { Play, Eye, EyeOff, Mail, Lock, User, ArrowRight, Chrome } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Checkbox } from '../components/ui/Controls';

interface AuthPageProps {
  onAuth: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onAuth }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError('Please fill in all fields'); return; }
    if (mode === 'signup' && !name) { setError('Please enter your name'); return; }
    setLoading(true);
    setError('');
    setTimeout(() => { setLoading(false); onAuth(); }, 1200);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/1117132/pexels-photo-1117132.jpeg?w=1400&h=900&fit=crop"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-950/30 to-black/50" />
      </div>

      <div className="relative w-full max-w-md px-4 py-8 z-10 animate-fadeUp">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-primary-500 flex items-center justify-center shadow-glow">
              <span className="text-white font-black text-xl">C</span>
            </div>
          </div>
          <h1 className="text-display-sm text-white mb-2">
            {mode === 'login' ? 'Welcome back' : 'Create account'}
          </h1>
          <p className="text-body-md text-white/60">
            {mode === 'login' ? 'Sign in to continue watching' : 'Start your free 30-day trial'}
          </p>
        </div>

        {/* Card */}
        <div className="glass-dark rounded-3xl p-7 shadow-elevation-5 border border-white/10">
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-error-500/10 border border-error-500/20 text-sm text-error-400 text-center animate-fadeIn">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <Input
                label="Full Name"
                placeholder="Alex Chen"
                value={name}
                onChange={setName}
                icon={<User size={16} />}
                autoFocus={mode === 'signup'}
              />
            )}
            <Input
              label="Email"
              placeholder="hello@example.com"
              value={email}
              onChange={setEmail}
              type="email"
              icon={<Mail size={16} />}
              autoFocus={mode === 'login'}
            />
            <Input
              label="Password"
              placeholder={mode === 'signup' ? 'Create a strong password' : 'Your password'}
              value={password}
              onChange={setPassword}
              type="password"
              icon={<Lock size={16} />}
            />

            {mode === 'login' && (
              <div className="flex items-center justify-between">
                <Checkbox checked={rememberMe} onChange={setRememberMe} label="Remember me" />
                <button type="button" className="text-sm text-primary-400 hover:text-primary-300 transition-colors">
                  Forgot password?
                </button>
              </div>
            )}

            {mode === 'signup' && (
              <Checkbox
                checked={rememberMe}
                onChange={setRememberMe}
                label="I agree to the Terms of Service and Privacy Policy"
              />
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
              iconRight={!loading && <ArrowRight size={18} />}
            >
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-5">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-caption text-white/30">or continue with</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Social */}
          <div className="grid grid-cols-2 gap-3">
            {['Google', 'Apple'].map(provider => (
              <button
                key={provider}
                type="button"
                onClick={onAuth}
                className="flex items-center justify-center gap-2 h-11 rounded-xl glass border border-white/15 text-white text-sm font-medium hover:bg-white/15 transition-all active:scale-95"
              >
                {provider === 'Google' ? (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                ) : (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.37.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.56-1.32 3.1-2.54 4zm-3.07-17.4c.03 2.18-1.95 4-3.91 3.85-.26-1.93 1.74-4 3.91-3.85z"/>
                  </svg>
                )}
                {provider}
              </button>
            ))}
          </div>
        </div>

        {/* Switch mode */}
        <p className="text-center text-sm text-white/50 mt-6">
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button
            type="button"
            onClick={() => setMode(m => m === 'login' ? 'signup' : 'login')}
            className="text-primary-400 hover:text-primary-300 font-semibold transition-colors"
          >
            {mode === 'login' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
};

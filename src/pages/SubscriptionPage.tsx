import React, { useState } from 'react';
import { Crown, Check, Zap, Shield, Download, Users, Sparkles } from 'lucide-react';

export const SubscriptionPage: React.FC = () => {
  const [selected, setSelected] = useState<'basic' | 'standard' | 'premium'>('premium');
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('yearly');

  const plans = [
    {
      id: 'basic' as const,
      name: 'Basic',
      icon: Shield,
      monthlyPrice: 8.99,
      yearlyPrice: 7.99,
      color: '#737373',
      features: ['Full HD (1080p)', '1 Screen', 'Mobile & Tablet', 'Unlimited Movies'],
      missing: ['4K Ultra HD', 'Downloads', 'Multiple Screens'],
    },
    {
      id: 'standard' as const,
      name: 'Standard',
      icon: Zap,
      monthlyPrice: 13.99,
      yearlyPrice: 11.99,
      color: '#0ea5e9',
      popular: true,
      features: ['Full HD (1080p)', '2 Screens', 'All Devices', 'Unlimited Movies', '5 Downloads/Month'],
      missing: ['4K Ultra HD'],
    },
    {
      id: 'premium' as const,
      name: 'Premium',
      icon: Crown,
      monthlyPrice: 17.99,
      yearlyPrice: 14.99,
      color: '#f5c518',
      features: ['4K Ultra HD + HDR', '4 Screens', 'All Devices', 'Unlimited Movies', 'Unlimited Downloads', 'Dolby Atmos', 'Early Access'],
      missing: [],
    },
  ];

  const currentPlan = plans.find(p => p.id === selected)!;
  const price = billing === 'yearly' ? currentPlan.yearlyPrice : currentPlan.monthlyPrice;
  const savings = billing === 'yearly' ? Math.round((1 - currentPlan.yearlyPrice / currentPlan.monthlyPrice) * 100) : 0;

  return (
    <div className="min-h-screen bg-surface-950 pt-20 pb-24">
      <div className="container-cinema max-w-4xl">
        {/* Header */}
        <div className="text-center mb-10 animate-fadeDown">
          <div className="inline-flex items-center gap-2 bg-accent-gold/15 border border-accent-gold/30 px-4 py-2 rounded-full mb-4">
            <Sparkles size={14} className="text-accent-gold" />
            <span className="text-sm font-semibold text-accent-gold">Unlimited Entertainment</span>
          </div>
          <h1 className="text-display-lg text-white mb-3">Choose Your Plan</h1>
          <p className="text-body-lg text-white/60 max-w-md mx-auto">
            Watch anywhere, anytime. Cancel at any time.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <button
            onClick={() => setBilling('monthly')}
            className={`text-sm font-medium px-5 py-2 rounded-full transition-all ${billing === 'monthly' ? 'bg-white text-black' : 'text-white/60 hover:text-white'}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling('yearly')}
            className={`flex items-center gap-2 text-sm font-medium px-5 py-2 rounded-full transition-all ${billing === 'yearly' ? 'bg-white text-black' : 'text-white/60 hover:text-white'}`}
          >
            Yearly
            {billing === 'yearly' && <span className="text-xs bg-success-500/20 text-success-500 px-1.5 py-0.5 rounded-full">-17%</span>}
            {billing !== 'yearly' && <span className="text-xs bg-success-500/20 text-success-500 px-1.5 py-0.5 rounded-full">Save 17%</span>}
          </button>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 animate-fadeUp">
          {plans.map(plan => {
            const Icon = plan.icon;
            const planPrice = billing === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;
            const isSelected = selected === plan.id;
            return (
              <button
                key={plan.id}
                onClick={() => setSelected(plan.id)}
                className={`
                  relative text-left p-6 rounded-3xl border-2 transition-all duration-250 active:scale-98
                  ${isSelected
                    ? 'border-primary-500 bg-primary-500/8 shadow-glow-sm'
                    : 'border-white/10 bg-white/4 hover:border-white/25 hover:bg-white/8'
                  }
                `}
              >
                {plan.popular && !isSelected && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent-blue text-white text-xs font-bold px-3 py-1 rounded-full">
                    MOST POPULAR
                  </div>
                )}
                {isSelected && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    SELECTED
                  </div>
                )}

                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: `${plan.color}20`, border: `1px solid ${plan.color}30` }}>
                    <Icon size={20} style={{ color: plan.color }} />
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'bg-primary-500 border-primary-500' : 'border-white/30'}`}>
                    {isSelected && <Check size={12} className="text-white" />}
                  </div>
                </div>

                <p className="text-heading-xl text-white mb-1">{plan.name}</p>
                <div className="flex items-end gap-1 mb-4">
                  <span className="text-3xl font-bold text-white">${planPrice}</span>
                  <span className="text-white/40 text-sm mb-1">/mo</span>
                </div>

                <div className="space-y-2">
                  {plan.features.map(f => (
                    <div key={f} className="flex items-center gap-2 text-sm text-white/80">
                      <Check size={13} className="text-success-500 flex-shrink-0" />
                      {f}
                    </div>
                  ))}
                  {plan.missing.map(f => (
                    <div key={f} className="flex items-center gap-2 text-sm text-white/30">
                      <span className="w-3 h-0.5 bg-white/20 rounded flex-shrink-0 ml-0.5" />
                      {f}
                    </div>
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button className="bg-primary-500 hover:bg-primary-600 active:scale-95 text-white font-bold text-lg px-10 py-4 rounded-full transition-all shadow-glow">
            Start {currentPlan.name} Plan – ${price}/mo
          </button>
          {savings > 0 && (
            <p className="text-success-500 text-sm mt-2">You save {savings}% with yearly billing</p>
          )}
          <p className="text-white/30 text-sm mt-3">Cancel anytime. No questions asked.</p>
        </div>

        {/* Features comparison */}
        <div className="mt-12 p-6 rounded-3xl bg-white/3 border border-white/8">
          <h3 className="text-heading-lg text-white mb-5 text-center">All plans include</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '🎬', label: 'Unlimited Movies & Shows' },
              { icon: '📱', label: 'Watch on Any Device' },
              { icon: '🔒', label: 'No Ads, Ever' },
              { icon: '🌍', label: 'Multiple Languages' },
            ].map(f => (
              <div key={f.label} className="text-center">
                <div className="text-2xl mb-2">{f.icon}</div>
                <p className="text-sm text-white/70">{f.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

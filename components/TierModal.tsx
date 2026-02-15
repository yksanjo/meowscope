'use client';

import { useState } from 'react';
import { UserTier } from './AnalysisResults';
import type { User } from '@supabase/supabase-js';
import type { Profile } from '@/lib/types/database';

interface TierModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTier: UserTier;
  onSelectTier: (tier: UserTier) => void;
  user: User | null;
  profile: Profile | null;
}

export default function TierModal({
  isOpen,
  onClose,
  currentTier,
  onSelectTier,
  user,
  profile,
}: TierModalProps) {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleUpgrade = async () => {
    if (!user) {
      alert('Please sign in first');
      return;
    }

    setLoading(true);

    try {
      // Call checkout API
      const response = await fetch('/api/checkout', {
        method: 'POST',
      });

      const { url, error } = await response.json();

      if (error) {
        alert(error);
      } else if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Upgrade error:', error);
      alert('Failed to start checkout');
    } finally {
      setLoading(false);
    }
  };

  const handleManageSubscription = async () => {
    if (!user || !profile?.stripe_customer_id) {
      alert('No subscription found');
      return;
    }

    setLoading(true);

    try {
      // Call portal API
      const response = await fetch('/api/create-portal-session', {
        method: 'POST',
      });

      const { url, error } = await response.json();

      if (error) {
        alert(error);
      } else if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Portal error:', error);
      alert('Failed to open customer portal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-[var(--shadow-premium-xl)] max-w-5xl w-full max-h-[90vh] overflow-y-auto border border-gray-200">
        <div className="p-6 sm:p-8 md:p-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
              Choose Your Plan
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-all duration-300 hover:scale-110"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <p className="text-gray-600 mb-8 text-lg">
            Unlock the full power of FGC2.3 cat vocalization analysis
          </p>

          {/* Tier Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Basic Tier */}
            <div
              className={`relative rounded-2xl border-2 p-8 transition-all duration-300 ${
                currentTier === 'basic'
                  ? 'border-purple-500 bg-purple-50 shadow-[var(--shadow-premium-md)]'
                  : 'border-gray-200 bg-white shadow-[var(--shadow-premium-sm)] hover:shadow-[var(--shadow-premium-md)]'
              }`}
            >
              {currentTier === 'basic' && (
                <div className="absolute top-4 right-4 bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                  Current
                </div>
              )}

              <div className="mb-4">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Basic</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-gray-900">Free</span>
                </div>
              </div>

              <p className="text-gray-600 mb-6">
                Perfect for casual cat owners who want to understand their cat's
                general mood
              </p>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 flex-shrink-0 mt-1">✓</span>
                  <span className="text-gray-700">
                    5 main category detection (Food, Life, Fight, Sex, Complaint)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 flex-shrink-0 mt-1">✓</span>
                  <span className="text-gray-700">Basic mood analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 flex-shrink-0 mt-1">✓</span>
                  <span className="text-gray-700">
                    FGC2.3 wheel visualization
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 flex-shrink-0 mt-1">✓</span>
                  <span className="text-gray-700">Unlimited analyses</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-300 flex-shrink-0 mt-1">✗</span>
                  <span className="text-gray-400">Detailed FGC codes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-300 flex-shrink-0 mt-1">✗</span>
                  <span className="text-gray-400">40 vocalization types</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-300 flex-shrink-0 mt-1">✗</span>
                  <span className="text-gray-400">Alternative predictions</span>
                </li>
              </ul>

              <button
                disabled={true}
                className="w-full py-3 rounded-lg font-semibold transition-all bg-gray-100 text-gray-400 cursor-not-allowed"
              >
                {currentTier === 'basic' ? 'Current Plan' : 'Downgrade'}
              </button>
            </div>

            {/* Enhanced Tier */}
            <div
              className="relative rounded-2xl border-3 p-8 bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 shadow-[var(--shadow-premium-lg)] hover:shadow-[var(--shadow-premium-xl)] transition-all duration-300 transform hover:scale-[1.02] overflow-hidden"
              style={{
                borderColor: '#9333ea',
                boxShadow: '0 8px 32px rgba(147, 51, 234, 0.25), 0 0 0 1px rgba(147, 51, 234, 0.1)'
              }}
            >
              {/* Animated gradient border effect */}
              <div className="absolute -inset-[1px] bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 rounded-2xl opacity-75 blur-sm -z-10" />

              {currentTier === 'enhanced' && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-md">
                  Current
                </div>
              )}

              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-purple-600 via-purple-500 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-black uppercase tracking-wider shadow-[var(--shadow-premium-md)] pulse-glow">
                  ⭐ Recommended
                </span>
              </div>

              <div className="mb-6 mt-4">
                <h3 className="text-3xl font-black text-gray-900 mb-3">
                  Enhanced
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-purple-600 via-purple-500 to-pink-600 bg-clip-text text-transparent">
                    $4.99
                  </span>
                  <span className="text-xl text-gray-600 font-medium">/month</span>
                </div>
              </div>

              <p className="text-gray-700 mb-6 font-medium">
                Complete scientific analysis for cat enthusiasts and
                professionals
              </p>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/50 transition-colors">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-bold mt-0.5">
                    ✓
                  </span>
                  <span className="text-gray-700 leading-relaxed font-medium">
                    Everything in Basic, plus:
                  </span>
                </li>
                <li className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/50 transition-colors">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-bold mt-0.5">
                    ✓
                  </span>
                  <span className="text-gray-700 leading-relaxed">
                    <strong className="text-gray-900">All 40 vocalization types</strong> with specific
                    classifications
                  </span>
                </li>
                <li className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/50 transition-colors">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-bold mt-0.5">
                    ✓
                  </span>
                  <span className="text-gray-700 leading-relaxed">
                    <strong className="text-gray-900">FGC2.3 codes</strong> (e.g., f140A, f360A)
                  </span>
                </li>
                <li className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/50 transition-colors">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-bold mt-0.5">
                    ✓
                  </span>
                  <span className="text-gray-700 leading-relaxed">
                    <strong className="text-gray-900">Alternative predictions</strong> with confidence
                    scores
                  </span>
                </li>
                <li className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/50 transition-colors">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-bold mt-0.5">
                    ✓
                  </span>
                  <span className="text-gray-700 leading-relaxed">
                    <strong className="text-gray-900">Detailed descriptions</strong> of each vocalization
                  </span>
                </li>
                <li className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/50 transition-colors">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-bold mt-0.5">
                    ✓
                  </span>
                  <span className="text-gray-700 leading-relaxed">Gender/age classification</span>
                </li>
                <li className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/50 transition-colors">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-bold mt-0.5">
                    ✓
                  </span>
                  <span className="text-gray-700 leading-relaxed">
                    Sound type analysis (SS/RS/CSS)
                  </span>
                </li>
              </ul>

              {currentTier === 'enhanced' ? (
                <button
                  onClick={handleManageSubscription}
                  disabled={loading}
                  className="w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-[var(--shadow-premium-md)] hover:shadow-[var(--shadow-premium-lg)] transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 relative overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10">{loading ? 'Loading...' : 'Manage Subscription'}</span>
                </button>
              ) : (
                <button
                  onClick={handleUpgrade}
                  disabled={loading}
                  className="w-full py-4 rounded-xl font-black text-lg transition-all duration-300 bg-gradient-to-r from-purple-600 via-purple-500 to-pink-600 text-white shadow-[var(--shadow-premium-md)] hover:shadow-[var(--shadow-premium-lg)] transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 relative overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10">{loading ? 'Loading...' : 'Upgrade to Enhanced'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Features Comparison */}
          <div className="mt-8 p-6 bg-gray-50 rounded-xl">
            <h4 className="font-bold text-gray-900 mb-4">
              Why Upgrade to Enhanced?
            </h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🔬</span>
                <div>
                  <div className="font-semibold text-gray-900">
                    Scientific Accuracy
                  </div>
                  <div className="text-sm text-gray-600">
                    Based on FGC2.3 research with 97.5% accuracy
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎯</span>
                <div>
                  <div className="font-semibold text-gray-900">
                    Precise Classification
                  </div>
                  <div className="text-sm text-gray-600">
                    40 distinct vocalizations vs 5 categories
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">💡</span>
                <div>
                  <div className="font-semibold text-gray-900">
                    Expert Insights
                  </div>
                  <div className="text-sm text-gray-600">
                    Understand the exact meaning behind each meow
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

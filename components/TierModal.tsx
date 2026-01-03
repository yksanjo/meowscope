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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900">
              Choose Your Plan
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <p className="text-gray-600 mb-8">
            Unlock the full power of FGC2.3 cat vocalization analysis
          </p>

          {/* Tier Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Basic Tier */}
            <div
              className={`relative rounded-xl border-2 p-6 ${
                currentTier === 'basic'
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 bg-white'
              }`}
            >
              {currentTier === 'basic' && (
                <div className="absolute top-4 right-4 bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
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
              className={`relative rounded-xl border-2 p-6 ${
                currentTier === 'enhanced'
                  ? 'border-gradient bg-gradient-to-br from-purple-50 to-pink-50'
                  : 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50'
              }`}
            >
              {currentTier === 'enhanced' && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Current
                </div>
              )}

              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                  RECOMMENDED
                </span>
              </div>

              <div className="mb-4 mt-2">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Enhanced
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    $4.99
                  </span>
                  <span className="text-gray-600">/month</span>
                </div>
              </div>

              <p className="text-gray-700 mb-6 font-medium">
                Complete scientific analysis for cat enthusiasts and
                professionals
              </p>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 flex-shrink-0 mt-1">✓</span>
                  <span className="text-gray-700 font-medium">
                    Everything in Basic, plus:
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 flex-shrink-0 mt-1">✓</span>
                  <span className="text-gray-700">
                    <strong>All 40 vocalization types</strong> with specific
                    classifications
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 flex-shrink-0 mt-1">✓</span>
                  <span className="text-gray-700">
                    <strong>FGC2.3 codes</strong> (e.g., f140A, f360A)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 flex-shrink-0 mt-1">✓</span>
                  <span className="text-gray-700">
                    <strong>Alternative predictions</strong> with confidence
                    scores
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 flex-shrink-0 mt-1">✓</span>
                  <span className="text-gray-700">
                    <strong>Detailed descriptions</strong> of each vocalization
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 flex-shrink-0 mt-1">✓</span>
                  <span className="text-gray-700">Gender/age classification</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 flex-shrink-0 mt-1">✓</span>
                  <span className="text-gray-700">
                    Sound type analysis (SS/RS/CSS)
                  </span>
                </li>
              </ul>

              {currentTier === 'enhanced' ? (
                <button
                  onClick={handleManageSubscription}
                  disabled={loading}
                  className="w-full py-3 rounded-lg font-bold transition-all bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 disabled:opacity-50"
                >
                  {loading ? 'Loading...' : 'Manage Subscription'}
                </button>
              ) : (
                <button
                  onClick={handleUpgrade}
                  disabled={loading}
                  className="w-full py-3 rounded-lg font-bold transition-all bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transform hover:scale-[1.02] disabled:opacity-50"
                >
                  {loading ? 'Loading...' : 'Upgrade to Enhanced'}
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

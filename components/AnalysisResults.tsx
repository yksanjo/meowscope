'use client';

import { FGCClass, FGC_CATEGORIES } from '@/lib/fgc-data';

export type UserTier = 'basic' | 'enhanced';

interface AnalysisResultsProps {
  primaryClass: FGCClass;
  confidence: number;
  allPredictions: Array<{ class: FGCClass; confidence: number }>;
  userTier: UserTier;
  onUpgrade: () => void;
}

export default function AnalysisResults({
  primaryClass,
  confidence,
  allPredictions,
  userTier,
  onUpgrade
}: AnalysisResultsProps) {
  const categoryData = FGC_CATEGORIES[primaryClass.category];

  return (
    <div className="w-full max-w-2xl mx-auto animate-fadeIn">
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-[var(--shadow-premium-xl)] p-8 sm:p-10 border border-purple-100">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Analysis Results
        </h2>

        {/* Primary Result - Available to all tiers */}
        <div
          className="relative rounded-2xl p-8 mb-8 border-2 shadow-[var(--shadow-premium-lg)] hover-lift overflow-hidden"
          style={{
            backgroundColor: `${categoryData.color}15`,
            borderColor: categoryData.color,
            boxShadow: `0 8px 32px ${categoryData.color}20`
          }}
        >
          {/* Animated gradient background */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent" />
          </div>

          <div className="relative z-10">
            <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
              <div>
                <div className="text-sm font-bold text-gray-600 mb-2 uppercase tracking-wider">
                  Category Detected
                </div>
                <div
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl text-white font-bold text-xl shadow-[var(--shadow-premium-md)]"
                  style={{
                    backgroundColor: categoryData.color,
                    boxShadow: `0 4px 16px ${categoryData.color}40`
                  }}
                >
                  <span className="text-3xl">
                    {primaryClass.category === 'FOOD' && '🍽️'}
                    {primaryClass.category === 'LIFE' && '😺'}
                    {primaryClass.category === 'FIGHT' && '⚔️'}
                    {primaryClass.category === 'SEX' && '💕'}
                    {primaryClass.category === 'COMPLAINT' && '🏥'}
                  </span>
                  <span>{categoryData.name}</span>
                </div>
              </div>

              <div className="text-right">
                <div className="text-sm font-bold text-gray-600 mb-2 uppercase tracking-wider">
                  Confidence
                </div>
                <div
                  className="text-4xl sm:text-5xl font-black tabular-nums"
                  style={{
                    color: categoryData.color,
                    textShadow: `0 2px 8px ${categoryData.color}30`
                  }}
                >
                  {(confidence * 100).toFixed(1)}%
                </div>
              </div>
            </div>

            <div className="pt-6 border-t-2" style={{ borderColor: `${categoryData.color}40` }}>
              <p className="text-gray-800 text-lg leading-relaxed font-medium">
                {categoryData.description}
              </p>
            </div>
          </div>
        </div>

        {/* Basic Tier Message */}
        {userTier === 'basic' && (
          <div className="relative bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 rounded-2xl p-8 border-2 border-purple-300 shadow-[var(--shadow-premium-lg)] overflow-hidden">
            {/* Animated shimmer overlay */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 animate-pulse" />

            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 text-5xl">🔒</div>
              <div className="flex-1">
                <h3 className="font-black text-gray-900 mb-3 text-2xl">
                  Unlock Premium Analysis
                </h3>
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                  Discover the exact vocalization type, behavior codes, and expert insights about your cat's communication.
                </p>

                <div className="grid sm:grid-cols-2 gap-3 mb-6">
                  <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm">
                    <span className="text-2xl">✓</span>
                    <span className="text-gray-700 font-medium">All 40 Classifications</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm">
                    <span className="text-2xl">✓</span>
                    <span className="text-gray-700 font-medium">FGC Behavior Codes</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm">
                    <span className="text-2xl">✓</span>
                    <span className="text-gray-700 font-medium">Confidence Scores</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm">
                    <span className="text-2xl">✓</span>
                    <span className="text-gray-700 font-medium">Expert Descriptions</span>
                  </div>
                </div>

                <button
                  onClick={onUpgrade}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 via-purple-500 to-pink-600 text-white rounded-xl font-black text-lg shadow-[var(--shadow-premium-lg)] hover:shadow-[var(--shadow-premium-xl)] transition-all duration-300 transform hover:scale-[1.02] relative overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <span className="text-2xl">✨</span>
                    <span>Upgrade to Enhanced - $4.99/mo</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Tier Details */}
        {userTier === 'enhanced' && (
          <>
            {/* Detailed Classification */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 mb-6 border-2 border-gray-200 shadow-[var(--shadow-premium-md)]">
              <h3 className="font-black text-gray-900 mb-6 flex items-center gap-3 text-xl">
                <span className="text-3xl">🎯</span>
                Detailed Classification
              </h3>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="p-5 bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wider">
                    FGC Code
                  </div>
                  <div className="text-2xl font-mono font-black text-purple-600">
                    {primaryClass.code}
                  </div>
                </div>
                <div className="p-5 bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wider">
                    Sound Type
                  </div>
                  <div className="text-xl font-bold text-gray-800">
                    {primaryClass.soundType === 'SS' && 'Single Sound'}
                    {primaryClass.soundType === 'RS' && 'Repeated Sequence'}
                    {primaryClass.soundType === 'CSS' && 'Complex Sequence'}
                  </div>
                </div>
                <div className="p-5 bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wider">
                    Vocalization
                  </div>
                  <div className="text-xl font-bold italic text-gray-800">
                    "{primaryClass.vocalization}"
                  </div>
                </div>
                {primaryClass.gender && (
                  <div className="p-5 bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wider">
                      Gender/Age
                    </div>
                    <div className="text-xl font-bold text-gray-800">
                      {primaryClass.gender}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-6 border-t-2 border-gray-200">
                <div className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wider">
                  Meaning
                </div>
                <div className="text-lg text-gray-800 leading-relaxed">
                  <span className="font-bold">{primaryClass.definition}:</span>{' '}
                  {primaryClass.description}
                </div>
              </div>
            </div>

            {/* Alternative Predictions */}
            {allPredictions.length > 1 && (
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border-2 border-gray-200 shadow-[var(--shadow-premium-md)]">
                <h3 className="font-black text-gray-900 mb-6 flex items-center gap-3 text-xl">
                  <span className="text-3xl">📊</span>
                  Alternative Predictions
                </h3>

                <div className="space-y-4">
                  {allPredictions.slice(1).map((pred, index) => {
                    const altCategoryData = FGC_CATEGORIES[pred.class.category];
                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between p-5 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className="w-4 h-4 rounded-full shadow-sm"
                            style={{
                              backgroundColor: altCategoryData.color,
                              boxShadow: `0 2px 8px ${altCategoryData.color}40`
                            }}
                          />
                          <div>
                            <div className="font-mono text-base font-bold text-gray-700">
                              {pred.class.code}
                            </div>
                            <div className="text-sm text-gray-600 font-medium">
                              {pred.class.definition}
                            </div>
                          </div>
                        </div>
                        <div className="text-lg font-bold text-gray-600 tabular-nums">
                          {(pred.confidence * 100).toFixed(1)}%
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

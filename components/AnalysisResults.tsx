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
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Analysis Results
        </h2>

        {/* Primary Result - Available to all tiers */}
        <div
          className="rounded-xl p-6 mb-6 border-2"
          style={{
            backgroundColor: `${categoryData.color}20`,
            borderColor: categoryData.color
          }}
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="text-sm font-semibold text-gray-600 mb-1">
                Category
              </div>
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white font-bold text-lg"
                style={{ backgroundColor: categoryData.color }}
              >
                <span className="text-2xl">
                  {primaryClass.category === 'FOOD' && '🍽️'}
                  {primaryClass.category === 'LIFE' && '😺'}
                  {primaryClass.category === 'FIGHT' && '⚔️'}
                  {primaryClass.category === 'SEX' && '💕'}
                  {primaryClass.category === 'COMPLAINT' && '🏥'}
                </span>
                {categoryData.name}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-gray-600 mb-1">
                Confidence
              </div>
              <div className="text-3xl font-bold" style={{ color: categoryData.color }}>
                {(confidence * 100).toFixed(1)}%
              </div>
            </div>
          </div>

          <div className="border-t pt-4" style={{ borderColor: categoryData.color }}>
            <p className="text-gray-700 text-lg font-medium">
              {categoryData.description}
            </p>
          </div>
        </div>

        {/* Basic Tier Message */}
        {userTier === 'basic' && (
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 text-3xl">🔒</div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-2">
                  Upgrade to Enhanced for Full Analysis
                </h3>
                <p className="text-gray-700 mb-4">
                  Get access to detailed vocalization breakdowns, specific behavior codes,
                  alternative predictions, and expert insights about your cat's communication.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center gap-2 text-gray-700">
                    <span className="text-green-500">✓</span>
                    All 40 vocalization classifications
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <span className="text-green-500">✓</span>
                    Specific behavior codes (e.g., f140A, f360A)
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <span className="text-green-500">✓</span>
                    Alternative predictions & confidence scores
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <span className="text-green-500">✓</span>
                    Detailed vocalization descriptions
                  </li>
                </ul>
                <button
                  onClick={onUpgrade}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-bold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-[1.02]"
                >
                  Upgrade to Enhanced
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Tier Details */}
        {userTier === 'enhanced' && (
          <>
            {/* Detailed Classification */}
            <div className="bg-gray-50 rounded-xl p-6 mb-6 border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-xl">🎯</span>
                Detailed Classification
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">FGC Code</div>
                  <div className="text-lg font-mono font-bold text-purple-600">
                    {primaryClass.code}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Sound Type</div>
                  <div className="text-lg font-semibold text-gray-800">
                    {primaryClass.soundType === 'SS' && 'Single Sound'}
                    {primaryClass.soundType === 'RS' && 'Repeated Sequence'}
                    {primaryClass.soundType === 'CSS' && 'Complex Sequence'}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Vocalization</div>
                  <div className="text-lg font-semibold italic text-gray-800">
                    "{primaryClass.vocalization}"
                  </div>
                </div>
                {primaryClass.gender && (
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Gender/Age</div>
                    <div className="text-lg font-semibold text-gray-800">
                      {primaryClass.gender}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600 mb-1">Meaning</div>
                <div className="text-base text-gray-800">
                  <span className="font-semibold">{primaryClass.definition}:</span>{' '}
                  {primaryClass.description}
                </div>
              </div>
            </div>

            {/* Alternative Predictions */}
            {allPredictions.length > 1 && (
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-xl">📊</span>
                  Alternative Predictions
                </h3>

                <div className="space-y-3">
                  {allPredictions.slice(1).map((pred, index) => {
                    const altCategoryData = FGC_CATEGORIES[pred.class.category];
                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg bg-white border border-gray-200"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: altCategoryData.color }}
                          />
                          <div>
                            <div className="font-mono text-sm font-semibold text-gray-700">
                              {pred.class.code}
                            </div>
                            <div className="text-xs text-gray-600">
                              {pred.class.definition}
                            </div>
                          </div>
                        </div>
                        <div className="text-sm font-semibold text-gray-600">
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

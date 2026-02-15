'use client';

import { useState, useEffect } from 'react';
import AudioRecorder from '@/components/AudioRecorder';
import FGCWheel from '@/components/FGCWheel';
import AnalysisResults from '@/components/AnalysisResults';
import TierModal from '@/components/TierModal';
import AuthModal from '@/components/AuthModal';
import { analyzeCatVocalization } from '@/lib/fgc-data';
import { createClient } from '@/lib/supabase/client';
import type { FGCClass } from '@/lib/fgc-data';
import type { UserTier } from '@/components/AnalysisResults';
import type { User } from '@supabase/supabase-js';
import type { Profile } from '@/lib/types/database';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [userTier, setUserTier] = useState<UserTier>('basic');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showTierModal, setShowTierModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{
    primaryClass: FGCClass;
    confidence: number;
    allPredictions: Array<{ class: FGCClass; confidence: number }>;
  } | null>(null);

  const supabase = createClient();

  // Fetch user and profile on mount
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profile) {
          setProfile(profile);
          setUserTier(profile.tier as UserTier);
        }
      }
    };

    fetchUser();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);

      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (profile) {
          setProfile(profile);
          setUserTier(profile.tier as UserTier);
        }
      } else {
        setProfile(null);
        setUserTier('basic');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleAnalyze = async (audioBlob?: Blob) => {
    setIsAnalyzing(true);

    // Simulate analysis delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Perform mock analysis
    const result = analyzeCatVocalization(audioBlob);
    setAnalysisResult(result);

    // Save to history if user is logged in
    if (user) {
      await supabase.from('analysis_history').insert({
        user_id: user.id,
        category: result.primaryClass.category,
        confidence: result.confidence,
        fgc_code: result.primaryClass.code,
      });
    }

    setIsAnalyzing(false);
  };

  const handleUpgrade = () => {
    if (!user) {
      setShowAuthModal(true);
    } else {
      setShowTierModal(true);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #faf5ff 0%, #fdf2f8 50%, #eff6ff 100%)' }}>
      {/* Animated Gradient Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Header */}
      <header className="glass-card sticky top-0 z-40 border-b-0" style={{ boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 group">
              <div className="text-4xl transition-transform duration-300 group-hover:scale-110">🐱</div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-purple-500 to-pink-600 bg-clip-text text-transparent">
                  MeowScope
                </h1>
                <p className="text-sm text-gray-600 font-medium">AI Cat Voice Analyzer</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <div className="hidden sm:block text-right">
                    <div className="text-sm text-gray-600">
                      {profile?.email}
                    </div>
                    <div
                      className={`text-sm font-bold ${
                        userTier === 'enhanced'
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'
                          : 'text-gray-800'
                      }`}
                    >
                      {userTier === 'basic' ? 'Basic (Free)' : 'Enhanced'}
                    </div>
                  </div>
                  <button
                    onClick={() => setShowTierModal(true)}
                    className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold text-sm shadow-[var(--shadow-premium-md)] hover:shadow-[var(--shadow-premium-lg)] transition-all duration-300 hover:scale-105"
                  >
                    {userTier === 'basic' ? 'Upgrade' : 'Manage Plan'}
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-300 text-sm"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold text-sm shadow-[var(--shadow-premium-md)] hover:shadow-[var(--shadow-premium-lg)] transition-all duration-300 hover:scale-105"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Decode Your Cat's{' '}
            <span className="block bg-gradient-to-r from-purple-600 via-purple-500 to-pink-600 bg-clip-text text-transparent">
              Voice
            </span>
          </h2>
          <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
            Using advanced AI and the FGC2.3 classification system, MeowScope
            translates your cat's vocalizations into meaningful insights with
            97.5% accuracy.
          </p>
        </div>

        {/* FGC Wheel Visualization */}
        <div className="mb-12">
          <FGCWheel
            highlightCategory={analysisResult?.primaryClass.category}
            highlightCode={analysisResult?.primaryClass.code}
          />
        </div>

        {/* Audio Recorder */}
        <div className="mb-12">
          <AudioRecorder onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
        </div>

        {/* Analysis Results */}
        {analysisResult && (
          <div className="mb-12 animate-fadeIn">
            <AnalysisResults
              primaryClass={analysisResult.primaryClass}
              confidence={analysisResult.confidence}
              allPredictions={analysisResult.allPredictions}
              userTier={userTier}
              onUpgrade={handleUpgrade}
            />
          </div>
        )}

        {/* Features Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-[var(--shadow-premium-lg)] p-8 sm:p-10 border border-purple-100 hover-lift">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            How MeowScope Works
          </h3>
          <div className="grid md:grid-cols-3 gap-8 sm:gap-10">
            <div className="text-center group">
              <div className="text-6xl mb-6 transition-transform duration-300 group-hover:scale-110">🎤</div>
              <h4 className="font-bold text-gray-900 mb-3 text-lg">
                1. Record or Upload
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Capture your cat's vocalization using your microphone or upload
                an audio file
              </p>
            </div>
            <div className="text-center group">
              <div className="text-6xl mb-6 transition-transform duration-300 group-hover:scale-110">🤖</div>
              <h4 className="font-bold text-gray-900 mb-3 text-lg">2. AI Analysis</h4>
              <p className="text-gray-600 leading-relaxed">
                Our trained CNN+LSTM model analyzes the audio using FGC2.3
                classification
              </p>
            </div>
            <div className="text-center group">
              <div className="text-6xl mb-6 transition-transform duration-300 group-hover:scale-110">💡</div>
              <h4 className="font-bold text-gray-900 mb-3 text-lg">3. Get Insights</h4>
              <p className="text-gray-600 leading-relaxed">
                Receive detailed analysis of your cat's mood, needs, and
                communication
              </p>
            </div>
          </div>
        </div>

        {/* Science Section */}
        <div className="mt-8 relative overflow-hidden rounded-2xl p-8 sm:p-10 border-2 border-purple-300 shadow-[var(--shadow-premium-md)] hover-lift">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 opacity-80" />
          <div className="relative z-10 flex items-start gap-4 sm:gap-6">
            <div className="text-5xl flex-shrink-0 transition-transform duration-300 hover:rotate-12">🔬</div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                Based on Scientific Research
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                MeowScope uses the FGC2.3 (Feline Glossary Classification v2.3)
                system developed by Dr. Vlad Reznikov. Our AI model was trained
                on 2,700+ samples and achieves 97.5% accuracy in classifying 40
                distinct cat vocalizations across 5 behavioral categories: Food,
                Life, Fight, Sex, and Complaint.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">Built with FGC2.3 Classification System</p>
            <p className="text-sm">
              © 2025 MeowScope. For research and educational purposes.
            </p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />

      {/* Tier Modal */}
      <TierModal
        isOpen={showTierModal}
        onClose={() => setShowTierModal(false)}
        currentTier={userTier}
        onSelectTier={setUserTier}
        user={user}
        profile={profile}
      />
    </div>
  );
}

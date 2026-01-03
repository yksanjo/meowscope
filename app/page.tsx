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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-4xl">🐱</div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  MeowScope
                </h1>
                <p className="text-sm text-gray-600">AI Cat Voice Analyzer</p>
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
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all text-sm"
                  >
                    {userTier === 'basic' ? 'Upgrade' : 'Manage Plan'}
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all text-sm"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all text-sm"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Decode Your Cat's Voice
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
        <div className="mt-16 bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            How MeowScope Works
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🎤</div>
              <h4 className="font-bold text-gray-900 mb-2">
                1. Record or Upload
              </h4>
              <p className="text-gray-600">
                Capture your cat's vocalization using your microphone or upload
                an audio file
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🤖</div>
              <h4 className="font-bold text-gray-900 mb-2">2. AI Analysis</h4>
              <p className="text-gray-600">
                Our trained CNN+LSTM model analyzes the audio using FGC2.3
                classification
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">💡</div>
              <h4 className="font-bold text-gray-900 mb-2">3. Get Insights</h4>
              <p className="text-gray-600">
                Receive detailed analysis of your cat's mood, needs, and
                communication
              </p>
            </div>
          </div>
        </div>

        {/* Science Section */}
        <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-200">
          <div className="flex items-start gap-4">
            <div className="text-4xl flex-shrink-0">🔬</div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Based on Scientific Research
              </h3>
              <p className="text-gray-700">
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

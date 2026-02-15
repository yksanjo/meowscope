'use client';

import { useState, useRef } from 'react';

interface AudioRecorderProps {
  onAnalyze: (audioBlob?: Blob) => void;
  isAnalyzing: boolean;
}

export default function AudioRecorder({ onAnalyze, isAnalyzing }: AudioRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string>('');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setAudioURL(url);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Could not access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAudioURL(url);
    }
  };

  const handleAnalyze = () => {
    if (audioURL) {
      fetch(audioURL)
        .then(res => res.blob())
        .then(blob => onAnalyze(blob));
    } else {
      onAnalyze();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-[var(--shadow-premium-xl)] p-8 sm:p-10 border border-purple-100">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Record or Upload Cat Vocalization
        </h2>

        {/* Recording Controls */}
        <div className="flex flex-col items-center gap-5 mb-8">
          {!isRecording ? (
            <button
              onClick={startRecording}
              disabled={isAnalyzing}
              className="flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-purple-600 via-purple-500 to-pink-600 text-white rounded-full font-bold text-lg shadow-[var(--shadow-premium-lg)] hover:shadow-[var(--shadow-premium-xl)] transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <svg className="w-7 h-7 relative z-10" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
              </svg>
              <span className="relative z-10">Start Recording</span>
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full font-bold text-lg shadow-[var(--shadow-premium-lg)] transition-all duration-300 transform hover:scale-105 relative"
            >
              <span className="w-5 h-5 bg-white rounded-full animate-pulse" style={{ boxShadow: '0 0 20px rgba(255,255,255,0.8)' }} />
              <span>Stop Recording</span>
              <span className="absolute inset-0 rounded-full animate-ping bg-red-400 opacity-20" />
            </button>
          )}

          <div className="text-gray-500 text-sm font-medium">OR</div>

          {/* File Upload */}
          <label className="flex items-center gap-3 px-8 py-4 bg-gradient-to-br from-gray-50 to-gray-100 text-gray-700 rounded-2xl font-semibold cursor-pointer hover:from-purple-50 hover:to-pink-50 transition-all duration-300 border-2 border-dashed border-gray-300 hover:border-purple-300 shadow-[var(--shadow-premium-sm)] hover:shadow-[var(--shadow-premium-md)] group">
            <svg className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <span className="group-hover:text-purple-700 transition-colors">Upload Audio File</span>
            <input
              type="file"
              accept="audio/*"
              onChange={handleFileUpload}
              className="hidden"
              disabled={isAnalyzing}
            />
          </label>
        </div>

        {/* Audio Preview */}
        {audioURL && (
          <div className="mb-8 animate-fadeIn">
            <div className="relative bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 rounded-2xl p-6 border-2 border-purple-200 shadow-[var(--shadow-premium-md)]">
              <div className="absolute top-3 right-3 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <p className="text-sm text-gray-700 mb-3 font-semibold flex items-center gap-2">
                <span className="text-lg">🎵</span>
                Audio Preview
              </p>
              <audio src={audioURL} controls className="w-full rounded-lg shadow-sm" />
            </div>
          </div>
        )}

        {/* Analyze Button */}
        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          className="w-full py-5 bg-gradient-to-r from-green-500 via-emerald-500 to-emerald-600 text-white rounded-2xl font-bold text-lg shadow-[var(--shadow-premium-lg)] hover:shadow-[var(--shadow-premium-xl)] transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden group"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative z-10 flex items-center justify-center gap-3">
            {isAnalyzing ? (
              <>
                <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Analyzing Your Cat's Voice...</span>
              </>
            ) : (
              <>
                <span className="text-2xl">✨</span>
                <span>Analyze Cat Voice</span>
              </>
            )}
          </span>
        </button>
      </div>
    </div>
  );
}

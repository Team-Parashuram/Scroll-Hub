'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Home, Lightbulb, Stars, Rocket, RefreshCcw } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import apiRequest from '@/util/apiRequest';
import Header from './Header';

const FACTS_PROMPT = 'Write 10 distinct facts about Social Media and Social Media well-being, formatted as an array of sentences. Each sentence should be a separate fact. Give them in the format of ["this is fact one", "this is fact two",] like this don\'t write anything else.';
const GEMINI_MODEL = 'gemini-1.5-flash';

// Floating star component for background animation
const FloatingStar = ({ delay = 0 }) => (
  <div 
    className="absolute animate-float opacity-50"
    style={{
      animationDelay: `${delay}s`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`
    }}
  >
    <Stars className="text-purple-300/30" size={Math.random() * 20 + 10} />
  </div>
);

const FactsSkeleton = () => (
  <div className="bg-purple-900/50 backdrop-blur-sm rounded-xl p-6 text-center animate-pulse">
    <div className="flex items-center justify-center gap-3 mb-4">
      <div className="w-6 h-6 bg-purple-700 rounded-full"></div>
      <div className="h-6 w-32 bg-purple-700 rounded"></div>
    </div>
    <div className="h-6 w-full bg-purple-700 rounded mb-2"></div>
    <div className="h-6 w-3/4 mx-auto bg-purple-700 rounded"></div>
  </div>
);

const NotFound = () => {
  const [isClient, setIsClient] = useState(false);
  const [factsResult, setFactsResult] = useState<{
    success: boolean;
    data?: string[];
    error?: string;
  }>({ success: false });
  const [isLoading, setIsLoading] = useState(true);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const apiKeyRef = useRef<string>('');
  const [showRocket, setShowRocket] = useState(false);

  useEffect(() => {
    const fetchAPIKey = async () => {
      try {
        const res = await apiRequest.get('/ai');
        if (res.status === 200 && res.data?.data) {
          apiKeyRef.current = res.data.data;
          fetchFacts();
        } else {
          throw new Error('Invalid API key response');
        }
      } catch (error) {
        console.error('Error fetching API key:', error);
        setIsLoading(false);
      }
    };

    const fetchFacts = async () => {
      if (!apiKeyRef.current) {
        setFactsResult({ success: false, error: 'API configuration error' });
        setIsLoading(false);
        return;
      }

      try {
        const genAI = new GoogleGenerativeAI(apiKeyRef.current);
        const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

        const chatSession = model.startChat({
          generationConfig: {
            temperature: 0.7,
            topP: 0.9,
            maxOutputTokens: 8192,
          },
        });

        const result = await chatSession.sendMessage(FACTS_PROMPT);
        const responseText = await result.response.text();

        try {
          const parsedFacts = JSON.parse(responseText);
          if (!Array.isArray(parsedFacts)) throw new Error('Invalid response format');
          setFactsResult({ success: true, data: parsedFacts });
        } catch (parseError) {
          console.error('Error parsing facts:', parseError);
          setFactsResult({ success: false, error: 'Could not parse facts' });
        }
      } catch (error) {
        console.error('Error fetching facts:', error);
        setFactsResult({ success: false, error: 'Failed to fetch facts' });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAPIKey();
    setIsClient(true);
    
    // Show rocket animation after a delay
    setTimeout(() => setShowRocket(true), 1000);
  }, []);

  const nextFact = () => {
    if (factsResult.data) {
      if (factsResult.data) {
        setCurrentFactIndex((prev) => (prev + 1) % 10);
      }
    }
  };

  if (!isClient) return null;

  return (
    <div>
      <Header />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-950 to-purple-950 px-4 overflow-hidden relative">
        {/* Animated background stars */}
        {[...Array(20)].map((_, i) => (
          <FloatingStar key={i} delay={i * 0.5} />
        ))}

        {/* Animated rocket */}
        <div className={`absolute transition-all duration-1000 ${showRocket ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'}`}>
          <Rocket className="text-purple-400 animate-pulse" size={48} />
        </div>

        <div className="text-center space-y-6 z-10 relative max-w-2xl w-full">
          <h1 className="text-[10rem] md:text-[16rem] font-black text-purple-900/20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 select-none animate-pulse" aria-hidden="true">
            404
          </h1>
          
          <div className="relative space-y-6 backdrop-blur-sm bg-purple-950/30 p-8 rounded-2xl border border-purple-500/20">
            <h2 className="relative text-4xl md:text-6xl font-bold text-purple-100 tracking-tight">
              Cosmic Expedition Interrupted
            </h2>
            
            <p className="text-base md:text-xl text-purple-200/90 max-w-xl mx-auto">
              Your spacecraft has drifted beyond the charted coordinates. The destination remains uncharted in this corner of the digital universe.
            </p>

            <div className="flex flex-wrap justify-center gap-4 my-8">
              <button
                onClick={() => window.history.back()}
                className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl shadow-lg hover:bg-purple-700 hover:shadow-xl transition duration-300 group"
                aria-label="Go Back"
              >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                Reverse Trajectory
              </button>

              <Link
                href="/"
                className="flex items-center gap-2 px-6 py-3 bg-purple-200/20 text-purple-100 rounded-xl shadow-lg hover:bg-purple-300/30 hover:shadow-xl transition duration-300 group"
                aria-label="Go to Home"
              >
                <Home size={20} className="group-hover:rotate-12 transition-transform" />
                Mission Control
              </Link>
            </div>

            {isLoading ? (
              <FactsSkeleton />
            ) : factsResult.data ? (
              <div className="bg-purple-900/50 backdrop-blur-sm rounded-xl p-6 text-center transform hover:scale-105 transition-transform">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Lightbulb className="text-purple-300 animate-pulse" size={24} />
                  <h3 className="text-2xl font-semibold text-purple-100">
                    Cosmic Trivia
                  </h3>
                </div>
                <p className="text-xl text-purple-200 font-medium mb-4">
                  {factsResult.data[currentFactIndex]}
                </p>
                <button
                  onClick={nextFact}
                  className="flex items-center gap-2 mx-auto px-4 py-2 bg-purple-500/20 rounded-lg hover:bg-purple-500/30 transition-colors"
                >
                  <RefreshCcw size={16} />
                  Next Fact
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Home, Lightbulb } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Metadata } from 'next';

const FACTS_PROMPT = 'Write 10 distinct facts about Social Media and Social Media well-being, formatted as an array of sentences. Each sentence should be a separate fact. Give them in the format of ["this is fact one", "this is fact two",] like this don\'t write anything else.';
const GEMINI_MODEL = "gemini-1.5-flash";

interface StarConfig {
  id: number;
  top: number;
  left: number;
  size: number;
}

interface FactsFetchResult {
  success: boolean;
  data?: string[];
  error?: string;
}

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
  const [factsResult, setFactsResult] = useState<FactsFetchResult>({ 
    success: false 
  });
  const [isLoading, setIsLoading] = useState(true);

  const stars = useMemo(() => 
    Array.from({ length: 75 }, (_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 4 + 1,
    })), 
  []);

  const backgroundStars = useMemo(() => 
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 8 + 2,
    })), 
  []);

  useEffect(() => {
    setIsClient(true);
    const fetchFacts = async () => {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      
      if (!apiKey) {
        setFactsResult({
          success: false,
          error: "API configuration error"
        });
        setIsLoading(false);
        return;
      }

      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

        const chatSession = model.startChat({
          generationConfig: {
            temperature: 0.7,
            topP: 0.9,
            maxOutputTokens: 8192,
          }
        });

        const result = await chatSession.sendMessage(FACTS_PROMPT);
        const responseText = await result.response.text();

        try {
          const parsedFacts = JSON.parse(responseText);
          
          if (!Array.isArray(parsedFacts)) {
            throw new Error("Invalid response format");
          }

          setFactsResult({
            success: true,
            data: parsedFacts
          });
        } catch (parseError) {
          setFactsResult({
            success: false,
            error: "Could not parse facts"
          });
        }
      } catch (error) {
        setFactsResult({
          success: false,
          error: "Failed to fetch facts"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchFacts();
  }, []);

  if (!isClient) return null;

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-950 to-purple-950 px-4 overflow-hidden relative"
      aria-label="404 Not Found Page"
    >
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute bg-white/80 rounded-full opacity-70 animate-twinkle"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }} 
        />
      ))}

      <div className="absolute inset-0 pointer-events-none">
        {backgroundStars.map((star) => (
          <div
            key={star.id}
            className="absolute bg-purple-200/20 dark:bg-purple-500/10 rounded-full animate-pulse"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
            }} 
          />
        ))}
      </div>

      <div className="text-center space-y-6 z-10 relative max-w-2xl w-full">
        <div className="relative mb-8">
          <h1
            className="text-[10rem] md:text-[16rem] font-black text-purple-900/20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 select-none"
            aria-hidden="true"
          >
            404
          </h1>
          <h2 className="relative text-4xl md:text-6xl font-bold text-purple-100 tracking-tight flex items-center justify-center gap-4">
            Cosmic Expedition Interrupted
          </h2>
        </div>

        <p className="text-base md:text-xl text-purple-200/90 max-w-xl mx-auto mb-10">
          Your spacecraft has drifted beyond the charted coordinates. The destination remains uncharted in this corner of the digital universe.
        </p>

        <div className="flex justify-center space-x-4 mb-10">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-purple-600 text-white rounded-xl shadow-lg hover:bg-purple-700 hover:shadow-xl transition duration-300 group"
            aria-label="Go Back"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Reverse Trajectory
          </button>

          <Link
            href="/"
            className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-purple-200/20 text-purple-100 rounded-xl shadow-lg hover:bg-purple-300/30 hover:shadow-xl transition duration-300 group"
            aria-label="Go to Home"
          >
            <Home size={20} className="group-hover:rotate-12 transition-transform" />
            Mission Control
          </Link>
        </div>

        {isLoading ? (
          <FactsSkeleton />
        ) : factsResult.data ? (
          <div className="bg-purple-900/50 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Lightbulb className="text-purple-300" size={24} />
              <h3 className="text-2xl font-semibold text-purple-100">Cosmic Trivia</h3>
            </div>
            <p className="text-xl text-purple-200 font-medium">
              {factsResult.data[Math.floor(Math.random() * factsResult.data.length)]}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};



export default NotFound;
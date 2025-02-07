'use client'

import React from 'react';
import { Rocket } from 'lucide-react';

const CosmicLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-indigo-950 to-purple-950">
      <div className="relative flex flex-col items-center">
        <div className="animate-pulse">
          <Rocket 
            size={64} 
            className="text-purple-400 animate-[rocket_2s_cubic-bezier(0.45,0,0.55,1)_infinite]" 
          />
        </div>
        <div className="mt-4 text-purple-200 text-lg tracking-wider animate-pulse">
          Launching Mission...
        </div>
        
        {/* Starry Background */}
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/60 rounded-full opacity-50"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animation: 'twinkle 2s infinite alternate',
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <style jsx global>{`
        @keyframes rocket {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-30px); }
        }
        @keyframes twinkle {
          from { opacity: 0.2; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default CosmicLoader;
'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import VideoFeed from '@/components/VideoFeed';
import { apiClient } from '@/lib/apiClient';
import { Alert, AlertDescription } from '@/components/ui/alert';
import CosmicLoader from '@/components/Loader';

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res: any = await apiClient.getVideos();
        setVideos(res.data);
      } catch (error) {
        console.error('Error fetching videos:', error);
        setError('Failed to load videos. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-purple-950">
      {/* Sticky Header */}
      <nav className="sticky top-0 z-50 border-b border-purple-700/30 bg-purple-900/20 backdrop-blur-lg">
        <div className="container mx-auto">
          <Header />
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-purple-100 mb-4">
            Discover Amazing Videos
          </h1>
          <p className="text-purple-200/80 text-lg max-w-2xl mx-auto">
            Explore a universe of creative content shared by our community
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center min-h-[200px]">
            <div className="flex flex-col items-center space-y-4">
              <CosmicLoader />
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <Alert
            variant="destructive"
            className="mb-8 bg-red-900/20 border-red-700/50"
          >
            <AlertDescription className="text-red-200">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Video Feed */}
        {!isLoading && !error && videos.length > 0 && (
          <div className="fade-in">
            <VideoFeed videos={videos} />
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && videos.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-purple-900/20 backdrop-blur-sm border border-purple-700/50 rounded-xl p-8 max-w-md mx-auto">
              <h2 className="text-xl font-semibold text-purple-100 mb-2">
                No Videos Yet
              </h2>
              <p className="text-purple-200/80 mb-4">
                Be the first to share an amazing video with the community!
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

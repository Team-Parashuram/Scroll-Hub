/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect, useState, useRef } from 'react';
import { apiClient } from '@/lib/apiClient';
import CosmicLoader from '@/components/Loader';
import { IKVideo } from 'imagekitio-next';
import Header from '@/components/Header';

export default function Home() {
  const [videos, setVideos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res: any = await apiClient.getVideos();
        console.log("Fetched Videos:", res.data);
        if (Array.isArray(res.data) && res.data.length > 0) {
          setVideos([...res.data, ...res.data]); // Duplicate videos for looping
        } else {
          setError('No videos available.');
        }
      } catch (error) {
        console.error('Error fetching videos:', error);
        setError('Failed to load videos.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      {isLoading && (
        <div className="flex items-center justify-center min-h-screen">
          <CosmicLoader />
        </div>
      )}

      {error && (
        <div className="text-center text-red-500 text-lg mt-10">{error}</div>
      )}

      {!isLoading && !error && videos.length > 0 && (
        <div ref={containerRef} className="h-screen overflow-y-auto snap-y snap-mandatory">
          {videos.map((video, index) => (
            <div key={index} className="h-screen flex snap-center justify-center items-center">
              <div className="w-full h-full flex justify-center items-center p-4">
                <IKVideo
                  path={video.videoUrl}
                  transformation={[{ height: '720', width: '480' }]}
                  controls
                  autoPlay
                  loop
                  muted
                  className="w-3/4 h-3/4 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
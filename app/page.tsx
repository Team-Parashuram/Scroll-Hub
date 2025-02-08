/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import VideoFeed from "@/components/VideoFeed";
import { apiClient } from "@/lib/apiClient";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res: any = await apiClient.getVideos();
        console.log(res)
        setVideos(res.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">ImageKit ReelsPro</h1>
      <VideoFeed videos={videos} />
    </main>
  );
}
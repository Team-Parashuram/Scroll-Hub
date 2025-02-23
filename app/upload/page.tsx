'use client';

import { Upload, Video, Sparkles, Shield, Lightbulb } from 'lucide-react';
import VideoUploadForm from '@/components/VideoUploadForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function VideoUploadPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-indigo-950 flex flex-col">
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
          {/* Upload Form Section - Left Side */}
          <div className="lg:col-span-7">
            <Card className="bg-black/40 backdrop-blur-sm border-purple-900/50 h-full">
              <CardHeader className="text-center">
                <div className="flex items-center justify-center space-x-3 mb-2">
                  <Video className="h-8 w-8 text-purple-400" />
                  <CardTitle className="text-3xl font-bold text-purple-200">
                    Upload New Reel
                  </CardTitle>
                </div>
                <CardDescription className="text-purple-300">
                  Share your cosmic creation with the universe
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-black/60 rounded-lg p-6 border border-purple-800/30">
                  <div className="flex items-center justify-center mb-6">
                    <div className="rounded-full bg-purple-900/30 p-4">
                      <Upload className="h-8 w-8 text-purple-400" />
                    </div>
                  </div>
                  <VideoUploadForm />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Requirements Section - Right Side */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Upload Guidelines */}
            <Card className="bg-black/40 backdrop-blur-sm border-purple-900/50">
              <CardHeader className="flex flex-row items-center gap-2">
                <Shield className="h-5 w-5 text-purple-400" />
                <CardTitle className="text-lg text-purple-200">
                  Upload Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent className="text-purple-300">
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <div className="h-2 w-2 rounded-full bg-purple-500" />
                    <span>Maximum file size: 100MB</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="h-2 w-2 rounded-full bg-purple-500" />
                    <span>Supported formats: MP4, MOV</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="h-2 w-2 rounded-full bg-purple-500" />
                    <span>Maximum duration: 3 minutes</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="h-2 w-2 rounded-full bg-purple-500" />
                    <span>Minimum duration: 1 minutes</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Tips Section */}
            <Card className="bg-black/40 backdrop-blur-sm border-purple-900/50">
              <CardHeader className="flex flex-row items-center gap-2">
                <Lightbulb className="h-5 w-5 text-purple-400" />
                <CardTitle className="text-lg text-purple-200">
                  Tips for Better Reels
                </CardTitle>
              </CardHeader>
              <CardContent className="text-purple-300">
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <div className="h-2 w-2 rounded-full bg-purple-500" />
                    <span>Use high-quality lighting</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="h-2 w-2 rounded-full bg-purple-500" />
                    <span>Use proper tags</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="h-2 w-2 rounded-full bg-purple-500" />
                    <span>Keep content engaging and concise</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="h-2 w-2 rounded-full bg-purple-500" />
                    <span>Add relevant tags for better reach</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Community Guidelines */}
            <Card className="bg-black/40 backdrop-blur-sm border-purple-900/50">
              <CardHeader className="flex flex-row items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-400" />
                <CardTitle className="text-lg text-purple-200">
                  Community Standards
                </CardTitle>
              </CardHeader>
              <CardContent className="text-purple-300">
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <div className="h-2 w-2 rounded-full bg-purple-500" />
                    <span>Respect intellectual property rights</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="h-2 w-2 rounded-full bg-purple-500" />
                    <span>Fully Secure Database for Videos and Information</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="h-2 w-2 rounded-full bg-purple-500" />
                    <span>No explicit or harmful content</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="h-2 w-2 rounded-full bg-purple-500" />
                    <span>Be mindful of community guidelines</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
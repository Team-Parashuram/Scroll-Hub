"use client";

import { Upload, Video  } from "lucide-react";
import VideoUploadForm from "@/components/VideoUploadForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";

export default function VideoUploadPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-purple-950 flex flex-col">
      <nav className="p-4 bg-purple-900/20 backdrop-blur-sm">
        <Header />
      </nav>

      {/* Main Content */}
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Card className="bg-purple-900/20 backdrop-blur-sm border-purple-700/50">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-2">
                <Video className="h-8 w-8 text-purple-300" />
                <CardTitle className="text-3xl font-bold text-purple-100">
                  Upload New Reel
                </CardTitle>
              </div>
              <CardDescription className="text-purple-200">
                Share your cosmic creation with the universe
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-purple-800/10 rounded-lg p-6 border border-purple-600/30">
                <div className="flex items-center justify-center mb-6">
                  <div className="rounded-full bg-purple-700/30 p-4">
                    <Upload className="h-8 w-8 text-purple-300" />
                  </div>
                </div>
                <VideoUploadForm />
              </div>
            </CardContent>
          </Card>

          {/* Additional Information Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-purple-900/20 backdrop-blur-sm border-purple-700/50">
              <CardHeader>
                <CardTitle className="text-lg text-purple-100">Upload Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="text-purple-200">
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                    <span>Maximum file size: 100MB</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                    <span>Supported formats: MP4, MOV</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                    <span>Maximum duration: 3 minutes</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-purple-900/20 backdrop-blur-sm border-purple-700/50">
              <CardHeader>
                <CardTitle className="text-lg text-purple-100">Tips for Better Reels</CardTitle>
              </CardHeader>
              <CardContent className="text-purple-200">
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                    <span>Use high-quality lighting</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                    <span>Keep content engaging and concise</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                    <span>Add relevant tags for better reach</span>
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
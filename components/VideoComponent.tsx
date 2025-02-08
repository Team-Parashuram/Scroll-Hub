import React from 'react';
import { IVideo } from "@/Model/video.model";
import { IKVideo } from "imagekitio-next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function VideoComponent({ video }: { video: IVideo }) {
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <Card className="group overflow-hidden bg-purple-900/20 backdrop-blur-sm border-purple-700/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/20 w-full max-w-xs mx-auto">
      <div 
        className="relative w-full"
        style={{ aspectRatio: "9/16", maxHeight: "360px" }}
      >
          <div className="relative w-full h-full rounded-t-lg overflow-hidden">
            {isLoading && (
              <Skeleton className="absolute inset-0 bg-purple-800/50" />
            )}
            
            <IKVideo
              path={video.videoUrl}
              transformation={[
                {
                  height: "640",
                  width: "360",
                }
              ]}
              controls={video.controls}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              onLoad={() => setIsLoading(false)}
            />
          </div>
      </div>

      <CardContent className="p-3">
        <Link href={`/videos/${video._id}`}>
          <h2 className="text-base font-semibold text-purple-100 line-clamp-1 hover:text-purple-300 transition-colors">
            {video.title}
          </h2>
        </Link>
        
        <p className="mt-1.5 text-sm text-purple-200/80 line-clamp-2">
          {video.description}
        </p>
      </CardContent>
    </Card>
  );
}
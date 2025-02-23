import React from 'react';
import { IKVideo } from 'imagekitio-next';
import { IVideo } from '@/Model/video.model';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2Icon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { apiClient } from '@/lib/apiClient';

export default function VideoComponent({ video }: { video: IVideo }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isHovered, setIsHovered] = React.useState(false);
  const { data: session } = useSession();
  const videoRef = React.useRef<HTMLDivElement>(null);

  const handleDelete = async () => {
    try {
      if (video._id) {
        await apiClient.deleteVideo(video._id.toString());
        toast.success('Video deleted successfully');
      } else {
        toast.error('Video ID is missing');
      }
    } catch (error) {
      console.error('Failed to delete video', error);
      toast.error('Failed to delete video');
    }
  };

  const canDelete = session && video.userId?.toString() === session.user.id && video._id;

  // Handle mouse enter/leave only when not touching the video player
  const handleMouseEvent = (event: React.MouseEvent) => {
    if (!(event.target as HTMLElement).closest('.video-player')) {
      setIsHovered(event.type === 'mouseenter');
    }
  };

  return (
    <Card
      className="relative overflow-hidden bg-purple-900/20 backdrop-blur-sm border-purple-700/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 w-full max-w-xs mx-auto"
      onMouseEnter={handleMouseEvent}
      onMouseLeave={handleMouseEvent}
      ref={videoRef}
    >
      <div
        className="relative w-full"
        style={{ aspectRatio: '9/16', maxHeight: '360px' }}
      >
        <div className="relative w-full h-full rounded-t-lg overflow-hidden">
          {isLoading && (
            <Skeleton className="absolute inset-0 bg-purple-800/50 animate-pulse" />
          )}

          <div className="video-player relative w-full h-full">
            <IKVideo
              path={video.videoUrl}
              transformation={[
                {
                  height: '640',
                  width: '360',
                },
              ]}
              controls={true}
              className="w-full h-full object-cover"
              onLoad={() => setIsLoading(false)}
            />
          </div>

          {/* Gradient overlay - only show on text area hover */}
          <div 
            className={`absolute inset-0 bg-gradient-to-t from-purple-900/80 via-transparent to-transparent transition-opacity duration-300 pointer-events-none ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>
      </div>

      <CardContent className="relative p-4">
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1">
            <h2 className="text-base font-semibold text-purple-100 line-clamp-1 transition-colors">
              {video.title}
            </h2>
            <p className="mt-2 text-sm text-purple-200/80 line-clamp-2">
              {video.description}
            </p>
          </div>

          {canDelete && (
            <button
              onClick={handleDelete}
              className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
                isHovered
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-purple-800/50 hover:bg-purple-700/50'
              }`}
              aria-label="Delete video"
            >
              <Trash2Icon
                className={`w-4 h-4 transition-colors duration-300 ${
                  isHovered ? 'text-white' : 'text-purple-300'
                }`}
              />
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
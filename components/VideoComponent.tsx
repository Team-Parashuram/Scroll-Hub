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

  const handleDelete = async () => {
    try {
      if (video._id) {
        await apiClient.deleteVideo(video._id.toString());
      } else {
        toast.error('Video ID is missing');
      }
      toast.success('Video deleted successfully');
    } catch (error) {
      console.error('Failed to delete video', error);
      toast.error('Failed to delete video');
    }
  };

  const canDelete = session && video.userId?.toString() === session.user.id && video._id;

  return (
    <Card
      className="group relative overflow-hidden bg-purple-900/20 backdrop-blur-sm border-purple-700/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/20 w-full max-w-xs mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="relative w-full"
        style={{ aspectRatio: '9/16', maxHeight: '360px' }}
      >
        <div className="relative w-full h-full rounded-t-lg overflow-hidden">
          {isLoading && (
            <Skeleton className="absolute inset-0 bg-purple-800/50 animate-pulse" />
          )}

          <IKVideo
            path={video.videoUrl}
            transformation={[
              {
                height: '640',
                width: '360',
              },
            ]}
            controls={video.controls}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onLoad={() => setIsLoading(false)}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>

      <CardContent className="relative p-4">
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1">
            <h2 className="text-base font-semibold text-purple-100 line-clamp-1 group-hover:text-purple-300 transition-colors">
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
import { IVideo } from '@/Model/video.model';
import VideoComponent from './VideoComponent';

export default function VideoFeed({ videos }: { videos: IVideo[] }) {
  return (
    <div className="relative">
      {videos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in">
          {videos.map((video) => (
            <VideoComponent key={video._id?.toString()} video={video} />
          ))}
        </div>
      ) : (
        <div className="col-span-full min-h-[200px] flex items-center justify-center">
          <div className="bg-purple-900/20 backdrop-blur-sm border border-purple-700/50 rounded-lg p-8">
            <p className="text-purple-200/70 text-lg">No videos found</p>
          </div>
        </div>
      )}
    </div>
  );
}

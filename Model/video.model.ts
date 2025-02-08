import mongoose from 'mongoose';

export const VIDEO_DIMENSIONs = {
  width: 1080,
  height: 1920,
} as const;

export interface IVideo {
  _id?: mongoose.Types.ObjectId;
  data?: Buffer;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  controls?: boolean;
  transforamtion?: {
    width: number;
    height: number;
    quality?: number;
  };
}

const videoSchema = new mongoose.Schema<IVideo>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    videoUrl: {
      type: String,
      required: [true, 'Video URL is required'],
      trim: true,
    },
    thumbnailUrl: {
      type: String,
      required: [true, 'Thumbnail URL is required'],
      trim: true,
    },
    controls: {
      type: Boolean,
      default: true,
    },
    transforamtion: {
      width: {
        type: Number,
        default: VIDEO_DIMENSIONs.width,
      },
      height: {
        type: Number,
        default: VIDEO_DIMENSIONs.height,
      },
      quality: {
        type: Number,
        min: 1,
        max: 100,
      },
    },
  },
  {
    timestamps: true,
  },
);

const Video =
  mongoose.models?.Video || mongoose.model<IVideo>('Video', videoSchema);
export default Video;

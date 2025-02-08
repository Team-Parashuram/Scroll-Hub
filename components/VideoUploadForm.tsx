"use client";

import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import FileUpload from "@/app/component/FileUpload";
import { apiClient } from "@/lib/apiClient";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import CosmicLoader from "./Loader";

export default function VideoUploadForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});

  const handleUploadSuccess = (response: IKUploadResponse) => {
    setVideoUrl(response.filePath);
    setThumbnailUrl(response.thumbnailUrl || response.filePath);
  };

  const handleUploadProgress = (progress: number) => {
    setUploadProgress(progress);
  };

  const validateForm = () => {
    const newErrors: { title?: string; description?: string } = {};
    if (!title) newErrors.title = "Title is required";
    if (!description) newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !videoUrl) return;

    setLoading(true);
    try {
      await apiClient.createVideo({ title, description, videoUrl, thumbnailUrl });
      setTitle("");
      setDescription("");
      setVideoUrl("");
      setThumbnailUrl("");
      setUploadProgress(0);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="form-control">
        <label className="label">Title</label>
        <input
          type="text"
          className={`input input-bordered ${errors.title ? "input-error" : ""}`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <span className="text-error text-sm mt-1">{errors.title}</span>}
      </div>

      <div className="form-control">
        <label className="label">Description</label>
        <textarea
          className={`textarea textarea-bordered h-24 ${errors.description ? "textarea-error" : ""}`}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {errors.description && <span className="text-error text-sm mt-1">{errors.description}</span>}
      </div>

      <div className="form-control">
        <label className="label">Upload Video</label>
        <FileUpload fileType="video" onSuccess={handleUploadSuccess} onProgress={handleUploadProgress} />
        {/* {uploadProgress > 0 && (
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div
              className="bg-primary h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        )} */}
      </div>

      <button type="submit" className="btn btn-primary btn-block" disabled={loading || !uploadProgress}>
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            <CosmicLoader />
          </>
        ) : (
          "Publish Video"
        )}
      </button>
    </form>
  );
}

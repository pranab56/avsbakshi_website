"use client";

import { Loader2, Trash2, Upload } from "lucide-react";

interface StepMediaProps {
  formData: {
    photos: string[];
  };
  handleMultiplePhotosUpload: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleRemovePhoto: (url: string) => void;
  isUploading: boolean;
}

export default function StepMedia({
  formData,
  handleMultiplePhotosUpload,
  handleRemovePhoto,
  isUploading,
}: StepMediaProps) {
  return (
    <div className="space-y-5 animate-in fade-in duration-200 pt-2">
      <div className="space-y-3">
        <label className="text-xs font-semibold text-foreground block">
          Salon Interior &amp; Gallery Photos
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {formData.photos.map((photoUrl, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-2xl overflow-hidden border border-border group bg-accent/40 shadow-xs"
            >
              <img
                src={photoUrl}
                alt={`Salon photo ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <button
                type="button"
                onClick={() => handleRemovePhoto(photoUrl)}
                className="absolute top-2 right-2 bg-destructive/80 hover:bg-destructive text-white p-1.5 rounded-full backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}

          <label className="border-2 border-dashed border-border hover:border-primary/60 bg-accent/20 hover:bg-accent/40 rounded-2xl aspect-square flex flex-col items-center justify-center p-3 cursor-pointer transition-all text-center group">
            {isUploading ? (
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            ) : (
              <>
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                  <Upload className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-semibold text-foreground">
                  Upload Photos
                </span>
              </>
            )}
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleMultiplePhotosUpload}
              className="hidden"
              disabled={isUploading}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

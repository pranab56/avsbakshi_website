"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Plus, X, Upload, Trash2, CheckCircle2 } from "lucide-react";

interface PortfolioItem {
  id: string;
  url: string;
  title?: string;
}

const INITIAL_IMAGES: PortfolioItem[] = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    title: "Balayage & Styling",
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80",
    title: "Salon Station",
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80",
    title: "Bridal Makeup",
  },
  {
    id: "4",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    title: "Editorial Look",
  },
  {
    id: "5",
    url: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80",
    title: "Facial Treatment",
  },
  {
    id: "6",
    url: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=600&q=80",
    title: "Soft Waves",
  },
  {
    id: "7",
    url: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=600&q=80",
    title: "Nail Art",
  },
  {
    id: "8",
    url: "https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&w=600&q=80",
    title: "Glam Makeup",
  },
  {
    id: "9",
    url: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80",
    title: "Styling Studio",
  },
];

export default function ProfessionalPortfolioPage() {
  const [images, setImages] = useState<PortfolioItem[]>(INITIAL_IMAGES);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<PortfolioItem | null>(null);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddImage = (e: React.FormEvent) => {
    e.preventDefault();
    const imageToAdd =
      newImageUrl.trim() ||
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=600&q=80";

    const newItem: PortfolioItem = {
      id: `img-${Date.now()}`,
      url: imageToAdd,
      title: newTitle || "New Hair & Beauty Look",
    };

    setImages((prev) => [...prev, newItem]);
    setUploadSuccess(true);

    setTimeout(() => {
      setUploadSuccess(false);
      setIsAddModalOpen(false);
      setNewImageUrl("");
      setNewTitle("");
    }, 1000);
  };

  const handleDeleteImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
    setSelectedImage(null);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="font-serif italic font-normal text-3xl sm:text-4xl text-[#2C2E33]">
            Portfolio
          </h1>
          <p className="text-xs sm:text-sm text-[#787570] font-normal tracking-wide">
            {images.length} images
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#B78735] hover:bg-[#8F6929] active:scale-[0.98] text-white px-5 py-2.5 rounded-md font-medium text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition-all shadow-2xs self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Image</span>
        </button>
      </div>

      {/* Portfolio Responsive Custom Masonry / CSS Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Item 1: Large Featured Card (Spans 2 cols and 2 rows on desktop) */}
        {images[0] && (
          <div
            onClick={() => setSelectedImage(images[0])}
            className="lg:col-span-2 lg:row-span-2 relative min-h-[300px] sm:min-h-[360px] lg:min-h-[460px] rounded-2xl overflow-hidden bg-[#E0D9CE] border border-[#E3DDD3]/70 group cursor-pointer shadow-xs hover:border-[#B78735] transition-all"
          >
            <Image
              src={images[0].url}
              alt={images[0].title || "Portfolio Work"}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              unoptimized
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <span className="text-white font-medium text-xs sm:text-sm bg-black/40 px-3 py-1 rounded-full backdrop-blur-xs">
                {images[0].title || "Featured Work"}
              </span>
            </div>
          </div>
        )}

        {/* Remaining Images in Grid */}
        {images.slice(1).map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedImage(item)}
            className="relative h-52 sm:h-56 lg:h-56 rounded-2xl overflow-hidden bg-[#E0D9CE] border border-[#E3DDD3]/70 group cursor-pointer shadow-xs hover:border-[#B78735] transition-all"
          >
            <Image
              src={item.url}
              alt={item.title || "Portfolio Work"}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              unoptimized
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
              <span className="text-white font-medium text-xs bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-xs">
                {item.title || "View Image"}
              </span>
            </div>
          </div>
        ))}

        {/* Add Photo Card Placeholder Box */}
        <div
          onClick={() => setIsAddModalOpen(true)}
          className="relative h-52 sm:h-56 lg:h-56 rounded-2xl border border-dashed border-[#C5BEB3] bg-[#E5E0D8]/60 hover:bg-[#DCD6CC]/80 transition-colors flex flex-col items-center justify-center p-6 text-[#787570] hover:text-[#2C2E33] cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-[#787570] group-hover:text-[#2C2E33] transition-colors mb-2">
            <Plus className="w-6 h-6 stroke-[1.5]" />
          </div>
          <span className="text-xs font-normal text-[#787570] group-hover:text-[#2C2E33] transition-colors">
            Add Photo
          </span>
        </div>
      </div>

      {/* View/Delete Image Detail Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#F7F5F0] border border-[#E3DDD3] rounded-2xl max-w-xl w-full p-5 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150 space-y-4">
            <div className="flex items-center justify-between border-b border-[#E3DDD3] pb-3">
              <h3 className="font-serif font-bold text-lg text-[#2C2E33]">
                {selectedImage.title || "Portfolio Image"}
              </h3>
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="text-[#787570] hover:text-[#2C2E33] p-1 rounded-md transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative w-full h-80 sm:h-96 rounded-xl overflow-hidden bg-[#E0D9CE]">
              <Image
                src={selectedImage.url}
                alt={selectedImage.title || "Portfolio detail"}
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={() => handleDeleteImage(selectedImage.id)}
                className="text-[#C54A4A] hover:bg-[#FDF2F2] px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Photo</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="bg-[#B78735] hover:bg-[#8F6929] text-white px-4 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Image Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#F7F5F0] border border-[#E3DDD3] rounded-2xl max-w-md w-full p-6 shadow-xl relative animate-in fade-in zoom-in-95 duration-150 space-y-5">
            <div className="flex items-center justify-between border-b border-[#E3DDD3] pb-4">
              <h3 className="font-serif font-bold text-xl text-[#2C2E33]">
                Add Portfolio Image
              </h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-[#787570] hover:text-[#2C2E33] p-1 rounded-md transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {uploadSuccess ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#2E6B38] mx-auto animate-bounce" />
                <h4 className="font-serif font-bold text-lg text-[#2C2E33]">
                  Image Uploaded Successfully!
                </h4>
              </div>
            ) : (
              <form onSubmit={handleAddImage} className="space-y-4 text-xs sm:text-sm">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-[#C5BEB3] bg-[#EBE7DF]/70 hover:bg-[#E2DCD4] rounded-xl p-8 text-center cursor-pointer transition-colors space-y-2"
                >
                  <Upload className="w-8 h-8 text-[#787570] mx-auto" />
                  <p className="font-medium text-[#2C2E33]">
                    Click to choose photo or drop image here
                  </p>
                  <p className="text-xs text-[#787570]">
                    PNG, JPG or WEBP (Max 5MB)
                  </p>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setNewTitle(e.target.files[0].name.replace(/\.[^/.]+$/, ""));
                      }
                    }}
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="flex-1 bg-white border border-[#E3DDD3] text-[#5C5954] hover:bg-[#EBE7DF] py-2.5 rounded-sm font-medium transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-[#B78735] hover:bg-[#8F6929] text-white py-2.5 rounded-sm font-medium transition-colors cursor-pointer"
                  >
                    Upload Image
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

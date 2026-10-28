"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import ChairImage from "@/components/shared/ChairImage";
import { Plus, Check, Edit2, Trash2, Upload, Loader2, AlertCircle, Armchair } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  useGetMyChairsQuery,
  useCreateChairMutation,
  useUpdateChairMutation,
  useDeleteChairMutation,
} from "@/features/chair/chairApi";
import { useUploadMutation } from "@/features/upload/uploadApi";

interface Chair {
  _id: string;
  name: string;
  description?: string;
  photo?: string;
  location?: string;
  pricePerDayInUSD: number;
  status?: string;
  salon?: string;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  uid?: string;
}

export default function ChairsSpacePage() {
  // API Queries & Mutations
  const { data: chairsResponse, isLoading, isError, error, refetch } = useGetMyChairsQuery({});
  const [createChair, { isLoading: isCreating }] = useCreateChairMutation();
  const [updateChair, { isLoading: isUpdating }] = useUpdateChairMutation();
  const [deleteChair, { isLoading: isDeleting }] = useDeleteChairMutation();
  const [uploadMedia, { isLoading: isUploadingImage }] = useUploadMutation();

  // Extract chairs array from API response
  const chairsList: Chair[] = Array.isArray(chairsResponse?.data)
    ? chairsResponse.data
    : Array.isArray(chairsResponse)
    ? chairsResponse
    : [];

  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingChairId, setEditingChairId] = useState<string | null>(null);
  const [deletingChair, setDeletingChair] = useState<Chair | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const [form, setForm] = useState({
    name: "",
    location: "",
    pricePerDayInUSD: "45",
    description: "",
    photo: "",
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Calculate dynamic stats from API response
  const totalChairs = chairsResponse?.pagination?.total ?? chairsList.length;
  const availableChairs = chairsList.filter((c) => {
    const st = (c.status || "").toLowerCase();
    return st === "active" || st === "available" || st === "";
  }).length;
  const occupiedChairs = chairsList.filter(
    (c) => (c.status || "").toLowerCase() === "occupied"
  ).length;
  const maintenanceChairs = chairsList.filter(
    (c) => (c.status || "").toLowerCase() === "maintenance"
  ).length;

  // Helper to safely extract image URL string from backend response
  const extractImageUrl = (res: any): string => {
    if (!res) return "";
    if (typeof res === "string") return res;
    if (res?.data?.images?.[0] && typeof res.data.images[0] === "string") return res.data.images[0];
    if (res?.data?.url && typeof res.data.url === "string") return res.data.url;
    if (res?.data && typeof res.data === "string") return res.data;
    if (res?.url && typeof res.url === "string") return res.url;
    if (res?.images?.[0] && typeof res.images[0] === "string") return res.images[0];
    return "";
  };

  const handleProcessFile = async (file: File) => {
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size exceeds 5MB limit. Please select a smaller photo.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file (PNG, JPG, or WEBP).");
      return;
    }

    const localPreview = URL.createObjectURL(file);
    setImagePreview(localPreview);

    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await uploadMedia(formData).unwrap();
      const uploadedUrl = extractImageUrl(res) || localPreview;
      setForm((prev) => ({ ...prev, photo: uploadedUrl }));
      toast.success("Photo uploaded successfully!");
    } catch (err: any) {
      console.error("Failed to upload image:", err);
      toast.error("Failed to upload photo. Using local preview.");
      setForm((prev) => ({ ...prev, photo: localPreview }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleProcessFile(file);
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setForm((prev) => ({ ...prev, photo: "" }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleOpenAdd = () => {
    setForm({
      name: "",
      location: "",
      pricePerDayInUSD: "45",
      description: "",
      photo: "",
    });
    setImagePreview(null);
    setEditingChairId(null);
    setModalMode("add");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (chair: Chair) => {
    const photoUrl = typeof chair.photo === "string" ? chair.photo : extractImageUrl(chair.photo);
    setForm({
      name: chair.name || "",
      location: chair.location || "",
      pricePerDayInUSD: chair.pricePerDayInUSD !== undefined ? String(chair.pricePerDayInUSD) : "45",
      description: chair.description || "",
      photo: photoUrl,
    });
    setImagePreview(photoUrl || null);
    setEditingChairId(chair._id);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Please enter a chair name.");
      return;
    }

    const photoUrl = typeof form.photo === "string" ? form.photo : extractImageUrl(form.photo);

    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      photo: photoUrl,
      location: form.location.trim(),
      pricePerDayInUSD: Number(form.pricePerDayInUSD) || 0,
    };

    try {
      if (modalMode === "add") {
        const res = await createChair(payload).unwrap();
        toast.success(res?.message || "Chair created successfully!");
      } else if (modalMode === "edit" && editingChairId) {
        const res = await updateChair({ chairId: editingChairId, data: payload }).unwrap();
        toast.success(res?.message || "Chair updated successfully!");
      }
      setIsModalOpen(false);
    } catch (err: any) {
      console.error("Failed to save chair:", err);
      toast.error(err?.data?.message || err?.message || "Operation failed. Please try again.");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingChair) return;
    try {
      const res = await deleteChair(deletingChair._id).unwrap();
      toast.success(res?.message || "Chair deleted successfully!");
      setDeletingChair(null);
    } catch (err: any) {
      console.error("Failed to delete chair:", err);
      toast.error(err?.data?.message || err?.message || "Failed to delete chair.");
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs sm:text-sm text-muted-foreground font-normal tracking-wide">
            {totalChairs} {totalChairs === 1 ? "chair" : "chairs"} total · {availableChairs} available today
          </p>
          <h1 className="font-extrabold text-3xl sm:text-4xl text-foreground tracking-tight">
            Chairs &amp; Space
          </h1>
        </div>

        <div>
          <button
            type="button"
            onClick={handleOpenAdd}
            className="px-4 py-2.5 rounded-sm bg-[#D99722] hover:bg-[#8F6929] text-white text-xs sm:text-sm font-medium transition-colors cursor-pointer flex items-center gap-2 shadow-xs active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>Add Chair</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-5 shadow-2xs">
          <div className="text-3xl font-extrabold text-foreground mb-1 tracking-tight">
            {totalChairs}
          </div>
          <p className="text-xs text-muted-foreground font-normal">Total Chairs</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-5 shadow-2xs">
          <div className="text-3xl font-extrabold text-foreground mb-1 tracking-tight">
            {availableChairs}
          </div>
          <p className="text-xs text-muted-foreground font-normal">Available / Active</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-5 shadow-2xs">
          <div className="text-3xl font-extrabold text-foreground mb-1 tracking-tight">
            {occupiedChairs}
          </div>
          <p className="text-xs text-muted-foreground font-normal">Occupied</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-5 shadow-2xs">
          <div className="text-3xl font-extrabold text-[#D99722] mb-1 tracking-tight">
            {maintenanceChairs}
          </div>
          <p className="text-xs text-muted-foreground font-normal">Maintenance</p>
        </div>
      </div>

      {/* Chairs Cards / Loading / Error State */}
      {isLoading ? (
        <div className="p-12 text-center bg-card border border-border rounded-lg flex flex-col items-center justify-center space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#D99722]" />
          <p className="text-sm text-muted-foreground">Loading chairs...</p>
        </div>
      ) : isError ? (
        <div className="p-8 text-center bg-destructive/10 border border-destructive/20 rounded-lg flex flex-col items-center justify-center space-y-3">
          <AlertCircle className="w-8 h-8 text-destructive" />
          <p className="text-sm font-medium text-destructive">
            {(error as any)?.data?.message || "Failed to load chairs."}
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="px-4 py-2 bg-secondary text-foreground text-xs font-medium rounded-md hover:bg-secondary/80 transition-colors"
          >
            Retry
          </button>
        </div>
      ) : chairsList.length === 0 ? (
        <div className="p-12 text-center bg-card border border-border rounded-lg flex flex-col items-center justify-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-muted-foreground">
            <Armchair className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-foreground">No chairs found</h3>
            <p className="text-xs text-muted-foreground max-w-sm">
              You haven&apos;t added any chairs yet. Click the button below to add your first chair.
            </p>
          </div>
          <button
            type="button"
            onClick={handleOpenAdd}
            className="px-4 py-2 bg-[#D99722] hover:bg-[#8F6929] text-white text-xs font-medium rounded-sm transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add First Chair</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4 pt-2">
          {chairsList.map((chair) => (
            <div
              key={chair._id}
              className="bg-card border border-border rounded-lg p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs hover:border-[#D99722]/40 transition-colors"
            >
              {/* Left Chair Info + Photo */}
              <div className="flex items-start gap-4 max-w-xl">
                <div className="relative w-20 h-20 rounded-md overflow-hidden bg-secondary border border-border shrink-0">
                  <ChairImage
                    src={chair.photo}
                    alt={chair.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-lg sm:text-xl text-foreground">
                      {chair.name}
                    </h3>
                    {chair.uid && (
                      <span className="px-2 py-0.5 bg-muted text-muted-foreground text-[10px] font-mono rounded">
                        {chair.uid}
                      </span>
                    )}
                  </div>
                  {chair.description && (
                    <p className="text-xs text-muted-foreground font-normal line-clamp-2">
                      {chair.description}
                    </p>
                  )}
                  <div className="pt-1.5 flex items-center gap-2 flex-wrap">
                    {chair.location && (
                      <span className="px-3 py-1 bg-secondary border border-border text-muted-foreground text-xs font-medium rounded-full">
                        {chair.location}
                      </span>
                    )}
                    <span
                      className={`px-2.5 py-0.5 text-[11px] rounded-md font-medium capitalize ${
                        (chair.status || "").toLowerCase() === "active" ||
                        (chair.status || "").toLowerCase() === "available"
                          ? "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20"
                          : (chair.status || "").toLowerCase() === "occupied"
                          ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                          : "bg-muted text-muted-foreground border border-border"
                      }`}
                    >
                      {chair.status || "Active"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Price & Actions */}
              <div className="flex items-center gap-4 sm:gap-6 justify-between sm:justify-end shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-border">
                <div className="font-bold text-xl sm:text-2xl text-foreground">
                  ${chair.pricePerDayInUSD}
                  <span className="text-xs text-muted-foreground font-normal">/day</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(chair)}
                    className="px-3 py-2 rounded-sm bg-secondary hover:bg-secondary/80 text-foreground text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-foreground" />
                    <span>Edit</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeletingChair(chair)}
                    className="px-3 py-2 rounded-sm bg-destructive/10 hover:bg-destructive/20 text-destructive text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* SHADCN DIALOG MODAL FOR ADD / EDIT CHAIR                          */}
      {/* ----------------------------------------------------------------- */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-xl bg-card border border-border p-6 sm:p-8 rounded-lg shadow-lg text-card-foreground max-h-[90vh] overflow-y-auto">
          <DialogHeader className="text-left space-y-1 pb-2">
            <DialogTitle className="font-bold text-xl sm:text-2xl text-foreground">
              {modalMode === "add" ? "Add New Chair" : "Edit Chair Details"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-5 pt-2">
            {/* Field 1: Chair Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground block">
                Chair Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Belmont Classic Barber Chair"
                className="w-full bg-background border border-input rounded-sm px-4 py-3 text-sm text-foreground outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground"
              />
            </div>

            {/* Field 2: Location in Salon */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground block">
                Location in Salon
              </label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="e.g. Station A - Ground Floor Main Hall"
                className="w-full bg-background border border-input rounded-sm px-4 py-3 text-sm text-foreground outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground"
              />
            </div>

            {/* Field 3: Daily Rate ($ USD) */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground block">
                Daily Rate ($ USD/day) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={form.pricePerDayInUSD}
                onChange={(e) => setForm({ ...form, pricePerDayInUSD: e.target.value })}
                placeholder="e.g. 45.00"
                className="w-full bg-background border border-input rounded-sm px-4 py-3 text-sm text-foreground outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground"
              />
            </div>

            {/* Field 4: Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground block">
                Description
              </label>
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Ergonomic leather hydraulic reclining chair suitable for barbers and stylists..."
                className="w-full bg-background border border-input rounded-sm px-4 py-3 text-sm text-foreground outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground resize-none"
              />
            </div>

            {/* Field 5: Chair Image Upload / URL */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-foreground block">
                  Chair Image <span className="text-muted-foreground font-normal">(Optional)</span>
                </label>
                {isUploadingImage && (
                  <span className="text-[11px] font-medium text-[#D99722] flex items-center gap-1.5 animate-pulse">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Uploading photo...</span>
                  </span>
                )}
                {!isUploadingImage && (imagePreview || form.photo) && (
                  <span className="text-[11px] font-medium text-emerald-500 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>Photo ready</span>
                  </span>
                )}
              </div>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />

              {imagePreview || form.photo ? (
                <div className="relative w-full h-40 rounded-xl overflow-hidden border border-border bg-muted group shadow-2xs">
                  <Image
                    src={imagePreview || form.photo}
                    alt="Chair Preview"
                    fill
                    className="object-cover"
                    unoptimized
                  />

                  {/* ACTIVE UPLOAD OVERLAY - Always visible while uploading */}
                  {isUploadingImage ? (
                    <div className="absolute inset-0 bg-black/75 backdrop-blur-xs flex flex-col items-center justify-center gap-2 z-20 animate-in fade-in duration-200">
                      <div className="w-11 h-11 rounded-full bg-[#D99722]/20 border border-[#D99722]/40 flex items-center justify-center">
                        <Loader2 className="w-6 h-6 animate-spin text-[#D99722]" />
                      </div>
                      <div className="text-center space-y-0.5">
                        <p className="text-xs font-semibold text-white tracking-wide">
                          Uploading photo to cloud...
                        </p>
                        <p className="text-[10px] text-white/70">
                          Please wait a moment
                        </p>
                      </div>
                      {/* Animated bottom progress bar */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 overflow-hidden">
                        <div className="h-full bg-[#D99722] animate-pulse w-full" />
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Upload Success Badge */}
                      <div className="absolute top-2.5 right-2.5 z-10 pointer-events-none">
                        <span className="bg-emerald-600/90 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          <span>Uploaded</span>
                        </span>
                      </div>

                      {/* Hover Overlay with Action Buttons */}
                      <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2.5 z-10">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-3.5 py-1.5 bg-background/95 hover:bg-background text-foreground text-xs font-semibold rounded-lg shadow-sm transition-all cursor-pointer flex items-center gap-1.5 hover:scale-105 active:scale-95"
                        >
                          <Upload className="w-3.5 h-3.5 text-[#D99722]" />
                          <span>Change Photo</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="px-3.5 py-1.5 bg-destructive/95 hover:bg-destructive text-destructive-foreground text-xs font-semibold rounded-lg shadow-sm transition-all cursor-pointer flex items-center gap-1.5 hover:scale-105 active:scale-95"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    if (!isUploadingImage) setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    if (!isUploadingImage) {
                      const file = e.dataTransfer.files?.[0];
                      if (file) handleProcessFile(file);
                    }
                  }}
                  onClick={() => !isUploadingImage && fileInputRef.current?.click()}
                  className={`w-full h-32 border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-2 transition-all cursor-pointer group ${
                    isDragging
                      ? "border-[#D99722] bg-[#D99722]/10 scale-[0.99]"
                      : isUploadingImage
                      ? "border-[#D99722]/60 bg-[#D99722]/5 cursor-wait"
                      : "border-border hover:border-[#D99722]/60 bg-muted/40 hover:bg-muted/70"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      isUploadingImage
                        ? "bg-[#D99722]/20 text-[#D99722]"
                        : "bg-secondary text-muted-foreground group-hover:bg-[#D99722]/15 group-hover:text-[#D99722] group-hover:scale-110"
                    }`}
                  >
                    {isUploadingImage ? (
                      <Loader2 className="w-5 h-5 animate-spin text-[#D99722]" />
                    ) : (
                      <Upload className="w-5 h-5" />
                    )}
                  </div>
                  <div className="text-center space-y-0.5">
                    <span
                      className={`text-xs font-semibold block transition-colors ${
                        isUploadingImage
                          ? "text-[#D99722]"
                          : isDragging
                          ? "text-[#D99722]"
                          : "text-foreground group-hover:text-[#D99722]"
                      }`}
                    >
                      {isUploadingImage
                        ? "Uploading chair photo..."
                        : isDragging
                        ? "Drop photo here to upload"
                        : "Click to upload chair space photo"}
                    </span>
                    <span className="text-[11px] text-muted-foreground block">
                      PNG, JPG, WEBP (Max 5MB) · Drag &amp; drop supported
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Submit & Cancel Actions */}
            <div className="pt-4 flex items-center gap-3 justify-end border-t border-border">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                disabled={isCreating || isUpdating || isUploadingImage}
                className="px-5 py-2.5 rounded-sm bg-secondary border border-border text-muted-foreground hover:text-foreground text-sm font-medium transition-colors cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isCreating || isUpdating || isUploadingImage}
                className={`px-6 py-2.5 rounded-sm text-white text-sm font-medium transition-all shadow-xs flex items-center gap-2 ${
                  isCreating || isUpdating || isUploadingImage
                    ? "bg-[#D99722]/70 cursor-not-allowed opacity-80"
                    : "bg-[#D99722] hover:bg-[#8F6929] cursor-pointer active:scale-[0.98]"
                }`}
              >
                {isUploadingImage ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Uploading Photo...</span>
                  </>
                ) : isCreating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Creating Chair...</span>
                  </>
                ) : isUpdating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Saving Changes...</span>
                  </>
                ) : (
                  <>
                    {modalMode === "add" ? <Plus className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                    <span>{modalMode === "add" ? "Create Chair" : "Save Changes"}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* ----------------------------------------------------------------- */}
      {/* SHADCN DIALOG MODAL FOR DELETE CONFIRMATION                       */}
      {/* ----------------------------------------------------------------- */}
      <Dialog open={!!deletingChair} onOpenChange={(open) => !open && setDeletingChair(null)}>
        <DialogContent className="sm:max-w-md bg-card border border-border p-6 rounded-lg shadow-lg text-card-foreground">
          <DialogHeader className="text-left space-y-2">
            <DialogTitle className="font-bold text-xl text-foreground">
              Delete Chair
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Are you sure you want to delete &quot;{deletingChair?.name}&quot;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <div className="pt-4 flex items-center gap-3 justify-end border-t border-border">
            <button
              type="button"
              onClick={() => setDeletingChair(null)}
              disabled={isDeleting}
              className="px-4 py-2 rounded-sm bg-secondary border border-border text-muted-foreground hover:text-foreground text-xs font-medium transition-colors cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="px-5 py-2 rounded-sm bg-destructive hover:bg-destructive/90 text-destructive-foreground text-xs font-medium transition-colors cursor-pointer shadow-xs flex items-center gap-2 disabled:opacity-50"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Deleting...</span>
                </>
              ) : (
                <span>Delete Chair</span>
              )}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}


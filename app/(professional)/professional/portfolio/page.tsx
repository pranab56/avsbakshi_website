"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import {
    Trash2,
    Image as ImageIcon,
    Star,
    Check,
    Loader2,
    Eye,
    Save,
    Plus,
    ExternalLink,
    ChevronLeft,
    ChevronRight,
    Sparkles,
    AlertCircle,
    X,
    ArrowUpRight,
    MoveLeft,
    MoveRight,
} from "lucide-react";
import { toast } from "sonner";
import { useCreateBusinessMutation } from "@/features/business/businessApi";
import { useUploadMutation } from "@/features/upload/uploadApi";
import { useGetMyProfileQuery } from "@/features/profile/profileApi";
import { useGetAllProfessionalQuery } from "@/features/profesional/profesionalApi";

export default function ProfessionalPortfolioPage() {
    const user = useSelector(
        (state: { auth?: { token?: string | null; user?: any } }) =>
            state.auth?.user
    );

    // RTK Query hooks
    const {
        data: profileResponse,
        isLoading: isProfileLoading,
        refetch: refetchProfile,
    } = useGetMyProfileQuery(undefined);

    const {
        data: proResponse,
        isLoading: isProLoading,
        refetch: refetchPro,
    } = useGetAllProfessionalQuery(undefined);

    const [createBusiness, { isLoading: isSaving }] = useCreateBusinessMutation();
    const [uploadMedia, { isLoading: isApiUploading }] = useUploadMutation();

    // Component state
    const [photos, setPhotos] = useState<string[]>([]);
    const [savedPhotos, setSavedPhotos] = useState<string[]>([]);
    const [hasInitialized, setHasInitialized] = useState<boolean>(false);
    const [uploadingCount, setUploadingCount] = useState<number>(0);
    const [previewModalIndex, setPreviewModalIndex] = useState<number | null>(null);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // Extract initial portfolio photos from API profile
    useEffect(() => {
        if (!hasInitialized && (profileResponse || proResponse)) {
            const profileData = profileResponse?.data || profileResponse;
            const proList = proResponse?.data || [];
            const currentPro = Array.isArray(proList) ? proList[0] : proList;

            // Check all possible photo paths
            const serverPhotos: string[] =
                (Array.isArray(profileData?.roleRef?.photos) &&
                    profileData.roleRef.photos) ||
                (Array.isArray(profileData?.photos) && profileData.photos) ||
                (Array.isArray(currentPro?.roleRef?.photos) &&
                    currentPro.roleRef.photos) ||
                (Array.isArray(currentPro?.professional?.roleRef?.photos) &&
                    currentPro.professional.roleRef.photos) ||
                (Array.isArray(currentPro?.photos) && currentPro.photos) ||
                [];

            setPhotos(serverPhotos);
            setSavedPhotos(serverPhotos);
            setHasInitialized(true);
        }
    }, [profileResponse, proResponse, hasInitialized]);

    // Check if current list differs from saved list
    const hasUnsavedChanges =
        JSON.stringify(photos) !== JSON.stringify(savedPhotos);

    // Handle uploading files via useUploadMutation
    const handleUploadFiles = async (files: FileList | File[]) => {
        const fileArray = Array.from(files);
        const validImageFiles = fileArray.filter((file) =>
            file.type.startsWith("image/")
        );

        if (validImageFiles.length === 0) {
            toast.error("Please select valid image files (JPG, PNG, WEBP, etc.)");
            return;
        }

        setUploadingCount(validImageFiles.length);
        toast.info(`Uploading ${validImageFiles.length} image(s)...`);

        const uploadedUrls: string[] = [];

        for (let i = 0; i < validImageFiles.length; i++) {
            const file = validImageFiles[i];
            const formData = new FormData();
            formData.append("image", file);

            try {
                const res = await uploadMedia(formData).unwrap();
                const url =
                    res?.data?.images?.[0] ||
                    res?.data?.url ||
                    (Array.isArray(res?.data) ? res.data[0] : null) ||
                    res?.url;

                if (url && typeof url === "string") {
                    uploadedUrls.push(url);
                }
            } catch (err) {
                console.error("Failed to upload image:", file.name, err);
                toast.error(`Failed to upload ${file.name}`);
            }
        }

        setUploadingCount(0);

        if (uploadedUrls.length > 0) {
            setPhotos((prev) => [...prev, ...uploadedUrls]);
            toast.success(
                `${uploadedUrls.length} image(s) uploaded! Don't forget to save your portfolio.`
            );
        }
    };

    // Save portfolio via useCreateBusinessMutation with { photos: [...] }
    const handleSavePortfolio = async (customList?: string[]) => {
        const listToSave = customList || photos;

        try {
            await createBusiness({
                photos: listToSave,
            }).unwrap();

            setSavedPhotos(listToSave);
            toast.success("Portfolio showcase updated successfully!");

            // Refresh profile data in background
            refetchProfile();
            refetchPro();
        } catch (err: any) {
            console.error("Failed to save portfolio:", err);
            const errMsg =
                err?.data?.message ||
                err?.message ||
                "Failed to update portfolio. Please try again.";
            toast.error(errMsg);
        }
    };

    // Reorder actions
    const handleSetCoverPhoto = (index: number) => {
        if (index === 0) return;
        const target = photos[index];
        const rest = photos.filter((_, i) => i !== index);
        const updated = [target, ...rest];
        setPhotos(updated);
        toast.success("Set as primary cover photo!");
    };

    const handleMovePhoto = (fromIndex: number, toIndex: number) => {
        if (toIndex < 0 || toIndex >= photos.length) return;
        const updated = [...photos];
        const [movedItem] = updated.splice(fromIndex, 1);
        updated.splice(toIndex, 0, movedItem);
        setPhotos(updated);
    };

    const handleRemovePhoto = (index: number) => {
        const updated = photos.filter((_, i) => i !== index);
        setPhotos(updated);
        toast.info("Photo removed from portfolio.");
    };

    const handleDiscardChanges = () => {
        setPhotos(savedPhotos);
        toast.info("Unsaved changes discarded.");
    };

    // Keyboard navigation for preview modal
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (previewModalIndex === null) return;
            if (e.key === "Escape") setPreviewModalIndex(null);
            if (e.key === "ArrowLeft") {
                setPreviewModalIndex((prev) =>
                    prev !== null && prev > 0 ? prev - 1 : photos.length - 1
                );
            }
            if (e.key === "ArrowRight") {
                setPreviewModalIndex((prev) =>
                    prev !== null && prev < photos.length - 1 ? prev + 1 : 0
                );
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [previewModalIndex, photos.length]);

    const isLoadingInitial = !hasInitialized && (isProfileLoading || isProLoading);
    const professionalId = user?._id || user?.id || "";

    return (
        <div className="space-y-6 pb-20 font-sans text-foreground">
            {/* Hidden native file input for selecting single/multiple images */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                        handleUploadFiles(e.target.files);
                        e.target.value = ""; // reset for re-uploading same file
                    }
                }}
                className="hidden"
            />

            {/* Top Header Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <h1 className="font-serif italic font-normal text-3xl sm:text-4xl text-foreground">
                            Portfolio Showcase
                        </h1>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-primary/10 text-primary border border-primary/20">
                            <Sparkles className="w-3 h-3" />
                            Pro Gallery
                        </span>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground font-normal">
                        Upload and curate high-resolution photos of your hairstyles, treatments, and beauty creations.
                    </p>
                </div>

                {/* Header Action Buttons */}
                <div className="flex items-center gap-2.5">
                   

                    {hasUnsavedChanges && (
                        <button
                            type="button"
                            onClick={handleDiscardChanges}
                            disabled={isSaving}
                            className="px-3.5 py-2 rounded-xl border border-border hover:bg-destructive/10 hover:text-destructive text-xs font-semibold text-muted-foreground transition-colors cursor-pointer disabled:opacity-50"
                        >
                            Discard
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={() => handleSavePortfolio()}
                        disabled={isSaving || !hasUnsavedChanges}
                        className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm ${
                            hasUnsavedChanges
                                ? "bg-primary hover:bg-primary/90 text-primary-foreground animate-pulse"
                                : "bg-muted text-muted-foreground cursor-not-allowed border border-border"
                        }`}
                    >
                        {isSaving ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Saving...</span>
                            </>
                        ) : hasUnsavedChanges ? (
                            <>
                                <Save className="w-4 h-4" />
                                <span>Save Changes</span>
                            </>
                        ) : (
                            <>
                                <Check className="w-4 h-4 text-emerald-500" />
                                <span>Portfolio Saved</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Gallery Header */}
            <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-3">
                    <h2 className="font-serif italic font-normal text-2xl text-foreground">
                        Photo Gallery
                    </h2>
                    <span className="text-xs font-bold text-muted-foreground bg-accent px-2.5 py-1 rounded-full border border-border">
                        {photos.length} {photos.length === 1 ? "Photo" : "Photos"}
                    </span>
                </div>

                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingCount > 0 || isApiUploading}
                    className="px-3.5 py-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs disabled:opacity-60"
                >
                    {uploadingCount > 0 || isApiUploading ? (
                        <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Uploading ({uploadingCount})...</span>
                        </>
                    ) : (
                        <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add More</span>
                        </>
                    )}
                </button>
            </div>

            {/* Gallery Photos Grid */}
            {isLoadingInitial ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div
                            key={i}
                            className="aspect-square rounded-2xl bg-muted/70 dark:bg-zinc-800/70 animate-pulse"
                        />
                    ))}
                </div>
            ) : photos.length === 0 && uploadingCount === 0 ? (
                <div className="p-16 bg-card border border-border rounded-2xl text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-accent border border-border mx-auto flex items-center justify-center text-muted-foreground">
                        <ImageIcon className="w-8 h-8 text-muted-foreground/60" />
                    </div>
                    <div>
                        <h3 className="font-serif font-bold text-lg text-foreground">
                            No Portfolio Photos Yet
                        </h3>
                        <p className="text-xs text-muted-foreground max-w-md mx-auto mt-1">
                            Click &quot;Add More&quot; to select single or multiple photos of your haircuts, styling, coloring, and skincare work.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs inline-flex items-center gap-2 transition-all cursor-pointer shadow-sm"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Add Photos</span>
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {/* Existing photos */}
                    {photos.map((url, index) => {
                        const isCover = index === 0;

                        return (
                            <div
                                key={`${url}-${index}`}
                                className={`group relative bg-card border rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col ${
                                    isCover
                                        ? "border-primary/80 ring-2 ring-primary/30"
                                        : "border-border hover:border-primary/40"
                                }`}
                            >
                                {/* Photo Image Container */}
                                <div className="relative aspect-4/3 w-full bg-accent/40 overflow-hidden">
                                    <Image
                                        src={url}
                                        alt={`Portfolio item ${index + 1}`}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                        className="object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                                        onClick={() => setPreviewModalIndex(index)}
                                        unoptimized
                                    />

                                    {/* Gradient Overlay on Hover */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />

                                    {/* Cover Badge */}
                                    {isCover && (
                                        <div className="absolute top-2.5 left-2.5 z-10 bg-primary text-primary-foreground text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                                            <Star className="w-3 h-3 fill-current" />
                                            <span>Cover Photo</span>
                                        </div>
                                    )}

                                    {/* Photo Index Tag */}
                                    <div className="absolute top-2.5 right-2.5 z-10 bg-black/60 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded-md">
                                        #{index + 1}
                                    </div>

                                    {/* Hover Quick Action Buttons */}
                                    <div className="absolute inset-x-0 bottom-0 p-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-between gap-1.5">
                                        <button
                                            type="button"
                                            onClick={() => setPreviewModalIndex(index)}
                                            className="p-2 rounded-lg bg-black/60 hover:bg-black/90 text-white backdrop-blur-xs transition-colors cursor-pointer text-xs flex items-center gap-1"
                                            title="Enlarge photo"
                                        >
                                            <Eye className="w-3.5 h-3.5" />
                                            <span className="text-[10px] font-semibold">View</span>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => handleRemovePhoto(index)}
                                            className="p-2 rounded-lg bg-destructive/90 hover:bg-destructive text-destructive-foreground transition-colors cursor-pointer text-xs"
                                            title="Remove from portfolio"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>

                                {/* Card Bottom Controls */}
                                <div className="p-3 bg-card border-t border-border flex items-center justify-between text-xs gap-1">
                                    {/* Set As Cover Button */}
                                    {!isCover ? (
                                        <button
                                            type="button"
                                            onClick={() => handleSetCoverPhoto(index)}
                                            className="text-[11px] font-semibold text-primary hover:text-primary/80 transition-colors flex items-center gap-1 cursor-pointer py-1"
                                        >
                                            <Star className="w-3 h-3" />
                                            <span>Set as Cover</span>
                                        </button>
                                    ) : (
                                        <span className="text-[11px] font-bold text-primary flex items-center gap-1 py-1">
                                            <Check className="w-3 h-3" />
                                            <span>Primary Cover</span>
                                        </span>
                                    )}

                                    {/* Reorder Arrows */}
                                    <div className="flex items-center gap-1">
                                        <button
                                            type="button"
                                            onClick={() => handleMovePhoto(index, index - 1)}
                                            disabled={index === 0}
                                            className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                                            title="Move left"
                                        >
                                            <MoveLeft className="w-3 h-3" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleMovePhoto(index, index + 1)}
                                            disabled={index === photos.length - 1}
                                            className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                                            title="Move right"
                                        >
                                            <MoveRight className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* Skeletons while new files are uploading */}
                    {uploadingCount > 0 &&
                        Array.from({ length: uploadingCount }).map((_, i) => (
                            <div
                                key={`uploading-skeleton-${i}`}
                                className="relative aspect-4/3 w-full bg-accent/60 border border-primary/40 rounded-2xl flex flex-col items-center justify-center gap-2 animate-pulse shadow-xs"
                            >
                                <Loader2 className="w-6 h-6 animate-spin text-primary" />
                                <span className="text-[11px] font-semibold text-muted-foreground">
                                    Uploading photo...
                                </span>
                            </div>
                        ))}
                </div>
            )}

            {/* Floating Save Bar when user has made changes */}
            {hasUnsavedChanges && (
                <div className="sticky bottom-6 z-40 bg-card/95 backdrop-blur-md border border-primary/40 rounded-2xl p-4 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in slide-in-from-bottom-3 duration-200">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                            <Sparkles className="w-4 h-4" />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-foreground">
                                You have unsaved changes
                            </h4>
                            <p className="text-xs text-muted-foreground">
                                {photos.length} photo(s) in current gallery. Remember to save to update your public profile.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={handleDiscardChanges}
                            disabled={isSaving}
                            className="px-4 py-2 rounded-xl border border-border hover:bg-accent text-xs font-semibold text-muted-foreground transition-colors cursor-pointer disabled:opacity-50"
                        >
                            Discard Changes
                        </button>
                        <button
                            type="button"
                            onClick={() => handleSavePortfolio()}
                            disabled={isSaving}
                            className="px-5 py-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md disabled:opacity-50"
                        >
                            {isSaving ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span>Saving...</span>
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4" />
                                    <span>Save Portfolio</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            )}

            {/* LIGHTBOX FULLSCREEN PREVIEW MODAL */}
            {previewModalIndex !== null && photos[previewModalIndex] && (
                <div
                    className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
                    onClick={() => setPreviewModalIndex(null)}
                >
                    <div
                        className="relative max-w-4xl w-full max-h-[90vh] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="p-4 bg-accent/60 border-b border-border flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="font-serif font-bold text-base text-foreground">
                                    Photo #{previewModalIndex + 1} of {photos.length}
                                </span>
                                {previewModalIndex === 0 && (
                                    <span className="bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                                        <Star className="w-2.5 h-2.5 fill-current" />
                                        Cover
                                    </span>
                                )}
                            </div>

                            <div className="flex items-center gap-2">
                                {previewModalIndex !== 0 && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            handleSetCoverPhoto(previewModalIndex);
                                            setPreviewModalIndex(0);
                                        }}
                                        className="px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-accent text-xs font-semibold text-primary flex items-center gap-1.5 transition-colors cursor-pointer"
                                    >
                                        <Star className="w-3.5 h-3.5" />
                                        <span>Set as Cover</span>
                                    </button>
                                )}

                                <button
                                    type="button"
                                    onClick={() => {
                                        handleRemovePhoto(previewModalIndex);
                                        setPreviewModalIndex(null);
                                    }}
                                    className="px-3 py-1.5 rounded-lg border border-destructive/30 text-destructive hover:bg-destructive/10 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                    <span>Remove</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setPreviewModalIndex(null)}
                                    className="p-1.5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Modal Image Display */}
                        <div className="relative w-full h-[55vh] sm:h-[65vh] bg-black/90 flex items-center justify-center overflow-hidden">
                            <Image
                                src={photos[previewModalIndex]}
                                alt={`Portfolio full preview ${previewModalIndex + 1}`}
                                fill
                                className="object-contain"
                                unoptimized
                            />

                            {/* Prev Arrow */}
                            {photos.length > 1 && (
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setPreviewModalIndex((prev) =>
                                            prev !== null && prev > 0 ? prev - 1 : photos.length - 1
                                        );
                                    }}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-xs transition-colors cursor-pointer"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                            )}

                            {/* Next Arrow */}
                            {photos.length > 1 && (
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setPreviewModalIndex((prev) =>
                                            prev !== null && prev < photos.length - 1 ? prev + 1 : 0
                                        );
                                    }}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-xs transition-colors cursor-pointer"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="p-3 bg-card border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                            <span>Use arrow keys to navigate • ESC to close</span>
                            <a
                                href={photos[previewModalIndex]}
                                target="_blank"
                                rel="noreferrer"
                                className="hover:text-primary transition-colors flex items-center gap-1"
                            >
                                <span>Open original image</span>
                                <ExternalLink className="w-3 h-3" />
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
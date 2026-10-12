"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Copy,
  Check,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  url?: string;
  image?: string;
}

export default function ShareModal({
  isOpen,
  onClose,
  title = "Check this out!",
  subtitle,
  url,
  image,
}: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(url || window.location.href);
    }
  }, [url, isOpen]);

  if (!isOpen) return null;

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(`Check out ${title} on Salon App!`);

  const handleCopyLink = async () => {
    let success = false;
    
    // 1. Try Navigator API
    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      try {
        await navigator.clipboard.writeText(shareUrl);
        success = true;
      } catch (err) {
        success = false;
      }
    }

    // 2. Fallback for non-secure HTTP (IP address like http://10.10.7.98:3000)
    if (!success) {
      try {
        const textArea = document.createElement("textarea");
        textArea.value = shareUrl;
        textArea.style.position = "fixed";
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.width = "2em";
        textArea.style.height = "2em";
        textArea.style.padding = "0";
        textArea.style.border = "none";
        textArea.style.outline = "none";
        textArea.style.boxShadow = "none";
        textArea.style.background = "transparent";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        success = document.execCommand("copy");
        document.body.removeChild(textArea);
      } catch (err) {
        success = false;
      }
    }

    if (success) {
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    } else {
      toast.error("Failed to copy link");
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: subtitle || title,
          url: shareUrl,
        });
        toast.success("Shared successfully!");
      } catch (e) {
        // User cancelled share
      }
    }
  };

  const shareOptions = [
    {
      name: "WhatsApp",
      icon: (props: any) => (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" {...props}>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 2C6.477 2 2 6.477 2 12c0 2.159.683 4.16 1.848 5.8L2 22l4.304-1.782A9.948 9.948 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.78 0-3.444-.467-4.887-1.282l-.35-.198-2.557 1.058.854-2.48-.224-.367A7.954 7.954 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
        </svg>
      ),
      color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/20",
      href: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`,
    },
    {
      name: "Facebook",
      icon: Facebook,
      color: "bg-blue-600/10 text-blue-600 border-blue-600/20 hover:bg-blue-600/20",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: "X (Twitter)",
      icon: Twitter,
      color: "bg-zinc-800/20 text-foreground border-border hover:bg-zinc-800/40",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      color: "bg-sky-600/10 text-sky-600 border-sky-600/20 hover:bg-sky-600/20",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      name: "Email",
      icon: Mail,
      color: "bg-amber-500/10 text-amber-500 border-amber-500/20 hover:bg-amber-500/20",
      href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodedText}%20${encodedUrl}`,
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/65 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      {/* Backdrop overlay click listener */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative bg-card border border-border/80 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 z-10 overflow-hidden text-card-foreground">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-[#D99722]/15 text-[#D99722] border border-[#D99722]/20">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground leading-tight">Share with Friends</h3>
              <p className="text-xs text-muted-foreground">Spread the word with your family & friends</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Item Preview Card */}
        {(title || image) && (
          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-accent/50 border border-border/60">
            {image && (
              <img
                src={image}
                alt={title}
                className="w-12 h-12 rounded-xl object-cover border border-border shrink-0 bg-muted"
              />
            )}
            <div className="flex-1 min-w-0">
              <h4 className="text-xs sm:text-sm font-bold text-foreground truncate">{title}</h4>
              {subtitle && <p className="text-[11px] text-muted-foreground truncate">{subtitle}</p>}
              <p className="text-[10px] text-[#D99722] truncate mt-0.5">{shareUrl}</p>
            </div>
          </div>
        )}

        {/* Social Options Grid */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-muted-foreground">Share via social media</label>
          <div className="grid grid-cols-5 gap-2">
            {shareOptions.map((opt) => {
              const IconComp = opt.icon;
              return (
                <a
                  key={opt.name}
                  href={opt.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex flex-col items-center justify-center p-2.5 rounded-2xl border transition-all duration-200 ${opt.color} group`}
                >
                  <IconComp className="w-5 h-5 transition-transform group-hover:scale-110" />
                  <span className="text-[10px] font-semibold mt-1.5 truncate max-w-full">
                    {opt.name}
                  </span>
                </a>
              );
            })}
          </div>
        </div>

        {/* Copy Link Input & Button */}
        <div className="space-y-2 pt-1">
          <label className="text-xs font-semibold text-muted-foreground">Or copy link</label>
          <div className="flex items-center gap-2 bg-background border border-border/80 rounded-2xl p-1.5">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 bg-transparent px-3 text-xs font-medium text-foreground outline-hidden select-all truncate"
            />
            <button
              type="button"
              onClick={handleCopyLink}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                copied
                  ? "bg-emerald-500 text-white shadow-xs"
                  : "bg-[#D99722] hover:bg-[#C2841B] text-white shadow-xs"
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Web Share (Mobile Native) if supported */}
        {typeof window !== "undefined" && typeof navigator !== "undefined" && (navigator as any).share && (
          <button
            type="button"
            onClick={handleNativeShare}
            className="w-full py-2.5 bg-accent hover:bg-accent/80 text-foreground text-xs font-semibold rounded-2xl border border-border transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#D99722]" />
            <span>More Sharing Options</span>
          </button>
        )}
      </div>
    </div>
  );
}

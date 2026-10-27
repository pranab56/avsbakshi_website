"use client";

import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import { useDisclaimerQuery } from "@/features/disclaimers/disclaimersApi";

export default function TermsContent() {
  const { data: disclaimerRes, isLoading } = useDisclaimerQuery({ type: "terms_of_service" });
  const content = disclaimerRes?.data?.content;
  const updatedAt = disclaimerRes?.data?.updatedAt;

  const formattedDate = updatedAt
    ? new Date(updatedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
      {/* Navigation Link to Privacy & Last Updated */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 border-b border-border text-xs sm:text-sm font-medium">
        <Link
          href="/privacy"
          className="inline-flex items-center gap-1.5 text-[#D99722] hover:text-[#C2841B] transition-colors"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          <span>Switch to Privacy Policy</span>
        </Link>
        {formattedDate && (
          <span className="text-muted-foreground">Last updated: {formattedDate}</span>
        )}
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground space-y-3">
          <Loader2 className="w-7 h-7 animate-spin text-[#D99722]" />
          <span className="text-sm font-medium">Loading Terms of Service...</span>
        </div>
      ) : content ? (
        <div
          className="prose dark:prose-invert max-w-none 
            text-zinc-700 dark:text-zinc-300
            [&_h1]:text-2xl sm:[&_h1]:text-3xl [&_h1]:font-extrabold [&_h1]:text-zinc-900 dark:[&_h1]:text-white [&_h1]:mb-4 [&_h1]:tracking-tight
            [&_h2]:text-2xl sm:[&_h2]:text-3xl [&_h2]:font-extrabold [&_h2]:text-zinc-900 dark:[&_h2]:text-white [&_h2]:mt-8 [&_h2]:mb-4 [&_h2]:tracking-tight [&_h2]:border-b [&_h2]:border-border/60 [&_h2]:pb-2
            [&_h3]:text-lg sm:[&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-[#D99722] dark:[&_h3]:text-[#D99722] [&_h3]:mt-6 [&_h3]:mb-3
            [&_h4]:text-base sm:[&_h4]:text-lg [&_h4]:font-bold [&_h4]:text-zinc-900 dark:[&_h4]:text-white [&_h4]:mt-4 [&_h4]:mb-2
            [&_p]:text-sm sm:[&_p]:text-base [&_p]:leading-relaxed [&_p]:text-zinc-700 dark:[&_p]:text-zinc-300 [&_p]:mb-4
            [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_ul]:space-y-1.5
            [&_li]:text-sm sm:[&_li]:text-base [&_li]:text-zinc-700 dark:[&_li]:text-zinc-300
            [&_strong]:font-bold [&_strong]:text-zinc-900 dark:[&_strong]:text-white
            [&_a]:text-[#D99722] [&_a]:underline hover:[&_a]:text-[#C2841B]"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      ) : (
        <div className="p-12 text-center bg-card border border-border rounded-2xl text-muted-foreground space-y-2">
          <p className="text-base font-semibold text-foreground">No Terms of Service available.</p>
          <p className="text-xs text-muted-foreground">Please check back soon for updated policies.</p>
        </div>
      )}
    </section>
  );
}

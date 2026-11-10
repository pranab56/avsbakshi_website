"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Send, Loader2, Lock } from "lucide-react";
import { useCreateContactMutation } from "@/features/contact/contactApi";

const SUPPORT_TYPES = [
  { id: "general_inquiry", label: "General Inquiry" },
  { id: "technical_support", label: "Technical Support" },
  { id: "billing_support", label: "Billing Support" },
  { id: "callback_request", label: "Callback Request" },
  { id: "safety_privacy", label: "Safety & Privacy" },
  { id: "others", label: "Others" },
];

export default function ContactFormSection() {
  const router = useRouter();

  // Auth Status Check
  const token = useSelector((state: { auth?: { token?: string | null; user?: any } }) => state.auth?.token);
  const user = useSelector((state: { auth?: { token?: string | null; user?: any } }) => state.auth?.user);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const isLoggedIn = mounted && Boolean(
    token ||
    (typeof window !== "undefined" && (localStorage.getItem("salon-token") || localStorage.getItem("realState-token")))
  );

  // Form Fields State
  const [type, setType] = useState<string>("technical_support");
  const [title, setTitle] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  // Validation Errors State (Displayed under respective fields)
  const [errors, setErrors] = useState<{
    type?: string;
    title?: string;
    message?: string;
  }>({});

  const [createContact, { isLoading: isSubmitting }] = useCreateContactMutation();

  // Pre-fill phone if available from logged-in user profile
  useEffect(() => {
    if (user?.phone && !phone) {
      setPhone(user.phone);
    }
  }, [user, phone]);

  const validate = () => {
    const newErrors: {
      type?: string;
      title?: string;
      message?: string;
    } = {};

    if (!type || !type.trim()) {
      newErrors.type = "Please select an inquiry type";
    }

    if (!title.trim()) {
      newErrors.title = "Title is required";
    } else if (title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }

    if (!message.trim()) {
      newErrors.message = "Message is required";
    } else if (message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Login verification check
    if (!isLoggedIn) {
      toast.error("You must be logged in to send contact information / support ticket.");
      router.push(`/login?redirect=${encodeURIComponent("/contact")}`);
      return;
    }

    // 2. Validate fields
    if (!validate()) {
      toast.error("Please fill in all required fields correctly.");
      return;
    }

    // 3. Construct API Body (Phone is optional)
    const payload: {
      type: string;
      title: string;
      message: string;
      phone?: string;
    } = {
      type,
      title: title.trim(),
      message: message.trim(),
    };

    if (phone.trim()) {
      payload.phone = phone.trim();
    }

    try {
      const res = await createContact(payload).unwrap();
      const successMsg = res?.message || "Support ticket created successfully";
      toast.success(successMsg);

      // Reset form fields
      setTitle("");
      setMessage("");
      setPhone("");
      setType("technical_support");
      setErrors({});
    } catch (err: unknown) {
      const errorObj = err as { data?: { message?: string }; message?: string };
      const errMsg = errorObj?.data?.message || errorObj?.message || "Failed to create support ticket. Please try again.";
      toast.error(errMsg);
    }
  };

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="max-w-3xl mx-auto w-full">
        {/* Interactive Contact Form (Centered) */}
        <div className="bg-card rounded-3xl p-6 sm:p-10 border border-border shadow-sm space-y-6">
          <div className="space-y-2 text-center">
            <span className="text-xs font-bold text-[#D99722] uppercase tracking-[0.2em] block">
              SUPPORT &amp; CONCIERGE DESK
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Contact Us
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto">
              Have an issue or inquiry? Fill out the form below and our dedicated support team will follow up promptly.
            </p>
          </div>

          {/* Authentication Warning / Logged-in Status Bar */}
          {mounted && !isLoggedIn && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm">
              <div className="flex items-center gap-2.5">
                <Lock className="w-4 h-4 shrink-0 text-[#D99722]" />
                <span>You must be logged in to submit contact information or open a support ticket.</span>
              </div>
              <Link
                href={`/login?redirect=${encodeURIComponent("/contact")}`}
                className="px-4 py-2 bg-[#D99722] hover:bg-[#C2841B] text-white rounded-xl font-bold text-xs shrink-0 transition-all shadow-sm"
              >
                Log In to Continue
              </Link>
            </div>
          )}


          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* 1. Type Selector (Radio Pills) */}
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-bold text-foreground block">
                Inquiry Type <span className="text-destructive">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5">
                {SUPPORT_TYPES.map((t) => {
                  const isSelected = type === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        setType(t.id);
                        if (errors.type) setErrors((prev) => ({ ...prev, type: undefined }));
                      }}
                      className={`px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer text-center ${isSelected
                          ? "bg-[#D99722] text-white border-[#D99722] shadow-sm"
                          : "bg-background text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground"
                        }`}
                    >
                      {t.label}
                    </button>
                  );
                })}
              </div>
              {/* Error below input field */}
              {errors.type && (
                <p className="text-destructive text-xs font-medium mt-1">
                  {errors.type}
                </p>
              )}
            </div>

            {/* 2. Title & Phone Number in 2 Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Title Input */}
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-bold text-foreground block">
                  Subject / Title <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Unable to reschedule booking"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (errors.title) setErrors((prev) => ({ ...prev, title: undefined }));
                  }}
                  className={`w-full px-3.5 py-2.5 rounded-xl border bg-background text-foreground text-sm transition-colors focus:outline-none focus:ring-2 ${errors.title
                      ? "border-destructive focus:ring-destructive/20 focus:border-destructive"
                      : "border-border focus:ring-[#D99722]/20 focus:border-[#D99722]"
                    }`}
                />
                {/* Error message under Title field */}
                {errors.title && (
                  <p className="text-destructive text-xs font-medium mt-1">
                    {errors.title}
                  </p>
                )}
              </div>

              {/* Phone Input (Optional) */}
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-bold text-foreground block">
                  Phone Number <span className="text-muted-foreground font-normal">(Optional)</span>
                </label>
                <input
                  type="tel"
                  placeholder="e.g. +1 (555) 234-5678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#D99722]/20 focus:border-[#D99722]"
                />
              </div>
            </div>

            {/* 3. Message Textarea */}
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-bold text-foreground block">
                Your Message <span className="text-destructive">*</span>
              </label>
              <textarea
                rows={5}
                placeholder="Please describe your question or issue in detail..."
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                }}
                className={`w-full px-3.5 py-2.5 rounded-xl border bg-background text-foreground text-sm transition-colors resize-y focus:outline-none focus:ring-2 ${errors.message
                    ? "border-destructive focus:ring-destructive/20 focus:border-destructive"
                    : "border-border focus:ring-[#D99722]/20 focus:border-[#D99722]"
                  }`}
              />
              {/* Error message under Message field */}
              {errors.message && (
                <p className="text-destructive text-xs font-medium mt-1">
                  {errors.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center sm:justify-start pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3 bg-[#D99722] hover:bg-[#C2841B] active:scale-95 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting Ticket...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

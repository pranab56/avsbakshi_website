"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const user = useSelector((state: { auth?: { user?: any } }) => state.auth?.user);

  useEffect(() => {
    let role = user?.role;
    if (!role && typeof window !== "undefined") {
      role =
        sessionStorage.getItem("pending_registration_role") ||
        localStorage.getItem("salon-role") ||
        localStorage.getItem("realState-role");
    }
    const normRole = (role || "").toLowerCase().trim();
    if (normRole === "business" || normRole === "salon_owner" || normRole === "salonowner" || normRole === "salon-owner") {
      router.replace("/onboarding/business/saloninfo");
    } else if (normRole === "customer" || normRole === "user") {
      router.replace("/customer/overview");
    } else {
      router.replace("/professional/dashboard");
    }
  }, [user, router]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-3">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
      <p className="text-xs text-muted-foreground">Redirecting to your setup...</p>
    </div>
  );
}

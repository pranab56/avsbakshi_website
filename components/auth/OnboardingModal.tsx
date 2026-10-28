"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Building2, Armchair, ArrowRight, Sparkles } from "lucide-react";

interface OnboardingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function OnboardingModal({
  open,
  onOpenChange,
}: OnboardingModalProps) {
  const router = useRouter();

  const handleSetupBusiness = () => {
    onOpenChange(false);
    router.push("/professional/business");
  };

  const handleRentChair = () => {
    onOpenChange(false);
    toast.success("Welcome to your Professional Dashboard!");
    router.push("/professional/dashboard");
  };

  const handleSkip = () => {
    onOpenChange(false);
    toast.info(
      "Skipped onboarding. You can set up your business anytime from your dashboard!"
    );
    router.push("/professional/dashboard");
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        if (!val) {
          handleSkip();
        } else {
          onOpenChange(val);
        }
      }}
    >
      <DialogContent
        showCloseButton={true}
        className="sm:max-w-xl bg-card border border-border text-card-foreground p-6 sm:p-8 rounded-3xl shadow-2xl relative"
      >
        {/* Dialog Header */}
        <DialogHeader className="space-y-2 text-left pt-2 pr-6">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/15 text-primary text-xs font-bold border border-primary/20 w-fit">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Welcome Professional</span>
          </div>
          <DialogTitle className="font-extrabold text-2xl sm:text-3xl text-foreground tracking-tight">
            Verification Successful!
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Your account is verified. How would you like to set up your profile on The Cloud Salon?
          </DialogDescription>
        </DialogHeader>

        {/* Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {/* Option 1: Setup Salon Business */}
          <div
            onClick={handleSetupBusiness}
            className="bg-accent/40 hover:bg-accent border-2 border-border hover:border-primary p-5 rounded-2xl transition-all cursor-pointer space-y-3 group text-left shadow-2xs"
          >
            <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
                <span>Setup Salon Business</span>
                <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Set up your salon page, location, opening hours, and accept client bookings.
              </p>
            </div>
            <div className="pt-1 text-xs font-semibold text-primary flex items-center gap-1">
              <span>Start Business Setup</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Option 2: Rent Chair / Independent */}
          <div
            onClick={handleRentChair}
            className="bg-accent/40 hover:bg-accent border-2 border-border hover:border-emerald-500/50 p-5 rounded-2xl transition-all cursor-pointer space-y-3 group text-left shadow-2xs"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Armchair className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-base text-foreground group-hover:text-emerald-500 transition-colors flex items-center justify-between">
                <span>Rent Chair / Independent</span>
                <ArrowRight className="w-4 h-4 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Rent chairs or work independently across salons. Setup a business anytime later.
              </p>
            </div>
            <div className="pt-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <span>Go to Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Footer Link */}
        <div className="pt-3  flex items-center justify-between text-xs">
          <span className="text-muted-foreground">You can change settings anytime</span>
          <button
            type="button"
            onClick={handleSkip}
            className="text-primary font-semibold hover:underline cursor-pointer"
          >
            Skip &amp; Go to Dashboard &rarr;
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

import { Check, Calendar, Clock, MapPin, Sparkles } from "lucide-react";
import { ServiceItem } from "./ServiceStep";

interface ReviewStepProps {
  selectedServices: ServiceItem[];
  selectedDate: string;
  selectedTime: string;
  proData?: any;
  subtotal: number;
  discount: number;
  total: number;
  handleConfirmBooking: () => void;
  isSubmitting?: boolean;
}

export default function ReviewStep({
  selectedServices,
  selectedDate,
  selectedTime,
  proData,
  subtotal,
  discount,
  total,
  handleConfirmBooking,
  isSubmitting = false,
}: ReviewStepProps) {
  const proName = proData?.name || "Professional Specialist";
  const proTitle = proData?.title || "Master Barber & Grooming Specialist";
  const proAvatar =
    proData?.avatar ||
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80";
  const proLocation = proData?.location || "Springfield, Oregon";

  const isConfirmDisabled = selectedServices.length === 0 || !selectedDate || !selectedTime || isSubmitting;

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-1">
          Confirm Your Booking
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground font-normal">
          Please review your appointment details and total before submitting.
        </p>
      </div>

      <div className="bg-card rounded-2xl p-6 sm:p-7 border border-border space-y-6 shadow-xs">
        {/* Professional Summary */}
        <div className="flex items-center gap-4 pb-5 border-b border-border/60">
          <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-border shrink-0 bg-muted">
            <img
              src={proAvatar}
              alt={proName}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="text-[10px] font-bold text-[#D99722] uppercase tracking-wider block mb-0.5">
              PROFESSIONAL
            </span>
            <h4 className="font-extrabold text-base text-foreground">{proName}</h4>
            <p className="text-xs text-muted-foreground">{proTitle}</p>
          </div>
        </div>

        {/* Selected Services Breakdown */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
            SELECTED SERVICES ({selectedServices.length})
          </span>

          <div className="space-y-2">
            {selectedServices.map((svc) => (
              <div
                key={svc._id}
                className="p-3.5 rounded-xl bg-accent/30 border border-border/50 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="font-bold text-foreground">{svc.name}</span>
                </div>
                <span className="font-extrabold text-[#D99722]">${svc.priceInUSD} USD</span>
              </div>
            ))}
          </div>
        </div>

        {/* Date & Time Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-border/60 text-xs">
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-accent/40 border border-border/40">
            <Calendar className="w-4 h-4 text-[#D99722] shrink-0" />
            <div>
              <span className="text-[10px] text-muted-foreground uppercase block">Date</span>
              <span className="font-bold text-foreground">{selectedDate || "2026-10-08"}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-accent/40 border border-border/40">
            <Clock className="w-4 h-4 text-[#D99722] shrink-0" />
            <div>
              <span className="text-[10px] text-muted-foreground uppercase block">Time Slot</span>
              <span className="font-bold text-foreground">{selectedTime || "10:30 AM"}</span>
            </div>
          </div>
        </div>

        {/* Pricing Summary Breakdown */}
        <div className="pt-4 border-t border-border/60 space-y-2 text-xs">
          <div className="flex justify-between text-muted-foreground">
            <span>Subtotal ({selectedServices.length} services)</span>
            <span className="font-bold text-foreground">${subtotal} USD</span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-emerald-500">
              <span>Promotional Discount</span>
              <span className="font-bold">-${discount} USD</span>
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-border flex justify-between items-center text-foreground">
          <span className="text-xl font-extrabold">Total Amount</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-[#D99722]">
            ${total} <span className="text-xs font-normal text-muted-foreground">USD</span>
          </span>
        </div>
      </div>

      {/* Cancellation Policy Banner */}
      <div className="bg-accent/60 p-4 rounded-xl border border-border space-y-1">
        <h5 className="text-xs font-bold text-[#D99722]">Free Cancellation Policy</h5>
        <p className="text-[11px] text-muted-foreground font-normal leading-relaxed">
          Cancel up to 24 hours before your appointment for a full refund. Instant confirmation.
        </p>
      </div>

      <button
        type="button"
        disabled={isConfirmDisabled}
        onClick={handleConfirmBooking}
        className={`w-full py-4 font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer text-center flex items-center justify-center gap-2 mt-6 ${
          isConfirmDisabled
            ? "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
            : "bg-[#D99722] hover:bg-[#C2841B] text-white"
        }`}
      >
        {isSubmitting ? (
          <>
            <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            <span>Confirming Booking...</span>
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            <span>Confirm Booking (${total})</span>
          </>
        )}
      </button>
    </div>
  );
}


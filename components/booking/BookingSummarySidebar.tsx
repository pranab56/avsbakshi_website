import { Star, Check } from "lucide-react";
import ChairImage from "@/components/shared/ChairImage";
import { ServiceItem } from "./ServiceStep";

interface BookingSummarySidebarProps {
  selectedServices: ServiceItem[];
  selectedDate: string;
  selectedTime: string;
  proData?: any;
  subtotal: number;
  discount: number;
  total: number;
}

export default function BookingSummarySidebar({
  selectedServices,
  selectedDate,
  selectedTime,
  proData,
  subtotal,
  discount,
  total,
}: BookingSummarySidebarProps) {
  const proName = proData?.name || "Professional Specialist";
  const proTitle = proData?.title || "Master Barber & Grooming Specialist";
  const proAvatar =
    proData?.avatar ||
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80";

  return (
    <div className="lg:col-span-5 space-y-6">
      <div className="bg-card rounded-2xl p-6 sm:p-7 border border-border space-y-6 sticky top-24 shadow-xs">
        <h3 className="font-extrabold text-base text-foreground border-b border-border/50 pb-3">
          Booking Summary
        </h3>

        <div className="flex items-center gap-3.5">
          <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-border shrink-0 bg-muted">
            <ChairImage
              src={proAvatar}
              alt={proName}
              size="sm"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="font-extrabold text-sm text-foreground">{proName}</h4>
            <p className="text-xs text-muted-foreground">{proTitle}</p>
          </div>
        </div>

        {/* Selected Services Breakdown */}
        <div className="space-y-2">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
            SERVICES ({selectedServices.length})
          </span>

          {selectedServices.length > 0 ? (
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {selectedServices.map((svc) => (
                <div key={svc._id} className="flex justify-between items-center text-xs py-1">
                  <span className="font-semibold text-foreground flex items-center gap-1.5 truncate">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span className="truncate">{svc.name}</span>
                  </span>
                  <span className="font-bold text-[#D99722] shrink-0 ml-2">${svc.priceInUSD}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground italic">No services selected</p>
          )}
        </div>

        {/* Date & Time Summary */}
        <div className="space-y-2 text-xs text-muted-foreground pt-2 border-t border-border/50">
          <div className="flex justify-between py-1">
            <span>Date</span>
            <span className={selectedDate ? "font-bold text-foreground" : "text-muted-foreground/60"}>
              {selectedDate || "Not Selected"}
            </span>
          </div>
          <div className="flex justify-between py-1">
            <span>Time</span>
            <span className={selectedTime ? "font-bold text-foreground" : "text-muted-foreground/60"}>
              {selectedTime || "Not Selected"}
            </span>
          </div>
        </div>

        {/* Subtotal, Discount & Total */}
        <div className="pt-4 border-t border-border/60 space-y-2 text-xs">
          <div className="flex justify-between text-muted-foreground">
            <span>Subtotal</span>
            <span className="font-bold text-foreground">${subtotal} USD</span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-emerald-500 font-semibold">
              <span>Discount</span>
              <span>-${discount} USD</span>
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-border flex justify-between items-center text-foreground">
          <span className="text-base font-extrabold">Total</span>
          <span className="text-2xl font-extrabold text-[#D99722]">${total} <span className="text-xs font-normal text-muted-foreground">USD</span></span>
        </div>
      </div>
    </div>
  );
}


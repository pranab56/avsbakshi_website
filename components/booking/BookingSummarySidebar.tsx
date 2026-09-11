import { ServiceItem } from "./ServiceStep";

interface BookingSummarySidebarProps {
  selectedService: ServiceItem;
  selectedDate: string;
  selectedTime: string;
  platformFee: number;
  totalPrice: number;
}

export default function BookingSummarySidebar({
  selectedService,
  selectedDate,
  selectedTime,
  platformFee,
  totalPrice,
}: BookingSummarySidebarProps) {
  return (
    <div className="lg:col-span-5 space-y-6">
      <div className="bg-card rounded-lg p-6 sm:p-7 border border-border space-y-6 sticky top-24 shadow-xs">
        <h3 className="font-title font-bold text-base text-muted-foreground">
          Booking Summary
        </h3>

        <div className="flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
            alt="Sofia Martinez"
            className="w-12 h-12 rounded-full object-cover border border-border shrink-0"
          />
          <div>
            <h4 className="font-title font-bold text-base text-foreground">Sofia Martinez</h4>
            <div className="flex items-center gap-1 text-primary text-lg">
              ★★★★★
            </div>
          </div>
        </div>

        <div className="space-y-2 text-xs text-muted-foreground">
          <div className="flex justify-between py-1">
            <span>Service</span>
            <span className="font-bold text-foreground">{selectedService.title}</span>
          </div>
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

        <div className="pt-4 border-t border-border space-y-2 text-xs">
          <div className="flex justify-between text-muted-foreground">
            <span>Service</span>
            <span>£{selectedService.price}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Platform fee</span>
            <span>£{platformFee}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-border flex justify-between items-center text-foreground">
          <span className="font-title text-xl font-bold">Total</span>
          <span className="font-title text-2xl font-bold">£{totalPrice}</span>
        </div>
      </div>
    </div>
  );
}


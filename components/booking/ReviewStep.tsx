import { ServiceItem } from "./ServiceStep";

interface ReviewStepProps {
  selectedService: ServiceItem;
  selectedDate: string;
  selectedTime: string;
  platformFee: number;
  totalPrice: number;
  handleNextStep: () => void;
}

export default function ReviewStep({
  selectedService,
  selectedDate,
  selectedTime,
  platformFee,
  totalPrice,
  handleNextStep,
}: ReviewStepProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <div>
        <h1 className="font-title text-3xl sm:text-4xl font-normal text-foreground mb-1">
          Review your booking
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground font-normal">
          Check your booking details before confirming.
        </p>
      </div>

      <div className="bg-card rounded-lg p-6 sm:p-7 border border-border space-y-6 shadow-xs">
        <span className="text-xs font-semibold text-muted-foreground block uppercase tracking-wider">
          Appointment
        </span>

        <div className="flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
            alt="Sofia Martinez"
            className="w-12 h-12 rounded-full object-cover border border-border shrink-0"
          />
          <div>
            <h4 className="font-title font-bold text-base text-foreground">Sofia Martinez</h4>
            <div className="flex items-center gap-1 text-primary text-xs">
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
            <span className="font-bold text-foreground">{selectedDate || "Fri 18 Jul"}</span>
          </div>
          <div className="flex justify-between py-1">
            <span>Time</span>
            <span className="font-bold text-foreground">{selectedTime || "9:30 AM"}</span>
          </div>
          <div className="flex justify-between py-1">
            <span>Duration</span>
            <span className="font-bold text-foreground">{selectedService.duration}</span>
          </div>
          <div className="flex justify-between py-1">
            <span>Location</span>
            <span className="font-bold text-foreground">Soho Studio, New York, NY 10012</span>
          </div>
        </div>

        <div className="pt-4 border-t border-border space-y-2 text-xs">
          <div className="flex justify-between text-muted-foreground">
            <span>Service</span>
            <span className="font-medium text-foreground">£{selectedService.price}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Platform fee</span>
            <span className="font-medium text-foreground">£{platformFee}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-border flex justify-between items-center text-foreground">
          <span className="font-title text-xl font-bold">Total</span>
          <span className="font-title text-2xl font-bold">£{totalPrice}</span>
        </div>
      </div>

      {/* Cancellation Policy Banner */}
      <div className="bg-accent/60 p-5 rounded-lg border border-border space-y-1.5">
        <h5 className="text-xs font-bold text-primary">Cancellation Policy</h5>
        <p className="text-xs text-muted-foreground font-normal leading-relaxed">
          Cancel up to 24 hours before your appointment for a full refund. Later cancellations are non-refundable.
        </p>
      </div>

      <button
        type="button"
        onClick={handleNextStep}
        className="w-full py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm rounded-sm shadow-sm transition-all cursor-pointer text-center block mt-6"
      >
        Continue to Payment
      </button>
    </div>
  );
}


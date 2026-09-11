"use client";

import Input from "../shared/Input";
import Button from "../shared/Button";

interface PaymentStepProps {
  paymentMethod: "card" | "apple" | "google";
  setPaymentMethod: (m: "card" | "apple" | "google") => void;
  cardNumber: string;
  setCardNumber: (val: string) => void;
  cardName: string;
  setCardName: (val: string) => void;
  expiry: string;
  setExpiry: (val: string) => void;
  cvc: string;
  setCvc: (val: string) => void;
  paymentErrors: Record<string, string>;
  setPaymentErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  handleConfirmPayment: (e: React.FormEvent) => void;
  totalPrice: number;
}

export default function PaymentStep({
  paymentMethod,
  setPaymentMethod,
  cardNumber,
  setCardNumber,
  cardName,
  setCardName,
  expiry,
  setExpiry,
  cvc,
  setCvc,
  paymentErrors,
  setPaymentErrors,
  handleConfirmPayment,
  totalPrice,
}: PaymentStepProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <div>
        <h1 className="font-title text-3xl sm:text-4xl font-normal text-foreground mb-1">
          Payment
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground font-normal">
          Choose how you would like to pay for your appointment.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <button
          type="button"
          onClick={() => setPaymentMethod("card")}
          className={`py-3 rounded-lg text-xs font-semibold transition-all border cursor-pointer ${
            paymentMethod === "card"
              ? "bg-primary text-primary-foreground border-primary shadow-xs"
              : "bg-card border-border text-foreground hover:bg-accent"
          }`}
        >
          Card
        </button>
        <button
          type="button"
          onClick={() => setPaymentMethod("apple")}
          className={`py-3 rounded-lg text-xs font-semibold transition-all border cursor-pointer ${
            paymentMethod === "apple"
              ? "bg-primary text-primary-foreground border-primary shadow-xs"
              : "bg-card border-border text-foreground hover:bg-accent"
          }`}
        >
          Apple Pay
        </button>
        <button
          type="button"
          onClick={() => setPaymentMethod("google")}
          className={`py-3 rounded-lg text-xs font-semibold transition-all border cursor-pointer ${
            paymentMethod === "google"
              ? "bg-primary text-primary-foreground border-primary shadow-xs"
              : "bg-card border-border text-foreground hover:bg-accent"
          }`}
        >
          Google Pay
        </button>
      </div>

      <form onSubmit={handleConfirmPayment} className="space-y-4 bg-card p-6 rounded-lg border border-border shadow-xs">
        {paymentMethod === "card" ? (
          <>
            <Input
              label="Card number"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              error={paymentErrors.cardNumber}
              onChange={(e) => {
                setCardNumber(e.target.value);
                setPaymentErrors((prev) => ({ ...prev, cardNumber: "" }));
              }}
            />

            <Input
              label="Name on card"
              placeholder="Sofia Martinez"
              value={cardName}
              error={paymentErrors.cardName}
              onChange={(e) => {
                setCardName(e.target.value);
                setPaymentErrors((prev) => ({ ...prev, cardName: "" }));
              }}
            />

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Expiry"
                placeholder="MM / YY"
                value={expiry}
                error={paymentErrors.expiry}
                onChange={(e) => {
                  setExpiry(e.target.value);
                  setPaymentErrors((prev) => ({ ...prev, expiry: "" }));
                }}
              />

              <Input
                label="CVC"
                placeholder="123"
                maxLength={4}
                value={cvc}
                error={paymentErrors.cvc}
                onChange={(e) => {
                  setCvc(e.target.value);
                  setPaymentErrors((prev) => ({ ...prev, cvc: "" }));
                }}
              />
            </div>
          </>
        ) : (
          <div className="text-center py-8 space-y-2">
            <p className="text-xs text-muted-foreground font-medium">
              Click confirm to authenticate with {paymentMethod === "apple" ? "Apple Pay" : "Google Pay"}.
            </p>
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          className="mt-4"
        >
          Pay £{totalPrice} & Confirm Booking
        </Button>
      </form>
    </div>
  );
}

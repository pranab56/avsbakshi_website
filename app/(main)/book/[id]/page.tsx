"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import StepperHeader from "@/components/booking/StepperHeader";
import ServiceStep, { ServiceItem } from "@/components/booking/ServiceStep";
import DateStep from "@/components/booking/DateStep";
import TimeStep from "@/components/booking/TimeStep";
import ReviewStep from "@/components/booking/ReviewStep";
import PaymentStep from "@/components/booking/PaymentStep";
import BookingSummarySidebar from "@/components/booking/BookingSummarySidebar";

export default function BookingFlowPage() {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);

  // Booking State
  const [selectedService, setSelectedService] = useState<ServiceItem>({
    title: "Haircut & Style",
    price: 65,
    duration: "60 min",
    desc: "Includes wash, cut, and blow-dry to your desired style."
  });

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  // Payment Form State
  const [paymentMethod, setPaymentMethod] = useState<"card" | "apple" | "google">("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [paymentErrors, setPaymentErrors] = useState<Record<string, string>>({});

  const servicesList: ServiceItem[] = [
    { title: "Haircut & Style", price: 65, duration: "60 min", desc: "Includes wash, cut, and blow-dry to your desired style." },
    { title: "Full Colour", price: 145, duration: "120 min", desc: "Root to tip colour transformation with toning and treatment." },
    { title: "Highlights", price: 175, duration: "150 min", desc: "Partial or full highlights with foils, balayage, or ombre techniques." },
    { title: "Blowout", price: 45, duration: "45 min", desc: "Wash and professional blow-dry styling. No cut included." },
    { title: "Keratin Treatment", price: 220, duration: "180 min", desc: "Smoothing treatment for frizz-free, glossy hair lasting 3-5 months." },
  ];

  const platformFee = 3;
  const totalPrice = selectedService.price + platformFee;

  const handleNextStep = () => {
    if (step < 5) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    } else {
      router.push("/professionals/1");
    }
  };

  const handleConfirmPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentMethod === "card") {
      const errs: Record<string, string> = {};
      if (!cardNumber || cardNumber.length < 16) errs.cardNumber = "Valid 16-digit card number is required";
      if (!cardName) errs.cardName = "Name on card is required";
      if (!expiry) errs.expiry = "Expiry date is required";
      if (!cvc || cvc.length < 3) errs.cvc = "CVC is required";

      if (Object.keys(errs).length > 0) {
        setPaymentErrors(errs);
        return;
      }
    }

    toast.success("Appointment successfully booked! Confirmation email sent.");
    router.push("/");
  };

  return (
    <div className="min-h-screen pb-20">
      <StepperHeader step={step} handlePrevStep={handlePrevStep} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-7 space-y-6">
            {step === 1 && (
              <ServiceStep
                selectedService={selectedService}
                setSelectedService={setSelectedService}
                servicesList={servicesList}
                handleNextStep={handleNextStep}
              />
            )}
            {step === 2 && (
              <DateStep
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                handleNextStep={handleNextStep}
              />
            )}
            {step === 3 && (
              <TimeStep
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
                handleNextStep={handleNextStep}
              />
            )}
            {step === 4 && (
              <ReviewStep
                selectedService={selectedService}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                platformFee={platformFee}
                totalPrice={totalPrice}
                handleNextStep={handleNextStep}
              />
            )}
            {step === 5 && (
              <PaymentStep
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                cardNumber={cardNumber}
                setCardNumber={setCardNumber}
                cardName={cardName}
                setCardName={setCardName}
                expiry={expiry}
                setExpiry={setExpiry}
                cvc={cvc}
                setCvc={setCvc}
                paymentErrors={paymentErrors}
                setPaymentErrors={setPaymentErrors}
                handleConfirmPayment={handleConfirmPayment}
                totalPrice={totalPrice}
              />
            )}
          </div>

          <BookingSummarySidebar
            selectedService={selectedService}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            platformFee={platformFee}
            totalPrice={totalPrice}
          />
        </div>
      </div>
    </div>
  );
}

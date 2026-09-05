"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export default function BookingFlowPage() {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);

  // Booking State
  const [selectedService, setSelectedService] = useState({
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

  const servicesList = [
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
      setStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
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
      {/* Top Header Stepper Bar */}
      <div className=" border-b border-gray-300 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <button
            type="button"
            onClick={handlePrevStep}
            className="inline-flex items-center gap-2 px-5 py-2 bg-white/80 hover:bg-white border border-[#DCD5C9] rounded-sm text-xs font-semibold text-[#1A1A1A] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          {/* Stepper Steps */}
          <div className="flex items-center gap-2 sm:gap-3 text-xs overflow-x-auto no-scrollbar py-1 max-w-full shrink-0">
            {[
              { num: 1, label: "Service" },
              { num: 2, label: "Date" },
              { num: 3, label: "Time" },
              { num: 4, label: "Review" },
              { num: 5, label: "Submitted" },
            ].map((s, idx) => (
              <div key={s.num} className="flex items-center gap-2 shrink-0">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span
                    className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full text-xs font-bold flex items-center justify-center transition-all ${step === s.num
                      ? "bg-[#B78735] text-white shadow-xs"
                      : step > s.num
                        ? "bg-[#2E7D32] text-white"
                        : "bg-[#E2DACD] text-[#666159]"
                      }`}
                  >
                    {step > s.num ? "✓" : s.num}
                  </span>
                  <span
                    className={`text-xs ${step === s.num ? "text-[#1A1A1A] font-bold" : "text-[#666159] font-medium"
                      }`}
                  >
                    {s.label}
                  </span>
                </div>
                {idx < 4 && <span className="w-3 sm:w-8 h-[1px] bg-[#DCD5C9]" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Layout Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Step Form Area */}
          <div className="lg:col-span-7 space-y-6">
            {/* STEP 1: SERVICE */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in duration-150">
                <div>
                  <h1 className="font-title text-3xl sm:text-4xl font-normal text-[#1A1A1A] mb-1">
                    Choose your service
                  </h1>
                  <p className="text-xs sm:text-sm text-[#666159] font-normal">
                    Select the service you would like to book with Sofia Martinez.
                  </p>
                </div>

                <div className="space-y-4">
                  {servicesList.map((srv, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedService(srv)}
                      className={`w-full p-6 rounded-lg border text-left transition-all cursor-pointer ${selectedService.title === srv.title
                        ? "bg-white border border-[#E2DACD]"
                        : "bg-white border border-gray-200"
                        }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium ${selectedService.title === srv.title
                              ? "bg-[#B78735] text-white"
                              : "border-2 border-[#DCD5C9] bg-white"
                              }`}
                          >
                            {selectedService.title === srv.title && "✓"}
                          </div>
                          <h3 className="font-title text-lg font-medium text-[#1A1A1A]">
                            {srv.title}
                          </h3>
                        </div>
                        <span className="font-title text-xl font-bold text-[#1A1A1A]">
                          £{srv.price}
                        </span>
                      </div>

                      <p className="text-xs text-[#666159] font-normal mt-2 mb-3 leading-relaxed pl-7">
                        {srv.desc}
                      </p>

                      <div className="pl-7">
                        <span className="bg-[#E2DACD] text-[#2C2E33] text-[11px] font-medium px-3 py-1 rounded-md border border-[#D5CBB9] inline-block">
                          {srv.duration}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full py-4 bg-[#B78735] hover:bg-[#A37428] text-white font-semibold text-sm rounded-sm shadow-sm transition-all cursor-pointer text-center block mt-8"
                >
                  Continue
                </button>
              </div>
            )}

            {/* STEP 2: DATE */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in duration-150">
                <div>
                  <h1 className="font-title text-3xl sm:text-4xl font-normal text-[#1A1A1A] mb-1">
                    Choose a date
                  </h1>
                  <p className="text-xs sm:text-sm text-[#666159] font-normal">
                    Select an available date for your appointment.
                  </p>
                </div>

                {/* Calendar View */}
                <div className="bg-white p-6 sm:p-8 rounded-lg border border-gray-200 space-y-6">
                  <div className="flex items-center justify-between text-xs font-bold text-[#1A1A1A]">
                    <button className="w-10 h-10 rounded-sm bg-white/70 hover:bg-white border border-[#DCD5C9] flex items-center justify-center text-[#1A1A1A] transition-colors cursor-pointer">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="font-title text-xl font-bold">July 2025</span>
                    <button className="w-10 h-10 rounded-sm bg-white/70 hover:bg-white border border-[#DCD5C9] flex items-center justify-center text-[#1A1A1A] transition-colors cursor-pointer">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-7 gap-2 text-center text-xs">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => (
                      <span key={i} className="text-xs font-medium text-[#666159] py-1">{d}</span>
                    ))}
                    {["14", "15", "16", "17", "18", "19", "20"].map((num) => (
                      <button
                        key={num}
                        onClick={() => setSelectedDate(`Fri ${num} Jul`)}
                        className={`py-2 text-xs sm:text-sm font-bold  h-14 rounded-sm transition-all text-center ${selectedDate.includes(num)
                          ? "bg-[#B78735] text-white shadow-xs"
                          : "text-[#1A1A1A] hover:text-[#B78735] cursor-pointer"
                          }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                {selectedDate && (
                  <div className="bg-[#E8F5E9] border border-[#C8E6C9] p-4 rounded-sm text-[#2E7D32] text-xs font-semibold">
                    Selected Date: {selectedDate}
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full py-4 bg-[#B78735] hover:bg-[#A37428] text-white font-semibold text-sm rounded-sm shadow-sm transition-all cursor-pointer text-center block"
                >
                  Continue
                </button>
              </div>
            )}

            {/* STEP 3: TIME */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in duration-150">
                <div>
                  <h1 className="font-title text-3xl sm:text-4xl font-normal text-[#1A1A1A] mb-1">
                    Choose a time
                  </h1>
                  <p className="text-xs sm:text-sm text-[#666159] font-normal">
                    Available times for {selectedDate || "Fri 18 Jul"}
                  </p>
                </div>

                <div className="space-y-6">
                  {/* MORNING */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-bold text-[#666159] uppercase tracking-[0.15em]">
                      MORNING
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3.5">
                      {["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"].map((t, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedTime(t)}
                          className={`py-3 px-2 sm:py-3.5 sm:px-4 rounded-sm text-xs sm:text-sm transition-all border text-center cursor-pointer ${selectedTime === t
                            ? "bg-[#B78735] hover:bg-[#A37428] text-white font-semibold border-[#B78735] shadow-xs"
                            : "bg-white hover:bg-gray-50 text-[#1A1A1A] font-medium border-gray-200"
                            }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* AFTERNOON 1 */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-bold text-[#666159] uppercase tracking-[0.15em]">
                      AFTERNOON
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3.5">
                      {["12:00 PM", "1:00 PM", "2:00 PM", "2:30 PM", "3:00 PM", "4:00 PM"].map((t, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedTime(t)}
                          className={`py-3 px-2 sm:py-3.5 sm:px-4 rounded-sm text-xs sm:text-sm transition-all border text-center cursor-pointer ${selectedTime === t
                            ? "bg-[#B78735] hover:bg-[#A37428] text-white font-semibold border-[#B78735] shadow-xs"
                            : "bg-white hover:bg-gray-50 text-[#1A1A1A] font-medium border-gray-200"
                            }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* EVENING */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-bold text-[#666159] uppercase tracking-[0.15em]">
                      EVENING
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3.5">
                      {["5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM"].map((t, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedTime(t)}
                          className={`py-3 px-2 sm:py-3.5 sm:px-4 rounded-sm text-xs sm:text-sm transition-all border text-center cursor-pointer ${selectedTime === t
                            ? "bg-[#B78735] hover:bg-[#A37428] text-white font-semibold border-[#B78735] shadow-xs"
                            : "bg-white hover:bg-gray-50 text-[#1A1A1A] font-medium border-gray-200"
                            }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full py-4 bg-[#B78735] hover:bg-[#A37428] text-white font-semibold text-sm rounded-sm shadow-sm transition-all cursor-pointer text-center block mt-8"
                >
                  Continue
                </button>
              </div>
            )}

            {/* STEP 4: REVIEW */}
            {step === 4 && (
              <div className="space-y-6 animate-in fade-in duration-150">
                <div>
                  <h1 className="font-title text-3xl sm:text-4xl font-normal text-[#1A1A1A] mb-1">
                    Review your booking
                  </h1>
                  <p className="text-xs sm:text-sm text-[#666159] font-normal">
                    Check your booking details before confirming.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6 sm:p-7 border border-gray-200 space-y-6">
                  <span className="text-xs font-semibold text-[#666159] block">
                    Appointment
                  </span>

                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                      alt="Sofia Martinez"
                      className="w-12 h-12 rounded-full object-cover border border-white shrink-0"
                    />
                    <div>
                      <h4 className="font-title font-bold text-base text-[#1A1A1A]">Sofia Martinez</h4>
                      <div className="flex items-center gap-1 text-[#B78735] text-xs">
                        ★★★★★
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs text-[#666159]">
                    <div className="flex justify-between py-1">
                      <span>Service</span>
                      <span className="font-bold text-[#1A1A1A]">{selectedService.title}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Date</span>
                      <span className="font-bold text-[#1A1A1A]">{selectedDate || "Fri 18 Jul"}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Time</span>
                      <span className="font-bold text-[#1A1A1A]">{selectedTime || "9:30 AM"}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Duration</span>
                      <span className="font-bold text-[#1A1A1A]">{selectedService.duration}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Location</span>
                      <span className="font-bold text-[#1A1A1A]">Shoreditch Studio, London E1</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#D5CBB9] space-y-2 text-xs">
                    <div className="flex justify-between text-[#666159]">
                      <span>Service</span>
                      <span className="font-medium text-[#1A1A1A]">£{selectedService.price}</span>
                    </div>
                    <div className="flex justify-between text-[#666159]">
                      <span>Platform fee</span>
                      <span className="font-medium text-[#1A1A1A]">£{platformFee}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#D5CBB9] flex justify-between items-center text-[#1A1A1A]">
                    <span className="font-title text-xl font-bold">Total</span>
                    <span className="font-title text-2xl font-bold">£{totalPrice}</span>
                  </div>
                </div>

                {/* Cancellation Policy Banner */}
                <div className="bg-[#E2DACD]/60 p-5 rounded-lg border border-[#DCD5C9] space-y-1.5">
                  <h5 className="text-xs font-bold text-[#C59B4C]">Cancellation Policy</h5>
                  <p className="text-xs text-[#666159] font-normal leading-relaxed">
                    Cancel up to 24 hours before your appointment for a full refund. Later cancellations are non-refundable.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full py-4 bg-[#B78735] hover:bg-[#A37428] text-white font-semibold text-sm rounded-sm shadow-sm transition-all cursor-pointer text-center block mt-6"
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {/* STEP 5: SUBMITTED / PAYMENT */}
            {step === 5 && (
              <div className="space-y-6 animate-in fade-in duration-150">
                <div>
                  <h1 className="font-title text-3xl sm:text-4xl font-normal text-[#1A1A1A] mb-1">
                    Payment
                  </h1>
                  <p className="text-xs sm:text-sm text-[#666159] font-normal">
                    Choose how you would like to pay for your appointment.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`py-3 rounded-sm text-xs font-semibold transition-all border cursor-pointer ${paymentMethod === "card"
                      ? "bg-[#1E1C1A] text-white border-[#1E1C1A] shadow-xs"
                      : "bg-[#E2DACD] border-[#DCD5C9] text-[#2C2E33] hover:bg-[#D6C9B7]"
                      }`}
                  >
                    Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("apple")}
                    className={`py-3 rounded-sm text-xs font-semibold transition-all border cursor-pointer ${paymentMethod === "apple"
                      ? "bg-[#1E1C1A] text-white border-[#1E1C1A] shadow-xs"
                      : "bg-[#E2DACD] border-[#DCD5C9] text-[#2C2E33] hover:bg-[#D6C9B7]"
                      }`}
                  >
                    Apple Pay
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("google")}
                    className={`py-3 rounded-sm text-xs font-semibold transition-all border cursor-pointer ${paymentMethod === "google"
                      ? "bg-[#1E1C1A] text-white border-[#1E1C1A] shadow-xs"
                      : "bg-[#E2DACD] border-[#DCD5C9] text-[#2C2E33] hover:bg-[#D6C9B7]"
                      }`}
                  >
                    Google Pay
                  </button>
                </div>

                <form onSubmit={handleConfirmPayment} className="space-y-4 bg-white p-6 rounded-lg border border-gray-200 shadow-xs">
                  {paymentMethod === "card" ? (
                    <>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-[#1A1A1A] block">Card number</label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          value={cardNumber}
                          onChange={(e) => {
                            setCardNumber(e.target.value);
                            setPaymentErrors(prev => ({ ...prev, cardNumber: "" }));
                          }}
                          className={`w-full px-4 py-3 rounded-sm border text-xs transition-all focus:outline-none ${paymentErrors.cardNumber
                            ? "border-red-500 bg-red-50/20"
                            : "border-gray-200 bg-white focus:border-[#B78735]"
                            }`}
                        />
                        {paymentErrors.cardNumber && (
                          <p className="text-red-500 text-[11px] font-medium mt-1">
                            {paymentErrors.cardNumber}
                          </p>
                        )}
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-[#1A1A1A] block">Name on card</label>
                        <input
                          type="text"
                          placeholder="Sofia Martinez"
                          value={cardName}
                          onChange={(e) => {
                            setCardName(e.target.value);
                            setPaymentErrors(prev => ({ ...prev, cardName: "" }));
                          }}
                          className={`w-full px-4 py-3 rounded-sm border text-xs transition-all focus:outline-none ${paymentErrors.cardName
                            ? "border-red-500 bg-red-50/20"
                            : "border-gray-200 bg-white focus:border-[#B78735]"
                            }`}
                        />
                        {paymentErrors.cardName && (
                          <p className="text-red-500 text-[11px] font-medium mt-1">
                            {paymentErrors.cardName}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-[#1A1A1A] block">Expiry</label>
                          <input
                            type="text"
                            placeholder="MM / YY"
                            value={expiry}
                            onChange={(e) => {
                              setExpiry(e.target.value);
                              setPaymentErrors(prev => ({ ...prev, expiry: "" }));
                            }}
                            className={`w-full px-4 py-3 rounded-sm border text-xs transition-all focus:outline-none ${paymentErrors.expiry
                              ? "border-red-500 bg-red-50/20"
                              : "border-gray-200 bg-white focus:border-[#B78735]"
                              }`}
                          />
                          {paymentErrors.expiry && (
                            <p className="text-red-500 text-[11px] font-medium mt-1">
                              {paymentErrors.expiry}
                            </p>
                          )}
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-[#1A1A1A] block">CVC</label>
                          <input
                            type="text"
                            placeholder="123"
                            maxLength={4}
                            value={cvc}
                            onChange={(e) => {
                              setCvc(e.target.value);
                              setPaymentErrors(prev => ({ ...prev, cvc: "" }));
                            }}
                            className={`w-full px-4 py-3 rounded-sm border text-xs transition-all focus:outline-none ${paymentErrors.cvc
                              ? "border-red-500 bg-red-50/20"
                              : "border-gray-200 bg-white focus:border-[#B78735]"
                              }`}
                          />
                          {paymentErrors.cvc && (
                            <p className="text-red-500 text-[11px] font-medium mt-1">
                              {paymentErrors.cvc}
                            </p>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8 space-y-2">
                      <p className="text-xs text-[#666159] font-medium">
                        Click confirm to authenticate with {paymentMethod === "apple" ? "Apple Pay" : "Google Pay"}.
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#B78735] hover:bg-[#A37428] text-white font-semibold rounded-xl shadow-sm transition-colors text-xs cursor-pointer mt-4"
                  >
                    Pay £{totalPrice} & Confirm Booking
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Right Booking Summary Sidebar Widget */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-lg p-6 sm:p-7 border border-gray-200 space-y-6 sticky top-24">
              <h3 className="font-title font-bold text-base text-[#666159]">
                Booking Summary
              </h3>

              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                  alt="Sofia Martinez"
                  className="w-12 h-12 rounded-full object-cover border border-white shrink-0"
                />
                <div>
                  <h4 className="font-title font-bold text-base text-[#1A1A1A]">Sofia Martinez</h4>
                  <div className="flex items-center gap-1 text-[#B78735] text-lg">
                    ★★★★★
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs text-[#666159]">
                <div className="flex justify-between py-1">
                  <span>Service</span>
                  <span className="font-bold text-[#1A1A1A]">{selectedService.title}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Date</span>
                  <span className={selectedDate ? "font-bold text-[#1A1A1A]" : "text-zinc-400"}>
                    {selectedDate || "Not Selected"}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Time</span>
                  <span className={selectedTime ? "font-bold text-[#1A1A1A]" : "text-zinc-400"}>
                    {selectedTime || "Not Selected"}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#D5CBB9] space-y-2 text-xs">
                <div className="flex justify-between text-[#666159]">
                  <span>Service</span>
                  <span>£{selectedService.price}</span>
                </div>
                <div className="flex justify-between text-[#666159]">
                  <span>Platform fee</span>
                  <span>£{platformFee}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#D5CBB9] flex justify-between items-center text-[#1A1A1A]">
                <span className="font-title text-xl font-bold">Total</span>
                <span className="font-title text-2xl font-bold">£{totalPrice}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
